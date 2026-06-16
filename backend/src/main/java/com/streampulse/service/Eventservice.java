package com.streampulse.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.streampulse.kafka.kafkaProducer;
import com.streampulse.model.Event;
import com.streampulse.repository.EventRepository;

@Service
public class Eventservice {

    private final EventRepository eventRepository;
    private final kafkaProducer kafkaProducer;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public Eventservice(EventRepository eventRepository,
                        kafkaProducer kafkaProducer) {
        this.eventRepository = eventRepository;
        this.kafkaProducer = kafkaProducer;
    }

    public Event publishEvent(Event event) throws Exception {
        String eventJson = objectMapper.writeValueAsString(event);
        kafkaProducer.sendEvent(eventJson);
        return eventRepository.save(event);
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public List<Event> getEventsByType(String type) {
        return eventRepository.findByType(type);
    }

    public List<Event> getEventsByRegion(String region) {
        return eventRepository.findByRegion(region);
    }

    public List<Event> getAnomalies() {
        return eventRepository.findByAnomalyTrue();
    }
}