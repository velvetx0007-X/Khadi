import React from 'react';
import { motion } from 'framer-motion';

export default function MetricCard({
  title,
  value,
  unit,
  statusTag,
  statusColor = 'bg-slate-100 text-slate-700',
  icon: Icon,
  iconBg = 'bg-khadi-50 text-khadi-600',
  subtitle,
  trend,
  highlight = false
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-2xl p-5 border transition-all duration-300 ${
        highlight
          ? 'border-khadi-400 shadow-card ring-2 ring-khadi-400/20'
          : 'border-khadi-200/80 shadow-soft hover:shadow-card hover:border-khadi-300'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${iconBg} shadow-xs`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {title}
            </h3>
            {subtitle && <p className="text-[11px] text-slate-400">{subtitle}</p>}
          </div>
        </div>

        {statusTag && (
          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${statusColor}`}>
            {statusTag}
          </span>
        )}
      </div>

      <div className="flex items-baseline justify-between mt-2">
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {value}
          </span>
          {unit && (
            <span className="text-sm font-semibold text-slate-500">{unit}</span>
          )}
        </div>

        {trend && (
          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
            {trend}
          </span>
        )}
      </div>
    </motion.div>
  );
}
