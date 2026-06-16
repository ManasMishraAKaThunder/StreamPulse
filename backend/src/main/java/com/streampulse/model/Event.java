package com.streampulse.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "events")
public class Event {

    @Id
    private String id;
    private String type;        // e.g. user_clicked, order_placed
    private String userId;
    private String region;
    private Object payload;
    private LocalDateTime timestamp;
    private boolean anomaly;
    private double anomalyScore;

    public Event() {
        this.timestamp = LocalDateTime.now();
        this.anomaly = false;
        this.anomalyScore = 0.0;
    }
}