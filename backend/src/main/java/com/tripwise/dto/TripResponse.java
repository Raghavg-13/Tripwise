package com.tripwise.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class TripResponse {
  private String id;
  private String userSelection; // JSON string
  private String tripData; // JSON string
  private LocalDateTime createdAt;
}
