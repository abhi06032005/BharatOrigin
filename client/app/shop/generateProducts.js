const fs = require('fs');
const path = require('path');

const categories = [
  'Footwear', 'Textiles', 'Handicrafts', 'Technology', 
  'Wellness', 'Food & Beverages', 'Home & Living', 'Pottery', 'Jewelry'
];

const states = [
  'Maharashtra', 'Gujarat', 'Tamil Nadu', 'Karnataka', 'Rajasthan', 
  'Uttar Pradesh', 'West Bengal', 'Kerala', 'Punjab', 'Haryana', 
  'Delhi', 'Madhya Pradesh', 'Bihar', 'Odisha', 'Andhra Pradesh'
];

const tags = ['Bestseller', 'Handmade', 'Premium', 'Eco-friendly', 'Trending', 'Artisan Crafted'];

const adjectives = ['Authentic', 'Premium', 'Traditional', 'Handcrafted', 'Classic', 'Modern', 'Luxury', 'Vibrant', 'Elegant', 'Sustainable'];

function getRand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateProducts() {
  let products = [];
  let idCounter = 1;

  // Specific Comet and GullyLabs products for the Swadeshi Switch testing
  const customSneakers = [
    { name: "Comet X1 Sneaker", desc: "Bold homegrown sneaker with exceptional comfort.", brand: "comet", cat: "Footwear" },
    { name: "Comet Retro Low", desc: "Classic premium sneaker for the street.", brand: "comet", cat: "Footwear" },
    { name: "GullyLabs Street Pro", desc: "The ultimate representation of Indian street culture.", brand: "gullylabs", cat: "Footwear" },
    { name: "GullyLabs Urban Kicks", desc: "A blend of Indian heritage and modern sneaker design.", brand: "gullylabs", cat: "Footwear" },
    { name: "Campus Ignite Running", desc: "Fast, light, and durable running shoes.", brand: "campus", cat: "Footwear" },
  ];

  customSneakers.forEach(snk => {
    const origPrice = getRand(3000, 8000);
    const price = Math.floor(origPrice * (getRand(60, 90) / 100));
    products.push({
      id: idCounter++,
      name: snk.name,
      description: snk.desc,
      price: price,
      originalPrice: origPrice,
      image: `/images/products/${snk.brand}-${idCounter}.jpg`,
      category: snk.cat,
      state: states[getRand(0, states.length - 1)],
      bharatScore: getRand(80, 98),
      rating: +(getRand(40, 50) / 10).toFixed(1),
      reviews: getRand(50, 1500),
      inStock: true,
      tag: tags[getRand(0, tags.length - 1)]
    });
  });

  categories.forEach(cat => {
    const numToGenerate = 30;
    for (let i = 0; i < numToGenerate; i++) {
       const origPrice = getRand(500, 10000);
       const price = Math.floor(origPrice * (getRand(50, 90) / 100));
       products.push({
         id: idCounter++,
         name: `${adjectives[getRand(0, adjectives.length - 1)]} ${cat} Item ${i + 1}`,
         description: `This is a high-quality, authentic product belonging to the ${cat} category, handcrafted with care in India.`,
         price: price,
         originalPrice: origPrice,
         image: `/images/products/${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${i+1}.jpg`,
         category: cat,
         state: states[getRand(0, states.length - 1)],
         bharatScore: getRand(40, 98),
         rating: +(getRand(35, 50) / 10).toFixed(1),
         reviews: getRand(10, 1000),
         inStock: Math.random() > 0.1, // 90% chance to be in stock
         tag: Math.random() > 0.3 ? tags[getRand(0, tags.length - 1)] : ""
       });
    }
  });

  return products;
}

const allProducts = generateProducts();
const jsonPath = path.join(__dirname, 'products.json');
fs.writeFileSync(jsonPath, JSON.stringify(allProducts, null, 2));
console.log(`Generated ${allProducts.length} products and saved to ${jsonPath}`);
