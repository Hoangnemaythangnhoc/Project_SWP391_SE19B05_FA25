package com.example.Sports.Court.Reservation.Website.service;

import com.example.Sports.Court.Reservation.Website.dto.AuthDtos.LoginRequest;
import com.example.Sports.Court.Reservation.Website.dto.AuthDtos.RegisterRequest;
import com.example.Sports.Court.Reservation.Website.model.RefreshToken;
import com.example.Sports.Court.Reservation.Website.model.Role;
import com.example.Sports.Court.Reservation.Website.model.User;
import com.example.Sports.Court.Reservation.Website.repository.RefreshTokenRepository;
import com.example.Sports.Court.Reservation.Website.repository.RoleRepository;
import com.example.Sports.Court.Reservation.Website.repository.UserRepository;
import com.example.Sports.Court.Reservation.Website.security.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class AuthService {

	private final UserRepository userRepository;
	private final RoleRepository roleRepository;
	private final RefreshTokenRepository refreshTokenRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;

	public AuthService(UserRepository userRepository,
					 RoleRepository roleRepository,
					 RefreshTokenRepository refreshTokenRepository,
					 PasswordEncoder passwordEncoder,
					 JwtService jwtService) {
		this.userRepository = userRepository;
		this.roleRepository = roleRepository;
		this.refreshTokenRepository = refreshTokenRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtService = jwtService;
	}

	public Map<String, Object> toSafeUser(User user) {
		Map<String, Object> map = new LinkedHashMap<>();
		map.put("id", user.getId());
		map.put("fullName", user.getFullName());
		map.put("email", user.getEmail());
		map.put("phone", user.getPhone());
		map.put("dateOfBirth", user.getDateOfBirth());
		map.put("gender", user.getGender());
		map.put("address", user.getAddress());
		map.put("roles", user.getRoles().stream().map(Role::getName).toList());
		return map;
	}

	private String generateAccessToken(User user) {
		Map<String, Object> claims = new HashMap<>();
		claims.put("roles", user.getRoles().stream().map(Role::getName).toList());
		return jwtService.generateToken(user.getEmail(), claims);
	}

	private String generateAndStoreRefreshToken(User user, boolean rememberMe) {
		// default 7 days, 30 days if rememberMe
		long expiresInSeconds = rememberMe ? 30L * 24 * 3600 : 7L * 24 * 3600;
		String token = UUID.randomUUID().toString();
		RefreshToken rt = new RefreshToken();
		rt.setToken(token);
		rt.setUser(user);
		rt.setExpiresAt(Instant.now().plusSeconds(expiresInSeconds));
		refreshTokenRepository.save(rt);
		return token;
	}

	public Map<String, Object> login(LoginRequest request) {
		User user = userRepository.findByEmail(request.getEmail())
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Email hoặc mật khẩu không đúng"));
		if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Email hoặc mật khẩu không đúng");
		}
		String access = generateAccessToken(user);
		String refresh = generateAndStoreRefreshToken(user, request.isRememberMe());
		Map<String, Object> res = new LinkedHashMap<>();
		res.put("accessToken", access);
		res.put("refreshToken", refresh);
		res.put("user", toSafeUser(user));
		return res;
	}

	public Map<String, Object> register(RegisterRequest request) {
		if (userRepository.existsByEmail(request.getEmail())) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email đã tồn tại");
		}
		User user = new User();
		user.setFullName(request.getFullName());
		user.setEmail(request.getEmail());
		user.setPhone(request.getPhone());
		user.setGender(request.getGender());
		user.setAddress(request.getAddress());
		user.setDateOfBirth(LocalDate.parse(request.getDateOfBirth(), DateTimeFormatter.ISO_DATE));
		user.setPasswordHash(passwordEncoder.encode(request.getPassword()));

		Role baseRole = roleRepository.findByName("USER").orElseGet(() -> roleRepository.save(new Role("USER")));
		user.getRoles().add(baseRole);

		user = userRepository.save(user);

		String access = generateAccessToken(user);
		String refresh = generateAndStoreRefreshToken(user, false);
		Map<String, Object> res = new LinkedHashMap<>();
		res.put("accessToken", access);
		res.put("refreshToken", refresh);
		res.put("user", toSafeUser(user));
		return res;
	}

	public Map<String, Object> refresh(String refreshToken) {
		RefreshToken token = refreshTokenRepository.findByToken(refreshToken)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Refresh token không hợp lệ"));
		if (token.getExpiresAt().isBefore(Instant.now())) {
			refreshTokenRepository.delete(token);
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Refresh token đã hết hạn");
		}
		User user = token.getUser();
		String access = generateAccessToken(user);
		String newRefresh = generateAndStoreRefreshToken(user, true);
		refreshTokenRepository.delete(token);
		Map<String, Object> res = new LinkedHashMap<>();
		res.put("accessToken", access);
		res.put("refreshToken", newRefresh);
		res.put("user", toSafeUser(user));
		return res;
	}

	public void logout(String refreshToken) {
		refreshTokenRepository.deleteByToken(refreshToken);
	}
}

