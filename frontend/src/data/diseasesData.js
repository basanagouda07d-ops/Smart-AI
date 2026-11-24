export const diseasesData = [
  {
    id: 'early_blight',
    name: 'Early Blight',
    scientificName: 'Alternaria solani / porri complex',
    category: 'Fungal Infection',
    defaultConfidence: 97.3,
    severity: 'High',
    severityColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    accentColor: '#f59e0b',
    icon: 'AlertTriangle',
    summary: 'A pervasive fungal pathogen causing concentric necrotic rings, leaf tipping, and severe photosynthetic loss in onion crops.',
    symptoms: [
      'Small, water-soaked lesions that rapidly enlarge into dark brown-to-black spots with concentric rings ("bullseye" pattern).',
      'Chlorosis and yellowing beginning at leaf tips and extending downwards along the foliage.',
      'Premature defoliation, stunted bulb maturation, and reduced harvest weight by 35% - 50%.',
      'Velvety dark spore mass visibly flourishing along the center of mature lesions under high humidity.'
    ],
    spreadConditions: {
      temperature: '22°C - 30°C (72°F - 86°F)',
      humidity: '> 80% relative humidity, prolonged leaf wetness',
      vectors: 'Wind-blown spores, rain splashes, and infected crop residues from preceding solanaceous/allium seasons.'
    },
    organicTreatments: [
      {
        title: 'Neem Seed Kernel Extract (NSKE 5%)',
        dosage: '50 ml / liter of water',
        notes: 'Spray at 10-day intervals early in the morning to suppress spore germination and fungal mycelium proliferation.'
      },
      {
        title: 'Trichoderma viride / harzianum Bio-fungicide',
        dosage: '5 g / liter or 2.5 kg / acre soil application with FYM',
        notes: 'Antagonistic beneficial fungus that colonizes roots and foliage, actively parasitizing pathogenic fungi.'
      },
      {
        title: 'Copper Octanoate (Copper Soap)',
        dosage: '4 - 6 ml / liter of water',
        notes: 'OMRI-listed organic fungicide effective against early-stage leaf blights without excessive copper toxicity.'
      }
    ],
    chemicalTreatments: [
      {
        name: 'Mancozeb 75% WP',
        dosage: '2.5 g / liter of water (600 - 800 g / acre)',
        stage: 'Preventative & early infection stage',
        interval: 'Repeat every 7 - 10 days during humid overcast periods.'
      },
      {
        name: 'Azoxystrobin 18.2% + Difenoconazole 11.4% SC',
        dosage: '1 ml / liter of water (200 ml / acre)',
        stage: 'Curative systemic protection',
        interval: 'Maximum 2 sprays per growing cycle with alternating chemical modes of action.'
      },
      {
        name: 'Chlorothalonil 75% WP',
        dosage: '2 g / liter of water',
        stage: 'Foliar protective spray',
        interval: 'Apply immediately upon noticing first characteristic concentric leaf spots.'
      }
    ],
    prevention: [
      'Practice a minimum 3-year crop rotation with non-allium and non-solanaceous crops (e.g., maize, pulses).',
      'Switch strictly to drip or furrow irrigation to minimize canopy foliage wetting and leaf moisture dwell times.',
      'Ensure optimal plant spacing (15 cm x 10 cm) to maximize air circulation through the crop canopy.',
      'Deep plow and burn or compost crop debris immediately following harvest to break the fungal overwintering cycle.'
    ]
  },
  {
    id: 'purple_blotch',
    name: 'Purple Blotch',
    scientificName: 'Alternaria porri',
    category: 'Severe Fungal Disease',
    defaultConfidence: 96.8,
    severity: 'Severe',
    severityColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    accentColor: '#a855f7',
    icon: 'AlertOctagon',
    summary: 'The most devastating foliar fungal disease affecting onion worldwide, identifiable by deep purple sunken lesions with yellow halos.',
    symptoms: [
      'Water-soaked spots on leaves and seed stalks that rapidly turn brown to distinctive purplish-violet with sunken centers.',
      'Lesions frequently surrounded by a broad chlorotic yellow margin extending up and down the leaf blade.',
      'Girdling of older leaves causing them to buckle, collapse, and prematurely dry out.',
      'Dark brown to black velvety concentric rings consisting of masses of conidiophores under humid mornings.'
    ],
    spreadConditions: {
      temperature: '21°C - 30°C (optimum 25°C)',
      humidity: '90% or higher relative humidity for 12+ consecutive hours',
      vectors: 'Thrips feeding punctures provide initial entry sites; airborne fungal conidia transported on wind gusts.'
    },
    organicTreatments: [
      {
        title: 'Pseudomonas fluorescens 1% WP',
        dosage: '10 g / liter of water or 2.5 kg / hectare',
        notes: 'Produces siderophores and antibiotic compounds that protect leaf surface microflora from Alternaria invasion.'
      },
      {
        title: 'Panchagavya Foliar Spray',
        dosage: '3% solution (30 ml / liter of water)',
        notes: 'Traditional bio-enhancer boosting plant systemic acquired resistance (SAR) against foliar pathogens.'
      },
      {
        title: 'Potassium Bicarbonate + Horticultural Oil',
        dosage: '3 g potassium bicarbonate + 5 ml oil / liter',
        notes: 'Disrupts fungal cell wall osmotic balance upon direct contact.'
      }
    ],
    chemicalTreatments: [
      {
        name: 'Tebuconazole 25.9% EC (Folicur)',
        dosage: '1.5 ml / liter of water (300 ml / acre)',
        stage: 'High-efficacy systemic triazole',
        interval: 'Apply at first appearance; highly effective eradicant.'
      },
      {
        name: 'Propiconazole 25% EC (Tilt)',
        dosage: '1 ml / liter of water',
        stage: 'Curative foliar application',
        interval: 'Repeat after 12 - 14 days if wet weather persists.'
      },
      {
        name: 'Mancozeb 64% + Metalaxyl 8% WP',
        dosage: '2.5 g / liter of water',
        stage: 'Combination protective-systemic',
        interval: 'Provides broad-spectrum suppression against both Purple Blotch and Downy Mildew co-infections.'
      }
    ],
    prevention: [
      'Maintain aggressive control of Onion Thrips (Thrips tabaci) as their feeding wounds are primary fungal entry points.',
      'Treat seed sets with Thiram or Captan (2.5 g / kg seed) before planting.',
      'Adopt raised bed planting to prevent waterlogging and reduce soil-level relative humidity.',
      'Avoid high nitrogen fertilizer applications which stimulate lush, soft vegetative foliage prone to infection.'
    ]
  },
  {
    id: 'stemphylium_blight',
    name: 'Stemphylium Leaf Blight',
    scientificName: 'Stemphylium vesicarium',
    category: 'Fungal Foliar Disease',
    defaultConfidence: 98.1,
    severity: 'High',
    severityColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    accentColor: '#eab308',
    icon: 'AlertTriangle',
    summary: 'A fast-spreading fungal blight causing elongated tan to olive-brown lesions that coalesce and cause complete dieback of the onion foliage.',
    symptoms: [
      'Small, light yellow to brown water-soaked spots that elongate into spindle-shaped tan or olive-colored lesions.',
      'Lesions merge together along the leaf veins, leading to complete tip burn, blighting, and leaf collapse.',
      'Dark olive-black powdery fungal fruiting bodies covering the centers of infected leaves in warm, damp weather.',
      'Premature leaf death that prevents bulb filling, causing 40% - 70% bulb yield shrinkage.'
    ],
    spreadConditions: {
      temperature: '18°C - 26°C with intermittent warm spells',
      humidity: 'Prolonged dew or surface wetness exceeding 16 continuous hours',
      vectors: 'Overwintering pseudothecia in debris; airborne ascospores and conidia during windy dry intervals after rain.'
    },
    organicTreatments: [
      {
        title: 'Bacillus subtilis Bio-fungicide',
        dosage: '5 ml / liter of water',
        notes: 'Forms a protective bacterial biofilm preventing spore germination and germ tube penetration.'
      },
      {
        title: 'Equisetum (Horsetail) Decoction / Silica Spray',
        dosage: '10% aqueous extract or 2 ml liquid potassium silicate / liter',
        notes: 'Hardens plant cell epidermal walls, reducing fungal hyphae mechanical penetration.'
      }
    ],
    chemicalTreatments: [
      {
        name: 'Pyraclostrobin 20% WG',
        dosage: '1 g / liter of water (200 g / acre)',
        stage: 'QoI strobilurin fungicide',
        interval: 'Inhibits fungal mitochondrial respiration; apply as protective cover.'
      },
      {
        name: 'Difenoconazole 25% EC',
        dosage: '1 ml / liter of water',
        stage: 'Demethylation inhibitor (DMI)',
        interval: 'Strong curative action when sprayed within 48 hours of infection onset.'
      }
    ],
    prevention: [
      'Destroy all cull piles and volunteers around onion fields prior to planting.',
      'Apply silicon and balanced potassium (K) nutrition to strengthen leaf cuticles.',
      'Avoid overhead sprinkler watering, especially late in the afternoon.'
    ]
  },
  {
    id: 'downy_mildew',
    name: 'Downy Mildew',
    scientificName: 'Peronospora destructor',
    category: 'Oomycete Infection',
    defaultConfidence: 95.9,
    severity: 'Severe',
    severityColor: 'text-red-400 bg-red-500/10 border-red-500/30',
    accentColor: '#ef4444',
    icon: 'Flame',
    summary: 'A cool, humid weather pathogen causing pale-green oval lesions covered in violet-gray velvety mildew, leading to rapid field-wide destruction.',
    symptoms: [
      'Pale green, oval to cylindrical patches that appear on the oldest leaves first.',
      'Distinctive purplish-gray or violet felt-like downy growth flourishing on affected leaf surfaces in humid morning air.',
      'Infected leaves become soft, pale, curl downwards, and collapse.',
      'Secondary invasion by Alternaria and Botrytis on dying mildew-damaged tissues.'
    ],
    spreadConditions: {
      temperature: '10°C - 20°C (cool humid nights followed by warm overcast days)',
      humidity: 'Relative humidity > 95% for 4 - 6 hours overnight',
      vectors: 'Oospores in soil and systemic mycelium inside infected planting sets or bulbs.'
    },
    organicTreatments: [
      {
        title: 'Bordeaux Mixture (1%)',
        dosage: '1 kg Copper Sulfate + 1 kg Quicklime in 100 liters of water',
        notes: 'Classic protective mineral spray creating an inhospitable barrier against oomycete spore germination.'
      },
      {
        title: 'Potassium Phosphite Bio-stimulant',
        dosage: '2.5 ml / liter of water',
        notes: 'Triggers natural phytoalexin production inside onion cells to fight off oomycete invasion.'
      }
    ],
    chemicalTreatments: [
      {
        name: 'Metalaxyl 8% + Mancozeb 64% WP (Ridomil MZ)',
        dosage: '2.5 g / liter of water',
        stage: 'Systemic + contact combination',
        interval: 'Apply preventatively when cool damp weather is forecast.'
      },
      {
        name: 'Dimethomorph 50% WP',
        dosage: '1 g / liter of water',
        stage: 'Oomycete cell wall synthesis inhibitor',
        interval: 'Rotate with Mancozeb to prevent fungicide resistance buildup.'
      }
    ],
    prevention: [
      'Select well-drained, sunny fields with good air drainage away from water bodies.',
      'Plant certified disease-free onion sets; do not save bulbs from mildew-infected blocks.',
      'Ensure rows are oriented in the direction of prevailing winds to speed leaf drying.'
    ]
  },
  {
    id: 'healthy',
    name: 'Healthy Onion Crop',
    scientificName: 'Allium cepa',
    category: 'Optimal Plant Health',
    defaultConfidence: 99.4,
    severity: 'Healthy',
    severityColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    accentColor: '#10b981',
    icon: 'CheckCircle2',
    summary: 'The onion foliage exhibits robust vigor, deep blue-green coloration, turgid upright leaves, and complete absence of pathogenic lesions or blights.',
    symptoms: [
      'Uniform deep green/glaucous waxy leaf coating (bloom) without necrotic lesions.',
      'Strong upright erect stems and vigorous central fan formation.',
      'Well-formed, clean neck tissues without soft rot or sunken water spots.',
      'High photosynthetic efficiency and optimal bulb swelling metrics.'
    ],
    spreadConditions: {
      temperature: '15°C - 28°C ideal growing range',
      humidity: '40% - 65% balanced ambient humidity',
      vectors: 'Maintained with balanced N-P-K nutrition, IPM monitoring, and drip irrigation.'
    },
    organicTreatments: [
      {
        title: 'Routine Seaweed Extract & Humic Acid Foliar Feed',
        dosage: '2 ml / liter every 14 days',
        notes: 'Maintains osmotic cell turgor, root vigor, and micronutrient balance.'
      },
      {
        title: 'Preventative Bio-fungicide Inoculation',
        dosage: 'Trichoderma harzianum soil drench monthly',
        notes: 'Maintains healthy root rhizosphere and suppresses latent soil pathogens.'
      }
    ],
    chemicalTreatments: [
      {
        name: 'No Fungicide Required',
        dosage: 'N/A',
        stage: 'Monitoring phase',
        interval: 'Conduct weekly scout inspections for early thrips activity or humidity spikes.'
      }
    ],
    prevention: [
      'Continue regular soil moisture monitoring and avoid water stress during bulb enlargement.',
      'Keep field borders weed-free to eliminate alternative hosts for onion thrips and viruses.',
      'Apply balanced potassium and sulfur fertilizer to maximize skin firmness and storage shelf life.'
    ]
  },
  {
    id: 'iris_yellow_virus',
    name: 'Iris Yellow Spot Virus (IYSV)',
    scientificName: 'Tospovirus (IYSV)',
    category: 'Viral Pathogen',
    defaultConfidence: 97.8,
    severity: 'Severe',
    severityColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    accentColor: '#f59e0b',
    icon: 'AlertTriangle',
    summary: 'A high-impact viral disease transmitted by onion thrips, producing bleached straw-colored diamond lesions with green centers, causing lodging and yield collapse.',
    symptoms: [
      'Characteristic diamond-shaped or spindle chlorotic lesions that bleach into dry straw-white patches.',
      'Characteristic "green islands" of surviving tissue trapped inside bleached necrotic areas on leaves and seed scapes.',
      'Extensive lodging of seed stalks and premature foliage dieback during hot, dry growing conditions.',
      'Reduced bulb size, scale cracking, and severe storage rot vulnerability.'
    ],
    spreadConditions: {
      temperature: '25°C - 34°C (hot dry conditions favoring thrips)',
      humidity: 'Low to moderate humidity; proliferates during drought stress',
      vectors: 'Onion Thrips (Thrips tabaci) vector in larval stage; survives in infected volunteer onions and winter weeds.'
    },
    organicTreatments: [
      {
        title: 'Spinosad 0.5% SC Bio-Insecticide',
        dosage: '1.25 ml / liter of water',
        notes: 'OMRI-listed naturally derived soil actinomycete fermentation product to aggressively manage thrips vector.'
      },
      {
        title: 'Kaolin Clay Particle Film (Surround WP)',
        dosage: '30 - 50 g / liter of water',
        notes: 'Creates a white mineral barrier over foliage that deters thrips feeding and prevents virus transmission.'
      },
      {
        title: 'Beauveria bassiana Entomopathogenic Fungi',
        dosage: '5 g / liter of water',
        notes: 'Beneficial fungal biocontrol that infects and suppresses thrips nymphs and adults.'
      }
    ],
    chemicalTreatments: [
      {
        name: 'Spinetoram 11.7% SC (Delegate)',
        dosage: '0.8 ml / liter of water (160 ml / acre)',
        stage: 'Vector control - early nymph stage',
        interval: 'Spray at 10-day intervals targeting leaf axils where thrips shelter.'
      },
      {
        name: 'Cyantraniliprole 10.26% OD',
        dosage: '1.2 ml / liter of water',
        stage: 'Systemic anthranilic diamide',
        interval: 'Cross-spectrum vector suppression with high rainfastness.'
      }
    ],
    prevention: [
      'Deploy blue or yellow sticky traps (15 traps / acre) to monitor thrips population spikes.',
      'Eradicate all volunteer onions and brassica weeds within 100 meters of fields before planting.',
      'Maintain regular drip irrigation to eliminate drought stress which accelerates thrips feeding injury.'
    ]
  }
];

export const samplePresets = [
  {
    id: 'sample-early-blight',
    title: 'Early Blight Sample',
    diseaseId: 'early_blight',
    image: '/images/hero-onion.jpg',
    source: 'High-Res Field Diagnostic'
  },
  {
    id: 'sample-purple-blotch',
    title: 'Purple Blotch Sample',
    diseaseId: 'purple_blotch',
    image: '/images/samples/sample-purple-blotch.jpg',
    source: 'AgriAI Augmented Dataset'
  },
  {
    id: 'sample-stemphylium',
    title: 'Stemphylium Blight Sample',
    diseaseId: 'stemphylium_blight',
    image: '/images/samples/sample-stemphylium.jpg',
    source: 'AgriAI Augmented Dataset'
  },
  {
    id: 'sample-iris-yellow',
    title: 'Iris Yellow Virus Sample',
    diseaseId: 'iris_yellow_virus',
    image: '/images/samples/sample-iris-yellow.jpg',
    source: 'AgriAI Augmented Dataset'
  },
  {
    id: 'sample-healthy',
    title: 'Healthy Foliage Sample',
    diseaseId: 'healthy',
    image: '/images/samples/sample-healthy.jpg',
    source: 'AgriAI Control Benchmark'
  }
];
