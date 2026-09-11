import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Home, Activity, Feather, TrendingUp, Bot, User, Settings as SettingsIcon,
  Play, Square, Gauge, Clock, Package, Award, MapPin, CalendarDays,
  TriangleAlert, CircleCheck, Cpu, Cloud, Radio, Wind, ChevronRight,
  Sparkles, ArrowDown, Info, Mail, Lock, Phone, Landmark, LogOut,
  ShieldCheck, Users, BarChart3, Search, Filter, Pencil, Eye, EyeOff,
  ArrowLeft, CheckCircle2, Building2, KeyRound, Sprout,
} from "lucide-react";
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea,
} from "recharts";

/* ============================================================
   DESIGN TOKENS
   ============================================================ */
const TOKENS = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');

  .sk-root {
    --cream: #FAF6EC; --cream-deep: #F1E9D6; --panel: #FFFFFF;
    --ink: #2A2420; --ink-soft: #7A6E5E; --ink-faint: #A79C89; --border: #E7DEC8;
    --leaf: #1F5C43; --leaf-deep: #163F2F; --leaf-soft: #E4EFE6;
    --turmeric: #C68A2E; --turmeric-deep: #9C6A1E; --turmeric-soft: #FBF0DC;
    --indigo: #2B3A67; --indigo-soft: #E9ECF4;
    --terracotta: #AE5A38; --terracotta-soft: #F7E7DE;
    --danger: #A63A2C; --danger-soft: #F6E1DC;
    font-family: 'IBM Plex Sans', sans-serif; color: var(--ink); background: var(--cream);
  }
  .sk-root * { box-sizing: border-box; }
  .sk-serif { font-family: 'Fraunces', serif; }
  .sk-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
  .sk-scrollbar::-webkit-scrollbar-thumb { background: var(--border); border-radius: 8px; }
  .sk-card { background: var(--panel); border: 1px solid var(--border); border-radius: 18px; }

  .sk-nav-item { display:flex; align-items:center; gap:12px; padding:11px 16px; border-radius:12px; color:var(--ink-soft); font-size:14px; font-weight:500; cursor:pointer; transition:background .18s ease,color .18s ease; }
  .sk-nav-item:hover { background: var(--cream-deep); color: var(--ink); }
  .sk-nav-item.active { background: var(--leaf); color: #fff; }
  .sk-nav-item.active svg { color: #fff; }

  .sk-btn { display:inline-flex; align-items:center; justify-content:center; gap:8px; padding:10px 18px; border-radius:12px; font-weight:600; font-size:13.5px; cursor:pointer; border:1px solid transparent; transition:transform .12s ease, opacity .15s ease, background .15s ease; white-space:nowrap; }
  .sk-btn:active { transform: scale(0.97); }
  .sk-btn-primary { background: var(--leaf); color: #fff; }
  .sk-btn-primary:hover { background: var(--leaf-deep); }
  .sk-btn-outline { background: transparent; color: var(--ink); border-color: var(--border); }
  .sk-btn-outline:hover { background: var(--cream-deep); }
  .sk-btn-danger { background: var(--danger); color: #fff; }
  .sk-btn-danger:hover { opacity: 0.9; }
  .sk-btn:disabled { opacity: 0.45; cursor: not-allowed; }
  .sk-btn-lg { padding: 16px 28px; font-size: 15.5px; border-radius: 14px; }
  .sk-btn-block { width: 100%; }

  .sk-pill { display:inline-flex; align-items:center; gap:7px; padding:6px 13px; border-radius:999px; font-size:12.5px; font-weight:600; }
  .sk-dot { width:7px; height:7px; border-radius:50%; display:inline-block; }
  .sk-pulse { animation: sk-pulse 1.6s infinite; }
  @keyframes sk-pulse { 0%{box-shadow:0 0 0 0 rgba(31,92,67,.45);} 70%{box-shadow:0 0 0 7px rgba(31,92,67,0);} 100%{box-shadow:0 0 0 0 rgba(31,92,67,0);} }
  .sk-fade-in { animation: sk-fadeIn .45s ease both; }
  @keyframes sk-fadeIn { from{opacity:0; transform:translateY(6px);} to{opacity:1; transform:translateY(0);} }
  .sk-metric-num { font-family:'Fraunces',serif; font-weight:600; font-variant-numeric:tabular-nums; letter-spacing:-.01em; }
  .sk-thread { height:3px; width:100%; border-radius:3px; background:var(--border); overflow:hidden; }
  .sk-thread > div { height:100%; border-radius:3px; transition:width .5s ease, background .5s ease; }
  .sk-insight { display:flex; gap:12px; padding:14px 16px; border-radius:14px; background:var(--cream); }

  .sk-input-wrap { position:relative; margin-bottom:14px; }
  .sk-input-wrap svg.sk-input-icon { position:absolute; left:14px; top:50%; transform:translateY(-50%); color:var(--ink-faint); }
  .sk-input { width:100%; padding:12px 14px 12px 40px; border-radius:12px; border:1px solid var(--border); background:var(--cream); font-size:14px; font-family:'IBM Plex Sans',sans-serif; color:var(--ink); outline:none; transition:border-color .15s ease, background .15s ease; }
  .sk-input:focus { border-color: var(--leaf); background: #fff; }
  .sk-input-toggle { position:absolute; right:12px; top:50%; transform:translateY(-50%); cursor:pointer; color:var(--ink-faint); }
  .sk-label { font-size:12.5px; font-weight:600; color:var(--ink-soft); margin-bottom:6px; display:block; }

  .sk-auth-shell { min-height:100vh; display:flex; align-items:center; justify-content:center; background:
      radial-gradient(circle at 20% 15%, rgba(198,138,46,0.12), transparent 45%),
      radial-gradient(circle at 85% 85%, rgba(31,92,67,0.12), transparent 45%), var(--cream); padding:24px; }
  .sk-auth-card { width:100%; max-width:440px; background:var(--panel); border:1px solid var(--border); border-radius:22px; padding:38px 34px; }

  .sk-table { width:100%; border-collapse:collapse; font-size:13.5px; }
  .sk-table th { text-align:left; padding:10px 14px; font-size:11.5px; text-transform:uppercase; letter-spacing:.04em; color:var(--ink-faint); border-bottom:1px solid var(--border); font-weight:700; }
  .sk-table td { padding:12px 14px; border-bottom:1px solid var(--border); color:var(--ink); }
  .sk-table tr:last-child td { border-bottom:none; }

  .sk-tab { padding:8px 14px; border-radius:10px; font-size:13px; font-weight:600; cursor:pointer; color:var(--ink-soft); }
  .sk-tab.active { background:var(--leaf-soft); color:var(--leaf-deep); }

  .sk-modal-overlay { position:fixed; inset:0; background:rgba(42,36,32,0.45); display:flex; align-items:center; justify-content:center; z-index:50; padding:20px; }
  .sk-modal { background:var(--panel); border-radius:20px; max-width:440px; width:100%; padding:32px; }

  .sk-flow-box { border:1px solid var(--border); background:var(--panel); border-radius:14px; padding:12px 16px; display:flex; align-items:center; gap:10px; font-size:13px; font-weight:600; }
  .sk-avatar { border-radius:50%; display:flex; align-items:center; justify-content:center; font-family:'Fraunces',serif; font-weight:600; flex-shrink:0; }

  @media (max-width: 900px) {
    .sk-sidebar { display:none; }
    .sk-grid-responsive { grid-template-columns: 1fr !important; }
  }
`;

/* ============================================================
   HELPERS
   ============================================================ */
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const rand = (min, max) => Math.random() * (max - min) + min;
const pickWeighted = (opts) => {
  const total = opts.reduce((a, o) => a + o.w, 0);
  let r = Math.random() * total;
  for (const o of opts) { if (r < o.w) return o.v; r -= o.w; }
  return opts[0].v;
};
const fmtDuration = (ms) => {
  const totalMin = Math.round(ms / 60000);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  if (h <= 0) return `${m} Min`;
  return `${h} Hr ${m} Min`;
};
const fmtClock = (secs) => {
  const h = String(Math.floor(secs / 3600)).padStart(2, "0");
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
  const s = String(Math.floor(secs % 60)).padStart(2, "0");
  return `${h}:${m}:${s}`;
};
const dateStrOf = (ts) => {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
const todayStr = () => dateStrOf(Date.now());
const yesterdayStr = () => dateStrOf(Date.now() - 86400000);
const weekKey = (ts) => {
  const d = new Date(ts);
  const onejan = new Date(d.getFullYear(), 0, 1);
  const week = Math.ceil(((d - onejan) / 86400000 + onejan.getDay() + 1) / 7);
  return `${d.getFullYear()}-W${week}`;
};
const monthKey = (ts) => {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};
const TENSION_COLORS = { LOW: "var(--indigo)", OPTIMAL: "var(--leaf)", HIGH: "var(--terracotta)" };
const RISK_COLORS = { LOW: "var(--leaf)", MEDIUM: "var(--turmeric)", HIGH: "var(--danger)" };
const initials = (name = "") => name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() || "").join("") || "A";

/* ============================================================
   STORAGE FALLBACK POLYFILL & DATABASE LAYER
   ============================================================ */
const storageProvider = (typeof window !== 'undefined' && window.storage) ? window.storage : {
  async get(key) {
    const val = localStorage.getItem(key);
    return val !== null ? { value: val } : null;
  },
  async set(key, value) {
    localStorage.setItem(key, value);
  },
  async delete(key) {
    localStorage.removeItem(key);
  },
  async list(prefix) {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(prefix)) keys.push(k);
    }
    return { keys };
  }
};

const db = {
  async getUser(email) {
    try {
      const r = await storageProvider.get(`sk_user:${email.toLowerCase()}`);
      return r ? JSON.parse(r.value) : null;
    } catch { return null; }
  },
  async saveUser(user) {
    await storageProvider.set(`sk_user:${user.email.toLowerCase()}`, JSON.stringify(user));
  },
  async listUsers() {
    try {
      const list = await storageProvider.list("sk_user:");
      const keys = list?.keys || [];
      const users = [];
      for (const k of keys) {
        try {
          const r = await storageProvider.get(k);
          if (r) users.push(JSON.parse(r.value));
        } catch {}
      }
      return users;
    } catch { return []; }
  },
  async getSessions(email) {
    try {
      const r = await storageProvider.get(`sk_sessions:${email.toLowerCase()}`);
      return r ? JSON.parse(r.value) : [];
    } catch { return []; }
  },
  async saveSessions(email, sessions) {
    await storageProvider.set(`sk_sessions:${email.toLowerCase()}`, JSON.stringify(sessions));
  },
  async listAllSessions() {
    try {
      const list = await storageProvider.list("sk_sessions:");
      const keys = list?.keys || [];
      let all = [];
      for (const k of keys) {
        try {
          const r = await storageProvider.get(k);
          if (r) all = all.concat(JSON.parse(r.value));
        } catch {}
      }
      return all;
    } catch { return []; }
  },
  async setCurrentEmail(email) {
    try { await storageProvider.set("sk_current_email", email); } catch {}
  },
  async getCurrentEmail() {
    try { const r = await storageProvider.get("sk_current_email"); return r ? r.value : null; } catch { return null; }
  },
  async clearCurrentEmail() {
    try { await storageProvider.delete("sk_current_email"); } catch {}
  },
  async isSeeded() {
    try { const r = await storageProvider.get("sk_seeded"); return !!r; } catch { return false; }
  },
  async markSeeded() {
    try { await storageProvider.set("sk_seeded", "1"); } catch {}
  },
};

async function seedDemoData() {
  if (await db.isSeeded()) return;
  await db.markSeeded();

  const admin = {
    id: "admin@smartkhadi.in", name: "SmartKhadi Admin", email: "admin@smartkhadi.in",
    password: "admin123", phone: "9000000000", location: "Coimbatore", district: "Coimbatore",
    state: "Tamil Nadu", experience: 0, role: "ADMIN", createdAt: Date.now(),
  };
  await db.saveUser(admin);

  const lakshmi = {
    id: "lakshmi@smartkhadi.in", name: "Lakshmi", email: "lakshmi@smartkhadi.in",
    password: "demo1234", phone: "9876543210", location: "Coimbatore", district: "Coimbatore",
    state: "Tamil Nadu", experience: 8, role: "ARTISAN", createdAt: Date.now() - 90 * 86400000,
  };
  await db.saveUser(lakshmi);

  // seed sample sessions for demo
  const sample = [];
  for (let i = 13; i >= 0; i--) {
    const day = Date.now() - i * 86400000;
    const start = day - rand(2, 5) * 3600000;
    const avgRpm = Math.round(rand(370, 460));
    const productivity = Math.round(rand(70, 95));
    const quality = Math.round(rand(60, 97));
    const output = +rand(1.2, 3.6).toFixed(1);
    const durationMs = rand(1.5, 4.5) * 3600000;
    sample.push({
      sessionId: `seed-${i}`, userId: lakshmi.email, machineId: "ERGO-001",
      startTime: start, endTime: start + durationMs, duration: durationMs,
      averageRPM: avgRpm, output, productivityScore: productivity, qualityScore: quality,
      threadBreaks: Math.round(rand(0, 3)), dateStr: dateStrOf(start),
    });
  }
  await db.saveSessions(lakshmi.email, sample);
}

/* ============================================================
   SESSION SIMULATION ENGINE
   ============================================================ */
function useSpinningSession(user) {
  const [isActive, setIsActive] = useState(false);
  const [rpm, setRpm] = useState(410);
  const [tension, setTension] = useState("OPTIMAL");
  const [efficiency, setEfficiency] = useState(84);
  const [threadRisk, setThreadRisk] = useState("LOW");
  const [output, setOutput] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [threadBreakCount, setThreadBreakCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [effSamples, setEffSamples] = useState([]);
  const [lastSummary, setLastSummary] = useState(null);
  const startTimeRef = useRef(null);

  const tick = useCallback(() => {
    setRpm((prev) => {
      const next = Math.round(clamp(prev + rand(-22, 22), 300, 500));
      setHistory((h) => [...h.slice(-39), { t: Date.now(), rpm: next }]);
      return next;
    });
    const nextTension = pickWeighted([{ v: "OPTIMAL", w: 6 }, { v: "LOW", w: 2 }, { v: "HIGH", w: 2 }]);
    setTension(nextTension);
    const eff = Math.round(rand(70, 95));
    setEfficiency(eff);
    setEffSamples((s) => [...s.slice(-59), eff]);
    const nextRisk = pickWeighted([{ v: "LOW", w: 6 }, { v: "MEDIUM", w: 2.5 }, { v: "HIGH", w: 1 }]);
    setThreadRisk(nextRisk);
    if (nextRisk === "HIGH" && Math.random() < 0.5) setThreadBreakCount((c) => c + 1);
    setOutput((o) => clamp(o + rand(0.01, 0.035), 0, 6));
  }, []);

  useEffect(() => {
    if (!isActive) return;
    const iv = setInterval(tick, 2200);
    return () => clearInterval(iv);
  }, [isActive, tick]);

  useEffect(() => {
    if (!isActive) return;
    const iv = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(iv);
  }, [isActive]);

  const qualityScore = useMemo(() => {
    const recent = history.slice(-10).map((h) => h.rpm);
    let stability = 100;
    if (recent.length > 2) {
      const mean = recent.reduce((a, b) => a + b, 0) / recent.length;
      const variance = recent.reduce((a, b) => a + (b - mean) ** 2, 0) / recent.length;
      stability = clamp(100 - Math.sqrt(variance) * 1.8, 0, 100);
    }
    const inRangeBonus = rpm >= 380 && rpm <= 450 ? 100 : rpm >= 340 && rpm <= 480 ? 70 : 40;
    const tensionScore = tension === "OPTIMAL" ? 100 : 55;
    const breakPenalty = clamp(threadBreakCount * 6, 0, 40);
    return Math.round(clamp(stability * 0.35 + inRangeBonus * 0.25 + tensionScore * 0.25 + efficiency * 0.15 - breakPenalty, 0, 100));
  }, [history, rpm, tension, efficiency, threadBreakCount]);

  const startSession = () => {
    startTimeRef.current = Date.now();
    setIsActive(true);
    setRpm(410); setTension("OPTIMAL"); setEfficiency(84); setThreadRisk("LOW");
    setOutput(0); setElapsed(0); setThreadBreakCount(0); setHistory([{ t: Date.now(), rpm: 410 }]); setEffSamples([84]);
    setLastSummary(null);
  };

  const endSession = async () => {
    if (!startTimeRef.current) return null;
    setIsActive(false);
    const endTime = Date.now();
    const startTime = startTimeRef.current;
    const avgRpm = Math.round(history.reduce((a, h) => a + h.rpm, 0) / (history.length || 1));
    const avgEff = Math.round(effSamples.reduce((a, b) => a + b, 0) / (effSamples.length || 1));
    const record = {
      sessionId: `s-${startTime}`, userId: user.email, machineId: "ERGO-001",
      startTime, endTime, duration: endTime - startTime,
      averageRPM: avgRpm || rpm, output: +output.toFixed(2),
      productivityScore: avgEff || efficiency, qualityScore, threadBreaks: threadBreakCount,
      dateStr: dateStrOf(startTime),
    };
    const existing = await db.getSessions(user.email);
    await db.saveSessions(user.email, [...existing, record]);
    startTimeRef.current = null;
    setLastSummary(record);
    return record;
  };

  return {
    isActive, rpm, tension, efficiency, threadRisk, output, elapsed,
    threadBreakCount, history, qualityScore, lastSummary,
    startSession, endSession, clearSummary: () => setLastSummary(null),
  };
}

/* ============================================================
   SHARED UI PIECES
   ============================================================ */
function CharkhaLogo({ spinning, size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="15" stroke="var(--leaf)" strokeWidth="2" />
      <g style={{ transformOrigin: "20px 20px", animation: spinning ? "sk-spin 2.4s linear infinite" : "none" }}>
        <line x1="20" y1="6" x2="20" y2="34" stroke="var(--turmeric)" strokeWidth="1.6" />
        <line x1="6" y1="20" x2="34" y2="20" stroke="var(--turmeric)" strokeWidth="1.6" />
        <line x1="9.8" y1="9.8" x2="30.2" y2="30.2" stroke="var(--turmeric)" strokeWidth="1.6" />
        <line x1="9.8" y1="30.2" x2="30.2" y2="9.8" stroke="var(--turmeric)" strokeWidth="1.6" />
      </g>
      <circle cx="20" cy="20" r="3" fill="var(--leaf)" />
      <style>{`@keyframes sk-spin { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }`}</style>
    </svg>
  );
}

function StatusPill({ active }) {
  return (
    <span className="sk-pill" style={{ background: active ? "var(--leaf-soft)" : "var(--cream-deep)", color: active ? "var(--leaf-deep)" : "var(--ink-soft)" }}>
      <span className={`sk-dot ${active ? "sk-pulse" : ""}`} style={{ background: active ? "var(--leaf)" : "var(--ink-faint)" }} />
      {active ? "SESSION ACTIVE" : "NO ACTIVE SESSION"}
    </span>
  );
}

function MetricCard({ icon, label, value, sub, accent, big }) {
  return (
    <div className="sk-card sk-fade-in" style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", alignItems: "center", justifyBetween: "space-between" }}>
        <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink-soft)" }}>{label}</span>
        <div style={{ width: 30, height: 30, borderRadius: 9, background: accent + "18", display: "flex", alignItems: "center", justifyCenter: "center", color: accent }}>{icon}</div>
      </div>
      <div className="sk-serif sk-metric-num" style={{ fontSize: big ? 30 : 26 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: "var(--ink-faint)" }}>{sub}</div>}
    </div>
  );
}

function speedStatus(rpm) {
  if (rpm < 380) return { text: "Low Speed — increase spinning speed slightly.", color: "var(--indigo)", bg: "var(--indigo-soft)", icon: <ArrowDown size={16} /> };
  if (rpm > 450) return { text: "High Speed — reduce speed to protect yarn quality.", color: "var(--danger)", bg: "var(--danger-soft)", icon: <TriangleAlert size={16} /> };
  return { text: "Optimal Speed — excellent performance.", color: "var(--leaf-deep)", bg: "var(--leaf-soft)", icon: <CircleCheck size={16} /> };
}
function qualityBand(score) {
  if (score >= 90) return { label: "Excellent", color: "var(--leaf)" };
  if (score >= 75) return { label: "Good", color: "var(--turmeric-deep)" };
  if (score >= 50) return { label: "Needs Attention", color: "var(--terracotta)" };
  return { label: "High Risk", color: "var(--danger)" };
}
const INSIGHT_STYLE = {
  success: { color: "var(--leaf-deep)", bg: "var(--leaf-soft)", icon: <CircleCheck size={18} /> },
  warning: { color: "var(--turmeric-deep)", bg: "var(--turmeric-soft)", icon: <TriangleAlert size={18} /> },
  danger: { color: "var(--danger)", bg: "var(--danger-soft)", icon: <TriangleAlert size={18} /> },
  info: { color: "var(--indigo)", bg: "var(--indigo-soft)", icon: <Info size={18} /> },
};

function generatePersonalInsights(session, pastSessions) {
  const list = [];
  const recentRpmSpread = session.history.length > 3
    ? Math.max(...session.history.slice(-8).map((h) => h.rpm)) - Math.min(...session.history.slice(-8).map((h) => h.rpm))
    : 0;

  if (!session.isActive && pastSessions.length === 0) {
    list.push({ type: "info", text: "Start your first spinning session to unlock personalized recommendations." });
    return list;
  }
  if (session.isActive && recentRpmSpread > 60) {
    list.push({ type: "warning", text: "Try maintaining a consistent spinning rhythm — your RPM is swinging widely." });
  }
  if (session.isActive && session.tension === "HIGH") {
    list.push({ type: "warning", text: "Reduce yarn tension to minimize breakage." });
  }
  if (session.isActive && session.rpm >= 380 && session.rpm <= 450) {
    list.push({ type: "success", text: "Your spinning speed is optimal. Maintain the current rhythm." });
  }
  if (session.isActive && session.threadRisk === "HIGH") {
    list.push({ type: "danger", text: "Thread break risk detected. Check yarn tension and slow down briefly." });
  }

  if (pastSessions.length >= 2) {
    const last = pastSessions[pastSessions.length - 1];
    const prev = pastSessions[pastSessions.length - 2];
    if (last.productivityScore > prev.productivityScore + 3) {
      list.push({ type: "success", text: "Great improvement! Your productivity increased compared to your previous session." });
    } else if (last.productivityScore < prev.productivityScore - 3) {
      list.push({ type: "warning", text: "Your spinning speed was below your average. Consider checking your working position." });
    }
  }
  if (!session.isActive && list.length === 0) {
    list.push({ type: "info", text: "No active session. Start spinning to receive live, personalized guidance." });
  }
  return list.slice(0, 4);
}

/* ============================================================
   AUTH PAGES
   ============================================================ */
function AuthShell({ children }) {
  return (
    <div className="sk-root sk-auth-shell">
      <style>{TOKENS}</style>
      <div className="sk-auth-card sk-fade-in">{children}</div>
    </div>
  );
}

function BrandHeader({ subtitle }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 28 }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}><CharkhaLogo size={40} /></div>
      <div className="sk-serif" style={{ fontSize: 22, fontWeight: 600 }}>SmartKhadi <span style={{ color: "var(--turmeric-deep)" }}>ErgoSpin</span></div>
      <div style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 6 }}>{subtitle}</div>
    </div>
  );
}

function WelcomePage({ goto }) {
  return (
    <AuthShell>
      <BrandHeader subtitle="A smart productivity platform for Khadi artisans" />
      <div className="sk-insight" style={{ background: "var(--leaf-soft)", marginBottom: 22 }}>
        <Sprout size={18} color="var(--leaf-deep)" />
        <span style={{ fontSize: 13, color: "var(--leaf-deep)" }}>Better Comfort. Better Productivity. Better Livelihoods.</span>
      </div>
      <button className="sk-btn sk-btn-primary sk-btn-lg sk-btn-block" onClick={() => goto("login")} style={{ marginBottom: 12 }}>
        Log In
      </button>
      <button className="sk-btn sk-btn-outline sk-btn-lg sk-btn-block" onClick={() => goto("register")}>
        Create an Artisan Account
      </button>
      <div style={{ marginTop: 22, fontSize: 12, color: "var(--ink-faint)", textAlign: "center", lineHeight: 1.6 }}>
        Demo credentials — Artisan: lakshmi@smartkhadi.in / demo1234<br />Admin: admin@smartkhadi.in / admin123
      </div>
    </AuthShell>
  );
}

function LoginPage({ goto, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    const user = await db.getUser(email.trim());
    setLoading(false);
    if (!user || user.password !== password) {
      setError("Incorrect email or password. Please try again.");
      return;
    }
    onLogin(user);
  };

  return (
    <AuthShell>
      <BrandHeader subtitle="Log in to continue your spinning sessions" />
      <form onSubmit={submit}>
        <div className="sk-input-wrap">
          <Mail size={16} className="sk-input-icon" />
          <input className="sk-input" type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="sk-input-wrap">
          <Lock size={16} className="sk-input-icon" />
          <input className="sk-input" type={showPw ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <span className="sk-input-toggle" onClick={() => setShowPw((s) => !s)}>{showPw ? <EyeOff size={16} /> : <Eye size={16} />}</span>
        </div>
        {error && <div style={{ color: "var(--danger)", fontSize: 12.5, marginBottom: 12 }}>{error}</div>}
        <div style={{ textAlign: "right", marginBottom: 16 }}>
          <span style={{ fontSize: 12.5, color: "var(--indigo)", cursor: "pointer", fontWeight: 600 }} onClick={() => goto("forgot")}>Forgot password?</span>
        </div>
        <button className="sk-btn sk-btn-primary sk-btn-lg sk-btn-block" type="submit" disabled={loading}>{loading ? "Logging in…" : "Log In"}</button>
      </form>
      <div style={{ textAlign: "center", marginTop: 18, fontSize: 13, color: "var(--ink-soft)" }}>
        New to SmartKhadi?{" "}
        <span style={{ color: "var(--leaf)", fontWeight: 600, cursor: "pointer" }} onClick={() => goto("register")}>Create an account</span>
      </div>
      <div style={{ textAlign: "center", marginTop: 10 }}>
        <span style={{ fontSize: 12.5, color: "var(--ink-faint)", cursor: "pointer" }} onClick={() => goto("welcome")}>← Back</span>
      </div>
    </AuthShell>
  );
}

function RegisterPage({ goto, onLogin }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", location: "", district: "", state: "", experience: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (Object.values(form).some((v) => String(v).trim() === "")) {
      setError("Please fill in every field to create your profile.");
      return;
    }
    setLoading(true);
    const existing = await db.getUser(form.email.trim());
    if (existing) {
      setLoading(false);
      setError("An account with this email already exists. Try logging in instead.");
      return;
    }
    const user = {
      id: form.email.trim().toLowerCase(), name: form.name.trim(), email: form.email.trim().toLowerCase(),
      password: form.password, phone: form.phone.trim(), location: form.location.trim(),
      district: form.district.trim(), state: form.state.trim(), experience: Number(form.experience) || 0,
      role: "ARTISAN", createdAt: Date.now(),
    };
    await db.saveUser(user);
    await db.saveSessions(user.email, []);
    setLoading(false);
    onLogin(user);
  };

  return (
    <AuthShell>
      <BrandHeader subtitle="Register to create your Artisan Profile" />
      <form onSubmit={submit}>
        <div className="sk-input-wrap"><User size={16} className="sk-input-icon" /><input className="sk-input" placeholder="Full name" value={form.name} onChange={set("name")} /></div>
        <div className="sk-input-wrap"><Mail size={16} className="sk-input-icon" /><input className="sk-input" type="email" placeholder="Email address" value={form.email} onChange={set("email")} /></div>
        <div className="sk-input-wrap"><Phone size={16} className="sk-input-icon" /><input className="sk-input" placeholder="Mobile number" value={form.phone} onChange={set("phone")} /></div>
        <div className="sk-input-wrap"><Lock size={16} className="sk-input-icon" /><input className="sk-input" type="password" placeholder="Password" value={form.password} onChange={set("password")} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div className="sk-input-wrap"><MapPin size={16} className="sk-input-icon" /><input className="sk-input" placeholder="Location" value={form.location} onChange={set("location")} /></div>
          <div className="sk-input-wrap"><Building2 size={16} className="sk-input-icon" /><input className="sk-input" placeholder="District" value={form.district} onChange={set("district")} /></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div className="sk-input-wrap"><Landmark size={16} className="sk-input-icon" /><input className="sk-input" placeholder="State" value={form.state} onChange={set("state")} /></div>
          <div className="sk-input-wrap"><CalendarDays size={16} className="sk-input-icon" /><input className="sk-input" type="number" min="0" placeholder="Years of experience" value={form.experience} onChange={set("experience")} /></div>
        </div>
        {error && <div style={{ color: "var(--danger)", fontSize: 12.5, marginBottom: 10 }}>{error}</div>}
        <button className="sk-btn sk-btn-primary sk-btn-lg sk-btn-block" type="submit" disabled={loading} style={{ marginTop: 4 }}>
          {loading ? "Creating your profile…" : "Create Account"}
        </button>
      </form>
      <div style={{ textAlign: "center", marginTop: 18, fontSize: 13, color: "var(--ink-soft)" }}>
        Already have an account?{" "}
        <span style={{ color: "var(--leaf)", fontWeight: 600, cursor: "pointer" }} onClick={() => goto("login")}>Log in</span>
      </div>
    </AuthShell>
  );
}

function ForgotPasswordPage({ goto }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const submit = (e) => { e.preventDefault(); setSent(true); };
  return (
    <AuthShell>
      <BrandHeader subtitle="Reset your password" />
      {sent ? (
        <div className="sk-insight" style={{ background: "var(--leaf-soft)" }}>
          <CheckCircle2 size={18} color="var(--leaf-deep)" />
          <span style={{ fontSize: 13.5, color: "var(--leaf-deep)" }}>If an account exists for {email}, a reset link has been sent.</span>
        </div>
      ) : (
        <form onSubmit={submit}>
          <div className="sk-input-wrap"><Mail size={16} className="sk-input-icon" /><input className="sk-input" type="email" placeholder="Your account email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
          <button className="sk-btn sk-btn-primary sk-btn-lg sk-btn-block" type="submit">Send Reset Link</button>
        </form>
      )}
      <div style={{ textAlign: "center", marginTop: 18 }}>
        <span style={{ fontSize: 13, color: "var(--indigo)", cursor: "pointer", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6 }} onClick={() => goto("login")}>
          <ArrowLeft size={14} /> Back to login
        </span>
      </div>
    </AuthShell>
  );
}

/* ============================================================
   APP SHELL: SIDEBAR + HEADER
   ============================================================ */
const ARTISAN_NAV = [
  { id: "dashboard", label: "Dashboard", icon: <Home size={17} /> },
  { id: "live", label: "Spinning Session", icon: <Activity size={17} /> },
  { id: "quality", label: "Yarn Quality", icon: <Feather size={17} /> },
  { id: "history", label: "My History", icon: <Clock size={17} /> },
  { id: "analytics", label: "Analytics", icon: <TrendingUp size={17} /> },
  { id: "insights", label: "Smart Insights", icon: <Bot size={17} /> },
  { id: "profile", label: "My Profile", icon: <User size={17} /> },
  { id: "settings", label: "Settings", icon: <SettingsIcon size={17} /> },
];
const ADMIN_NAV = [
  { id: "admin", label: "Admin Dashboard", icon: <ShieldCheck size={17} /> },
  { id: "artisans", label: "Artisans", icon: <Users size={17} /> },
  { id: "settings", label: "Settings", icon: <SettingsIcon size={17} /> },
];

function Sidebar({ page, setPage, user, onLogout, sessionActive }) {
  const nav = user.role === "ADMIN" ? ADMIN_NAV : ARTISAN_NAV;
  return (
    <div className="sk-sidebar" style={{ width: 246, flexShrink: 0, borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", padding: "22px 14px", gap: 4, position: "sticky", top: 0, height: "100vh" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 10px 22px" }}>
        <CharkhaLogo spinning={sessionActive} />
        <div>
          <div className="sk-serif" style={{ fontSize: 16.5, fontWeight: 600, lineHeight: 1.1 }}>SmartKhadi</div>
          <div style={{ fontSize: 10.5, letterSpacing: "0.06em", color: "var(--turmeric-deep)", fontWeight: 600 }}>ERGOSPIN</div>
        </div>
      </div>
      {nav.map((item) => (
        <div key={item.id} className={`sk-nav-item ${page === item.id ? "active" : ""}`} onClick={() => setPage(item.id)}>
          {item.icon}{item.label}
        </div>
      ))}
      <div style={{ flex: 1 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 10px", borderTop: "1px solid var(--border)" }}>
        <div className="sk-avatar" style={{ width: 34, height: 34, background: "var(--leaf-soft)", color: "var(--leaf-deep)", fontSize: 13 }}>{initials(user.name)}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.name}</div>
          <div style={{ fontSize: 10.5, color: "var(--ink-faint)" }}>{user.role === "ADMIN" ? "Administrator" : "Artisan"}</div>
        </div>
        <LogOut size={16} style={{ cursor: "pointer", color: "var(--ink-faint)" }} onClick={onLogout} />
      </div>
    </div>
  );
}

function PageHeader({ title, subtitle, right }) {
  return (
    <div style={{ display: "flex", justifyBetween: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 26 }}>
      <div>
        <div className="sk-serif" style={{ fontSize: 25, fontWeight: 600 }}>{title}</div>
        <div style={{ fontSize: 14, color: "var(--ink-soft)", marginTop: 4 }}>{subtitle}</div>
      </div>
      {right}
    </div>
  );
}

/* ============================================================
   ARTISAN: DASHBOARD
   ============================================================ */
function greetingWord() {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
}

function computeTodayStats(session, pastSessions) {
  const today = pastSessions.filter((s) => s.dateStr === todayStr());
  let totalMs = today.reduce((a, s) => a + s.duration, 0);
  let totalOutput = today.reduce((a, s) => a + s.output, 0);
  let avgRpm = today.length ? Math.round(today.reduce((a, s) => a + s.averageRPM, 0) / today.length) : 0;
  let avgProd = today.length ? Math.round(today.reduce((a, s) => a + s.productivityScore, 0) / today.length) : 0;
  let avgQuality = today.length ? Math.round(today.reduce((a, s) => a + s.qualityScore, 0) / today.length) : 0;
  if (session.isActive) {
    totalMs += session.elapsed * 1000;
    totalOutput += session.output;
    avgRpm = session.rpm;
    avgProd = session.efficiency;
    avgQuality = session.qualityScore;
  }
  return { totalMs, totalOutput, avgRpm, avgProd, avgQuality, count: today.length + (session.isActive ? 1 : 0) };
}

function DashboardPage({ user, session, pastSessions, setPage }) {
  const stats = computeTodayStats(session, pastSessions);
  return (
    <div>
      <PageHeader
        title={`${greetingWord()}, ${user.name.split(" ")[0]} 👋`}
        subtitle="Let's make today's spinning productive."
        right={<StatusPill active={session.isActive} />}
      />

      <img
        src="/ergo-spin-banner.svg"
        alt="SmartKhadi ErgoSpin - Preserving Tradition. Empowering Artisans."
        style={{ width: "100%", display: "block", marginBottom: 22, borderRadius: 12, border: "1px solid var(--border)" }}
      />

      {!session.isActive ? (
        <div className="sk-card sk-fade-in" style={{ padding: 26, marginBottom: 22, display: "flex", justifyBetween: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div className="sk-serif" style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Ready to spin?</div>
            <div style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>Start a session to begin tracking RPM, tension and yarn quality live.</div>
          </div>
          <button className="sk-btn sk-btn-primary sk-btn-lg" onClick={() => { session.startSession(); setPage("live"); }}>
            <Play size={17} /> Start Spinning
          </button>
        </div>
      ) : (
        <div className="sk-card sk-fade-in" style={{ padding: 22, marginBottom: 22, display: "flex", justifyBetween: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14, borderColor: "var(--leaf)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span className="sk-dot sk-pulse" style={{ background: "var(--leaf)", width: 10, height: 10 }} />
            <div>
              <div style={{ fontWeight: 600 }}>Session in progress — {fmtClock(session.elapsed)}</div>
              <div style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>{session.rpm} RPM · {session.tension} tension</div>
            </div>
          </div>
          <button className="sk-btn sk-btn-outline" onClick={() => setPage("live")}>Go to Live Session <ChevronRight size={15} /></button>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 16 }}>
        <MetricCard icon={<Clock size={16} />} label="Today's Spinning Time" value={fmtDuration(stats.totalMs)} accent="var(--terracotta)" />
        <MetricCard icon={<Package size={16} />} label="Today's Yarn Output" value={`${stats.totalOutput.toFixed(1)} kg`} accent="var(--leaf)" />
        <MetricCard icon={<Gauge size={16} />} label="Average RPM" value={stats.avgRpm || "—"} accent="var(--indigo)" />
        <MetricCard icon={<TrendingUp size={16} />} label="Productivity Score" value={stats.avgProd ? `${stats.avgProd}%` : "—"} accent="var(--turmeric)" />
        <MetricCard icon={<Feather size={16} />} label="Yarn Quality Score" value={stats.avgQuality || "—"} sub={stats.avgQuality ? qualityBand(stats.avgQuality).label : "No sessions yet"} accent="var(--leaf)" big />
      </div>

      <div className="sk-card" style={{ padding: 22, marginTop: 22 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <Bot size={18} color="var(--leaf)" />
          <div className="sk-serif" style={{ fontSize: 17, fontWeight: 600 }}>SmartKhadi Intelligence</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {generatePersonalInsights(session, pastSessions).map((ins, i) => {
            const s = INSIGHT_STYLE[ins.type];
            return <div key={i} className="sk-insight" style={{ background: s.bg }}><span style={{ color: s.color }}>{s.icon}</span><span style={{ fontSize: 13, lineHeight: 1.45 }}>{ins.text}</span></div>;
          })}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ARTISAN: LIVE SPINNING SESSION
   ============================================================ */
function SessionSummaryModal({ summary, onClose }) {
  if (!summary) return null;
  const band = qualityBand(summary.qualityScore);
  return (
    <div className="sk-modal-overlay" onClick={onClose}>
      <div className="sk-modal sk-fade-in" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyCenter: "center", marginBottom: 14 }}>
          <div style={{ width: 54, height: 54, borderRadius: "50%", background: "var(--leaf-soft)", display: "flex", alignItems: "center", justifyCenter: "center" }}>
            <CheckCircle2 size={26} color="var(--leaf)" />
          </div>
        </div>
        <div className="sk-serif" style={{ fontSize: 20, fontWeight: 600, textAlign: "center", marginBottom: 2 }}>Session Completed</div>
        <div style={{ fontSize: 13, color: "var(--ink-soft)", textAlign: "center", marginBottom: 20 }}>Great work — here's how it went.</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
          <SummaryStat label="Duration" value={fmtDuration(summary.duration)} />
          <SummaryStat label="Average RPM" value={summary.averageRPM} />
          <SummaryStat label="Estimated Output" value={`${summary.output} kg`} />
          <SummaryStat label="Productivity" value={`${summary.productivityScore}%`} />
        </div>
        <div className="sk-pill" style={{ background: band.color + "1c", color: band.color, marginBottom: 20 }}>Yarn Quality: {band.label}</div>
        <button className="sk-btn sk-btn-primary sk-btn-block" onClick={onClose}>Done</button>
      </div>
    </div>
  );
}

function LiveSessionPage({ session, pastSessions }) {
  const status = speedStatus(session.rpm);
  return (
    <div>
      <PageHeader
        title="Spinning Session"
        subtitle="Track RPM, tension and yarn quality in real time."
        right={
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
            <StatusPill active={session.isActive} />
            {!session.isActive ? (
              <button className="sk-btn sk-btn-primary" onClick={session.startSession}><Play size={15} /> Start Spinning</button>
            ) : (
              <button className="sk-btn sk-btn-danger" onClick={session.endSession}><Square size={15} /> End Session</button>
            )}
          </div>
        }
      />

      {session.isActive ? (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 14, marginBottom: 18 }}>
            <MetricCard icon={<Clock size={16} />} label="Duration" value={fmtClock(session.elapsed)} accent="var(--terracotta)" />
            <MetricCard icon={<Gauge size={16} />} label="RPM" value={session.rpm} accent="var(--leaf)" />
            <MetricCard icon={<Wind size={16} />} label="Yarn Tension" value={session.tension} accent="var(--indigo)" />
            <MetricCard icon={<TrendingUp size={16} />} label="Productivity" value={`${session.efficiency}%`} accent="var(--turmeric)" />
            <MetricCard icon={<Package size={16} />} label="Yarn Output" value={`${session.output.toFixed(2)} kg`} accent="var(--leaf)" />
            <MetricCard icon={<TriangleAlert size={16} />} label="Thread Breaks" value={session.threadBreakCount} accent={RISK_COLORS[session.threadRisk]} />
          </div>
          <div className="sk-card" style={{ padding: 22 }}>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={session.history.map((h) => ({ ...h, label: new Date(h.t).toLocaleTimeString() }))}>
                <defs>
                  <linearGradient id="liveFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--leaf)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--leaf)" stopOpacity={0.03} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 5" vertical={false} />
                <ReferenceArea y1={380} y2={450} fill="var(--leaf)" fillOpacity={0.1} />
                <XAxis dataKey="label" tick={{ fontSize: 10, fill: "#A79C89" }} axisLine={false} tickLine={false} interval={4} />
                <YAxis domain={[280, 520]} tick={{ fontSize: 11, fill: "#A79C89" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #E7DEC8", fontSize: 12 }} />
                <Area type="monotone" dataKey="rpm" stroke="var(--leaf)" strokeWidth={2.6} fill="url(#liveFill)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
            <div className="sk-insight" style={{ marginTop: 14, background: status.bg }}>
              <span style={{ color: status.color }}>{status.icon}</span>
              <span style={{ fontSize: 13.5, fontWeight: 600, color: status.color }}>{status.text}</span>
            </div>
          </div>
        </>
      ) : (
        <div className="sk-card" style={{ padding: 50, textAlign: "center" }}>
          <Feather size={30} color="var(--ink-faint)" style={{ marginBottom: 12 }} />
          <div className="sk-serif" style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>No active session</div>
          <div style={{ fontSize: 13.5, color: "var(--ink-soft)", marginBottom: 18 }}>Press Start Spinning to begin tracking a new session.</div>
          <button className="sk-btn sk-btn-primary" onClick={session.startSession} style={{ margin: "0 auto" }}><Play size={15} /> Start Spinning</button>
        </div>
      )}
      <SessionSummaryModal summary={session.lastSummary} onClose={session.clearSummary} />
    </div>
  );
}

function SummaryStat({ label, value }) {
  return (
    <div style={{ background: "var(--cream)", border: "1px solid var(--border)", borderRadius: 14, padding: "12px 14px" }}>
      <div style={{ fontSize: 11, color: "var(--ink-soft)", fontWeight: 600, marginBottom: 4 }}>{label}</div>
      <div className="sk-serif" style={{ fontSize: 18, fontWeight: 600 }}>{value}</div>
    </div>
  );
}

/* ============================================================
   ARTISAN: YARN QUALITY
   ============================================================ */
function QualityRing({ score, color }) {
  const r = 78, c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r={r} stroke="var(--cream-deep)" strokeWidth="16" fill="none" />
      <circle cx="100" cy="100" r={r} stroke={color} strokeWidth="16" fill="none" strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round" transform="rotate(-90 100 100)" style={{ transition: "stroke-dashoffset .7s ease, stroke .5s ease" }} />
      <text x="100" y="94" textAnchor="middle" fontSize="34" fontWeight="600" fontFamily="Fraunces, serif" fill="var(--ink)">{score}</text>
      <text x="100" y="118" textAnchor="middle" fontSize="12" fill="var(--ink-soft)">out of 100</text>
    </svg>
  );
}
function QualityBar({ label, value, color, note }) {
  return (
    <div>
      <div style={{ display: "flex", justifyBetween: "space-between", fontSize: 13, marginBottom: 6 }}><span style={{ fontWeight: 600 }}>{label}</span><span style={{ color: "var(--ink-soft)" }}>{value}%</span></div>
      <div className="sk-thread"><div style={{ width: `${value}%`, background: color }} /></div>
      {note && <div style={{ fontSize: 11.5, color: "var(--ink-faint)", marginTop: 5 }}>{note}</div>}
    </div>
  );
}
function QualityPage({ session, pastSessions }) {
  const usingLive = session.isActive;
  const score = usingLive ? session.qualityScore : (pastSessions[pastSessions.length - 1]?.qualityScore ?? 0);
  const band = qualityBand(score);
  const recentRpm = usingLive ? session.history.slice(-10).map((h) => h.rpm) : [];
  const mean = recentRpm.reduce((a, b) => a + b, 0) / (recentRpm.length || 1);
  const variance = recentRpm.reduce((a, b) => a + (b - mean) ** 2, 0) / (recentRpm.length || 1);
  const rpmStabilityPct = usingLive ? Math.round(clamp(100 - Math.sqrt(variance) * 1.8, 0, 100)) : 80;
  const tensionStabilityPct = usingLive ? (session.tension === "OPTIMAL" ? 100 : 55) : 80;
  const breaks = usingLive ? session.threadBreakCount : (pastSessions[pastSessions.length - 1]?.threadBreaks ?? 0);

  return (
    <div>
      <PageHeader title="Yarn Quality Monitor" subtitle={usingLive ? "Live score for your current session." : "Score from your most recent completed session."} />
      {pastSessions.length === 0 && !usingLive ? (
        <div className="sk-card" style={{ padding: 50, textAlign: "center", color: "var(--ink-soft)" }}>Complete a spinning session to see your yarn quality score.</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 20 }} className="sk-grid-responsive">
          <div className="sk-card" style={{ padding: 26, display: "flex", flexDirection: "column", alignItems: "center", justifyCenter: "center", gap: 14 }}>
            <QualityRing score={score} color={band.color} />
            <span className="sk-pill" style={{ background: band.color + "1c", color: band.color }}>{band.label}</span>
          </div>
          <div className="sk-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="sk-serif" style={{ fontSize: 17, fontWeight: 600 }}>Score Breakdown</div>
            <QualityBar label="RPM Stability" value={rpmStabilityPct} color="var(--leaf)" />
            <QualityBar label="Tension Stability" value={tensionStabilityPct} color="var(--indigo)" />
            <QualityBar label="Thread Break Impact" value={clamp(100 - breaks * 15, 0, 100)} color="var(--terracotta)" note={`${breaks} break event(s)`} />
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[{ l: "90–100", t: "Excellent", c: "var(--leaf)" }, { l: "75–89", t: "Good", c: "var(--turmeric-deep)" }, { l: "50–74", t: "Needs Attention", c: "var(--terracotta)" }, { l: "< 50", t: "High Risk", c: "var(--danger)" }].map((b) => (
                <div key={b.t} className="sk-pill" style={{ background: "var(--cream-deep)", color: b.c, fontSize: 11.5 }}>{b.l} · {b.t}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   ARTISAN: HISTORY
   ============================================================ */
function HistoryPage({ pastSessions }) {
  const [query, setQuery] = useState("");
  const [range, setRange] = useState("all");

  const filtered = useMemo(() => {
    let list = [...pastSessions].sort((a, b) => b.startTime - a.startTime);
    if (range === "week") {
      const wk = weekKey(Date.now());
      list = list.filter((s) => weekKey(s.startTime) === wk);
    } else if (range === "month") {
      const mk = monthKey(Date.now());
      list = list.filter((s) => monthKey(s.startTime) === mk);
    }
    if (query.trim()) {
      list = list.filter((s) => s.dateStr.includes(query.trim()));
    }
    return list;
  }, [pastSessions, query, range]);

  return (
    <div>
      <PageHeader title="My Spinning History" subtitle="Every recorded session, searchable and filterable." />
      <div className="sk-card" style={{ padding: 18, marginBottom: 16, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <div className="sk-input-wrap" style={{ marginBottom: 0, flex: 1, minWidth: 200 }}>
          <Search size={16} className="sk-input-icon" />
          <input className="sk-input" placeholder="Search by date (YYYY-MM-DD)" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div style={{ display: "flex", gap: 4, background: "var(--cream)", padding: 4, borderRadius: 12 }}>
          {[{ id: "all", l: "All Time" }, { id: "week", l: "This Week" }, { id: "month", l: "This Month" }].map((r) => (
            <div key={r.id} className={`sk-tab ${range === r.id ? "active" : ""}`} onClick={() => setRange(r.id)}>{r.l}</div>
          ))}
        </div>
      </div>

      <div className="sk-card" style={{ overflow: "auto" }}>
        {filtered.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center", color: "var(--ink-soft)" }}><Filter size={22} style={{ marginBottom: 8 }} /><div>No sessions match this filter.</div></div>
        ) : (
          <table className="sk-table">
            <thead><tr><th>Date</th><th>Duration</th><th>Avg RPM</th><th>Yarn Output</th><th>Productivity</th><th>Yarn Quality</th></tr></thead>
            <tbody>
              {filtered.map((s) => {
                const band = qualityBand(s.qualityScore);
                return (
                  <tr key={s.sessionId}>
                    <td>{s.dateStr}</td>
                    <td>{fmtDuration(s.duration)}</td>
                    <td>{s.averageRPM}</td>
                    <td>{s.output.toFixed(1)} kg</td>
                    <td>{s.productivityScore}%</td>
                    <td><span style={{ color: band.color, fontWeight: 600 }}>{band.label}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   ARTISAN: ANALYTICS
   ============================================================ */
function groupSum(sessions, keyFn, valFn) {
  const map = {};
  sessions.forEach((s) => { map[keyFn(s)] = (map[keyFn(s)] || 0) + valFn(s); });
  return map;
}
function groupAvg(sessions, keyFn, valFn) {
  const sums = {}, counts = {};
  sessions.forEach((s) => { const k = keyFn(s); sums[k] = (sums[k] || 0) + valFn(s); counts[k] = (counts[k] || 0) + 1; });
  const out = {};
  Object.keys(sums).forEach((k) => { out[k] = Math.round(sums[k] / counts[k]); });
  return out;
}

function ChartCard({ title, children }) {
  return (
    <div className="sk-card" style={{ padding: 20 }}>
      <div className="sk-serif" style={{ fontSize: 15.5, fontWeight: 600, marginBottom: 10 }}>{title}</div>
      {children}
    </div>
  );
}
function CompareStat({ label, current, previous, unit = "" }) {
  const delta = previous ? Math.round(((current - previous) / previous) * 100) : 0;
  const up = current >= previous;
  return (
    <div style={{ background: "var(--cream)", border: "1px solid var(--border)", borderRadius: 14, padding: "14px 16px" }}>
      <div style={{ fontSize: 11.5, color: "var(--ink-soft)", fontWeight: 600, marginBottom: 6 }}>{label}</div>
      <div className="sk-serif" style={{ fontSize: 21, fontWeight: 600 }}>{current}{unit}</div>
      {previous > 0 && (
        <div style={{ fontSize: 11.5, color: up ? "var(--leaf-deep)" : "var(--danger)", marginTop: 4, fontWeight: 600 }}>
          {up ? "▲" : "▼"} {Math.abs(delta)}% vs previous
        </div>
      )}
    </div>
  );
}

function AnalyticsPage({ pastSessions }) {
  const days = useMemo(() => {
    const arr = [];
    for (let i = 13; i >= 0; i--) {
      const ts = Date.now() - i * 86400000;
      arr.push(dateStrOf(ts));
    }
    return arr;
  }, []);
  const dailyOutput = groupSum(pastSessions, (s) => s.dateStr, (s) => s.output);
  const dailyRpm = groupAvg(pastSessions, (s) => s.dateStr, (s) => s.averageRPM);
  const dailyQuality = groupAvg(pastSessions, (s) => s.dateStr, (s) => s.qualityScore);
  const dailyProd = groupAvg(pastSessions, (s) => s.dateStr, (s) => s.productivityScore);

  const productionSeries = days.map((d) => ({ day: d.slice(5), kg: +(dailyOutput[d] || 0).toFixed(1) }));
  const rpmSeries = days.map((d) => ({ day: d.slice(5), rpm: dailyRpm[d] || null }));
  const qualitySeries = days.map((d) => ({ day: d.slice(5), score: dailyQuality[d] || null }));
  const prodSeries = days.map((d) => ({ day: d.slice(5), score: dailyProd[d] || null }));

  const todaySessions = pastSessions.filter((s) => s.dateStr === todayStr());
  const yestSessions = pastSessions.filter((s) => s.dateStr === yesterdayStr());
  const todayOut = +todaySessions.reduce((a, s) => a + s.output, 0).toFixed(1);
  const yestOut = +yestSessions.reduce((a, s) => a + s.output, 0).toFixed(1);

  const thisWeek = pastSessions.filter((s) => weekKey(s.startTime) === weekKey(Date.now()));
  const lastWeek = pastSessions.filter((s) => weekKey(s.startTime) === weekKey(Date.now() - 7 * 86400000));
  const thisWeekProd = thisWeek.length ? Math.round(thisWeek.reduce((a, s) => a + s.productivityScore, 0) / thisWeek.length) : 0;
  const lastWeekProd = lastWeek.length ? Math.round(lastWeek.reduce((a, s) => a + s.productivityScore, 0) / lastWeek.length) : 0;

  const thisMonth = pastSessions.filter((s) => monthKey(s.startTime) === monthKey(Date.now()));
  const lastMonth = pastSessions.filter((s) => monthKey(s.startTime) === monthKey(new Date(new Date().setMonth(new Date().getMonth() - 1))));
  const thisMonthOut = +thisMonth.reduce((a, s) => a + s.output, 0).toFixed(1);
  const lastMonthOut = +lastMonth.reduce((a, s) => a + s.output, 0).toFixed(1);

  if (pastSessions.length === 0) {
    return (
      <div>
        <PageHeader title="Productivity Analytics" subtitle="Trends across your spinning sessions." />
        <div className="sk-card" style={{ padding: 50, textAlign: "center", color: "var(--ink-soft)" }}>Complete a few sessions to unlock your personal analytics.</div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Productivity Analytics" subtitle="Trends across your spinning sessions." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 18 }}>
        <CompareStat label="Today vs Yesterday (kg)" current={todayOut} previous={yestOut} unit=" kg" />
        <CompareStat label="This Week vs Last Week (avg productivity)" current={thisWeekProd} previous={lastWeekProd} unit="%" />
        <CompareStat label="This Month vs Last Month (kg)" current={thisMonthOut} previous={lastMonthOut} unit=" kg" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="sk-grid-responsive">
        <ChartCard title="Daily Yarn Production (kg)">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={productionSeries}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 5" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#A79C89" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#A79C89" }} axisLine={false} tickLine={false} width={28} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #E7DEC8", fontSize: 12 }} />
              <Bar dataKey="kg" fill="var(--turmeric)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="RPM Trend">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={rpmSeries}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 5" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#A79C89" }} axisLine={false} tickLine={false} />
              <YAxis domain={[280, 520]} tick={{ fontSize: 11, fill: "#A79C89" }} axisLine={false} tickLine={false} width={30} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #E7DEC8", fontSize: 12 }} />
              <Line type="monotone" dataKey="rpm" stroke="var(--leaf)" strokeWidth={2.4} dot={{ r: 3 }} connectNulls />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Weekly Productivity">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={prodSeries}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 5" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#A79C89" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#A79C89" }} axisLine={false} tickLine={false} width={28} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #E7DEC8", fontSize: 12 }} />
              <Line type="monotone" dataKey="score" stroke="var(--turmeric-deep)" strokeWidth={2.4} dot={{ r: 3 }} connectNulls />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Yarn Quality Trend">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={qualitySeries}>
              <defs><linearGradient id="qFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--indigo)" stopOpacity={0.35} /><stop offset="100%" stopColor="var(--indigo)" stopOpacity={0.02} /></linearGradient></defs>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 5" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#A79C89" }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#A79C89" }} axisLine={false} tickLine={false} width={28} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #E7DEC8", fontSize: 12 }} />
              <Area type="monotone" dataKey="score" stroke="var(--indigo)" strokeWidth={2.2} fill="url(#qFill)" connectNulls />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

/* ============================================================
   ARTISAN: SMART INSIGHTS PAGE
   ============================================================ */
function InsightsPage({ session, pastSessions }) {
  const insights = generatePersonalInsights(session, pastSessions);
  return (
    <div>
      <PageHeader title="SmartKhadi Intelligence" subtitle="Personalized recommendations based on your own session history." />
      <div className="sk-card" style={{ padding: 22, display: "flex", flexDirection: "column", gap: 12 }}>
        {insights.map((ins, i) => {
          const s = INSIGHT_STYLE[ins.type];
          return <div key={i} className="sk-insight" style={{ background: s.bg }}><span style={{ color: s.color }}>{s.icon}</span><span style={{ fontSize: 14, lineHeight: 1.5 }}>{ins.text}</span></div>;
        })}
      </div>
    </div>
  );
}

/* ============================================================
   ARTISAN: PROFILE
   ============================================================ */
function ProfilePage({ user, pastSessions, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user.name, location: user.location, district: user.district, state: user.state, experience: user.experience });
  const totalSessions = pastSessions.length;
  const totalProduction = +pastSessions.reduce((a, s) => a + s.output, 0).toFixed(1);
  const avgProd = totalSessions ? Math.round(pastSessions.reduce((a, s) => a + s.productivityScore, 0) / totalSessions) : 0;

  const save = async () => {
    const updated = { ...user, ...form, experience: Number(form.experience) || 0 };
    await db.saveUser(updated);
    onUpdate(updated);
    setEditing(false);
  };

  return (
    <div>
      <PageHeader title="My Profile" subtitle="Your craft record and performance summary." />
      <div className="sk-card" style={{ padding: 26, marginBottom: 18 }}>
        <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
          <div className="sk-avatar" style={{ width: 84, height: 84, background: "var(--leaf-soft)", color: "var(--leaf-deep)", fontSize: 28 }}>{initials(user.name)}</div>
          <div style={{ flex: 1, minWidth: 240 }}>
            {!editing ? (
              <>
                <div className="sk-serif" style={{ fontSize: 22, fontWeight: 600 }}>{user.name}</div>
                <div style={{ display: "flex", gap: 18, flexWrap: "wrap", marginTop: 8, color: "var(--ink-soft)", fontSize: 13.5 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 6 }}><MapPin size={14} /> {user.location}, {user.district}, {user.state}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 6 }}><CalendarDays size={14} /> {user.experience} Years Experience</span>
                </div>
                <button className="sk-btn sk-btn-outline" style={{ marginTop: 16 }} onClick={() => setEditing(true)}><Pencil size={14} /> Edit Profile</button>
              </>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 420 }}>
                <div><label className="sk-label">Name</label><input className="sk-input" style={{ paddingLeft: 14 }} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div><label className="sk-label">Location</label><input className="sk-input" style={{ paddingLeft: 14 }} value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></div>
                  <div><label className="sk-label">District</label><input className="sk-input" style={{ paddingLeft: 14 }} value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} /></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div><label className="sk-label">State</label><input className="sk-input" style={{ paddingLeft: 14 }} value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} /></div>
                  <div><label className="sk-label">Experience (years)</label><input className="sk-input" type="number" style={{ paddingLeft: 14 }} value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} /></div>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                  <button className="sk-btn sk-btn-primary" onClick={save}>Save Changes</button>
                  <button className="sk-btn sk-btn-outline" onClick={() => setEditing(false)}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
        <MetricCard icon={<Clock size={16} />} label="Total Sessions" value={totalSessions} accent="var(--indigo)" />
        <MetricCard icon={<Package size={16} />} label="Total Production" value={`${totalProduction} kg`} accent="var(--leaf)" />
        <MetricCard icon={<TrendingUp size={16} />} label="Average Productivity" value={totalSessions ? `${avgProd}%` : "—"} accent="var(--turmeric)" />
        <MetricCard icon={<Award size={16} />} label="Status" value={user.experience >= 5 ? "Skilled Artisan" : "Growing Artisan"} accent="var(--terracotta)" />
      </div>
    </div>
  );
}

/* ============================================================
   IOT / SETTINGS + ARCHITECTURE
   ============================================================ */
function ToggleRow({ label, sub, checked, onChange }) {
  return (
    <div style={{ display: "flex", justifyBetween: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid var(--border)" }}>
      <div><div style={{ fontSize: 14, fontWeight: 600 }}>{label}</div>{sub && <div style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 2 }}>{sub}</div>}</div>
      <div onClick={() => onChange(!checked)} style={{ width: 42, height: 24, borderRadius: 999, background: checked ? "var(--leaf)" : "var(--border)", position: "relative", cursor: "pointer" }}>
        <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: checked ? 21 : 3, transition: "left .2s ease" }} />
      </div>
    </div>
  );
}

function ArchitectureSection() {
  return (
    <div className="sk-card" style={{ padding: 24, marginTop: 18 }}>
      <div className="sk-serif" style={{ fontSize: 17, fontWeight: 600, marginBottom: 4 }}>Live Data Architecture</div>
      <div style={{ fontSize: 13, color: "var(--ink-soft)", marginBottom: 18 }}>SIMULATION mode runs today; IOT mode is the drop-in replacement once the ESP32 prototype is wired up.</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, maxWidth: 320 }}>
        {[
          { icon: <Gauge size={15} />, text: "RPM Sensor" },
          { icon: <Cpu size={15} />, text: "ESP32" },
          { icon: <Cloud size={15} />, text: "Cloud API / Firebase" },
          { icon: <Radio size={15} />, text: "SmartKhadi Database" },
          { icon: <Home size={15} />, text: "Artisan Dashboard" },
        ].map((s, i, arr) => (
          <React.Fragment key={i}>
            <div className="sk-flow-box"><span style={{ color: "var(--leaf)" }}>{s.icon}</span>{s.text}</div>
            {i < arr.length - 1 && <div style={{ display: "flex", justifyCenter: "center", color: "var(--ink-faint)" }}><ChevronRight size={14} style={{ transform: "rotate(90deg)" }} /></div>}
          </React.Fragment>
        ))}
      </div>
      <div style={{ marginTop: 18, padding: 16, background: "var(--cream)", border: "1px solid var(--border)", borderRadius: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-soft)", marginBottom: 8 }}>PREPARED ENDPOINT — FOR FUTURE HARDWARE INTEGRATION</div>
        <div style={{ fontFamily: "monospace", fontSize: 12.5, background: "var(--panel)", border: "1px solid var(--border)", borderRadius: 8, padding: 12, whiteSpace: "pre-wrap" }}>
{`POST /api/sensor-data
{
  "userId": "artisan@email.com",
  "machineId": "ERGO-001",
  "rpm": 415,
  "tension": "OPTIMAL",
  "timestamp": 1730000000000
}`}
        </div>
        <div style={{ fontSize: 12, color: "var(--ink-faint)", marginTop: 8 }}>Incoming payloads are validated (userId + machineId must match a registered artisan and device) before being written to SENSOR_DATA and reflected on the dashboard.</div>
      </div>
    </div>
  );
}

function SettingsPage({ user, onLogout, dataMode, setDataMode }) {
  const [notify, setNotify] = useState(true);
  const [autoInsights, setAutoInsights] = useState(true);
  return (
    <div>
      <PageHeader title="Settings" subtitle="Configure your dashboard and data source." />
      <div className="sk-card" style={{ padding: 22, marginBottom: 18 }}>
        <div className="sk-serif" style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Data Mode</div>
        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          {["SIMULATION", "IOT"].map((m) => (
            <button key={m} className="sk-btn" style={{ background: dataMode === m ? "var(--leaf)" : "var(--cream-deep)", color: dataMode === m ? "#fff" : "var(--ink)" }} onClick={() => setDataMode(m)}>
              {m === "SIMULATION" ? "Software Test Mode" : "Real IoT Mode"}
            </button>
          ))}
        </div>
        <div style={{ fontSize: 12.5, color: "var(--ink-faint)", marginTop: 12, lineHeight: 1.5 }}>
          {dataMode === "SIMULATION"
            ? "Running on generated sensor data — safe to demo without any hardware connected."
            : "Waiting for an ESP32 device to POST live readings to /api/sensor-data. Falling back to simulation until a device connects."}
        </div>
      </div>
      <div className="sk-card" style={{ padding: 22, marginBottom: 18 }}>
        <div className="sk-serif" style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Preferences</div>
        <ToggleRow label="Live push notifications" sub="Alert when thread break risk is high" checked={notify} onChange={setNotify} />
        <ToggleRow label="Auto-generate Smart Insights" sub="Refresh recommendations as sensor values change" checked={autoInsights} onChange={setAutoInsights} />
      </div>
      <div className="sk-card" style={{ padding: 22 }}>
        <div className="sk-serif" style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>Account</div>
        <div style={{ fontSize: 13.5, color: "var(--ink-soft)", marginBottom: 14 }}>Signed in as {user.email} · {user.role === "ADMIN" ? "Administrator" : "Artisan"}</div>
        <button className="sk-btn sk-btn-outline" onClick={onLogout}><LogOut size={15} /> Log Out</button>
      </div>
      <ArchitectureSection />
    </div>
  );
}

/* ============================================================
   ADMIN PAGES
   ============================================================ */
function AdminDashboardPage({ allUsers, allSessions }) {
  const artisans = allUsers.filter((u) => u.role === "ARTISAN");
  const activeToday = new Set(allSessions.filter((s) => s.dateStr === todayStr()).map((s) => s.userId));
  const totalProduction = +allSessions.reduce((a, s) => a + s.output, 0).toFixed(1);

  const days = useMemo(() => {
    const arr = [];
    for (let i = 13; i >= 0; i--) arr.push(dateStrOf(Date.now() - i * 86400000));
    return arr;
  }, []);
  const dailyOutput = groupSum(allSessions, (s) => s.dateStr, (s) => s.output);
  const dailyProd = groupAvg(allSessions, (s) => s.dateStr, (s) => s.productivityScore);
  const productionSeries = days.map((d) => ({ day: d.slice(5), kg: +(dailyOutput[d] || 0).toFixed(1) }));
  const prodSeries = days.map((d) => ({ day: d.slice(5), score: dailyProd[d] || null }));

  const leaderboard = artisans.map((a) => {
    const sessions = allSessions.filter((s) => s.userId === a.email);
    return { name: a.name.split(" ")[0], kg: +sessions.reduce((sum, s) => sum + s.output, 0).toFixed(1) };
  }).sort((a, b) => b.kg - a.kg).slice(0, 8);

  return (
    <div>
      <PageHeader title="Admin Dashboard" subtitle="System-wide view across all registered artisans." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 22 }}>
        <MetricCard icon={<Users size={16} />} label="Total Artisans" value={artisans.length} accent="var(--indigo)" />
        <MetricCard icon={<Activity size={16} />} label="Active Today" value={activeToday.size} accent="var(--leaf)" />
        <MetricCard icon={<Package size={16} />} label="Total Yarn Production" value={`${totalProduction} kg`} accent="var(--turmeric)" />
        <MetricCard icon={<BarChart3 size={16} />} label="Total Sessions" value={allSessions.length} accent="var(--terracotta)" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="sk-grid-responsive">
        <ChartCard title="Production Trend (all artisans)">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={productionSeries}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 5" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#A79C89" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#A79C89" }} axisLine={false} tickLine={false} width={28} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #E7DEC8", fontSize: 12 }} />
              <Bar dataKey="kg" fill="var(--turmeric)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Overall Productivity Trend">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={prodSeries}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 5" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#A79C89" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#A79C89" }} axisLine={false} tickLine={false} width={28} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #E7DEC8", fontSize: 12 }} />
              <Line type="monotone" dataKey="score" stroke="var(--leaf)" strokeWidth={2.4} dot={{ r: 3 }} connectNulls />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
      <ChartCard title="Artisan Performance Leaderboard (kg produced)">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={leaderboard} layout="vertical" margin={{ left: 10 }}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 5" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11, fill: "#A79C89" }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: "#2A2420" }} axisLine={false} tickLine={false} width={80} />
            <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #E7DEC8", fontSize: 12 }} />
            <Bar dataKey="kg" fill="var(--leaf)" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}

function ArtisansPage({ allUsers, allSessions }) {
  const artisans = allUsers.filter((u) => u.role === "ARTISAN");
  return (
    <div>
      <PageHeader title="Artisans" subtitle="Every registered artisan on the platform." />
      <div className="sk-card" style={{ overflow: "auto" }}>
        <table className="sk-table">
          <thead><tr><th>Name</th><th>Location</th><th>Experience</th><th>Sessions</th><th>Total Output</th></tr></thead>
          <tbody>
            {artisans.map((a) => {
              const sessions = allSessions.filter((s) => s.userId === a.email);
              const out = +sessions.reduce((sum, s) => sum + s.output, 0).toFixed(1);
              return (
                <tr key={a.email}>
                  <td style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div className="sk-avatar" style={{ width: 28, height: 28, background: "var(--leaf-soft)", color: "var(--leaf-deep)", fontSize: 11 }}>{initials(a.name)}</div>
                    {a.name}
                  </td>
                  <td>{a.location}, {a.state}</td>
                  <td>{a.experience} yrs</td>
                  <td>{sessions.length}</td>
                  <td>{out} kg</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ============================================================
   APP ROOT
   ============================================================ */
export default function App() {
  const [authView, setAuthView] = useState("welcome");
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [pastSessions, setPastSessions] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allSessions, setAllSessions] = useState([]);
  const [dataMode, setDataMode] = useState("SIMULATION");

  const session = useSpinningSession(user || { email: "" });

  useEffect(() => {
    (async () => {
      await seedDemoData();
      const email = await db.getCurrentEmail();
      if (email) {
        const u = await db.getUser(email);
        if (u) setUser(u);
      }
      setAuthLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!user) return;
    (async () => {
      if (user.role === "ARTISAN") {
        setPastSessions(await db.getSessions(user.email));
      } else {
        const [users, sessions] = await Promise.all([db.listUsers(), db.listAllSessions()]);
        setAllUsers(users);
        setAllSessions(sessions);
      }
    })();
  }, [user, session.lastSummary]);

  const handleLogin = async (u) => {
    setUser(u);
    await db.setCurrentEmail(u.email);
    setPage(u.role === "ADMIN" ? "admin" : "dashboard");
  };
  const handleLogout = async () => {
    await db.clearCurrentEmail();
    setUser(null);
    setAuthView("welcome");
  };

  if (authLoading) {
    return (
      <div className="sk-root sk-auth-shell"><style>{TOKENS}</style>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <CharkhaLogo spinning size={40} />
          <div style={{ color: "var(--ink-soft)", fontSize: 13 }}>Loading SmartKhadi…</div>
        </div>
      </div>
    );
  }

  if (!user) {
    if (authView === "login") return <LoginPage goto={setAuthView} onLogin={handleLogin} />;
    if (authView === "register") return <RegisterPage goto={setAuthView} onLogin={handleLogin} />;
    if (authView === "forgot") return <ForgotPasswordPage goto={setAuthView} />;
    return <WelcomePage goto={setAuthView} />;
  }

  const pages = user.role === "ADMIN"
    ? {
        admin: <AdminDashboardPage allUsers={allUsers} allSessions={allSessions} />,
        artisans: <ArtisansPage allUsers={allUsers} allSessions={allSessions} />,
        settings: <SettingsPage user={user} onLogout={handleLogout} dataMode={dataMode} setDataMode={setDataMode} />,
      }
    : {
        dashboard: <DashboardPage user={user} session={session} pastSessions={pastSessions} setPage={setPage} />,
        live: <LiveSessionPage session={session} pastSessions={pastSessions} />,
        quality: <QualityPage session={session} pastSessions={pastSessions} />,
        history: <HistoryPage pastSessions={pastSessions} />,
        analytics: <AnalyticsPage pastSessions={pastSessions} />,
        insights: <InsightsPage session={session} pastSessions={pastSessions} />,
        profile: <ProfilePage user={user} pastSessions={pastSessions} onUpdate={setUser} />,
        settings: <SettingsPage user={user} onLogout={handleLogout} dataMode={dataMode} setDataMode={setDataMode} />,
      };

  const activePage = pages[page] ? page : (user.role === "ADMIN" ? "admin" : "dashboard");

  return (
    <div className="sk-root" style={{ display: "flex", minHeight: "100vh" }}>
      <style>{TOKENS}</style>
      <Sidebar page={activePage} setPage={setPage} user={user} onLogout={handleLogout} sessionActive={session.isActive} />
      <div className="sk-scrollbar" style={{ flex: 1, padding: "26px 30px 60px", maxWidth: 1200, margin: "0 auto", width: "100%" }} key={activePage}>
        {pages[activePage]}
      </div>
    </div>
  );
}
