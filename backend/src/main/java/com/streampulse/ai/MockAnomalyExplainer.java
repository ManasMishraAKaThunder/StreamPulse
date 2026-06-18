package com.streampulse.ai;

import org.springframework.stereotype.Component;

@Component
public class MockAnomalyExplainer implements AnomalyExplainer {

    @Override
    public String explain(String eventType, double anomalyScore, int currentCount) {
        return String.format(
            "Unusual spike detected for '%s' events: %d in the last 10-second window " +
            "(z-score %.2f). This could indicate a traffic surge, automated/bot activity, " +
            "or a viral event — flagged for review.",
            eventType, currentCount, anomalyScore
        );
    }
}