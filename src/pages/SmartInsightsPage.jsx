import React from 'react';
import { Bot, Sparkles, Zap, ShieldAlert, CheckCircle2, HeartPulse, Sliders, ChevronRight } from 'lucide-react';
import SmartInsights from '../components/SmartInsights';

export default function SmartInsightsPage({ simulation }) {
  const { insights, metrics } = simulation;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Bot className="w-6 h-6 text-khadi-500" />
          SmartKhadi Intelligence AI Advisory
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Real-time rule-based reasoning engine evaluating rotational speed, tension load, and artisan ergonomics
        </p>
      </div>

      {/* Main Insights Stream Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <SmartInsights insights={insights} compact={false} />

          {/* AI Decision Tree Architecture */}
          <div className="bg-white rounded-3xl p-6 border border-khadi-200/80 shadow-soft">
            <h3 className="font-extrabold text-slate-900 text-base mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              SmartKhadi Ergonomic Rule Matrix
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              How the rule engine transforms sensor telemetry into actionable recommendations:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200">
                <span className="font-extrabold text-amber-800 block mb-1">IF RPM &lt; 380:</span>
                <p className="text-slate-600">Triggers low speed advisory to prevent thread slack and boost daily weight output.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="font-extrabold text-emerald-800 block mb-1">IF 380 ≤ RPM ≤ 450:</span>
                <p className="text-slate-600">Confirms optimal ergonomic cadence. Minimizes artisan fatigue and maximizes yarn strength.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200">
                <span className="font-extrabold text-rose-800 block mb-1">IF RPM &gt; 450:</span>
                <p className="text-slate-600">Flags high speed risk. Prevents thread snapping, fiber fuzz, and yarn count degradation.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200">
                <span className="font-extrabold text-blue-800 block mb-1">IF Tension = HIGH:</span>
                <p className="text-slate-600">Alerts artisan to relax drafting hand force and turn spring damper knob.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Health & Ergonomics Tips */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-6 text-white shadow-soft">
            <div className="flex items-center gap-2 mb-3">
              <HeartPulse className="w-5 h-5 text-emerald-200" />
              <h3 className="font-extrabold text-base">Artisan Ergonomic Guard</h3>
            </div>
            <p className="text-xs text-emerald-100 leading-relaxed mb-4">
              ErgoSpin mechanical gearing reduces repetitive shoulder torque by 40% compared to traditional charkha wheels.
            </p>

            <div className="space-y-2 text-xs">
              <div className="bg-white/10 p-2.5 rounded-xl border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>Keep elbow at 90° handle height</span>
              </div>
              <div className="bg-white/10 p-2.5 rounded-xl border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>Maintain 410 RPM steady rhythm</span>
              </div>
              <div className="bg-white/10 p-2.5 rounded-xl border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>Take 2-min stretch every 60 mins</span>
              </div>
            </div>
          </div>

          {/* Livelihood Impact Metric */}
          <div className="bg-white rounded-3xl p-6 border border-khadi-200/80 shadow-soft">
            <h3 className="font-extrabold text-slate-900 text-sm mb-2">
              Livelihood Productivity Gain
            </h3>
            <p className="text-xs text-slate-500 mb-3">
              By eliminating quality rejections and thread breaks, daily earnings increase by up to 28%.
            </p>
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-center">
              <span className="text-xs font-bold text-amber-800 uppercase block">Est. Monthly Bonus</span>
              <span className="text-xl font-extrabold text-amber-900">₹ 2,450 / month</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
