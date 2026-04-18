export type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  tag?: string;
};

export type StateData = {
  displayName: string;
  capital: string;
  region: string;
  heroColor: string;
  accentColor: string;
  tagline: string;
  products: Product[];
};

export const STATE_DATA: Record<string, StateData> = {
  rajasthan: {
    displayName: 'Rajasthan', capital: 'Jaipur', region: 'North India',
    heroColor: '#C2440E', accentColor: '#F59E0B', tagline: 'The Land of Kings',
    products: [
      { id: 1, name: 'Blue Pottery Vase', price: 1499, category: 'Handicraft', description: 'Traditional Jaipur blue pottery vase.', rating: 4.8, reviews: 312, inStock: true },
      { id: 2, name: 'Bandhani Dupatta', price: 899, category: 'Textiles', description: 'Tie-dye dupatta from Jodhpur.', rating: 4.6, reviews: 198, inStock: true },
    ],
  },
  kerala: {
    displayName: 'Kerala', capital: 'Thiruvananthapuram', region: 'South India',
    heroColor: '#065F46', accentColor: '#10B981', tagline: "God's Own Country",
    products: [
      { id: 1, name: 'Kasavu Saree', price: 3999, category: 'Textiles', description: 'Traditional Kerala saree.', rating: 4.9, reviews: 231, inStock: true },
      { id: 2, name: 'Coir Door Mat', price: 649, category: 'Home', description: 'Natural coir mat from Alappuzha.', rating: 4.5, reviews: 387, inStock: true },
    ],
  },
  gujarat: {
    displayName: 'Gujarat', capital: 'Gandhinagar', region: 'West India',
    heroColor: '#7C3AED', accentColor: '#A78BFA', tagline: 'Jewel of Western India',
    products: [
      { id: 1, name: 'Patola Saree', price: 8999, category: 'Textiles', description: 'Luxury Patola weave.', rating: 5.0, reviews: 67, inStock: true },
      { id: 2, name: 'Kutch Cushion', price: 1299, category: 'Decor', description: 'Kutchi embroidery cushion.', rating: 4.8, reviews: 295, inStock: true },
    ],
  },
  punjab: {
    displayName: 'Punjab', capital: 'Chandigarh', region: 'North India',
    heroColor: '#1D4ED8', accentColor: '#F59E0B', tagline: 'Land of Five Rivers',
    products: [
      { id: 1, name: 'Phulkari Dupatta', price: 1699, category: 'Textiles', description: 'Punjabi embroidered dupatta.', rating: 4.9, reviews: 342, inStock: true },
      { id: 2, name: 'Punjabi Jutti', price: 1299, category: 'Footwear', description: 'Traditional jutti pair.', rating: 4.7, reviews: 219, inStock: true },
    ],
  },
  'west bengal': {
    displayName: 'West Bengal', capital: 'Kolkata', region: 'East India',
    heroColor: '#991B1B', accentColor: '#F87171', tagline: 'Cultural Capital of India',
    products: [
      { id: 1, name: 'Baluchari Saree', price: 6499, category: 'Textiles', description: 'Elegant silk Baluchari saree.', rating: 4.9, reviews: 112, inStock: true },
      { id: 2, name: 'Darjeeling Tea', price: 749, category: 'Food', description: 'Premium Darjeeling first flush tea.', rating: 5.0, reviews: 1203, inStock: true },
    ],
  },
  maharashtra: {
    displayName: 'Maharashtra', capital: 'Mumbai', region: 'West India',
    heroColor: '#1E3A8A', accentColor: '#3B82F6', tagline: 'Gateway of India',
    products: [
      { id: 1, name: 'Paithani Saree', price: 9999, category: 'Textiles', description: 'Traditional Paithani silk saree.', rating: 4.9, reviews: 88, inStock: true },
      { id: 2, name: 'Kolhapuri Chappal', price: 1499, category: 'Footwear', description: 'Authentic Kolhapuri sandals.', rating: 4.8, reviews: 544, inStock: true },
    ],
  },
  karnataka: {
    displayName: 'Karnataka', capital: 'Bengaluru', region: 'South India',
    heroColor: '#14532D', accentColor: '#22C55E', tagline: 'One State Many Worlds',
    products: [
      { id: 1, name: 'Mysore Silk Saree', price: 7999, category: 'Textiles', description: 'Original Mysore silk saree.', rating: 4.9, reviews: 132, inStock: true },
      { id: 2, name: 'Channapatna Toy', price: 699, category: 'Handicraft', description: 'Wooden lacquer toy.', rating: 4.7, reviews: 280, inStock: true },
    ],
  },
  tamilnadu: {
    displayName: 'Tamil Nadu', capital: 'Chennai', region: 'South India',
    heroColor: '#7C2D12', accentColor: '#F97316', tagline: 'Land of Temples',
    products: [
      { id: 1, name: 'Kanchipuram Saree', price: 8999, category: 'Textiles', description: 'Pure silk Kanchipuram saree.', rating: 5.0, reviews: 201, inStock: true },
      { id: 2, name: 'Tanjore Painting', price: 3999, category: 'Art', description: 'Traditional gold foil painting.', rating: 4.8, reviews: 55, inStock: true },
    ],
  },
  telangana: {
    displayName: 'Telangana', capital: 'Hyderabad', region: 'South India',
    heroColor: '#9D174D', accentColor: '#EC4899', tagline: 'Seed of Innovation',
    products: [
      { id: 1, name: 'Pochampally Saree', price: 4999, category: 'Textiles', description: 'Ikat weave saree.', rating: 4.8, reviews: 99, inStock: true },
      { id: 2, name: 'Hyderabadi Pearls', price: 2499, category: 'Jewellery', description: 'Elegant pearl set.', rating: 4.7, reviews: 187, inStock: true },
    ],
  },
  andhrapradesh: {
    displayName: 'Andhra Pradesh', capital: 'Amaravati', region: 'South India',
    heroColor: '#1D4ED8', accentColor: '#60A5FA', tagline: 'Essence of the East Coast',
    products: [
      { id: 1, name: 'Kalamkari Art', price: 1899, category: 'Art', description: 'Hand-painted textile art.', rating: 4.8, reviews: 144, inStock: true },
      { id: 2, name: 'Mango Pickle', price: 349, category: 'Food', description: 'Spicy Andhra pickle.', rating: 4.9, reviews: 611, inStock: true },
    ],
  },
  assam: { displayName: 'Assam', capital: 'Dispur', region: 'Northeast', heroColor: '#166534', accentColor: '#22C55E', tagline: 'Tea Garden State', products: [{ id: 1, name: 'Assam Tea', price: 699, category: 'Food', description: 'Strong Assam tea.', rating: 4.9, reviews: 500, inStock: true }] },
  bihar: { displayName: 'Bihar', capital: 'Patna', region: 'East India', heroColor: '#92400E', accentColor: '#F59E0B', tagline: 'Land of Knowledge', products: [{ id: 1, name: 'Madhubani Painting', price: 1499, category: 'Art', description: 'Famous folk art.', rating: 4.8, reviews: 201, inStock: true }] },
  chhattisgarh: { displayName: 'Chhattisgarh', capital: 'Raipur', region: 'Central India', heroColor: '#065F46', accentColor: '#10B981', tagline: 'Rice Bowl of India', products: [{ id: 1, name: 'Bell Metal Craft', price: 1299, category: 'Handicraft', description: 'Traditional metal craft.', rating: 4.6, reviews: 88, inStock: true }] },
  goa: { displayName: 'Goa', capital: 'Panaji', region: 'West India', heroColor: '#0F766E', accentColor: '#14B8A6', tagline: 'Pearl of the Orient', products: [{ id: 1, name: 'Cashew Pack', price: 599, category: 'Food', description: 'Premium Goa cashews.', rating: 4.8, reviews: 321, inStock: true }] },
  haryana: { displayName: 'Haryana', capital: 'Chandigarh', region: 'North India', heroColor: '#334155', accentColor: '#64748B', tagline: 'Green State', products: [{ id: 1, name: 'Handloom Shawl', price: 899, category: 'Textiles', description: 'Warm shawl.', rating: 4.5, reviews: 77, inStock: true }] },
  himachalpradesh: { displayName: 'Himachal Pradesh', capital: 'Shimla', region: 'North India', heroColor: '#1D4ED8', accentColor: '#60A5FA', tagline: 'Land of Snow', products: [{ id: 1, name: 'Kullu Shawl', price: 1599, category: 'Textiles', description: 'Woolen shawl.', rating: 4.8, reviews: 212, inStock: true }] },
  jharkhand: { displayName: 'Jharkhand', capital: 'Ranchi', region: 'East India', heroColor: '#365314', accentColor: '#84CC16', tagline: 'Forest State', products: [{ id: 1, name: 'Tribal Craft', price: 999, category: 'Handicraft', description: 'Local tribal art.', rating: 4.4, reviews: 51, inStock: true }] },
  madhyapradesh: { displayName: 'Madhya Pradesh', capital: 'Bhopal', region: 'Central India', heroColor: '#7C3AED', accentColor: '#A78BFA', tagline: 'Heart of India', products: [{ id: 1, name: 'Chanderi Saree', price: 2999, category: 'Textiles', description: 'Lightweight silk saree.', rating: 4.8, reviews: 201, inStock: true }] },
  odisha: { displayName: 'Odisha', capital: 'Bhubaneswar', region: 'East India', heroColor: '#BE123C', accentColor: '#FB7185', tagline: 'Soul of Incredible India', products: [{ id: 1, name: 'Pattachitra Art', price: 1999, category: 'Art', description: 'Traditional scroll art.', rating: 4.9, reviews: 102, inStock: true }] },
  sikkim: { displayName: 'Sikkim', capital: 'Gangtok', region: 'Northeast', heroColor: '#0F766E', accentColor: '#2DD4BF', tagline: 'Organic State', products: [{ id: 1, name: 'Organic Tea', price: 599, category: 'Food', description: 'Natural organic tea.', rating: 4.8, reviews: 75, inStock: true }] },
  tripura: { displayName: 'Tripura', capital: 'Agartala', region: 'Northeast', heroColor: '#92400E', accentColor: '#FBBF24', tagline: 'Land of Bamboo', products: [{ id: 1, name: 'Bamboo Craft', price: 799, category: 'Handicraft', description: 'Eco bamboo craft.', rating: 4.5, reviews: 42, inStock: true }] },
  uttarpradesh: { displayName: 'Uttar Pradesh', capital: 'Lucknow', region: 'North India', heroColor: '#1E40AF', accentColor: '#60A5FA', tagline: 'Heartland of India', products: [{ id: 1, name: 'Chikankari Kurta', price: 1899, category: 'Apparel', description: 'Lucknow chikankari work.', rating: 4.9, reviews: 455, inStock: true }] },
  uttarakhand: { displayName: 'Uttarakhand', capital: 'Dehradun', region: 'North India', heroColor: '#166534', accentColor: '#22C55E', tagline: 'Dev Bhoomi', products: [{ id: 1, name: 'Herbal Honey', price: 499, category: 'Food', description: 'Pure mountain honey.', rating: 4.8, reviews: 190, inStock: true }] },
  arunachalpradesh: { displayName: 'Arunachal Pradesh', capital: 'Itanagar', region: 'Northeast', heroColor: '#7C2D12', accentColor: '#FB923C', tagline: 'Land of Dawn', products: [{ id: 1, name: 'Tribal Weave', price: 1399, category: 'Textiles', description: 'Traditional woven cloth.', rating: 4.7, reviews: 60, inStock: true }] },
  manipur: { displayName: 'Manipur', capital: 'Imphal', region: 'Northeast', heroColor: '#4338CA', accentColor: '#818CF8', tagline: 'Jewel of India', products: [{ id: 1, name: 'Black Pottery', price: 999, category: 'Handicraft', description: 'Longpi black pottery.', rating: 4.7, reviews: 81, inStock: true }] },
  meghalaya: { displayName: 'Meghalaya', capital: 'Shillong', region: 'Northeast', heroColor: '#065F46', accentColor: '#34D399', tagline: 'Abode of Clouds', products: [{ id: 1, name: 'Orange Honey', price: 449, category: 'Food', description: 'Natural citrus honey.', rating: 4.6, reviews: 71, inStock: true }] },
  mizoram: { displayName: 'Mizoram', capital: 'Aizawl', region: 'Northeast', heroColor: '#0F766E', accentColor: '#2DD4BF', tagline: 'Land of Highlanders', products: [{ id: 1, name: 'Handwoven Cloth', price: 899, category: 'Textiles', description: 'Mizo handloom cloth.', rating: 4.5, reviews: 33, inStock: true }] },
  nagaland: { displayName: 'Nagaland', capital: 'Kohima', region: 'Northeast', heroColor: '#7C3AED', accentColor: '#C084FC', tagline: 'Land of Festivals', products: [{ id: 1, name: 'Naga Shawl', price: 1699, category: 'Textiles', description: 'Traditional Naga shawl.', rating: 4.8, reviews: 49, inStock: true }] },
};

export const DEMO_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
];
