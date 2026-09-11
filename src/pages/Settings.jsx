import React, { useState } from 'react';
import { Settings as SettingsIcon, Wifi, Sliders, Globe, Bell, Shield, Save, CheckCircle } from 'lucide-react';

export default function Settings({ simulation }) {
  const [savedMessage, setSavedMessage] = useState(false);
  const [esp32Ip, setEsp32Ip] = useState('192.168.4.1');
  const [mqttBroker, setMqttBroker] = useState('broker.hivemq.com');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [minRpmThreshold, setMinRpmThreshold] = useState(380);
  const [maxRpmThreshold, setMaxRpmThreshold] = useState(450);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <SettingsIcon className="w-6 h-6 text-khadi-500" />
          System Settings & IoT Hardware Configuration
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Configure simulated sensors, ESP32 IoT endpoints, alert thresholds, and language preferences
        </p>
      </div>

      {savedMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          Settings successfully saved! Sensor limits updated.
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Future IoT ESP32 Connection Hook */}
        <div className="bg-white rounded-3xl p-6 border border-khadi-200/80 shadow-soft">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-slate-900 text-white">
              <Wifi className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 text-base">
                ESP32 Hardware Sensor Gateway Settings
              </h2>
              <p className="text-xs text-slate-500">
                Connect real ESP32 microcontrollers & physical Hall RPM sensors when prototype hardware is connected.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Data Source Engine Mode
              </label>
              <select className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 font-medium focus:ring-2 focus:ring-khadi-500">
                <option value="simulated">🟢 Realistic Simulated Live Sensors (Current Active MVP)</option>
                <option value="esp32-wifi">📡 Real ESP32 WiFi Access Point (192.168.4.1)</option>
                <option value="mqtt-cloud">☁️ MQTT Cloud Broker Stream</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                ESP32 Local Access Point IP
              </label>
              <input
                type="text"
                value={esp32Ip}
                onChange={(e) => setEsp32Ip(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                MQTT Broker Host Endpoint
              </label>
              <input
                type="text"
                value={mqttBroker}
                onChange={(e) => setMqttBroker(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                MQTT Telemetry Topic
              </label>
              <input
                type="text"
                defaultValue="smartkhadi/ergospin/lakshmi/telemetry"
                className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Sensor Threshold Configuration */}
        <div className="bg-white rounded-3xl p-6 border border-khadi-200/80 shadow-soft">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-amber-500 text-white">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 text-base">
                Ergonomic & Quality Threshold Controls
              </h2>
              <p className="text-xs text-slate-500">
                Customize target RPM bands and alert trigger bounds.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Minimum Optimal RPM
              </label>
              <input
                type="number"
                value={minRpmThreshold}
                onChange={(e) => setMinRpmThreshold(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
              />
              <span className="text-[10px] text-slate-400">Default: 380 RPM</span>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Maximum Optimal RPM
              </label>
              <input
                type="number"
                value={maxRpmThreshold}
                onChange={(e) => setMaxRpmThreshold(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
              />
              <span className="text-[10px] text-slate-400">Default: 450 RPM</span>
            </div>
          </div>
        </div>

        {/* Section 3: Multi-language Support */}
        <div className="bg-white rounded-3xl p-6 border border-khadi-200/80 shadow-soft">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-emerald-600 text-white">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 text-base">
                Regional Language & Accessibility
              </h2>
              <p className="text-xs text-slate-500">
                Select interface language for regional artisan empowerment
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold">
            {['English', 'தமிழ் (Tamil)', 'हिन्दी (Hindi)', 'ગુજરાતી (Gujarati)'].map((lang) => (
              <button
                type="button"
                key={lang}
                onClick={() => setSelectedLanguage(lang.split(' ')[0])}
                className={`p-3 rounded-2xl border text-center transition ${
                  selectedLanguage === lang.split(' ')[0]
                    ? 'bg-khadi-500 text-white border-khadi-600 shadow-md'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-khadi-50'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Save Controls */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-khadi-500 hover:bg-khadi-600 text-white font-bold px-6 py-3 rounded-2xl text-sm transition shadow-lg shadow-khadi-500/25"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
}
