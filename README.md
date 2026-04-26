# 🏆 DirectVision - Autonomous Insurance Underwriting

<div align="center">
  <img src="https://img.shields.io/badge/Status-Completed-success" alt="Status">
  <img src="https://img.shields.io/badge/Award-2nd%20Place%20Winner%20%F0%9F%A5%88-blueviolet" alt="Award">
  <img src="https://img.shields.io/badge/Tech-React%20%7C%20Node.js%20%7C%20Python-blue" alt="Tech Stack">
  <img src="https://img.shields.io/badge/AI-Gemini%20%7C%20Claude-orange" alt="AI Models">
</div>

<br />

**DirectVision** is an Enterprise-grade InsurTech platform built to bridge the "Information Asymmetry" gap in the home insurance industry. By replacing manual, error-prone customer declarations with **Active Visual Underwriting**, our platform provides insurance companies with a verifiable Visual Ground Truth.

🎉 **Proud 2nd Place Winner at the "Bituach Yashir" (Direct Insurance) Innovation Finals 2026!** 🎉

## 🚀 The Business Problem & Our Solution
Insurance companies lose billions annually due to a lack of accurate property data, leading to underpricing and fraud. Traditional manual surveys are slow, expensive, and resource-heavy. 

**DirectVision** solves this by sending a dynamic, smart link to the customer's smartphone. The customer takes guided photos of their property, and our **Multi-Agent AI Engine** processes the visual data, cross-references it with CRM records, and outputs a final underwriting decision in less than 2 minutes.

## ✨ Key Features & Deep-Tech Highlights

* 🧠 **Multi-Agent AI Architecture:** * **The Eyes (Google Gemini 3.1 Pro):** Extracts objective visual facts from images (e.g., room type, property condition, high-value items, water damage).
  * **The Brain (Anthropic Claude 3.5 Sonnet):** Acts as the Lead Underwriter, applying business logic and risk assessment to the extracted facts.
* ⚖️ **The Smart Reconciler:** A custom logic layer that prevents "False Positives" by cross-referencing AI findings with existing CRM data (e.g., ignoring a detected pergola if the customer already declared and paid for it).
* ⚡ **Edge Computing (Client-Side Optimization):** Implemented an in-browser Canvas compression algorithm that reduces image size by 70% before uploading, saving massive cloud bandwidth and storage costs.
* 📍 **Zero-Trust Anti-Fraud:** Active GPS Geo-Tagging locks the photo's location to the policy address, preventing users from uploading photos of different properties.
* 📊 **Real-Time Enterprise Dashboard:** A command center for underwriters powered by **WebSockets (Socket.io)**, featuring a multi-dimensional Risk Radar and a transparent Visual Audit Trail for straight-through processing (STP).

## 🏗️ System Architecture

1. **Client App (React):** Dynamic onboarding (Smart Task Generation) -> Image capture -> Geo-tagging -> Edge Compression.
2. **Backend Server (Node.js/Express):** Handles API routing -> Cloudinary upload -> MongoDB storage.
3. **AI Engine (Python/FastAPI):** Receives image batch -> Gemini Vision extraction -> Smart Reconciliation with CRM -> Claude Underwriting logic.
4. **Dashboard (React):** Real-time WebSocket updates -> Risk visualization -> Final human-in-the-loop approval.

## 💻 Tech Stack

* **Frontend:** React, TypeScript, TailwindCSS, Recharts, Lucide-React
* **Backend:** Node.js, Express.js, Socket.io
* **Database & Cloud:** MongoDB Atlas, Cloudinary
* **AI & Microservices:** Python, FastAPI, Google GenAI SDK (Gemini), Anthropic SDK (Claude)

## 🛠️ Getting Started

### Prerequisites
* Node.js (v18+)
* Python (3.10+)
* API Keys: Gemini, Claude, Cloudinary, MongoDB URI

### Installation

**1. Clone the repository**
```bash
git clone [https://github.com/your-username/DirectVision.git](https://github.com/your-username/DirectVision.git)
cd DirectVision
2. Setup Backend (Node.js)

Bash
cd backend
npm install
# Create a .env file and add your MONGO_URI and CLOUDINARY keys
npm run start
3. Setup AI Engine (Python)

Bash
cd ai-engine
pip install -r requirements.txt
# Create a .env file and add GEMINI_API_KEY and CLAUDE_API_KEY
uvicorn main:app --host 0.0.0.0 --port 10000
4. Setup Frontend (React)

Bash
cd frontend
npm install
npm run dev
👥 The Team
Built with passion and innovation by:

Shulamit Katzenlbogen

Chaya Berkowitz

Chaya Reem

Chani Zerbib

Designed for the Future of Insurance.
