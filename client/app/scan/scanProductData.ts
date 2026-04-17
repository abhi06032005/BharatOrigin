export type Product = {
  name: string;
  score: number;
  brand: string;
  owner: string;
  indianShare: number;
  foreignShare: number;
  origin: string;
  category: string;
  ingredients: string;
  sustainability: string;
  founded?: string;
  headquarters?: string;
  revenue?: string;
  employees?: string;
  about?: string;
};

export const PRODUCT_DATA: Record<string, Product> = {
  "890607779032": {
    name: "Mamaearth Facewash",
    score: 92,
    brand: "Honasa Consumer Ltd",
    owner: "Indian Majority Owned",
    indianShare: 78,
    foreignShare: 22,
    origin: "India (Bhiwadi Plant)",
    category: "Personal Care",
    ingredients: "Rice Water, Niacinamide, B3+",
    sustainability: "Plastic Positive Brand",
    founded: "2016",
    headquarters: "Gurugram, Haryana",
    revenue: "₹1,900+ Cr",
    employees: "900+",
    about: "Mamaearth is one of India's fastest growing personal care brands focused on toxin-free and natural products.",
  },
  "6281006438842": {
    name: "Dove Shampoo",
    score: 45,
    brand: "Unilever",
    owner: "Foreign Owned (UK)",
    indianShare: 18,
    foreignShare: 82,
    origin: "India (Regional Plant)",
    category: "Personal Care",
    ingredients: "Synthetic / Sulfate Based",
    sustainability: "Moderate Eco Impact",
    founded: "1957",
    headquarters: "London, United Kingdom",
    revenue: "$60B+ Parent Group",
    employees: "1,00,000+",
    about: "Dove is a global beauty and hygiene brand owned by Unilever, operating in many countries.",
  },
};
