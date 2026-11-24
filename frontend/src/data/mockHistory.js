export const initialScanHistory = [
  {
    id: 'SCN-8921',
    date: '2026-11-17 14:32',
    diseaseName: 'Early Blight',
    diseaseId: 'early_blight',
    confidence: 97.3,
    severity: 'High',
    location: 'North Field - Plot B4',
    treatmentStatus: 'Action Required',
    statusColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    image: '/images/hero-onion.jpg'
  },
  {
    id: 'SCN-8920',
    date: '2026-11-16 11:15',
    diseaseName: 'Purple Blotch',
    diseaseId: 'purple_blotch',
    confidence: 96.8,
    severity: 'Severe',
    location: 'East Terrace - Acre 2',
    treatmentStatus: 'Treated (Mancozeb)',
    statusColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    image: '/images/samples/sample-purple-blotch.jpg'
  },
  {
    id: 'SCN-8919',
    date: '2026-11-15 09:40',
    diseaseName: 'Stemphylium Leaf Blight',
    diseaseId: 'stemphylium_blight',
    confidence: 98.1,
    severity: 'High',
    location: 'South Ridge - Plot C1',
    treatmentStatus: 'Under Observation',
    statusColor: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
    image: '/images/samples/sample-stemphylium.jpg'
  },
  {
    id: 'SCN-8918',
    date: '2026-11-14 16:05',
    diseaseName: 'Healthy Onion Crop',
    diseaseId: 'healthy',
    confidence: 99.4,
    severity: 'Healthy',
    location: 'Greenhouse Sector 1',
    treatmentStatus: 'Optimal Vigor',
    statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    image: '/images/samples/sample-healthy.jpg'
  },
  {
    id: 'SCN-8917',
    date: '2026-11-12 10:22',
    diseaseName: 'Downy Mildew',
    diseaseId: 'downy_mildew',
    confidence: 95.9,
    severity: 'Severe',
    location: 'West Furrow - Plot A8',
    treatmentStatus: 'Quarantined & Sprayed',
    statusColor: 'text-red-400 bg-red-500/10 border-red-500/30',
    image: '/images/hero-onion.jpg'
  },
  {
    id: 'SCN-8916',
    date: '2026-11-10 13:50',
    diseaseName: 'Healthy Onion Crop',
    diseaseId: 'healthy',
    confidence: 98.7,
    severity: 'Healthy',
    location: 'North Field - Plot B2',
    treatmentStatus: 'Optimal Vigor',
    statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    image: '/images/samples/sample-healthy.jpg'
  }
];

export const monthlyTrendsData = [
  { month: 'Jun', totalScans: 45, healthyCount: 38, infectedCount: 7 },
  { month: 'Jul', totalScans: 72, healthyCount: 56, infectedCount: 16 },
  { month: 'Aug', totalScans: 98, healthyCount: 68, infectedCount: 30 },
  { month: 'Sep', totalScans: 135, healthyCount: 102, infectedCount: 33 },
  { month: 'Oct', totalScans: 180, healthyCount: 145, infectedCount: 35 },
  { month: 'Nov', totalScans: 220, healthyCount: 188, infectedCount: 32 }
];

export const diseaseDistributionData = [
  { name: 'Early Blight', value: 34, fill: '#f59e0b' },
  { name: 'Purple Blotch', value: 28, fill: '#a855f7' },
  { name: 'Stemphylium Blight', value: 22, fill: '#eab308' },
  { name: 'Downy Mildew', value: 16, fill: '#ef4444' }
];

export const modelAccuracyData = [
  { disease: 'Early Blight', accuracy: 97.3, samples: 480 },
  { disease: 'Purple Blotch', accuracy: 96.8, samples: 520 },
  { disease: 'Stemphylium', accuracy: 98.1, samples: 440 },
  { disease: 'Downy Mildew', accuracy: 95.9, samples: 390 },
  { disease: 'Healthy Control', accuracy: 99.4, samples: 610 }
];
