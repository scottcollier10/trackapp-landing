'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface CompositeTelemetryChartProps {
  data: {
    time: number;
    speed: number;
    throttle: number;
    brake: number;
  }[];
}

export function CompositeTelemetryChart({
  data,
}: CompositeTelemetryChartProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="bg-gradient-to-b from-slate-900/60 via-slate-950/80 to-slate-950/90 border border-slate-700/40 rounded-xl shadow-[0_22px_50px_rgba(0,0,0,0.60)] p-6 min-w-0">
      <h3 className="text-lg font-semibold text-slate-300 mb-4">
        Telemetry Overview
      </h3>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgb(51 65 85 / 0.2)" />
          <XAxis
            dataKey="time"
            stroke="rgb(148 163 184)"
            tickFormatter={formatTime}
            label={{
              value: 'Time',
              position: 'insideBottom',
              offset: -5,
              fill: 'rgb(148 163 184)',
            }}
          />
          <YAxis
            stroke="rgb(148 163 184)"
            domain={[0, 100]}
            label={{
              value: 'Normalized (0-100)',
              angle: -90,
              position: 'insideLeft',
              fill: 'rgb(148 163 184)',
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgb(15 23 42)',
              border: '1px solid rgb(51 65 85 / 0.4)',
              borderRadius: '8px',
              color: 'rgb(203 213 225)',
            }}
            labelFormatter={formatTime}
            formatter={(value: number, name: string) => {
              if (name === 'speed') {
                return [`${value.toFixed(1)}`, 'Speed (normalized)'];
              }
              return [`${value.toFixed(0)}%`, name];
            }}
          />
          <Legend
            wrapperStyle={{ color: 'rgb(148 163 184)' }}
            formatter={(value) => {
              if (value === 'speed') return 'Speed (normalized)';
              if (value === 'throttle') return 'Throttle';
              if (value === 'brake') return 'Brake';
              return value;
            }}
          />
          <Line
            type="monotone"
            dataKey="speed"
            stroke="#1E3A8A"
            strokeWidth={2}
            dot={false}
            name="speed"
          />
          <Line
            type="monotone"
            dataKey="throttle"
            stroke="#10B981"
            strokeWidth={2}
            dot={false}
            name="throttle"
          />
          <Line
            type="monotone"
            dataKey="brake"
            stroke="#F97316"
            strokeWidth={2}
            dot={false}
            name="brake"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
