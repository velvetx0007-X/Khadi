import { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import { generateSmartInsights } from '../utils/insightRules';

export function useSensorSimulation() {
  const [isMachineActive, setIsMachineActive] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [demoStep, setDemoStep] = useState(0);

  // Live Metrics State
  const [rpm, setRpm] = useState(420);
  const [tension, setTension] = useState('OPTIMAL'); // LOW | OPTIMAL | HIGH
  const [productivityScore, setProductivityScore] = useState(87);
  const [yarnQualityScore, setYarnQualityScore] = useState(92);
  const [breakRisk, setBreakRisk] = useState('LOW');
  const [sessionSeconds, setSessionSeconds] = useState(8075); // 02:14:35 initial
  const [estimatedOutput, setEstimatedOutput] = useState(1.85); // kg
  const [totalBreaksCount, setTotalBreaksCount] = useState(2);

  // Historical Telemetry for Real-time Charts
  const [rpmHistory, setRpmHistory] = useState(() => {
    const initial = [];
    const now = Date.now();
    for (let i = 20; i >= 0; i--) {
      const timeStr = new Date(now - i * 3000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const randomRpm = 400 + Math.floor(Math.random() * 40 - 20);
      initial.push({
        time: timeStr,
        rpm: randomRpm,
        minTarget: 380,
        maxTarget: 450,
        tension: 'OPTIMAL',
        quality: 90 + Math.floor(Math.random() * 8)
      });
    }
    return initial;
  });

  const demoIntervalRef = useRef(null);

  // Format session time string HH:MM:SS
  const formatTime = (totalSec) => {
    const hrs = Math.floor(totalSec / 3600).toString().padStart(2, '0');
    const mins = Math.floor((totalSec % 3600) / 60).toString().padStart(2, '0');
    const secs = (totalSec % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  // Helper to trigger confetti celebration
  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Update sensor simulation tick every 2.5s
  useEffect(() => {
    if (!isMachineActive) return;

    const interval = setInterval(() => {
      setRpm((prevRpm) => {
        let delta;
        if (isDemoMode) {
          // Controlled demo fluctuation
          const demoTargets = [420, 370, 440, 465, 415];
          const target = demoTargets[demoStep % demoTargets.length];
          delta = target - prevRpm > 0 ? 5 : -5;
        } else {
          // Natural random walk between 330 and 480
          delta = Math.floor(Math.random() * 25) - 12;
        }
        const newRpm = Math.min(490, Math.max(340, prevRpm + delta));

        // Derive Tension & Risk based on RPM
        let newTension = 'OPTIMAL';
        let newRisk = 'LOW';

        if (newRpm < 370) {
          newTension = Math.random() > 0.4 ? 'LOW' : 'OPTIMAL';
          newRisk = 'LOW';
        } else if (newRpm > 455) {
          newTension = Math.random() > 0.3 ? 'HIGH' : 'OPTIMAL';
          newRisk = Math.random() > 0.5 ? 'HIGH' : 'MEDIUM';
        } else {
          newTension = Math.random() > 0.85 ? 'HIGH' : 'OPTIMAL';
          newRisk = 'LOW';
        }

        setTension(newTension);
        setBreakRisk(newRisk);

        // Derive Productivity & Quality Scores
        const rpmDev = Math.abs(newRpm - 415);
        const qualityPenalty = newTension === 'HIGH' ? 8 : newTension === 'LOW' ? 4 : 0;
        const newQuality = Math.max(55, Math.min(99, 98 - Math.floor(rpmDev * 0.15) - qualityPenalty));
        setYarnQualityScore(newQuality);

        const newProd = Math.max(68, Math.min(96, 92 - Math.floor(rpmDev * 0.1)));
        setProductivityScore(newProd);

        // Append to history
        const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setRpmHistory((prevHistory) => [
          ...prevHistory.slice(1),
          {
            time: nowStr,
            rpm: newRpm,
            minTarget: 380,
            maxTarget: 450,
            tension: newTension,
            quality: newQuality
          }
        ]);

        return newRpm;
      });

      // Increment Session Output & Time
      setSessionSeconds((s) => s + 2);
      setEstimatedOutput((out) => parseFloat((out + 0.0004).toFixed(3)));

    }, 2500);

    return () => clearInterval(interval);
  }, [isMachineActive, isDemoMode, demoStep]);

  // Demo script runner
  const toggleDemoMode = useCallback(() => {
    if (isDemoMode) {
      setIsDemoMode(false);
      if (demoIntervalRef.current) clearInterval(demoIntervalRef.current);
    } else {
      setIsDemoMode(true);
      setIsMachineActive(true);
      triggerCelebration();
      let stepCounter = 0;
      demoIntervalRef.current = setInterval(() => {
        stepCounter++;
        setDemoStep(stepCounter);
        if (stepCounter === 3) {
          triggerCelebration();
        }
      }, 5000);
    }
  }, [isDemoMode]);

  const startMachine = () => setIsMachineActive(true);
  const pauseMachine = () => setIsMachineActive(false);

  const resetSession = () => {
    setRpm(415);
    setTension('OPTIMAL');
    setProductivityScore(88);
    setYarnQualityScore(94);
    setBreakRisk('LOW');
    setSessionSeconds(0);
    setEstimatedOutput(0.0);
    setTotalBreaksCount(0);
    setIsMachineActive(true);
  };

  // Derive status message for Live RPM
  let rpmStatusText = 'Optimal Speed – Excellent performance.';
  let rpmStatusColor = 'text-emerald-600 bg-emerald-50 border-emerald-200';
  if (rpm < 380) {
    rpmStatusText = 'Low Speed – Increase spinning speed slightly.';
    rpmStatusColor = 'text-amber-600 bg-amber-50 border-amber-200';
  } else if (rpm > 450) {
    rpmStatusText = 'High Speed – Reduce speed to maintain yarn quality.';
    rpmStatusColor = 'text-rose-600 bg-rose-50 border-rose-200';
  }

  // Derive dynamic insights from rules
  const currentInsights = generateSmartInsights({
    rpm,
    tension,
    productivityScore,
    yarnQualityScore,
    breakRisk,
    isMachineActive
  });

  return {
    isMachineActive,
    isDemoMode,
    toggleDemoMode,
    startMachine,
    pauseMachine,
    resetSession,
    metrics: {
      rpm,
      tension,
      productivityScore,
      yarnQualityScore,
      breakRisk,
      sessionSeconds,
      sessionTimeFormatted: formatTime(sessionSeconds),
      estimatedOutput,
      totalBreaksCount,
      rpmStatusText,
      rpmStatusColor
    },
    rpmHistory,
    insights: currentInsights
  };
}
