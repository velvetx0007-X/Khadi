/**
 * Rule-based recommendation engine for SMARTKHADI Intelligence.
 * Generates dynamic ergonomic, performance, and yarn quality insights based on live sensor metrics.
 */

export function generateSmartInsights(sensorData) {
  const { rpm, tension, productivityScore, yarnQualityScore, breakRisk, isMachineActive } = sensorData;

  if (!isMachineActive) {
    return [
      {
        id: 'paused-status',
        category: 'Machine Status',
        type: 'info',
        title: 'Machine Paused',
        message: 'The spinning session is currently paused. Press Start to resume real-time sensor telemetry.',
        timestamp: 'Just now',
        actionLabel: 'Resume Session'
      },
      {
        id: 'rest-advice',
        category: 'Ergonomics',
        type: 'success',
        title: 'Ergonomic Pause',
        message: 'Taking short 2-minute posture stretches every hour reduces artisan shoulder fatigue by up to 35%.',
        timestamp: 'Just now'
      }
    ];
  }

  const insights = [];

  // RPM Speed Insights
  if (rpm < 380) {
    insights.push({
      id: 'rpm-low',
      category: 'Speed Optimization',
      type: 'warning',
      title: 'Low Spinning Speed',
      message: `Current speed is ${rpm} RPM (Optimal target: 380–450 RPM). Gently increase hand crank rhythm to reach maximum yarn production speed.`,
      timestamp: 'Live Update',
      metric: `${rpm} RPM`
    });
  } else if (rpm >= 380 && rpm <= 450) {
    insights.push({
      id: 'rpm-optimal',
      category: 'Cadence & Ergonomics',
      type: 'success',
      title: 'Optimal Spinning Cadence',
      message: `Your spinning speed of ${rpm} RPM is perfectly within the ergonomic sweet spot (380–450 RPM). Excellent rhythm!`,
      timestamp: 'Live Update',
      metric: `${rpm} RPM`
    });
  } else {
    insights.push({
      id: 'rpm-high',
      category: 'Quality Control',
      type: 'danger',
      title: 'High Speed Warning',
      message: `Current speed is ${rpm} RPM (above 450 RPM threshold). High speed increases thread tension spikes and break risk. Easing speed protects yarn uniformity.`,
      timestamp: 'Live Update',
      metric: `${rpm} RPM`
    });
  }

  // Tension Insights
  if (tension === 'HIGH') {
    insights.push({
      id: 'tension-high',
      category: 'Mechanical Alert',
      type: 'danger',
      title: 'High Yarn Tension Detected',
      message: 'Yarn tension is elevated. Adjust the spring tension control knob on the ErgoSpin spindle frame to prevent snap events.',
      timestamp: 'Live Update',
      metric: 'Tension: HIGH'
    });
  } else if (tension === 'LOW') {
    insights.push({
      id: 'tension-low',
      category: 'Yarn Consistency',
      type: 'warning',
      title: 'Low Yarn Tension Warning',
      message: 'Slack detected in sliver feed. Ensure smooth draft hand-feeding to maintain count uniformity (Ne count stability).',
      timestamp: 'Live Update',
      metric: 'Tension: LOW'
    });
  } else {
    insights.push({
      id: 'tension-optimal',
      category: 'Yarn Quality',
      type: 'success',
      title: 'Uniform Yarn Tension',
      message: 'Drafting tension is stable and balanced. Spinning produces high tensile strength yarn.',
      timestamp: 'Live Update',
      metric: 'Tension: OPTIMAL'
    });
  }

  // Quality & Productivity Insights
  if (yarnQualityScore >= 90) {
    insights.push({
      id: 'quality-high',
      category: 'Artisan Excellence',
      type: 'success',
      title: 'Premium Quality Grade',
      message: `Yarn Quality Score is ${yarnQualityScore}/100 (Grade A Khadi). Yarn is suitable for fine luxury weaving.`,
      timestamp: 'Live Update',
      metric: `${yarnQualityScore}/100`
    });
  } else if (yarnQualityScore < 75) {
    insights.push({
      id: 'quality-attention',
      category: 'Quality Alert',
      type: 'warning',
      title: 'Yarn Quality Needs Attention',
      message: 'Fluctuations in RPM and tension are reducing thread count accuracy. Align crank speed and sliver tension.',
      timestamp: 'Live Update',
      metric: `${yarnQualityScore}/100`
    });
  }

  // Productivity Score Insight
  if (productivityScore >= 85) {
    insights.push({
      id: 'prod-high',
      category: 'Productivity',
      type: 'info',
      title: 'High Productivity Yield',
      message: `Current efficiency is ${productivityScore}%. You are on track to exceed today's target by +0.5 kg.`,
      timestamp: 'Live Update',
      metric: `${productivityScore}%`
    });
  }

  // Thread Break Risk
  if (breakRisk === 'HIGH') {
    insights.push({
      id: 'break-high',
      category: 'Breakage Risk',
      type: 'danger',
      title: 'Thread Break Risk Detected',
      message: 'High tension combined with speed variance elevates thread snapping probability by 78%. Reduce crank force immediately.',
      timestamp: 'Live Update',
      metric: 'Risk: HIGH'
    });
  }

  return insights;
}

export const HISTORICAL_PRODUCTION = [
  { day: 'Mon', outputKg: 2.8, rpmAvg: 410, quality: 92, efficiency: 86 },
  { day: 'Tue', outputKg: 3.1, rpmAvg: 418, quality: 94, efficiency: 89 },
  { day: 'Wed', outputKg: 2.9, rpmAvg: 405, quality: 90, efficiency: 84 },
  { day: 'Thu', outputKg: 3.4, rpmAvg: 422, quality: 95, efficiency: 91 },
  { day: 'Fri', outputKg: 3.0, rpmAvg: 412, quality: 91, efficiency: 87 },
  { day: 'Sat', outputKg: 3.5, rpmAvg: 430, quality: 96, efficiency: 93 },
  { day: 'Sun (Today)', outputKg: 3.2, rpmAvg: 415, quality: 93, efficiency: 89 },
];
