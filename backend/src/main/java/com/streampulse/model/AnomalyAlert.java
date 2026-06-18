package com.streampulse.model;

public record AnomalyAlert(String alertType, Event event, String explanation) {}