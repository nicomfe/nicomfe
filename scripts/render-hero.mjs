import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import {
  BORDER_INSET,
  HEIGHT,
  LAYOUT,
  WIDTH,
  typingCursorX,
  typingCursorY,
  typingTextX,
} from "./hero-layout.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const fontDir = resolve(root, "assets/fonts");
const SCALE = 2;
const FPS = 15;

const PHRASES = [
  "Applied AI Engineer",
  "Tech Lead",
  "Startup Builder",
];

const HOLD_FRAMES = 28;
const GAP_FRAMES = 5;
const TAGLINE = "Helping startups turn ideas into reality";

const fonts = {
  fontFiles: [
    resolve(fontDir, "Geist-SemiBold.ttf"),
    resolve(fontDir, "Geist-Regular.ttf"),
    resolve(fontDir, "GeistMono-Regular.ttf"),
  ],
  loadSystemFonts: false,
  defaultFontFamily: "Geist",
};

function timeline() {
  const frames = [];
  for (const phrase of PHRASES) {
    for (let i = 1; i <= phrase.length; i++) frames.push(phrase.slice(0, i));
    for (let i = 0; i < HOLD_FRAMES; i++) frames.push(phrase);
    let remaining = phrase.length;
    while (remaining > 0) {
      remaining = Math.max(0, remaining - 2);
      frames.push(phrase.slice(0, remaining));
    }
    for (let i = 0; i < GAP_FRAMES; i++) frames.push("");
  }
  return frames;
}

function svgFor(text, time) {
  const cursorOn = time % 1.1 < 0.55;
  const cursorX = typingCursorX(text);
  const textX = typingTextX();
  const border = BORDER_INSET;
  const borderW = WIDTH - border * 2;
  const borderH = HEIGHT - border * 2;
  const { nameY1, nameY2, nameSize, nameLetterSpacing, rule1Y, typeY, rule2Y, tagY, tagSize, monoSize, promptX } =
    LAYOUT;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#ffffff"/>
  <rect x="${border}" y="${border}" width="${borderW}" height="${borderH}" fill="#fff" stroke="#000" stroke-width="4"/>
  <text x="${promptX}" y="${nameY1}" fill="#000" font-family="Geist" font-weight="600" font-size="${nameSize}" letter-spacing="${nameLetterSpacing}">NICOLÁS</text>
  <text x="${promptX}" y="${nameY2}" fill="#000" font-family="Geist" font-weight="600" font-size="${nameSize}" letter-spacing="${nameLetterSpacing}">FETTER</text>
  <line x1="${promptX}" y1="${rule1Y}" x2="${WIDTH - promptX}" y2="${rule1Y}" stroke="#000" stroke-width="3"/>
  <text x="${promptX}" y="${typeY}" fill="#000" font-family="Geist Mono" font-weight="400" font-size="${monoSize}">&gt;</text>
  <text x="${textX.toFixed(1)}" y="${typeY}" fill="#000" font-family="Geist Mono" font-weight="400" font-size="${monoSize}">${text}</text>
  <rect x="${cursorX.toFixed(1)}" y="${typingCursorY()}" width="8" height="22" fill="#000" opacity="${cursorOn ? 1 : 0}"/>
  <line x1="${promptX}" y1="${rule2Y}" x2="${WIDTH - promptX}" y2="${rule2Y}" stroke="#000" stroke-width="3"/>
  <text x="${promptX}" y="${tagY}" fill="#000" font-family="Geist" font-weight="400" font-size="${tagSize}">${TAGLINE.toUpperCase()}</text>
</svg>`;
}

function renderPng(svg) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: WIDTH * SCALE },
    font: fonts,
  });
  return resvg.render().asPng();
}

const preview = process.argv.includes("--preview");
const frames = timeline();

if (preview) {
  const samples = [
    ["empty", ""],
    ["mid", "Applied AI"],
    ["full", "Applied AI Engineer"],
    ["lead", "Tech Lead"],
    ["builder", "Startup Builder"],
  ];
  for (const [name, text] of samples) {
    const png = renderPng(svgFor(text, 1.2));
    const out = resolve("/tmp/hero-frames", `${name}.png`);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, png);
    console.log(out);
  }
} else {
  const outDir = "/tmp/hero-frames";
  mkdirSync(outDir, { recursive: true });
  frames.forEach((text, index) => {
    const png = renderPng(svgFor(text, index / FPS));
    const file = resolve(outDir, `frame_${String(index + 1).padStart(4, "0")}.png`);
    writeFileSync(file, png);
    if (index % 20 === 0) console.log(`${index + 1}/${frames.length}`);
  });
  console.log(`frames ${frames.length} fps ${FPS} seconds ${(frames.length / FPS).toFixed(2)}`);
}
