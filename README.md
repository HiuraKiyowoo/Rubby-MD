<div align="center">

<!-- HERO BANNER SVG -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 420" width="100%" height="auto" style="max-width: 1000px; display: block; margin: auto;">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#08070d"/>
      <stop offset="40%" stop-color="#0f0c1b"/>
      <stop offset="80%" stop-color="#07060a"/>
      <stop offset="100%" stop-color="#020204"/>
    </linearGradient>

    <!-- Border Gradient -->
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#c084fc" stop-opacity="0.8"/>
      <stop offset="35%" stop-color="#a855f7" stop-opacity="0.3"/>
      <stop offset="70%" stop-color="#6366f1" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.6"/>
    </linearGradient>

    <!-- Core Glow & Gradient -->
    <linearGradient id="coreGlow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#e879f9"/>
      <stop offset="50%" stop-color="#a855f7"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>

    <!-- Accent Silver -->
    <linearGradient id="silverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#94a3b8"/>
    </linearGradient>

    <!-- Device Glass Gradient -->
    <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2e1065" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#0f0728" stop-opacity="0.7"/>
    </linearGradient>

    <!-- Filters for Bloom -->
    <filter id="purpleGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="16" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <!-- Subtle Grid Pattern -->
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#7e22ce" stroke-width="1" stroke-opacity="0.07"/>
    </pattern>
  </defs>

  <style>
    .title-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-weight: 900; letter-spacing: 4px; }
    .sub-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-weight: 500; letter-spacing: 1.5px; }
    .mono-text { font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace; font-size: 11px; }
  </style>

  <!-- Background Canvas -->
  <rect width="1000" height="420" rx="24" fill="url(#bgGrad)"/>
  <rect width="1000" height="420" rx="24" fill="url(#grid)"/>
  <rect width="998" height="418" x="1" y="1" rx="23" fill="none" stroke="url(#borderGrad)" stroke-width="1.5"/>

  <!-- Ambient Light Circles -->
  <circle cx="200" cy="120" r="140" fill="#a855f7" fill-opacity="0.12" filter="url(#purpleGlow)"/>
  <circle cx="800" cy="280" r="160" fill="#6366f1" fill-opacity="0.10" filter="url(#purpleGlow)"/>
  <circle cx="500" cy="210" r="100" fill="#ec4899" fill-opacity="0.06" filter="url(#purpleGlow)"/>

  <!-- Multi-Device Connectivity Schematic (Right Side) -->
  <g transform="translate(680, 205)">
    <!-- Orbital Connection Rings -->
    <circle cx="0" cy="0" r="125" fill="none" stroke="#a855f7" stroke-width="1" stroke-dasharray="4,6" stroke-opacity="0.25"/>
    <circle cx="0" cy="0" r="85" fill="none" stroke="#6366f1" stroke-width="1" stroke-dasharray="6,4" stroke-opacity="0.35"/>

    <!-- Dynamic Vector Connection Lines -->
    <line x1="0" y1="0" x2="-80" y2="-65" stroke="url(#coreGlow)" stroke-width="1.5" stroke-opacity="0.7"/>
    <line x1="0" y1="0" x2="85" y2="-55" stroke="url(#coreGlow)" stroke-width="1.5" stroke-opacity="0.7"/>
    <line x1="0" y1="0" x2="-75" y2="70" stroke="url(#coreGlow)" stroke-width="1.5" stroke-opacity="0.7"/>
    <line x1="0" y1="0" x2="80" y2="65" stroke="url(#coreGlow)" stroke-width="1.5" stroke-opacity="0.7"/>

    <!-- Central Node (Server / Engine Hub) -->
    <circle cx="0" cy="0" r="38" fill="url(#glassGrad)" stroke="#c084fc" stroke-width="2" filter="url(#softGlow)"/>
    <circle cx="0" cy="0" r="28" fill="#180b33" stroke="#a855f7" stroke-width="1.5"/>
    <!-- Server Icon -->
    <rect x="-12" y="-12" width="24" height="6" rx="1.5" fill="#e879f9"/>
    <rect x="-12" y="-3" width="24" height="6" rx="1.5" fill="#c084fc"/>
    <rect x="-12" y="6" width="24" height="6" rx="1.5" fill="#a855f7"/>
    <circle cx="6" cy="-9" r="1" fill="#ffffff"/>
    <circle cx="6" cy="0" r="1" fill="#ffffff"/>
    <circle cx="6" cy="9" r="1" fill="#ffffff"/>

    <!-- Satellite Device 1: Mobile Phone (Top-Left) -->
    <g transform="translate(-80, -65)">
      <rect x="-16" y="-24" width="32" height="48" rx="5" fill="#0f0c1b" stroke="#a855f7" stroke-width="1.5" filter="url(#softGlow)"/>
      <rect x="-13" y="-19" width="26" height="36" rx="2" fill="#1e1035"/>
      <circle cx="0" cy="20" r="1.5" fill="#c084fc"/>
      <path d="M-6 -4 L0 2 L6 -4" fill="none" stroke="#38bdf8" stroke-width="1.5" stroke-linecap="round"/>
    </g>

    <!-- Satellite Device 2: Laptop / Web Client (Top-Right) -->
    <g transform="translate(85, -55)">
      <rect x="-24" y="-16" width="48" height="30" rx="3" fill="#0f0c1b" stroke="#6366f1" stroke-width="1.5" filter="url(#softGlow)"/>
      <rect x="-20" y="-13" width="40" height="22" rx="1.5" fill="#151030"/>
      <path d="M-30 14 L30 14" stroke="#818cf8" stroke-width="3" stroke-linecap="round"/>
      <circle cx="0" cy="-2" r="3" fill="#a855f7"/>
    </g>

    <!-- Satellite Device 3: Tablet (Bottom-Left) -->
    <g transform="translate(-75, 70)">
      <rect x="-22" y="-17" width="44" height="34" rx="4" fill="#0f0c1b" stroke="#c084fc" stroke-width="1.5" filter="url(#softGlow)"/>
      <rect x="-18" y="-13" width="36" height="26" rx="2" fill="#1b1233"/>
      <circle cx="18" cy="0" r="1.2" fill="#a855f7"/>
      <rect x="-10" y="-4" width="20" height="8" rx="1" fill="#6366f1" fill-opacity="0.6"/>
    </g>

    <!-- Satellite Device 4: Cloud / Microservice Node (Bottom-Right) -->
    <g transform="translate(80, 65)">
      <circle cx="0" cy="0" r="18" fill="#0f0c1b" stroke="#38bdf8" stroke-width="1.5" filter="url(#softGlow)"/>
      <path d="M-8 2 C-8 -4, -2 -8, 2 -6 C5 -8, 10 -4, 9 1 C12 2, 12 7, 7 8 L-6 8 C-10 8, -11 4, -8 2 Z" fill="#38bdf8" fill-opacity="0.8"/>
    </g>
  </g>

  <!-- Left Side: Brand Typography & Identity -->
  <g transform="translate(80, 100)">
    <!-- Badge: Version & Engine -->
    <g transform="translate(0, 0)">
      <rect x="0" y="0" width="225" height="28" rx="14" fill="#201335" stroke="#7e22ce" stroke-width="1"/>
      <circle cx="14" cy="14" r="4" fill="#10b981" filter="url(#softGlow)"/>
      <text x="26" y="18" fill="#e9d5ff" class="mono-text" font-weight="600">RUBY-BAILEYS v1.5.17</text>
      <rect x="160" y="5" width="55" height="18" rx="9" fill="#7e22ce" fill-opacity="0.4"/>
      <text x="171" y="17" fill="#f0abfc" class="mono-text" font-size="9" font-weight="700">ESM</text>
    </g>

    <!-- Main Title: RUBBY -->
    <text x="0" y="80" fill="url(#silverGrad)" class="title-text" font-size="46" filter="url(#softGlow)">RUBBY</text>
    <text x="210" y="80" fill="url(#coreGlow)" class="title-text" font-size="46" filter="url(#softGlow)">MD</text>

    <!-- Secondary Title / Descriptor -->
    <text x="2" y="112" fill="#c084fc" class="sub-text" font-size="14" font-weight="700">MODULAR WHATSAPP AUTOMATION CORE</text>

    <!-- Tagline -->
    <text x="2" y="146" fill="#94a3b8" class="sub-text" font-size="14" font-weight="400">
      A lightweight WhatsApp multi-device automation experience.
    </text>

    <!-- Developer & Platform Details -->
    <g transform="translate(2, 185)">
      <!-- Dev Tag -->
      <g transform="translate(0, 0)">
        <rect x="0" y="0" width="125" height="32" rx="8" fill="#150d26" stroke="#4c1d95" stroke-width="1"/>
        <text x="12" y="20" fill="#a78bfa" class="mono-text" font-weight="500">Dev : </text>
        <text x="50" y="20" fill="#ffffff" class="mono-text" font-weight="700">Kyuu</text>
      </g>

      <!-- Architecture Tag -->
      <g transform="translate(135, 0)">
        <rect x="0" y="0" width="165" height="32" rx="8" fill="#150d26" stroke="#4c1d95" stroke-width="1"/>
        <text x="12" y="20" fill="#a78bfa" class="mono-text" font-weight="500">Core : </text>
        <text x="58" y="20" fill="#38bdf8" class="mono-text" font-weight="700">Node.js ESM</text>
      </g>

      <!-- Features Count Tag -->
      <g transform="translate(310, 0)">
        <rect x="0" y="0" width="150" height="32" rx="8" fill="#150d26" stroke="#4c1d95" stroke-width="1"/>
        <text x="12" y="20" fill="#a78bfa" class="mono-text" font-weight="500">Plugins : </text>
        <text x="75" y="20" fill="#4ade80" class="mono-text" font-weight="700">250+ Live</text>
      </g>
    </g>
  </g>
</svg>

<br/>

<!-- ACTION NAVIGATION BUTTONS -->
<p align="center">
  <a href="https://github.com/KyuuX444">
    <img src="https://img.shields.io/badge/GitHub-KyuuX444-18181b?style=for-the-badge&logo=github&logoColor=white&borderColor=a855f7" alt="GitHub"/>
  </a>
  &nbsp;
  <a href="https://api.kyzzz.xyz">
    <img src="https://img.shields.io/badge/Rest_API-api.kyzzz.xyz-7e22ce?style=for-the-badge&logo=fastapi&logoColor=white" alt="Rest API"/>
  </a>
  &nbsp;
  <a href="https://whatsapp.com/channel/0029VbDXYlKDJ6H1D7Dm0f13">
    <img src="https://img.shields.io/badge/WhatsApp-Official_Channel-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="Channel"/>
  </a>
  &nbsp;
  <a href="https://youtube.com/@MommyKyuu">
    <img src="https://img.shields.io/badge/YouTube-MommyKyuu-dc2626?style=for-the-badge&logo=youtube&logoColor=white" alt="YouTube"/>
  </a>
</p>

</div>

---

## 1. Project Overview

**Rubby Multi Device** adalah framework bot WhatsApp berbasis arsitektur **Node.js ES Modules (ESM)** murni yang ditenagai oleh official library `ruby-baileys@1.5.17`.

Dirancang dari fondasi modular dengan fokus pada:
- **Performa Ringan & Cepat**: Mengeliminasi overhead runtime yang tidak diperlukan dengan pemanfaatan streaming buffer asli dan memori heap terisolasi.
- **Sistem Hot Reloading Realtime**: Registrasi, perubahan, dan penambahan plugin langsung termuat secara instan tanpa perlu mematikan atau me-restart bot.
- **Dukungan Media Komprehensif**: Generator canvas vector SVG cyberpunk, konversi audio effect 21-in-1, image transformation AI, dan multi-platform media downloader.
- **Arsitektur Socket Bersih**: Handler socket terpusat dengan helper terintegrasi (`decodeJid`, `sendText`, `sendButtons`, deduplikasi command anti-double execution).

---

## 2. Key Features

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       MODULAR FEATURE CAPABILITIES                          │
├──────────────────────────────┬──────────────────────────────────────────────┤
│ ⚡ Engine & Architecture     │ Node.js ESM • ruby-baileys@1.5.17 • Hot Reload│
│ 🎨 Canvas & Visual Maker     │ Brat Animated • E-KTP • Fake Call • Quotes   │
│ 📊 Telemetry HUD Monitor     │ Sci-Fi Cyberpunk Vector Card (Sharp Render) │
│ 🎵 Modular Audio Effects     │ 21 Discrete Effects (Bass, 8D, Echo, Slow)   │
│ 📥 Multi-Platform Downloader │ TikTok, IG, FB, YT, CapCut, MediaFire, PXL   │
│ 🤖 AI Transformation Studio  │ 31 Neural Art Presets (Ghibli, Chibi, Lego) │
│ 🔒 Enterprise Permissions    │ Owner, Premium, Group Admin & Anti-Double    │
│ 💾 Autonomous Backup Engine  │ Full Codebase ZIP Dispatch directly to Owner │
└──────────────────────────────┴──────────────────────────────────────────────┘
```

### Fitur Rinci Berdasarkan Kategori:

1. **Downloader Multi-Platform (`plugins/downloader/`)**:
   - `.tiktok` / `.tt` : Unduh video tanpa watermark dan album foto slide otomatis.
   - `.instagram` / `.ig` : Unduh reel, video, dan postingan carousel foto.
   - `.facebook` / `.fb` : Unduh video Facebook kualitas HD & SD beserta audio mp3.
   - `.ytmp4` / `.ytv` & `.play` / `.ytmp3` : Streaming & unduh video dan audio YouTube.
   - `.capcut` : Ekstraksi video CapCut tanpa watermark resolusi tinggi.
   - `.mediafire` / `.mf` : Direct file stream downloader untuk dokumen & arsip.
   - `.krakenfiles`, `.mp4upload`, `.pixeldrain` : Direct cloud storage downloader.

2. **Sci-Fi Cyberpunk Telemetry HUD (`plugins/main/ping.js`)**:
   - Kartu visual SVG vector beresolusi 1040x610 yang dirender ke PNG murni via Sharp.
   - Mengukur metrik CPU load, model processor, RAM usage, storage I/O, server uptime, dan latency response time.

3. **Modular Audio Processing (`plugins/audio/`)**:
   - 21 Efek Audio Terpisah (1 file per effect): `.bass`, `.blown`, `.deep`, `.earrape`, `.fast`, `.fat`, `.nightcore`, `.reverse`, `.robot`, `.slow`, `.smooth`, `.tupai`, `.8d` / `.audio8d`, `.echo`, `.distortion`, `.pitch`, `.reverb`, `.flanger`, `.apulsator`, `.tremolo`, `.chorus`.
   - 3 Alat Utilitas Audio: `.cut` (pemotong rentang audio), `.ttsanime` (Text-to-Speech karakter anime), `.ttsdracin` (Text-to-Speech drama China).

4. **Canvas & Brat Generator (`plugins/maker/`)**:
   - **Brat Engine**: `.brat`, `.bratblack`, `.bratpink`, `.bratgreen`, `.bratv2` (multi-baris), `.bratvid` / `.bratv` (animasi video), `.bratvidblack`, `.bratvidpink`, `.bratvidgreen`, `.bratvidv2` (60fps per kata), `.bratgojo`, `.bratvermeil`.
   - **Mockup & Banner**: `.fakecall`, `.fakedana`, `.fakegopay`, `.fakeovo`, `.fakektp` (16 parameter), `.fakeml`, `.fakeff`, `.fakeffduo`, `.fakeffgirl`, `.animequote`, `.igqc`, `.iqc`, `.quotenokia`, `.sertifikattolol`.

5. **AI Image Transformation (`plugins/ai-image/`)**:
   - 31 gaya AI terintegrasi Kyzz API: `.tobotak`, `.tochibi`, `.tofigura`, `.tofigurav2`, `.tofigurav3`, `.tofunk`, `.toghibli`, `.tohijab`, `.tohitam`, `.tojapanese`, `.tojepang`, `.tokacamata`, `.tokamboja`, `.tolego`, `.toliquor`, `.tomaid`, `.tomirror`, `.tomoai`, `.tomonyet`, `.topacar`, `.topeci`, `.topiramida`, `.toputih`, `.toreal`, `.toroblox`, `.toroh`, `.totato`, `.totua`, `.tounderground`, `.toviking`, `.tozombie`.

6. **Asupan, NSFW & Cewe Random (`plugins/asupan/`, `plugins/nsfw/`, `plugins/cewerandom/`)**:
   - 10 video asupan TikTok (`.andin`, `.bocil`, `.gheayubi`, `.kayes`, `.notnot`, `.panrika`, `.santuy`, `.tiktokgirl`, `.tobrut`, `.ukhty`).
   - 31 kategori media anime NSFW (`.ahegao`, `.ass`, `.bdsm`, `.blowjob`, `.cum`, `.doujin`, `.hentai`, `.neko`, `.rule34`, `.xnxx`, `.yuri`, dsb).
   - 15 foto cecan estetik (`.china`, `.hijaber`, `.indonesia`, `.jepang`, `.korea`, `.malaysia`, `.thailand`, `.vietnam`, dsb).

7. **Sistem Manajemen Grup & Otomasi Canvas (`plugins/group/`)**:
   - Generator Canvas Welcome & Goodbye dinamis via Kyzz API dengan cache pre-kompresi Sharp.
   - Kustomisasi teks per grup (`.setwelcome`, `.setgoodbye`) mendukung placeholder `@user`, `@grup`, dan `@bio`.
   - Administrasi grup lengkap: `.kick`, `.add`, `.promote`, `.demote`, `.hidetag`, `.tagall`, `.open`, `.close`, `.linkgc`, `.revokelink`, `.swgc`.

8. **Owner Tools & Backup Engine (`plugins/owner/`)**:
   - `.backup` : Mengompresi seluruh codebase (mengecualikan `node_modules`, `session`, `tmp`, `.git`) menjadi berkas ZIP dan mengirimkannya langsung ke chat pribadi owner.
   - Evaluasi runtime tanpa prefix: `>` (async eval), `=>` (eval return), `$` (terminal exec).
   - Dynamic plugin switcher: `.pluginon`, `.pluginoff`, `.toggleplugin`.
   - Mode switcher: `.self` dan `.public`.

---

## 3. Technology Stack

| Komponen | Teknologi | Keterangan |
| :--- | :--- | :--- |
| **Runtime Environment** | Node.js (>= 18.0.0, ESM) | Native ES Module (`"type": "module"`) |
| **WhatsApp Protocol Engine** | `ruby-baileys@1.5.17` | Multi-Device WebSocket Client |
| **Image & Canvas Processing** | `sharp@^0.35.5` | Pipeline kompresi JPEG/PNG & SVG Vector Renderer |
| **Media Stream Processor** | `fluent-ffmpeg@^2.1.3` | Konversi audio effect, filter, dan video bitrate |
| **Network & HTTP Client** | `axios@^1.20.0` | API resolver dengan timeout guard & stream buffers |
| **Archive Compressor** | `jszip@^3.10.2` | Engine kompresi ZIP otomatis untuk sistem backup |
| **Structured Logger** | `pino@^9.6.0` | Silent internal logger terintegrasi custom cute console |
| **Web Scraper** | `cheerio@^1.2.0` | Parser markup DOM untuk ekstraksi metadata media |

---

## 4. Architecture & Workflow

<!-- ARCHITECTURE FLOWCHART SVG -->
<div align="center">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 920 300" width="100%" height="auto" style="max-width: 920px; display: block; margin: auto;">
  <defs>
    <linearGradient id="flowBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090812"/>
      <stop offset="100%" stop-color="#040307"/>
    </linearGradient>

    <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#241242"/>
      <stop offset="100%" stop-color="#120924"/>
    </linearGradient>

    <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#a855f7"/>
      <stop offset="100%" stop-color="#38bdf8"/>
    </linearGradient>

    <filter id="nodeGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <style>
    .node-title { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 700; font-size: 13px; fill: #ffffff; }
    .node-desc { font-family: 'SFMono-Regular', Consolas, monospace; font-size: 10px; fill: #c084fc; }
  </style>

  <!-- Canvas -->
  <rect width="920" height="300" rx="16" fill="url(#flowBg)" stroke="#4c1d95" stroke-width="1.2"/>

  <!-- Flow Connector Lines -->
  <path d="M 170 150 L 220 150" stroke="url(#arrowGrad)" stroke-width="2" stroke-dasharray="4,4"/>
  <polygon points="220,150 212,145 212,155" fill="#38bdf8"/>

  <path d="M 370 150 L 420 150" stroke="url(#arrowGrad)" stroke-width="2" stroke-dasharray="4,4"/>
  <polygon points="420,150 412,145 412,155" fill="#38bdf8"/>

  <path d="M 570 150 L 620 150" stroke="url(#arrowGrad)" stroke-width="2" stroke-dasharray="4,4"/>
  <polygon points="620,150 612,145 612,155" fill="#38bdf8"/>

  <path d="M 770 150 L 810 150" stroke="url(#arrowGrad)" stroke-width="2"/>
  <polygon points="810,150 802,145 802,155" fill="#38bdf8"/>

  <!-- Node 1: WhatsApp Ingress -->
  <g transform="translate(30, 95)">
    <rect width="140" height="110" rx="12" fill="url(#nodeGrad)" stroke="#a855f7" stroke-width="1.5" filter="url(#nodeGlow)"/>
    <circle cx="70" cy="30" r="14" fill="#7e22ce" stroke="#e879f9" stroke-width="1"/>
    <text x="70" y="34" text-anchor="middle" fill="#ffffff" font-size="12">📡</text>
    <text x="70" y="65" text-anchor="middle" class="node-title">1. INGRESS</text>
    <text x="70" y="82" text-anchor="middle" class="node-desc">ruby-baileys</text>
    <text x="70" y="95" text-anchor="middle" class="node-desc">WebSocket WA</text>
  </g>

  <!-- Node 2: Serializer & LID -->
  <g transform="translate(230, 95)">
    <rect width="140" height="110" rx="12" fill="url(#nodeGrad)" stroke="#6366f1" stroke-width="1.5" filter="url(#nodeGlow)"/>
    <circle cx="70" cy="30" r="14" fill="#4338ca" stroke="#818cf8" stroke-width="1"/>
    <text x="70" y="34" text-anchor="middle" fill="#ffffff" font-size="12">⚙️</text>
    <text x="70" y="65" text-anchor="middle" class="node-title">2. SERIALIZER</text>
    <text x="70" y="82" text-anchor="middle" class="node-desc">LID Resolution</text>
    <text x="70" y="95" text-anchor="middle" class="node-desc">Auth & Perm Guard</text>
  </g>

  <!-- Node 3: Plugin Dispatcher -->
  <g transform="translate(430, 95)">
    <rect width="140" height="110" rx="12" fill="url(#nodeGrad)" stroke="#c084fc" stroke-width="1.5" filter="url(#nodeGlow)"/>
    <circle cx="70" cy="30" r="14" fill="#9333ea" stroke="#f0abfc" stroke-width="1"/>
    <text x="70" y="34" text-anchor="middle" fill="#ffffff" font-size="12">🧩</text>
    <text x="70" y="65" text-anchor="middle" class="node-title">3. REGISTRY</text>
    <text x="70" y="82" text-anchor="middle" class="node-desc">Hot Reload Engine</text>
    <text x="70" y="95" text-anchor="middle" class="node-desc">250+ ESM Plugins</text>
  </g>

  <!-- Node 4: Execution Hub -->
  <g transform="translate(630, 95)">
    <rect width="140" height="110" rx="12" fill="url(#nodeGrad)" stroke="#ec4899" stroke-width="1.5" filter="url(#nodeGlow)"/>
    <circle cx="70" cy="30" r="14" fill="#be185d" stroke="#f472b6" stroke-width="1"/>
    <text x="70" y="34" text-anchor="middle" fill="#ffffff" font-size="12">⚡</text>
    <text x="70" y="65" text-anchor="middle" class="node-title">4. PIPELINE</text>
    <text x="70" y="82" text-anchor="middle" class="node-desc">Kyzz API / Sharp</text>
    <text x="70" y="95" text-anchor="middle" class="node-desc">FFmpeg Audio</text>
  </g>

  <!-- Node 5: Output Delivery -->
  <g transform="translate(815, 115)">
    <circle cx="35" cy="35" r="32" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="2" filter="url(#nodeGlow)"/>
    <text x="35" y="33" text-anchor="middle" fill="#ffffff" font-size="14">💬</text>
    <text x="35" y="48" text-anchor="middle" fill="#34d399" class="node-desc" font-weight="700">SEND</text>
  </g>
</svg>
</div>

---

## 5. System Requirements

- **Operating System**: Linux (Ubuntu 20.04+, Debian 11+, Alpine) / macOS / Windows WSL2.
- **Node.js**: Versi `>= 18.0.0` (Direkomendasikan Node.js v20.x atau v22.x LTS).
- **Package Manager**: `npm` (bawaan Node.js) atau `pnpm`.
- **System Utilities**: `ffmpeg` (diperlukan untuk fitur pemrosesan audio & convert sticker gif).

---

## 6. Installation Guide

### 1. Clone Repository

```bash
git clone https://github.com/KyuuX444/Rubby-Multi-Device.git
cd Rubby-Multi-Device
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Konfigurasi Bot

Buka berkas `setting.js` dan sesuaikan variabel konfigurasi sesuai kebutuhan:

```javascript
// setting.js
global.botName = 'Rubby Multi Device'
global.owner = ['628xxxxxxxxxx']           // Nomor WhatsApp Owner (tanpa tanda + atau spasi)
global.mode = 'public'                      // Mode operasional: 'public' atau 'self'
global.noBot = '628xxxxxxxxxx'              // Nomor bot untuk pairing code
global.customPairingCode = 'RUBBYMD1'       // Custom 8-karakter pairing code (opsional)
global.botVersion = '1.0.0'
global.botCreator = 'Kyuu'
global.packname = 'Rubby Multi Device'
global.author = 'Kyuu'
global.thumb = 'media/thumb.jpg'
global.website = 'https://api.kyzzz.xyz'

global.APIs = {
  kyzz: 'https://api.kyzzz.xyz'
}

global.APIKeys = {
  'https://api.kyzzz.xyz': 'YOUR_APIKEY_HERE'
}

global.API = (name, path = '/', query = {}, apikeyqueryname) => {
  const baseUrl = name in global.APIs ? global.APIs[name] : name
  const q = { ...query }
  if (apikeyqueryname) {
    const key = global.APIKeys[baseUrl] || global.APIKeys[name]
    if (key) q[apikeyqueryname] = key
  }
  const search = new URLSearchParams(q).toString()
  return baseUrl + path + (search ? '?' + search : '')
}
```

---

## 7. Authentication & Pairing Code

Rubby Multi Device mendukung koneksi tanpa scan QR menggunakan **Pairing Code 8 Karakter**:

1. Pastikan nomor WhatsApp pada `global.noBot` di `setting.js` telah terisi.
2. Jalankan bot via terminal (`npm start`).
3. Bot akan menampilkan banner Pairing Code di terminal console:
   ```text
   ╭─── ୨୧ RUBBY MULTI DEVICE ୨୧ ───╮
   │ ૮₍˶ᵔ ᵕ ᵔ˶₎ა whatsapp pairing!
   ╰────────────────────────────────╯
   
   ୨ৎ  PAIRING CODE
   │
   ├─ ♡ Number       : 628xxxxxxxxxx
   ├─ ♡ Pairing Code : RUBB-YMD1
   ├─ ♡ Status       : waiting for confirmation
   └─ ♡ Instruction  : Link with phone number in WhatsApp
   ```
4. Buka **WhatsApp** di smartphone > **Perangkat Tertaut (Linked Devices)** > **Tautkan dengan nomor telepon**.
5. Masukkan 8 digit kode yang tertera di terminal.
6. Kredensial sesi otomatis tersimpan di folder `session/`.

---

## 8. Running the Application

### Mode Development / Console Biasa:

```bash
npm start
```

### Mode Production dengan Process Manager (PM2):

```bash
# Menjalankan bot di background
pm2 start main.js --name "rubby-md"

# Memeriksa status & log realtime
pm2 status
pm2 logs rubby-md
```

---

## 9. Actual Project Directory Structure

```text
Rubby-Multi-Device/
├── main.js                     # Core Application & WebSocket Orchestrator
├── handler.js                  # Central Message Dispatcher & Middleware Guard
├── setting.js                  # Global Bot Settings & API Resolver
├── package.json                # Project Manifest & ESM Configuration
├── README.md                   # Documentation Center
├── media/
│   └── thumb.jpg               # Default Global Thumbnail Asset
├── tmp/                        # Temporary Processing Buffers (Auto Cleaned)
├── database/
│   ├── disabled_plugins.json   # Disabled Plugins State Storage
│   ├── groups.json             # Group Welcome/Goodbye & Customization Config
│   └── premium.json            # Premium User Registry
├── lib/
│   ├── exif.js                 # Pure WebP EXIF & VP8X Metadata Muxer
│   ├── logger.js               # Cute Box Console Telemetry & Color Logger
│   ├── message.js              # Custom Baileys Socket Helpers Binding
│   ├── plugins.js              # Dynamic Plugin Registry & Hot Watcher
│   ├── serializer.js           # Message Deserializer, LID Mapping & Parser
│   └── utils.js                # Normalization, Permission & String Helpers
├── scrape/
│   └── ephoto.js               # Ephoto Scraping Utility
└── plugins/                    # 250+ Modular Plugins
    ├── -/                      # Special Non-Prefixed Direct Catchers
    ├── ai-image/               # 31 Neural AI Image Styles
    ├── asupan/                 # 10 TikTok Girl Random Video Handlers
    ├── audio/                  # 21 Modular Audio Effects + 3 Audio Tools
    ├── cewerandom/             # 15 Aesthetic Girl Photo Fetchers
    ├── convert/                # Media Format Converters (Sticker, Image, Video, VN)
    ├── downloader/             # Multi-Platform Downloaders (TikTok, IG, FB, YT, etc.)
    ├── ephoto/                 # 15 Ephoto Text Effect Generators
    ├── group/                  # 15 Group Administration & Automation Handlers
    ├── islamic/                # 8 Islamic Features (Surah, Prayer Schedule, Asmaul Husna)
    ├── main/                   # Core Commands (Menu, Ping HUD, Runtime, Total Fitur)
    ├── maker/                  # 31 Canvas & Brat Generator Presets
    ├── nsfw/                   # 31 NSFW Anime & Hentai Handlers
    ├── owner/                  # 20 Owner Administration Tools & Backup Engine
    ├── search/                 # 13 Online Multimedia Search Handlers
    ├── stalker/                # 12 Social Media & Profile Stalkers
    └── tools/                  # 6 Utility Tools (Tourl, RVO, SVO, CekID, Get)
```

---

## 10. Plugin Development Guide

Setiap berkas plugin di dalam direktori `plugins/` diekspor sebagai ES Module murni. Contoh struktur template standar:

```javascript
// plugins/example/hello.js

const handler = async (m, { conn, sock, args, text, usedPrefix, command, reply }) => {
  const client = conn || sock
  
  await reply(`Halo @${m.sender.split('@')[0]}! Terima kasih telah menggunakan Rubby Multi Device.`, {
    mentions: [m.sender]
  })
}

handler.help = ['hello']              // Teks yang tampil pada menu bantuan
handler.tags = ['main']               // Kategori menu
handler.command = ['hello', 'hi']     // Trigger perintah (bisa string / array)

// Flags Perizinan (Opsional):
handler.owner = false                 // Hanya dapat diakses Owner
handler.premium = false               // Hanya dapat diakses Pengguna Premium
handler.group = false                 // Hanya dapat diakses di dalam Grup
handler.private = false               // Hanya dapat diakses di Chat Pribadi
handler.admin = false                 // Memerlukan pengirim berstatus Admin Grup
handler.botadmin = false              // Memerlukan bot berstatus Admin Grup
handler.limit = true                  // Memerlukan konsumsi limit

export default handler
```

---

## 11. Troubleshooting Guide

| Kendala / Error | Kemungkinan Penyebab | Solusi |
| :--- | :--- | :--- |
| **QR / Pairing Code tidak muncul** | Format nomor pada `global.noBot` salah | Pastikan nomor berformat internasional tanpa simbol (contoh: `6283150850721`). |
| **`ERR_REQUIRE_ESM`** | Menggunakan sintaks `require()` pada environment ESM | Gunakan `import ... from '...'` atau dynamic import `await import(...)`. |
| **Session Disconnected (401 / Logged Out)** | Sesi telah dikeluarkan dari perangkat WhatsApp | Hapus isi folder `session/` lalu tautkan kembali via pairing code baru. |
| **Gagal Render Audio Effects** | Binary FFmpeg belum terpasang di server | Jalankan `sudo apt install ffmpeg` pada sistem Linux/Ubuntu. |
| **`EACCES` atau Permission Error pada `tmp/`** | Hak akses folder terbatasi | Jalankan `chmod -R 755 tmp/ database/ session/`. |

---

## 12. Security & Best Practices

1. **Proteksi Folder Session**: Folder `session/` berisi kredensial enkripsi privat WhatsApp Anda (`creds.json`). **Jangan pernah** membagikan, mengunggah ke GitHub publik, atau mengirimkan folder ini ke pihak lain.
2. **Kerahasiaan API Key**: Simpan API Key pihak ketiga pada `setting.js` secara privat dan hindari mempublikasikan repository berisi kredensial produksi.
3. **Penyaringan Pesan Sensitif**: Rubby MD secara default mengabaikan siaran broadcast dan newsletter untuk menjaga stabilitas memori server.
4. **Bypass Eval Execution**: Fitur evaluasi kode (`>`, `=>`, `$`) dibatasi secara ketat hanya dapat dieksekusi oleh nomor yang terdaftar di `global.owner`.

---

## 13. About the Developer

<p align="left">
  <strong>Kyuu</strong> — <em>Creator & Lead Developer of Rubby Multi Device</em><br/>
  Fokus pada pengembangan otomasi WhatsApp modern, arsitektur microservices, dan ekosistem API modular.
</p>

### Official Developer Channels:
- **GitHub**: [github.com/KyuuX444](https://github.com/KyuuX444)
- **Official API Portal**: [api.kyzzz.xyz](https://api.kyzzz.xyz)
- **YouTube Channel**: [MommyKyuu](https://youtube.com/@MommyKyuu)
- **WhatsApp Announcement Channel**: [Rubby Official Updates](https://whatsapp.com/channel/0029VbDXYlKDJ6H1D7Dm0f13)

---

## 14. License & Attribution

Proyek ini dirilis dan dikembangkan di bawah lisensi **ISC**.

```text
Copyright (c) 2026 Kyuu

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.
```

### Acknowledgements & Credits:
- **Allah SWT.** — The Creator of Everything.
- **Ruby-Baileys** — Modern WhatsApp Multi-Device Protocol Library.
- **Sharp & Libvips** — High-Performance Image & Vector Processing.
- **Kyzz API** — Unified Multimedia & AI Processing Endpoints.
- Seluruh kontributor, pengguna, dan komunitas pengembang WhatsApp bot.

---

<div align="center">
  <sub>Made with 💜 by <b>Kyuu</b> • Rubby Multi Device • 2026</sub>
</div>
