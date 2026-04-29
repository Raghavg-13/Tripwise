package com.tripwise.controller;

import com.tripwise.dto.AuthResponse;
import com.tripwise.dto.GoogleAuthRequest;
import com.tripwise.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

  private final AuthService authService;

  @PostMapping("/google")
  public ResponseEntity<AuthResponse> googleAuth(@Valid @RequestBody GoogleAuthRequest request) {
    return ResponseEntity.ok(authService.authenticateWithGoogle(request.getToken()));
  }
}
