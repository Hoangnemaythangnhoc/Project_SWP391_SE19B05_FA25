package com.example.Sports.Court.Reservation.Website.service;

import com.example.Sports.Court.Reservation.Website.domain.RefreshToken;
import com.example.Sports.Court.Reservation.Website.domain.Role;
import com.example.Sports.Court.Reservation.Website.domain.User;
import com.example.Sports.Court.Reservation.Website.dto.AuthDtos;
import com.example.Sports.Court.Reservation.Website.repository.RefreshTokenRepository;
import com.example.Sports.Court.Reservation.Website.repository.RoleRepository;
import com.example.Sports.Court.Reservation.Website.repository.UserRepository;
import com.example.Sports.Court.Reservation.Website.security.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class AuthService {

	private final UserRepository userRepository;
	private final RoleRepository roleRepository;
	private final RefreshTokenRepository refreshTokenRepository;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authenticationManager;
	private final JwtUtil jwtUtil;

	public AuthService(UserRepository userRepository, RoleRepository roleRepository, RefreshTokenRepository refreshTokenRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
		this.userRepository = userRepository;
		this.roleRepository = roleRepository;
		this.refreshTokenRepository = refreshTokenRepository;
		this.passwordEncoder = passwordEncoder;
		this.authenticationManager = authenticationManager;
		this.jwtUtil = jwtUtil;
	}

	@Transactional
	public AuthDtos.TokenResponse register(AuthDtos.RegisterRequest request) {
		if (userRepository.existsByEmail(request.email)) {
			throw new IllegalArgumentException("Email đã được sử dụng");
		}
		User user = new User();
		user.setEmail(request.email);
		user.setFullName(request.fullName);
		user.setPasswordHash(passwordEncoder.encode(request.password));
		Role roleUser = roleRepository.findByName("USER").orElseGet(() -> {
			Role r = new Role();
			r.setName("USER");
			return roleRepository.save(r);
		});
		user.getRoles().add(roleUser);
		userRepository.save(user);
		return generateTokensForEmail(user.getEmail(), request.rememberMe);
	}

	public AuthDtos.TokenResponse login(AuthDtos.LoginRequest request) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(request.email, request.password)
		);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		return generateTokensForEmail(request.email, request.rememberMe);
	}

	public AuthDtos.TokenResponse refresh(String refreshTokenStr) {
		RefreshToken refreshToken = refreshTokenRepository.findByToken(refreshTokenStr)
				.orElseThrow(() -> new IllegalArgumentException("Refresh token không hợp lệ"));
		if (Boolean.TRUE.equals(refreshToken.getRevoked()) || refreshToken.getExpiryAt().isBefore(Instant.now())) {
			throw new IllegalArgumentException("Refresh token hết hạn hoặc bị thu hồi");
		}
		User user = refreshToken.getUser();
		String access = generateAccessToken(user);
		return new AuthDtos.TokenResponse(access, refreshTokenStr);
	}

	@Transactional
	public void logout(String refreshTokenStr) {
		refreshTokenRepository.findByToken(refreshTokenStr).ifPresent(token -> {
			token.setRevoked(true);
			refreshTokenRepository.save(token);
		});
	}

	public Map<String, Object> getCurrentUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Map<String, Object> me = new HashMap<>();
		me.put("email", authentication.getName());
		me.put("roles", authentication.getAuthorities().stream().map(a -> a.getAuthority().replaceFirst("^ROLE_", "")).toArray());
		return me;
	}

	public Map<String, Boolean> checkRole(String role) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		boolean has = authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_" + role));
		Map<String, Boolean> res = new HashMap<>();
		res.put("hasRole", has);
		return res;
	}

	private AuthDtos.TokenResponse generateTokensForEmail(String email, boolean rememberMe) {
		String access = jwtUtil.generateToken(email, Map.of());
		String refresh = generateRefreshToken(email, rememberMe);
		return new AuthDtos.TokenResponse(access, refresh);
	}

	private String generateAccessToken(User user) {
		Map<String, Object> claims = new HashMap<>();
		claims.put("roles", user.getRoles().stream().map(Role::getName).toArray());
		return jwtUtil.generateToken(user.getEmail(), claims);
	}

	private String generateRefreshToken(String email, boolean rememberMe) {
		User user = userRepository.findByEmail(email).orElseThrow();
		RefreshToken token = new RefreshToken();
		token.setUser(user);
		token.setToken(UUID.randomUUID().toString());
		Instant expiry = Instant.now().plus(rememberMe ? 30 : 7, ChronoUnit.DAYS);
		token.setExpiryAt(expiry);
		refreshTokenRepository.save(token);
		return token.getToken();
	}
}

