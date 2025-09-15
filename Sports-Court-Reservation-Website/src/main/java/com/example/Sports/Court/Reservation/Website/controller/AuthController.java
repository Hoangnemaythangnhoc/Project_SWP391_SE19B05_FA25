package com.example.Sports.Court.Reservation.Website.controller;

import com.example.Sports.Court.Reservation.Website.dto.AuthDtos;
import com.example.Sports.Court.Reservation.Website.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthController {

	private final AuthService authService;

	public AuthController(AuthService authService) {
		this.authService = authService;
	}

	@PostMapping("/register")
	public ResponseEntity<?> register(@Valid @RequestBody AuthDtos.RegisterRequest request) {
		AuthDtos.TokenResponse tokens = authService.register(request);
		return ResponseEntity.ok(tokens);
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@Valid @RequestBody AuthDtos.LoginRequest request) {
		AuthDtos.TokenResponse tokens = authService.login(request);
		return ResponseEntity.ok(tokens);
	}

	@PostMapping("/refresh")
	public ResponseEntity<?> refresh(@Valid @RequestBody AuthDtos.RefreshRequest request) {
		AuthDtos.TokenResponse tokens = authService.refresh(request.refreshToken);
		return ResponseEntity.ok(tokens);
	}

	@PostMapping("/logout")
	public ResponseEntity<?> logout(@Valid @RequestBody AuthDtos.RefreshRequest request) {
		authService.logout(request.refreshToken);
		return ResponseEntity.ok(Map.of("success", true));
	}

	@GetMapping("/me")
	public ResponseEntity<?> me() {
		return ResponseEntity.ok(authService.getCurrentUser());
	}

	@GetMapping("/check-role/{role}")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<?> checkRole(@PathVariable String role) {
		return ResponseEntity.ok(authService.checkRole(role));
	}
}

