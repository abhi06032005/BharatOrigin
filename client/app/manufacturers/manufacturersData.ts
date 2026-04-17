import { 
  ShoppingBag, 
  Palette, 
  Hammer, 
  Leaf, 
  Lightbulb, 
  Grape 
} from 'lucide-react';

export interface CategoryMetadata {
  id: string;
  label: string;
  icon: any;
  description: string;
}

export const CATEGORIES: CategoryMetadata[] = [
  { id: 'Textiles & Fabrics', label: 'Textiles & Fabrics', icon: ShoppingBag, description: 'Premium Indian handloom and textiles' },
  { id: 'Toys & Games', label: 'Toys & Games', icon: Hammer, description: 'Traditional and educational toys' },
  { id: 'Ayurvedic & Pharma', label: 'Ayurvedic & Pharma', icon: Leaf, description: 'Authentic Ayurvedic wellness products' },
  { id: 'Electronics', label: 'Electronics', icon: Lightbulb, description: 'Indian-made electronics and lighting' },
  { id: 'Agri & Food', label: 'Agri & Food', icon: Grape, description: 'Native agriculture and food items' },
];

export interface Manufacturer {
  id: string;
  emoji: string;
  name: string;
  location: string;
  state: string;
  founded: string;
  employees: number;
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
  annualCapacity: string;
  exportReady: boolean;
  leadTime: string;
  paymentTerms: string;
  story: string;
  contactPerson: string;
  phone: string;
  rating: number;
  ordersCompleted: number;
  product: string;
  category: string;
  features: string[]; // Consolidating tags, certs, and speciality
}

export const MANUFACTURERS: Manufacturer[] = [
  {
    id: 't1', emoji: '🥻', category: 'Textiles & Fabrics', product: 'Pure Khadi Cotton Fabric — White (Per Metre)',
    name: 'Sabarmati Khadi Mills Pvt. Ltd.', location: 'Ahmedabad', state: 'Gujarat', founded: '1952',
    employees: 340, contactPerson: 'Mr. Rajesh Patel', phone: '+91 79 2658 4421',
    license: 'MSME/GJ/2018/04421', licenseType: 'MSME Manufacturing License',
    address: 'Plot 14, GIDC Phase II, Ahmedabad, Gujarat – 382 445',
    indiaPct: 100, raw: 98, rawNote: 'Long-staple cotton from Saurashtra farmers; natural scouring agents',
    price: 85, unit: 'per metre', moq: 500, moqUnit: 'metres', gst: '5%', hsn: '5208.11',
    annualCapacity: '2.4 lakh metres/year', exportReady: true, leadTime: '15–20 days',
    paymentTerms: '50% advance, 50% before dispatch',
    features: ['100% India Made', 'Khadi', 'Eco-Friendly', 'Khadi India Certified', 'OEKO-TEX Standard 100', 'Handspun Khadi with natural dyes'],
    story: "Founded in 1952 by freedom fighter Manubhai Patel, Sabarmati Khadi Mills has been a cornerstone of India's cottage textile industry. Employing over 340 weavers, mostly rural women.",
    rating: 4.8, ordersCompleted: 1240,
  },
  {
    id: 't2', emoji: '🌸', category: 'Textiles & Fabrics', product: 'Jaipuri Block-Printed Cotton — 6-Colour (Per Metre)',
    name: 'Rajputana Prints & Weaves', location: 'Jaipur', state: 'Rajasthan', founded: '1989',
    employees: 120, contactPerson: 'Ms. Sunita Verma', phone: '+91 141 2370 882',
    license: 'UAM/RJ/24/0003827', licenseType: 'Udyam Registration',
    address: 'Sanganer Industrial Area, Jaipur, Rajasthan – 302 029',
    indiaPct: 100, raw: 90, rawNote: 'Cotton from MP; AZO-free natural dyes from Ahmedabad',
    price: 145, unit: 'per metre', moq: 300, moqUnit: 'metres', gst: '5%', hsn: '5208.52',
    annualCapacity: '1.8 lakh metres/year', exportReady: true, leadTime: '10–14 days',
    paymentTerms: '30% advance, balance on delivery',
    features: ['Hand-printed', 'Natural Dyes', 'GI Eligible', 'RJ Handicrafts Board Certified', '6-pass hand block printing'],
    story: "Rajputana Prints was born out of a family trade in Sanganer, the hub of Jaipur's block-printing heritage. Third-generation owned enterprise.",
    rating: 4.7, ordersCompleted: 890,
  },
  {
    id: 't3', emoji: '✨', category: 'Textiles & Fabrics', product: 'Banarasi Brocade Silk Fabric (Per Metre)',
    name: 'Kashi Silk Handloom Co-operative', location: 'Varanasi', state: 'Uttar Pradesh', founded: '1971',
    employees: 620, contactPerson: 'Mr. Awadhesh Kumar', phone: '+91 542 2415 993',
    license: 'HNDLM/UP/BNS/2020/0178', licenseType: 'Handloom Cooperative License',
    address: 'Lallapura, Varanasi, Uttar Pradesh – 221 010',
    indiaPct: 100, raw: 85, rawNote: 'Karnataka mulberry silk; Surat gold zari; domestic dyes',
    price: 1850, unit: 'per metre', moq: 50, moqUnit: 'metres', gst: '5%', hsn: '5007.20',
    annualCapacity: '40,000 metres/year', exportReady: true, leadTime: '25–35 days',
    paymentTerms: '40% advance, 60% on completion',
    features: ['GI Tagged', 'Heritage Craft', 'Cooperative', 'GI Tag – Banarasi Silk', 'Silk Mark India', 'Zari brocade with traditional Mughal motifs'],
    story: 'Established in 1971 as a cooperative of 620 weavers from the legendary weaving families of Varanasi, preserving 500-year-old tradition.',
    rating: 4.9, ordersCompleted: 2100,
  },
  {
    id: 'toy1', emoji: '🪆', category: 'Toys & Games', product: 'Channapatna Lacquered Wooden Toys — Set of 10',
    name: 'Karnataka Toy Craft Cluster LLP', location: 'Channapatna', state: 'Karnataka', founded: '2008',
    employees: 85, contactPerson: 'Mr. Suresh Gowda', phone: '+91 8110 254 321',
    license: 'MSME/KA/2016/09882', licenseType: 'MSME Manufacturing License',
    address: 'Channapatna, Ramanagara District, Karnataka – 562 160',
    indiaPct: 100, raw: 95, rawNote: 'Ivory wood (Hale tree) & vegetable lacquer sourced locally',
    price: 480, unit: 'per set', moq: 100, moqUnit: 'sets', gst: '12%', hsn: '9503.00',
    annualCapacity: '50,000 sets/year', exportReady: true, leadTime: '12–18 days',
    paymentTerms: '50% advance before production',
    features: ['GI Tagged', 'Child Safe', 'Eco-Friendly', 'BIS IS:9873', 'GI Tag – Channapatna Toys', 'Vegetable lacquer finish, non-toxic and child-safe'],
    story: 'Channapatna, "Toy Town of India", has been crafting lacquered wooden toys for 200+ years under royal patronage.',
    rating: 4.9, ordersCompleted: 3200,
  },
  {
    id: 'ay1', emoji: '🫚', category: 'Ayurvedic & Pharma', product: 'Cold-Pressed Virgin Coconut Oil — Food Grade (1L)',
    name: 'Kerala Naturals Oils Pvt. Ltd.', location: 'Palakkad', state: 'Kerala', founded: '2003',
    employees: 180, contactPerson: 'Dr. Maya Nambiar', phone: '+91 491 252 8840',
    license: 'AYUSH/KL/MFG/2017/CNL-0821', licenseType: 'AYUSH Manufacturing License',
    address: 'Palakkad Agro Processing Zone, Palakkad, Kerala – 678 001',
    indiaPct: 100, raw: 100, rawNote: '100% Kerala coconuts; zero imported inputs',
    price: 185, unit: 'per litre', moq: 500, moqUnit: 'litres', gst: '0%', hsn: '1513.11',
    annualCapacity: '3 lakh litres/year', exportReady: true, leadTime: '7–10 days',
    paymentTerms: 'Immediate or net-30 for verified',
    features: ['100% India Made', 'Organic', 'Zero Imports', 'FSSAI Licensed', 'AGMARK Grade A', 'Organic India', 'Cold-press extracted at < 40°C'],
    story: 'Founded by Dr. Maya Nambiar, processing coconuts exclusively from traditional Kerala farms within 50km.',
    rating: 4.9, ordersCompleted: 4800,
  },
  {
    id: 'ay3', emoji: '🍵', category: 'Ayurvedic & Pharma', product: 'Ashwagandha Root Powder KSM-66 (1 kg)',
    name: 'Ixoreal Biomed Pvt. Ltd.', location: 'Hyderabad', state: 'Telangana', founded: '1988',
    employees: 450, contactPerson: 'Mr. Kartikeya Rao', phone: '+91 40 2304 5900',
    license: 'AYUSH/TL/MFG/2014/ABP-0063', licenseType: 'AYUSH Herbal License',
    address: 'IDA Mallapur, Hyderabad, Telangana – 500 076',
    indiaPct: 100, raw: 100, rawNote: 'Withania somnifera from Rajasthan tribal farms',
    price: 1450, unit: 'per kg', moq: 25, moqUnit: 'kg', gst: '5%', hsn: '1211.90',
    annualCapacity: '800 MT/year', exportReady: true, leadTime: '5–8 days',
    paymentTerms: 'Net-30 for bulk; prepaid for spot',
    features: ['Premium', 'Certified', 'Export Ready', 'AYUSH Premium Mark', 'Kosher & Halal', 'Non-GMO Project', 'KSM-66 with 5% withanolides'],
    story: 'Ixoreal Biomed pioneered the KSM-66 standardized Ashwagandha extract, now sold in 50+ countries.',
    rating: 5.0, ordersCompleted: 6200,
  },
  {
    id: 'el1', emoji: '💡', category: 'Electronics', product: '9W LED Bulb — Cool White B22 Base',
    name: 'Halonix Technologies Pvt. Ltd.', location: 'Gurugram', state: 'Haryana', founded: '1991',
    employees: 1200, contactPerson: 'Mr. Gaurav Suri', phone: '+91 124 450 3232',
    license: 'BIS/DL/ELE/2016/HAL-0219', licenseType: 'BIS Manufacturing License',
    address: 'Plot 51, IMT Manesar, Gurugram, Haryana – 122 050',
    indiaPct: 92, raw: 60, rawNote: 'Aluminium housing from Rajkot; LED chips partially from Taiwan',
    price: 42, unit: 'per bulb', moq: 1000, moqUnit: 'bulbs', gst: '12%', hsn: '8539.50',
    annualCapacity: '8 crore bulbs/year', exportReady: false, leadTime: '3–5 days',
    paymentTerms: 'LC or advance for new buyers',
    features: ['PLI Scheme', 'Energy Star', 'BIS Certified', 'BIS IS:16102', 'BEE 5-Star', 'PLI Scheme', 'BEE 5-star rated, 25,000 hr life'],
    story: "One of India's largest LED lighting manufacturers and key PLI-scheme beneficiary with 3 plants.",
    rating: 4.6, ordersCompleted: 12400,
  },
  {
    id: 'ag1', emoji: '🌾', category: 'Agri & Food', product: 'Premium 1121 Sella Basmati Rice (25 kg Bag)',
    name: 'KRBL Ltd. – India Gate Division', location: 'Alipur', state: 'Delhi', founded: '1889',
    employees: 3800, contactPerson: 'Mr. Anoop Kumar Gupta', phone: '+91 11 4211 8800',
    license: 'FSSAI/UP/FBO/2009/KRB-0001', licenseType: 'FSSAI Central License',
    address: 'Alipur, Delhi – 110 036 (Mill: Dhuri, Punjab – 148 024)',
    indiaPct: 100, raw: 100, rawNote: 'Paddy from Haryana & Punjab farmers',
    price: 2200, unit: 'per 25 kg bag', moq: 50, moqUnit: 'bags', gst: '5%', hsn: '1006.30',
    annualCapacity: '8 lakh MT/year', exportReady: true, leadTime: '2–3 days',
    paymentTerms: 'Standard B2B credit terms',
    features: ['GI Tagged', 'Heritage Brand', 'Export Leader', 'APEDA Registered', 'GI Tag – Basmati', 'ISO 22000', 'Aged 2 years minimum; 8.4mm grain length'],
    story: "Founded in 1889, KRBL is Asia's largest Basmati rice miller. Exports to 90+ countries with direct farm procurement.",
    rating: 4.9, ordersCompleted: 85000,
  },
  {
    id: 'ag3', emoji: '🍯', category: 'Agri & Food', product: 'Raw Himalayan Multifloral Honey (30 kg Drum)',
    name: 'National Bee Board Cooperative, Himachal', location: 'Solan', state: 'Himachal Pradesh', founded: '2004',
    employees: 220, contactPerson: 'Mr. Prakash Sharma', phone: '+91 1792 228 431',
    license: 'FSSAI/HP/FBO/2018/NBB-0033', licenseType: 'FSSAI Central License',
    address: 'Solan Beekeeping Cluster, Solan, Himachal Pradesh – 173 212',
    indiaPct: 100, raw: 100, rawNote: 'Single-origin from Kullu-Manali altitude forests',
    price: 4800, unit: 'per 30 kg drum', moq: 20, moqUnit: 'drums', gst: '0%', hsn: '0409.00',
    annualCapacity: '1,200 MT/year', exportReady: true, leadTime: '10–15 days',
    paymentTerms: 'Full advance for first order; net-30 after',
    features: ['0% GST', 'Organic', 'Mountain Sourced', 'National Bee Board Certified', 'FSSAI Premium', 'Non-GMO', 'HMF < 10 mg/kg from 2,500m+ altitude'],
    story: 'Operating from pristine Kullu-Manali forests, this cooperative of 220 beekeepers is certified by the National Bee Board.',
    rating: 5.0, ordersCompleted: 2800,
  },
];
