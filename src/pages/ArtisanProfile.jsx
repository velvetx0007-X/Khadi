import React from 'react';
import { User, MapPin, Award, Calendar, Scale, ShieldCheck, Sparkles, CheckCircle2, TrendingUp } from 'lucide-react';

export default function ArtisanProfile({ simulation }) {
  const { metrics } = simulation;

  return (
    <div className="space-y-8 pb-12">
      {/* Profile Header Hero Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-khadi-200/80 shadow-soft">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar Circle */}
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-khadi-500 via-amber-400 to-emerald-400 p-1 shadow-lg">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-3xl font-extrabold text-white">
                LK
              </div>
            </div>
            <span className="absolute bottom-1 right-1 bg-emerald-500 text-white p-1.5 rounded-full ring-4 ring-white">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>

          {/* Artisan Info */}
          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Lakshmi
              </h1>
              {/* Badge: 🏆 Skilled Artisan */}
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-extrabold text-xs border border-amber-300 shadow-xs">
                🏆 Skilled Artisan
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 flex items-center justify-center md:justify-start gap-1.5 font-medium">
              <MapPin className="w-4 h-4 text-rose-500" />
              Tamil Nadu, India • Khadi Weaver Cooperative Society #402
            </p>

            <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
              Master Khadi hand-spinner dedicated to traditional organic cotton yarn spinning with modern ErgoSpin ergonomic telemetry assistance.
            </p>
          </div>
        </div>

        {/* Quick Profile Key Details Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-khadi-100">
          <div className="p-4 rounded-2xl bg-khadi-50/70 border border-khadi-200">
            <span className="text-[11px] font-bold text-khadi-700 uppercase block mb-1">
              Experience
            </span>
            <span className="text-xl font-extrabold text-slate-900">8 Years</span>
          </div>

          <div className="p-4 rounded-2xl bg-khadi-50/70 border border-khadi-200">
            <span className="text-[11px] font-bold text-khadi-700 uppercase block mb-1">
              Today's Output
            </span>
            <span className="text-xl font-extrabold text-slate-900">
              {metrics.estimatedOutput > 0 ? metrics.estimatedOutput : '3.2'} kg
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-khadi-50/70 border border-khadi-200">
            <span className="text-[11px] font-bold text-khadi-700 uppercase block mb-1">
              Monthly Performance
            </span>
            <span className="text-xl font-extrabold text-emerald-600">High</span>
          </div>

          <div className="p-4 rounded-2xl bg-khadi-50/70 border border-khadi-200">
            <span className="text-[11px] font-bold text-khadi-700 uppercase block mb-1">
              Quality Grade
            </span>
            <span className="text-xl font-extrabold text-slate-900">Grade A Fine</span>
          </div>
        </div>
      </div>

      {/* Artisan Impact & Equipment Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Achievements & Badges */}
        <div className="bg-white rounded-3xl p-6 border border-khadi-200/80 shadow-soft">
          <h3 className="font-extrabold text-slate-900 text-base mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            Artisan Badges & Recognition
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500 text-white font-bold text-base">🏆</div>
              <div>
                <h4 className="font-bold text-slate-900">Master Spinning Artisan Badge</h4>
                <p className="text-slate-600 mt-0.5">Awarded for 8+ years of high-count yarn consistency.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-600 text-white font-bold text-base">🌱</div>
              <div>
                <h4 className="font-bold text-slate-900">Zero Carbon Sustainability Pioneer</h4>
                <p className="text-slate-600 mt-0.5">Operates 100% human-powered spinning with ErgoSpin flywheel assist.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-600 text-white font-bold text-base">🧵</div>
              <div>
                <h4 className="font-bold text-slate-900">Zero Break Streak Holder</h4>
                <p className="text-slate-600 mt-0.5">Achieved 4 continuous hours without thread snap events.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Assigned Equipment Specs */}
        <div className="bg-white rounded-3xl p-6 border border-khadi-200/80 shadow-soft">
          <h3 className="font-extrabold text-slate-900 text-base mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-khadi-500" />
            Assigned SmartKhadi Machine Specs
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 font-semibold">Model Name</span>
              <span className="font-bold text-slate-900">SmartKhadi ErgoSpin V2.0</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 font-semibold">IoT Telemetry Node</span>
              <span className="font-bold text-emerald-600 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> ESP32 Smart Module
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 font-semibold">Sensors Integrated</span>
              <span className="font-bold text-slate-900">Hall Optical RPM + Spring Load Cell</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 font-semibold">Gearing Assist</span>
              <span className="font-bold text-slate-900">Solar Flywheel Energy Store</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-500 font-semibold">Ergonomic Rating</span>
              <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                Grade A ISO 9241 Certified
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
