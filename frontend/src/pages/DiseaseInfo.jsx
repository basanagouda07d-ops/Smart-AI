import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { diseasesData } from '../data/diseasesData';
import TreatmentCard from '../components/TreatmentCard';
import { 
  Search, 
  BookOpen, 
  AlertTriangle, 
  CheckCircle2, 
  Sprout, 
  ArrowRight,
  ShieldCheck,
  Bug,
  ThermometerSnowflake,
  Wind
} from 'lucide-react';

export default function DiseaseInfo() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDiseaseId, setSelectedDiseaseId] = useState(diseasesData[0].id);

  const filteredDiseases = diseasesData.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeDisease = diseasesData.find(d => d.id === selectedDiseaseId) || diseasesData[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
          <span className="hover:underline cursor-pointer" onClick={() => navigate('/')}>Home</span>
          <span>/</span>
          <span className="text-gray-300">Disease Encyclopedia</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Onion Foliar Disease Encyclopedia & Agronomy Guide
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl">
          Comprehensive field identification keys, pathogenic lifecycle profiles, environmental trigger matrices, and organic & chemical treatment protocols.
        </p>
      </div>

      {/* Main Encyclopedia Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Disease Selector & Search (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          <div className="glass-panel rounded-3xl p-5 border border-emerald-500/25 space-y-4">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search disease or pathogen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#04120a] border border-emerald-500/30 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400"
              />
            </div>

            {/* Disease List */}
            <div className="space-y-2">
              {filteredDiseases.map((d) => {
                const isSelected = d.id === selectedDiseaseId;
                return (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDiseaseId(d.id)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-emerald-600/20 border-emerald-400/50 shadow-[0_0_15px_rgba(34,197,94,0.2)]'
                        : 'bg-[#04120a]/60 border-emerald-500/15 hover:border-emerald-500/35'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${d.severityColor}`}>
                        {d.severity}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400">
                        {d.defaultConfidence}% Bench
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white mt-1.5">{d.name}</h4>
                    <p className="text-[11px] italic text-gray-400 font-mono truncate">{d.scientificName}</p>
                  </button>
                );
              })}
            </div>

          </div>

        </div>

        {/* Right Column: Disease Detail Dossier & Treatments (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/25 space-y-6">
            
            {/* Header Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-500/15 pb-5">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                  Pathology Dossier
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  {activeDisease.name}
                </h2>
                <p className="text-xs italic text-emerald-300/80 font-mono mt-0.5">
                  Causal Agent: {activeDisease.scientificName} &bull; {activeDisease.category}
                </p>
              </div>

              <button
                onClick={() => navigate('/detect', { state: { preset: activeDisease.id } })}
                className="glow-btn flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-black self-start"
              >
                <span>Test in Diagnostic Lab</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>

            {/* Disease Summary */}
            <div className="text-sm text-gray-300 leading-relaxed">
              {activeDisease.summary}
            </div>

            {/* Symptoms Detailed Bullet List */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                Key Identification Markers & Visual Symptoms
              </h4>
              <div className="grid grid-cols-1 gap-2.5">
                {activeDisease.symptoms.map((symptom, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#06180e] border border-emerald-500/20 flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-bold flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">{symptom}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Spread Vectors & Weather Conditions */}
            <div className="p-5 rounded-2xl bg-[#071f12] border border-emerald-500/25 space-y-3">
              <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
                <ThermometerSnowflake className="w-4 h-4" />
                Environmental Infection Conditions
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-gray-400 block font-medium">Optimal Temperature:</span>
                  <span className="text-white font-bold">{activeDisease.spreadConditions.temperature}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-medium">Humidity & Leaf Wetness:</span>
                  <span className="text-white font-bold">{activeDisease.spreadConditions.humidity}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-gray-400 block font-medium">Transmission Vectors:</span>
                  <span className="text-gray-300">{activeDisease.spreadConditions.vectors}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Treatment Component for the active disease */}
          <TreatmentCard disease={activeDisease} />

        </div>

      </div>

    </div>
  );
}
