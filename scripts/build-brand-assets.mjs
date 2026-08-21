import sharp from 'sharp';
import fs from 'node:fs';
const svg = fs.readFileSync('public/favicon/favicon.svg');
await sharp(svg).resize(32, 32).png().toFile('public/favicon/favicon-32.png');
await sharp(svg).resize(180, 180).png().toFile('public/favicon/apple-touch-icon.png');

fs.mkdirSync('public/social', { recursive: true });
const og = await sharp('src/assets/images/eggs-in-wooden-bowl.jpg')
  .resize(1200, 630, { fit: 'cover', position: sharp.strategy.attention })
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile('public/social/orchard-og.jpg');
console.log('og', og.width + 'x' + og.height, Math.round(og.size / 1024) + 'KB');
