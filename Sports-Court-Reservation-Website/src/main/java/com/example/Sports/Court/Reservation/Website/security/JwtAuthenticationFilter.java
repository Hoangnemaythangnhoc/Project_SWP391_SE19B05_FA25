package com.example.Sports.Court.Reservation.Website.security;

import com.example.Sports.Court.Reservation.Website.model.User;
import com.example.Sports.Court.Reservation.Website.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private final JwtService jwtService;
	private final UserRepository userRepository;

	public JwtAuthenticationFilter(JwtService jwtService, UserRepository userRepository) {
		this.jwtService = jwtService;
		this.userRepository = userRepository;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
		String header = request.getHeader(HttpHeaders.AUTHORIZATION);
		if (StringUtils.hasText(header) && header.startsWith("Bearer ")) {
			String token = header.substring(7);
			try {
				Jws<Claims> jws = jwtService.parseToken(token);
				String email = jws.getBody().getSubject();
				@SuppressWarnings("unchecked")
				List<String> roles = (List<String>) jws.getBody().get("roles");

				User user = userRepository.findByEmail(email).orElse(null);
				if (user != null) {
					UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
							email,
							null,
							roles == null ? List.of() : roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList())
					);
					SecurityContextHolder.getContext().setAuthentication(authentication);
				}
			} catch (Exception ignored) {
				SecurityContextHolder.clearContext();
			}
		}
		filterChain.doFilter(request, response);
	}
}

