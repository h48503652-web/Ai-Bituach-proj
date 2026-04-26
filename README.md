# DirectVision: Autonomous Insurance Underwriting Engine

**Awarded 2nd Place at the Bituach Yashir Innovation Finals (2026)**

DirectVision is an enterprise-grade InsurTech platform designed to resolve the Information Asymmetry inherent in the property insurance sector. By transitioning from manual, trust-based declarations to a deterministic, AI-driven visual ground truth, the platform enables Straight-Through Processing (STP) for underwriting decisions.

---

## Executive Summary

The traditional insurance underwriting pipeline is hindered by operational bottlenecks, high manual survey costs, and exposure to fraud. DirectVision introduces a paradigm shift by leveraging a decentralized, Multi-Agent AI architecture. It empowers the end-user to securely capture localized property data, which is then processed, compressed at the edge, and evaluated against complex business logic in real-time.

**Impact:** * Reduces operational survey costs by an estimated 80%.
* Accelerates the underwriting decision latency from days to under 120 seconds.
* Enforces strict compliance and anti-fraud measures via immutable audit trails.

---

## Core Architecture & Engineering Highlights

DirectVision was built with scalability, security, and computational efficiency in mind. The system is composed of several advanced engineering pillars:

### 1. Multi-Agent AI Orchestration
Instead of relying on a single monolithic LLM, the system utilizes a hybrid orchestration approach to ensure deterministic and hallucination-free outputs:
* **The Vision Layer (Google Gemini 3.1 Pro):** Acts purely as an objective feature extractor. It processes pixel data to identify structural elements, finish levels, and physical hazards (e.g., moisture, commercial equipment).
* **The Logic Layer (Anthropic Claude 3.5 Sonnet):** Acts as the Lead Underwriter. It takes the structured JSON output from the Vision Layer and runs it against the policy's regulatory constraints and business rules.

### 2. The Smart Reconciler
To achieve zero false positives and reduce user friction, we engineered a custom reconciliation middleware. This layer cross-references the raw AI visual findings against the customer's existing CRM declarations. If the AI detects a high-risk element (e.g., a large pergola) that was already declared and priced in the CRM, the Reconciler neutralizes the flag, ensuring a fair and frictionless underwriting process.

### 3. Edge-Optimized Computing
Processing millions of high-resolution images is computationally expensive. We implemented a client-side algorithm using the HTML5 Canvas API that compresses media files by over 70% locally. 
* **Result:** Drastically reduces cloud ingress bandwidth, minimizes storage costs on Cloudinary, and ensures rapid uploads even on degraded cellular networks.

### 4. Zero-Trust Anti-Fraud Protocol
The client application enforces a strict zero-trust policy. It bypasses the device's native camera roll and captures media directly. Simultaneously, it extracts GPS coordinates (Geo-Tagging) and verifies them against the registered policy address. Any spatial deviation immediately flags the application for manual review.

### 5. Real-Time Telemetry & Dashboards
The underwriter's command center is powered by bidirectional WebSockets (`Socket.io`). As the AI engine processes frames asynchronously, risk scoring, multi-dimensional radar charts, and an immutable Visual Audit Trail are streamed instantly to the dashboard, enabling immediate STP approvals.

---

## System Topology

```text
[ Client Device ] 
   ├── Secure Media Capture
   ├── Geo-Tagging Validation
   └── Client-Side Edge Compression (70% reduction)
          │
          ▼  (HTTPS / REST)
[ Node.js API Gateway ]
   ├── Media Route -> Cloudinary CDN
   └── Orchestration Route -> Python FastAPI Engine
          │
          ▼  (Asynchronous Processing)
[ Multi-Agent AI Engine ]
   ├── 1. Gemini API (Visual Feature Extraction)
   ├── 2. Smart Reconciler (Cross-ref vs. MongoDB CRM data)
   └── 3. Claude API (Risk Assessment & Scoring)
          │
          ▼  (WebSocket Stream)
[ Underwriter Command Center ]
   ├── Real-Time Risk Radar
   └── Visual Audit Trail Generation
Technology Stack
Frontend: React, TypeScript, TailwindCSS, Recharts (Data Visualization).

Backend: Node.js, Express.js, Socket.io (Real-time events).

AI Microservice: Python, FastAPI, Google GenAI SDK, Anthropic SDK.

Database & CDN: MongoDB Atlas, Cloudinary.

Getting Started
Prerequisites
Node.js (v18.x)

Python (3.10.x)

Valid API Keys: GEMINI_API_KEY, CLAUDE_API_KEY, CLOUDINARY_URL, MONGO_URI

Local Deployment
1. Clone the Repository

Bash
git clone [https://github.com/your-org/DirectVision.git](https://github.com/your-org/DirectVision.git)
cd DirectVision
2. Initialize Backend Services

Bash
cd backend
npm install
npm run start
3. Initialize AI Inference Engine

Bash
cd ai-engine
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 10000
4. Launch Client Interfaces

Bash
cd frontend
npm install
npm run dev
Contributors
Engineered and architected by:

Shulamit Katzenlbogen

Chaya Berkowitz

Chaya Reem

Chani Zerbib
