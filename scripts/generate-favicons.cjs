const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const toIco = require('to-ico');

const publicDir = path.resolve(__dirname, '..', 'public');

const svgSource = `
<svg viewBox="0 0 512 512" width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F766E" />
      <stop offset="60%" stop-color="#0E7C81" />
      <stop offset="100%" stop-color="#115E59" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="108" fill="url(#brandGrad)" />
  <g transform="translate(256, 256) scale(12.5) translate(-16, -16)" stroke="#FFFFFF" fill="#FFFFFF">
    <path d="M16 4V28" stroke-linecap="round" stroke-width="2.2" />
    <path d="M16 13C16 15 11 15.5 8.5 17" stroke-linecap="round" stroke-width="2.2" />
    <path d="M16 13C16 15 21 15.5 23.5 17" stroke-linecap="round" stroke-width="2.2" />
    <path d="M7 17.5C5 19.5 4.5 23 6 25.5C7.5 28 11.5 27.5 13 25.5C14 24 14 21 13 19C12 17 9 16.5 7 17.5Z" fill-opacity="0.28" stroke-width="2" />
    <path d="M25 17.5C27 19.5 27.5 23 26 25.5C24.5 28 20.5 27.5 19 25.5C18 24 18 21 19 19C20 17 23 16.5 25 17.5Z" fill-opacity="0.28" stroke-width="2" />
  </g>
</svg>
`;

async function generate() {
  const buf512 = await sharp(Buffer.from(svgSource)).resize(512, 512).png().toBuffer();
  const buf192 = await sharp(Buffer.from(svgSource)).resize(192, 192).png().toBuffer();
  const buf180 = await sharp(Buffer.from(svgSource)).resize(180, 180).png().toBuffer();
  const buf48 = await sharp(Buffer.from(svgSource)).resize(48, 48).png().toBuffer();
  const buf32 = await sharp(Buffer.from(svgSource)).resize(32, 32).png().toBuffer();
  const buf16 = await sharp(Buffer.from(svgSource)).resize(16, 16).png().toBuffer();

  const icoBuf = await toIco([buf16, buf32, buf48]);

  fs.writeFileSync(path.join(publicDir, 'android-chrome-512x512.png'), buf512);
  fs.writeFileSync(path.join(publicDir, 'android-chrome-192x192.png'), buf192);
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), buf180);
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), buf32);
  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), buf16);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuf);

  console.log('Successfully wrote favicon files to public/');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
