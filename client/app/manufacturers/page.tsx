"use client";
import { useState } from "react";

const S = `
@import url('https://fonts.googleapis.com/css2?family=Literata:ital,wght@0,400;0,600;0,700;1,400&family=Nunito+Sans:wght@300;400;600;700;800&display=swap');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --cream:#FFF8EE; --cream2:#FFF3E3; --cream3:#FDEBD0;
  --white:#FFFFFF; --saffron:#E8650A; --saffron-lt:#FDF0E6;
  --saffron-md:#F4A35A; --maroon:#8B1A1A; --maroon-lt:#FDF0F0;
  --green:#1A6B3C; --green-lt:#EAF5EE; --green-br:#27AE60;
  --navy:#1C2B3A; --text1:#1C2B3A; --text2:#4A5568; --text3:#8A94A6;
  --border:#E8DDD0; --shadow-sm:0 1px 4px rgba(0,0,0,.07);
  --shadow-md:0 4px 16px rgba(0,0,0,.09); --shadow-lg:0 8px 32px rgba(0,0,0,.13);
  --r-sm:6px; --r-md:10px; --r-lg:14px;
}
.bp { font-family:'Nunito Sans',sans-serif; background:var(--cream); min-height:100vh; color:var(--text1); }

/* TOPBAR */
.bp-top { background:var(--navy); padding:0 26px; height:58px; display:flex; align-items:center; justify-content:space-between; position:sticky; top:0; z-index:100; box-shadow:0 2px 10px rgba(0,0,0,.22); }
.bp-logo { display:flex; align-items:center; gap:9px; }
.bp-logo-icon { width:35px; height:35px; background:var(--saffron); border-radius:7px; display:flex; align-items:center; justify-content:center; font-family:'Literata',serif; font-weight:700; font-size:14px; color:#fff; flex-shrink:0; }
.bp-logo-name { font-family:'Literata',serif; font-size:19px; font-weight:700; color:#fff; line-height:1; }
.bp-logo-sub { font-size:9px; color:var(--saffron-md); letter-spacing:1.5px; text-transform:uppercase; font-weight:700; }
.bp-search { flex:1; max-width:440px; margin:0 24px; display:flex; height:36px; border-radius:var(--r-sm); overflow:hidden; border:2px solid var(--saffron); }
.bp-search input { flex:1; border:none; outline:none; padding:0 13px; font-family:'Nunito Sans',sans-serif; font-size:13px; background:#fff; color:var(--text1); }
.bp-search-go { background:var(--saffron); border:none; padding:0 14px; color:#fff; font-size:14px; cursor:pointer; transition:background .15s; }
.bp-search-go:hover { background:#cf5608; }
.bp-top-r { display:flex; align-items:center; gap:10px; }
.bp-flag { display:flex; align-items:center; gap:5px; font-size:11px; font-weight:700; color:var(--saffron-md); letter-spacing:.5px; background:rgba(255,255,255,.07); padding:5px 11px; border-radius:20px; border:1px solid rgba(255,255,255,.1); }
.bp-cart-btn { position:relative; display:flex; align-items:center; gap:7px; background:var(--saffron); border:none; border-radius:7px; padding:8px 15px; color:#fff; font-family:'Nunito Sans',sans-serif; font-size:13px; font-weight:800; cursor:pointer; transition:all .15s; white-space:nowrap; }
.bp-cart-btn:hover { background:#cf5608; box-shadow:0 4px 14px rgba(232,101,10,.35); }
.bp-cart-badge { position:absolute; top:-5px; right:-5px; background:var(--maroon); color:#fff; border-radius:50%; width:17px; height:17px; font-size:9px; font-weight:800; display:flex; align-items:center; justify-content:center; border:2px solid var(--navy); }

/* STRIP */
.bp-strip { background:var(--saffron-lt); border-bottom:1px solid var(--cream3); padding:7px 26px; display:flex; gap:28px; align-items:center; overflow-x:auto; }
.bp-strip-item { display:flex; align-items:center; gap:5px; font-size:11.5px; color:var(--text2); font-weight:600; white-space:nowrap; }
.bp-strip-item strong { color:var(--saffron); }

/* LAYOUT */
.bp-body { display:flex; min-height:calc(100vh - 82px); }

/* SIDEBAR */
.bp-side { width:206px; flex-shrink:0; background:var(--white); border-right:1px solid var(--border); padding:18px 0; }
.bp-side-hd { font-size:9.5px; font-weight:800; letter-spacing:1.5px; text-transform:uppercase; color:var(--text3); padding:0 16px 11px; }
.bp-cat-btn { width:100%; background:none; border:none; border-left:3px solid transparent; padding:9px 16px; display:flex; align-items:center; gap:9px; cursor:pointer; text-align:left; transition:all .13s; font-family:'Nunito Sans',sans-serif; }
.bp-cat-btn:hover { background:var(--cream2); }
.bp-cat-btn.on { background:var(--saffron-lt); border-left-color:var(--saffron); }
.bp-cat-emoji { font-size:17px; flex-shrink:0; }
.bp-cat-name { font-size:12px; font-weight:700; color:var(--text2); line-height:1.25; }
.bp-cat-btn.on .bp-cat-name { color:var(--saffron); }
.bp-cat-cnt { font-size:10px; color:var(--text3); font-weight:600; }
.bp-divider { height:1px; background:var(--border); margin:12px 16px; }
.bp-flt-hd { font-size:9.5px; font-weight:800; letter-spacing:1.5px; text-transform:uppercase; color:var(--text3); padding:0 16px 9px; }
.bp-flt-row { display:flex; align-items:center; gap:8px; padding:7px 16px; font-size:11.5px; color:var(--text2); font-weight:600; cursor:pointer; border-left:3px solid transparent; transition:background .12s; }
.bp-flt-row:hover { background:var(--cream2); }
.bp-flt-row.on { color:var(--green); background:var(--green-lt); border-left-color:var(--green); }
.bp-flt-dot { width:8px; height:8px; border-radius:50%; border:2px solid var(--border); flex-shrink:0; transition:all .12s; }
.bp-flt-row.on .bp-flt-dot { background:var(--green); border-color:var(--green); }

/* CONTENT */
.bp-main { flex:1; padding:20px 22px; min-width:0; }
.bp-main-hd { display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:16px; }
.bp-main-title { font-family:'Literata',serif; font-size:21px; font-weight:700; color:var(--text1); line-height:1.2; }
.bp-main-sub { font-size:11.5px; color:var(--text3); margin-top:2px; font-weight:600; }
.bp-sort { display:flex; align-items:center; gap:7px; font-size:11.5px; color:var(--text3); font-weight:600; }
.bp-sort select { font-family:'Nunito Sans',sans-serif; font-size:11.5px; font-weight:700; color:var(--text1); border:1px solid var(--border); border-radius:5px; padding:5px 9px; background:var(--white); cursor:pointer; outline:none; }

/* GRID */
.bp-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:15px; }

/* CARD */
.bp-card { background:var(--white); border:1px solid var(--border); border-radius:var(--r-lg); overflow:hidden; transition:box-shadow .18s,border-color .18s,transform .18s; }
.bp-card:hover { box-shadow:var(--shadow-lg); border-color:#ddd0c0; transform:translateY(-2px); }
.bp-card-img { height:148px; background:linear-gradient(140deg,var(--cream2),var(--cream3)); display:flex; align-items:center; justify-content:center; font-size:64px; position:relative; border-bottom:1px solid var(--border); }
.bp-india-tag { position:absolute; top:9px; left:9px; background:var(--white); border:1px solid var(--green-br); border-radius:4px; padding:3px 7px; font-size:9.5px; font-weight:800; color:var(--green); display:flex; align-items:center; gap:3px; box-shadow:var(--shadow-sm); }
.bp-pct-tag { position:absolute; top:9px; right:9px; background:var(--saffron); border-radius:4px; padding:3px 7px; font-size:9.5px; font-weight:800; color:#fff; }
.bp-card-body { padding:13px 13px 11px; }
.bp-prod-name { font-size:13px; font-weight:700; color:var(--text1); line-height:1.35; margin-bottom:3px; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
.bp-mfr { display:flex; align-items:center; gap:4px; font-size:10.5px; font-weight:700; color:var(--saffron); margin-bottom:9px; }
.bp-chips { display:flex; flex-wrap:wrap; gap:4px; margin-bottom:9px; }
.bp-chip { font-size:9.5px; font-weight:700; padding:2px 7px; border-radius:4px; }
.bp-chip.g { background:var(--saffron-lt); color:var(--saffron); border:1px solid #F4B97A; }
.bp-chip.h { background:#EEF2FF; color:#3B4FD8; border:1px solid #C7D0FF; }
.bp-chip.l { background:var(--maroon-lt); color:var(--maroon); border:1px solid #F4BCBC; }
.bp-raw-wrap { margin-bottom:9px; }
.bp-raw-top { display:flex; justify-content:space-between; font-size:9.5px; font-weight:700; color:var(--text3); margin-bottom:3px; text-transform:uppercase; letter-spacing:.6px; }
.bp-raw-pct { color:var(--green); }
.bp-raw-track { height:4px; background:var(--cream3); border-radius:10px; overflow:hidden; }
.bp-raw-fill { height:100%; background:linear-gradient(90deg,var(--green),var(--green-br)); border-radius:10px; transition:width .7s ease; }
.bp-hr { height:1px; background:var(--border); margin:9px 0; }
.bp-price-row { display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:9px; }
.bp-price { font-family:'Literata',serif; font-size:20px; font-weight:700; color:var(--maroon); line-height:1; }
.bp-price-u { font-size:10.5px; color:var(--text3); font-weight:600; margin-left:2px; font-family:'Nunito Sans',sans-serif; }
.bp-moq { font-size:9.5px; font-weight:800; background:var(--green-lt); color:var(--green); border:1px solid #B2DFBC; border-radius:4px; padding:2px 6px; white-space:nowrap; }
.bp-actions { display:flex; gap:6px; }
.btn-add { flex:1; background:var(--saffron); border:none; border-radius:var(--r-sm); padding:9px 0; color:#fff; font-family:'Nunito Sans',sans-serif; font-size:12px; font-weight:800; cursor:pointer; transition:all .15s; letter-spacing:.2px; }
.btn-add:hover { background:#cf5608; }
.btn-add.ok { background:var(--green); }
.btn-det { background:var(--white); border:1.5px solid var(--border); border-radius:var(--r-sm); padding:9px 12px; font-family:'Nunito Sans',sans-serif; font-size:11.5px; font-weight:700; color:var(--text2); cursor:pointer; transition:all .15s; }
.btn-det:hover { border-color:var(--saffron); color:var(--saffron); background:var(--saffron-lt); }

/* CART */
.bp-ov { position:fixed; inset:0; background:rgba(28,43,58,.45); z-index:200; backdrop-filter:blur(3px); }
.bp-cart { position:fixed; right:0; top:0; bottom:0; width:382px; background:var(--white); border-left:1px solid var(--border); z-index:201; display:flex; flex-direction:column; box-shadow:-8px 0 40px rgba(0,0,0,.14); }
.bp-cart-hd { background:var(--navy); padding:17px 20px; display:flex; align-items:center; justify-content:space-between; }
.bp-cart-title { font-family:'Literata',serif; font-size:17px; font-weight:700; color:#fff; }
.bp-cart-sub { font-size:10.5px; color:var(--saffron-md); font-weight:600; margin-top:1px; }
.bp-close { width:30px; height:30px; background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.15); border-radius:5px; color:#fff; font-size:13px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background .15s; }
.bp-close:hover { background:rgba(255,255,255,.2); }
.bp-cart-body { flex:1; overflow-y:auto; padding:14px 18px; background:var(--cream); }
.bp-empty { display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; gap:9px; color:var(--text3); }
.bp-empty span:first-child { font-size:48px; }
.bp-ci { background:var(--white); border:1px solid var(--border); border-radius:var(--r-md); padding:11px 12px; margin-bottom:9px; display:flex; gap:9px; align-items:flex-start; }
.bp-ci-em { font-size:28px; flex-shrink:0; }
.bp-ci-info { flex:1; min-width:0; }
.bp-ci-name { font-size:12px; font-weight:700; color:var(--text1); line-height:1.3; margin-bottom:2px; }
.bp-ci-mfr { font-size:10px; color:var(--saffron); font-weight:700; margin-bottom:7px; }
.bp-ci-bot { display:flex; align-items:center; justify-content:space-between; }
.bp-qty { display:flex; align-items:center; gap:5px; background:var(--cream); border:1px solid var(--border); border-radius:5px; padding:2px 5px; }
.bp-qbtn { background:none; border:none; color:var(--saffron); font-size:15px; font-weight:800; cursor:pointer; width:19px; height:19px; display:flex; align-items:center; justify-content:center; border-radius:3px; transition:background .12s; }
.bp-qbtn:hover { background:var(--saffron-lt); }
.bp-qnum { font-size:11.5px; font-weight:800; color:var(--text1); min-width:20px; text-align:center; }
.bp-ci-price { font-family:'Literata',serif; font-size:14px; font-weight:700; color:var(--maroon); }
.bp-ci-rm { background:none; border:none; color:var(--text3); font-size:13px; cursor:pointer; flex-shrink:0; padding:1px; border-radius:3px; transition:all .12s; display:flex; align-items:flex-start; }
.bp-ci-rm:hover { color:var(--maroon); background:var(--maroon-lt); }
.bp-cart-ft { padding:16px 18px; border-top:1px solid var(--border); background:var(--white); }
.bp-flag-bar { height:3px; background:linear-gradient(90deg,#FF9933 33.3%,#FFF 33.3% 66.6%,#138808 66.6%); border-radius:2px; margin-bottom:13px; }
.bp-total-row { display:flex; align-items:baseline; justify-content:space-between; margin-bottom:3px; }
.bp-total-lbl { font-size:11.5px; font-weight:700; color:var(--text3); text-transform:uppercase; letter-spacing:1px; }
.bp-total-amt { font-family:'Literata',serif; font-size:25px; font-weight:700; color:var(--maroon); }
.bp-total-note { font-size:10px; color:var(--text3); font-weight:600; margin-bottom:13px; }
.bp-checkout { width:100%; background:linear-gradient(135deg,#E8650A,#CF5608); border:none; border-radius:var(--r-md); padding:12px; color:#fff; font-family:'Nunito Sans',sans-serif; font-size:13.5px; font-weight:800; cursor:pointer; transition:all .15s; box-shadow:0 3px 12px rgba(232,101,10,.3); }
.bp-checkout:hover { box-shadow:0 6px 20px rgba(232,101,10,.4); transform:translateY(-1px); }
.bp-rfq-note { text-align:center; font-size:10px; color:var(--text3); font-weight:600; margin-top:7px; }

/* MODAL */
.bp-modal-ov { position:fixed; inset:0; background:rgba(28,43,58,.55); z-index:300; display:flex; align-items:center; justify-content:center; padding:20px; backdrop-filter:blur(4px); }
.bp-modal { background:var(--white); border-radius:var(--r-lg); max-width:530px; width:100%; max-height:88vh; overflow-y:auto; box-shadow:0 24px 64px rgba(0,0,0,.22); border:1px solid var(--border); }
.bp-modal-hero { background:linear-gradient(140deg,var(--cream2),var(--cream3)); padding:24px 24px 18px; border-bottom:1px solid var(--border); display:flex; gap:14px; align-items:flex-start; }
.bp-modal-em { font-size:52px; flex-shrink:0; line-height:1; }
.bp-modal-hd { flex:1; }
.bp-modal-pname { font-family:'Literata',serif; font-size:17px; font-weight:700; color:var(--text1); line-height:1.3; margin-bottom:3px; }
.bp-modal-mfr { font-size:11.5px; font-weight:700; color:var(--saffron); margin-bottom:9px; }
.bp-modal-certs { display:flex; flex-wrap:wrap; gap:4px; }
.bp-modal-cert { font-size:9.5px; font-weight:700; padding:2px 7px; border-radius:4px; background:var(--green-lt); color:var(--green); border:1px solid #B2DFBC; }
.bp-modal-body { padding:18px 24px 22px; }
.bp-sec { font-size:9.5px; font-weight:800; letter-spacing:1.5px; text-transform:uppercase; color:var(--text3); margin-bottom:9px; margin-top:16px; padding-bottom:5px; border-bottom:1px solid var(--border); }
.bp-sec:first-child { margin-top:0; }
.bp-lic { background:var(--saffron-lt); border:1px solid #F4B97A; border-radius:var(--r-md); padding:11px 14px; display:flex; align-items:center; gap:11px; }
.bp-lic-type { font-size:9.5px; color:var(--text3); font-weight:700; text-transform:uppercase; letter-spacing:.8px; margin-bottom:2px; }
.bp-lic-num { font-size:13.5px; font-weight:800; color:var(--saffron); letter-spacing:.5px; }
.bp-addr { display:flex; gap:9px; align-items:flex-start; font-size:12.5px; color:var(--text2); font-weight:600; line-height:1.5; }
.bp-india-m { display:flex; align-items:center; gap:16px; background:var(--cream2); border-radius:var(--r-md); padding:13px 15px; border:1px solid var(--border); }
.bp-india-big { font-family:'Literata',serif; font-size:36px; font-weight:700; color:var(--saffron); line-height:1; }
.bp-india-info { font-size:11.5px; color:var(--text2); font-weight:600; line-height:1.55; }
.bp-india-note { font-size:10.5px; color:var(--text3); line-height:1.4; margin-top:3px; }
.bp-price-big { font-family:'Literata',serif; font-size:26px; font-weight:700; color:var(--maroon); }
.bp-price-u2 { font-size:12.5px; color:var(--text3); font-weight:600; }
.bp-moq-detail { display:inline-flex; align-items:center; gap:5px; background:var(--green-lt); border:1px solid #B2DFBC; border-radius:var(--r-sm); padding:4px 11px; font-size:11.5px; font-weight:800; color:var(--green); margin-top:8px; }
.bp-tax-row { display:flex; gap:8px; margin-top:7px; flex-wrap:wrap; }
.bp-tax { font-size:10.5px; font-weight:700; padding:3px 9px; border-radius:4px; }
.bp-tax.a { background:var(--saffron-lt); color:var(--saffron); border:1px solid #F4B97A; }
.bp-tax.b { background:#EEF2FF; color:#3B4FD8; border:1px solid #C7D0FF; }
.bp-modal-add { width:100%; background:var(--saffron); border:none; border-radius:var(--r-md); padding:12px; color:#fff; font-family:'Nunito Sans',sans-serif; font-size:13.5px; font-weight:800; cursor:pointer; transition:all .15s; margin-top:16px; }
.bp-modal-add:hover { background:#cf5608; box-shadow:0 4px 16px rgba(232,101,10,.35); }
.bp-modal-add.ok { background:var(--green); }
`;

// ── TYPES ──────────────────────────────────────────────────────────────────────

type Product = {
  id: string;
  emoji: string;
  name: string;
  manufacturer: string;
  license: string;
  licenseType: string;
  address: string;
  indiaPct: number;
  raw: number;
  rawNote: string;
  price: number;
  unit: string;
  moq: number;
  moqUnit: string;
  gst: string;
  hsn: string;
  certs: string[];
};

type CartItem = Product & { qty: number };

type Category = {
  id: string;
  name: string;
  emoji: string;
  count: number;
  desc: string;
  products: Product[];
};

const categories = [
  { id:"textiles", name:"Textiles & Fabrics", emoji:"🧵", count:5, desc:"Mill-direct cotton, silk & handloom",
    products:[
      { id:"t1",emoji:"🥻",name:"Pure Khadi Cotton Fabric – White (Per Metre)",manufacturer:"Sabarmati Khadi Mills Pvt. Ltd.",license:"MSME/GJ/2018/04421",licenseType:"MSME Manufacturing License",address:"Plot 14, GIDC Phase II, Ahmedabad, Gujarat – 382 445",indiaPct:100,raw:98,rawNote:"Long-staple cotton from Saurashtra farmers; natural scouring agents",price:85,unit:"per metre",moq:500,moqUnit:"metres",gst:"5%",hsn:"5208.11",certs:["Khadi India Certified","OEKO-TEX Standard 100"] },
      { id:"t2",emoji:"🌸",name:"Jaipuri Block-Printed Cotton – 6-Colour (Per Metre)",manufacturer:"Rajputana Prints & Weaves",license:"UAM/RJ/24/0003827",licenseType:"Udyam Registration",address:"Sanganer Industrial Area, Jaipur, Rajasthan – 302 029",indiaPct:100,raw:90,rawNote:"Cotton from MP; AZO-free natural dyes from Ahmedabad",price:145,unit:"per metre",moq:300,moqUnit:"metres",gst:"5%",hsn:"5208.52",certs:["RJ Handicrafts Board Certified"] },
      { id:"t3",emoji:"✨",name:"Banarasi Brocade Silk Fabric (Per Metre)",manufacturer:"Kashi Silk Handloom Co-operative",license:"HNDLM/UP/BNS/2020/0178",licenseType:"Handloom Cooperative License",address:"Lallapura, Varanasi, Uttar Pradesh – 221 010",indiaPct:100,raw:85,rawNote:"Karnataka mulberry silk; Surat gold zari; domestic dyes",price:1850,unit:"per metre",moq:50,moqUnit:"metres",gst:"5%",hsn:"5007.20",certs:["GI Tag – Banarasi Silk","Silk Mark India"] },
      { id:"t4",emoji:"🧶",name:"OE Recycled Polyester Fabric – 180 GSM (Per Metre)",manufacturer:"GreenThread Fibres Pvt. Ltd.",license:"IND/GJ/MFG/2021/REC-0032",licenseType:"Industrial Manufacturing License",address:"GIDC Textile Park, Surat, Gujarat – 395 006",indiaPct:100,raw:75,rawNote:"Recycled PET from domestic waste; 25% imported dye chemicals",price:68,unit:"per metre",moq:1000,moqUnit:"metres",gst:"12%",hsn:"5512.11",certs:["GOTS Certified","GRS Standard"] },
      { id:"t5",emoji:"🪢",name:"South Indian Handloom Lungi – Checkered (Per Piece)",manufacturer:"Kovai Weaves Producers Company",license:"APCO/TN/WVR/2017/1142",licenseType:"Handloom Producer Company",address:"Pappanaickenpalayam, Coimbatore, Tamil Nadu – 641 037",indiaPct:100,raw:100,rawNote:"100% combed cotton from Salem region; zero imports",price:220,unit:"per piece",moq:200,moqUnit:"pieces",gst:"5%",hsn:"6302.91",certs:["Handloom Mark","TN Weavers Co-op"] },
    ]
  },
  { id:"toys", name:"Toys & Games", emoji:"🧸", count:5, desc:"BIS-certified, phthalate-free, child-safe",
    products:[
      { id:"toy1",emoji:"🪆",name:"Channapatna Lacquered Wooden Toys – Set of 10",manufacturer:"Karnataka Toy Craft Cluster LLP",license:"MSME/KA/2016/09882",licenseType:"MSME Manufacturing License",address:"Channapatna, Ramanagara District, Karnataka – 562 160",indiaPct:100,raw:95,rawNote:"Ivory wood (Hale tree) & vegetable lacquer sourced locally",price:480,unit:"per set",moq:100,moqUnit:"sets",gst:"12%",hsn:"9503.00",certs:["BIS IS:9873","GI Tag – Channapatna Toys"] },
      { id:"toy2",emoji:"🎲",name:"Educational Wooden Block Set – 100 Pieces",manufacturer:"BrightMind Edutoys Pvt. Ltd.",license:"IND/MH/TY/2020/BRT-017",licenseType:"Industrial Manufacturing License",address:"TTC Industrial Area, Navi Mumbai, Maharashtra – 400 705",indiaPct:98,raw:80,rawNote:"Rubberwood from Kerala; non-toxic paints from Pune",price:320,unit:"per set",moq:150,moqUnit:"sets",gst:"12%",hsn:"9503.00",certs:["BIS IS:9873 Part 1","ISO 8124"] },
      { id:"toy3",emoji:"🤖",name:"STEM Robot Kit – Junior Coder (Age 8+)",manufacturer:"Robotix India Learning Labs",license:"STARTUP/KA/2022/STR-0441",licenseType:"DPIIT Startup India",address:"Electronics City Phase 1, Bengaluru, Karnataka – 560 100",indiaPct:85,raw:45,rawNote:"PCB assembled in Bengaluru; motors/sensors partially imported",price:2100,unit:"per kit",moq:50,moqUnit:"kits",gst:"18%",hsn:"9503.00",certs:["BIS CRS","FCC DoC"] },
      { id:"toy4",emoji:"🎯",name:"Neem Wood Gilli-Danda Premium Set",manufacturer:"Swadeshi Sports Crafts",license:"UAM/UP/25/0010234",licenseType:"Udyam Registration",address:"Meerut Sports Cluster, Meerut, Uttar Pradesh – 250 001",indiaPct:100,raw:100,rawNote:"Aged neem wood from UP farms; zero synthetic coatings",price:180,unit:"per set",moq:200,moqUnit:"sets",gst:"12%",hsn:"9504.90",certs:["Meerut Sports Manufacturers Assoc."] },
      { id:"toy5",emoji:"🪅",name:"Kondapalli Leather Puppet Set – 5 Characters",manufacturer:"Kondapalli Artisans Welfare Society",license:"HNDCRFT/AP/2019/KNP-0055",licenseType:"Handicraft Board License",address:"Kondapalli Village, Krishna District, Andhra Pradesh – 521 228",indiaPct:100,raw:92,rawNote:"Buffalo leather & vegetable dyes from Andhra; mild wire imported",price:950,unit:"per set",moq:60,moqUnit:"sets",gst:"12%",hsn:"9503.00",certs:["GI Tag – Kondapalli Toys","AP Handicrafts Corp."] },
    ]
  },
  { id:"ayurveda", name:"Ayurvedic & Pharma", emoji:"🌿", count:5, desc:"AYUSH-licensed, WHO-GMP formulations",
    products:[
      { id:"ay1",emoji:"🫚",name:"Cold-Pressed Virgin Coconut Oil – Food Grade (1L)",manufacturer:"Kerala Naturals Oils Pvt. Ltd.",license:"AYUSH/KL/MFG/2017/CNL-0821",licenseType:"AYUSH Manufacturing License",address:"Palakkad Agro Processing Zone, Palakkad, Kerala – 678 001",indiaPct:100,raw:100,rawNote:"100% Kerala coconuts; zero imported inputs whatsoever",price:185,unit:"per litre",moq:500,moqUnit:"litres",gst:"0%",hsn:"1513.11",certs:["FSSAI Licensed","AGMARK Grade A","Organic India"] },
      { id:"ay2",emoji:"🌼",name:"Neem-Turmeric Antiseptic Soap (100g Bar)",manufacturer:"Himalaya Naturals Soap Works",license:"AYUSH/UK/MFG/2015/ANS-0194",licenseType:"AYUSH Manufacturing License",address:"Rudrapur Industrial Estate, Uttarakhand – 263 153",indiaPct:100,raw:88,rawNote:"Neem oil from Rajasthan; turmeric from Erode; palm oil partially imported",price:38,unit:"per bar",moq:1000,moqUnit:"bars",gst:"18%",hsn:"3401.11",certs:["AYUSH Approved","ISO 9001:2015"] },
      { id:"ay3",emoji:"🍵",name:"Ashwagandha Root Powder KSM-66 (1 kg)",manufacturer:"Ixoreal Biomed Pvt. Ltd.",license:"AYUSH/TL/MFG/2014/ABP-0063",licenseType:"AYUSH Herbal License",address:"IDA Mallapur, Hyderabad, Telangana – 500 076",indiaPct:100,raw:100,rawNote:"Withania somnifera from Rajasthan tribal farms only",price:1450,unit:"per kg",moq:25,moqUnit:"kg",gst:"5%",hsn:"1211.90",certs:["AYUSH Premium Mark","Kosher & Halal","Non-GMO Project"] },
      { id:"ay4",emoji:"🧴",name:"Triphala Churna Tablets 500mg × 1000 Tabs",manufacturer:"Dabur India Ltd. – Herbal Division",license:"AYUSH/UP/MFG/2005/DHL-0012",licenseType:"AYUSH Drug Manufacturing",address:"Dabur Research Foundation, Sahibabad, Ghaziabad, UP – 201 005",indiaPct:100,raw:95,rawNote:"Amla from MP, Haritaki from Bengal, Bibhitaki from Assam",price:680,unit:"per bottle",moq:100,moqUnit:"bottles",gst:"5%",hsn:"3004.90",certs:["WHO-GMP","AYUSH Premium Mark","ISO 22000"] },
      { id:"ay5",emoji:"🌾",name:"Moringa Leaf Powder – Organic (500g Pack)",manufacturer:"Green India Organic Farms",license:"APEDA/TN/ORG/2019/MOG-0307",licenseType:"APEDA Organic Export License",address:"Dindigul Agri Cluster, Dindigul, Tamil Nadu – 624 001",indiaPct:100,raw:100,rawNote:"Certified organic Tamil Nadu farms; sun-dried & cold-milled",price:420,unit:"per 500g",moq:200,moqUnit:"packs",gst:"0%",hsn:"0712.90",certs:["India Organic","USDA Organic","FSSAI Organic"] },
    ]
  },
  { id:"electronics", name:"Electronics & Components", emoji:"💡", count:4, desc:"PLI-scheme manufacturers, BIS-CRS certified",
    products:[
      { id:"el1",emoji:"💡",name:"9W LED Bulb – Cool White B22 Base",manufacturer:"Halonix Technologies Pvt. Ltd.",license:"BIS/DL/ELE/2016/HAL-0219",licenseType:"BIS Manufacturing License",address:"Plot 51, IMT Manesar, Gurugram, Haryana – 122 050",indiaPct:92,raw:60,rawNote:"Aluminium housing from Rajkot; LED chips partially from Taiwan",price:42,unit:"per bulb",moq:1000,moqUnit:"bulbs",gst:"12%",hsn:"8539.50",certs:["BIS IS:16102","BEE 5-Star","PLI Scheme"] },
      { id:"el2",emoji:"🔌",name:"5-Pin 16A Power Strip – 3 Sockets + 2 USB",manufacturer:"Anchor Electricals Pvt. Ltd.",license:"BIS/MH/ELE/2012/ANC-0041",licenseType:"BIS Manufacturing License",address:"Panvel Industrial Zone, Raigad, Maharashtra – 410 206",indiaPct:96,raw:78,rawNote:"Polycarbonate from HMEL Bathinda; copper from Hindalco",price:320,unit:"per unit",moq:200,moqUnit:"units",gst:"18%",hsn:"8536.49",certs:["BIS IS:1293","ISI Mark"] },
      { id:"el3",emoji:"☀️",name:"10W Monocrystalline Solar Panel – 12V",manufacturer:"Waaree Energies Pvt. Ltd.",license:"IND/GJ/SOLAR/2014/WAR-0007",licenseType:"MNRE Solar License",address:"Surat SEZ, Hazira, Gujarat – 394 510",indiaPct:88,raw:55,rawNote:"Aluminium frames & JB boxes Indian; silicon wafers partially imported",price:780,unit:"per panel",moq:100,moqUnit:"panels",gst:"12%",hsn:"8541.43",certs:["IEC 61215","MNRE Empanelled","PLI Solar"] },
      { id:"el4",emoji:"📟",name:"Industrial IoT Temperature Sensor Module RS485",manufacturer:"Embsys IoT Solutions Pvt. Ltd.",license:"STARTUP/TS/2021/EMB-0882",licenseType:"DPIIT Startup India",address:"T-Hub Phase 2, Hyderabad, Telangana – 500 081",indiaPct:80,raw:40,rawNote:"PCB designed & assembled in Hyderabad; MCUs from global supply",price:1850,unit:"per module",moq:50,moqUnit:"modules",gst:"18%",hsn:"9025.19",certs:["BIS CRS","CE DoC","STQC Tested"] },
    ]
  },
  { id:"agri", name:"Agri & Food Processing", emoji:"🌾", count:4, desc:"Farm-to-factory, FSSAI-licensed processors",
    products:[
      { id:"ag1",emoji:"🌾",name:"Premium 1121 Sella Basmati Rice (25 kg Bag)",manufacturer:"KRBL Ltd. – India Gate Division",license:"FSSAI/UP/FBO/2009/KRB-0001",licenseType:"FSSAI Central License",address:"Alipur, Delhi – 110 036 (Mill: Dhuri, Punjab – 148 024)",indiaPct:100,raw:100,rawNote:"Paddy contracted directly from Haryana & Punjab farmers",price:2200,unit:"per 25 kg bag",moq:50,moqUnit:"bags",gst:"5%",hsn:"1006.30",certs:["APEDA Registered","GI Tag – Basmati","ISO 22000"] },
      { id:"ag2",emoji:"🌶️",name:"Guntur Sannam Chilli Powder S4 (5 kg Tin)",manufacturer:"Andhra Spice Millers Association",license:"FSSAI/AP/FBO/2014/ASM-0277",licenseType:"FSSAI State License",address:"Guntur Mirchi Yard, Guntur, Andhra Pradesh – 522 003",indiaPct:100,raw:100,rawNote:"Red chillies exclusively from Guntur district farms",price:1100,unit:"per 5 kg tin",moq:100,moqUnit:"tins",gst:"5%",hsn:"0904.22",certs:["Spices Board India","GI Tag – Guntur Chilli"] },
      { id:"ag3",emoji:"🍯",name:"Raw Himalayan Multifloral Honey (30 kg Drum)",manufacturer:"National Bee Board Cooperative, Himachal",license:"FSSAI/HP/FBO/2018/NBB-0033",licenseType:"FSSAI Central License",address:"Solan Beekeeping Cluster, Solan, Himachal Pradesh – 173 212",indiaPct:100,raw:100,rawNote:"Single-origin bee colonies from Kullu-Manali altitude forests",price:4800,unit:"per 30 kg drum",moq:20,moqUnit:"drums",gst:"0%",hsn:"0409.00",certs:["National Bee Board Certified","FSSAI Premium","Non-GMO"] },
      { id:"ag4",emoji:"🫛",name:"Black-Eyed Peas / Lobia (50 kg Jute Sack)",manufacturer:"Punjab Pulses Milling Cooperative",license:"FSSAI/PB/FBO/2011/PPM-0144",licenseType:"FSSAI State License",address:"Ludhiana Agri Processing Zone, Ludhiana, Punjab – 141 003",indiaPct:100,raw:100,rawNote:"Lobia from contracted farms in Punjab & Haryana only",price:3800,unit:"per 50 kg sack",moq:40,moqUnit:"sacks",gst:"0%",hsn:"0713.35",certs:["AGMARK","APEDA Registered","ISO 22000"] },
    ]
  },
];

export default function BulkplierMarketplace() {
  const [activeCat, setActiveCat] = useState<string>("textiles");
  const [cart, setCart]           = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen]   = useState<boolean>(false);
  const [modal, setModal]         = useState<Product | null>(null);
  const [added, setAdded]         = useState<Set<string>>(new Set());
  const [f100, setF100]           = useState<boolean>(false);
  const [fCert, setFCert]         = useState<boolean>(false);

  const cat = categories.find(c => c.id === activeCat)!;

  const flash = (id: string) => {
    setAdded(s => new Set([...s, id]));
    setTimeout(() => setAdded(s => { const n = new Set(s); n.delete(id); return n; }), 1800);
  };

  const addToCart = (p: Product) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === p.id);
      return ex ? prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i) : [...prev, { ...p, qty: 1 }];
    });
    flash(p.id);
  };

  const products = cat.products.filter(p => {
    if (f100 && p.indiaPct < 100) return false;
    if (fCert && !p.certs.some(c => /ayush|gmp|organic|bis|gi tag/i.test(c))) return false;
    return true;
  });

  const totalQty = cart.reduce((s,i) => s + i.qty, 0);
  const totalAmt = cart.reduce((s,i) => s + i.price * i.qty, 0);

  return (
    <>
      <style>{S}</style>
      <div className="bp">

        {/* TOPBAR */}
        <div className="bp-top">
          <div className="bp-logo">
            <div className="bp-logo-icon">B₂</div>
            <div>
              <div className="bp-logo-name">Bulkplier</div>
              <div className="bp-logo-sub">Wholesale · B2B</div>
            </div>
          </div>
          <div className="bp-search">
            <input placeholder="Search manufacturers, products, HSN codes…" />
            <button className="bp-search-go">🔍</button>
          </div>
          <div className="bp-top-r">
            <div className="bp-flag">🇮🇳 Bharat Made</div>
            <button className="bp-cart-btn" onClick={() => setCartOpen(true)}>
              🛒 RFQ Cart
              {totalQty > 0 && <span className="bp-cart-badge">{totalQty}</span>}
            </button>
          </div>
        </div>

        {/* STRIP */}
        <div className="bp-strip">
          {[["🏭","2,400+","Verified Manufacturers"],["📦","18","Product Categories"],["✅","MSME/AYUSH/BIS","Licensed Only"],["🚚","MOQ Enforced","Bulk Pricing"],["💰","0% GST","on select categories"]].map(([ic,b,t]) => (
            <div className="bp-strip-item" key={t}>{ic} <strong>{b}</strong> {t}</div>
          ))}
        </div>

        {/* BODY */}
        <div className="bp-body">

          {/* SIDEBAR */}
          <div className="bp-side">
            <div className="bp-side-hd">Categories</div>
            {categories.map(c => (
              <button key={c.id} className={`bp-cat-btn${activeCat===c.id?" on":""}`} onClick={() => setActiveCat(c.id)}>
                <span className="bp-cat-emoji">{c.emoji}</span>
                <div>
                  <div className="bp-cat-name">{c.name}</div>
                  <div className="bp-cat-cnt">{c.count} products</div>
                </div>
              </button>
            ))}
            <div className="bp-divider" />
            <div className="bp-flt-hd">Filters</div>
            <div className={`bp-flt-row${f100?" on":""}`} onClick={() => setF100(v => !v)}>
              <div className="bp-flt-dot" /> 100% Made in India
            </div>
            <div className={`bp-flt-row${fCert?" on":""}`} onClick={() => setFCert(v => !v)}>
              <div className="bp-flt-dot" /> Certified Quality
            </div>
          </div>

          {/* CONTENT */}
          <div className="bp-main">
            <div className="bp-main-hd">
              <div>
                <div className="bp-main-title">{cat.emoji} {cat.name}</div>
                <div className="bp-main-sub">{cat.desc} · {products.length} products shown</div>
              </div>
              <div className="bp-sort">
                Sort: <select><option>Relevance</option><option>Price: Low–High</option><option>Price: High–Low</option><option>% India Made</option></select>
              </div>
            </div>

            <div className="bp-grid">
              {products.map(p => (
                <div className="bp-card" key={p.id}>
                  <div className="bp-card-img">
                    <span>{p.emoji}</span>
                    <span className="bp-india-tag">✓ {p.indiaPct}% India Made</span>
                    <span className="bp-pct-tag">🇮🇳 {p.indiaPct}%</span>
                  </div>
                  <div className="bp-card-body">
                    <div className="bp-prod-name">{p.name}</div>
                    <div className="bp-mfr">🏭 {p.manufacturer}</div>
                    <div className="bp-chips">
                      <span className="bp-chip g">GST {p.gst}</span>
                      <span className="bp-chip h">HSN {p.hsn}</span>
                      <span className="bp-chip l">📍 {p.address.split(",").slice(-2).join(",").trim()}</span>
                    </div>
                    <div className="bp-raw-wrap">
                      <div className="bp-raw-top"><span>Indian Raw Material</span><span className="bp-raw-pct">{p.raw}%</span></div>
                      <div className="bp-raw-track"><div className="bp-raw-fill" style={{ width:`${p.raw}%` }} /></div>
                    </div>
                    <div className="bp-hr" />
                    <div className="bp-price-row">
                      <div><span className="bp-price">₹{p.price.toLocaleString("en-IN")}</span><span className="bp-price-u"> {p.unit}</span></div>
                      <span className="bp-moq">MOQ {p.moq.toLocaleString()} {p.moqUnit}</span>
                    </div>
                    <div className="bp-actions">
                      <button className={`btn-add${added.has(p.id)?" ok":""}`} onClick={() => addToCart(p)}>
                        {added.has(p.id) ? "✓ Added to RFQ" : "+ Add to RFQ Cart"}
                      </button>
                      <button className="btn-det" onClick={() => setModal(p)}>Details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CART PANEL */}
        {cartOpen && (<>
          <div className="bp-ov" onClick={() => setCartOpen(false)} />
          <div className="bp-cart">
            <div className="bp-cart-hd">
              <div>
                <div className="bp-cart-title">🛒 RFQ Cart</div>
                <div className="bp-cart-sub">{totalQty} item{totalQty!==1?"s":""} · Bulk Quote Request</div>
              </div>
              <button className="bp-close" onClick={() => setCartOpen(false)}>✕</button>
            </div>
            <div className="bp-cart-body">
              {cart.length === 0 ? (
                <div className="bp-empty">
                  <span>📦</span>
                  <span style={{ fontSize:13,fontWeight:700,color:"var(--text2)" }}>Your RFQ cart is empty</span>
                  <span style={{ fontSize:11,fontWeight:600 }}>Add products to request a bulk quote</span>
                </div>
              ) : cart.map(item => (
                <div className="bp-ci" key={item.id}>
                  <span className="bp-ci-em">{item.emoji}</span>
                  <div className="bp-ci-info">
                    <div className="bp-ci-name">{item.name}</div>
                    <div className="bp-ci-mfr">{item.manufacturer}</div>
                    <div className="bp-ci-bot">
                      <div className="bp-qty">
                        <button className="bp-qbtn" onClick={() => setCart(p => p.map(i => i.id===item.id?{...i,qty:Math.max(1,i.qty-1)}:i))}>−</button>
                        <span className="bp-qnum">{item.qty}</span>
                        <button className="bp-qbtn" onClick={() => setCart(p => p.map(i => i.id===item.id?{...i,qty:i.qty+1}:i))}>+</button>
                        <span style={{ fontSize:9,color:"var(--text3)",fontWeight:700 }}>{item.moqUnit}</span>
                      </div>
                      <span className="bp-ci-price">₹{(item.price*item.qty).toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                  <button className="bp-ci-rm" onClick={() => setCart(p => p.filter(i => i.id!==item.id))}>✕</button>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div className="bp-cart-ft">
                <div className="bp-flag-bar" />
                <div className="bp-total-row">
                  <span className="bp-total-lbl">Estimated Total</span>
                  <span className="bp-total-amt">₹{totalAmt.toLocaleString("en-IN")}</span>
                </div>
                <div className="bp-total-note">Exclusive of GST · Final pricing after supplier confirmation</div>
                <button className="bp-checkout">Send Bulk RFQ to Suppliers →</button>
                <div className="bp-rfq-note">Our sourcing desk responds within 4 business hours</div>
              </div>
            )}
          </div>
        </>)}

        {/* DETAIL MODAL */}
        {modal && (
          <div className="bp-modal-ov" onClick={() => setModal(null)}>
            <div className="bp-modal" onClick={e => e.stopPropagation()}>
              <div className="bp-modal-hero">
                <span className="bp-modal-em">{modal.emoji}</span>
                <div className="bp-modal-hd">
                  <div className="bp-modal-pname">{modal.name}</div>
                  <div className="bp-modal-mfr">🏭 {modal.manufacturer}</div>
                  <div className="bp-modal-certs">{modal.certs.map(c => <span key={c} className="bp-modal-cert">✓ {c}</span>)}</div>
                </div>
                <button className="bp-close" style={{ flexShrink:0 }} onClick={() => setModal(null)}>✕</button>
              </div>
              <div className="bp-modal-body">
                <div className="bp-sec">Manufacturing License</div>
                <div className="bp-lic">
                  <span style={{ fontSize:20 }}>📜</span>
                  <div>
                    <div className="bp-lic-type">{modal.licenseType}</div>
                    <div className="bp-lic-num">{modal.license}</div>
                  </div>
                </div>

                <div className="bp-sec">Factory Address</div>
                <div className="bp-addr"><span>📍</span><span>{modal.address}</span></div>

                <div className="bp-sec">India Manufacturing Depth</div>
                <div className="bp-india-m">
                  <div className="bp-india-big">{modal.indiaPct}%</div>
                  <div>
                    <div className="bp-india-info">Value addition on Indian soil<br/><span style={{ color:"var(--green)",fontWeight:800 }}>{modal.raw}%</span> Indian raw material content</div>
                    <div className="bp-india-note">{modal.rawNote}</div>
                    <div style={{ marginTop:8 }}>
                      <div className="bp-raw-top" style={{ marginBottom:4 }}><span>Raw Material Origin</span><span className="bp-raw-pct">{modal.raw}% Indian</span></div>
                      <div className="bp-raw-track" style={{ height:6 }}><div className="bp-raw-fill" style={{ width:`${modal.raw}%` }} /></div>
                    </div>
                  </div>
                </div>

                <div className="bp-sec">Pricing & MOQ</div>
                <div style={{ display:"flex",alignItems:"baseline",gap:5,marginBottom:7 }}>
                  <span className="bp-price-big">₹{modal.price.toLocaleString("en-IN")}</span>
                  <span className="bp-price-u2">{modal.unit}</span>
                </div>
                <span className="bp-moq-detail">📦 Minimum Order: {modal.moq.toLocaleString()} {modal.moqUnit}</span>
                <div className="bp-tax-row">
                  <span className="bp-tax a">GST {modal.gst}</span>
                  <span className="bp-tax b">HSN {modal.hsn}</span>
                </div>

                <button className={`bp-modal-add${added.has(modal.id)?" ok":""}`} onClick={() => addToCart(modal)}>
                  {added.has(modal.id) ? "✓ Added to RFQ Cart" : "🛒 Add to RFQ Cart"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}