/**
 * FarmPal — Crop Profiles Database
 */
const CROP_PROFILES = {
  maize: {
    name: 'Maize (Corn)', icon: '🌽', color: '#facc15',
    varieties: ['Early Maturing (90d)', 'Medium (120d)', 'Late (150d)'],
    growthStages: [
      { id: 'germination', label: 'Germination', icon: '🌱', gddRange: [0, 120], days: '5–10' },
      { id: 'vegetative', label: 'Vegetative', icon: '🌿', gddRange: [120, 700], days: '25–35' },
      { id: 'tasseling', label: 'Tasseling', icon: '🌾', gddRange: [700, 1100], days: '10–15' },
      { id: 'silking', label: 'Silking', icon: '💐', gddRange: [1100, 1500], days: '10–14' },
      { id: 'grain_fill', label: 'Grain Fill', icon: '🌟', gddRange: [1500, 2200], days: '30–40' },
      { id: 'maturity', label: 'Maturity', icon: '🌽', gddRange: [2200, 2700], days: '15–20' }
    ],
    totalGDD: 2700, baseTempC: 10, optimalTemp: [20, 30],
    optimalRainfall: [500, 800], optimalSoilPH: [5.8, 7.0], optimalSoilMoisture: [50, 70],
    waterNeedsMmPerStage: [3, 5, 7, 6, 4, 2],
    fertilizerSchedule: [
      { event: 'Basal Application', gdd: 0, product: 'NPK 10:26:26', rate: '200 kg/ha', note: 'Apply at planting' },
      { event: 'First Top-Dress', gdd: 300, product: 'Urea', rate: '65 kg/ha', note: 'At V6 stage' },
      { event: 'Second Top-Dress', gdd: 700, product: 'Urea', rate: '65 kg/ha', note: 'Before tasseling' }
    ],
    diseases: [
      { name: 'Fall Armyworm', type: 'pest', conditions: { tempRange: [25, 33], humidityMin: 60 }, guidance: 'Scout for egg masses on leaf undersides. Apply neem-based bio-pesticide.' },
      { name: 'Gray Leaf Spot', type: 'disease', conditions: { humidityMin: 80, tempMin: 22 }, guidance: 'Apply fungicide when lesions first appear.' },
      { name: 'Stem Borer', type: 'pest', conditions: { tempRange: [20, 30] }, guidance: 'Apply granular insecticide into leaf whorl at V6–V8.' }
    ]
  },
  cassava: {
    name: 'Cassava', icon: '🫚', color: '#f97316',
    varieties: ['Bitter (12mo)', 'Sweet (9mo)', 'Improved (8–10mo)'],
    growthStages: [
      { id: 'establishment', label: 'Establishment', icon: '🌱', gddRange: [0, 500], days: '30–60' },
      { id: 'canopy', label: 'Canopy Dev.', icon: '🌿', gddRange: [500, 1500], days: '60–90' },
      { id: 'root_bulking', label: 'Root Bulking', icon: '🫚', gddRange: [1500, 3000], days: '90–150' },
      { id: 'maturity', label: 'Maturity', icon: '✅', gddRange: [3000, 3500], days: '60–90' }
    ],
    totalGDD: 3500, baseTempC: 15, optimalTemp: [25, 35],
    optimalRainfall: [1000, 1500], optimalSoilPH: [5.5, 6.5], optimalSoilMoisture: [40, 65],
    waterNeedsMmPerStage: [4, 6, 5, 3],
    fertilizerSchedule: [
      { event: 'Basal', gdd: 0, product: 'NPK 15:15:15', rate: '200 kg/ha', note: 'At planting' },
      { event: 'Potassium Boost', gdd: 800, product: 'MOP (0-0-60)', rate: '100 kg/ha', note: 'Root bulking start' }
    ],
    diseases: [
      { name: 'Cassava Mosaic', type: 'disease', conditions: { vector: 'whitefly' }, guidance: 'Use CMD-resistant varieties. Remove infected plants.' },
      { name: 'Mealybug', type: 'pest', conditions: { tempMin: 28, seasonRisk: 'dry' }, guidance: 'Release parasitic wasps. Avoid drought stress.' }
    ]
  },
  rice: {
    name: 'Rice (Paddy)', icon: '🍚', color: '#22d3ee',
    varieties: ['Lowland Irrigated (120d)', 'Upland Rain-fed (100d)', 'NERICA (90d)'],
    growthStages: [
      { id: 'seedling', label: 'Seedling', icon: '🌱', gddRange: [0, 300], days: '15–25' },
      { id: 'tillering', label: 'Tillering', icon: '🌿', gddRange: [300, 800], days: '25–35' },
      { id: 'booting', label: 'Booting', icon: '🌾', gddRange: [800, 1200], days: '15–20' },
      { id: 'heading', label: 'Heading', icon: '🌸', gddRange: [1200, 1500], days: '10–15' },
      { id: 'grain_fill', label: 'Grain Fill', icon: '🌟', gddRange: [1500, 2000], days: '20–30' },
      { id: 'maturity', label: 'Maturity', icon: '🍚', gddRange: [2000, 2400], days: '15–20' }
    ],
    totalGDD: 2400, baseTempC: 10, optimalTemp: [22, 32],
    optimalRainfall: [1200, 2000], optimalSoilPH: [5.5, 7.0], optimalSoilMoisture: [70, 90],
    waterNeedsMmPerStage: [5, 7, 8, 8, 7, 3],
    fertilizerSchedule: [
      { event: 'Basal', gdd: 0, product: 'NPK 15:15:15', rate: '150 kg/ha', note: 'At transplanting' },
      { event: 'First Top-Dress', gdd: 350, product: 'Urea', rate: '50 kg/ha', note: 'Active tillering' }
    ],
    diseases: [
      { name: 'Rice Blast', type: 'disease', conditions: { humidityMin: 85, tempRange: [20, 28] }, guidance: 'Apply fungicide at first sign. Use resistant varieties.' },
      { name: 'Stem Borer', type: 'pest', conditions: { tempRange: [22, 30] }, guidance: 'Remove stubble after harvest.' }
    ]
  },
  sorghum: {
    name: 'Sorghum', icon: '🌾', color: '#c084fc',
    varieties: ['Grain (100d)', 'Sweet (120d)', 'Forage (90d)'],
    growthStages: [
      { id: 'emergence', label: 'Emergence', icon: '🌱', gddRange: [0, 180], days: '5–10' },
      { id: 'vegetative', label: 'Vegetative', icon: '🌿', gddRange: [180, 800], days: '30–40' },
      { id: 'boot', label: 'Booting', icon: '🌾', gddRange: [800, 1200], days: '10–15' },
      { id: 'heading', label: 'Heading', icon: '🌸', gddRange: [1200, 1500], days: '10–15' },
      { id: 'grain_fill', label: 'Grain Fill', icon: '🌟', gddRange: [1500, 2000], days: '25–35' },
      { id: 'maturity', label: 'Maturity', icon: '✅', gddRange: [2000, 2400], days: '15–20' }
    ],
    totalGDD: 2400, baseTempC: 10, optimalTemp: [25, 35],
    optimalRainfall: [400, 700], optimalSoilPH: [5.5, 7.5], optimalSoilMoisture: [40, 60],
    waterNeedsMmPerStage: [2, 4, 6, 6, 5, 2],
    fertilizerSchedule: [
      { event: 'Basal', gdd: 0, product: 'NPK 10:20:10', rate: '150 kg/ha', note: 'At planting' },
      { event: 'Top-Dress', gdd: 400, product: 'Urea', rate: '50 kg/ha', note: 'Knee-high stage' }
    ],
    diseases: [
      { name: 'Anthracnose', type: 'disease', conditions: { humidityMin: 80, tempRange: [25, 30] }, guidance: 'Use clean seed. Apply fungicide at heading.' },
      { name: 'Grain Mold', type: 'disease', conditions: { humidityMin: 85 }, guidance: 'Harvest early. Use open-head varieties.' }
    ]
  },
  beans: {
    name: 'Common Beans', icon: '🫘', color: '#f87171',
    varieties: ['Bush (60d)', 'Climbing (90d)', 'Dry Beans (80d)'],
    growthStages: [
      { id: 'germination', label: 'Germination', icon: '🌱', gddRange: [0, 100], days: '5–8' },
      { id: 'vegetative', label: 'Vegetative', icon: '🌿', gddRange: [100, 400], days: '15–25' },
      { id: 'flowering', label: 'Flowering', icon: '🌸', gddRange: [400, 650], days: '10–15' },
      { id: 'pod_fill', label: 'Pod Fill', icon: '🫛', gddRange: [650, 900], days: '15–20' },
      { id: 'maturity', label: 'Maturity', icon: '🫘', gddRange: [900, 1100], days: '10–15' }
    ],
    totalGDD: 1100, baseTempC: 10, optimalTemp: [18, 28],
    optimalRainfall: [300, 500], optimalSoilPH: [6.0, 7.0], optimalSoilMoisture: [50, 70],
    waterNeedsMmPerStage: [3, 4, 6, 5, 2],
    fertilizerSchedule: [
      { event: 'Basal', gdd: 0, product: 'DAP (18-46-0)', rate: '100 kg/ha', note: 'No urea needed — beans fix nitrogen' }
    ],
    diseases: [
      { name: 'Bean Rust', type: 'disease', conditions: { humidityMin: 75, tempRange: [17, 27] }, guidance: 'Apply fungicide early. Use resistant varieties.' },
      { name: 'Bean Fly', type: 'pest', conditions: { seasonRisk: 'early' }, guidance: 'Treat seed with imidacloprid.' }
    ]
  }
};

function calculateGDD(plantingDate, dailyTemps, baseTempC) {
  if (!plantingDate || !dailyTemps || !dailyTemps.length) return 0;
  let gdd = 0;
  for (const day of dailyTemps) {
    gdd += Math.max(0, (day.maxTemp + day.minTemp) / 2 - baseTempC);
  }
  return Math.round(gdd);
}

function getCurrentStage(cropType, accumulatedGDD) {
  const profile = CROP_PROFILES[cropType];
  if (!profile) return null;
  for (let i = profile.growthStages.length - 1; i >= 0; i--) {
    if (accumulatedGDD >= profile.growthStages[i].gddRange[0]) {
      const s = profile.growthStages[i];
      return { ...s, index: i, progress: Math.min(100, ((accumulatedGDD - s.gddRange[0]) / (s.gddRange[1] - s.gddRange[0])) * 100) };
    }
  }
  return { ...profile.growthStages[0], index: 0, progress: 0 };
}

function getCropProgress(cropType, accumulatedGDD) {
  const profile = CROP_PROFILES[cropType];
  if (!profile) return 0;
  return Math.min(100, Math.round((accumulatedGDD / profile.totalGDD) * 100));
}
