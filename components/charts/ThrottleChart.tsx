'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ThrottleChartProps {
  data: { time: number; throttle: number }[];
}

export function ThrottleChart({ data }: ThrottleChartProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="bg-gradient-to-b from-slate-900/60 via-slate-950/80 to-slate-950/90 border border-slate-700/40 rounded-xl shadow-[0_22px_50px_rgba(0,0,0,0.60)] p-6 min-w-0">
      <h3 className="text-lg font-semibold text-slate-300 mb-4">Throttle (%)</h3>
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="throttleGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
          </defs>
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
              value: 'Throttle (%)',
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
            formatter={(value: number) => [`${value.toFixed(0)}%`, 'Throttle']}
          />
          <Area
            type="monotone"
            dataKey="throttle"
            stroke="#10B981"
            strokeWidth={2}
            fill="url(#throttleGradient)"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
