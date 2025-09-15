package com.example.Sports.Court.Reservation.Website.domain;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "refresh_tokens")
public class RefreshToken {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, unique = true, length = 255)
	private String token;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@Column(nullable = false)
	private Instant expiryAt;

	@Column(nullable = false)
	private Boolean revoked = false;

	public Long getId() { return id; }
	public void setId(Long id) { this.id = id; }

	public String getToken() { return token; }
	public void setToken(String token) { this.token = token; }

	public User getUser() { return user; }
	public void setUser(User user) { this.user = user; }

	public Instant getExpiryAt() { return expiryAt; }
	public void setExpiryAt(Instant expiryAt) { this.expiryAt = expiryAt; }

	public Boolean getRevoked() { return revoked; }
	public void setRevoked(Boolean revoked) { this.revoked = revoked; }
}

