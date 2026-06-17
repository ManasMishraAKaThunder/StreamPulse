package com.streampulse.kafka;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.streampulse.websocket.WebSocketHandler;

@Service
public class kafkaConsumer {

    private static final Logger log = LoggerFactory.getLogger(kafkaConsumer.class);
    private final WebSocketHandler webSocketHandler;

    public kafkaConsumer(WebSocketHandler webSocketHandler) {
        this.webSocketHandler = webSocketHandler;
    }

    @KafkaListener(topics = "streampulse-events", groupId = "streampulse-group")
    public void consume(String eventJson) {
        log.info("Received event from Kafka: {}", eventJson);
        webSocketHandler.broadcast(eventJson);
    }
}