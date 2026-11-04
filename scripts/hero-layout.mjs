/** Shared brutalist hero geometry (840×300). */

export const WIDTH = 840;
export const HEIGHT = 300;
export const CONTENT_LEFT = 44;
export const CONTENT_RIGHT = 796;
export const BORDER_INSET = 2;

/** Tighter vertical rhythm — less empty space above the name. */
export const LAYOUT = {
  nameY1: 68,
  nameY2: 116,
  nameSize: 44,
  nameLetterSpacing: -1,
  rule1Y: 143,
  typeY: 178,
  rule2Y: 203,
  tagY: 236,
  tagSize: 13,
  monoSize: 20,
  promptX: CONTENT_LEFT,
};

export const NAME_LINE = {
  x: CONTENT_LEFT,
  y: LAYOUT.nameY1,
  size: LAYOUT.nameSize,
  letterSpacing: LAYOUT.nameLetterSpacing,
};

/** Geist Mono ~20px advance widths (tuned for resvg). */
export function monoTextWidth(str, fontSize = LAYOUT.monoSize) {
  let w = 0;
  for (const ch of str) {
    let em = 0.64;
    if (ch === " ") em = 0.38;
    else if (ch === "i" || ch === "l" || ch === "I") em = 0.44;
    else if (ch === "m" || ch === "w" || ch === "M" || ch === "W") em = 0.74;
    else if (ch === ">") em = 0.58;
    w += em * fontSize;
  }
  return w;
}

/** Measured width + small gap so the block cursor sits after the last glyph. */
export function typingCursorX(typedText) {
  const textX = typingTextX();
  if (!typedText.length) return textX;
  return textX + monoTextWidth(typedText) * 1.04 + 3;
}

export function typingTextX() {
  return LAYOUT.promptX + monoTextWidth(">") + 5;
}

export function typingCursorY() {
  return LAYOUT.typeY - 18;
}
