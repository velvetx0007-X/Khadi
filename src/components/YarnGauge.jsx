import React from 'react';
import { motion } from 'framer-motion';

export default function YarnGauge({ score = 92, title = "Yarn Quality Score", size = 180 }) {
  // Determine rating grade and styling
  let grade = "Excellent";
  let gradeColor = "text-emerald-600";
  let strokeColor = "#059669";
  let bgArc = "bg-emerald-50 text-emerald-800 border-emerald-200";

  if (score < 50) {
    grade = "High Risk";
    gradeColor = "text-rose-600";
    strokeColor = "#E11D48";
    bgArc = "bg-rose-50 text-rose-800 border-rose-200";
  } else if (score < 75) {
    grade = "Needs Attention";
    gradeColor = "text-amber-600";
    strokeColor = "#D97706";
    bgArc = "bg-amber-50 text-amber-800 border-amber-200";
  } else if (score < 90) {
    grade = "Good";
    gradeColor = "text-blue-600";
    strokeColor = "#2563EB";
    bgArc = "bg-blue-50 text-blue-800 border-blue-200";
  }

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 180 180">
          {/* Background Track */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            stroke="#EFE7D7"
            strokeWidth="14"
            fill="none"
          />
          {/* Progress Arc */}
          <motion.circle
            cx="90"
            cy="90"
            r={radius}
            stroke={strokeColor}
            strokeWidth="14"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
            {score}
          </span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
            / 100
          </span>
        </div>
      </div>

      <div className="mt-3 text-center">
        <span className={`inline-block text-xs font-extrabold px-3 py-1 rounded-full border ${bgArc}`}>
          Grade: {grade}
        </span>
      </div>
    </div>
  );
}
