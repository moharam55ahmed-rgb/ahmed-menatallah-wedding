const sharp = require('sharp');

async function processImages() {
  const rectSvgMob = Buffer.from('<svg width="96" height="70"><rect width="96" height="70" rx="12" fill="#FFFDF9"/></svg>');

  const mobilePatches = [
    { input: rectSvgMob, top: 1215, left: 58 },
    { input: rectSvgMob, top: 1215, left: 184 },
    { input: rectSvgMob, top: 1215, left: 308 },
    { input: rectSvgMob, top: 1215, left: 432 }
  ];

  await sharp('public/images/hero-mobile-exact.png')
    .composite(mobilePatches)
    .toFile('public/images/hero-mobile-clean.png');
  console.log('Mobile clean generated successfully');

  const rectSvgDesk = Buffer.from('<svg width="170" height="85"><rect width="170" height="85" rx="14" fill="#FFFDF9"/></svg>');

  const desktopPatches = [
    { input: rectSvgDesk, top: 890, left: 180 },
    { input: rectSvgDesk, top: 890, left: 395 },
    { input: rectSvgDesk, top: 890, left: 605 },
    { input: rectSvgDesk, top: 890, left: 815 }
  ];

  await sharp('public/images/hero-desktop-exact.png')
    .composite(desktopPatches)
    .toFile('public/images/hero-desktop-clean.png');
  console.log('Desktop clean generated successfully');
}

processImages().catch(console.error);
