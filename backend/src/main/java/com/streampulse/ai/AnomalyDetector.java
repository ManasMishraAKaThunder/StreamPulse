package com.streampulse.ai;

import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;

import com.streampulse.model.Event;

@Component
public class AnomalyDetector {

    private final ConcurrentHashMap<String, SlidingWindowCounter> countersByType = new ConcurrentHashMap<>();

    public SlidingWindowCounter.AnomalyResult check(Event event) {
        SlidingWindowCounter counter = countersByType.computeIfAbsent(
                event.getType(),
                type -> new SlidingWindowCounter()
        );
        return counter.recordAndCheck();
    }
}