package com.streampulse.ai;

import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

public class SlidingWindowCounter {

    private static final long BUCKET_SIZE_MS = 10_000; // 10-second buckets
    private static final int MAX_HISTORY_BUCKETS = 6;  // ~1 minute of history

    private long currentBucketStart = 0;
    private final AtomicInteger currentBucketCount = new AtomicInteger(0);
    private final List<Integer> history = new LinkedList<>();

    public synchronized AnomalyResult recordAndCheck() {
        long now = System.currentTimeMillis();
        if (currentBucketStart == 0) currentBucketStart = now;

        if (now - currentBucketStart >= BUCKET_SIZE_MS) {
            history.add(currentBucketCount.get());
            if (history.size() > MAX_HISTORY_BUCKETS) history.remove(0);
            currentBucketCount.set(0);
            currentBucketStart = now;
        }

        int count = currentBucketCount.incrementAndGet();
        return evaluate(count);
    }

    private AnomalyResult evaluate(int currentCount) {
        if (history.size() < 3) {
            // Fallback to a hardcoded threshold while we don't have enough history to calculate a Z-score
            boolean isAnomaly = currentCount > 20;
            return new AnomalyResult(isAnomaly, isAnomaly ? 99.9 : 0.0, currentCount); 
        }

        double mean = history.stream().mapToInt(Integer::intValue).average().orElse(0.0);
        double variance = history.stream()
                .mapToDouble(c -> Math.pow(c - mean, 2))
                .average()
                .orElse(0.0);
        double stdDev = Math.sqrt(variance);
        if (stdDev == 0) stdDev = 1; // avoid divide-by-zero when history is perfectly flat

        double zScore = (currentCount - mean) / stdDev;
        return new AnomalyResult(zScore > 2.0, zScore, currentCount);
    }

    public record AnomalyResult(boolean isAnomaly, double score, int count) {}
}