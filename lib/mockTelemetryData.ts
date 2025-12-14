/**
 * Mock telemetry data for Track App session review demo
 * 90-second autocross/track session with realistic patterns:
 * - 3-4 acceleration/braking cycles
 * - Brake and throttle are mostly inverse
 * - Speed follows throttle with realistic physics
 */

export interface TelemetryPoint {
  time: number; // seconds (0-90)
  speed: number; // mph (0-120)
  throttle: number; // % (0-100)
  brake: number; // % (0-100)
}

// Generate 90 data points (1 per second) with realistic racing patterns
export const mockTelemetryData: TelemetryPoint[] = [
  // Start - accelerating from standstill
  { time: 0, speed: 0, throttle: 0, brake: 0 },
  { time: 1, speed: 12, throttle: 45, brake: 0 },
  { time: 2, speed: 22, throttle: 70, brake: 0 },
  { time: 3, speed: 35, throttle: 85, brake: 0 },
  { time: 4, speed: 48, throttle: 95, brake: 0 },
  { time: 5, speed: 62, throttle: 100, brake: 0 },
  { time: 6, speed: 75, throttle: 100, brake: 0 },
  { time: 7, speed: 87, throttle: 100, brake: 0 },
  { time: 8, speed: 98, throttle: 100, brake: 0 },
  { time: 9, speed: 107, throttle: 100, brake: 0 },

  // First corner - braking zone
  { time: 10, speed: 112, throttle: 95, brake: 0 },
  { time: 11, speed: 115, throttle: 80, brake: 5 },
  { time: 12, speed: 110, throttle: 0, brake: 65 },
  { time: 13, speed: 98, throttle: 0, brake: 85 },
  { time: 14, speed: 82, throttle: 0, brake: 90 },
  { time: 15, speed: 68, throttle: 5, brake: 70 },

  // Corner exit - accelerating
  { time: 16, speed: 58, throttle: 40, brake: 20 },
  { time: 17, speed: 52, throttle: 60, brake: 0 },
  { time: 18, speed: 55, throttle: 80, brake: 0 },
  { time: 19, speed: 62, throttle: 95, brake: 0 },
  { time: 20, speed: 72, throttle: 100, brake: 0 },
  { time: 21, speed: 83, throttle: 100, brake: 0 },
  { time: 22, speed: 94, throttle: 100, brake: 0 },
  { time: 23, speed: 103, throttle: 100, brake: 0 },
  { time: 24, speed: 110, throttle: 100, brake: 0 },

  // Second corner - heavy braking
  { time: 25, speed: 115, throttle: 98, brake: 0 },
  { time: 26, speed: 118, throttle: 85, brake: 8 },
  { time: 27, speed: 112, throttle: 0, brake: 70 },
  { time: 28, speed: 95, throttle: 0, brake: 92 },
  { time: 29, speed: 75, throttle: 0, brake: 95 },
  { time: 30, speed: 58, throttle: 10, brake: 80 },

  // Tight hairpin exit
  { time: 31, speed: 48, throttle: 35, brake: 40 },
  { time: 32, speed: 42, throttle: 55, brake: 0 },
  { time: 33, speed: 45, throttle: 70, brake: 0 },
  { time: 34, speed: 52, throttle: 85, brake: 0 },
  { time: 35, speed: 62, throttle: 95, brake: 0 },
  { time: 36, speed: 73, throttle: 100, brake: 0 },
  { time: 37, speed: 84, throttle: 100, brake: 0 },
  { time: 38, speed: 95, throttle: 100, brake: 0 },
  { time: 39, speed: 104, throttle: 100, brake: 0 },
  { time: 40, speed: 112, throttle: 100, brake: 0 },
  { time: 41, speed: 118, throttle: 100, brake: 0 },

  // Fast sweeper - maintenance throttle
  { time: 42, speed: 120, throttle: 100, brake: 0 },
  { time: 43, speed: 120, throttle: 95, brake: 0 },
  { time: 44, speed: 118, throttle: 90, brake: 0 },
  { time: 45, speed: 115, throttle: 85, brake: 0 },
  { time: 46, speed: 112, throttle: 90, brake: 0 },
  { time: 47, speed: 110, throttle: 95, brake: 0 },
  { time: 48, speed: 112, throttle: 100, brake: 0 },
  { time: 49, speed: 115, throttle: 100, brake: 0 },

  // Third corner approach
  { time: 50, speed: 118, throttle: 100, brake: 0 },
  { time: 51, speed: 120, throttle: 95, brake: 5 },
  { time: 52, speed: 115, throttle: 0, brake: 60 },
  { time: 53, speed: 102, throttle: 0, brake: 82 },
  { time: 54, speed: 85, throttle: 0, brake: 88 },
  { time: 55, speed: 70, throttle: 8, brake: 75 },

  // Corner exit - gradual acceleration
  { time: 56, speed: 62, throttle: 45, brake: 25 },
  { time: 57, speed: 58, throttle: 65, brake: 0 },
  { time: 58, speed: 60, throttle: 80, brake: 0 },
  { time: 59, speed: 68, throttle: 92, brake: 0 },
  { time: 60, speed: 78, throttle: 100, brake: 0 },
  { time: 61, speed: 88, throttle: 100, brake: 0 },
  { time: 62, speed: 98, throttle: 100, brake: 0 },
  { time: 63, speed: 106, throttle: 100, brake: 0 },
  { time: 64, speed: 113, throttle: 100, brake: 0 },

  // Final corner - late braking
  { time: 65, speed: 118, throttle: 100, brake: 0 },
  { time: 66, speed: 120, throttle: 98, brake: 0 },
  { time: 67, speed: 120, throttle: 95, brake: 3 },
  { time: 68, speed: 116, throttle: 0, brake: 68 },
  { time: 69, speed: 105, throttle: 0, brake: 85 },
  { time: 70, speed: 90, throttle: 0, brake: 90 },
  { time: 71, speed: 75, throttle: 5, brake: 78 },

  // Final corner exit to finish
  { time: 72, speed: 65, throttle: 38, brake: 35 },
  { time: 73, speed: 58, throttle: 60, brake: 0 },
  { time: 74, speed: 60, throttle: 78, brake: 0 },
  { time: 75, speed: 68, throttle: 90, brake: 0 },
  { time: 76, speed: 78, throttle: 98, brake: 0 },
  { time: 77, speed: 88, throttle: 100, brake: 0 },
  { time: 78, speed: 98, throttle: 100, brake: 0 },
  { time: 79, speed: 107, throttle: 100, brake: 0 },
  { time: 80, speed: 114, throttle: 100, brake: 0 },
  { time: 81, speed: 119, throttle: 100, brake: 0 },
  { time: 82, speed: 120, throttle: 100, brake: 0 },

  // Cooldown lap - slowing down
  { time: 83, speed: 118, throttle: 85, brake: 0 },
  { time: 84, speed: 112, throttle: 60, brake: 5 },
  { time: 85, speed: 102, throttle: 35, brake: 15 },
  { time: 86, speed: 88, throttle: 15, brake: 30 },
  { time: 87, speed: 72, throttle: 0, brake: 45 },
  { time: 88, speed: 52, throttle: 0, brake: 60 },
  { time: 89, speed: 32, throttle: 0, brake: 70 },
  { time: 90, speed: 15, throttle: 0, brake: 75 },
];

// Export individual datasets for specific charts
export const speedData = mockTelemetryData.map((d) => ({
  time: d.time,
  speed: d.speed,
}));

export const throttleData = mockTelemetryData.map((d) => ({
  time: d.time,
  throttle: d.throttle,
}));

export const brakeData = mockTelemetryData.map((d) => ({
  time: d.time,
  brake: d.brake,
}));

// For composite chart, normalize speed to 0-100 scale for better visualization
export const compositeData = mockTelemetryData.map((d) => ({
  time: d.time,
  speed: (d.speed / 120) * 100, // normalize to 0-100
  throttle: d.throttle,
  brake: d.brake,
}));
