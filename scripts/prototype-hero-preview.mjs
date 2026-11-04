/**
 * PROTOTYPE — export one PNG per variant (static mid-typing frame).
 * Run: node scripts/prototype-hero-preview.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import { experienceStampSvg } from "./hero-stamp-layout.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const fontDir = resolve(root, "assets/fonts");
const outDir = resolve(root, "prototype/hero-styles/previews");
mkdirSync(outDir, { recursive: true });

const WIDTH = 840;
const HEIGHT = 300;
const SCALE = 2;
const SAMPLE_TEXT = "Senior Soft";

const fonts = {
  fontFiles: [
    resolve(fontDir, "Geist-SemiBold.ttf"),
    resolve(fontDir, "Geist-Regular.ttf"),
    resolve(fontDir, "GeistMono-Regular.ttf"),
  ],
  loadSystemFonts: false,
  defaultFontFamily: "Geist",
};

const NAME = "Nicolás Fetter";
const TAG = "Helping startups turn ideas into reality";

function render(svg, name) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: WIDTH * SCALE },
    font: fonts,
  });
  const path = resolve(outDir, `${name}.png`);
  writeFileSync(path, resvg.render().asPng());
  console.log(path);
}

function variantA(text) {
  const TEXT_X = 81;
  const cursorX = TEXT_X + text.length * 13;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
      <path d="M24 0H0V24" fill="none" stroke="#f0f0f0" stroke-width="1"/>
    </pattern>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#70c8ff" stop-opacity="0.28"/>
      <stop offset="1" stop-color="#70c8ff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" rx="14" fill="#ffffff"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grid)"/>
  <circle cx="220" cy="150" r="190" fill="url(#glow)"/>
  <rect x="0.5" y="0.5" width="839" height="299" rx="14" fill="none" stroke="#e5e5e5"/>
  <text x="56" y="122" fill="#0a0a0a" font-family="Geist" font-weight="600" font-size="52" letter-spacing="-1.6">${NAME}</text>
  <text x="56" y="174" fill="#a1a1a1" font-family="Geist Mono" font-size="21">&gt;</text>
  <text x="${TEXT_X}" y="174" fill="#0a0a0a" font-family="Geist Mono" font-size="21">${text}</text>
  <rect x="${cursorX}" y="155" width="10" height="24" rx="1.5" fill="#70c8ff"/>
  <text x="56" y="216" fill="#666666" font-family="Geist" font-size="16">${TAG}</text>
</svg>`;
}

function variantB(text) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" rx="14" fill="#0d0f0d"/>
  <text x="56" y="110" fill="#33ff66" font-family="Geist Mono" font-weight="600" font-size="40">${NAME}</text>
  <text x="56" y="168" fill="#2a8f4a" font-family="Geist Mono" font-size="20">&gt; </text>
  <text x="81" y="168" fill="#b8ffc8" font-family="Geist Mono" font-size="20">${text}</text>
  <rect x="${81 + text.length * 12}" y="148" width="10" height="22" fill="#33ff66"/>
  <text x="56" y="220" fill="#3d6b4a" font-family="Geist Mono" font-size="14">${TAG}</text>
</svg>`;
}

function variantC() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fafafa"/><stop offset="1" stop-color="#eeeeee"/>
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" rx="14" fill="url(#bg)"/>
  <text x="420" y="108" text-anchor="middle" fill="#111" font-family="Geist" font-size="48">${NAME}</text>
  <rect x="396" y="122" width="48" height="3" fill="#111"/>
  <text x="280" y="168" fill="#444" font-family="Geist" font-size="13">Applied AI Engineer</text>
  <text x="420" y="168" text-anchor="middle" fill="#444" font-family="Geist" font-size="13">Tech Lead</text>
  <text x="560" y="168" fill="#444" font-family="Geist" font-size="13">Startup Builder</text>
  <text x="420" y="210" text-anchor="middle" fill="#666" font-family="Geist" font-size="15">${TAG}</text>
</svg>`;
}

function variantD(text) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" rx="14" fill="#0a0a0f"/>
  <rect x="0" y="0" width="320" height="${HEIGHT}" fill="#111118"/>
  <line x1="320" y1="0" x2="320" y2="${HEIGHT}" stroke="#2a2a38"/>
  <text x="32" y="130" fill="#f5f5f7" font-family="Geist" font-weight="600" font-size="32">${NAME}</text>
  <text x="32" y="175" fill="#6b6b80" font-family="Geist" font-size="13">${TAG}</text>
  <circle cx="580" cy="150" r="120" fill="#7850ff" opacity="0.35"/>
  <circle cx="640" cy="170" r="90" fill="#00c8ff" opacity="0.3"/>
  <text x="360" y="165" fill="#8888aa" font-family="Geist Mono" font-size="18">&gt; </text>
  <text x="385" y="165" fill="#e8e8ff" font-family="Geist Mono" font-size="18">${text}</text>
  <rect x="${385 + text.length * 11}" y="148" width="9" height="20" fill="#a78bfa"/>
</svg>`;
}

function variantE(text) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect x="4" y="4" width="832" height="292" rx="0" fill="#fff" stroke="#000" stroke-width="4"/>
  <text x="44" y="100" fill="#000" font-family="Geist" font-weight="800" font-size="44">NICOLÁS</text>
  <text x="44" y="148" fill="#000" font-family="Geist" font-weight="800" font-size="44">FETTER</text>
  ${experienceStampSvg()}
  <line x1="44" y1="175" x2="796" y2="175" stroke="#000" stroke-width="3"/>
  <text x="44" y="210" fill="#000" font-family="Geist Mono" font-weight="600" font-size="20">&gt; ${text}</text>
  <line x1="44" y1="235" x2="796" y2="235" stroke="#000" stroke-width="3"/>
  <text x="44" y="268" fill="#000" font-family="Geist" font-size="13">${TAG.toUpperCase()}</text>
</svg>`;
}

render(variantA(SAMPLE_TEXT), "A-light-blueprint");
render(variantB(SAMPLE_TEXT), "B-terminal");
render(variantC(), "C-editorial");
render(variantD(SAMPLE_TEXT), "D-split-neon");
render(variantE(SAMPLE_TEXT), "E-brutalist");
