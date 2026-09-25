const fs = require('fs');

let html = fs.readFileSync('src/shaders/character-carousel/sources/character-filmstrip.original.html', 'utf8');

// 1. Add vivienne photo to portraits object
const vivImgBuf = fs.readFileSync('public/images/vivienne-profile.jpg');
const vivBase64 = 'data:image/jpeg;base64,' + vivImgBuf.toString('base64');

html = html.replace('const portraits = {', 'const portraits = {\n        vivienne: "' + vivBase64 + '",');

// 2. Replace profiles array with Lee Monarc advisory profiles
const oldProfilesPattern = /const profiles = \[\s*\["Sophie Lee"[\s\S]*?\]\.map/;
const newProfiles = `const profiles = [
        ["Vivienne Lee", "Founder · Chartered Accountant", "vivienne"],
        ["Business Structuring", "Corporate & Trust Advisory", "marcus"],
        ["Succession & Exit", "Transition Advisory", "julian"],
        ["Fractional CFO", "Financial Guidance", "elena"],
        ["Accounting & Tax", "Compliance & Clarity", "sophie"]
      ].map`;
html = html.replace(oldProfilesPattern, newProfiles);

// 3. Update CSS styling to Lee Monarc luxury aesthetic
html = html.replace(/background:\s*#d8c9ad;/g, 'background: #0d1110;');
html = html.replace(/color-scheme:\s*light;/g, 'color-scheme: dark;');

// Update card styling
html = html.replace(/width:\s*clamp\(154px,\s*16\.8vw,\s*238px\);/g, 'width: clamp(280px, 28vw, 380px);');
html = html.replace(/border:\s*1px solid rgba\(47, 34, 19, 0\.42\);/g, 'border: 1px solid rgba(204, 168, 91, 0.45);');
html = html.replace(/background:\s*#e7d9bd;/g, 'background: #141b18;');
html = html.replace(/color:\s*#f3e7ce;/g, 'color: #f4f7f5;');
html = html.replace(/background:\s*#171612;/g, 'background: #0d1210;');
html = html.replace(/border:\s*1px solid #ce5d20;/g, 'border: 1px solid #cca85b;');
html = html.replace(/color:\s*#d86724;/g, 'color: #cca85b;');
html = html.replace(/color:\s*#d46a27;/g, 'color: #cca85b;');
html = html.replace(/background:\s*#766a58;/g, 'background: #101614;');

// Update stage gradient
html = html.replace(
  /radial-gradient\(circle at var\(--pointer-x\) 48%, rgba\(255, 246, 220, 0\.78\), transparent 34%\),\s*#d8c9ad;/g,
  'radial-gradient(circle at var(--pointer-x) 48%, rgba(204, 168, 91, 0.22), transparent 45%), #0d1110;'
);

// 4. Update horizontalSpacing and 3-card visibility in JS
html = html.replace(
  'const horizontalSpacing = Math.min(168, Math.max(112, innerWidth * 0.116));',
  'const horizontalSpacing = Math.min(460, Math.max(320, innerWidth * 0.32));'
);

// Ensure only 3 cards are visible: distance > 1.35 is opacity 0
html = html.replace(
  'card.style.opacity = String(Math.max(0.13, side * 0.76 + focus * 0.24));',
  `card.style.opacity = distance > 1.35 ? "0" : String(Math.max(0.2, (1 - distance / 1.5) * 0.75 + focus * 0.25));
          card.style.pointerEvents = distance > 1.35 ? "none" : "auto";`
);

fs.writeFileSync('src/shaders/character-carousel/sources/character-filmstrip.html', html, 'utf8');
console.log('Successfully updated character-filmstrip.html with Lee Monarc styling & 3-card layout!');
