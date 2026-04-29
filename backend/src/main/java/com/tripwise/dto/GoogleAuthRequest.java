package com.tripwise.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class GoogleAuthRequest {

  @NotBlank(message = "Google ID token is required")
  private String token;
}
