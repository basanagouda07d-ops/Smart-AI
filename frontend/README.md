# AgriAI - AI-Powered Onion Disease Detection Platform

A modern, high-precision web application designed to detect, diagnose, and treat onion foliar diseases using deep learning computer vision and precision agronomic protocols.

---

## 🌟 Tech Stack

- **React.js (v18)**: Component-driven frontend UI development
- **HTML5 & CSS3**: Semantic architecture, custom glassmorphism (`backdrop-blur`), futuristic HUD scanner animations
- **Tailwind CSS (v3)**: Dark emerald aesthetic (`#030e07`), neon green accents, glowing gradients
- **Vite (v6)**: High-speed bundling and HMR development server
- **React Router (v6)**: Client-side routing with smooth navigation & deep linking
- **Axios**: Configurable backend API integration with automatic client-side fallback simulation
- **Lucide React**: Modern iconography matching agricultural and high-tech themes
- **Recharts**: Responsive data visualization (Area charts, Donut charts, Bar charts)

---

## 🚀 Live Pages & Features

### 1. Home / Landing Page (`/`)
- **Pixel-Matched Hero Section** exactly matching the design:
  - AI Powered Badge (`AI Powered • 97% Accuracy`)
  - Gradient typography: *"AI-Powered Onion Disease Detection"*
  - Dual CTAs: *"Upload Image >"* & *"Watch Demo"*
  - High-Tech Scanner Visual with holographic HUD brackets, laser sweep line, and Early Blight tag
  - Floating card: *"Smart Agriculture with AI"* with feature checkmarks
  - 4 Glassmorphic stats cards:
    1. High Accuracy: Up to 97% detection rate
    2. Real-Time Analysis: Instant results
    3. Healthy Crops: Better Yield
    4. Sustainable Farming: Greener Tomorrow
  - Leaf Divider: *"Together for a Healthier Harvest"*
- **Quick Diagnostic Sandbox**: 1-click test with genuine sample cases.
- **Workflow Stepper**: 3-step pipeline from capture to prescription.
- **Technology Metrics**: Benchmark accuracy, sub-200ms latency, yield savings.
- **Interactive FAQ Accordion**.

### 2. Onion Disease Detection Lab (`/detect`)
- **Image Input & Live Viewfinder**:
  - Drag-and-drop file upload zone
  - Camera capture option via HTML5 `getUserMedia`
  - 1-click sample presets (Early Blight, Purple Blotch, Stemphylium Blight, Healthy Crop)
- **Scanning HUD & Progress Indicator**:
  - Animated laser sweep across crop foliage
  - Real-time diagnostic phase readout
- **Detection Results**:
  - Pathogen identification & scientific name
  - Confidence percentage gauge (e.g. 97.3%)
  - Multi-class probability distribution bars
  - Foliage symptom checklist & microclimate infection triggers
- **Treatment Protocols**:
  - Tabbed breakdown: **Organic & Bio-Control**, **Chemical Solutions** (with active ingredient & dosage), and **Cultural / Agronomic Practices**
  - Copy prescription to clipboard & print-ready diagnosis sheet

### 3. User Dashboard (`/dashboard`)
- **Key Metrics**: Total scans (750), Average model accuracy (97.4%), Healthy crop ratio (74.2%), Active alerts
- **Interactive Recharts**:
  - Monthly Crop Health & Infection Trends (AreaChart)
  - Pathogen Distribution (Donut / PieChart)
  - Model Accuracy Benchmark by Disease (BarChart)
- **Grower Weather & Spray Advisory**: Live weather conditions and spray safety index
- **Historical Scans Audit Table**: Filterable by plot, severity, and disease, with detailed popup modal & CSV export

### 4. Disease Encyclopedia (`/diseases`)
- Searchable knowledge base of major onion foliar diseases
- Pathological dossiers, spore vector conditions, and full treatment plans

### 5. Authentication System (`/login` & `/register`)
- **Login Page (`/login`)**:
  - Full credential validation with user-friendly error banners
  - Password visibility toggle
  - **1-Click "Demo Farmer Login"** button for instant testing
  - Default Demo Credentials:
    - Email: `farmer@agriai.farm`
    - Password: `password123`
- **Register Page (`/register`)**:
  - Farmer name, email, farm name/identifier, acreage/hectares, farming region, password & confirmation
  - Data validation and automated instant login upon registration
- **Persistent Auth State (`AuthContext`)**:
  - `localStorage` synchronization for user sessions and custom registered accounts
  - Navbar dynamically switches between **Sign In / Register** buttons and **Grower Profile Badge & Sign Out menu**

### 6. About Us & Agronomy Contact (`/about` & `/contact`)
- Story of AgriAI vision and deep learning vision architecture
- Interactive Contact Form with state handling & toast notification
- Emergency farmer helpline and regional extension park contacts

---

## 📦 Running the Application Locally

1. Open a terminal in `d:/spidermann/SmartAI/frontend`:
   ```bash
   npm install
   npm run dev
   ```
2. Navigate in your browser to:
   ```
   http://localhost:5173/
   ```

3. To create a production build:
   ```bash
   npm run build
   ```
