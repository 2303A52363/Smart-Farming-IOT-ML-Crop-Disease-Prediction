import { useState, useEffect } from "react";

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap');

:root {
  --bg: #030d08; --surface: #071410; --card: #0b1d16; --card2: #0f2419;
  --border: #143d28; --border2: #1f5538;
  --green: #00e87a; --green2: #00b85e; --green3: #007d40;
  --teal: #00d4aa; --sky: #00b4d8; --gold: #f4c842; --orange: #ff7c38;
  --red: #ff4455; --purple: #a78bfa;
  --text: #d4edd8; --muted: #6b9a7a; --dim: #3a6a4a;
  --glow: rgba(0,232,122,0.12);
}
* { margin:0; padding:0; box-sizing:border-box; }
body { background:var(--bg); color:var(--text); font-family:'Outfit',sans-serif; }

.root { min-height:100vh; position:relative; overflow-x:hidden; }
.bg { position:fixed; inset:0; pointer-events:none; z-index:0;
  background:
    radial-gradient(ellipse 80% 60% at 10% -10%, rgba(0,232,122,.05) 0%, transparent 60%),
    radial-gradient(ellipse 60% 80% at 90% 110%, rgba(0,212,170,.04) 0%, transparent 50%),
    repeating-linear-gradient(0deg,transparent,transparent 59px,rgba(20,61,40,.06) 59px,rgba(20,61,40,.06) 60px),
    repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(20,61,40,.04) 59px,rgba(20,61,40,.04) 60px);
}

.wrap { position:relative; z-index:1; max-width:1440px; margin:0 auto; padding:28px 24px; }

/* HEADER */
.hdr { margin-bottom:28px; display:grid; grid-template-columns:1fr auto; gap:20px; align-items:start; }
.hdr-eyebrow { display:flex; align-items:center; gap:10px; margin-bottom:8px; }
.eyebrow-dot { width:8px; height:8px; border-radius:50%; background:var(--green); box-shadow:0 0 12px var(--green); animation:pulse 2s ease-in-out infinite; }
@keyframes pulse { 0%,100%{opacity:1;transform:scale(1);}50%{opacity:.4;transform:scale(.8);} }
.eyebrow-text { font-family:'JetBrains Mono',monospace; font-size:10px; color:var(--green); letter-spacing:3px; text-transform:uppercase; }
.hdr-title { font-size:clamp(26px,3.5vw,44px); font-weight:800; line-height:1.1; letter-spacing:-1px; color:#fff; margin-bottom:10px; }
.hdr-title span { color:var(--green); }
.hdr-sub { font-size:13px; color:var(--muted); line-height:1.7; max-width:600px; }
.hdr-pills { display:flex; flex-wrap:wrap; gap:8px; margin-top:12px; }
.pill { padding:4px 12px; font-family:'JetBrains Mono',monospace; font-size:9px; letter-spacing:2px;
  text-transform:uppercase; border-radius:2px; }
.pill.g { background:rgba(0,232,122,.08); border:1px solid rgba(0,232,122,.25); color:var(--green); }
.pill.t { background:rgba(0,212,170,.08); border:1px solid rgba(0,212,170,.25); color:var(--teal); }
.pill.b { background:rgba(0,180,216,.08); border:1px solid rgba(0,180,216,.25); color:var(--sky); }
.pill.p { background:rgba(167,139,250,.08); border:1px solid rgba(167,139,250,.25); color:var(--purple); }
.hdr-stats { display:flex; flex-direction:column; gap:10px; }
.hdr-stat { text-align:right; }
.hdr-stat-num { font-weight:800; font-size:36px; color:var(--green); line-height:1; letter-spacing:-1px; }
.hdr-stat-lbl { font-family:'JetBrains Mono',monospace; font-size:9px; color:var(--muted); letter-spacing:2px; text-transform:uppercase; }

/* KPIS */
.kpis { display:grid; grid-template-columns:repeat(7,1fr); gap:1px; background:var(--border);
  border:1px solid var(--border); margin-bottom:20px; }
.kpi { background:var(--card); padding:16px 14px; position:relative; overflow:hidden; transition:background .2s; cursor:default; }
.kpi:hover { background:var(--card2); }
.kpi::after { content:''; position:absolute; bottom:0; left:0; right:0; height:2px; background:var(--accent,var(--green)); opacity:.5; }
.kpi-lbl { font-family:'JetBrains Mono',monospace; font-size:8px; color:var(--muted); letter-spacing:2px; text-transform:uppercase; margin-bottom:6px; }
.kpi-val { font-weight:800; font-size:24px; color:#fff; line-height:1; letter-spacing:-0.5px; }
.kpi-unit { font-size:11px; color:var(--muted); font-weight:400; }
.kpi-delta { font-family:'JetBrains Mono',monospace; font-size:9px; margin-top:4px; }
.kpi-delta.up { color:var(--green); } .kpi-delta.dn { color:var(--orange); }

/* LAYOUT GRIDS */
.row { display:grid; gap:16px; margin-bottom:16px; }
.r3 { grid-template-columns:1fr 1fr 1fr; }
.r2 { grid-template-columns:1.6fr 1fr; }
.r2b { grid-template-columns:1fr 1.6fr; }
.r22 { grid-template-columns:1fr 1fr; }
.r13 { grid-template-columns:1fr 3fr; }
@media(max-width:1000px){.r3,.r2,.r2b,.r22,.r13{grid-template-columns:1fr;}.kpis{grid-template-columns:repeat(3,1fr);}}

/* CARD */
.card { background:var(--card); border:1px solid var(--border); padding:20px; position:relative; overflow:hidden; }
.card::before { content:''; position:absolute; top:0; left:0; right:0; height:1px;
  background:linear-gradient(90deg,transparent,var(--green3),transparent); }
.card-title { font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:3px; color:var(--muted);
  text-transform:uppercase; margin-bottom:16px; display:flex; align-items:center; gap:10px; }
.card-title::after { content:''; flex:1; height:1px; background:linear-gradient(90deg,var(--border),transparent); }
.card-title .ct-icon { color:var(--green); }

/* ML MODELS */
.model-list { display:flex; flex-direction:column; gap:8px; }
.model-row { display:grid; grid-template-columns:140px 1fr 64px 52px; gap:12px; align-items:center; padding:10px 12px; border:1px solid var(--border); background:var(--surface); transition:border-color .2s, background .2s; cursor:pointer; }
.model-row:hover, .model-row.active { border-color:var(--green2); background:rgba(0,232,122,.04); }
.model-name { font-size:12px; font-weight:600; color:var(--text); }
.model-type { font-family:'JetBrains Mono',monospace; font-size:8px; color:var(--muted); letter-spacing:1px; text-transform:uppercase; margin-top:2px; }
.acc-track { height:6px; background:rgba(20,61,40,.6); position:relative; }
.acc-fill { height:100%; transition:width 1.2s cubic-bezier(.16,1,.3,1); }
.acc-pct { font-family:'JetBrains Mono',monospace; font-size:12px; font-weight:700; }
.model-badge { font-family:'JetBrains Mono',monospace; font-size:8px; letter-spacing:1px;
  padding:2px 6px; text-transform:uppercase; text-align:center; }

/* DISEASE CARDS */
.disease-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.disease-card { padding:12px; border:1px solid var(--border); background:var(--surface); cursor:pointer; transition:all .2s; }
.disease-card:hover { border-color:var(--border2); background:var(--card); }
.disease-card.active { border-color:var(--green2); background:rgba(0,232,122,.04); }
.disease-card.active::before { content:''; display:block; width:100%; height:2px; background:var(--green); margin-bottom:8px; }
.dis-crop { font-family:'JetBrains Mono',monospace; font-size:8px; color:var(--muted); letter-spacing:2px; text-transform:uppercase; margin-bottom:4px; }
.dis-name { font-size:12px; font-weight:700; color:var(--text); margin-bottom:6px; }
.dis-risk { display:flex; align-items:center; gap:8px; }
.risk-bar { flex:1; height:4px; background:rgba(20,61,40,.6); }
.risk-fill { height:100%; transition:width 1s ease; }
.risk-fill.high { background:var(--red); }
.risk-fill.med { background:var(--orange); }
.risk-fill.low { background:var(--green); }
.risk-lbl { font-family:'JetBrains Mono',monospace; font-size:9px; font-weight:700; }
.risk-lbl.high { color:var(--red); } .risk-lbl.med { color:var(--orange); } .risk-lbl.low { color:var(--green); }

/* IOT NODES */
.iot-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.iot-node { padding:12px 14px; border:1px solid var(--border); background:var(--surface); display:flex; flex-direction:column; gap:6px; transition:all .2s; }
.iot-node:hover { border-color:var(--teal); }
.iot-node-hdr { display:flex; align-items:center; justify-content:space-between; }
.iot-icon { font-size:16px; }
.iot-status { width:7px; height:7px; border-radius:50%; }
.iot-status.on { background:var(--green); box-shadow:0 0 8px var(--green); animation:pulse 2s ease-in-out infinite; }
.iot-status.warn { background:var(--orange); box-shadow:0 0 8px var(--orange); }
.iot-name { font-size:11px; font-weight:600; color:var(--text); }
.iot-val { font-family:'JetBrains Mono',monospace; font-size:18px; font-weight:700; color:var(--teal); line-height:1; }
.iot-unit { font-size:10px; color:var(--muted); }
.iot-sparkline { height:24px; display:flex; align-items:flex-end; gap:2px; }
.iot-bar { flex:1; background:var(--green3); transition:height .8s ease; border-radius:1px 1px 0 0; }
.iot-bar:last-child { background:var(--green); }

/* PIPELINE */
.pipeline { display:flex; align-items:center; gap:0; overflow-x:auto; padding-bottom:4px; }
.pipe-step { display:flex; flex-direction:column; align-items:center; gap:8px; min-width:90px; flex:1; }
.pipe-icon-wrap { width:44px; height:44px; border:1px solid var(--border2); background:var(--surface);
  display:flex; align-items:center; justify-content:center; font-size:18px; position:relative; z-index:1; }
.pipe-icon-wrap.active { border-color:var(--green); background:rgba(0,232,122,.08); box-shadow:0 0 20px rgba(0,232,122,.15); }
.pipe-label { font-family:'JetBrains Mono',monospace; font-size:8px; color:var(--muted); letter-spacing:1px; text-align:center; text-transform:uppercase; }
.pipe-arrow { flex:1; height:1px; background:linear-gradient(90deg,var(--green3),var(--dim)); min-width:20px; position:relative; top:-16px; }
.pipe-arrow::after { content:'▶'; position:absolute; right:-5px; top:-5px; font-size:8px; color:var(--dim); }

/* ACCURACY COMPARISON */
.acc-compare { display:flex; flex-direction:column; gap:8px; }
.acc-row { display:grid; grid-template-columns:130px 1fr 55px; gap:10px; align-items:center; }
.acc-lbl { font-size:11px; color:var(--text); font-weight:500; }
.acc-track2 { height:10px; background:rgba(20,61,40,.6); position:relative; border-radius:2px; overflow:hidden; }
.acc-fill2 { height:100%; border-radius:2px; transition:width 1.2s cubic-bezier(.16,1,.3,1); }
.acc-num { font-family:'JetBrains Mono',monospace; font-size:11px; font-weight:700; text-align:right; }

/* CONFUSION / METRICS */
.metrics-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.metric-box { padding:12px; border:1px solid var(--border); background:var(--surface); text-align:center; }
.metric-val { font-weight:800; font-size:28px; color:var(--green); line-height:1; letter-spacing:-1px; }
.metric-lbl { font-family:'JetBrains Mono',monospace; font-size:8px; color:var(--muted); letter-spacing:2px; text-transform:uppercase; margin-top:4px; }

/* TABS */
.tabs { display:flex; gap:0; margin-bottom:14px; border-bottom:1px solid var(--border); }
.tab { padding:8px 14px; font-family:'JetBrains Mono',monospace; font-size:9px; letter-spacing:2px;
  text-transform:uppercase; color:var(--muted); background:transparent; border:none; cursor:pointer;
  border-bottom:2px solid transparent; margin-bottom:-1px; transition:all .2s; }
.tab.on { color:var(--green); border-bottom-color:var(--green); }
.tab:hover:not(.on) { color:var(--text); }

/* CHALLENGES */
.challenge-list { display:flex; flex-direction:column; gap:6px; }
.challenge-item { display:grid; grid-template-columns:28px 1fr auto; gap:10px; align-items:start;
  padding:10px 12px; border:1px solid var(--border); background:var(--surface); }
.ch-num { font-family:'JetBrains Mono',monospace; font-size:18px; font-weight:700; color:var(--border2); line-height:1; }
.ch-title { font-size:12px; font-weight:600; color:var(--text); margin-bottom:3px; }
.ch-desc { font-size:10px; color:var(--muted); line-height:1.6; }
.ch-tag { padding:2px 8px; font-family:'JetBrains Mono',monospace; font-size:8px; letter-spacing:1.5px; text-transform:uppercase; border:1px solid; align-self:start; white-space:nowrap; }
.ch-tag.high { border-color:rgba(255,68,85,.4); color:var(--red); }
.ch-tag.med { border-color:rgba(255,124,56,.4); color:var(--orange); }
.ch-tag.low { border-color:rgba(0,232,122,.3); color:var(--green); }

/* ARCH DIAGRAM */
.arch { display:flex; flex-direction:column; gap:4px; }
.arch-layer { display:flex; gap:6px; align-items:stretch; }
.arch-lbl { font-family:'JetBrains Mono',monospace; font-size:8px; color:var(--muted); letter-spacing:2px; text-transform:uppercase; writing-mode:vertical-rl; transform:rotate(180deg); padding:4px 0; border-right:1px solid var(--border); margin-right:6px; flex-shrink:0; width:20px; text-align:center; }
.arch-blocks { display:flex; gap:6px; flex:1; flex-wrap:wrap; }
.arch-block { flex:1; min-width:80px; padding:10px 8px; border:1px solid; background:transparent;
  text-align:center; font-size:10px; font-weight:600; transition:all .2s; cursor:default; }
.arch-block:hover { transform:translateY(-2px); }
.arch-block.sensor { border-color:rgba(0,180,216,.4); color:var(--sky); background:rgba(0,180,216,.05); }
.arch-block.edge   { border-color:rgba(0,212,170,.4); color:var(--teal); background:rgba(0,212,170,.05); }
.arch-block.cloud  { border-color:rgba(167,139,250,.4); color:var(--purple); background:rgba(167,139,250,.05); }
.arch-block.app    { border-color:rgba(0,232,122,.4); color:var(--green); background:rgba(0,232,122,.05); }
.arch-block .ab-sub{ font-family:'JetBrains Mono',monospace; font-size:7px; color:var(--muted); margin-top:3px; letter-spacing:1px; display:block; }
.arch-arrow { display:flex; align-items:center; justify-content:center; color:var(--dim); font-size:10px; padding:2px 0; }

/* FOOTER */
.footer { border-top:1px solid var(--border); padding-top:16px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-top:4px; padding-bottom:8px; }
.footer-txt { font-family:'JetBrains Mono',monospace; font-size:8px; color:var(--dim); letter-spacing:2px; text-transform:uppercase; }

/* scrollbar */
::-webkit-scrollbar { width:4px; height:4px; } ::-webkit-scrollbar-thumb { background:var(--border2); }
`;

// ─── DATA ──────────────────────────────────────────────────────────────────

const KPIS = [
  { lbl:"CNN Accuracy",   val:"99",   unit:"%",  delta:"▲ vs 94% RF", up:true,  accent:"#00e87a" },
  { lbl:"Disease Precision",val:"99.5",unit:"%",  delta:"MKGPCNN model", up:true, accent:"#00d4aa" },
  { lbl:"Recall",         val:"99.6", unit:"%",  delta:"CGSAAN model",  up:true, accent:"#00b4d8" },
  { lbl:"IoT Sensors",    val:"6+",   unit:"types",delta:"Per node",    up:true, accent:"#a78bfa" },
  { lbl:"Water Saved",    val:"60",   unit:"%",  delta:"AI irrigation", up:true, accent:"#f4c842" },
  { lbl:"Farmer Labor",   val:"↓40",  unit:"%",  delta:"Automation",   up:true,  accent:"#00e87a" },
  { lbl:"Early Detection",val:"72",   unit:"h",  delta:"Before outbreak",up:true,accent:"#ff7c38" },
];

const ML_MODELS = [
  { name:"CNN / Deep CNN",     type:"Deep Learning",  acc:99,  prec:99.5, color:"#00e87a", badge:"SOTA",  badgeColor:"rgba(0,232,122,.15)", badgeText:"#00e87a", task:"Disease Classification" },
  { name:"MKGPCNN",            type:"Kronecker Guided",acc:99, prec:99.0, color:"#00d4aa", badge:"Crop Rec",badgeColor:"rgba(0,212,170,.15)", badgeText:"#00d4aa", task:"Crop Recommendation" },
  { name:"CGSAAN",             type:"Graph Attention", acc:98, prec:99.0, color:"#00b4d8", badge:"Disease",badgeColor:"rgba(0,180,216,.15)", badgeText:"#00b4d8", task:"Disease + Fertilizer" },
  { name:"Random Forest",      type:"Ensemble",        acc:94, prec:94.2, color:"#a78bfa", badge:"Classic",badgeColor:"rgba(167,139,250,.15)", badgeText:"#a78bfa", task:"General Classification" },
  { name:"SVM",                type:"Kernel Method",   acc:91, prec:91.8, color:"#f4c842", badge:"Fast",   badgeColor:"rgba(244,200,66,.15)", badgeText:"#f4c842", task:"Binary Disease Detect." },
  { name:"YOLOv5 (UAV)",       type:"Object Detection",acc:96, prec:96.0, color:"#ff7c38", badge:"UAV",   badgeColor:"rgba(255,124,56,.15)", badgeText:"#ff7c38", task:"Field Aerial Survey" },
  { name:"Transfer Learning",  type:"Fine-tuning",     acc:95, prec:95.3, color:"#ff4455", badge:"Low Data",badgeColor:"rgba(255,68,85,.15)", badgeText:"#ff4455", task:"Cross-crop Adaptation" },
];

const DISEASES = [
  { crop:"Wheat",  name:"Leaf Rust",         risk:88, level:"high" },
  { crop:"Rice",   name:"Blast Disease",      risk:82, level:"high" },
  { crop:"Maize",  name:"Northern Blight",    risk:65, level:"med"  },
  { crop:"Cotton", name:"Bacterial Blight",   risk:71, level:"med"  },
  { crop:"Tomato", name:"Early Blight",       risk:55, level:"med"  },
  { crop:"Potato", name:"Late Blight",        risk:44, level:"low"  },
  { crop:"Soybean","name":"Sudden Death Syn.",risk:38, level:"low"  },
  { crop:"Grape",  name:"Powdery Mildew",     risk:60, level:"med"  },
];

const IOT_NODES = [
  { icon:"💧", name:"Soil Moisture", val:"47", unit:"%", status:"warn", sparks:[40,55,48,62,47] },
  { icon:"🌡️", name:"Temperature",  val:"31", unit:"°C", status:"on",  sparks:[28,29,30,31,31] },
  { icon:"💨", name:"Humidity",      val:"68", unit:"%",  status:"on",  sparks:[60,64,70,67,68] },
  { icon:"☀️", name:"Light (PAR)",   val:"814",unit:"µmol",status:"on", sparks:[600,700,780,814,814] },
  { icon:"🌧️", name:"Rainfall",      val:"2.1",unit:"mm", status:"on",  sparks:[0,0,1.2,2.1,2.1] },
  { icon:"⚗️", name:"Soil pH",       val:"6.4",unit:"pH", status:"on",  sparks:[6.1,6.2,6.3,6.4,6.4] },
];

const PIPELINE_STEPS = [
  { icon:"📡", label:"IoT\nSensors",    active:true },
  { icon:"🔗", label:"Edge\nComputing", active:true },
  { icon:"☁️", label:"Cloud\nPlatform",  active:true },
  { icon:"🧠", label:"ML\nInference",   active:true },
  { icon:"⚠️", label:"Disease\nAlert",  active:true },
  { icon:"💊", label:"Treatment\nRec.", active:false },
  { icon:"📱", label:"Farmer\nApp",     active:false },
];

const ACC_COMPARE = [
  { name:"CNN (MKGPCNN)",   acc:99,  color:"#00e87a" },
  { name:"CGSAAN",          acc:98,  color:"#00d4aa" },
  { name:"YOLOv5 UAV",      acc:96,  color:"#00b4d8" },
  { name:"Transfer Learn.",  acc:95,  color:"#a78bfa" },
  { name:"Random Forest",   acc:94,  color:"#f4c842" },
  { name:"Tiny-LiteNet",    acc:93,  color:"#ff7c38" },
  { name:"SVM",             acc:91,  color:"#ff4455" },
  { name:"Naive Bayes",     acc:84,  color:"#6b9a7a" },
];

const METRICS = [
  { val:"99%",  lbl:"Accuracy"  },
  { val:"99.5%",lbl:"Precision" },
  { val:"99.6%",lbl:"Recall"    },
  { val:"99.5%",lbl:"F1 Score"  },
];

const CHALLENGES = [
  { title:"Data Heterogeneity",     desc:"IoT sensors from different vendors produce inconsistent data formats, requiring complex ETL pipelines and normalization.", tag:"HIGH", cls:"high" },
  { title:"Sensor Reliability",     desc:"Field sensors degrade in harsh environments. Drift, failure, and connectivity loss compromise data quality.", tag:"HIGH", cls:"high" },
  { title:"Computational Load",     desc:"Deep learning inference on edge devices is constrained by power budgets and limited CPU/GPU on embedded boards.", tag:"MED", cls:"med" },
  { title:"Connectivity in Rural Areas",desc:"Cloud-based ML requires stable internet. Most farmlands in developing regions lack reliable broadband or 4G.", tag:"HIGH", cls:"high" },
  { title:"Labeled Dataset Scarcity",desc:"High-quality annotated disease image datasets for specific crop varieties are limited. Transfer learning partially mitigates this.", tag:"MED", cls:"med" },
  { title:"Cybersecurity",          desc:"IoT nodes exposed to the internet are vulnerable to spoofing and data tampering attacks on sensor streams.", tag:"MED", cls:"med" },
  { title:"Model Interpretability", desc:"Black-box DL models hinder farmer trust. Explainable AI (XAI) frameworks are needed for adoption.", tag:"MED", cls:"med" },
  { title:"Cost of Deployment",     desc:"Full IoT+ML stacks are expensive. Tiny-LiteNet and edge-AI approaches aim to reduce hardware costs for smallholders.", tag:"LOW", cls:"low" },
];

const ARCH_LAYERS = [
  { lbl:"SENSOR",  blocks:[
    { t:"Soil Sensors",    s:"Moisture · pH · NPK", cls:"sensor" },
    { t:"Weather Station", s:"Temp · Humidity · Wind", cls:"sensor" },
    { t:"Camera / UAV",    s:"Leaf imagery · Aerial", cls:"sensor" },
    { t:"GPS Module",      s:"Geo-tagging nodes", cls:"sensor" },
  ]},
  { lbl:"EDGE",    blocks:[
    { t:"Raspberry Pi 5",  s:"Tiny-LiteNet inference", cls:"edge" },
    { t:"Arduino / MCU",   s:"Sensor aggregation", cls:"edge" },
    { t:"Fog Node",        s:"Local preprocessing", cls:"edge" },
  ]},
  { lbl:"CLOUD",   blocks:[
    { t:"IoT Platform",    s:"AWS IoT / Azure", cls:"cloud" },
    { t:"ML Pipeline",     s:"Training · Serving", cls:"cloud" },
    { t:"Time-Series DB",  s:"InfluxDB / MongoDB", cls:"cloud" },
  ]},
  { lbl:"APP",     blocks:[
    { t:"Disease Alert",   s:"Push notification", cls:"app" },
    { t:"Farmer Dashboard",s:"Web · Mobile", cls:"app" },
    { t:"Agronomist API",  s:"Treatment advice", cls:"app" },
  ]},
];

const FUTURE_TRENDS = [
  { icon:"🧠", title:"Reinforcement Learning",     desc:"Dynamic adaptation of irrigation and pesticide scheduling based on real-time reward signals from yield data." },
  { icon:"⚡", title:"Edge AI Inference",           desc:"Tiny-LiteNet and similar lightweight CNNs bring real-time disease detection offline to Raspberry Pi nodes." },
  { icon:"🔄", title:"Transfer Learning",           desc:"Pre-trained models on PlantVillage dataset fine-tuned for local crop varieties with minimal new labeled data." },
  { icon:"🔗", title:"Blockchain Data Integrity",   desc:"Immutable sensor records ensure traceability and prevent tampering across shared agricultural data networks." },
  { icon:"🚁", title:"UAV Swarm Networks",          desc:"Drone fleets running YOLOv10 for coordinated pest geo-localization across large cultivated areas autonomously." },
  { icon:"🌍", title:"Climate-Adaptive Models",     desc:"Forecasting models that incorporate IPCC climate scenarios for proactive disease risk under shifting weather patterns." },
];

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

function IotSparkline({ sparks }) {
  const max = Math.max(...sparks);
  return (
    <div className="iot-sparkline">
      {sparks.map((v,i) => (
        <div key={i} className="iot-bar" style={{height:`${(v/max)*100}%`,opacity:i===sparks.length-1?1:0.4+i*0.15}}/>
      ))}
    </div>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

export default function SmartFarmingDashboard() {
  const [activeModel, setActiveModel] = useState(0);
  const [activeDis, setActiveDis] = useState(0);
  const [modelTab, setModelTab] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = STYLES;
    document.head.appendChild(s);
    setTimeout(() => setMounted(true), 150);
    return () => document.head.removeChild(s);
  }, []);

  return (
    <div className="root">
      <div className="bg"/>
      <div className="wrap">

        {/* HEADER */}
        <div className="hdr">
          <div>
            <div className="hdr-eyebrow">
              <div className="eyebrow-dot"/>
              <div className="eyebrow-text">Smart Farming · IoT + ML · Research Overview</div>
            </div>
            <div className="hdr-title">
              Crop Disease <span>Prediction</span> &amp;<br/>Control using IoT &amp; ML
            </div>
            <div className="hdr-sub">
              Comprehensive dashboard synthesising current research on Internet-of-Things sensor networks,
              machine learning models, and precision agriculture frameworks for early disease detection and automated crop management.
            </div>
            <div className="hdr-pills">
              <div className="pill g">Deep Learning</div>
              <div className="pill t">IoT Sensors</div>
              <div className="pill b">Edge Computing</div>
              <div className="pill p">Precision Agriculture</div>
              <div className="pill g">CNN · Transfer Learning</div>
              <div className="pill t">UAV · Drones</div>
            </div>
          </div>
          <div className="hdr-stats">
            <div className="hdr-stat">
              <div className="hdr-stat-num">99%</div>
              <div className="hdr-stat-lbl">Peak Accuracy</div>
            </div>
            <div className="hdr-stat">
              <div className="hdr-stat-num" style={{color:"var(--teal)"}}>6+</div>
              <div className="hdr-stat-lbl">Sensor Types</div>
            </div>
            <div className="hdr-stat">
              <div className="hdr-stat-num" style={{color:"var(--gold)"}}>60%</div>
              <div className="hdr-stat-lbl">Water Saved</div>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="kpis">
          {KPIS.map((k,i) => (
            <div className="kpi" key={i} style={{"--accent":k.accent}}>
              <div className="kpi-lbl">{k.lbl}</div>
              <div className="kpi-val">{k.val}<span className="kpi-unit"> {k.unit}</span></div>
              <div className={`kpi-delta ${k.up?"up":"dn"}`}>{k.delta}</div>
            </div>
          ))}
        </div>

        {/* ROW 1: Pipeline + IoT Nodes */}
        <div className="row r2">
          <div className="card">
            <div className="card-title"><span className="ct-icon">⚙️</span> Smart Farming Pipeline</div>
            <div className="pipeline">
              {PIPELINE_STEPS.map((s,i) => (
                <>
                  <div className="pipe-step" key={i}>
                    <div className={`pipe-icon-wrap${s.active?" active":""}`}>{s.icon}</div>
                    <div className="pipe-label" style={{whiteSpace:"pre-line"}}>{s.label}</div>
                  </div>
                  {i < PIPELINE_STEPS.length-1 && <div className="pipe-arrow" key={`a${i}`}/>}
                </>
              ))}
            </div>
            {/* Architecture layers */}
            <div style={{marginTop:20}}>
              <div className="card-title" style={{marginBottom:12}}><span className="ct-icon">🏗️</span> System Architecture</div>
              <div className="arch">
                {ARCH_LAYERS.map((layer,i) => (
                  <div key={i}>
                    <div className="arch-layer">
                      <div className="arch-lbl">{layer.lbl}</div>
                      <div className="arch-blocks">
                        {layer.blocks.map((b,j) => (
                          <div key={j} className={`arch-block ${b.cls}`}>
                            {b.t}
                            <span className="ab-sub">{b.s}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {i < ARCH_LAYERS.length-1 && <div className="arch-arrow">↓</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-title"><span className="ct-icon">📡</span> Live IoT Sensor Nodes</div>
            <div className="iot-grid">
              {IOT_NODES.map((n,i) => (
                <div className="iot-node" key={i}>
                  <div className="iot-node-hdr">
                    <div style={{fontSize:16}}>{n.icon}</div>
                    <div className={`iot-status ${n.status}`}/>
                  </div>
                  <div className="iot-name">{n.name}</div>
                  <div><span className="iot-val">{n.val}</span> <span className="iot-unit">{n.unit}</span></div>
                  <IotSparkline sparks={n.sparks}/>
                </div>
              ))}
            </div>

            <div style={{marginTop:16}}>
              <div className="card-title" style={{marginBottom:12}}><span className="ct-icon">📊</span> Top Model Metrics</div>
              <div className="metrics-grid">
                {METRICS.map((m,i) => (
                  <div className="metric-box" key={i}>
                    <div className="metric-val">{m.val}</div>
                    <div className="metric-lbl">{m.lbl}</div>
                  </div>
                ))}
              </div>
              <div style={{marginTop:10,padding:"10px 12px",border:"1px solid var(--border)",background:"var(--surface)",fontSize:10,color:"var(--muted)",lineHeight:1.7}}>
                <strong style={{color:"var(--text)"}}>Source:</strong> MKGPCNN + CGSAAN models evaluated on the New Plant Diseases Dataset and Crop Recommendation Dataset. Both achieve &gt;98% across accuracy, precision, and recall metrics.
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2: ML Models + Disease Risk */}
        <div className="row r2b">
          <div className="card">
            <div className="card-title"><span className="ct-icon">🧠</span> Disease Risk by Crop</div>
            <div className="disease-grid">
              {DISEASES.map((d,i) => (
                <div key={i} className={`disease-card${activeDis===i?" active":""}`} onClick={()=>setActiveDis(i)}>
                  <div className="dis-crop">{d.crop}</div>
                  <div className="dis-name">{d.name}</div>
                  <div className="dis-risk">
                    <div className="risk-bar"><div className={`risk-fill ${d.level}`} style={{width:`${d.risk}%`}}/></div>
                    <div className={`risk-lbl ${d.level}`}>{d.risk}%</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{marginTop:14,padding:"10px 12px",borderLeft:"2px solid var(--green2)",background:"rgba(0,232,122,.04)"}}>
              <div style={{fontSize:11,color:"var(--muted)",lineHeight:1.7}}>
                <strong style={{color:"var(--text)"}}>Selected: {DISEASES[activeDis].crop} — {DISEASES[activeDis].name}</strong><br/>
                Risk level: <strong style={{color:DISEASES[activeDis].level==="high"?"var(--red)":DISEASES[activeDis].level==="med"?"var(--orange)":"var(--green)"}}>{DISEASES[activeDis].level.toUpperCase()}</strong> ({DISEASES[activeDis].risk}%).
                IoT sensors monitor soil moisture, temperature and leaf wetness to trigger early-warning alerts 48–72h before visible symptoms.
              </div>
            </div>

            <div style={{marginTop:16}}>
              <div className="card-title" style={{marginBottom:10}}><span className="ct-icon">📈</span> Algorithm Accuracy Comparison</div>
              <div className="acc-compare">
                {ACC_COMPARE.map((a,i) => (
                  <div className="acc-row" key={i}>
                    <div className="acc-lbl">{a.name}</div>
                    <div className="acc-track2">
                      <div className="acc-fill2" style={{width:`${mounted?a.acc:0}%`,background:a.color}}/>
                    </div>
                    <div className="acc-num" style={{color:a.color}}>{a.acc}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-title"><span className="ct-icon">🔬</span> ML Model Details</div>
            <div className="tabs">
              {["Performance","Task","Type"].map((t,i) => (
                <div key={i} className={`tab${modelTab===i?" on":""}`} onClick={()=>setModelTab(i)}>{t}</div>
              ))}
            </div>
            <div className="model-list">
              {ML_MODELS.map((m,i) => (
                <div key={i} className={`model-row${activeModel===i?" active":""}`} onClick={()=>setActiveModel(i)}>
                  <div>
                    <div className="model-name">{m.name}</div>
                    <div className="model-type">{modelTab===0?m.type:modelTab===1?m.task:m.type}</div>
                  </div>
                  <div>
                    <div className="acc-track" style={{marginBottom:4}}>
                      <div className="acc-fill" style={{width:`${mounted?m.acc:0}%`,background:m.color}}/>
                    </div>
                    <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:8,color:"var(--muted)"}}>
                      Acc: {m.acc}% · Prec: {m.prec}%
                    </div>
                  </div>
                  <div className="acc-pct" style={{color:m.color}}>{m.acc}%</div>
                  <div className="model-badge" style={{background:m.badgeColor,color:m.badgeText,border:`1px solid ${m.badgeText}40`}}>{m.badge}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ROW 3: Challenges + Future Trends */}
        <div className="row r22">
          <div className="card">
            <div className="card-title"><span className="ct-icon">⚠️</span> Key Challenges</div>
            <div className="challenge-list">
              {CHALLENGES.map((c,i) => (
                <div className="challenge-item" key={i}>
                  <div className="ch-num">{String(i+1).padStart(2,"0")}</div>
                  <div>
                    <div className="ch-title">{c.title}</div>
                    <div className="ch-desc">{c.desc}</div>
                  </div>
                  <div className={`ch-tag ${c.cls}`}>{c.tag}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-title"><span className="ct-icon">🚀</span> Future Trends &amp; Directions</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {FUTURE_TRENDS.map((f,i) => (
                <div key={i} style={{display:"grid",gridTemplateColumns:"36px 1fr",gap:12,padding:"12px",
                  border:"1px solid var(--border)",background:"var(--surface)",transition:"border-color .2s",cursor:"default"}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor="var(--border2)"}
                  onMouseLeave={e=>e.currentTarget.style.borderColor="var(--border)"}>
                  <div style={{fontSize:20,lineHeight:1}}>{f.icon}</div>
                  <div>
                    <div style={{fontSize:12,fontWeight:700,color:"var(--text)",marginBottom:4}}>{f.title}</div>
                    <div style={{fontSize:10,color:"var(--muted)",lineHeight:1.65}}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{marginTop:14,padding:"12px 14px",border:"1px solid rgba(0,232,122,.2)",
              background:"rgba(0,232,122,.03)",borderRadius:0}}>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"var(--green)",letterSpacing:2,textTransform:"uppercase",marginBottom:6}}>Research Consensus</div>
              <div style={{fontSize:11,color:"var(--muted)",lineHeight:1.7}}>
                AI-based irrigation scheduling improves water-use efficiency by up to <strong style={{color:"var(--text)"}}>60%</strong>.
                IoT + ML integration enables crop disease prediction <strong style={{color:"var(--text)"}}>48–72h before visible outbreak</strong>.
                Ensemble and deep learning models consistently outperform classical approaches, with CNN achieving <strong style={{color:"var(--green)"}}>99% accuracy</strong> on standard plant disease datasets.
              </div>
            </div>
          </div>
        </div>

        <div className="footer">
          <div className="footer-txt">Smart Farming IoT+ML Dashboard · Research Synthesis 2024–2026</div>
          <div className="footer-txt">Sources: IEEE Xplore · Springer · Nature · PMC · ScienceDirect</div>
        </div>

      </div>
    </div>
  );
}
