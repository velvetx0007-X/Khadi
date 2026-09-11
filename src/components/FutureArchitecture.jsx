import React from 'react';
import { Cpu, ArrowRight, Server, Smartphone, Sparkles, Layers, Radio, CheckCircle, Flame } from 'lucide-react';

export default function FutureArchitecture() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-khadi-200/80 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-900 text-white shadow-xs">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              🔌 Future IoT Hardware Architecture
              <span className="text-[10px] uppercase font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                ESP32 Ready
              </span>
            </h2>
            <p className="text-xs text-slate-500">SIH 2026 Hardware-to-Cloud Integration Roadmap</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current MVP Flow */}
        <div className="bg-amber-50/50 rounded-xl p-5 border border-amber-200/70 relative">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-extrabold tracking-wider uppercase text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md">
              Current MVP Phase
            </span>
            <span className="text-[11px] font-semibold text-amber-700">Live Browser Telemetry</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="bg-white p-3.5 rounded-xl border border-amber-200 shadow-xs flex-1 w-full">
              <div className="text-xs font-bold text-slate-800">Simulated Sensor Data</div>
              <p className="text-[10px] text-slate-500 mt-0.5">Random Walk Engine</p>
            </div>
            <ArrowRight className="w-4 h-4 text-amber-500 shrink-0 rotate-90 sm:rotate-0" />
            <div className="bg-white p-3.5 rounded-xl border border-amber-200 shadow-xs flex-1 w-full">
              <div className="text-xs font-bold text-slate-800">SmartKhadi Dashboard</div>
              <p className="text-[10px] text-slate-500 mt-0.5">React Telemetry UI</p>
            </div>
            <ArrowRight className="w-4 h-4 text-amber-500 shrink-0 rotate-90 sm:rotate-0" />
            <div className="bg-white p-3.5 rounded-xl border border-amber-200 shadow-xs flex-1 w-full">
              <div className="text-xs font-bold text-slate-800">Analytics & Insights</div>
              <p className="text-[10px] text-slate-500 mt-0.5">Rule AI Advisory</p>
            </div>
          </div>
        </div>

        {/* Future System Architecture */}
        <div className="bg-emerald-50/50 rounded-xl p-5 border border-emerald-200/70">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-extrabold tracking-wider uppercase text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Future Hardware Integration
            </span>
            <span className="text-[11px] font-semibold text-emerald-700">MQTT / REST WebSockets</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
            <div className="bg-white p-2.5 rounded-lg border border-emerald-200 text-center">
              <div className="font-bold text-slate-800">1. ErgoSpin Machine</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Smart Hand Crank</div>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-emerald-200 text-center">
              <div className="font-bold text-slate-800">2. ESP32 Microcontroller</div>
              <div className="text-[10px] text-slate-500 mt-0.5">WiFi / BLE Transceiver</div>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-emerald-200 text-center">
              <div className="font-bold text-slate-800">3. Hall & Tension Sensors</div>
              <div className="text-[10px] text-slate-500 mt-0.5">RPM & Load Cells</div>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-emerald-200 text-center">
              <div className="font-bold text-slate-800">4. IoT Cloud API</div>
              <div className="text-[10px] text-slate-500 mt-0.5">AWS / Azure IoT Core</div>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-emerald-200 text-center">
              <div className="font-bold text-slate-800">5. SmartKhadi Dashboard</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Realtime Web App</div>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-emerald-200 text-center">
              <div className="font-bold text-slate-800">6. AI Productivity Insights</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Coop Livelihood Analytics</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
