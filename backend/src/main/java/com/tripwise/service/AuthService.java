package com.tripwise.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tripwise.dto.AuthResponse;
import com.tripwise.model.User;
import com.tripwise.repository.UserRepository;
import com.tripwise.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
@RequiredArgsConstructor
public class AuthService {

  private final UserRepository userRepository;
  private final JwtUtil jwtUtil;
  private final ObjectMapper objectMapper;

  @Value("${google.client-id}")
  private String googleClientId;

  public AuthResponse authenticateWithGoogle(String idToken) {
    JsonNode payload = verifyGoogleToken(idToken);

    String aud = payload.get("aud").asText();
    if (!aud.equals(googleClientId)) {
      throw new RuntimeException("Invalid Google token: audience mismatch");
    }

    String googleId = payload.get("sub").asText();
    String email = payload.get("email").asText();
    String name = payload.has("name") ? payload.get("name").asText() : email;
    String picture = payload.has("picture") ? payload.get("picture").asText() : null;

    // Find or create user
    User user = userRepository.findByGoogleId(googleId)
        .orElseGet(() -> userRepository.findByEmail(email)
            .map(existing -> {
              existing.setGoogleId(googleId);
              existing.setPicture(picture);
              return userRepository.save(existing);
            })
            .orElseGet(() -> userRepository.save(
                User.builder()
                    .googleId(googleId)
                    .email(email)
                    .name(name)
                    .picture(picture)
                    .build())));

    String jwt = jwtUtil.generateToken(user.getId(), user.getEmail());

    return AuthResponse.builder()
        .token(jwt)
        .user(AuthResponse.UserDto.builder()
            .id(user.getId())
            .email(user.getEmail())
            .name(user.getName())
            .picture(user.getPicture())
            .build())
        .build();
  }

  private JsonNode verifyGoogleToken(String idToken) {
    try {
      RestClient restClient = RestClient.create();
      String responseBody = restClient.get()
          .uri("https://oauth2.googleapis.com/tokeninfo?id_token={token}", idToken)
          .retrieve()
          .body(String.class);
      return objectMapper.readTree(responseBody);
    } catch (Exception e) {
      throw new RuntimeException("Failed to verify Google token: " + e.getMessage());
    }
  }
}
