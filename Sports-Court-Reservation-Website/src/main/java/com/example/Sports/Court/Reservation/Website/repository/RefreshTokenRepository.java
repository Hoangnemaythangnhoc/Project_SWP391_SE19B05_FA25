package com.example.Sports.Court.Reservation.Website.repository;

import com.example.Sports.Court.Reservation.Website.model.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
	Optional<RefreshToken> findByToken(String token);
	void deleteByToken(String token);
}

