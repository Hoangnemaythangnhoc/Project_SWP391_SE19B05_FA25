package com.example.Sports.Court.Reservation.Website.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AuthDtos {

	@JsonIgnoreProperties(ignoreUnknown = true)
	public static class LoginRequest {
		@Email
		@NotBlank
		private String email;

		@NotBlank
		@Size(min = 6)
		private String password;

		private boolean rememberMe;

		public String getEmail() { return email; }
		public void setEmail(String email) { this.email = email; }
		public String getPassword() { return password; }
		public void setPassword(String password) { this.password = password; }
		public boolean isRememberMe() { return rememberMe; }
		public void setRememberMe(boolean rememberMe) { this.rememberMe = rememberMe; }
	}

	@JsonIgnoreProperties(ignoreUnknown = true)
	public static class RegisterRequest {
		@NotBlank
		private String fullName;
		@Email
		@NotBlank
		private String email;
		@NotBlank
		private String phone;
		@NotBlank
		@Size(min = 6)
		private String password;
		private String gender;
		private String address;
		@NotBlank
		private String dateOfBirth; // ISO yyyy-MM-dd

		public String getFullName() { return fullName; }
		public void setFullName(String fullName) { this.fullName = fullName; }
		public String getEmail() { return email; }
		public void setEmail(String email) { this.email = email; }
		public String getPhone() { return phone; }
		public void setPhone(String phone) { this.phone = phone; }
		public String getPassword() { return password; }
		public void setPassword(String password) { this.password = password; }
		public String getGender() { return gender; }
		public void setGender(String gender) { this.gender = gender; }
		public String getAddress() { return address; }
		public void setAddress(String address) { this.address = address; }
		public String getDateOfBirth() { return dateOfBirth; }
		public void setDateOfBirth(String dateOfBirth) { this.dateOfBirth = dateOfBirth; }
	}

	public static class RefreshRequest {
		@NotBlank
		private String refreshToken;
		public String getRefreshToken() { return refreshToken; }
		public void setRefreshToken(String refreshToken) { this.refreshToken = refreshToken; }
	}

	public static class AuthResponse {
		private String accessToken;
		private String refreshToken;
		private Object user;

		public AuthResponse() {}
		public AuthResponse(String accessToken, String refreshToken, Object user) {
			this.accessToken = accessToken; this.refreshToken = refreshToken; this.user = user;
		}
		public String getAccessToken() { return accessToken; }
		public void setAccessToken(String accessToken) { this.accessToken = accessToken; }
		public String getRefreshToken() { return refreshToken; }
		public void setRefreshToken(String refreshToken) { this.refreshToken = refreshToken; }
		public Object getUser() { return user; }
		public void setUser(Object user) { this.user = user; }
	}
}

