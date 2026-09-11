import React from 'react';
import { Sparkles, Play, CheckCircle2, Award, Activity, Bot, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DemoControlModal({ isDemoMode, toggleDemoMode, metrics }) {
  if (!isDemoMode) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-6 right-6 z-50 max-w-sm bg-slate-900 text-white rounded-2xl p-5 shadow-2xl border border-emerald-500/40 backdrop-blur-md"
      >
        <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <h3 className="font-extrabold text-sm text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              SIH 2026 Judge Presentation Mode
            </h3>
          </div>
          <button
            onClick={toggleDemoMode}
            className="text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-300 mb-3 leading-relaxed">
          Simulated IoT sensors are actively updating machine telemetry every 2.5 seconds.
        </p>

        <div className="grid grid-cols-2 gap-2 mb-4 text-xs bg-slate-800/80 p-3 rounded-xl border border-slate-700">
          <div>
            <span className="text-[10px] text-slate-400 uppercase block">Live Speed</span>
            <span className="font-bold text-amber-400 text-base">{metrics.rpm} RPM</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase block">Yarn Tension</span>
            <span className="font-bold text-emerald-400 text-base">{metrics.tension}</span>
          </div>
        </div>

        <div className="space-y-1.5 text-[11px] text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Optimal Range 380–450 RPM highlighted</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>SmartKhadi Rule AI auto-generating advice</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Yarn count stability & output accumulating</span>
          </div>
        </div>

        <button
          onClick={toggleDemoMode}
          className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-3 rounded-xl text-xs transition"
        >
          Exit Demo Mode
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
