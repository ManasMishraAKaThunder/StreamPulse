package com.streampulse.ai;

public interface AnomalyExplainer {
    String explain(String eventType, double anomalyScore, int currentCount);
}
