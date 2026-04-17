export type FestivalKey = 'diwali' | 'holi' | 'onam' | 'eid' | 'pongal' | 'independence_day' | 'republic_day' | 'raksha_bandhan' | 'navratri' | 'christmas' | 'makar_sankranti' | 'ganesh_chaturthi' | 'baisakhi';

export interface FestivalProduct {
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

export interface FestivalTheme {
  pageBg: string;
  cardBg: string;
  primary: string;
  primaryText: string;
}

export interface Festival {
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

export interface CartItem extends FestivalProduct {
  quantity: number;
}

export const FESTIVALS: Festival[] = [
  {
    key: 'independence_day', name: 'Independence Day', symbol: '🇮🇳', date: 'Aug 15, 2025', daysLeft: '122 days',
    tagline: 'Celebration of Freedom & Pride',
    story: "Commemorating India's independence from British rule in 1947, a day of national pride, flag hoisting, and honoring the sacrifices of freedom fighters.",
    ritual: 'Hoist the Tricolor at home, sing the national anthem, and fly kites with family.',
    theme: { pageBg: '#F0F9FF', cardBg: '#FFFFFF', primary: '#15803D', primaryText: '#FFFFFF' },
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
    ritual: "Light 5 diyas at sunset — one for each direction and one for the home's heart.",
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
    story: "Holi commemorates the divine protection of Prahlad and celebrates Radha-Krishna's playful love with colors.",
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
    story: "A celebration of the pure bond between brothers and sisters. The sister ties a rakhi on her brother's wrist, praying for his prosperity and well-being.",
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
    story: "Navratri glorifies the nine forms of Goddess Durga, ending with Dussehra which celebrates Lord Rama’s victory over Ravana—the ultimate triumph of good over evil.",
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
