package com.tripwise.service;

import com.tripwise.dto.TripRequest;
import com.tripwise.dto.TripResponse;
import com.tripwise.model.Trip;
import com.tripwise.model.User;
import com.tripwise.repository.TripRepository;
import com.tripwise.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class TripService {

  private final TripRepository tripRepository;
  private final UserRepository userRepository;

  public TripResponse saveTrip(TripRequest request, User user) {
    // getReferenceById returns a managed proxy — avoids detached-entity errors
    User managedUser = userRepository.getReferenceById(user.getId());
    Trip trip = Trip.builder()
        .user(managedUser)
        .userSelection(request.getUserSelection())
        .tripData(request.getTripData())
        .build();

    return toResponse(tripRepository.save(trip));
  }

  @Transactional(readOnly = true)
  public List<TripResponse> getUserTrips(User user) {
    return tripRepository.findByUserIdOrderByCreatedAtDesc(user.getId())
        .stream()
        .map(this::toResponse)
        .collect(Collectors.toList());
  }

  @Transactional(readOnly = true)
  public TripResponse getTripById(String tripId, User user) {
    Trip trip = tripRepository.findById(tripId)
        .orElseThrow(() -> new RuntimeException("Trip not found"));

    // trip.getUser() is LAZY — @Transactional keeps the session open so this is
    // safe
    if (!trip.getUser().getId().equals(user.getId())) {
      throw new RuntimeException("Unauthorized");
    }
    return toResponse(trip);
  }

  public void deleteTrip(String tripId, User user) {
    Trip trip = tripRepository.findById(tripId)
        .orElseThrow(() -> new RuntimeException("Trip not found"));

    if (!trip.getUser().getId().equals(user.getId())) {
      throw new RuntimeException("Unauthorized");
    }
    tripRepository.delete(trip);
  }

  private TripResponse toResponse(Trip trip) {
    return TripResponse.builder()
        .id(trip.getId())
        .userSelection(trip.getUserSelection())
        .tripData(trip.getTripData())
        .createdAt(trip.getCreatedAt())
        .build();
  }
}
