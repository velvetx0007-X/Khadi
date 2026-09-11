import React from 'react';
import { Menu, Play, Pause, RotateCcw, Wifi, UserCheck, ShieldCheck } from 'lucide-react';

export default function Header({
  sidebarOpen,
  setSidebarOpen,
  isMachineActive,
  startMachine,
  pauseMachine,
  resetSession,
  isDemoMode
}) {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-khadi-200/80 sticky top-0 z-30 px-4 lg:px-8 py-3.5 flex items-center justify-between shadow-xs">
      {/* Mobile Toggle & Active Status Indicator */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg text-slate-600 hover:bg-khadi-100 lg:hidden"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Live Status Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-slate-50 text-xs font-semibold">
          {isMachineActive ? (
            <>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-700 tracking-wide font-bold">MACHINE ACTIVE</span>
            </>
          ) : (
            <>
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400"></span>
              <span className="text-amber-700 tracking-wide font-bold">SESSION PAUSED</span>
            </>
          )}
        </div>

        {/* IoT Live Stream Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200/60">
          <Wifi className="w-3.5 h-3.5 animate-pulse text-emerald-600" />
          <span>Simulated IoT API</span>
        </div>
      </div>

      {/* Action Controls & Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Play/Pause Control */}
        {isMachineActive ? (
          <button
            onClick={pauseMachine}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-xs font-semibold transition"
            title="Pause Telemetry"
          >
            <Pause className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">Pause</span>
          </button>
        ) : (
          <button
            onClick={startMachine}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold shadow-sm transition"
            title="Start Telemetry"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">Start</span>
          </button>
        )}

        {/* Reset Button */}
        <button
          onClick={resetSession}
          className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition flex items-center gap-1"
          title="Reset Session Data"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
          <span className="hidden sm:inline">Reset</span>
        </button>

        <div className="h-6 w-[1px] bg-slate-200 mx-1 hidden sm:block" />

        {/* Artisan Mini Profile */}
        <div className="flex items-center gap-2.5 pl-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-khadi-500 to-amber-400 p-0.5 shadow-sm">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-xs font-bold text-khadi-700">
              LK
            </div>
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-bold text-slate-800 leading-tight flex items-center gap-1">
              Lakshmi <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            </p>
            <p className="text-[10px] font-medium text-slate-500">Tamil Nadu • Master Artisan</p>
          </div>
        </div>
      </div>
    </header>
  );
}
