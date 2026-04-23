// import { io } from 'socket.io-client'; // ⚠️ הוסיפו את זה למעלה יחד עם שאר ה-imports

// import React, { useState, useEffect } from 'react';
// import {
//   ShieldAlert, ShieldCheck, Camera, FileText,
//   AlertTriangle, CheckCircle, Activity, Home,
//   MapPin, Search, FileJson, Zap, Building2, Crosshair, Info
// } from 'lucide-react';
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip,
//   ResponsiveContainer, CartesianGrid, Cell,
//   Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
//   PieChart, Pie
// } from 'recharts';

// const mockAiResponse = {
//   application_id: "ממתין לנתונים...",
//   address: "ממתין לסריקת נכס...",
//   overall_score: 0,
//   decision: "Pending",
//   ai_defenses: {
//     is_valid_property: true,
//     image_clarity_score: 0,
//     is_catalog_image_suspicion: false,
//     spaces_identified: ["ממתין..."]
//   },
//   confidence_metrics: [
//     { name: "רטיבות/עובש", confidence: 0, detected: false },
//     { name: "הזנחה קשה", confidence: 0, detected: false },
//     { name: "ציוד מסחרי", confidence: 0, detected: false },
//     { name: "פרגולה", confidence: 0, detected: false },
//     { name: "פיצול דירה", confidence: 0, detected: false }
//   ],
//   risk_radar: [
//     { subject: 'עובש ורטיבות', riskValue: 0, fullMark: 100 },
//     { subject: 'הזנחת מבנה', riskValue: 0, fullMark: 100 },
//     { subject: 'אכלוס יתר', riskValue: 0, fullMark: 100 },
//     { subject: 'סיכון עסקי', riskValue: 0, fullMark: 100 },
//     { subject: 'פיצול חריג', riskValue: 0, fullMark: 100 },
//     { subject: 'תוספות בנייה', riskValue: 0, fullMark: 100 },
//   ],
//   evidence_log: [
//     { id: 1, type: "info", title: "המערכת מוכנה", desc: "ממתין לקבלת נתוני צילום מהאפליקציה...", conf: "100%" }
//   ]
// };

// export default function App() {
//   const [data, setData] = useState(mockAiResponse);
//   // useEffect - פקודה של React שאומרת: "תריץ את הקוד הזה ברגע שהמסך נטען"
//   useEffect(() => {

//     // 1. הגדרנו פונקציה שעושה בקשה לשרת שלך ומביאה את הנתונים החדשים מה-MongoDB
//     const fetchData = async () => {
//       const response = await fetch('http://localhost:3001/api/data');
//       const newData = await response.json();
//       setDashboardData(newData); // מעדכן את הגרפים במסך
//     };

//     // 2. מפעילים אותה פעם אחת מיד כשהדף עולה
//     fetchData();

//     // 3. הקסם האמיתי: טיימר! 
//     // אומר ל-React: "קח את הפונקציה fetchData, ותפעיל אותה שוב כל 5000 מילי-שניות (5 שניות)"
//     const interval = setInterval(fetchData, 5000);

//     // 4. "מנקה" - אם החתם סוגר את החלון, אנחנו מכבים את הטיימר כדי לא לבזבז זיכרון למחשב
//     return () => clearInterval(interval);

//   }, []); // הסוגריים הריקים אומרים שזה יקרה רק פעם אחת כשהמסך נפתח

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const response = await fetch('http://localhost:3001/api/dashboard-data');
//         if (response.ok) {
//           const liveData = await response.json();
//           setData(liveData);
//         }
//       } catch (error) {
//         console.log("ממתין לחיבור...");
//       }
//     };
//     fetchDashboardData();
//     const intervalId = setInterval(fetchDashboardData, 3000);
//     return () => clearInterval(intervalId);
//   }, []);

//   const gaugeData = [
//     { name: 'Score', value: data.overall_score || 0, fill: data.overall_score >= 85 ? '#10b981' : data.overall_score >= 60 ? '#f59e0b' : '#ef4444' },
//     { name: 'Remaining', value: 100 - (data.overall_score || 0), fill: '#1E293B' }
//   ];

//   const cardHoverClass = "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-500/10 hover:border-rose-500/40";

//   return (
//     <div className="flex h-screen bg-[#0A1128] text-slate-200 overflow-hidden" dir="rtl">

//       {/* 🚀 ה-Sidebar המקורי והחדשני שלך עם העיגולים הצבעוניים */}
//       <aside className="w-64 xl:w-[320px] bg-slate-50 border-l border-slate-200 flex flex-col shrink-0 z-20 shadow-xl relative overflow-hidden">
//         <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
//           <div className="absolute -top-24 -right-16 w-[300px] h-[300px] rounded-full bg-[#FF2B5E] opacity-90"></div>
//           <div className="absolute top-[40%] -left-32 w-[350px] h-[350px] rounded-full bg-[#5A38FF] opacity-90"></div>
//           <div className="absolute -bottom-16 -right-12 w-[220px] h-[220px] rounded-full bg-[#B535C4] opacity-90"></div>
//         </div>

//         <div className="p-8 pb-6 relative z-10">
//           <div className="flex items-center gap-4">
//             <div className="bg-white p-3 rounded-2xl shadow-md flex items-center justify-center shrink-0 border border-slate-100">
//               <img src="src/assets/logo.svg" alt="DirectAI" className="h-10 w-auto object-contain" onError={(e) => e.target.src = 'https://via.placeholder.com/40?text=AI'} />
//             </div>
//             <div className="flex flex-col justify-center">
//               <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-1">
//                 Direct<span className="text-slate-900 font-medium">AI</span>
//               </h1>
//               <p className="text-slate-900 text-[10px] font-extrabold tracking-widest uppercase">Enterprise AI</p>
//             </div>
//           </div>
//         </div>

//         <nav className="flex-1 p-5 space-y-4 mt-2 relative z-10">
//           <a href="#" className="flex items-center justify-between px-5 py-4 bg-white border-2 border-rose-500 rounded-2xl font-bold shadow-lg text-rose-600">
//             <div className="flex items-center gap-3">
//               <Activity className="w-6 h-6" />
//               <span className="text-lg">חיתום בזמן אמת</span>
//             </div>
//             <div className="w-3 h-3 bg-rose-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(244,63,94,1)]"></div>
//           </a>
//           <a href="#" className="flex items-center gap-3 px-5 py-4 bg-white/95 backdrop-blur-sm border border-slate-200 text-slate-800 rounded-2xl font-bold shadow-md">
//             <FileText className="w-6 h-6 text-slate-500" />
//             <span className="text-lg">ארכיון פוליסות</span>
//           </a>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 overflow-y-auto styled-scrollbar">
//         <div className="w-full px-6 lg:px-10 py-8 space-y-6 max-w-[1600px] mx-auto relative">

//           {/* Header */}
//           <header className={`bg-[#121A33] p-6 rounded-2xl border border-[#1A2342] shadow-lg flex flex-col md:flex-row justify-between items-end gap-4 ${cardHoverClass}`}>
//             <div>
//               <div className="flex items-center gap-3 text-slate-400 mb-2">
//                 <span className="bg-[#0A1128] px-3 py-1.5 rounded-lg text-xs font-bold border border-[#1A2342] flex items-center gap-2">
//                   <FileJson className="w-4 h-4 text-rose-400" /> ID: {data.application_id}
//                 </span>
//                 <span className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
//                   <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
//                   מחובר למנוע ה-AI
//                 </span>
//               </div>
//               <h2 className="text-2xl lg:text-3xl font-black text-white flex items-center gap-3">
//                 <MapPin className="w-7 h-7 text-rose-500" /> {data.address}
//               </h2>
//             </div>

//             <div className={`px-6 py-3.5 rounded-xl font-bold text-lg border shadow-inner ${data.overall_score >= 85 ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' :
//                 data.overall_score > 0 ? 'border-amber-500/30 text-amber-400 bg-amber-500/10' : 'border-slate-500/30 text-slate-400 bg-slate-500/10'
//               }`}>
//               {data.decision === "Pending" ? "ממתין לנתונים..." : data.decision}
//             </div>
//           </header>

//           {/* Top KPIs Grid */}
//           <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
//             {/* Score Gauge */}
//             <div className={`bg-[#121A33] p-6 rounded-2xl border border-[#1A2342] h-48 flex flex-col items-center justify-center relative ${cardHoverClass}`}>
//               <p className="text-slate-400 font-bold text-xs absolute top-4">ציון חיתום משוקלל</p>
//               <div className="w-full h-32 pt-4">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie data={gaugeData} cx="50%" cy="100%" startAngle={180} endAngle={0} innerRadius={50} outerRadius={70} dataKey="value" stroke="none" />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//               <div className="absolute bottom-6 flex items-baseline gap-1">
//                 <span className="text-4xl font-black text-white">{data.overall_score}</span>
//                 <span className="text-slate-500 text-xs">/100</span>
//               </div>
//             </div>

//             {/* Quality Box */}
//             <div className={`bg-[#121A33] p-6 rounded-2xl border border-[#1A2342] h-48 flex flex-col justify-between ${cardHoverClass}`}>
//               <p className="text-slate-400 font-bold text-xs">בקרת קלט (Quality)</p>
//               <div className="space-y-3">
//                 <div className="flex justify-between items-center text-xs">
//                   <span>אימות נכס:</span>
//                   <span className="text-emerald-400 font-bold bg-emerald-400/10 px-2 py-1 rounded">תקין</span>
//                 </div>
//                 <div className="flex justify-between items-end">
//                   <span className="text-xs text-slate-400">איכות צילום:</span>
//                   <span className="text-3xl font-black text-white">{(data.ai_defenses.image_clarity_score * 100).toFixed(0)}%</span>
//                 </div>
//               </div>
//             </div>

//             {/* Fraud Box */}
//             <div className={`bg-[#121A33] p-6 rounded-2xl border border-[#1A2342] h-48 flex flex-col justify-between ${cardHoverClass}`}>
//               <p className="text-slate-400 font-bold text-xs">מניעת הונאה (Fraud)</p>
//               <div className="bg-emerald-400/10 text-emerald-400 p-4 rounded-xl border border-emerald-500/20 text-center font-bold relative overflow-hidden">
//                 <ShieldCheck className="w-10 h-10 absolute -right-2 -bottom-2 opacity-10" />
//                 רמת סיכון נמוכה
//               </div>
//             </div>

//             {/* Spaces Box */}
//             <div className={`bg-[#121A33] p-6 rounded-2xl border border-[#1A2342] h-48 flex flex-col justify-between ${cardHoverClass}`}>
//               <p className="text-slate-400 font-bold text-xs">כיסוי חללים</p>
//               <div>
//                 <p className="text-5xl font-black text-white">{data.ai_defenses.spaces_identified?.length || 0}</p>
//                 <p className="text-[10px] text-slate-500 mt-1 truncate">{data.ai_defenses.spaces_identified?.join(' • ')}</p>
//               </div>
//             </div>
//           </section>

//           {/* Bottom Analytics Grid */}
//           <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[420px]">
//             {/* Radar */}
//             <div className={`bg-[#121A33] p-6 rounded-2xl border border-[#1A2342] flex flex-col h-full ${cardHoverClass}`}>
//               <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><Crosshair className="w-5 h-5 text-rose-500" /> פרופיל סיכון</h3>
//               <div className="flex-1 w-full min-h-0" dir="ltr">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data.risk_radar}>
//                     <PolarGrid stroke="#1E293B" />
//                     <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
//                     <Radar dataKey="riskValue" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.5} />
//                     <Tooltip contentStyle={{ backgroundColor: '#0A1128', border: '1px solid #1A2342' }} />
//                   </RadarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             {/* Confidence Bar */}
//             <div className={`bg-[#121A33] p-6 rounded-2xl border border-[#1A2342] flex flex-col h-full ${cardHoverClass}`}>
//               <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><Zap className="w-5 h-5 text-amber-400" /> ודאות AI</h3>
//               <div className="flex-1 w-full min-h-0" dir="ltr">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={data.confidence_metrics} layout="vertical">
//                     <XAxis type="number" domain={[0, 1]} hide />
//                     <YAxis dataKey="name" type="category" tick={{ fill: '#94a3b8', fontSize: 12 }} width={90} axisLine={false} tickLine={false} />
//                     <Bar dataKey="confidence" radius={[0, 4, 4, 0]}>
//                       {data.confidence_metrics?.map((entry, index) => (
//                         <Cell key={index} fill={entry.confidence >= 0.7 ? '#f43f5e' : '#1E293B'} />
//                       ))}
//                     </Bar>
//                     <Tooltip cursor={{ fill: 'transparent' }} />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             {/* Evidence Log */}
//             <div className={`bg-[#121A33] p-6 rounded-2xl border border-[#1A2342] flex flex-col h-full overflow-hidden ${cardHoverClass}`}>
//               <h3 className="text-lg font-bold text-white mb-4 border-b border-[#1A2342] pb-4">יומן ראיונות (Audit)</h3>
//               <div className="flex-1 overflow-y-auto space-y-4 pr-2 styled-scrollbar">
//                 {data.evidence_log?.map((log, i) => (
//                   <div key={i} className="p-4 rounded-xl bg-[#0A1128] border border-[#1A2342] relative overflow-hidden">
//                     <div className="flex justify-between items-start mb-2 relative z-10">
//                       <h4 className="font-bold text-rose-400 text-sm">{log.title}</h4>
//                       <span className="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-400 font-black">ודאות {log.conf}</span>
//                     </div>
//                     <p className="text-xs text-slate-400 leading-relaxed relative z-10">{log.desc}</p>
//                     <div className="absolute inset-0 bg-[#1A2342] opacity-20 z-0"></div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>
//         </div>
//       </main>
//     </div>
//   );
// }



// import React, { useState, useEffect } from 'react';
// import { io } from 'socket.io-client'; // יבוא חובה לעדכוני זמן אמת
// import {
//   ShieldAlert, ShieldCheck, Camera, FileText,
//   AlertTriangle, CheckCircle, Activity, Home,
//   MapPin, Search, FileJson, Zap, Building2, Crosshair, Info
// } from 'lucide-react';
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip,
//   ResponsiveContainer, CartesianGrid, Cell,
//   Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
//   PieChart, Pie
// } from 'recharts';

// const mockAiResponse = {
//   application_id: "ממתין לנתונים...",
//   address: "ממתין לסריקת נכס...",
//   overall_score: 0,
//   decision: "Pending",
//   ai_defenses: {
//     is_valid_property: true,
//     image_clarity_score: 0,
//     is_catalog_image_suspicion: false,
//     spaces_identified: ["ממתין..."],
//     location_verified: false
//   },
//   confidence_metrics: [
//     { name: "רטיבות/עובש", confidence: 0, detected: false },
//     { name: "הזנחה קשה", confidence: 0, detected: false },
//     { name: "ציוד מסחרי", confidence: 0, detected: false },
//     { name: "פרגולה", confidence: 0, detected: false },
//     { name: "פיצול דירה", confidence: 0, detected: false }
//   ],
//   risk_radar: [
//     { subject: 'עובש ורטיבות', riskValue: 0, fullMark: 100 },
//     { subject: 'הזנחת מבנה', riskValue: 0, fullMark: 100 },
//     { subject: 'אכלוס יתר', riskValue: 0, fullMark: 100 },
//     { subject: 'סיכון עסקי', riskValue: 0, fullMark: 100 },
//     { subject: 'פיצול חריג', riskValue: 0, fullMark: 100 },
//     { subject: 'תוספות בנייה', riskValue: 0, fullMark: 100 },
//   ],
//   evidence_log: [
//     { id: 1, type: "info", title: "המערכת מוכנה", desc: "ממתין לקבלת נתוני צילום מהאפליקציה...", conf: "100%" }
//   ]
// };

// export default function App() {
//   const [data, setData] = useState(mockAiResponse);

//   // התיקון הקריטי: טעינה ראשונית + חיבור ל-WebSockets במקום Polling מיושן
//   useEffect(() => {
//     // 1. טעינה ראשונית בעליית הדף
//     const fetchInitialData = async () => {
//       try {
//         const response = await fetch('http://localhost:3001/api/dashboard-data');
//         if (response.ok) {
//           const liveData = await response.json();
//           setData(liveData);
//         }
//       } catch (error) {
//         console.log("ממתין לחיבור לשרת...");
//       }
//     };
//     fetchInitialData();

//     // 2. חיבור ל-WebSockets לעדכוני זמן-אמת
//     const socket = io('http://localhost:3001');
    
//     socket.on('new_analysis_result', (newData) => {
//       console.log('🚀 התקבל עדכון חי מה-AI:', newData);
//       setData(newData); // מעדכן את המסך מיידית בלי ריענון!
//     });

//     // 3. ניקוי בעת סגירת הקומפוננטה
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const gaugeData = [
//     { name: 'Score', value: data.overall_score || 0, fill: data.overall_score >= 85 ? '#10b981' : data.overall_score >= 60 ? '#f59e0b' : '#ef4444' },
//     { name: 'Remaining', value: 100 - (data.overall_score || 0), fill: '#1E293B' }
//   ];

//   const cardHoverClass = "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-500/10 hover:border-rose-500/40";

//   return (
//     <div className="flex h-screen bg-[#0A1128] text-slate-200 overflow-hidden" dir="rtl">

//       {/* Sidebar */}
//       <aside className="w-64 xl:w-[320px] bg-slate-50 border-l border-slate-200 flex flex-col shrink-0 z-20 shadow-xl relative overflow-hidden">
//         <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
//           <div className="absolute -top-24 -right-16 w-[300px] h-[300px] rounded-full bg-[#FF2B5E] opacity-90"></div>
//           <div className="absolute top-[40%] -left-32 w-[350px] h-[350px] rounded-full bg-[#5A38FF] opacity-90"></div>
//           <div className="absolute -bottom-16 -right-12 w-[220px] h-[220px] rounded-full bg-[#B535C4] opacity-90"></div>
//         </div>

//         <div className="p-8 pb-6 relative z-10">
//           <div className="flex items-center gap-4">
//             <div className="bg-white p-3 rounded-2xl shadow-md flex items-center justify-center shrink-0 border border-slate-100">
//               <img src="src/assets/logo.svg" alt="DirectAI" className="h-10 w-auto object-contain" onError={(e) => e.target.src = 'https://via.placeholder.com/40?text=AI'} />
//             </div>
//             <div className="flex flex-col justify-center">
//               <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-1">
//                 Direct<span className="text-slate-900 font-medium">AI</span>
//               </h1>
//               <p className="text-slate-900 text-[10px] font-extrabold tracking-widest uppercase">Enterprise AI</p>
//             </div>
//           </div>
//         </div>

//         <nav className="flex-1 p-5 space-y-4 mt-2 relative z-10">
//           <a href="#" className="flex items-center justify-between px-5 py-4 bg-white border-2 border-rose-500 rounded-2xl font-bold shadow-lg text-rose-600">
//             <div className="flex items-center gap-3">
//               <Activity className="w-6 h-6" />
//               <span className="text-lg">חיתום בזמן אמת</span>
//             </div>
//             <div className="w-3 h-3 bg-rose-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(244,63,94,1)]"></div>
//           </a>
//           <a href="#" className="flex items-center gap-3 px-5 py-4 bg-white/95 backdrop-blur-sm border border-slate-200 text-slate-800 rounded-2xl font-bold shadow-md">
//             <FileText className="w-6 h-6 text-slate-500" />
//             <span className="text-lg">ארכיון פוליסות</span>
//           </a>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 overflow-y-auto styled-scrollbar">
//         <div className="w-full px-6 lg:px-10 py-8 space-y-6 max-w-[1600px] mx-auto relative">

//           {/* Header */}
//           <header className={`bg-[#121A33] p-6 rounded-2xl border border-[#1A2342] shadow-lg flex flex-col md:flex-row justify-between items-end gap-4 ${cardHoverClass}`}>
//             <div>
//               <div className="flex items-center gap-3 text-slate-400 mb-2">
//                 <span className="bg-[#0A1128] px-3 py-1.5 rounded-lg text-xs font-bold border border-[#1A2342] flex items-center gap-2">
//                   <FileJson className="w-4 h-4 text-rose-400" /> ID: {data.application_id}
//                 </span>
//                 <span className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
//                   <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
//                   מחובר למנוע ה-AI
//                 </span>
//                 {/* חיווי נוסף על ה-GPS */}
//                 {data.ai_defenses?.location_verified && (
//                    <span className="flex items-center gap-2 text-xs font-bold text-blue-400 bg-blue-400/10 px-3 py-1.5 rounded-lg border border-blue-500/20">
//                      📍 מיקום אומת
//                    </span>
//                 )}
//               </div>
//               <h2 className="text-2xl lg:text-3xl font-black text-white flex items-center gap-3">
//                 <MapPin className="w-7 h-7 text-rose-500" /> {data.address}
//               </h2>
//             </div>

//             <div className={`px-6 py-3.5 rounded-xl font-bold text-lg border shadow-inner ${data.overall_score >= 85 ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' :
//                 data.overall_score > 0 ? 'border-amber-500/30 text-amber-400 bg-amber-500/10' : 'border-slate-500/30 text-slate-400 bg-slate-500/10'
//               }`}>
//               {data.decision === "Pending" ? "ממתין לנתונים..." : data.decision}
//             </div>
//           </header>

//           {/* Top KPIs Grid */}
//           <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
//             <div className={`bg-[#121A33] p-6 rounded-2xl border border-[#1A2342] h-48 flex flex-col items-center justify-center relative ${cardHoverClass}`}>
//               <p className="text-slate-400 font-bold text-xs absolute top-4">ציון חיתום משוקלל</p>
//               <div className="w-full h-32 pt-4">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie data={gaugeData} cx="50%" cy="100%" startAngle={180} endAngle={0} innerRadius={50} outerRadius={70} dataKey="value" stroke="none" />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//               <div className="absolute bottom-6 flex items-baseline gap-1">
//                 <span className="text-4xl font-black text-white">{data.overall_score}</span>
//                 <span className="text-slate-500 text-xs">/100</span>
//               </div>
//             </div>

//             <div className={`bg-[#121A33] p-6 rounded-2xl border border-[#1A2342] h-48 flex flex-col justify-between ${cardHoverClass}`}>
//               <p className="text-slate-400 font-bold text-xs">בקרת קלט (Quality)</p>
//               <div className="space-y-3">
//                 <div className="flex justify-between items-center text-xs">
//                   <span>אימות נכס:</span>
//                   <span className="text-emerald-400 font-bold bg-emerald-400/10 px-2 py-1 rounded">תקין</span>
//                 </div>
//                 <div className="flex justify-between items-end">
//                   <span className="text-xs text-slate-400">איכות צילום:</span>
//                   <span className="text-3xl font-black text-white">{(data.ai_defenses.image_clarity_score * 100).toFixed(0)}%</span>
//                 </div>
//               </div>
//             </div>

//             <div className={`bg-[#121A33] p-6 rounded-2xl border border-[#1A2342] h-48 flex flex-col justify-between ${cardHoverClass}`}>
//               <p className="text-slate-400 font-bold text-xs">מניעת הונאה (Fraud)</p>
//               <div className="bg-emerald-400/10 text-emerald-400 p-4 rounded-xl border border-emerald-500/20 text-center font-bold relative overflow-hidden">
//                 <ShieldCheck className="w-10 h-10 absolute -right-2 -bottom-2 opacity-10" />
//                 רמת סיכון נמוכה
//               </div>
//             </div>

//             <div className={`bg-[#121A33] p-6 rounded-2xl border border-[#1A2342] h-48 flex flex-col justify-between ${cardHoverClass}`}>
//               <p className="text-slate-400 font-bold text-xs">כיסוי חללים</p>
//               <div>
//                 <p className="text-5xl font-black text-white">{data.ai_defenses.spaces_identified?.length || 0}</p>
//                 <p className="text-[10px] text-slate-500 mt-1 truncate">{data.ai_defenses.spaces_identified?.join(' • ')}</p>
//               </div>
//             </div>
//           </section>

//           {/* Bottom Analytics Grid */}
//           <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[420px]">
//             <div className={`bg-[#121A33] p-6 rounded-2xl border border-[#1A2342] flex flex-col h-full ${cardHoverClass}`}>
//               <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><Crosshair className="w-5 h-5 text-rose-500" /> פרופיל סיכון</h3>
//               <div className="flex-1 w-full min-h-0" dir="ltr">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data.risk_radar}>
//                     <PolarGrid stroke="#1E293B" />
//                     <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
//                     <Radar dataKey="riskValue" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.5} />
//                     <Tooltip contentStyle={{ backgroundColor: '#0A1128', border: '1px solid #1A2342' }} />
//                   </RadarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             <div className={`bg-[#121A33] p-6 rounded-2xl border border-[#1A2342] flex flex-col h-full ${cardHoverClass}`}>
//               <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><Zap className="w-5 h-5 text-amber-400" /> ודאות AI</h3>
//               <div className="flex-1 w-full min-h-0" dir="ltr">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={data.confidence_metrics} layout="vertical">
//                     <XAxis type="number" domain={[0, 1]} hide />
//                     <YAxis dataKey="name" type="category" tick={{ fill: '#94a3b8', fontSize: 12 }} width={90} axisLine={false} tickLine={false} />
//                     <Bar dataKey="confidence" radius={[0, 4, 4, 0]}>
//                       {data.confidence_metrics?.map((entry, index) => (
//                         <Cell key={index} fill={entry.confidence >= 0.7 ? '#f43f5e' : '#1E293B'} />
//                       ))}
//                     </Bar>
//                     <Tooltip cursor={{ fill: 'transparent' }} />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             <div className={`bg-[#121A33] p-6 rounded-2xl border border-[#1A2342] flex flex-col h-full overflow-hidden ${cardHoverClass}`}>
//               <h3 className="text-lg font-bold text-white mb-4 border-b border-[#1A2342] pb-4">יומן ראיונות (Audit)</h3>
//               <div className="flex-1 overflow-y-auto space-y-4 pr-2 styled-scrollbar">
//                 {data.evidence_log?.map((log, i) => (
//                   <div key={i} className="p-4 rounded-xl bg-[#0A1128] border border-[#1A2342] relative overflow-hidden">
//                     <div className="flex justify-between items-start mb-2 relative z-10">
//                       <h4 className="font-bold text-rose-400 text-sm">{log.title}</h4>
//                       <span className="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-400 font-black">ודאות {log.conf}</span>
//                     </div>
//                     <p className="text-xs text-slate-400 leading-relaxed relative z-10">{log.desc}</p>
//                     <div className="absolute inset-0 bg-[#1A2342] opacity-20 z-0"></div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>
//         </div>
//       </main>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import {
  ShieldCheck, Activity, Home, MapPin, FileJson, Zap, Crosshair, Info, FileText,
  Clock, Settings, FileArchive, Activity as ActivityIcon
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PieChart, Pie
} from 'recharts';

const INITIAL_DATA = {
  application_id: "---",
  address: "ממתין לסריקה...",
  overall_score: 0,
  decision: "Pending",
  ai_defenses: {
    image_clarity_score: 0,
    spaces_identified: [],
    location_verified: false
  },
  confidence_metrics: [
    { name: "רטיבות", confidence: 0 },
    { name: "הזנחה", confidence: 0 },
    { name: "מסחרי", confidence: 0 },
    { name: "פרגולה", confidence: 0 },
    { name: "פיצול", confidence: 0 }
  ],
  risk_radar: [
    { subject: 'רטיבות', riskValue: 0 },
    { subject: 'הזנחה', riskValue: 0 },
    { subject: 'אכלוס', riskValue: 0 },
    { subject: 'עסקי', riskValue: 0 },
    { subject: 'פיצול', riskValue: 0 },
    { subject: 'בנייה', riskValue: 0 },
  ],
  evidence_log: []
};

export default function Dashboard() {
  const [data, setData] = useState(INITIAL_DATA);

  useEffect(() => {
    // טעינה ראשונית וחיבור Socket
    const socket = io('http://localhost:3001');
    
    socket.on('new_analysis_result', (newData) => {
      setData(newData);
    });

    return () => socket.disconnect();
  }, []);

  const gaugeData = [
    { value: data.overall_score || 0, fill: data.overall_score >= 85 ? '#10b981' : '#f43f5e' },
    { value: 100 - (data.overall_score || 0), fill: '#1e293b' }
  ];

  return (
    <div className="flex flex-row-reverse h-screen bg-[#0A1128] text-slate-200 overflow-hidden font-sans" dir="rtl">
      
      {/* Sidebar - Bituach Yashir Style */}
      <aside className="w-80 bg-white border-l border-slate-100 flex flex-col shrink-0 shadow-xl z-10 relative overflow-hidden">
        {/* Decorative circles like Bituach Yashir */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full" />
        <div className="absolute top-20 -left-8 w-24 h-24 bg-rose-500/10 rounded-full" />
        
        {/* Logo Section */}
        <div className="p-6 border-b border-slate-100 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex flex-col">
              <span className="text-lg font-black text-slate-900 tracking-tight leading-none">DirectAI</span>
              <span className="text-[10px] text-slate-500 font-medium tracking-wider">ENTERPRISE AI</span>
            </div>
            <div className="w-px h-8 bg-slate-200 mx-1" />
            <img src="/logo.svg" alt="ביטוח ישיר" className="h-8 w-auto" />
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="p-4 space-y-3 relative z-10">
          {/* Active Badge - Red with pulse dot */}
          <div className="flex items-center gap-3 px-4 py-3 bg-rose-50 text-rose-600 rounded-2xl font-bold border border-rose-100 shadow-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
            <ActivityIcon className="w-5 h-5" />
            <span>חיתום בזמן אמת</span>
          </div>
          
          {/* Menu Items */}
          <div className="space-y-1">
            <div className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-all cursor-pointer group">
              <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
                <FileArchive className="w-5 h-5 text-slate-500 group-hover:text-purple-600" />
              </div>
              <span>ארכיון פוליסות</span>
            </div>
            
            <div className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-all cursor-pointer group">
              <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
                <FileText className="w-5 h-5 text-slate-500 group-hover:text-purple-600" />
              </div>
              <span>דוחות חתום</span>
            </div>
            
            <div className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-all cursor-pointer group">
              <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
                <Clock className="w-5 h-5 text-slate-500 group-hover:text-purple-600" />
              </div>
              <span>הגדרות חתום</span>
            </div>
          </div>
        </nav>
        
        {/* Bottom section - could add user profile here */}
        <div className="mt-auto p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 px-4 py-2 text-slate-400 text-sm">
            <Settings className="w-4 h-4" />
            <span>הגדרות מערכת</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-y-auto p-8 bg-[#0A1128]">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Top Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-[#121A33] p-8 rounded-[2rem] border border-[#1A2342] shadow-xl">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-rose-500/10 rounded-2xl border border-rose-500/20">
                <Home className="w-8 h-8 text-rose-500" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-rose-400 bg-rose-400/10 px-2 py-0.5 rounded uppercase border border-rose-400/20">ID: {data.application_id}</span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded uppercase border border-emerald-400/20">AI מחובר למנוע</span>
                  {data.ai_defenses.location_verified && <span className="text-[10px] font-bold text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded uppercase border border-blue-400/20">📍 GPS אומת</span>}
                </div>
                <h2 className="text-3xl font-black text-white">{data.address}</h2>
              </div>
            </div>
            <div className={`px-10 py-4 rounded-2xl font-black text-xl border ${data.overall_score >= 85 ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' : 'border-amber-500/30 text-amber-400 bg-amber-500/10'}`}>
              {data.decision}
            </div>
          </div>

          {/* Core Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Score Gauge */}
            <div className="bg-[#121A33] p-6 rounded-[1.5rem] border border-[#1A2342] flex flex-col items-center justify-center relative min-h-[220px]">
              <span className="absolute top-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">ציון חיתום משוקלל</span>
              <div className="w-full h-32 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={gaugeData} cx="50%" cy="100%" startAngle={180} endAngle={0} innerRadius={55} outerRadius={75} dataKey="value" stroke="none" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="absolute bottom-6 flex flex-col items-center leading-none">
                <span className="text-4xl font-black text-white">{data.overall_score}</span>
              </div>
            </div>

            {/* Quality Meter */}
            <div className="bg-[#121A33] p-6 rounded-[1.5rem] border border-[#1A2342] flex flex-col justify-between min-h-[220px]">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">בקרת קלט (Quality)</span>
              <div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mb-3 overflow-hidden">
                  <div className="bg-rose-500 h-full transition-all duration-1000" style={{ width: `${data.ai_defenses.image_clarity_score * 100}%` }}></div>
                </div>
                <span className="text-5xl font-black text-white leading-none">{(data.ai_defenses.image_clarity_score * 100).toFixed(0)}%</span>
                <p className="text-xs text-slate-500 mt-1 font-medium">איכות תמונה</p>
              </div>
            </div>

            {/* Fraud Shield */}
            <div className="bg-[#121A33] p-6 rounded-[1.5rem] border border-[#1A2342] flex flex-col justify-between min-h-[220px]">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">מניעת הונאה (Fraud)</span>
              <div className="flex items-center gap-4 bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/10">
                <ShieldCheck className="w-8 h-8 text-emerald-500" />
                <div>
                  <p className="text-emerald-500 font-bold text-sm leading-none">רמת סיכון נמוכה</p>
                  <p className="text-[10px] text-slate-500 mt-1">מדיה אותנטית</p>
                </div>
              </div>
            </div>

            {/* Coverage */}
            <div className="bg-[#121A33] p-6 rounded-[1.5rem] border border-[#1A2342] flex flex-col justify-between min-h-[220px]">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">כיסוי חללים</span>
              <div>
                <span className="text-6xl font-black text-white leading-none">{data.ai_defenses.spaces_identified.length}</span>
                <p className="text-xs text-rose-500 font-bold mt-2 truncate">{data.ai_defenses.spaces_identified.join(' • ')}</p>
              </div>
            </div>
          </div>

          {/* Advanced Analytics Grid - Fixed Heights for Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Radar Chart */}
            <div className="bg-[#121A33] p-8 rounded-[2rem] border border-[#1A2342] h-[450px] flex flex-col">
              <h3 className="text-sm font-black text-white uppercase flex items-center gap-2 mb-6">
                <Crosshair className="w-4 h-4 text-rose-500" /> פרופיל סיכון רב-מימדי
              </h3>
              <div className="flex-1 min-h-0 min-w-0" dir="rtl">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data.risk_radar}>
                    <PolarGrid stroke="#1e293b" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 'bold' }} angle={90} />
                    <Radar dataKey="riskValue" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.5} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Confidence Bar Chart */}
            <div className="bg-[#121A33] p-8 rounded-[2rem] border border-[#1A2342] h-[450px] flex flex-col">
              <h3 className="text-sm font-black text-white uppercase flex items-center gap-2 mb-6">
                <Zap className="w-4 h-4 text-amber-500" /> מטריצת ודאות AI (Confidence)
              </h3>
              <div className="flex-1 min-h-0 min-w-0" dir="rtl">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.confidence_metrics} layout="vertical" margin={{ left: 20, right: 20 }}>
                    <XAxis type="number" domain={[0, 1]} hide />
                    <YAxis dataKey="name" type="category" tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 'bold' }} width={70} axisLine={false} tickLine={false} />
                    <Bar dataKey="confidence" radius={[0, 10, 10, 0]} barSize={18}>
                      {data.confidence_metrics.map((entry, index) => (
                        <Cell key={index} fill={entry.confidence >= 0.7 ? '#f43f5e' : '#1e293b'} />
                      ))}
                    </Bar>
                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: '#0A1128' }} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Audit Log */}
            <div className="bg-[#121A33] p-8 rounded-[2rem] border border-[#1A2342] h-[450px] flex flex-col">
              <h3 className="text-sm font-black text-white uppercase flex items-center gap-2 mb-6 border-b border-slate-800 pb-4">
                <Info className="w-4 h-4 text-blue-400" /> יומן ראיות (Audit Trail)
              </h3>
              <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar">
                {data.evidence_log.map((log, i) => (
                  <div key={i} className="p-4 rounded-xl bg-[#0A1128]/50 border border-slate-800/50">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-rose-500 text-[11px] uppercase tracking-tighter">{log.title}</span>
                      <span className="text-[9px] bg-slate-900 px-2 py-0.5 rounded text-slate-400 border border-slate-800">CONF: {log.conf}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug font-medium">{log.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #f43f5e; }
      `}</style>
    </div>
  );
}