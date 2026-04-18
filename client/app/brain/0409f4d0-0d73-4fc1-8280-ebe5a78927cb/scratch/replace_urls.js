const fs = require('fs');
const path = require('path');

const dbPath = path.join('c:', 'Users', 'devda', 'OneDrive', 'Desktop', 'harkirat', 'BharatOrigin', 'client', 'app', 'ai-shopper', 'products-db.ts');
let content = fs.readFileSync(dbPath, 'utf8');

const clUrl = 'https://res.cloudinary.com/demo/image/upload/sample.jpg';
const sampleImages = [
  'https://res.cloudinary.com/demo/image/upload/shoes.jpg',
  'https://res.cloudinary.com/demo/image/upload/accessories-bag.jpg',
  'https://res.cloudinary.com/demo/image/upload/face_top.jpg',
  'https://res.cloudinary.com/demo/image/upload/samples/ecommerce/analog-classic.jpg',
  'https://res.cloudinary.com/demo/image/upload/samples/ecommerce/leather-bag-gray.jpg',
  'https://res.cloudinary.com/demo/image/upload/samples/ecommerce/shoes.png',
];

let i = 0;
// Replace amazon URLs but do not replace the existing cloudinary URL in the system matching `res.cloudinary.com`
content = content.replace(/https:\/\/m\.media-amazon\.com[^\"]+/g, () => {
    const url = sampleImages[i % sampleImages.length];
    i++;
    return url;
});

fs.writeFileSync(dbPath, content, 'utf8');
console.log('Replaced all Amazon image links with Cloudinary links.');
