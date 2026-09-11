import React from 'react';
import { Bot, CheckCircle2, AlertTriangle, Info, AlertOctagon, Sparkles, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SmartInsights({ insights, compact = false, onViewAll }) {
  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />;
      case 'danger':
        return <AlertOctagon className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />;
      default:
        return <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />;
    }
  };

  const getBorderColor = (type) => {
    switch (type) {
      case 'success':
        return 'border-l-4 border-l-emerald-500 bg-emerald-50/40';
      case 'warning':
        return 'border-l-4 border-l-amber-500 bg-amber-50/40';
      case 'danger':
        return 'border-l-4 border-l-rose-500 bg-rose-50/40';
      default:
        return 'border-l-4 border-l-blue-500 bg-blue-50/40';
    }
  };

  const displayInsights = compact ? insights.slice(0, 3) : insights;

  return (
    <div className="bg-white rounded-2xl p-6 border border-khadi-200/80 shadow-soft">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-khadi-500 to-amber-500 text-white shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              🤖 SmartKhadi Intelligence
              <span className="text-[10px] uppercase font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                Live AI Engine
              </span>
            </h2>
            <p className="text-xs text-slate-500">Real-time ergonomic & performance advisory</p>
          </div>
        </div>

        {compact && onViewAll && (
          <button
            onClick={onViewAll}
            className="text-xs font-bold text-khadi-600 hover:text-khadi-700 flex items-center gap-1 transition"
          >
            <span>View All Insights</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {displayInsights.map((insight) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className={`p-4 rounded-xl border border-slate-200/80 ${getBorderColor(
                insight.type
              )} transition-all`}
            >
              <div className="flex items-start gap-3">
                {getIcon(insight.type)}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      {insight.category}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400">
                      {insight.timestamp}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {insight.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {insight.message}
                  </p>
                  {insight.metric && (
                    <span className="inline-block mt-2 text-[11px] font-semibold bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                      Telemetry: {insight.metric}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
