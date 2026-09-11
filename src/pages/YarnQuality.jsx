import React from 'react';
import { Award, ShieldCheck, AlertTriangle, Activity, Sliders, CheckCircle2, FileText, Info } from 'lucide-react';
import YarnGauge from '../components/YarnGauge';

export default function YarnQuality({ simulation }) {
  const { metrics } = simulation;
  const score = metrics.yarnQualityScore;

  // Breakdown metrics based on current live state
  const rpmStabilityScore = Math.max(60, Math.min(99, 100 - Math.abs(metrics.rpm - 415)));
  const tensionStabilityScore = metrics.tension === 'OPTIMAL' ? 96 : metrics.tension === 'LOW' ? 82 : 70;
  const breakScore = Math.max(50, 100 - metrics.totalBreaksCount * 8);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Award className="w-6 h-6 text-khadi-500" />
          Yarn Quality Monitor & Analytics
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Real-time thread count uniformity, tensile strength, and break risk evaluation
        </p>
      </div>

      {/* Main Score & Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Circular Gauge Card */}
        <div className="lg:col-span-1 bg-white rounded-3xl p-6 border border-khadi-200/80 shadow-soft flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h2 className="font-extrabold text-slate-900 text-base">Overall Yarn Quality Index</h2>
          </div>
          <p className="text-xs text-slate-500 mb-4 max-w-xs">
            Automated composite score based on RPM stability, tension variance & thread snapping events.
          </p>

          <YarnGauge score={score} size={210} />

          {/* Rating Bracket Scale Legend */}
          <div className="w-full mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] font-semibold text-left">
            <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 p-2 rounded-lg">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <span>90–100: Excellent</span>
            </div>
            <div className="flex items-center gap-1.5 bg-blue-50 text-blue-800 p-2 rounded-lg">
              <span className="h-2 w-2 rounded-full bg-blue-500"></span>
              <span>75–89: Good</span>
            </div>
            <div className="flex items-center gap-1.5 bg-amber-50 text-amber-800 p-2 rounded-lg">
              <span className="h-2 w-2 rounded-full bg-amber-500"></span>
              <span>50–74: Attention</span>
            </div>
            <div className="flex items-center gap-1.5 bg-rose-50 text-rose-800 p-2 rounded-lg">
              <span className="h-2 w-2 rounded-full bg-rose-500"></span>
              <span>&lt;50: High Risk</span>
            </div>
          </div>
        </div>

        {/* Right: Component Parameter Breakdown */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-khadi-200/80 shadow-soft space-y-6">
          <div>
            <h2 className="font-extrabold text-slate-900 text-lg mb-1">
              Quality Parameter Breakdown
            </h2>
            <p className="text-xs text-slate-500">
              Live calculation metrics evaluating Khadi thread parameters
            </p>
          </div>

          <div className="space-y-4">
            {/* 1. RPM Stability */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amber-600" />
                  <span className="font-bold text-sm text-slate-800">1. RPM Stability Index</span>
                </div>
                <span className="font-extrabold text-sm text-slate-900">{rpmStabilityScore}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-amber-500 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${rpmStabilityScore}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                Evaluates cadence consistency. Maintains uniform Twist Per Inch (TPI).
              </p>
            </div>

            {/* 2. Yarn Tension Stability */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-blue-600" />
                  <span className="font-bold text-sm text-slate-800">2. Drafting Tension Stability</span>
                </div>
                <span className="font-extrabold text-sm text-slate-900">{tensionStabilityScore}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${tensionStabilityScore}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                Measures strain on cotton fibers during drafting phase.
              </p>
            </div>

            {/* 3. Thread Break Continuity */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-sm text-slate-800">3. Thread Break Continuity Score</span>
                </div>
                <span className="font-extrabold text-sm text-slate-900">{breakScore}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${breakScore}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                Total breaks recorded in session: <strong>{metrics.totalBreaksCount} events</strong> (Low risk).
              </p>
            </div>
          </div>

          {/* Key Textile Parameters Box */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-khadi-50 border border-khadi-200 text-center">
              <span className="text-[10px] uppercase font-bold text-khadi-700 block">Ne Count Grade</span>
              <span className="text-base font-extrabold text-slate-900">33s Fine</span>
            </div>
            <div className="p-3 rounded-xl bg-khadi-50 border border-khadi-200 text-center">
              <span className="text-[10px] uppercase font-bold text-khadi-700 block">Twist / Inch (TPI)</span>
              <span className="text-base font-extrabold text-slate-900">18.4 TPI</span>
            </div>
            <div className="p-3 rounded-xl bg-khadi-50 border border-khadi-200 text-center">
              <span className="text-[10px] uppercase font-bold text-khadi-700 block">Tensile Strength</span>
              <span className="text-base font-extrabold text-slate-900">240 cN</span>
            </div>
            <div className="p-3 rounded-xl bg-khadi-50 border border-khadi-200 text-center">
              <span className="text-[10px] uppercase font-bold text-khadi-700 block">Hairiness Index</span>
              <span className="text-base font-extrabold text-slate-900">4.1 Low</span>
            </div>
          </div>
        </div>
      </div>

      {/* Session Event Log */}
      <div className="bg-white rounded-3xl p-6 border border-khadi-200/80 shadow-soft">
        <h3 className="font-extrabold text-slate-900 text-base mb-4 flex items-center gap-2">
          <FileText className="w-4 h-4 text-khadi-600" />
          Yarn Quality Session Telemetry Log
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase font-semibold">
                <th className="p-3 rounded-l-lg">Time</th>
                <th className="p-3">Event Type</th>
                <th className="p-3">Spinning Speed</th>
                <th className="p-3">Tension Load</th>
                <th className="p-3">Calculated Quality</th>
                <th className="p-3 rounded-r-lg">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              <tr>
                <td className="p-3">02:14:10</td>
                <td className="p-3">Continuous Draft</td>
                <td className="p-3 font-bold">{metrics.rpm} RPM</td>
                <td className="p-3">{metrics.tension}</td>
                <td className="p-3 font-extrabold text-emerald-600">{metrics.yarnQualityScore} / 100</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">NORMAL</span></td>
              </tr>
              <tr>
                <td className="p-3">01:52:45</td>
                <td className="p-3">Bobbin Changeover</td>
                <td className="p-3 font-bold">395 RPM</td>
                <td className="p-3">OPTIMAL</td>
                <td className="p-3 font-extrabold text-emerald-600">95 / 100</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">STATIONARY</span></td>
              </tr>
              <tr>
                <td className="p-3">01:15:30</td>
                <td className="p-3">Micro-Sliver Adjustment</td>
                <td className="p-3 font-bold">465 RPM</td>
                <td className="p-3">HIGH</td>
                <td className="p-3 font-extrabold text-amber-600">76 / 100</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">WARNING</span></td>
              </tr>
              <tr>
                <td className="p-3">00:40:12</td>
                <td className="p-3">Session Start</td>
                <td className="p-3 font-bold">410 RPM</td>
                <td className="p-3">OPTIMAL</td>
                <td className="p-3 font-extrabold text-emerald-600">92 / 100</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">INITIALIZED</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
