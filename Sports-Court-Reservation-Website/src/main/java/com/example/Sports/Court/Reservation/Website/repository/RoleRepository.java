package com.example.Sports.Court.Reservation.Website.repository;

import com.example.Sports.Court.Reservation.Website.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
	Optional<Role> findByName(String name);
}

