package com.tripwise.repository;

import com.tripwise.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TripRepository extends JpaRepository<Trip, String> {
  List<Trip> findByUserIdOrderByCreatedAtDesc(String userId);
}
