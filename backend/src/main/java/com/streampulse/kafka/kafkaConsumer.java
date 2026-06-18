package com.streampulse.kafka;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.streampulse.ai.AnomalyDetector;
import com.streampulse.ai.AnomalyExplainer;
import com.streampulse.ai.SlidingWindowCounter.AnomalyResult;
import com.streampulse.model.AnomalyAlert;
import com.streampulse.model.Event;
import com.streampulse.repository.EventRepository;
import com.streampulse.websocket.WebSocketHandler;

@Service
public class kafkaConsumer {

    private static final Logger log = LoggerFactory.getLogger(kafkaConsumer.class);

    private final WebSocketHandler webSocketHandler;
    private final AnomalyDetector anomalyDetector;
    private final AnomalyExplainer anomalyExplainer;
    private final EventRepository eventRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public kafkaConsumer(WebSocketHandler webSocketHandler,
                          AnomalyDetector anomalyDetector,
                          AnomalyExplainer anomalyExplainer,
                          EventRepository eventRepository) {
        this.webSocketHandler = webSocketHandler;
        this.anomalyDetector = anomalyDetector;
        this.anomalyExplainer = anomalyExplainer;
        this.eventRepository = eventRepository;
    }

    @KafkaListener(topics = "streampulse-events", groupId = "streampulse-group")
    public void consume(String eventJson) throws Exception {
        Event event = objectMapper.readValue(eventJson, Event.class);
        AnomalyResult result = anomalyDetector.check(event);

        if (result.isAnomaly()) {
            event.setAnomaly(true);
            event.setAnomalyScore(result.score());
            eventRepository.save(event); // same id as before -> updates the existing document

            String explanation = anomalyExplainer.explain(event.getType(), result.score(), result.count());
            log.warn("ANOMALY DETECTED: {}", explanation);

            AnomalyAlert alert = new AnomalyAlert("ANOMALY", event, explanation);
            webSocketHandler.broadcast(objectMapper.writeValueAsString(alert));
        } else {
            webSocketHandler.broadcast(eventJson);
        }
    }
}