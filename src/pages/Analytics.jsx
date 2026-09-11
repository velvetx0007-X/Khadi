import React from 'react';
import { BarChart3, TrendingUp, Clock, Scale, Zap, AlertTriangle, Calendar, Award } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { HISTORICAL_PRODUCTION } from '../utils/insightRules';

export default function Analytics({ simulation }) {
  const { metrics } = simulation;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-khadi-500" />
          Productivity & Performance Analytics
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Historical yield trends, cadence efficiency, and weekly cooperative metrics
        </p>
      </div>

      {/* Summary Box: Today's Performance */}
      <div className="bg-gradient-to-r from-khadi-500 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-khadi-200" />
            <h2 className="font-extrabold text-lg tracking-tight">Today's Performance Summary</h2>
          </div>
          <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">
            Live Accumulated Shift
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center sm:text-left">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <div className="flex items-center gap-1.5 text-khadi-200 text-xs font-medium mb-1">
              <Clock className="w-3.5 h-3.5" /> Total Session Time
            </div>
            <div className="text-2xl font-extrabold">4.5 Hours</div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <div className="flex items-center gap-1.5 text-khadi-200 text-xs font-medium mb-1">
              <Scale className="w-3.5 h-3.5" /> Estimated Output
            </div>
            <div className="text-2xl font-extrabold">3.2 kg</div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <div className="flex items-center gap-1.5 text-khadi-200 text-xs font-medium mb-1">
              <TrendingUp className="w-3.5 h-3.5" /> Average RPM
            </div>
            <div className="text-2xl font-extrabold">415 RPM</div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <div className="flex items-center gap-1.5 text-khadi-200 text-xs font-medium mb-1">
              <Zap className="w-3.5 h-3.5" /> Efficiency
            </div>
            <div className="text-2xl font-extrabold">89%</div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 col-span-2 sm:col-span-1">
            <div className="flex items-center gap-1.5 text-khadi-200 text-xs font-medium mb-1">
              <AlertTriangle className="w-3.5 h-3.5" /> Thread Break Events
            </div>
            <div className="text-2xl font-extrabold">2 Events</div>
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 1: Daily Yarn Production (kg) */}
        <div className="bg-white rounded-3xl p-6 border border-khadi-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Daily Yarn Production (kg)
              </h3>
              <p className="text-xs text-slate-500">Weekly output accumulated on ErgoSpin</p>
            </div>
            <span className="text-xs font-bold bg-amber-50 text-amber-800 px-2.5 py-1 rounded-md border border-amber-200">
              Avg: 3.1 kg / day
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={HISTORICAL_PRODUCTION} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', color: '#FFF', fontSize: '12px' }}
                />
                <Bar dataKey="outputKg" fill="#C86D27" radius={[6, 6, 0, 0]} name="Yarn Output (kg)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Efficiency & Yarn Quality Trend (%) */}
        <div className="bg-white rounded-3xl p-6 border border-khadi-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Efficiency & Quality Trends (%)
              </h3>
              <p className="text-xs text-slate-500">Productivity vs Quality Score correlation</p>
            </div>
            <span className="text-xs font-bold bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-md border border-emerald-200">
              Peak: 96%
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={HISTORICAL_PRODUCTION} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis domain={[70, 100]} tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', color: '#FFF', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" dataKey="efficiency" stroke="#059669" strokeWidth={3} name="Efficiency (%)" />
                <Line type="monotone" dataKey="quality" stroke="#2563EB" strokeWidth={3} name="Quality Score" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* RPM Performance Trend Chart */}
      <div className="bg-white rounded-3xl p-6 border border-khadi-200/80 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">
              Weekly RPM Speed Range & Consistency
            </h3>
            <p className="text-xs text-slate-500">
              Maintained optimal 380–450 RPM velocity zone 94% of total spinning duration.
            </p>
          </div>
          <span className="text-xs font-bold bg-blue-50 text-blue-800 px-3 py-1 rounded-full border border-blue-200">
            Optimal Compliance: 94%
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={HISTORICAL_PRODUCTION} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748B' }} />
              <YAxis domain={[350, 460]} tick={{ fontSize: 11, fill: '#64748B' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', color: '#FFF', fontSize: '12px' }}
              />
              <Line type="monotone" dataKey="rpmAvg" stroke="#D97706" strokeWidth={3} dot={{ r: 5 }} name="Avg Session RPM" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
