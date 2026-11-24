import React, { useState } from 'react';
import { 
  Sprout, 
  FlaskConical, 
  Tractor, 
  Check, 
  Copy, 
  Printer, 
  AlertTriangle,
  Info,
  Calendar,
  Layers
} from 'lucide-react';

export default function TreatmentCard({ disease }) {
  const [activeTab, setActiveTab] = useState('organic');
  const [copied, setCopied] = useState(false);

  if (!disease) return null;

  const handleCopy = () => {
    let text = `AgriAI Prescription: ${disease.name} (${disease.scientificName})\n`;
    text += `Severity: ${disease.severity} | AI Confidence: ${disease.confidence || disease.defaultConfidence}%\n\n`;
    
    text += `ORGANIC TREATMENTS:\n`;
    disease.organicTreatments.forEach((o, i) => {
      text += `${i + 1}. ${o.title}: ${o.dosage} - ${o.notes}\n`;
    });

    text += `\nCHEMICAL TREATMENTS:\n`;
    disease.chemicalTreatments.forEach((c, i) => {
      text += `${i + 1}. ${c.name} (${c.dosage}) - ${c.interval}\n`;
    });

    text += `\nPREVENTION:\n`;
    disease.prevention.forEach((p, i) => {
      text += `- ${p}\n`;
    });

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 border border-emerald-500/25">
      
      {/* Header with Title and Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-500/15 pb-5">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sprout className="w-4 h-4" /> Comprehensive Management Plan
          </span>
          <h3 className="text-2xl font-bold text-white tracking-tight mt-1">
            Treatment & Recovery Protocols
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold hover:bg-emerald-900/60 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Prescription!' : 'Copy Regimen'}</span>
          </button>
          
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold hover:bg-emerald-900/60 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#06180e] border border-emerald-500/20 max-w-md">
        <button
          onClick={() => setActiveTab('organic')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'organic'
              ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.4)]'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Sprout className="w-4 h-4" />
          <span>Organic & Bio-Control</span>
        </button>

        <button
          onClick={() => setActiveTab('chemical')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'chemical'
              ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.4)]'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <FlaskConical className="w-4 h-4" />
          <span>Chemical Solutions</span>
        </button>

        <button
          onClick={() => setActiveTab('cultural')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'cultural'
              ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.4)]'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Tractor className="w-4 h-4" />
          <span>Cultural & Agronomic</span>
        </button>
      </div>

      {/* Tab 1: Organic & Bio-Control */}
      {activeTab === 'organic' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 text-xs text-emerald-300">
            <Info className="w-4 h-4 flex-shrink-0 text-emerald-400" />
            <span>Bio-control agents preserve soil microbiome and leave zero synthetic residues in onion bulbs.</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {disease.organicTreatments.map((item, idx) => (
              <div 
                key={idx} 
                className="p-5 rounded-2xl bg-[#082012] border border-emerald-500/20 hover:border-emerald-400/40 transition-all space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
                    <Sprout className="w-4 h-4" />
                  </div>
                  <h4 className="text-base font-bold text-white">{item.title}</h4>
                  <p className="text-xs text-gray-300 mt-2 leading-relaxed">{item.notes}</p>
                </div>
                
                <div className="pt-3 border-t border-emerald-500/15">
                  <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wide">Recommended Dosage:</span>
                  <div className="text-sm font-mono font-bold text-white bg-black/40 px-3 py-1.5 rounded-lg mt-1 border border-emerald-500/20">
                    {item.dosage}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Chemical Solutions */}
      {activeTab === 'chemical' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3 text-xs text-amber-300">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-400" />
            <span>Adhere strictly to waiting periods before harvest (Pre-Harvest Interval) and wear protective mask & gloves.</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {disease.chemicalTreatments.map((chem, idx) => (
              <div 
                key={idx} 
                className="p-5 rounded-2xl bg-[#082012] border border-emerald-500/20 hover:border-emerald-400/40 transition-all space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
                    <FlaskConical className="w-4 h-4" />
                  </div>
                  <h4 className="text-base font-bold text-white">{chem.name}</h4>
                  <div className="inline-block px-2.5 py-1 rounded-md bg-white/5 text-[11px] font-medium text-gray-300 mt-1">
                    {chem.stage}
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-emerald-500/15">
                  <div>
                    <span className="text-[11px] text-gray-400">Target Dosage:</span>
                    <div className="text-sm font-mono font-bold text-emerald-300 bg-black/40 px-2.5 py-1 rounded-md border border-emerald-500/20 mt-0.5">
                      {chem.dosage}
                    </div>
                  </div>
                  <div className="text-xs text-gray-300">
                    <span className="text-gray-400">Interval:</span> {chem.interval}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Cultural & Agronomic */}
      {activeTab === 'cultural' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center gap-3 text-xs text-blue-300">
            <Tractor className="w-4 h-4 flex-shrink-0 text-blue-400" />
            <span>Cultural controls modify field humidity microclimates and break fungal spore survival cycles.</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {disease.prevention.map((practice, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#082012] border border-emerald-500/20 flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white">Agronomic Protocol #{idx + 1}</h5>
                  <p className="text-xs text-gray-300 mt-1 leading-relaxed">{practice}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
