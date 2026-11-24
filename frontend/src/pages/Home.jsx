import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import { diseasesData } from '../data/diseasesData';
import { 
  Scan, 
  Cpu, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  Upload, 
  Sparkles,
  TrendingUp,
  Activity,
  Award,
  Database,
  Camera
} from 'lucide-react';

export default function Home() {
  const [activeFaq, setActiveFaq] = useState(null);
  const navigate = useNavigate();

  const faqs = [
    {
      q: 'How does AgriAI detect onion crop diseases?',
      a: 'AgriAI is powered by a fine-tuned MobileNetV2 Deep Learning Convolutional Neural Network trained on 4,502 field images of onion foliar pathologies, paired with real-time chlorophyll & necrotic lesion pixel verification.'
    },
    {
      q: 'Can AgriAI distinguish between Purple Blotch and Stemphylium Blight?',
      a: 'Yes. Our neural network classifies distinct morphological markers such as concentric violet zonation, spindle vs oval lesion shapes, and spore density patterns directly from your uploaded photograph.'
    },
    {
      q: 'Are my uploaded field photos stored safely?',
      a: 'Yes. Every uploaded input image is stored on the dedicated backend server and cataloged in a local SQLite database, allowing you to track historical scan records, accuracy trends, and disease spread across your farm.'
    },
    {
      q: 'Are the recommended treatments safe for organic export farming?',
      a: 'AgriAI offers dedicated Organic and Bio-Control tabs containing OMRI-compliant products (such as Trichoderma viride, Bacillus subtilis, and neem formulations) alongside traditional chemical fungicides.'
    }
  ];

  const featuredDiseases = diseasesData.slice(0, 4);

  return (
    <div className="space-y-24 pb-20">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Direct Field Upload & Disease Overview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-r from-[#061e12] via-[#092918] to-[#061e12] border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.15)]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Real-Time Deep Learning Pathology
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Upload Any Onion Foliage Image For Instant AI Detection
              </h2>
              <p className="text-gray-300 text-base leading-relaxed">
                Take a direct smartphone photo or upload an image from your harvest. The system validates foliar chlorophyll, saves your image in the backend database, and computes exact pathogen probabilities.
              </p>

              {/* Pathology Classes Supported */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                {featuredDiseases.map((d) => (
                  <div
                    key={d.id}
                    className="p-3 rounded-2xl bg-[#031309]/80 border border-emerald-500/25 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">{d.severity}</span>
                      <h4 className="text-xs font-bold text-white mt-0.5 truncate">{d.name}</h4>
                      <p className="text-[10px] text-gray-400 italic truncate mt-0.5">{d.scientificName}</p>
                    </div>
                    <span className="text-[10px] text-emerald-300/80 mt-2 font-mono">Trained Neural Class</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#04120a]/80 border border-emerald-500/30 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                <Upload className="w-8 h-8 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Ready to scan a field sample?</h3>
                <p className="text-xs text-gray-400 mt-1 max-w-xs">
                  Upload high-res JPG, PNG, or WEBP or use your device camera. Photos are securely stored and analyzed in milliseconds.
                </p>
              </div>
              <button
                onClick={() => navigate('/detect')}
                className="w-full glow-btn py-3 rounded-xl font-bold text-sm text-black flex items-center justify-center gap-2"
              >
                <span>Launch Disease Detection Lab</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How It Works (3 Steps) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/20">
            Intelligent Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            From Foliage Photo to Actionable Cure in Seconds
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Engineered for allium agronomists and commercial onion farmers seeking instant disease mitigation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="glass-card rounded-2xl p-7 relative group hover:border-emerald-500/60 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-lg mb-5 group-hover:scale-110 transition-transform">
              1
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Upload Field Photo</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Snap a leaf close-up directly in the field using your smartphone or upload a batch of crop photographs.
            </p>
          </div>

          {/* Step 2 */}
          <div className="glass-card rounded-2xl p-7 relative group hover:border-emerald-500/60 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-lg mb-5 group-hover:scale-110 transition-transform">
              2
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Neural Vision Analysis</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              MobileNetV2 deep neural network segments foliar tissue, isolates necrotic lesions, and computes diagnostic probabilities.
            </p>
          </div>

          {/* Step 3 */}
          <div className="glass-card rounded-2xl p-7 relative group hover:border-emerald-500/60 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-lg mb-5 group-hover:scale-110 transition-transform">
              3
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Targeted Treatment</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Receive tailored chemical, biological, and cultural protocols with exact dosage guidelines and recovery timelines.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Live Statistics & AI Metric Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="glass-card p-6 rounded-2xl text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">4,502</div>
            <div className="text-xs sm:text-sm font-semibold text-gray-300">Training Images</div>
            <div className="text-[11px] text-gray-500">Augmented field dataset</div>
          </div>
          <div className="glass-card p-6 rounded-2xl text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">83.4%</div>
            <div className="text-xs sm:text-sm font-semibold text-gray-300">Model Accuracy</div>
            <div className="text-[11px] text-gray-500">Holdout validation dataset</div>
          </div>
          <div className="glass-card p-6 rounded-2xl text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">SQLite</div>
            <div className="text-xs sm:text-sm font-semibold text-gray-300">Backend Storage</div>
            <div className="text-[11px] text-gray-500">Persistent scan records</div>
          </div>
          <div className="glass-card p-6 rounded-2xl text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">&lt; 150ms</div>
            <div className="text-xs sm:text-sm font-semibold text-gray-300">Inference Latency</div>
            <div className="text-[11px] text-gray-500">Real-time edge diagnosis</div>
          </div>
        </div>
      </section>

      {/* 5. Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/20">
            <HelpCircle className="w-3.5 h-3.5" /> Support & Science
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl overflow-hidden border border-emerald-500/20 transition-colors"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between text-white font-semibold text-sm sm:text-base hover:text-emerald-300 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-emerald-400 transition-transform duration-300 ${
                    activeFaq === idx ? 'rotate-180 text-emerald-300' : ''
                  }`}
                />
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-5 text-gray-300 text-xs sm:text-sm leading-relaxed border-t border-emerald-500/10 pt-3 animate-fadeIn">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
