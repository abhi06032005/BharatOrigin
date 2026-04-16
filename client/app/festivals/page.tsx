'use client';

import { useState, useMemo } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

type FestivalKey = 'diwali' | 'holi' | 'onam' | 'eid' | 'pongal' | 'independence_day' | 'republic_day' | 'raksha_bandhan' | 'navratri' | 'christmas' | 'makar_sankranti' | 'ganesh_chaturthi' | 'baisakhi';

interface FestivalProduct {
  id: number;
  name: string;
  artisan: string;
  price: number;
  originalPrice: number;
  tag: string;
  emoji: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}

interface FestivalTheme {
  pageBg: string;
  cardBg: string;
  primary: string;
  primaryText: string;
}

interface Festival {
  key: FestivalKey;
  name: string;
  symbol: string;
  date: string;
  daysLeft: string;
  tagline: string;
  story: string;
  ritual: string;
  theme: FestivalTheme;
  products: FestivalProduct[];
  recommendations: string[];
}

interface CartItem extends FestivalProduct {
  quantity: number;
}

// ─── Festival Data ────────────────────────────────────────────────────────────

const FESTIVALS: Festival[] = [
  {
    key: 'independence_day', name: 'Independence Day', symbol: '🇮🇳', date: 'Aug 15, 2025', daysLeft: '122 days',
    tagline: 'Celebration of Freedom & Pride',
    story: 'Commemorating India\'s independence from British rule in 1947, a day of national pride, flag hoisting, and honoring the sacrifices of freedom fighters.',
    ritual: 'Hoist the Tricolor at home, sing the national anthem, and fly kites with family.',
    theme: { pageBg: '#F0F9FF', cardBg: '#FFFFFF', primary: '#15803D', primaryText: '#FFFFFF' }, // Saffron/White/Green vibes subtly
    products: [
      { id: 601, name: 'Khadi National Flag (BSI Certified)', artisan: 'Karnataka Khadi Gramodyoga', price: 199, originalPrice: 299, tag: 'Official', emoji: '🇮🇳', rating: 4.9, reviews: 4500, inStock: true },
      { id: 602, name: 'Tricolor Sweet Hamper (Ghevar & Ladoo)', artisan: 'Bikaner Sweets', price: 499, originalPrice: 699, tag: 'Festive', emoji: '🍡', rating: 4.8, reviews: 2100, inStock: true },
      { id: 603, name: 'Handcrafted Independence Kite Set (10)', artisan: 'Ahmedabad Kite Makers', price: 249, originalPrice: 349, tag: 'Traditional', emoji: '🪁', rating: 4.7, reviews: 1800, inStock: true },
      { id: 604, name: 'Ashoka Chakra Brass Lapel Pin', artisan: 'Moradabad Metal Crafts', price: 149, originalPrice: 199, tag: 'Apparel', emoji: '🎖️', rating: 4.9, reviews: 900, inStock: true },
    ],
    recommendations: ['Khadi kurtas for flag hoisting', 'Tri-color safas/turbans', 'Freedom fighter biography books', 'Patriotic song music collections'],
  },
  {
    key: 'republic_day', name: 'Republic Day', symbol: '📜', date: 'Jan 26, 2026', daysLeft: '286 days',
    tagline: 'Honoring the Constitution of India',
    story: 'Marks the adoption of the Constitution of India in 1950, transitioning India into a newly formed, independent republic.',
    ritual: 'Watch the grand parade at Rajpath, salute the courage of the armed forces.',
    theme: { pageBg: '#FFFBEB', cardBg: '#FFFFFF', primary: '#D97706', primaryText: '#FFFFFF' },
    products: [
      { id: 701, name: 'Constitution of India Mini Replica Book', artisan: 'Indian Heritage Publications', price: 399, originalPrice: 599, tag: 'Educational', emoji: '📖', rating: 4.9, reviews: 1200, inStock: true },
      { id: 702, name: 'Tricolor Pomegranate Ladoo Set', artisan: 'Sweets of India', price: 549, originalPrice: 700, tag: 'Sweets', emoji: '🍬', rating: 4.8, reviews: 850, inStock: true },
      { id: 703, name: 'Brass State Emblem of India (Ashoka Pillar)', artisan: 'Jaipur Brass Works', price: 899, originalPrice: 1299, tag: 'Decor', emoji: '🏛️', rating: 4.7, reviews: 600, inStock: true },
      { id: 704, name: 'Handspun Cotton Scarf (Saffron, White, Green)', artisan: 'Varanasi Weavers Corner', price: 299, originalPrice: 399, tag: 'Apparel', emoji: '🧣', rating: 4.9, reviews: 1100, inStock: true },
    ],
    recommendations: ['Brass desk decor of Ashoka Pillar', 'Historical documentaries', 'Tricolor food coloring for cooking', 'Patriotic home decor flags'],
  },
  {
    key: 'diwali', name: 'Diwali', symbol: '🪔', date: 'Oct 20, 2025', daysLeft: '188 days',
    tagline: 'Festival of Lights & Prosperity',
    story: 'Diwali marks the triumphant return of Lord Rama to Ayodhya. The people lit thousands of earthen diyas to illuminate his path home.',
    ritual: 'Light 5 diyas at sunset — one for each direction and one for the home\'s heart.',
    theme: { pageBg: '#FFF8F1', cardBg: '#FFFFFF', primary: '#C2410C', primaryText: '#FFFFFF' },
    products: [
      { id: 101, name: 'Handcrafted Terracotta Diyas (Set of 24)', artisan: 'Mitti Arts, Jaipur', price: 349, originalPrice: 499, tag: 'Artisan Pick', emoji: '🏺', rating: 4.8, reviews: 1240, inStock: true },
      { id: 102, name: 'Kaju Katli Premium Gift Box (500g)', artisan: 'Halwai House, Mathura', price: 899, originalPrice: 1200, tag: 'Bestseller', emoji: '🍬', rating: 4.9, reviews: 3480, inStock: true },
      { id: 103, name: 'Silk Lakshmi Idol (8 inch)', artisan: 'Nathdwara Crafts', price: 1299, originalPrice: 1599, tag: 'Sacred', emoji: '🙏', rating: 4.7, reviews: 820, inStock: true },
      { id: 104, name: 'Rangoli Stencil Kit (12 designs)', artisan: 'Artisans of Rajasthan', price: 249, originalPrice: 349, tag: 'DIY Special', emoji: '🎨', rating: 4.6, reviews: 2100, inStock: false },
    ],
    recommendations: ['Gift sets with dry fruits & diyas', 'Organic ghee diyas for pure flame', 'Handwoven Banarasi silk sarees', 'Patachitra art prints'],
  },
  {
    key: 'holi', name: 'Holi', symbol: '🎨', date: 'Mar 14, 2025', daysLeft: 'Passed',
    tagline: 'Festival of Colors & Joy',
    story: 'Holi commemorates the divine protection of Prahlad and celebrates Radha-Krishna\'s playful love with colors.',
    ritual: 'Play with natural colors made from marigold, turmeric, and rose petals.',
    theme: { pageBg: '#FDF2F8', cardBg: '#FFFFFF', primary: '#C026D3', primaryText: '#FFFFFF' },
    products: [
      { id: 201, name: 'Organic Gulal Set (8 colors)', artisan: 'Kama Ayurveda, Delhi', price: 599, originalPrice: 799, tag: 'Skin Safe', emoji: '🌈', rating: 4.9, reviews: 5200, inStock: true },
      { id: 202, name: 'Silver Pichkari (Vintage design)', artisan: 'Moradabad Metal Arts', price: 1499, originalPrice: 1999, tag: 'Heirloom', emoji: '💧', rating: 4.7, reviews: 640, inStock: true },
      { id: 203, name: 'Thandai Masala Premium (500g)', artisan: 'Chokhi Dhani, Jaipur', price: 399, originalPrice: 499, tag: 'Festive Drink', emoji: '🥛', rating: 4.8, reviews: 1820, inStock: true },
      { id: 204, name: 'Block-Print Kurta (Festive White)', artisan: 'Bagru Handblock Printers', price: 1799, originalPrice: 2299, tag: 'Wear & Play', emoji: '👕', rating: 4.6, reviews: 920, inStock: false },
    ],
    recommendations: ['Natural flower-based colors', 'Matka curd & gujiya from local halwais', 'White kurtas for color play', 'Herbal hair oil protection kit'],
  },
  {
    key: 'raksha_bandhan', name: 'Raksha Bandhan', symbol: '🧿', date: 'Aug 9, 2025', daysLeft: '116 days',
    tagline: 'Bond of Protection & Sibling Love',
    story: 'A celebration of the pure bond between brothers and sisters. The sister ties a rakhi on her brother\'s wrist, praying for his prosperity and well-being.',
    ritual: 'Tie a rakhi, share sweets, and exchange gifts promising lifelong support.',
    theme: { pageBg: '#FFF1F2', cardBg: '#FFFFFF', primary: '#E11D48', primaryText: '#FFFFFF' },
    products: [
      { id: 801, name: 'Handcrafted Kundan Rakhi Set (Pair)', artisan: 'Jaipur Jewelers', price: 299, originalPrice: 499, tag: 'Premium', emoji: '🧿', rating: 4.8, reviews: 2900, inStock: true },
      { id: 802, name: 'Assorted Premium Chocolates & Dry Fruits Box', artisan: 'Goan Confectioners', price: 799, originalPrice: 999, tag: 'Gifting', emoji: '🍫', rating: 4.9, reviews: 3100, inStock: true },
      { id: 803, name: 'Silver Coin (10g) for Gifting', artisan: 'Surat Silver Works', price: 1199, originalPrice: 1499, tag: 'Silver', emoji: '🪙', rating: 4.9, reviews: 800, inStock: true },
      { id: 804, name: 'Lumba Rakhi for Bhabhi', artisan: 'Rajasthani Crafts', price: 199, originalPrice: 299, tag: 'Traditional', emoji: '🎀', rating: 4.7, reviews: 1500, inStock: true },
    ],
    recommendations: ['Personalized photo gifts', 'Pooja thali sets', 'Handmade chocolates', 'Ethnic wear for sisters'],
  },
  {
    key: 'navratri', name: 'Navratri & Dussehra', symbol: '🌸', date: 'Sep 22 - Oct 2, 2025', daysLeft: '160 days',
    tagline: 'Nine Nights of the Divine Feminine',
    story: 'Navratri glorifies the nine forms of Goddess Durga, ending with Dussehra which celebrates Lord Rama’s victory over Ravana—the ultimate triumph of good over evil.',
    ritual: 'Dance the Garba, perform Kanya Pujan, and witness the burning of Ravana effigies.',
    theme: { pageBg: '#FEFCE8', cardBg: '#FFFFFF', primary: '#A16207', primaryText: '#FFFFFF' },
    products: [
      { id: 901, name: 'Garba Dandiya Sticks (Wooden, Hand-painted)', artisan: 'Kutch Artisans', price: 349, originalPrice: 499, tag: 'Dance Essentials', emoji: '🥢', rating: 4.9, reviews: 4200, inStock: true },
      { id: 902, name: 'Navratri Special Fasting Flour Mix (1kg)', artisan: 'Saurashtra Mills', price: 199, originalPrice: 250, tag: 'Groceries', emoji: '🌾', rating: 4.8, reviews: 1500, inStock: true },
      { id: 903, name: 'Durga Mata Brass Idol (6 inch)', artisan: 'Aligarh Metal Art', price: 999, originalPrice: 1399, tag: 'Sacred', emoji: '🕉️', rating: 4.9, reviews: 1100, inStock: true },
      { id: 904, name: 'Chaniya Choli (Cotton Embroidered)', artisan: 'Ahmedabad Textorium', price: 2499, originalPrice: 3499, tag: 'Apparel', emoji: '👗', rating: 4.7, reviews: 850, inStock: true },
    ],
    recommendations: ['Garba attire and jewelry', 'Pooja samagri for nine days', 'Sweets suitable for fasting', 'Decorative aarti thalis'],
  },
  {
    key: 'ganesh_chaturthi', name: 'Ganesh Chaturthi', symbol: '🐘', date: 'Aug 27, 2025', daysLeft: '134 days',
    tagline: 'Welcoming the Lord of New Beginnings',
    story: 'Celebrates the birth of Ganesha, the god of wisdom and prosperity. The festival is marked by the installation of Ganesha idols and grand public celebrations.',
    ritual: 'Bring home an eco-friendly Bappa, offer Modaks, and immerse the idol on Anant Chaturdashi.',
    theme: { pageBg: '#F0FDF4', cardBg: '#FFFFFF', primary: '#16A34A', primaryText: '#FFFFFF' },
    products: [
      { id: 1001, name: 'Eco-Friendly Clay Ganesha Idol (12 inch)', artisan: 'Pune Kumbarwada', price: 899, originalPrice: 1200, tag: 'Eco-Friendly', emoji: '🐘', rating: 5.0, reviews: 5400, inStock: true },
      { id: 1002, name: 'Ukadiche Modak (Pack of 11)', artisan: 'Mumbai Sweet House', price: 349, originalPrice: 400, tag: 'Prasad', emoji: '🥟', rating: 4.8, reviews: 2900, inStock: true },
      { id: 1003, name: 'Pooja Decoration Makhar (Cardboard)', artisan: 'Dadar Art Center', price: 599, originalPrice: 899, tag: 'Decor', emoji: '🎪', rating: 4.6, reviews: 1200, inStock: true },
      { id: 1004, name: 'Hibiscus Flower Garland (Artificial Premium)', artisan: 'South Indian Flora Arts', price: 249, originalPrice: 399, tag: 'Decor', emoji: '🌺', rating: 4.7, reviews: 800, inStock: false },
    ],
    recommendations: ['Eco-friendly clay idols', 'Steamed modaks and laddoos', 'Aarti thalis and bells', 'Traditional Maharashtrian attire'],
  },
  {
    key: 'makar_sankranti', name: 'Makar Sankranti', symbol: '🪁', date: 'Jan 14, 2026', daysLeft: '274 days',
    tagline: 'Harvest & The Ascending Sun',
    story: 'Marks the transition of the sun into the zodiac sign of Makara (Capricorn), signaling the end of winter and the beginning of longer days.',
    ritual: 'Fly kites, take holy dips in rivers, and share til-gud (sesame and jaggery) saying sweet words.',
    theme: { pageBg: '#FEF2F2', cardBg: '#FFFFFF', primary: '#DC2626', primaryText: '#FFFFFF' },
    products: [
      { id: 1101, name: 'Premium Til-Gud Ladoo (500g)', artisan: 'Nagpur Sweets', price: 299, originalPrice: 399, tag: 'Sweets', emoji: '🍘', rating: 4.8, reviews: 3100, inStock: true },
      { id: 1102, name: 'Professional Kite Flying Thread (Firki)', artisan: 'Surat Manja Makers', price: 349, originalPrice: 499, tag: 'Festival Gear', emoji: '🧵', rating: 4.6, reviews: 2500, inStock: true },
      { id: 1103, name: 'Assorted Designer Kites (Set of 20)', artisan: 'Bareilly Kite Masters', price: 249, originalPrice: 350, tag: 'Fun', emoji: '🪁', rating: 4.7, reviews: 1900, inStock: true },
      { id: 1104, name: 'Warm Woven Shawl for Winter Morning', artisan: 'Kullu Weavers', price: 999, originalPrice: 1499, tag: 'Apparel', emoji: '🧣', rating: 4.9, reviews: 700, inStock: true },
    ],
    recommendations: ['Assorted kite packs', 'Sesame & peanuts brittle (Chikki)', 'Cotton thread string (Manja)', 'Donation blankets for charity'],
  },
  {
    key: 'onam', name: 'Onam', symbol: '🌸', date: 'Sep 5, 2025', daysLeft: '143 days',
    tagline: 'Harvest Festival of Kerala',
    story: 'King Mahabali was granted one boon: to visit his people once a year. Every Onam, Keralites believe their beloved king walks among them.',
    ritual: 'Create a Pookalam (flower rangoli) with 8+ flower varieties at your doorstep.',
    theme: { pageBg: '#F0FDF4', cardBg: '#FFFFFF', primary: '#15803D', primaryText: '#FFFFFF' },
    products: [
      { id: 301, name: 'Kasavu Set Mundu (Gold Border)', artisan: 'Balaramapuram Weavers', price: 2499, originalPrice: 3199, tag: 'Traditional', emoji: '🌾', rating: 4.9, reviews: 780, inStock: true },
      { id: 302, name: 'Aranmula Kannadi (Mirror)', artisan: 'Aranmula Metal Craft', price: 3999, originalPrice: 4999, tag: 'GI Tagged', emoji: '🪞', rating: 5.0, reviews: 320, inStock: true },
      { id: 303, name: 'Onam Sadya Spice Pack', artisan: 'Malabar Spice Garden', price: 449, originalPrice: 599, tag: 'Authentic', emoji: '🍛', rating: 4.8, reviews: 1460, inStock: true },
      { id: 304, name: 'Handwoven Pattambi Mat', artisan: 'Palakkad Weavers Coop', price: 899, originalPrice: 1199, tag: 'Artisan', emoji: '🧺', rating: 4.7, reviews: 540, inStock: true },
    ],
    recommendations: ['Fresh jasmine for Pookalam', 'Payasam ingredients set', 'Kathakali mask décor', 'Banana chips gift hamper'],
  },
  {
    key: 'eid', name: 'Eid ul-Fitr', symbol: '🌙', date: 'Mar 30, 2025', daysLeft: 'Passed',
    tagline: 'Festival of Gratitude & Togetherness',
    story: 'Eid ul-Fitr marks the completion of Ramadan. Families gather for Eid namaz, exchange gifts, and share seviyan with neighbors.',
    ritual: 'Give Zakat before Eid prayer and share seviyan with every neighbor.',
    theme: { pageBg: '#F0F9FF', cardBg: '#FFFFFF', primary: '#0369A1', primaryText: '#FFFFFF' },
    products: [
      { id: 401, name: 'Lucknowi Chikankari Kurta', artisan: 'Chikan Craft Collective', price: 3299, originalPrice: 4199, tag: 'Heritage', emoji: '✨', rating: 4.9, reviews: 1080, inStock: true },
      { id: 402, name: 'Premium Seviyan Gift Pack (1kg)', artisan: 'Old Delhi Mithai Wala', price: 699, originalPrice: 899, tag: 'Traditional', emoji: '🍜', rating: 4.8, reviews: 2340, inStock: true },
      { id: 403, name: 'Ittar Set — Rose & Oud (10ml x 3)', artisan: 'Kannauj Fragrance House', price: 1199, originalPrice: 1599, tag: 'Pure', emoji: '🌹', rating: 4.9, reviews: 1680, inStock: true },
      { id: 404, name: 'Handmade Meenakari Jewelry Box', artisan: 'Jaipur Enamel Artists', price: 1599, originalPrice: 2099, tag: 'Gifting', emoji: '💎', rating: 4.7, reviews: 720, inStock: false },
    ],
    recommendations: ['Sheer kurtas with Zardozi embroidery', 'Handmade biryani masala set', 'Mughal-era perfume attars', 'Pashmina shawl for elders'],
  },
  {
    key: 'baisakhi', name: 'Baisakhi', symbol: '🌾', date: 'Apr 14, 2025', daysLeft: '350 days',
    tagline: 'Harvests & New Beginnings in Punjab',
    story: 'Marks the Sikh New Year and commemorates the formation of Khalsa panth of warriors under Guru Gobind Singh in 1699.',
    ritual: 'Visit the Gurdwara, enjoy the vibrant Bhangra dance, and feast on Kadah Prasad and Langar.',
    theme: { pageBg: '#FEF9C3', cardBg: '#FFFFFF', primary: '#CA8A04', primaryText: '#FFFFFF' },
    products: [
      { id: 1201, name: 'Phulkari Dupatta (Hand-embroidered)', artisan: 'Amritsar Handicrafts', price: 1299, originalPrice: 1799, tag: 'Apparel', emoji: '🧣', rating: 4.9, reviews: 1400, inStock: true },
      { id: 1202, name: 'Brass Kara (Sikh Bangle)', artisan: 'Ludhiana Metal Artisans', price: 399, originalPrice: 500, tag: 'Sacred', emoji: '📿', rating: 4.8, reviews: 3100, inStock: true },
      { id: 1203, name: 'Premium Desi Ghee (1L)', artisan: 'Punjab Dairy Co-op', price: 799, originalPrice: 950, tag: 'Groceries', emoji: '🧈', rating: 4.9, reviews: 4200, inStock: true },
      { id: 1204, name: 'Jutti (Traditional Punjabi Footwear)', artisan: 'Patiala Shoemakers', price: 899, originalPrice: 1199, tag: 'Apparel', emoji: '🥿', rating: 4.7, reviews: 1800, inStock: true },
    ],
    recommendations: ['Hand-embroidered Phulkari Suits', 'Pure Desi Ghee tins', 'Dhol drums for festivities', 'Traditional Patiala Juttis'],
  },
  {
    key: 'pongal', name: 'Pongal', symbol: '🌿', date: 'Jan 14, 2026', daysLeft: 'Upcoming',
    tagline: 'Harvest Thanksgiving of Tamil Nadu',
    story: 'Pongal is a joyful thanksgiving to Surya (the Sun God), cattle, and nature. When the sacred rice dish overflows, it signals abundance.',
    ritual: 'Boil new-harvest rice with jaggery, let it overflow — shout "Pongalo Pongal!"',
    theme: { pageBg: '#ECFDF5', cardBg: '#FFFFFF', primary: '#059669', primaryText: '#FFFFFF' },
    products: [
      { id: 501, name: 'Tanjore Painting (Surya Theme)', artisan: 'Thanjavur Art Studio', price: 4999, originalPrice: 6499, tag: 'GI Tagged', emoji: '🖼️', rating: 4.9, reviews: 480, inStock: true },
      { id: 502, name: 'Kolam Powder Set — Natural (1kg)', artisan: 'Coimbatore Women Artisans', price: 299, originalPrice: 399, tag: 'Traditional', emoji: '🌺', rating: 4.7, reviews: 2100, inStock: true },
      { id: 503, name: 'Handmade Jaggery from Kolhapur (2kg)', artisan: 'Sahyadri Farmers Co-op', price: 349, originalPrice: 449, tag: 'Organic', emoji: '🍯', rating: 4.8, reviews: 3200, inStock: true },
      { id: 504, name: 'Silk Pattu Pavadai for Girls', artisan: 'Kanchipuram Silk Weavers', price: 2899, originalPrice: 3799, tag: 'Kanjivaram', emoji: '👗', rating: 4.9, reviews: 640, inStock: true },
    ],
    recommendations: ['Sugarcane & turmeric décor', 'Earthen Pongal pot — handmade', 'Sesame & jaggery sweet balls', 'Bull garlands for Mattu Pongal'],
  },
  {
    key: 'christmas', name: 'Christmas', symbol: '🎄', date: 'Dec 25, 2025', daysLeft: '254 days',
    tagline: 'Season of Joy & Giving',
    story: 'Celebrating the birth of Jesus Christ, Christmas in India is joyous with midnight masses, traditional plum cakes, and decorating the crib.',
    ritual: 'Decorate a tree or star, share rich plum cakes, and attend the midnight mass with loved ones.',
    theme: { pageBg: '#FDF2F2', cardBg: '#FFFFFF', primary: '#B91C1C', primaryText: '#FFFFFF' },
    products: [
      { id: 1301, name: 'Kerala Plum Cake (Rich Fruit & Nut, 1kg)', artisan: 'Cochin Bakeries', price: 799, originalPrice: 999, tag: 'Sweets', emoji: '🎂', rating: 4.9, reviews: 5200, inStock: true },
      { id: 1302, name: 'Handcrafted Wooden Crib Set', artisan: 'Ernakulam Craft Village', price: 1499, originalPrice: 1999, tag: 'Decor', emoji: '🕊️', rating: 4.8, reviews: 1100, inStock: true },
      { id: 1303, name: 'Paper Star Lanterns (Set of 3)', artisan: 'Goan Paper Arts', price: 349, originalPrice: 499, tag: 'Decor', emoji: '⭐', rating: 4.7, reviews: 2800, inStock: true },
      { id: 1304, name: 'Homemade Rose Cookies (Achappam)', artisan: 'Kottayam Home Chefs', price: 299, originalPrice: 399, tag: 'Snacks', emoji: '🍪', rating: 4.6, reviews: 900, inStock: true },
    ],
    recommendations: ['Rich Kerala Plum Cakes', 'Handmade paper star lanterns', 'Rose cookies and kulkuls', 'Wooden nativity sets'],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const Stars = ({ rating, reviews }: { rating: number; reviews: number }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }, (_, i) => (
      <svg key={i} width="12" height="12" viewBox="0 0 24 24"
        fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
        stroke="currentColor" strokeWidth="2" className="text-amber-400">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ))}
    <span className="text-xs text-gray-500 ml-0.5">{rating} ({reviews.toLocaleString()})</span>
  </div>
);

// ─── Product Card ─────────────────────────────────────────────────────────────

const FestivalProductCard = ({
  product,
  onAdd,
  cartQty,
  theme,
}: {
  product: FestivalProduct;
  onAdd: (p: FestivalProduct) => void;
  cartQty: number;
  theme: FestivalTheme;
}) => {
  const [added, setAdded] = useState(false);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAdd = () => {
    if (!product.inStock || added) return;
    setAdded(true);
    onAdd(product);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div
      className="border border-gray-200 rounded-2xl p-5 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-gray-300"
      style={{ opacity: product.inStock ? 1 : 0.6, backgroundColor: theme.cardBg }}
    >
      {/* Top row: emoji + tag */}
      <div className="flex items-start justify-between gap-2">
        <span className="text-3xl">{product.emoji}</span>
        {product.tag && (
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full" style={{ backgroundColor: theme.primary, color: theme.primaryText }}>
            {product.tag}
          </span>
        )}
      </div>

      {/* Discount badge */}
      {discount > 0 && product.inStock && (
        <span className="self-start text-white text-[10px] font-bold px-2 py-0.5 rounded" style={{ backgroundColor: theme.primary }}>
          {discount}% OFF
        </span>
      )}

      {/* Artisan */}
      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
        🏺 {product.artisan}
      </p>

      {/* Name */}
      <p className="text-[15px] font-semibold text-gray-900 leading-snug">{product.name}</p>

      {/* Stars */}
      <Stars rating={product.rating} reviews={product.reviews} />

      {/* Price */}
      <div className="flex items-baseline gap-2">
        <span className="text-lg font-bold" style={{ color: theme.primary }}>₹{product.price.toLocaleString('en-IN')}</span>
        <span className="text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
      </div>

      {/* CTA */}
      {!product.inStock ? (
        <div className="text-center text-sm text-gray-400 py-2 rounded-xl border border-gray-200 bg-gray-50">
          Out of Stock
        </div>
      ) : cartQty > 0 && !added ? (
        <div className="text-center text-sm font-semibold text-amber-700 py-2 rounded-xl border border-amber-200 bg-amber-50">
          {cartQty} in cart
        </div>
      ) : (
        <button
          onClick={handleAdd}
          className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
            added
              ? 'text-white'
              : 'text-white hover:opacity-90 active:scale-[0.98]'
          }`}
          style={{ backgroundColor: added ? '#16A34A' : theme.primary, color: theme.primaryText }}
        >
          {added ? 'Added ✓' : 'Add to Cart'}
        </button>
      )}
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function FestivalsPage() {
  const [activeFestival, setActiveFestival] = useState<FestivalKey>('independence_day');
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc' | 'rating'>('featured');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const festival = FESTIVALS.find(f => f.key === activeFestival)!;
  const allTags = useMemo(() => ['All', ...Array.from(new Set(festival.products.map(p => p.tag)))], [festival]);

  // ── Cart helpers ──────────────────────────────────────────────────────────

  const addToCart = (product: FestivalProduct) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCartItems(prev =>
      prev.map(i => i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i)
        .filter(i => i.quantity > 0)
    );
  };

  const removeFromCart = (id: number) => setCartItems(prev => prev.filter(i => i.id !== id));

  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const getCartQty = (id: number) => cartItems.find(i => i.id === id)?.quantity ?? 0;

  // ── Filtered products ─────────────────────────────────────────────────────

  const filtered = useMemo(() => {
    let list = festival.products;
    if (selectedTag !== 'All') list = list.filter(p => p.tag === selectedTag);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.artisan.toLowerCase().includes(q));
    }
    switch (sortBy) {
      case 'price_asc': return [...list].sort((a, b) => a.price - b.price);
      case 'price_desc': return [...list].sort((a, b) => b.price - a.price);
      case 'rating': return [...list].sort((a, b) => b.rating - a.rating);
      default: return list;
    }
  }, [festival, selectedTag, search, sortBy]);

  // Event handler for switching festivals
  const switchFestival = (key: FestivalKey) => {
    setActiveFestival(key);
    setSelectedTag('All');
    setSearch('');
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen flex transition-colors duration-300" style={{ backgroundColor: festival.theme.pageBg }}>

      {/* ── LEFT SIDEBAR ────────────────────────────────────────────── */}
      <aside className="w-[280px] min-h-screen sticky top-0 border-r border-gray-200 px-5 py-7 overflow-y-auto flex-shrink-0 transition-colors duration-300" style={{ backgroundColor: festival.theme.cardBg }}>

        {/* Header */}
        <div className="mb-7">
          <p className="text-[11px] uppercase tracking-[0.18em] font-bold mb-2" style={{ color: festival.theme.primary }}>
            🇮🇳 Cultural Commerce
          </p>
          <h2 className="text-3xl font-bold text-gray-900">Festivals</h2>
          <p className="text-sm text-gray-500 mt-2 leading-6">
            Artisan-made festive essentials for every celebration across Bharat.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:border-transparent transition"
            style={{ '--tw-ring-color': festival.theme.primary } as React.CSSProperties}
          />
          <svg className="absolute right-3 top-3.5 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
        </div>

        {/* Festivals list */}
        <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400 font-bold mb-3">Festivals ({FESTIVALS.length})</p>
        <div className="space-y-1.5 mb-7">
          {FESTIVALS.map(f => {
            const active = f.key === activeFestival;
            return (
              <button
                key={f.key}
                onClick={() => switchFestival(f.key)}
                className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-150 flex items-center justify-between ${
                  !active && 'hover:bg-gray-50'
                }`}
                style={active ? {
                  backgroundColor: festival.theme.primary,
                  color: festival.theme.primaryText,
                  borderColor: festival.theme.primary
                } : {
                  backgroundColor: festival.theme.cardBg,
                  color: '#374151',
                  borderColor: '#e5e7eb'
                }}
              >
                <span className="flex items-center gap-2">
                  <span>{f.symbol}</span> {f.name}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${active ? 'bg-white/20' : 'bg-gray-100 text-gray-500'}`} style={active ? {color: festival.theme.primaryText} : undefined}>
                  {f.products.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter: Tags */}
        <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400 font-bold mb-3">Product Tags</p>
        <div className="space-y-1.5">
          {allTags.map(tag => {
            const active = tag === selectedTag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-150 flex items-center gap-2.5 ${
                  !active && 'hover:bg-gray-50'
                }`}
                style={active ? {
                  backgroundColor: festival.theme.primary,
                  color: festival.theme.primaryText,
                  borderColor: festival.theme.primary
                } : {
                  backgroundColor: festival.theme.cardBg,
                  color: '#374151',
                  borderColor: '#e5e7eb'
                }}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </aside>

      {/* ── MAIN CONTENT ────────────────────────────────────────────── */}
      <main className="flex-1 overflow-hidden">

        {/* Hero strip */}
        <section className="px-10 py-10 border-b border-gray-200 transition-colors duration-300" style={{ backgroundColor: festival.theme.cardBg }}>
          <div className="flex items-start gap-4">
            <span className="text-5xl">{festival.symbol}</span>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] font-bold mb-1" style={{ color: festival.theme.primary }}>
                {festival.tagline}
              </p>
              <h1 className="text-5xl font-bold text-gray-900 mb-2">{festival.name}</h1>
              <p className="text-sm text-gray-500 mb-1">📅 {festival.date} · {festival.daysLeft}</p>
            </div>
          </div>

          {/* Story section */}
          <div className="mt-6 p-5 rounded-2xl border transition-colors duration-300" style={{ backgroundColor: festival.theme.pageBg, borderColor: festival.theme.primary + '30' }}>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">{festival.story}</p>
            <div className="flex items-start gap-2 rounded-xl p-3 border" style={{ backgroundColor: festival.theme.cardBg, borderColor: festival.theme.primary + '40' }}>
              <span>✨</span>
              <p className="text-sm italic font-medium" style={{ color: festival.theme.primary }}>{festival.ritual}</p>
            </div>
          </div>
        </section>

        {/* Sort + filter bar */}
        <section className="sticky top-0 z-30 border-b border-gray-200 px-10 py-4 transition-colors duration-300" style={{ backgroundColor: festival.theme.cardBg }}>
          <div className="flex justify-between gap-5 flex-wrap items-center">
            {/* Sort pills */}
            <div className="flex gap-2 flex-wrap">
              {([
                { value: 'featured', label: 'Featured' },
                { value: 'price_asc', label: 'Price ↑' },
                { value: 'price_desc', label: 'Price ↓' },
                { value: 'rating', label: 'Top Rated' },
              ] as const).map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setSortBy(opt.value)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    sortBy === opt.value ? '' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={sortBy === opt.value ? { backgroundColor: festival.theme.primary, color: festival.theme.primaryText } : {}}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Cart button */}
            <button
              onClick={() => setShowCart(true)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md flex items-center gap-2 transition hover:opacity-90"
              style={{ backgroundColor: festival.theme.primary, color: festival.theme.primaryText }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
              </svg>
              Cart ({cartCount}) • ₹{cartTotal.toLocaleString('en-IN')}
            </button>
          </div>
        </section>

        {/* Results */}
        <section className="px-10 py-8">
          <div className="mb-6 text-sm text-gray-500 font-medium">
            {filtered.length} product{filtered.length !== 1 ? 's' : ''}
            {search ? ` for "${search}"` : ''}
            {selectedTag !== 'All' ? ` tagged "${selectedTag}"` : ''}
          </div>

          {/* Product Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-3 gap-6 items-stretch">
              {filtered.map(product => (
                <div key={product.id} className="h-full">
                  <FestivalProductCard
                    product={product}
                    onAdd={addToCart}
                    cartQty={getCartQty(product.id)}
                    theme={festival.theme}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-lg font-semibold text-gray-700 mb-1">No products found</p>
              <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
              <button
                onClick={() => { setSearch(''); setSelectedTag('All'); }}
                className="mt-5 px-5 py-2.5 rounded-xl text-sm font-semibold transition hover:opacity-90"
                style={{ backgroundColor: festival.theme.primary, color: festival.theme.primaryText }}
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Recommendations */}
          <div className="mt-12">
            <p className="text-[11px] uppercase tracking-[0.18em] font-bold mb-3" style={{ color: festival.theme.primary }}>
              🌟 Recommendations for {festival.name}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {festival.recommendations.map((rec, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-gray-200" style={{ backgroundColor: festival.theme.cardBg }}>
                  <span className="flex-shrink-0 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center" style={{ backgroundColor: festival.theme.pageBg, color: festival.theme.primary }}>
                    {i + 1}
                  </span>
                  <p className="text-sm text-gray-600">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── CART DRAWER ─────────────────────────────────────────────── */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowCart(false)} />
          <div className="relative w-[380px] h-screen shadow-2xl border-l border-gray-200 flex flex-col transition-colors duration-300" style={{ backgroundColor: festival.theme.cardBg }}>
            {/* Header */}
            <div className="p-5 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
                <p className="text-xs text-gray-500 mt-0.5">{cartCount} item{cartCount !== 1 ? 's' : ''}</p>
              </div>
              <button onClick={() => setShowCart(false)} className="text-gray-400 hover:text-gray-700 text-sm font-semibold transition p-2 hover:bg-gray-100 rounded-lg">
                ✕ Close
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3" style={{ backgroundColor: festival.theme.pageBg }}>
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center pb-10">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={festival.theme.primary} strokeWidth="1.2" className="mb-4 opacity-50">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                  <p className="text-base font-semibold text-gray-700 mb-1">Your cart is empty</p>
                  <p className="text-sm text-gray-500">Add festive products to get started</p>
                </div>
              ) : (
                cartItems.map(item => (
                  <div key={item.id} className="border border-gray-200 rounded-xl p-4 flex gap-3" style={{ backgroundColor: festival.theme.cardBg }}>
                    <span className="text-3xl flex-shrink-0">{item.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{item.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.artisan}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 rounded-lg border border-gray-200 text-gray-600 text-sm font-bold flex items-center justify-center hover:bg-gray-50 transition">−</button>
                          <span className="text-sm font-bold text-gray-900 min-w-[20px] text-center">{item.quantity}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 rounded-lg border border-gray-200 text-gray-600 text-sm font-bold flex items-center justify-center hover:bg-gray-50 transition">+</button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold" style={{ color: festival.theme.primary }}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                          <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition p-1">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-5 border-t border-gray-200">
                <div className="flex justify-between text-sm text-gray-600 mb-1.5">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <span>Delivery</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="flex justify-between font-bold text-lg mb-4 pt-3 border-t border-gray-100">
                  <span>Total</span>
                  <span style={{ color: festival.theme.primary }}>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <button className="w-full py-3.5 rounded-xl font-semibold text-sm transition hover:opacity-90 active:scale-[0.99]" style={{ backgroundColor: festival.theme.primary, color: festival.theme.primaryText }}>
                  Checkout →
                </button>
                <button onClick={() => setCartItems([])} className="w-full mt-2 text-xs text-gray-400 hover:text-red-500 py-1 transition">
                  Clear cart
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
