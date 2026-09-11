import React from 'react';
import { Activity, Gauge, Zap, AlertCircle, CheckCircle, Flame, RefreshCw } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  CartesianGrid
} from 'recharts';

export default function LiveMonitoring({ simulation }) {
  const { metrics, rpmHistory, isMachineActive, startMachine, pauseMachine } = simulation;

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Activity className="w-6 h-6 text-khadi-500" />
            Live Spinning Monitor
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time RPM cadence & drafting tension sensor stream
          </p>
        </div>

        {/* Live Controls */}
        <div className="flex items-center gap-3">
          {isMachineActive ? (
            <button
              onClick={pauseMachine}
              className="px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold text-xs transition border border-amber-300"
            >
              Pause Stream
            </button>
          ) : (
            <button
              onClick={startMachine}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-md shadow-emerald-600/20"
            >
              Resume Stream
            </button>
          )}
        </div>
      </div>

      {/* Large Live Chart Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-khadi-200/80 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-khadi-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-emerald-500 animate-ping"></span>
              <h2 className="text-lg font-extrabold text-slate-900">
                Rotational Velocity Telemetry (RPM)
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Recommended Optimal Operating Velocity: <strong className="text-emerald-700">380 – 450 RPM</strong>
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-200/60">
            <div className="text-center px-3 border-r border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Current Velocity</span>
              <span className="text-2xl font-extrabold text-slate-900">{metrics.rpm} <span className="text-xs font-semibold text-slate-500">RPM</span></span>
            </div>
            <div className="text-center px-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Drafting Load</span>
              <span className="text-2xl font-extrabold text-khadi-600">{metrics.tension}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Status Alert Box */}
        <div className={`mb-6 p-4 rounded-2xl border ${metrics.rpmStatusColor} flex items-center gap-3 transition-all duration-300`}>
          {metrics.rpm >= 380 && metrics.rpm <= 450 ? (
            <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-6 h-6 shrink-0" />
          )}
          <div className="flex-1">
            <h4 className="font-extrabold text-sm uppercase tracking-wide">
              {metrics.rpm >= 380 && metrics.rpm <= 450 ? 'Optimal Speed Range' : metrics.rpm < 380 ? 'Low RPM Detected' : 'Excessive RPM Detected'}
            </h4>
            <p className="text-xs mt-0.5 font-medium">
              {metrics.rpmStatusText}
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/80 shadow-xs border border-current">
              Target: 380–450 RPM
            </span>
          </div>
        </div>

        {/* The Animated Area Chart */}
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={rpmHistory} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="liveRpmGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C86D27" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#C86D27" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#64748B' }} />
              <YAxis domain={[280, 520]} tick={{ fontSize: 11, fill: '#64748B' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F172A',
                  borderRadius: '16px',
                  color: '#FFF',
                  fontSize: '13px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                }}
              />
              <ReferenceLine y={380} stroke="#10B981" strokeWidth={2} strokeDasharray="4 4" label={{ value: 'Safe Min Limit (380 RPM)', fill: '#059669', fontSize: 11, fontWeight: 'bold' }} />
              <ReferenceLine y={450} stroke="#10B981" strokeWidth={2} strokeDasharray="4 4" label={{ value: 'Safe Max Limit (450 RPM)', fill: '#059669', fontSize: 11, fontWeight: 'bold' }} />
              <Area type="monotone" dataKey="rpm" stroke="#C86D27" strokeWidth={3.5} fill="url(#liveRpmGrad)" dot={{ r: 4, fill: '#C86D27' }} activeDot={{ r: 8, fill: '#D97706', stroke: '#FFF', strokeWidth: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Ergonomic Cadence Feedback Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-5 border border-khadi-200/80 shadow-soft">
          <div className="flex items-center gap-3 mb-2">
            <Gauge className="w-5 h-5 text-khadi-600" />
            <h3 className="font-bold text-slate-800 text-sm">Flywheel Kinetic Uniformity</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            The solar-boosted ErgoSpin flywheel maintains momentum, reducing artisan arm torque exertion by 40%.
          </p>
          <div className="mt-3 text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md inline-block">
            Standard Deviation: ±4.2 RPM
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-khadi-200/80 shadow-soft">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-800 text-sm">Tension Stability Index</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Automatic spring dampers prevent micro-jerks in the drafting zone, protecting cotton fiber twist.
          </p>
          <div className="mt-3 text-xs font-extrabold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md inline-block">
            Drafting Stability: 94.8%
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-khadi-200/80 shadow-soft">
          <div className="flex items-center gap-3 mb-2">
            <Flame className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-slate-800 text-sm">Artisan Stamina Saver</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Maintaining cadence between 380–450 RPM allows uninterrupted 4-hour spinning sessions without joint strain.
          </p>
          <div className="mt-3 text-xs font-extrabold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md inline-block">
            Fatigue Score: Low
          </div>
        </div>
      </div>
    </div>
  );
}
