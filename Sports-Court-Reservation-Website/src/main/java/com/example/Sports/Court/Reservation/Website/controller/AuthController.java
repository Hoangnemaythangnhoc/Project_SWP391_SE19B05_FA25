package com.example.Sports.Court.Reservation.Website.controller;

import com.example.Sports.Court.Reservation.Website.dto.AuthDtos.AuthResponse;
import com.example.Sports.Court.Reservation.Website.dto.AuthDtos.LoginRequest;
import com.example.Sports.Court.Reservation.Website.dto.AuthDtos.RefreshRequest;
import com.example.Sports.Court.Reservation.Website.dto.AuthDtos.RegisterRequest;
import com.example.Sports.Court.Reservation.Website.model.User;
import com.example.Sports.Court.Reservation.Website.repository.UserRepository;
import com.example.Sports.Court.Reservation.Website.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {

	private final AuthService authService;
	private final UserRepository userRepository;

	public AuthController(AuthService authService, UserRepository userRepository) {
		this.authService = authService;
		this.userRepository = userRepository;
	}

	@PostMapping("/login")
	public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
		Map<String, Object> result = authService.login(request);
		return ResponseEntity.ok(new AuthResponse(
				(String) result.get("accessToken"),
				(String) result.get("refreshToken"),
				result.get("user")
		));
	}

	@PostMapping("/register")
	public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
		Map<String, Object> result = authService.register(request);
		return ResponseEntity.ok(new AuthResponse(
				(String) result.get("accessToken"),
				(String) result.get("refreshToken"),
				result.get("user")
		));
	}

	@PostMapping("/refresh")
	public ResponseEntity<AuthResponse> refresh(@Valid @RequestBody RefreshRequest request) {
		Map<String, Object> result = authService.refresh(request.getRefreshToken());
		return ResponseEntity.ok(new AuthResponse(
				(String) result.get("accessToken"),
				(String) result.get("refreshToken"),
				result.get("user")
		));
	}

	@PostMapping("/logout")
	public ResponseEntity<?> logout(@Valid @RequestBody RefreshRequest request) {
		authService.logout(request.getRefreshToken());
		return ResponseEntity.ok(Map.of("message", "Đã đăng xuất"));
	}

	@GetMapping("/me")
	public ResponseEntity<?> me(Authentication authentication) {
		if (authentication == null) {
			return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
		}
		String email = authentication.getName();
		User user = userRepository.findByEmail(email).orElse(null);
		if (user == null) {
			return ResponseEntity.status(404).body(Map.of("error", "User not found"));
		}
		return ResponseEntity.ok(authService.toSafeUser(user));
	}

	@GetMapping("/check-role/{role}")
	public ResponseEntity<?> checkRole(@PathVariable String role, Authentication authentication) {
		if (authentication == null) {
			return ResponseEntity.ok(Map.of("hasRole", false));
		}
		List<String> roles = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());
		boolean hasRole = roles.contains(role);
		return ResponseEntity.ok(Map.of("hasRole", hasRole));
	}
}

