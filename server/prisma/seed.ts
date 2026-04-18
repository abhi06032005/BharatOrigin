import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
// @ts-ignore
const prisma = new PrismaClient({ adapter });

// City centre coordinates (accurate to ~500m)
const CITY_CENTRES: Record<string, { lat: number; lng: number }> = {
  Kolhapur: { lat: 16.7050, lng: 74.2433 },
  Udupi: { lat: 13.3409, lng: 74.7421 },
  Mangalore: { lat: 12.9141, lng: 74.8560 },
  Varanasi: { lat: 25.3176, lng: 82.9739 },
  Jaipur: { lat: 26.9124, lng: 75.7873 },
  Mysore: { lat: 12.2958, lng: 76.6394 },
  Haldwani: { lat: 29.2183, lng: 79.5130 },
  Manali: { lat: 32.2396, lng: 77.1887 },
  Nitte: { lat: 13.1812, lng: 74.9351 },
};

// Small random jitter (±0.01° ≈ ±1.1 km)
const jitter = () => (Math.random() - 0.5) * 0.02;

const ARTISANS = [
  // ─── Kolhapur ───
  { name: "Rajaram Kamble", craftType: "Leather Chappal Maker", city: "Kolhapur", region: "Western Maharashtra", specialty: "Hand-stitched Kolhapuri chappals with vegetal tanning", whyUnique: "5th generation craftsman using century-old buffalo hide techniques; each pair takes 3 days", buyingOptions: "Visit workshop in Shahupuri / Contact via local bazaar", distanceKm: 2.4 },
  { name: "Sulochana Patil", craftType: "Saaj Jewellery Artisan", city: "Kolhapur", region: "Western Maharashtra", specialty: "Traditional bridal necklaces in oxidised gold", whyUnique: "One of the last women trained in royal Kolhapur court jewellery style", buyingOptions: "Weekly craft haat near Mahalakshmi temple", distanceKm: 3.8 },
  { name: "Dnyanoba Jaggery Co.", craftType: "Artisan Jaggery Maker", city: "Kolhapur", region: "Western Maharashtra", specialty: "Single-press organic jaggery cones & powder", whyUnique: "Uses traditional iron cauldrons; zero chemicals; GI-tagged process", buyingOptions: "Farm gate purchase / Local cooperative", distanceKm: 5.1 },
  { name: "Vitthal Masale Udhyog", craftType: "Masala Spice Blender", city: "Kolhapur", region: "Western Maharashtra", specialty: "Hand-ground Tambada & Pandhara Rassa masala", whyUnique: "Stone-ground spices with family recipe over 80 years old", buyingOptions: "Shop in Mahadwar Road", distanceKm: 4.3 },
  { name: "Meera Leather Arts", craftType: "Decorative Leather Craft", city: "Kolhapur", region: "Western Maharashtra", specialty: "Painted leather bags and wall panels", whyUnique: "Blends Warli tribal motifs with Kolhapuri leather—a rare fusion", buyingOptions: "Online via Instagram @meeraleatherarts", distanceKm: 6.2 },

  // ─── Udupi ───
  { name: "Gopal Sthapati", craftType: "Temple Wood Carver", city: "Udupi", region: "Coastal Karnataka", specialty: "Intricate Shilpa Shastra-based door panels & deity frames", whyUnique: "Trained in traditional Vishwakarma craft lineage; work adorns 3 temples in district", buyingOptions: "Workshop near Krishna Math / Commission orders", distanceKm: 1.8 },
  { name: "Manjunath Yaksha Arts", craftType: "Yakshagana Costume Maker", city: "Udupi", region: "Coastal Karnataka", specialty: "Handcrafted Yakshagana headgear (Kireetam) and face masks", whyUnique: "Only craftsman in Udupi making performance-grade traditional Yakshagana accessories by hand", buyingOptions: "Visit studio in Manipal Road / Bulk orders for troupes", distanceKm: 3.2 },
  { name: "Sharada Mritkala", craftType: "Clay Pottery", city: "Udupi", region: "Coastal Karnataka", specialty: "Unglazed cookware & ritual water pots (Ghatam style)", whyUnique: "Her clay sourced exclusively from Sauparnika river bed; slow-fire kiln method", buyingOptions: "Roadside stall near Malpe junction", distanceKm: 4.7 },
  { name: "Bhat Brass Works", craftType: "Temple Brass Craft", city: "Udupi", region: "Coastal Karnataka", specialty: "Deepa stands, Panchapatre, ritual ware for temples", whyUnique: "Supplies brass ware to Sri Krishna Matha; family tradition for 4 generations", buyingOptions: "Shop in Car Street, Udupi", distanceKm: 2.9 },
  { name: "Kamath Masala House", craftType: "Traditional Spice Grinding", city: "Udupi", region: "Coastal Karnataka", specialty: "Stone-ground sambar powder, rasam powder & coconut masala", whyUnique: "Recipes unchanged since 1942; uses century-old stone chakki (grinder)", buyingOptions: "In-store / Ships PAN India", distanceKm: 5.5 },

  // ─── Mangalore ───
  { name: "Pinto Tile Works", craftType: "Terracotta Tile Maker", city: "Mangalore", region: "Coastal Karnataka", specialty: "Hand-pressed traditional Mangalore roof tiles (GI-tagged)", whyUnique: "One of only 3 remaining tile factories using original Portuguese-era clay moulds", buyingOptions: "Factory visit in Bajpe / Bulk supply", distanceKm: 7.1 },
  { name: "Cleto Shell Crafts", craftType: "Coconut Shell Artisan", city: "Mangalore", region: "Coastal Karnataka", specialty: "Decorative bowls, lamps and eco-spoons from coconut shells", whyUnique: "Zero-waste process—uses every part of the coconut; supplies to eco-hotels in Goa", buyingOptions: "Home workshop / Local eco-markets", distanceKm: 3.4 },
  { name: "Aruna Areca Arts", craftType: "Areca Leaf Craft", city: "Mangalore", region: "Coastal Karnataka", specialty: "Biodegradable plates, bowls & food trays from areca palm leaf", whyUnique: "SHG (self-help group) of 12 women; certified by Karnataka Handicrafts", buyingOptions: "Bulk orders for events / Local cooperative store", distanceKm: 5.9 },
  { name: "Hebbar Handlooms", craftType: "Kasavu Fabric Weaver", city: "Mangalore", region: "Coastal Karnataka", specialty: "Gold-border cotton sarees and dhotis for Kerala-Tulu traditions", whyUnique: "Maintains traditional pit-loom weaving; supplies Brahmin ritual garments across coastal Karnataka", buyingOptions: "Showroom in Hampankatta", distanceKm: 4.2 },
  { name: "Saji's Spice Corner", craftType: "Artisan Spice Blender", city: "Mangalore", region: "Coastal Karnataka", specialty: "Kori Rotti masala, fish curry powder and coconut milk spices", whyUnique: "Blends roasted on wood-fire; original Tulu community recipes from 1960s", buyingOptions: "Market stall Bunder Road / Online", distanceKm: 2.7 },

  // ─── Varanasi ───
  { name: "Ustad Javed Ansari", craftType: "Banarasi Silk Weaver", city: "Varanasi", region: "Uttar Pradesh", specialty: "Kadhua weave Banarasi sarees with pure zari", whyUnique: "National Award winner; his kadhua technique has 2,000 weft threads per inch", buyingOptions: "Pit loom workshop in Madanpura / Commission orders", distanceKm: 1.5 },
  { name: "Ram Murti Lacwork", craftType: "Wooden Lac Toy Maker", city: "Varanasi", region: "Uttar Pradesh", specialty: "Turned wooden toys painted with lac in traditional Varanasi style", whyUnique: "3rd generation craftsman; supplies to Crafts Museum Delhi and UNESCO exhibitions", buyingOptions: "Showroom near Chowk / Online via Gaatha.com", distanceKm: 3.6 },
  { name: "Girija Devi Silk Weaves", craftType: "Brocade Fabric Weaver", city: "Varanasi", region: "Uttar Pradesh", specialty: "Tissue silk dupattas and shawls with floral meenakari motifs", whyUnique: "Female weaving collective—rare in Banarasi trade; specialises in lightweight tissue brocade", buyingOptions: "Workshop in Shivala / Direct sale", distanceKm: 2.1 },
  { name: "Pandit Brass Emporium", craftType: "Temple Brass Caster", city: "Varanasi", region: "Uttar Pradesh", specialty: "Lost-wax cast brass idols and ritual implements", whyUnique: "Uses ancient Dhokra-influenced lost-wax casting rare in UP; supplies major temples", buyingOptions: "Shop near Dashashwamedh Ghat", distanceKm: 4.8 },
  { name: "Meera Zari Studio", craftType: "Zari Thread Embroiderer", city: "Varanasi", region: "Uttar Pradesh", specialty: "Pure gold zari embroidery on silk for bridal wear", whyUnique: "Handspun zari using real gold strips; one of the last studios to not use machine-twisted thread", buyingOptions: "Studio in Bengali Tola / Commission work", distanceKm: 3.0 },

  // ─── Jaipur ───
  { name: "Gopal Krishan Khatre", craftType: "Blue Pottery Artist", city: "Jaipur", region: "Rajasthan", specialty: "Handcrafted Quartz-based blue pottery with Persian motifs", whyUnique: "Padma Shri lineage workshop; uses zero clay—100% quartz paste, rare Jaipur blue pottery tradition", buyingOptions: "Studio in Sanganer / Ships worldwide", distanceKm: 4.5 },
  { name: "Anokhi Block Printers", craftType: "Hand Block Printing", city: "Jaipur", region: "Rajasthan", specialty: "Sanganeri & Bagru natural dye block printing on cotton", whyUnique: "Uses only vegetable dyes; employs 40+ local craftsmen; export to Europe", buyingOptions: "Retail in C-Scheme / Online", distanceKm: 6.3 },
  { name: "Surendra Meenakari Works", craftType: "Meenakari Jeweller", city: "Jaipur", region: "Rajasthan", specialty: "Peacock motif enamel work on gold & silver jewellery", whyUnique: "5th generation Soni craftsman; pioneered 5-colour Meenakari on white gold", buyingOptions: "Johari Bazaar showroom", distanceKm: 2.8 },
  { name: "Kishori Lac Arts", craftType: "Lac Bangle Maker", city: "Jaipur", region: "Rajasthan", specialty: "Traditional lac bangles with mirrorwork and gold foil inlay", whyUnique: "Handrolled lac on iron mandrels — one of the few artisans not using machine pressing", buyingOptions: "Maniharon ka Rasta, old city", distanceKm: 3.1 },
  { name: "Ramdev Miniature Studio", craftType: "Miniature Painter", city: "Jaipur", region: "Rajasthan", specialty: "Mughal and Rajput court scenes on camel bone & silk", whyUnique: "Uses squirrel-hair brushes and stone-ground natural pigments; state award winner", buyingOptions: "Galerie in Tripolia Bazaar / Commission", distanceKm: 5.0 },

  // ─── Mysore ───
  { name: "Karnataka Silk Industries (Master Weaver Block)", craftType: "Silk Weaver", city: "Mysore", region: "Karnataka", specialty: "Pure Mysore crepe silk sarees with zari borders", whyUnique: "GI-tagged Mysore silk; government master weavers use original Jacquard looms from 1912", buyingOptions: "Showroom in Mananthody Road / Online", distanceKm: 2.2 },
  { name: "Shivanna Sandal Arts", craftType: "Sandalwood Carver", city: "Mysore", region: "Karnataka", specialty: "Miniature temple gopurams and deity figures in sandalwood", whyUnique: "Uses Mysore-region red sandalwood (Raktha Chandan); carves without power tools", buyingOptions: "Workshop near Mysore Zoo / Devaraja Market", distanceKm: 3.7 },
  { name: "Agarbatti Artisan Collective", craftType: "Incense Stick Maker", city: "Mysore", region: "Karnataka", specialty: "Hand-rolled Jasmine, Sandalwood & Vetiver agarbattis", whyUnique: "Traditional rolling method; uses locally sourced bamboo sticks and natural resin binders", buyingOptions: "Cooperative store in Lakshmipuram", distanceKm: 4.9 },
  { name: "Rosewood Inlay Masters", craftType: "Inlay Wood Artisan", city: "Mysore", region: "Karnataka", specialty: "Rosewood boxes with ivory-style plastic and bone inlay", whyUnique: "Maintains ethical inlay craft using synthetic ivory post-1992 ban—indistinguishable from original", buyingOptions: "Shop in Sayyaji Rao Road", distanceKm: 5.6 },
  { name: "Ganjifa Art Revival Studio", craftType: "Ganjifa Card Painter", city: "Mysore", region: "Karnataka", specialty: "Circular playing cards hand-painted with Dashavatara themes", whyUnique: "One of only 2 Ganjifa artists in Karnataka; hand-paints 96-card sets on cloth", buyingOptions: "Home studio visits by appointment", distanceKm: 6.8 },

  // ─── Haldwani ───
  { name: "Kamla Devi Aipan Studio", craftType: "Aipan Folk Art Painter", city: "Haldwani", region: "Uttarakhand", specialty: "Ritual Aipan paintings on paper and fabric for festivals", whyUnique: "Trained by her grandmother; only artisan creating Aipan on silk—a rare modern adaptation", buyingOptions: "Home workshop / Sold at Uttarakhand Utsav fairs", distanceKm: 2.6 },
  { name: "Ringaal Craft Collective", craftType: "Bamboo Weaver", city: "Haldwani", region: "Uttarakhand", specialty: "Traditional Ringaal baskets, furniture and storage ware", whyUnique: "SHG from Bindukhatta village; uses high-altitude Ringaal bamboo harvested sustainably", buyingOptions: "Local cooperative / NABARD craft fair", distanceKm: 5.4 },
  { name: "Buransh Naturals", craftType: "Herbal Product Artisan", city: "Haldwani", region: "Uttarakhand", specialty: "Rhododendron squash, jam, wine and dried flower crafts", whyUnique: "Sources flowers from 2,000m altitude Kumaon forests; no preservatives; GI process underway", buyingOptions: "Kaladhungi Road stall / Instagram direct", distanceKm: 3.9 },
  { name: "Pahadi Bunai Centre", craftType: "Woollen Shawl Weaver", city: "Haldwani", region: "Uttarakhand", specialty: "Hand-spun Merino-Pashmina blend shawls with Kumaoni border", whyUnique: "Women's weaving centre; sheep herded at Munsiyari; entire supply chain within 200km", buyingOptions: "Showroom near Bus Stand", distanceKm: 4.2 },
  { name: "Tamra Kala Copper Works", craftType: "Copperware Smith", city: "Haldwani", region: "Uttarakhand", specialty: "Handbeaten copper kalash, thali sets and water vessels", whyUnique: "Uses traditional hammering on wooden forms; copper sourced from Almora smelters", buyingOptions: "Shop in Bhotia Parao market", distanceKm: 6.7 },

  // ─── Manali ───
  { name: "Shanta Devi Kullu Shawls", craftType: "Kullu Shawl Weaver", city: "Manali", region: "Himachal Pradesh", specialty: "GI-tagged Kullu shawls with traditional geometric dhar border", whyUnique: "Uses backstrap loom (khaddi); her shawls featured in Crafts of India book by Kamaladevi Chattopadhyay", buyingOptions: "Home loom / Dhungri market stall", distanceKm: 3.3 },
  { name: "Ramesh Pattu Weaves", craftType: "Pattu Fabric Artisan", city: "Manali", region: "Himachal Pradesh", specialty: "Heavy woollen Pattu fabric for traditional Himachali dress", whyUnique: "Only weaver in Manali maintaining the patta loom (4-shaft ground loom) for pattu production", buyingOptions: "Workshop in Old Manali / Supply to local tailors", distanceKm: 5.2 },
  { name: "Himachali Knitwear Women's Co-op", craftType: "Hand-Knitted Woollens", city: "Manali", region: "Himachal Pradesh", specialty: "Traditional patterned caps, socks, and fingerless gloves", whyUnique: "150+ women artisans; patterns unique to different Kullu villages—a wearable tribal map", buyingOptions: "Mall Road stalls / Online via HimKraft", distanceKm: 2.0 },
  { name: "Deodar Wood Craft Studio", craftType: "Deodar Wood Carver", city: "Manali", region: "Himachal Pradesh", specialty: "Hand-carved walking sticks, temple miniatures and animal figures", whyUnique: "Uses sustainably fallen Deodar cedar—the sacred wood of Himachal; carves without power tools", buyingOptions: "Studio near Hadimba Temple", distanceKm: 4.6 },
  { name: "Alpine Herb Oils", craftType: "Herbal Oil Distiller", city: "Manali", region: "Himachal Pradesh", specialty: "Steam-distilled Lavender, Thyme and Pine needle essential oils", whyUnique: "Wild-crafted from Rohtang Pass meadows; one of only 2 certified distilleries in HP", buyingOptions: "Farm store / Ships PAN India", distanceKm: 7.3 },

  // ─── Nitte ───
  {
    "name": "SRI LAKSHMI SHILPAKALA",
    "craftType": "Granite Stone Sculpting",
    "city": "Karkala",
    "region": "Coastal Karnataka",
    "specialty": "Black granite deity idols and architectural pillars",
    "whyUnique": "Expert sculptors continuing the Jain heritage of Karkala; located near the historic Gomateshwara hub.",
    "buyingOptions": "Workshop at Tellar Road, Karkala",
    "distanceKm": 9.7
  },
  {
    "name": "Siri Dharmasthala Store",
    "craftType": "Handloom and Crafts Weaver",
    "city": "Nitte Belt",
    "region": "Coastal Karnataka",
    "specialty": "Udupi-style sarees and rural artisan products",
    "whyUnique": "Reviving the endangered Udupi weaving style; operated as a major regional cooperative.",
    "buyingOptions": "Direct outlet on Nitte-Karkala Road",
    "distanceKm": 1.2
  },
  {
    "name": "C E Kamath Institute for Artisans",
    "craftType": "Traditional Wood & Stone Crafts",
    "city": "Miyar",
    "region": "Coastal Karnataka",
    "specialty": "Carved wooden items and architectural stone work",
    "whyUnique": "A training institute and workshop dedicated to preserving regional Tuluva craftsmanship.",
    "buyingOptions": "Direct workshop at Miyar Bridge",
    "distanceKm": 11.5
  }
];

async function main() {
  console.log("🌱 Seeding artisans with geo-coordinates...");

  // Clear existing artisans to avoid duplicates on re-run
  await (prisma.artisan as any).deleteMany({});
  console.log("  ✓ Cleared existing artisan rows");

  for (const a of ARTISANS) {
    const centre = CITY_CENTRES[a.city];
    if (!centre) {
      console.warn(`  ⚠ No coordinates for city: ${a.city}`);
      continue;
    }

    await (prisma.artisan as any).create({
      data: {
        name: a.name,
        craftType: a.craftType,
        city: a.city,
        region: a.region,
        specialty: a.specialty,
        whyUnique: a.whyUnique,
        buyingOptions: a.buyingOptions,
        latitude: centre.lat + jitter(),
        longitude: centre.lng + jitter(),
        bharatScore: 100,
      },
    });
  }

  console.log(`  ✓ Seeded ${ARTISANS.length} artisans across ${Object.keys(CITY_CENTRES).length} cities`);
  await prisma.$disconnect();
  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
