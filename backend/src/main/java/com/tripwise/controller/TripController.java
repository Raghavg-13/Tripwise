package com.tripwise.controller;

import com.tripwise.dto.TripRequest;
import com.tripwise.dto.TripResponse;
import com.tripwise.model.User;
import com.tripwise.service.TripService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
@RequiredArgsConstructor
public class TripController {

  private final TripService tripService;

  @PostMapping
  public ResponseEntity<TripResponse> saveTrip(
      @Valid @RequestBody TripRequest request,
      @AuthenticationPrincipal User user) {
    return ResponseEntity.ok(tripService.saveTrip(request, user));
  }

  @GetMapping
  public ResponseEntity<List<TripResponse>> getMyTrips(@AuthenticationPrincipal User user) {
    return ResponseEntity.ok(tripService.getUserTrips(user));
  }

  @GetMapping("/{id}")
  public ResponseEntity<TripResponse> getTripById(
      @PathVariable String id,
      @AuthenticationPrincipal User user) {
    return ResponseEntity.ok(tripService.getTripById(id, user));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteTrip(
      @PathVariable String id,
      @AuthenticationPrincipal User user) {
    tripService.deleteTrip(id, user);
    return ResponseEntity.noContent().build();
  }
}
