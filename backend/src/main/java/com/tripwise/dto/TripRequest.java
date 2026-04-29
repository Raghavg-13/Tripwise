package com.tripwise.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TripRequest {

  @NotBlank(message = "User selection is required")
  private String userSelection; // JSON string

  @NotBlank(message = "Trip data is required")
  private String tripData; // JSON string
}
