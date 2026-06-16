package com.streampulse.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.streampulse.model.Event;

@Repository
public interface EventRepository extends MongoRepository<Event, String> {
    List<Event> findByType(String type);
    List<Event> findByRegion(String region);
    List<Event> findByUserId(String userId);
    List<Event> findByTimestampBetween(LocalDateTime start, LocalDateTime end);
    List<Event> findByAnomalyTrue();
}