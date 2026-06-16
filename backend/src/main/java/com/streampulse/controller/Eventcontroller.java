package com.streampulse.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.streampulse.model.Event;
import com.streampulse.service.Eventservice;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")
public class Eventcontroller {

    private final Eventservice eventservice;

    public Eventcontroller(Eventservice eventservice) {
        this.eventservice = eventservice;
    }

    // POST - publish new event
    @PostMapping
    public ResponseEntity<Event> publishEvent(@RequestBody Event event) throws Exception {
        return ResponseEntity.ok(eventservice.publishEvent(event));
    }

    // GET - all events
    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        return ResponseEntity.ok(eventservice.getAllEvents());
    }

    // GET - filter by type
    @GetMapping("/type/{type}")
    public ResponseEntity<List<Event>> getByType(@PathVariable String type) {
        return ResponseEntity.ok(eventservice.getEventsByType(type));
    }

    // GET - filter by region
    @GetMapping("/region/{region}")
    public ResponseEntity<List<Event>> getByRegion(@PathVariable String region) {
        return ResponseEntity.ok(eventservice.getEventsByRegion(region));
    }

    // GET - anomalies only
    @GetMapping("/anomalies")
    public ResponseEntity<List<Event>> getAnomalies() {
        return ResponseEntity.ok(eventservice.getAnomalies());
    }
}