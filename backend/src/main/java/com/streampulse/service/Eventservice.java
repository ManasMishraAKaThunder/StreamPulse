package com.streampulse.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.streampulse.kafka.kafkaProducer;
import com.streampulse.model.Event;
import com.streampulse.repository.EventRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class Eventservice {

    private final EventRepository eventRepository;
    private final kafkaProducer kafkaProducer;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public Eventservice(EventRepository eventRepository, kafkaProducer kafkaProducer) {
        this.eventRepository = eventRepository;
        this.kafkaProducer = kafkaProducer;
    }

    public Event publishEvent(Event event) throws Exception {
        Event saved = eventRepository.save(event);          // generates the Mongo _id
        String eventJson = objectMapper.writeValueAsString(saved); // now includes that id
        kafkaProducer.sendEvent(eventJson);
        return saved;
    }

    public List<Event> getAllEvents() { return eventRepository.findAll(); }
    public List<Event> getEventsByType(String type) { return eventRepository.findByType(type); }
    public List<Event> getEventsByRegion(String region) { return eventRepository.findByRegion(region); }
    public List<Event> getAnomalies() { return eventRepository.findByAnomalyTrue(); }
}