package com.streampulse.kafka;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class kafkaConsumer {

    private static final Logger log = LoggerFactory.getLogger(kafkaConsumer.class);

    @KafkaListener(topics = "streampulse-events", groupId = "streampulse-group")
    public void consume(String eventJson) {
        log.info("Received event from Kafka: {}", eventJson);
        // EventService will process this in Day 3
    }
}