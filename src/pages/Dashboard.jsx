import React from 'react';
import {
  Activity,
  Gauge,
  Zap,
  Award,
  Clock,
  Scale,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Flame,
  ChevronRight
} from 'lucide-react';
import MetricCard from '../components/MetricCard';
import SmartInsights from '../components/SmartInsights';
import FutureArchitecture from '../components/FutureArchitecture';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine
} from 'recharts';

export default function Dashboard({ simulation, setActiveTab }) {
  const { metrics, rpmHistory, insights, isDemoMode, toggleDemoMode } = simulation;

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-khadi-900 to-amber-950 p-6 sm:p-8 text-white shadow-card">
        {/* Background Subtle Charkha Pattern */}
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-6">
          <svg className="w-80 h-80 text-white fill-current animate-spin-slow" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="4" fill="none" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a, idx) => (
              <line
                key={idx}
                x1="50"
                y1="50"
                x2={50 + 36 * Math.cos((a * Math.PI) / 180)}
                y2={50 + 36 * Math.sin((a * Math.PI) / 180)}
                stroke="currentColor"
                strokeWidth="2"
              />
            ))}
          </svg>
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-khadi-300 text-xs font-semibold mb-4 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Smartkhadi ErgoSpin Intelligence Platform</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Good Morning, Lakshmi 👋
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-2 font-normal leading-relaxed">
            Monitor your spinning performance and improve productivity.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('live-monitoring')}
              className="inline-flex items-center gap-2 bg-khadi-500 hover:bg-khadi-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition shadow-lg shadow-khadi-500/30"
            >
              <Activity className="w-4 h-4" />
              <span>Open Live Monitor</span>
            </button>
            <button
              onClick={toggleDemoMode}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2.5 rounded-xl text-sm border border-white/15 backdrop-blur-sm transition"
            >
              <span>{isDemoMode ? 'Stop Demo Mode' : '🎬 Run Demo Walkthrough'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Six Live Metric Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Zap className="w-4 h-4 text-khadi-500" />
            Live Machine Telemetry
          </h2>
          <span className="text-xs text-slate-500 font-medium">Updates every 2.5s</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* 1. Current RPM */}
          <MetricCard
            title="1. Current RPM"
            value={metrics.rpm}
            unit="RPM"
            statusTag={metrics.rpm >= 380 && metrics.rpm <= 450 ? 'OPTIMAL' : metrics.rpm < 380 ? 'LOW SPEED' : 'HIGH SPEED'}
            statusColor={metrics.rpm >= 380 && metrics.rpm <= 450 ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-amber-50 text-amber-800 border-amber-200'}
            icon={Gauge}
            iconBg="bg-amber-100 text-amber-700"
            subtitle="Target: 380–450 RPM"
            highlight={true}
          />

          {/* 2. Yarn Tension */}
          <MetricCard
            title="2. Yarn Tension"
            value={metrics.tension}
            statusTag={metrics.tension === 'OPTIMAL' ? 'STABLE' : 'ADJUST NEEDED'}
            statusColor={metrics.tension === 'OPTIMAL' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'}
            icon={Activity}
            iconBg="bg-blue-100 text-blue-700"
            subtitle="Spring Tension Load Cell"
          />

          {/* 3. Productivity Score */}
          <MetricCard
            title="3. Productivity Score"
            value={`${metrics.productivityScore}%`}
            statusTag="ON TARGET"
            statusColor="bg-emerald-50 text-emerald-800 border-emerald-200"
            icon={Zap}
            iconBg="bg-emerald-100 text-emerald-700"
            subtitle="Daily Yield Efficiency"
            trend="+4.2% vs yesterday"
          />

          {/* 4. Yarn Quality */}
          <MetricCard
            title="4. Yarn Quality"
            value={metrics.yarnQualityScore >= 90 ? 'EXCELLENT' : metrics.yarnQualityScore >= 75 ? 'GOOD' : 'NEEDS ATTENTION'}
            statusTag={`Score: ${metrics.yarnQualityScore}/100`}
            statusColor="bg-indigo-50 text-indigo-800 border-indigo-200"
            icon={Award}
            iconBg="bg-indigo-100 text-indigo-700"
            subtitle="Grade A Tensile Count"
          />

          {/* 5. Session Time */}
          <MetricCard
            title="5. Session Time"
            value={metrics.sessionTimeFormatted}
            statusTag="ACTIVE"
            statusColor="bg-emerald-50 text-emerald-800 border-emerald-200"
            icon={Clock}
            iconBg="bg-purple-100 text-purple-700"
            subtitle="Continuous Spinning"
          />

          {/* 6. Estimated Output */}
          <MetricCard
            title="6. Estimated Output"
            value={metrics.estimatedOutput}
            unit="kg"
            statusTag="ACCUMULATING"
            statusColor="bg-amber-50 text-amber-800 border-amber-200"
            icon={Scale}
            iconBg="bg-khadi-100 text-khadi-700"
            subtitle="Yarn Yield Target: 3.5 kg"
          />
        </div>
      </div>

      {/* Live Chart Preview & Smart Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Real-time RPM Chart Snippet */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-khadi-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Live Speed Telemetry (RPM over time)
              </h3>
              <p className="text-xs text-slate-500">Green zone represents optimal 380–450 RPM range</p>
            </div>
            <button
              onClick={() => setActiveTab('live-monitoring')}
              className="text-xs font-bold text-khadi-600 hover:text-khadi-700 flex items-center gap-1"
            >
              Full Screen Monitor <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={rpmHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="rpmGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C86D27" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#C86D27" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#64748B' }} />
                <YAxis domain={[300, 500]} tick={{ fontSize: 10, fill: '#64748B' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1E293B', borderRadius: '12px', color: '#FFF', fontSize: '12px' }}
                />
                <ReferenceLine y={380} stroke="#10B981" strokeDasharray="3 3" label={{ value: 'Min Optimal (380)', fill: '#059669', fontSize: 10 }} />
                <ReferenceLine y={450} stroke="#10B981" strokeDasharray="3 3" label={{ value: 'Max Optimal (450)', fill: '#059669', fontSize: 10 }} />
                <Area type="monotone" dataKey="rpm" stroke="#C86D27" strokeWidth={3} fill="url(#rpmGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Instant Advice Banner */}
          <div className={`mt-4 p-3.5 rounded-xl border ${metrics.rpmStatusColor} flex items-center justify-between text-xs font-bold`}>
            <span>{metrics.rpmStatusText}</span>
            <span className="bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-extrabold shadow-xs">
              {metrics.rpm} RPM
            </span>
          </div>
        </div>

        {/* Smart AI Insights Widget */}
        <div className="lg:col-span-1">
          <SmartInsights
            insights={insights}
            compact={true}
            onViewAll={() => setActiveTab('insights')}
          />
        </div>
      </div>

      {/* Future Hardware Architecture Section */}
      <FutureArchitecture />
    </div>
  );
}
