export interface ForeignBrandMatch {
  foreign: string;
  country: string;
  logo: string; // emoji
  category: string;
  indianBrands: {
    name: string;
    why: string;
    categories: string[]; // matching product categories in our DB
    searchTerms: string[]; // terms to filter products
  }[];
  funFact: string;
}

export const FOREIGN_BRAND_MAP: ForeignBrandMatch[] = [
  // ── Footwear ──
  {
    foreign: 'nike',
    country: 'USA',
    logo: '🇺🇸',
    category: 'Footwear',
    indianBrands: [
      { name: 'Campus', why: '50M+ shoes sold yearly, India\'s #1 sports shoe brand', categories: ['Footwear'], searchTerms: ['campus'] },
      { name: 'Woodland', why: 'Premium leather & outdoor shoes, proudly Indian since 1992', categories: ['Footwear'], searchTerms: ['woodland'] },
      { name: 'Sparx', why: 'Budget sports shoes with 10K+ stores across India', categories: ['Footwear'], searchTerms: ['sparx'] },
      { name: 'Liberty', why: 'India\'s largest footwear company, 6000 Cr+ revenue', categories: ['Footwear'], searchTerms: ['liberty'] },
    ],
    funFact: '₹25,000 Cr leaves India annually for foreign shoe brands. Indian brands offer same quality at 40-60% less!',
  },
  {
    foreign: 'adidas',
    country: 'Germany',
    logo: '🇩🇪',
    category: 'Footwear',
    indianBrands: [
      { name: 'Campus', why: 'India\'s fastest growing sports shoe brand', categories: ['Footwear'], searchTerms: ['campus'] },
      { name: 'Red Tape', why: 'Premium casual & sports shoes, global Indian brand', categories: ['Footwear'], searchTerms: ['red tape'] },
      { name: 'Sparx', why: 'Affordable sporty shoes loved by 10M+ Indians', categories: ['Footwear'], searchTerms: ['sparx'] },
    ],
    funFact: 'Campus Shoes grew 40% YoY, proving Indians prefer quality homegrown brands!',
  },
  {
    foreign: 'puma',
    country: 'Germany',
    logo: '🇩🇪',
    category: 'Footwear',
    indianBrands: [
      { name: 'Campus', why: 'Trendy designs rivaling global brands', categories: ['Footwear'], searchTerms: ['campus'] },
      { name: 'Woodland', why: 'Adventure-ready shoes with genuine leather', categories: ['Footwear'], searchTerms: ['woodland'] },
      { name: 'Liberty', why: 'Comfort-first walking & running shoes', categories: ['Footwear'], searchTerms: ['liberty'] },
    ],
    funFact: 'Liberty Shoes employs 6000+ Indian artisans and exports to 25 countries!',
  },
  {
    foreign: 'reebok',
    country: 'USA',
    logo: '🇺🇸',
    category: 'Footwear',
    indianBrands: [
      { name: 'Campus', why: 'Performance running shoes at half the price', categories: ['Footwear'], searchTerms: ['campus'] },
      { name: 'Red Tape', why: 'Premium athleisure at Indian prices', categories: ['Footwear'], searchTerms: ['red tape'] },
    ],
    funFact: 'Red Tape started in Agra and now sells in 20+ countries worldwide!',
  },
  {
    foreign: 'skechers',
    country: 'USA',
    logo: '🇺🇸',
    category: 'Footwear',
    indianBrands: [
      { name: 'Liberty Gliders', why: 'Air cushion tech walking shoes, ultra-comfortable', categories: ['Footwear'], searchTerms: ['liberty'] },
      { name: 'Campus', why: 'Memory foam insoles, lightweight daily shoes', categories: ['Footwear'], searchTerms: ['campus'] },
    ],
    funFact: 'Liberty Gliders uses the same air-cushion tech at 50% lower price!',
  },
  // ── Clothing ──
  {
    foreign: 'zara',
    country: 'Spain',
    logo: '🇪🇸',
    category: 'Clothing',
    indianBrands: [
      { name: 'FabIndia', why: 'Handloom garments supporting 40,000+ artisans', categories: ['Textiles'], searchTerms: ['fabindia', 'handwoven', 'handloom'] },
      { name: 'W (TCNS)', why: 'Ethnic-fusion designer wear for modern India', categories: ['Textiles'], searchTerms: ['kurta', 'kurti'] },
      { name: 'Khadi India', why: 'Gandhiji\'s legacy — pure hand-spun, sustainable fashion', categories: ['Textiles'], searchTerms: ['khadi'] },
    ],
    funFact: 'FabIndia is India\'s largest private platform for handloom products, with 300+ stores!',
  },
  {
    foreign: 'h&m',
    country: 'Sweden',
    logo: '🇸🇪',
    category: 'Clothing',
    indianBrands: [
      { name: 'FabIndia', why: 'Sustainable fashion from Indian artisans', categories: ['Textiles'], searchTerms: ['fabindia', 'handwoven'] },
      { name: 'Allen Solly', why: 'Smart casuals by the Aditya Birla Group', categories: ['Textiles'], searchTerms: ['allen'] },
    ],
    funFact: 'India\'s textile industry employs 45M+ people — every Indian brand purchase creates local jobs!',
  },
  {
    foreign: 'uniqlo',
    country: 'Japan',
    logo: '🇯🇵',
    category: 'Clothing',
    indianBrands: [
      { name: 'Khadi India', why: 'Hand-spun cotton shirts — breathable & sustainable', categories: ['Textiles'], searchTerms: ['khadi'] },
      { name: 'FabIndia', why: 'Minimalist Indian designs with quality fabrics', categories: ['Textiles'], searchTerms: ['fabindia'] },
    ],
    funFact: 'Khadi sales crossed ₹1.15 Lakh Cr in 2023 — the silent Swadeshi revolution!',
  },
  // ── Electronics ──
  {
    foreign: 'apple',
    country: 'USA',
    logo: '🇺🇸',
    category: 'Electronics',
    indianBrands: [
      { name: 'boAt', why: 'India\'s #1 audio brand, ₹3000 Cr revenue, 50% market share', categories: ['Technology'], searchTerms: ['boat'] },
      { name: 'Noise', why: '#1 Indian smartwatch brand with BT calling', categories: ['Technology'], searchTerms: ['noise'] },
      { name: 'Fire-Boltt', why: 'AMOLED smartwatches at disruptive prices', categories: ['Technology'], searchTerms: ['fire-boltt'] },
    ],
    funFact: 'boAt overtook Apple & Samsung in wearables market share in India!',
  },
  {
    foreign: 'samsung',
    country: 'South Korea',
    logo: '🇰🇷',
    category: 'Electronics',
    indianBrands: [
      { name: 'boAt', why: 'Earbuds, speakers & wearables — India\'s own tech brand', categories: ['Technology'], searchTerms: ['boat'] },
      { name: 'Noise', why: 'Smart wearables with 10M+ devices sold', categories: ['Technology'], searchTerms: ['noise'] },
    ],
    funFact: 'Noise and boAt together hold 50%+ of India\'s wearables market!',
  },
  {
    foreign: 'sony',
    country: 'Japan',
    logo: '🇯🇵',
    category: 'Electronics',
    indianBrands: [
      { name: 'boAt', why: 'Crystal Bionic Sound, designed in India for Indian ears', categories: ['Technology'], searchTerms: ['boat'] },
    ],
    funFact: 'boAt was bootstrapped by two Indians and became a ₹3000 Cr brand in just 8 years!',
  },
  {
    foreign: 'jbl',
    country: 'USA',
    logo: '🇺🇸',
    category: 'Electronics',
    indianBrands: [
      { name: 'boAt', why: '42H playtime earbuds + ENx noise cancellation', categories: ['Technology'], searchTerms: ['boat'] },
    ],
    funFact: 'boAt sold 75M+ devices in India — more than JBL & Sony combined in the Indian market!',
  },
  // ── Beauty ──
  {
    foreign: 'loreal',
    country: 'France',
    logo: '🇫🇷',
    category: 'Beauty',
    indianBrands: [
      { name: 'Forest Essentials', why: 'Luxury Ayurvedic skincare with 24K gold formulas', categories: ['Wellness', 'Beauty & Wellness'], searchTerms: ['forest essentials'] },
      { name: 'Mamaearth', why: 'Toxin-free, certified safe, ₹2000 Cr brand', categories: ['Wellness'], searchTerms: ['mamaearth'] },
      { name: 'Biotique', why: '100% botanical extracts, no SLS/parabens', categories: ['Wellness'], searchTerms: ['biotique'] },
    ],
    funFact: 'Forest Essentials uses ancient Ayurvedic recipes (5000+ years old) that L\'Oréal can never replicate!',
  },
  {
    foreign: 'dove',
    country: 'UK',
    logo: '🇬🇧',
    category: 'Beauty',
    indianBrands: [
      { name: 'Mamaearth', why: 'Made Safe certified, 100% toxin-free personal care', categories: ['Wellness'], searchTerms: ['mamaearth'] },
      { name: 'Biotique', why: 'Himalayan botanical expertise, zero chemicals', categories: ['Wellness'], searchTerms: ['biotique'] },
    ],
    funFact: 'Mamaearth became India\'s first unicorn in personal care — proving India can build world-class beauty brands!',
  },
  // ── Food & Beverages ──
  {
    foreign: 'coca cola',
    country: 'USA',
    logo: '🇺🇸',
    category: 'Food',
    indianBrands: [
      { name: 'Paper Boat', why: 'Nostalgic Indian drinks with zero artificial flavors', categories: ['Food & Spices', 'Food & Beverages'], searchTerms: ['paper boat'] },
    ],
    funFact: 'Paper Boat\'s Aam Panna outsells cola drinks in many Indian airports!',
  },
  {
    foreign: 'pepsi',
    country: 'USA',
    logo: '🇺🇸',
    category: 'Food',
    indianBrands: [
      { name: 'Paper Boat', why: 'Traditional Indian beverages — Aam Panna, Jaljeera & more', categories: ['Food & Spices', 'Food & Beverages'], searchTerms: ['paper boat'] },
    ],
    funFact: 'India has 50+ traditional beverages that no foreign brand can replicate!',
  },
  {
    foreign: 'starbucks',
    country: 'USA',
    logo: '🇺🇸',
    category: 'Food',
    indianBrands: [
      { name: 'Organic India', why: 'Premium organic teas from Lucknow, exported to 40 countries', categories: ['Food & Spices'], searchTerms: ['organic', 'tea'] },
    ],
    funFact: 'India produces 1.4B kg of tea/year — Darjeeling tea is called the Champagne of Teas worldwide!',
  },
  // ── Home ──
  {
    foreign: 'ikea',
    country: 'Sweden',
    logo: '🇸🇪',
    category: 'Home',
    indianBrands: [
      { name: 'FabIndia', why: 'Hand-crafted home décor by Indian artisans', categories: ['Home & Living', 'Pottery', 'Handicrafts'], searchTerms: ['fabindia', 'handcraft'] },
      { name: 'Milton', why: 'India\'s #1 home & kitchen brand', categories: ['Home & Living'], searchTerms: ['milton'] },
    ],
    funFact: 'India\'s handicraft exports are worth ₹37,000 Cr+ — artisan-made is the real luxury!',
  },
  // ── Bags ──
  {
    foreign: 'gucci',
    country: 'Italy',
    logo: '🇮🇹',
    category: 'Bags',
    indianBrands: [
      { name: 'Hidesign', why: 'Handcrafted leather bags from Pondicherry, exported to 25 countries', categories: ['Handicrafts'], searchTerms: ['hidesign', 'leather'] },
    ],
    funFact: 'Hidesign\'s vegetable-tanned leather bags are handcrafted in Pondicherry and sold in 25+ countries!',
  },
  {
    foreign: 'louis vuitton',
    country: 'France',
    logo: '🇫🇷',
    category: 'Bags',
    indianBrands: [
      { name: 'Hidesign', why: 'Award-winning handcrafted leather luxury at honest prices', categories: ['Handicrafts'], searchTerms: ['hidesign', 'leather'] },
    ],
    funFact: 'Hidesign won the "Best Leather Product" at Semaine du Cuir Paris — beating European brands!',
  },
  // ── Watches ──
  {
    foreign: 'casio',
    country: 'Japan',
    logo: '🇯🇵',
    category: 'Watches',
    indianBrands: [
      { name: 'Titan', why: 'India\'s #1 watch brand by Tata Group, 60% market share', categories: ['Jewelry'], searchTerms: ['titan'] },
      { name: 'Fastrack', why: 'Youth-focused watches & wearables by Titan', categories: ['Jewelry', 'Technology'], searchTerms: ['fastrack'] },
    ],
    funFact: 'Titan is the 5th largest watch manufacturer in the world — a Tata Group company!',
  },
  {
    foreign: 'fossil',
    country: 'USA',
    logo: '🇺🇸',
    category: 'Watches',
    indianBrands: [
      { name: 'Titan', why: 'Karishma, Raga, Edge — iconic collections loved for decades', categories: ['Jewelry'], searchTerms: ['titan'] },
    ],
    funFact: 'Titan sells a watch every 2 seconds in India!',
  },
];
