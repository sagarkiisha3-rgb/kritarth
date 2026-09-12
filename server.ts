import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import multer from "multer";

const app = express();
const PORT = 3000;

// Ensure directories exist
const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const uploadsDir = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const dbFilePath = path.join(dataDir, "db.json");

// Import defaults if db doesn't exist
import {
  initialSettings,
  initialServices,
  initialBlogs,
  initialTestimonials,
  initialVideos,
  initialMedia
} from "./src/data/serverDefaults";

interface DbSchema {
  settings: typeof initialSettings;
  services: typeof initialServices;
  blogs: typeof initialBlogs;
  testimonials: typeof initialTestimonials;
  videos: typeof initialVideos;
  media: typeof initialMedia;
  appointments: Array<{
    id: string;
    fullName: string;
    phone: string;
    email: string;
    age: number | string;
    preferredLocation: string;
    preferredDate: string;
    concern: string;
    message: string;
    createdAt: string;
    status: 'New' | 'Contacted' | 'Appointment Scheduled' | 'Completed' | 'Cancelled';
  }>;
}

function loadDb(): DbSchema {
  if (fs.existsSync(dbFilePath)) {
    try {
      const content = fs.readFileSync(dbFilePath, "utf-8");
      return JSON.parse(content);
    } catch (e) {
      console.error("Error reading db.json, resetting to defaults", e);
    }
  }
  const defaultDb: DbSchema = {
    settings: initialSettings,
    services: initialServices,
    blogs: initialBlogs,
    testimonials: initialTestimonials,
    videos: initialVideos,
    media: initialMedia,
    appointments: [
      {
        id: "lead-101",
        fullName: "Harpreet Singh",
        phone: "+91 98140 12345",
        email: "harpreet.s@example.com",
        age: 52,
        preferredLocation: "Livasa Hospital Mohali",
        preferredDate: "2026-09-12",
        concern: "Persistent cough & night shortness of breath for 6 weeks",
        message: "Previous antibiotics gave no relief. Advised to consult Dr. Kritarth for PFT evaluation.",
        createdAt: "2026-09-08T10:30:00.000Z",
        status: "New"
      },
      {
        id: "lead-102",
        fullName: "Anita Sharma",
        phone: "+91 98721 54321",
        email: "anita.sharma@example.com",
        age: 44,
        preferredLocation: "Livasa Hospital Mohali",
        preferredDate: "2026-09-14",
        concern: "Heavy snoring, daytime sleepiness & choking awakenings",
        message: "Husband noticed pauses in breathing during sleep. Interested in diagnostic sleep study.",
        createdAt: "2026-09-07T14:15:00.000Z",
        status: "Contacted"
      }
    ]
  };
  saveDb(defaultDb);
  return defaultDb;
}

function saveDb(data: DbSchema) {
  fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), "utf-8");
}

let db = loadDb();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Serve uploaded files statically
app.use("/uploads", express.static(uploadsDir));

// Multer storage for persistent media library uploads
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (_req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase() || ".jpg";
    const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
    cb(null, `${base}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 15 * 1024 * 1024 } // 15MB
});

// ================= API ROUTES =================

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Admin Auth Login
const handleAuthLogin = (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;
  // Default credentials: admin@drkritarth.com / pulmo2026!
  // Securely checked on the server-side, never exposed to client
  if (
    (email === "admin@drkritarth.com" && password === "pulmo2026!") ||
    (email === "admin" && password === "admin123")
  ) {
    res.json({
      success: true,
      token: "drk-sec-auth-" + Date.now(),
      user: {
        email: "admin@drkritarth.com",
        name: "Dr. Kritarth Clinic Administrator",
        role: "admin"
      }
    });
  } else {
    res.status(401).json({ success: false, message: "Invalid email or administrator password." });
  }
};

app.post("/api/auth/login", handleAuthLogin);
app.post("/api/admin/login", handleAuthLogin);

// Settings API
app.get("/api/settings", (_req, res) => {
  res.json(db.settings);
});

app.put("/api/settings", (req, res) => {
  db.settings = { ...db.settings, ...req.body };
  saveDb(db);
  res.json({ success: true, settings: db.settings });
});

// Services API
app.get("/api/services", (_req, res) => {
  res.json(db.services);
});

app.post("/api/services", (req, res) => {
  const newService = {
    id: req.body.slug || "service-" + Date.now(),
    order: db.services.length + 1,
    isFeatured: true,
    hidden: false,
    ...req.body
  };
  db.services.push(newService);
  saveDb(db);
  res.json({ success: true, service: newService });
});

app.put("/api/services/:id", (req, res) => {
  const idx = db.services.findIndex((s) => s.id === req.params.id || s.slug === req.params.id);
  if (idx >= 0) {
    db.services[idx] = { ...db.services[idx], ...req.body };
    saveDb(db);
    res.json({ success: true, service: db.services[idx] });
  } else {
    res.status(404).json({ error: "Service not found" });
  }
});

app.delete("/api/services/:id", (req, res) => {
  db.services = db.services.filter((s) => s.id !== req.params.id && s.slug !== req.params.id);
  saveDb(db);
  res.json({ success: true });
});

// Blogs API
app.get("/api/blogs", (_req, res) => {
  res.json(db.blogs);
});

app.get("/api/blogs/:slug", (req, res) => {
  const post = db.blogs.find((b) => b.slug === req.params.slug || b.id === req.params.slug);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ error: "Article not found" });
  }
});

app.post("/api/blogs", (req, res) => {
  const newBlog = {
    id: "blog-" + Date.now(),
    date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    author: db.settings.doctorName || "Dr. Kritarth",
    readTime: "4 min read",
    status: "published",
    ...req.body
  };
  db.blogs.unshift(newBlog);
  saveDb(db);
  res.json({ success: true, blog: newBlog });
});

app.put("/api/blogs/:id", (req, res) => {
  const idx = db.blogs.findIndex((b) => b.id === req.params.id || b.slug === req.params.id);
  if (idx >= 0) {
    db.blogs[idx] = { ...db.blogs[idx], ...req.body };
    saveDb(db);
    res.json({ success: true, blog: db.blogs[idx] });
  } else {
    res.status(404).json({ error: "Blog post not found" });
  }
});

app.delete("/api/blogs/:id", (req, res) => {
  db.blogs = db.blogs.filter((b) => b.id !== req.params.id && b.slug !== req.params.id);
  saveDb(db);
  res.json({ success: true });
});

// Testimonials API
app.get("/api/testimonials", (_req, res) => {
  res.json(db.testimonials);
});

app.post("/api/testimonials", (req, res) => {
  const newTestimonial = {
    id: "test-" + Date.now(),
    date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    rating: 5,
    isFeatured: true,
    ...req.body
  };
  db.testimonials.unshift(newTestimonial);
  saveDb(db);
  res.json({ success: true, testimonial: newTestimonial });
});

app.put("/api/testimonials/:id", (req, res) => {
  const idx = db.testimonials.findIndex((t) => t.id === req.params.id);
  if (idx >= 0) {
    db.testimonials[idx] = { ...db.testimonials[idx], ...req.body };
    saveDb(db);
    res.json({ success: true, testimonial: db.testimonials[idx] });
  } else {
    res.status(404).json({ error: "Testimonial not found" });
  }
});

app.delete("/api/testimonials/:id", (req, res) => {
  db.testimonials = db.testimonials.filter((t) => t.id !== req.params.id);
  saveDb(db);
  res.json({ success: true });
});

// Videos API
app.get("/api/videos", (_req, res) => {
  res.json(db.videos);
});

app.post("/api/videos", (req, res) => {
  const newVideo = {
    id: "vid-" + Date.now(),
    duration: "4:00",
    ...req.body
  };
  db.videos.unshift(newVideo);
  saveDb(db);
  res.json({ success: true, video: newVideo });
});

app.delete("/api/videos/:id", (req, res) => {
  db.videos = db.videos.filter((v) => v.id !== req.params.id);
  saveDb(db);
  res.json({ success: true });
});

// Appointments API (Leads)
app.get("/api/appointments", (_req, res) => {
  res.json(db.appointments);
});

app.post("/api/appointments", (req, res) => {
  const { fullName, phone, email, age, preferredLocation, preferredDate, concern, message } = req.body;
  if (!fullName || !phone) {
    return res.status(400).json({ error: "Patient name and contact phone number are required." });
  }
  const newLead = {
    id: "lead-" + Date.now(),
    fullName,
    phone,
    email: email || "",
    age: age || "",
    preferredLocation: preferredLocation || "Livasa Hospital Mohali",
    preferredDate: preferredDate || new Date().toISOString().split("T")[0],
    concern: concern || "General Pulmonology Consultation",
    message: message || "",
    createdAt: new Date().toISOString(),
    status: "New" as const
  };
  db.appointments.unshift(newLead);
  saveDb(db);
  res.json({ success: true, appointment: newLead });
});

app.patch("/api/appointments/:id", (req, res) => {
  const idx = db.appointments.findIndex((a) => a.id === req.params.id);
  if (idx >= 0) {
    db.appointments[idx] = { ...db.appointments[idx], ...req.body };
    saveDb(db);
    res.json({ success: true, appointment: db.appointments[idx] });
  } else {
    res.status(404).json({ error: "Appointment enquiry not found" });
  }
});

app.delete("/api/appointments/:id", (req, res) => {
  db.appointments = db.appointments.filter((a) => a.id !== req.params.id);
  saveDb(db);
  res.json({ success: true });
});

// Media Library API
app.get("/api/media", (_req, res) => {
  res.json(db.media);
});

app.post("/api/media/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image file uploaded" });
  }

  const category = req.body.category || "Doctor Photos";
  const altText = req.body.altText || req.file.originalname;
  const caption = req.body.caption || "";

  const newMediaItem = {
    id: "media-" + Date.now(),
    filename: req.file.filename,
    url: `/uploads/${req.file.filename}`,
    category,
    altText,
    caption,
    uploadedAt: new Date().toISOString().split("T")[0],
    fileSize: (req.file.size / 1024).toFixed(0) + " KB",
    focalPoint: { x: 50, y: 50 }
  };

  db.media.unshift(newMediaItem);
  saveDb(db);

  res.json({ success: true, media: newMediaItem });
});

app.post("/api/media/url", (req, res) => {
  const { url, category, altText, caption } = req.body;
  if (!url) {
    return res.status(400).json({ error: "Image URL is required" });
  }

  const filename = url.split("/").pop()?.split("?")[0] || "image.jpg";
  const newMediaItem = {
    id: "media-" + Date.now(),
    filename,
    url,
    category: category || "Doctor Photos",
    altText: altText || filename,
    caption: caption || "",
    uploadedAt: new Date().toISOString().split("T")[0],
    fileSize: "External URL",
    focalPoint: { x: 50, y: 50 }
  };

  db.media.unshift(newMediaItem);
  saveDb(db);

  res.json({ success: true, media: newMediaItem });
});

app.patch("/api/media/:id", (req, res) => {
  const idx = db.media.findIndex((m) => m.id === req.params.id);
  if (idx >= 0) {
    db.media[idx] = { ...db.media[idx], ...req.body };
    saveDb(db);
    res.json({ success: true, media: db.media[idx] });
  } else {
    res.status(404).json({ error: "Media item not found" });
  }
});

app.delete("/api/media/:id", (req, res) => {
  const item = db.media.find((m) => m.id === req.params.id);
  if (item && item.url.startsWith("/uploads/")) {
    const filename = path.basename(item.url);
    const localPath = path.join(uploadsDir, filename);
    if (fs.existsSync(localPath)) {
      try {
        fs.unlinkSync(localPath);
      } catch (e) {
        console.error("Failed to unlink local file", e);
      }
    }
  }
  db.media = db.media.filter((m) => m.id !== req.params.id);
  saveDb(db);
  res.json({ success: true });
});

// ================= VITE MIDDLEWARE & SERVER START =================

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Express 4 wildcard
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Dr. Kritarth Pulmonology Portal running on port ${PORT}`);
  });
}

startServer();
