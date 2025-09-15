package com.example.Sports.Court.Reservation.Website.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AuthDtos {

	@JsonIgnoreProperties(ignoreUnknown = true)
	public static class RegisterRequest {
		@NotBlank
		@Email
		public String email;

		@NotBlank
		@Size(min = 6, max = 120)
		public String password;

		@NotBlank
		@Size(min = 2, max = 120)
		public String fullName;

		public boolean rememberMe;
	}

	@JsonIgnoreProperties(ignoreUnknown = true)
	public static class LoginRequest {
		@NotBlank
		@Email
		public String email;

		@NotBlank
		public String password;

		public boolean rememberMe;
	}

	public static class TokenResponse {
		public String accessToken;
		public String refreshToken;
		public String tokenType = "Bearer";

		public TokenResponse(String accessToken, String refreshToken) {
			this.accessToken = accessToken;
			this.refreshToken = refreshToken;
		}
	}

	@JsonIgnoreProperties(ignoreUnknown = true)
	public static class RefreshRequest {
		@NotBlank
		public String refreshToken;
	}
}

