import React from 'react';
import {
  LayoutDashboard,
  Activity,
  Award,
  BarChart3,
  Bot,
  User,
  Settings as SettingsIcon,
  Play,
  Zap,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import CharkhaLogo from './CharkhaLogo';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'live-monitoring', label: 'Live Monitoring', icon: Activity },
  { id: 'yarn-quality', label: 'Yarn Quality', icon: Award },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'insights', label: 'Smart Insights', icon: Bot, badge: 'AI' },
  { id: 'profile', label: 'Artisan Profile', icon: User },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
];

export default function Sidebar({ activeTab, setActiveTab, isDemoMode, toggleDemoMode, isOpen, setIsOpen }) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 bg-white border-r border-khadi-200/80 shadow-soft flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-khadi-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CharkhaLogo className="w-10 h-10" />
            <div>
              <h1 className="font-extrabold text-lg leading-tight tracking-tight text-slate-900 flex items-center gap-1.5">
                SMART<span className="text-khadi-500">KHADI</span>
              </h1>
              <p className="text-[11px] font-semibold tracking-wider text-khadi-600 uppercase">
                ErgoSpin V2.0
              </p>
            </div>
          </div>
        </div>

        {/* Tagline Badge */}
        <div className="px-6 py-3 bg-khadi-50/70 border-b border-khadi-100/60 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-khadi-500 shrink-0" />
          <p className="text-[11px] font-medium text-slate-600 leading-tight">
            Better Comfort. Better Productivity.
          </p>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-khadi-500 text-white shadow-md shadow-khadi-500/20 font-semibold'
                    : 'text-slate-600 hover:bg-khadi-100/60 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded-md ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* SIH Hackathon Tag & Demo Action Button */}
        <div className="p-4 border-t border-khadi-100 bg-slate-50/50 space-y-3">
          <div className="bg-gradient-to-r from-emerald-50 to-amber-50 rounded-xl p-3 border border-emerald-200/60 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold mb-1">
              <Zap className="w-3.5 h-3.5 fill-current" />
              SIH 2026 Innovation
            </div>
            <p className="text-slate-600 text-[11px] leading-snug">
              Smart Hand-Spinning Telemetry & Ergonomic Assist.
            </p>
          </div>

          <button
            onClick={toggleDemoMode}
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 shadow-md ${
              isDemoMode
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white ring-2 ring-emerald-400 ring-offset-2 animate-pulse'
                : 'bg-gradient-to-r from-amber-500 to-khadi-500 hover:from-amber-600 hover:to-khadi-600 text-white shadow-khadi-500/25'
            }`}
          >
            <Play className={`w-4 h-4 fill-current ${isDemoMode ? 'animate-spin' : ''}`} />
            <span>{isDemoMode ? '🎬 DEMO ACTIVE' : '🎬 DEMO MODE'}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
