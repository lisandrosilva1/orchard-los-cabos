import sharp from 'sharp';
import fs from 'node:fs';

const SRC = '/tmp/orchard-new';
const OUT = 'src/assets/images';
fs.mkdirSync(OUT, { recursive: true });

/** New farm photography, August 2026. All shot by Orchard. */
const jobs = [
  ['IMG_8434.jpg', 'hero-basket-sea-of-cortez.jpg', 2600],
  ['IMG_8415.jpg', 'eggs-basket-villa-marble.jpg', 2200],
  ['IMG_8443.jpg', 'eggs-ceramic-bowl-villa.jpg', 2000],
  ['IMG_7875.jpg', 'flock-golden-hour.jpg', 2400],
  ['IMG_7933.jpg', 'hens-at-the-waterer.jpg', 2200],
  ['IMG_7939.jpg', 'hands-holding-eggs.jpg', 2200],
  ['IMG_8351_2.jpg', 'hands-holding-farm-feed.jpg', 2200],
  ['IMG_9423.jpg', 'carton-of-sage-eggs.jpg', 2000],
  ['IMG_8232.jpg', 'eggs-wooden-bowl-grass.jpg', 2200],
];

for (const [src, out, w] of jobs) {
  const m = await sharp(`${SRC}/${src}`)
    .rotate()
    .resize({ width: w, withoutEnlargement: true })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(`${OUT}/${out}`);
  console.log(out.padEnd(34), m.width + 'x' + m.height, Math.round(m.size / 1024) + 'KB');
}
