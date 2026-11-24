import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sprout,
  Leaf,
  Cpu,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  ArrowRight,
  Database,
  Award,
  Users
} from 'lucide-react';

export default function AboutContact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    farmAcreage: '',
    region: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">

      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Leaf className="w-3.5 h-3.5" /> Our Mission & Agricultural Vision
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Empowering Onion Farmers with Vision AI
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Bridging the gap between cutting-edge deep learning research and everyday field agronomy. We help smallholders and commercial onion growers detect diseases early, minimize synthetic chemical runoff, and safeguard harvests.
        </p>
      </div>

      {/* About Deep Learning Research Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="glass-panel glass-card-hover rounded-3xl p-8 border border-emerald-500/20 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Neural Vision Architecture</h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Our models leverage transfer learning with ResNet-50 and MobileNet convolutional backbones optimized to run efficiently on low-latency edge mobile browsers.
          </p>
        </div>

        <div className="glass-panel glass-card-hover rounded-3xl p-8 border border-emerald-500/20 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Database className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Augmented Field Datasets</h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Trained on thousands of curated allium foliar images subjected to gamma adjustments, rotational variances, and realistic shadow perturbations for robust field performance.
          </p>
        </div>

        <div className="glass-panel glass-card-hover rounded-3xl p-8 border border-emerald-500/20 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Sprout className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Sustainable Agronomy</h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            We prioritize biological controls such as *Trichoderma*, *Bacillus subtilis*, and neem extracts, helping farmers avoid unnecessary fungicide overdosing and resistance.
          </p>
        </div>

      </div>

      {/* Main Grid: Contact Form & Agronomy Hotline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

        {/* Left Column: Interactive Contact Form (7 cols) */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-8 border border-emerald-500/25 space-y-6">
          <div className="border-b border-emerald-500/15 pb-4">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Mail className="w-4 h-4" /> Direct Communication
            </span>
            <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
              Contact Agronomy Support & Engineering Team
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Have field questions, need enterprise farm deployment, or want to contribute onion pathology datasets? Reach out below.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-[#072413] border border-emerald-400/40 text-center space-y-3 animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white">Message Dispatched!</h3>
              <p className="text-xs text-gray-300 max-w-sm mx-auto">
                Thank you for contacting AgriAI. An agricultural specialist will review your inquiry and follow up within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs font-semibold text-emerald-400 hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-gray-300 font-semibold">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Patel"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#04120a] border border-emerald-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-300 font-semibold">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="farmer@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#04120a] border border-emerald-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-gray-300 font-semibold">Phone / WhatsApp Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#04120a] border border-emerald-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-300 font-semibold">Farm Size (Acres / Hectares)</label>
                  <input
                    type="text"
                    placeholder="e.g. 15 Acres"
                    value={formData.farmAcreage}
                    onChange={(e) => setFormData({ ...formData, farmAcreage: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#04120a] border border-emerald-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-300 font-semibold">Message & Field Query *</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Describe your crop condition, symptoms observed, or how we can assist..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#04120a] border border-emerald-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full glow-btn py-3.5 rounded-xl font-bold text-sm text-black flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(34,197,94,0.4)]"
              >
                {isSubmitting ? (
                  <span>Sending inquiry...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 stroke-[2.5]" />
                    <span>Submit Agronomic Request</span>
                  </>
                )}
              </button>
            </form>
          )}

        </div>

        {/* Right Column: Agronomy Extension Office & Helplines (5 cols) */}
        <div className="lg:col-span-5 space-y-6">

          <div className="glass-panel rounded-3xl p-6 border border-emerald-500/25 space-y-5">
            <h3 className="text-lg font-bold text-white tracking-tight">
              Emergency Field Assistance
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              If an unknown blight or sudden leaf tipping is rapidly spreading through your onion plot, contact our rapid response agronomist desk.
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-[#06180e] border border-emerald-500/20">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-gray-400 font-medium">Farmer Helpline (Toll-Free)</div>
                  <div className="text-sm font-bold text-white">+91 9876543210</div>
                  <div className="text-[10px] text-emerald-400">Monday - Saturday (9:00 AM - 6:00 PM)</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-[#06180e] border border-emerald-500/20">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-gray-400 font-medium">Email Advisory Desk</div>
                  <div className="text-sm font-bold text-white">king8877@gmail.com</div>
                  <div className="text-[10px] text-emerald-400">Response within 2 - 4 business hours</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-[#06180e] border border-emerald-500/20">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-gray-400 font-medium">Research Center & Test Plots</div>
                  <div className="text-sm font-bold text-white">AgriAI Technology Park</div>
                  <div className="text-[10px] text-gray-300">BGMIT Mudhol, Bagalkote, Karnataka, India</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick CTA box */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#061e12] to-[#04120a] border border-emerald-500/30 text-center space-y-3">
            <h4 className="text-base font-bold text-white">Have a photo ready for diagnosis?</h4>
            <p className="text-xs text-gray-400">
              Run it through our high-accuracy convolutional vision model right now.
            </p>
            <button
              onClick={() => navigate('/detect')}
              className="glow-btn px-6 py-2.5 rounded-full text-xs font-bold text-black inline-flex items-center gap-2"
            >
              <span>Go to Detection Lab</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
