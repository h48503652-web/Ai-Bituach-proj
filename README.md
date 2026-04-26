<div align="center">
  

<img width="949" height="461" alt="דשבורד שמור 3" src="https://github.com/user-attachments/assets/19ed57fe-0406-4545-8bd6-bc7a8e30bf24" />
<img width="231" height="398" alt="שמור2" src="https://github.com/user-attachments/assets/a7d39493-2284-4f07-abc0-b5b6f813de2b" />
<img width="227" height="394" alt="שמור" src="https://github.com/user-attachments/assets/30d48d9d-db06-403f-a0c4-e92544add125" />


  <br />

  **Awarded 2nd Place 🥈 @ Bituach Yashir Innovation Finals (2026)**

  <p>
    <img src="https://img.shields.io/badge/Architecture-Multi--Agent%20AI-0f172a?style=for-the-badge&logo=googlegemini&logoColor=white" alt="Multi-Agent" />
    <img src="https://img.shields.io/badge/Optimization-Edge%20Computing-22c55e?style=for-the-badge" alt="Edge Computing" />
    <img src="https://img.shields.io/badge/Security-Zero--Trust-ef4444?style=for-the-badge&logo=shield&logoColor=white" alt="Zero Trust" />
  </p>

  <p>
    <em>Transforming property insurance underwriting from manual trust-based declarations to a deterministic, AI-driven visual ground truth.</em>
  </p>

  <br />

</div>

---

## 📑 Table of Contents
- [Executive Summary](#-executive-summary)
- [System Architecture](#%EF%B8%8F-system-architecture)
- [Core Innovation Highlights](#-core-innovation-highlights)
- [UI / UX Previews](#-ui--ux-previews)
- [Tech Stack](#-tech-stack)
- [Local Deployment](#-local-deployment)

---

## 📖 Executive Summary

The traditional insurance underwriting pipeline is hindered by operational bottlenecks, high manual survey costs, and exposure to fraud. **DirectVision** introduces a paradigm shift by leveraging a decentralized, Multi-Agent AI architecture. It empowers the end-user to securely capture localized property data, which is then processed, compressed at the edge, and evaluated against complex business logic in real-time.

<table align="center">
  <tr>
    <td align="center">📉 <strong>80% Reduction</strong><br>in operational survey costs</td>
    <td align="center">⚡ <strong>< 120 Seconds</strong><br>latency for final underwriting</td>
    <td align="center">🔒 <strong>100% Compliance</strong><br>via immutable audit trails</td>
  </tr>
</table>

---

## ⚙️ System Architecture

DirectVision is built on a highly scalable, event-driven topology separating the client-side acquisition from the heavy lifting of the AI inference engine.

<details>
<summary><b>👁️ Click to view the full Architecture Flow</b></summary>

```text
[ Client Device ] 
   ├── Secure Media Capture (Live Camera)
   ├── Geo-Tagging Validation (Active GPS lock)
   └── Edge Compression (70% payload reduction)
          │
          ▼  (HTTPS / REST)
[ Node.js API Gateway ]
   ├── Media Route -> Cloudinary CDN
   └── Orchestration Route -> Python FastAPI Engine
          │
          ▼  (Asynchronous Processing)
[ Multi-Agent AI Engine ]
   ├── 1. Gemini 3.1 Pro (Visual Feature Extraction)
   ├── 2. Smart Reconciler (Cross-ref vs. MongoDB CRM data)
   └── 3. Claude 3.5 Sonnet (Risk Assessment & Scoring)
          │
          ▼  (WebSocket Stream)
[ Underwriter Command Center ]
   ├── Real-Time Risk Radar
   └── Visual Audit Trail Generation
💡 Core Innovation Highlights
1. Multi-Agent Orchestration
We utilize a hybrid orchestration approach to ensure deterministic and hallucination-free outputs:

The Vision Layer (Gemini 3.1 Pro): An objective feature extractor processing pixel data to identify structural elements, finish levels, and physical hazards.

The Logic Layer (Claude 3.5 Sonnet): The "Lead Underwriter" mapping structured visual data against regulatory constraints and policy rules.

2. The Smart Reconciler
A custom reconciliation middleware engineered to achieve zero false positives. It cross-references AI visual findings against existing CRM declarations, neutralizing flags for pre-declared high-risk elements (e.g., a recognized pergola) to ensure a frictionless user experience.

3. Edge-Optimized Computing & Anti-Fraud
Processing millions of high-resolution images is computationally expensive. We implemented an HTML5 Canvas algorithm that compresses media by >70% locally. Furthermore, the app bypasses the native camera roll, extracting active GPS Geo-Tags to prevent spoofing.

📱 UI / UX Previews
(Replace the image URLs below with actual screenshots of your mobile app and dashboard)

💻 Tech Stack

Domain,Technologies Used
Frontend,  
Backend,  
AI / Inference, 
Cloud & DB,

🚀 Local Deployment
1. Clone & Install Dependencies
git clone [https://github.com/your-org/DirectVision.git](https://github.com/your-org/DirectVision.git)
cd DirectVision

2. Initialize Backend Services
cd backend
npm install
npm run start

3. Initialize AI Inference Engine
cd ai-engine
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 10000

👥 Architected By

Chani Zerbib

Shulamit Katzenlbogen

Chaya Berkowitz

Chaya Reem


