/** Experience stamp box — sized to copy, top-aligned with first name line. */

import { CONTENT_RIGHT, NAME_LINE } from "./hero-layout.mjs";

const STAMP = {
  line1: "+15",
  line2: "Years of exp.",
  size1: 22,
  size2: 10,
  letterSpacing2: 0.2,
  padX: 10,
  padY: 8,
  gap: 4,
  capHeightRatio: 0.73,
};

function estimateTextWidth(str, fontSize, letterSpacing = 0) {
  let w = 0;
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    let em = 0.52;
    if (ch === " ") em = 0.24;
    else if (ch === "+") em = 0.62;
    else if (ch === ".") em = 0.28;
    else if (ch >= "A" && ch <= "Z") em = 0.58;
    else if (ch >= "a" && ch <= "z") em = 0.5;
    else if (ch >= "0" && ch <= "9") em = 0.56;
    w += em * fontSize;
    if (i < str.length - 1) w += letterSpacing;
  }
  return w;
}

export function experienceStampLayout() {
  const nameTop = NAME_LINE.y - NAME_LINE.size * STAMP.capHeightRatio;
  const w1 = estimateTextWidth(STAMP.line1, STAMP.size1);
  const w2 = estimateTextWidth(STAMP.line2, STAMP.size2, STAMP.letterSpacing2);
  const innerW = Math.ceil(Math.max(w1, w2));
  const w = innerW + STAMP.padX * 2;
  const x = CONTENT_RIGHT - w;
  const y = Math.round(nameTop);
  const textX = CONTENT_RIGHT - STAMP.padX;
  const y1 = y + STAMP.padY + STAMP.size1 * 0.91;
  const y2 = y1 + STAMP.gap + STAMP.size2 * 0.85;
  const h = Math.ceil(y2 - y + STAMP.padY + 3);
  return { x, y, w, h, textX, y1, y2 };
}

export function experienceStampSvg() {
  const s = experienceStampLayout();
  return `<rect x="${s.x}" y="${s.y}" width="${s.w}" height="${s.h}" fill="none" stroke="#000" stroke-width="2"/>
  <text x="${s.textX}" y="${s.y1.toFixed(1)}" text-anchor="end" fill="#000" font-family="Geist" font-weight="600" font-size="${STAMP.size1}">${STAMP.line1}</text>
  <text x="${s.textX}" y="${s.y2.toFixed(1)}" text-anchor="end" fill="#000" font-family="Geist" font-size="${STAMP.size2}" letter-spacing="${STAMP.letterSpacing2}">${STAMP.line2}</text>`;
}
