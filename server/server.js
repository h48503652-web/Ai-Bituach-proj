


// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const axios = require('axios');
// const cloudinary = require('cloudinary').v2;
// const mongoose = require('mongoose');

// // NEW: יבוא WebSockets עבור עדכוני זמן אמת לדאשבורד
// const http = require('http');
// const { Server } = require("socket.io");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // יצירת שרת HTTP שעוטף את Express
// const server = http.createServer(app);
// // הגדרת שרת ה-Sockets
// const io = new Server(server, {
//     cors: { origin: "*", methods: ["GET", "POST"] }
// });

// // --- חיבור ל-MongoDB Atlas ---
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('✅ מחובר בהצלחה ל-MongoDB Atlas'))
//   .catch(err => console.error('❌ שגיאת חיבור ל-MongoDB:', err));

// // --- הגדרת מבנה הנתונים (Schema) לשמירת בדיקות ---
// const taskSchema = new mongoose.Schema({
//   taskId: String,
//   imageUrl: String,
//   decision: String,
//   score: Number,
//   reasoning: String,
//   locationVerified: Boolean, // NEW: שדה לאימות GPS
//   createdAt: { type: Date, default: Date.now }
// });
// const Task = mongoose.model('Task', taskSchema);

// // הגדרות Cloudinary בצורה מאובטחת
// cloudinary.config({ 
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//   api_key: process.env.CLOUDINARY_API_KEY, 
//   api_secret: process.env.CLOUDINARY_API_SECRET 
// });

// const uploadDir = 'uploads/';
// if (!fs.existsSync(uploadDir)){
//     fs.mkdirSync(uploadDir);
// }

// const upload = multer({ 
//     dest: uploadDir,
//     limits: { fileSize: 50 * 1024 * 1024 }, 
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype.startsWith('image/')) {
//             cb(null, true);
//         } else {
//             cb(new Error('רק קבצי תמונה מורשים!'), false);
//         }
//     }
// });

// // מאזין לחיבורים חיים מהדאשבורד
// io.on('connection', (socket) => {
//     console.log('🖥️ דאשבורד התחבר לזמן-אמת (Socket ID:', socket.id, ')');
// });

// // פונקציית עזר לעיצוב הנתונים בדיוק במבנה שהדאשבורד שלכם מצפה לקבל
// const formatDashboardData = (task) => {
//     return {
//         application_id: task._id,
//         address: "מבצע חורב 7, באר שבע", 
//         overall_score: task.score,
//         decision: task.decision,
//         ai_defenses: {
//             is_valid_property: true,
//             image_clarity_score: 0.85, 
//             spaces_identified: [task.taskId],
//             location_verified: task.locationVerified || false // נתון חדש לדאשבורד
//         },
//         confidence_metrics: [
//             { name: "ודאות חיתום", confidence: task.score / 100, detected: true }
//         ],
//         risk_radar: [
//             { subject: 'ציון כללי', riskValue: task.score, fullMark: 100 },
//             { subject: 'אמינות', riskValue: 90, fullMark: 100 }
//         ],
//         evidence_log: [
//             { id: 1, type: "info", title: task.taskId, desc: task.reasoning, conf: "95%" }
//         ]
//     };
// };

// // נתיב להעלאה וניתוח
// app.post('/api/upload', upload.single('image'), async (req, res) => {
//     try {
//         const file = req.file;
//         const taskId = req.body.taskId;
//         // NEW: משיכת נתוני ה-GPS מהפרונט-אנד
//         const latitude = req.body.latitude;
//         const longitude = req.body.longitude;

//         if (!file) return res.status(400).json({ error: 'לא התקבלה תמונה' });

//         console.log(`\n--- בקשה חדשה: ${taskId} ---`);

//         // ============================================================
//         // ⚡ תגובת בזק ללקוח (0.1 שניות!)
//         // השרת רק שמר את התמונה זמנית אצלו, וכבר משחרר את האפליקציה!
//         // ============================================================
//         res.status(200).json({ 
//             success: true, 
//             message: "התמונה נקלטה בהצלחה! אפשר להמשיך לחדר הבא.",
//             taskId: taskId
//         });

//         // ============================================================
//         // 🚀 תהליך הרקע המלא: Cloudinary -> AI -> MongoDB
//         // ============================================================
//         (async () => {
//             try {
//                 // שלב 1 ברקע: מעלים לענן לאט ובנחת
//                 console.log(`[רקע] ⏳ מעלה תמונה ל-Cloudinary עבור ${taskId}...`);
//                 const cloudinaryResult = await cloudinary.uploader.upload(file.path, {
//                     folder: 'insurance_docs'
//                 });
//                 const imageUrl = cloudinaryResult.secure_url;
//                 console.log(`[רקע] ✅ התמונה נשמרה בענן: ${imageUrl}`);

//                 // מוחקים את הקובץ הזמני מהמחשב אחרי שעלה לענן
//                 if (fs.existsSync(file.path)) fs.unlinkSync(file.path);

//                 // שלב 2 ברקע: פונים לקלוד וג'מיני (עכשיו גם עם GPS)
//                 // שימי לב: השארתי את כתובת ה-Render שלך, אבל אם ה-Python רץ אצלך במחשב,
//                 // עדיף להשתמש ב- process.env.PYTHON_AI_URL או 'http://localhost:10000/analyze'
//                 const pythonServerUrl = process.env.PYTHON_AI_URL || 'https://python-ai-bituach.onrender.com/analyze';
//                 console.log(`[רקע] ⏳ פונה לשרת ה-AI בכתובת ${pythonServerUrl}...`);
                
//                 const response = await axios.post(pythonServerUrl, {
//                     image_url: imageUrl,
//                     task_id: taskId,
//                     latitude: latitude,
//                     longitude: longitude
//                 }, {
//                     timeout: 300000
//                 });
                
//                 const fullAiResponse = response.data;
//                 const underwriting = fullAiResponse.underwriting;
                
//                 console.log(`[רקע] ✅ החלטת המערכת ל-${taskId}: ${underwriting.decision} (ציון: ${underwriting.score})`);

//                 // שלב 3 ברקע: שומרים לדאטהבייס
//                 const newTask = new Task({
//                     taskId: taskId,
//                     imageUrl: imageUrl, 
//                     decision: underwriting.decision,
//                     score: underwriting.score,
//                     reasoning: underwriting.reasoning_for_crm,
//                     locationVerified: !!(latitude && longitude) // שומרים האם אימתנו מיקום
//                 });
//                 await newTask.save();
//                 console.log(`[רקע] 💾 המשימה של ${taskId} נשמרה ב-MongoDB בהצלחה!`);

//                 // ============================================================
//                 // 📡 NEW: שידור התוצאה בזמן אמת לדאשבורד באמצעות WebSockets!
//                 // ============================================================
//                 const dashboardData = formatDashboardData(newTask);
//                 io.emit('new_analysis_result', dashboardData);
//                 console.log(`[רקע] 🚀 הנתונים שודרו בהצלחה לדאשבורד (Live Update)`);

//             } catch (backgroundError) {
//                 // ניקוי הקובץ הזמני גם אם הייתה שגיאה
//                 if (file && file.path && fs.existsSync(file.path)) fs.unlinkSync(file.path);
                
//                 // הבלוק המעודכן שתופס גם שגיאות AI וגם שגיאות Cloudinary
//                 let realErrorMsg = backgroundError.message || "שגיאה לא ידועה";
//                 if (backgroundError.response && backgroundError.response.data) {
//                     realErrorMsg = JSON.stringify(backgroundError.response.data); // תופס שגיאות AI
//                 } else if (backgroundError.error) {
//                     realErrorMsg = JSON.stringify(backgroundError.error); // תופס שגיאות Cloudinary
//                 }
//                 console.error(`[רקע] ⚠️ שגיאה בתהליך של ${taskId}:`, realErrorMsg);
                
//                 // במקרה של קריסה מלאה, נשמור סטטוס לבדיקה ידנית בדשבורד
//                 try {
//                     const errorTask = new Task({
//                         taskId: taskId,
//                         imageUrl: "error", // אין תמונה
//                         decision: "Manual Review",
//                         score: 0,
//                         reasoning: `שגיאת מערכת חמורה (Cloudinary או AI) - נדרשת בדיקה ידנית. פרטים: ${realErrorMsg.substring(0, 100)}`
//                     });
//                     await errorTask.save();
                    
//                     // משדרים גם שגיאות לדאשבורד
//                     io.emit('new_analysis_result', formatDashboardData(errorTask));
//                 } catch (dbError) {
//                     console.error("נכשל אפילו בשמירת הודעת השגיאה לדאטהבייס.");
//                 }
//             }
//         })(); 
//         // ============================================================

//     } catch (error) {
//         console.error("שגיאת שרת פנימית:", error);
//         // אם אפילו לא הצלחנו לקבל את הקובץ
//         if (!res.headersSent) {
//             res.status(500).json({ error: 'שגיאת שרת פנימית ב-Node.js' });
//         }
//     }
// });

// // נתיב חדש: שליפת היסטוריית הבדיקות מהדאטהבייס
// app.get('/api/history', async (req, res) => {
//     try {
//         const history = await Task.find().sort({ createdAt: -1 });
//         res.json(history);
//     } catch (error) {
//         res.status(500).json({ error: 'לא ניתן לשלוף את ההיסטוריה' });
//     }
// });

// // נתיב עבור ה-Dashboard שמחזיר את הבדיקה האחרונה בפורמט שה-UI מצפה לו
// app.get('/api/dashboard-data', async (req, res) => {
//     try {
//         const lastTask = await Task.findOne().sort({ createdAt: -1 });
        
//         if (!lastTask) {
//             return res.status(404).json({ error: "No data found" });
//         }

//         // משתמשים בפונקציה המשותפת שיצרנו
//         const dashboardView = formatDashboardData(lastTask);
//         res.json(dashboardView);
        
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// const PORT = process.env.PORT || 3001;
// // שינוי קריטי: מפעילים את ה-server (שכולל sockets) במקום את ה-app
// server.listen(PORT, () => {
//     console.log(`Server & WebSockets are running on http://localhost:${PORT}`);
// });

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');

// WebSockets עבור עדכוני זמן אמת לדאשבורד
const http = require('http');
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

// יצירת שרת HTTP שעוטף את Express (חובה עבור Sockets)
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] }
});

// --- חיבור ל-MongoDB Atlas ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ מחובר בהצלחה ל-MongoDB Atlas'))
  .catch(err => console.error('❌ שגיאת חיבור ל-MongoDB:', err));

// --- הגדרת מבנה הנתונים (Schema) ---
const taskSchema = new mongoose.Schema({
  taskId: String,
  imageUrl: String,
  decision: String,
  score: Number,
  reasoning: String,
  locationVerified: Boolean,
  createdAt: { type: Date, default: Date.now }
});
const Task = mongoose.model('Task', taskSchema);

const sessionPhotoSchema = new mongoose.Schema({
  sessionId: { type: String, index: true },
  taskId: String,
  imageUrl: String,
  latitude: String,
  longitude: String,
  createdAt: { type: Date, default: Date.now }
});

const SessionPhoto = mongoose.model('SessionPhoto', sessionPhotoSchema);

const sessionResultSchema = new mongoose.Schema({
  sessionId: { type: String, index: true, unique: true },
  decision: String,
  score: Number,
  reasoning: String,
  flags: Object,
  crmData: Object,
  vision: Object,
  inputWarnings: Array,
  locationVerified: Boolean,
  imageCount: Number,
  createdAt: { type: Date, default: Date.now }
});

const SessionResult = mongoose.model('SessionResult', sessionResultSchema);

const formatExpectedRoom = (taskId) => {
    if (!taskId) return 'נכס';
    if (taskId === 'living_room') return 'סלון';
    if (taskId === 'kitchen') return 'מטבח';
    if (taskId === 'balcony') return 'מרפסת';
    if (taskId === 'storage') return 'מחסן';
    if (taskId.startsWith('bedroom_')) {
        const num = taskId.split('_')[1];
        return `חדר שינה ${num}`;
    }
    return taskId;
};

// הגדרות Cloudinary בצורה מאובטחת
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

const upload = multer({ 
    dest: uploadDir,
    limits: { fileSize: 50 * 1024 * 1024 }, 
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('רק קבצי תמונה מורשים!'), false);
        }
    }
});

// מאזין לחיבורים חיים מהדאשבורד
io.on('connection', (socket) => {
    console.log('🖥️ דאשבורד התחבר לזמן-אמת (Socket ID:', socket.id, ')');
});

// פונקציית עזר לעיצוב הנתונים עבור הדאשבורד
const formatDashboardData = (task) => {
    const flagLabels = {
        unoccupied: 'דירה ריקה',
        moisture_signs: 'רטיבות/עובש',
        severe_neglect: 'הזנחה/בלוי',
        age_mismatch: 'אי-התאמת גיל',
        overcrowded: 'אכלוס יתר',
        large_pergola: 'פרגולה גדולה',
        expensive_storage: 'יקר במחסן',
        split_apartment: 'פיצול דירה',
        business_activity: 'עסק בדירה',
        luxury: 'יוקרה',
        pool_or_jacuzzi: 'בריכה/ג׳קוזי',
        area_exceeds_20_percent: 'שטח חריג'
    };

    const flags = task.flags || {};
    const confidence_metrics = Object.keys(flagLabels).map((key) => {
        const f = flags[key] || {};
        const triggered = !!f.triggered;
        const conf = triggered ? (f.is_high_confidence ? 0.9 : 0.6) : 0.15;
        return { name: flagLabels[key], confidence: conf };
    });

    const risk_radar = [
        { subject: 'רטיבות', riskValue: flags.moisture_signs?.triggered ? (flags.moisture_signs?.is_high_confidence ? 90 : 60) : 10 },
        { subject: 'הזנחה', riskValue: flags.severe_neglect?.triggered ? (flags.severe_neglect?.is_high_confidence ? 90 : 60) : 10 },
        { subject: 'אכלוס', riskValue: flags.overcrowded?.triggered ? (flags.overcrowded?.is_high_confidence ? 90 : 60) : 10 },
        { subject: 'עסקי', riskValue: flags.business_activity?.triggered ? (flags.business_activity?.is_high_confidence ? 90 : 60) : 10 },
        { subject: 'פיצול', riskValue: flags.split_apartment?.triggered ? (flags.split_apartment?.is_high_confidence ? 90 : 60) : 10 },
        { subject: 'יוקרה', riskValue: flags.luxury?.triggered ? (flags.luxury?.is_high_confidence ? 90 : 60) : 10 },
    ];

    const evidence_log = Object.keys(flagLabels)
        .filter((key) => flags[key]?.triggered)
        .slice(0, 12)
        .map((key, idx) => {
            const f = flags[key] || {};
            return {
                id: idx + 1,
                type: 'flag',
                title: flagLabels[key],
                desc: f.evidence || '',
                conf: f.is_high_confidence ? 'High' : 'Low'
            };
        });

    if (evidence_log.length === 0) {
        evidence_log.push({ id: 1, type: 'info', title: 'אין חריגות', desc: task.reasoning || 'לא זוהו דגלים אדומים מהותיים.', conf: 'OK' });
    }

    const crm = task.crmData || task.crm_data || {};
    const customer = crm.customer_details || {};
    const property = crm.property_details || {};
    const characteristics = crm.property_characteristics || {};
    const underwritingQuestions = crm.underwriting_questions || {};
    const customer_name = [customer.first_name, customer.last_name].filter(Boolean).join(' ').trim();
    const address = [
        [property.street, property.house_number].filter((v) => v !== undefined && v !== null && v !== '').join(' '),
        property.city
    ].filter(Boolean).join(', ');

    const vision = task.vision || {};
    const inputWarnings = Array.isArray(task.inputWarnings) ? task.inputWarnings : [];
    const roomMismatchCount = inputWarnings.filter((w) => w && w.type === 'ROOM_MISMATCH').length;
    const imageCount = typeof task.imageCount === 'number' ? task.imageCount : 0;
    const computedClarity = Math.max(0.5, Math.min(0.95, 0.9 - (roomMismatchCount / Math.max(1, imageCount)) * 0.4));

    return {
        application_id: task._id,
        customer_name: customer_name || undefined,
        address: address || task.address || "-",
        crm_summary: {
            id_number: customer.id_number || undefined,
            phone_number: customer.phone_number || undefined,
            email: customer.email || undefined,
            property_type: property.property_type || undefined,
            rooms: characteristics.rooms !== undefined ? characteristics.rooms : undefined,
            area_sqm: characteristics.area_sqm !== undefined ? characteristics.area_sqm : undefined,
            property_used_for_business: underwritingQuestions.property_used_for_business !== undefined ? !!underwritingQuestions.property_used_for_business : undefined
        },
        overall_score: task.score,
        decision: task.decision,
        ai_defenses: {
            is_valid_property: vision.is_valid_property !== undefined ? !!vision.is_valid_property : true,
            image_clarity_score: vision.image_clarity_score !== undefined ? Number(vision.image_clarity_score) : computedClarity,
            spaces_identified: (vision.identified_areas && Array.isArray(vision.identified_areas) && vision.identified_areas.length > 0)
                ? vision.identified_areas
                : (task.spacesIdentified || [task.taskId]),
            location_verified: !!task.locationVerified
        },
        confidence_metrics,
        risk_radar,
        evidence_log
    };
};

// נתיב להעלאה וניתוח (נקרא מהאפליקציה של הלקוח)
app.post('/api/upload', upload.single('image'), async (req, res) => {
    try {
        const file = req.file;
        const taskId = req.body.taskId;
        const latitude = req.body.latitude;
        const longitude = req.body.longitude;
        const sessionId = req.body.sessionId;

        if (!file) return res.status(400).json({ error: 'לא התקבלה תמונה' });
        if (!sessionId) return res.status(400).json({ error: 'חסר sessionId' });

        console.log(`\n--- בקשה חדשה: ${taskId} (session: ${sessionId}) ---`);

        // תגובת בזק ללקוח (משחררים את האפליקציה מיד)
        res.status(200).json({ 
            success: true, 
            message: "התמונה נקלטה בהצלחה! אפשר להמשיך לחדר הבא.",
            taskId: taskId
        });

        // תהליך הרקע: Cloudinary -> MongoDB (שמירת תמונות לסשן בלבד)
        (async () => {
            try {
                console.log(`[רקע] ⏳ מעלה תמונה ל-Cloudinary עבור ${taskId}...`);
                const cloudinaryResult = await cloudinary.uploader.upload(file.path, {
                    folder: 'insurance_docs'
                });
                const imageUrl = cloudinaryResult.secure_url;
                console.log(`[רקע] ✅ התמונה נשמרה בענן: ${imageUrl}`);

                if (fs.existsSync(file.path)) fs.unlinkSync(file.path);

                const photo = new SessionPhoto({
                    sessionId,
                    taskId,
                    imageUrl,
                    latitude: latitude || null,
                    longitude: longitude || null
                });
                await photo.save();
                console.log(`[רקע] 💾 תמונה נשמרה לסשן ${sessionId} (task: ${taskId})`);

            } catch (backgroundError) {
                if (file && file.path && fs.existsSync(file.path)) fs.unlinkSync(file.path);
                
                let realErrorMsg = backgroundError.message || "שגיאה לא ידועה";
                if (backgroundError.response && backgroundError.response.data) {
                    realErrorMsg = JSON.stringify(backgroundError.response.data);
                } else if (backgroundError.error) {
                    realErrorMsg = JSON.stringify(backgroundError.error);
                }
                console.error(`[רקע] ⚠️ שגיאה בתהליך של ${taskId}:`, realErrorMsg);
            }
        })(); 

    } catch (error) {
        console.error("שגיאת שרת פנימית:", error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'שגיאת שרת פנימית ב-Node.js' });
        }
    }
});

app.post('/api/complete-session', async (req, res) => {
    try {
        const { sessionId, crmData } = req.body || {};
        if (!sessionId) return res.status(400).json({ success: false, error: 'חסר sessionId' });

        const photos = await SessionPhoto.find({ sessionId }).sort({ createdAt: 1 });
        if (!photos || photos.length === 0) {
            return res.status(400).json({ success: false, error: 'לא נמצאו תמונות לסשן הזה' });
        }

        const pythonServerUrl = process.env.PYTHON_AI_URL || 'http://127.0.0.1:10000/analyze_batch';
        console.log(`[Batch] ⏳ מפעיל AI עבור session ${sessionId} עם ${photos.length} תמונות...`);
        console.log(`[Batch] 📋 נתוני CRM: ${crmData ? 'מצורף' : 'לא מצורף'}`);

        const response = await axios.post(pythonServerUrl, {
            session_id: sessionId,
            crm_data: crmData,  // העברת נתוני ה-CRM ל-AI
            images: photos.map((p) => ({
                image_url: p.imageUrl,
                expected_room: formatExpectedRoom(p.taskId),
                gps: (p.latitude && p.longitude) ? { lat: parseFloat(p.latitude), lng: parseFloat(p.longitude) } : null
            }))
        }, { timeout: 900000 });

        const underwriting = response.data?.underwriting;
        if (!underwriting) {
            return res.status(500).json({ success: false, error: 'ה-AI לא החזיר underwriting' });
        }

        const vision = response.data?.vision;
        const inputWarnings = response.data?.input_warnings;
        const locationVerified = photos.some((p) => p.latitude && p.longitude);

        await SessionResult.updateOne(
            { sessionId },
            {
                $set: {
                    sessionId,
                    decision: underwriting.decision,
                    score: underwriting.score,
                    reasoning: underwriting.reasoning_for_crm,
                    flags: underwriting.flags,
                    crmData: crmData || undefined,
                    vision: vision || undefined,
                    inputWarnings: Array.isArray(inputWarnings) ? inputWarnings : undefined,
                    locationVerified,
                    imageCount: photos.length
                }
            },
            { upsert: true }
        );

        const syntheticTask = {
            _id: sessionId,
            taskId: `Batch (${photos.length})`,
            score: underwriting.score,
            decision: underwriting.decision,
            reasoning: underwriting.reasoning_for_crm,
            flags: underwriting.flags,
            crmData: crmData || undefined,
            vision: vision || undefined,
            inputWarnings: Array.isArray(inputWarnings) ? inputWarnings : undefined,
            imageCount: photos.length,
            locationVerified
        };

        io.emit('new_analysis_result', formatDashboardData(syntheticTask));
        console.log(`[Batch] 🚀 שודר לדאשבורד new_analysis_result עבור session ${sessionId}`);

        return res.json({ success: true });
    } catch (e) {
        const msg = e && e.response && e.response.data ? JSON.stringify(e.response.data) : (e.message || 'שגיאה לא ידועה');
        console.error('[Batch] ❌ שגיאה:', msg);
        return res.status(500).json({ success: false, error: msg });
    }
});

// נתיב עבור טעינה ראשונית של ה-Dashboard
app.get('/api/dashboard-data', async (req, res) => {
    try {
        const lastResult = await SessionResult.findOne().sort({ createdAt: -1 });
        if (!lastResult) {
            return res.status(404).json({ error: "No data found" });
        }
        const syntheticTask = {
            _id: lastResult.sessionId,
            taskId: `Batch (${lastResult.imageCount || 0})`,
            score: lastResult.score,
            decision: lastResult.decision,
            reasoning: lastResult.reasoning,
            flags: lastResult.flags,
            crmData: lastResult.crmData,
            vision: lastResult.vision,
            inputWarnings: lastResult.inputWarnings,
            imageCount: lastResult.imageCount,
            locationVerified: !!lastResult.locationVerified
        };
        res.json(formatDashboardData(syntheticTask));
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 3001;
// מפעילים את ה-server שכולל את ה-WebSockets
server.listen(PORT, () => {
    console.log(`Server & WebSockets are running on http://localhost:${PORT}`);
});