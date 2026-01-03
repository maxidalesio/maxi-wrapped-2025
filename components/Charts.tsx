
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

export const CountUp: React.FC<{ value: number; duration?: number; className?: string }> = ({ value, duration = 2, className }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [value, duration]);

  return <span className={className}>{count}</span>;
};

export const DonutChart: React.FC<{ data: { label: string; value: number; color: string }[] }> = ({ data }) => {
  const total = data.reduce((acc, d) => acc + d.value, 0);
  let currentAngle = 0;

  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
      <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
        {data.map((d, i) => {
          const sliceAngle = (d.value / total) * 360;
          const strokeDasharray = `${(d.value / total) * 251.2} 251.2`;
          const strokeDashoffset = `${-currentAngle / 360 * 251.2}`;
          currentAngle += sliceAngle;
          return (
            <motion.circle
              key={i}
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke={d.color}
              strokeWidth="20"
              strokeDasharray={strokeDasharray}
              initial={{ strokeDashoffset: 251.2 }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, delay: i * 0.1, ease: "easeOut" }}
            />
          );
        })}
        <circle cx="50" cy="50" r="30" fill="#0f172a" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-sm opacity-50 uppercase tracking-widest">2025</span>
        <span className="text-3xl font-bold">Resumen</span>
      </div>
    </div>
  );
};

export const EmotionalRadar: React.FC<{ data: { trait: string; score: number }[] }> = ({ data }) => {
  return (
    <div className="w-full h-64 md:h-96">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#64748b" />
          <PolarAngleAxis dataKey="trait" tick={{ fill: '#e5e7eb', fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
          <Radar
            name="Build 2025"
            dataKey="score"
            stroke="#f472b6"
            fill="#f472b6"
            fillOpacity={0.6}
            animationDuration={2000}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
