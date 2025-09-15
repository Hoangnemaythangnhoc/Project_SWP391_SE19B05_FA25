package com.example.Sports.Court.Reservation.Website.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;

@Service
public class JwtService {

	private final SecretKey secretKey;
	private final long jwtExpirationMs;

	public JwtService(
			@Value("${jwt.secret}") String secret,
			@Value("${jwt.expiration}") long jwtExpirationMs
	) {
		this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
		this.jwtExpirationMs = jwtExpirationMs;
	}

	public String generateToken(String subject, Map<String, Object> claims) {
		Date now = new Date();
		Date expiry = new Date(now.getTime() + jwtExpirationMs);
		return Jwts.builder()
				.setSubject(subject)
				.setIssuedAt(now)
				.setExpiration(expiry)
				.addClaims(claims)
				.signWith(secretKey, SignatureAlgorithm.HS256)
				.compact();
	}

	public Jws<Claims> parseToken(String token) {
		return Jwts.parserBuilder()
				.setSigningKey(secretKey)
				.build()
				.parseClaimsJws(token);
	}

	public boolean isTokenValid(String token) {
		try {
			parseToken(token);
			return true;
		} catch (Exception ex) {
			return false;
		}
	}
}

