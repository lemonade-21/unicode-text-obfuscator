// index.js
'use strict';

/**
 * Simple Text Obfuscator
 *
 * Exports:
 *  - obfuscate(text, options)
 *  - deobfuscate(text)
 *
 * options:
 *  - fraction: 0..1 how many characters to obfuscate (default 1 => all possible)
 *  - preserveDigits: boolean (default false)
 */

const LOOKALIKES = {
  // for-lowercase
  a: ['а','α','ạ'], // Cyrillic a, Greek alpha, a with dot
  b: ['Ь','ϐ','ɓ'], // Cyrillic soft sign, Greek beta-like, latin b-with-hook
  c: ['с','ϲ','ċ'],
  d: ['ԁ','đ'],
  e: ['е','ë','є'],
  f: ['ƒ'],
  g: ['ɡ','ġ'],
  h: ['һ','ɦ'],
  i: ['і','ι','ı'],
  j: ['ј'],
  k: ['κ','ḳ'],
  l: ['ⅼ','ł'],
  m: ['ｍ','ṃ'],
  n: ['п','ṅ'],
  o: ['о','σ','ɵ'],
  p: ['р','ρ'],
  q: ['զ'],
  r: ['ṛ','ŗ'],
  s: ['ѕ','š','ş'],
  t: ['т','ṭ'],
  u: ['υ','ս'],
  v: ['ν','ṿ'],
  w: ['ｗ','ẇ'],
  x: ['х','ẋ'],
  y: ['у','ỵ'],
  z: ['ᴢ','ź'],
  // for-uppercase
  A: ['А','Ά'],
  B: ['Β','В'],
  C: ['С'],
  D: ['Ḓ'],
  E: ['Ε','Е'],
  F: ['Ғ'],
  G: ['ɢ'],
  H: ['Н'],
  I: ['І','Ι'],
  J: ['Ј'],
  K: ['Κ','Κ'],
  L: ['Ӏ'],
  M: ['М'],
  N: ['Ν'],
  O: ['О','Θ'],
  P: ['Р'],
  Q: ['Ⴓ'],
  R: ['Я'],
  S: ['Ѕ'],
  T: ['Τ'],
  U: ['Ս'],
  V: ['Ⅴ'],
  W: ['Ԝ'],
  X: ['Х'],
  Y: ['Υ'],
  Z: ['Ζ'],
  // for-digits
  '0': ['Ｏ'],
  '1': ['ⅼ','۱'],
  '2': ['٢'],
  '3': ['３'],
  '4': ['４'],
  '5': ['５'],
  '6': ['٦'],
  '7': ['７'],
  '8': ['８'],
  '9': ['９']
};

// Build reverse map for deobfuscation
const reverseMap = {};
for (const [k, arr] of Object.entries(LOOKALIKES)) {
  for (const ch of arr) {
    reverseMap[ch] = k;
  }
}

/**
 * Choose a random element from an array
 */
function choice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * obfuscate(text, options)
 * options:
 *  - fraction: fraction of obfuscatable characters to replace (0..1). Default 1.
 *  - preserveDigits: if true, don't obfuscate digits. Default false.
 */
function obfuscate(text = '', options = {}) {
  const { fraction = 1, preserveDigits = false } = options;
  if (typeof text !== 'string') text = String(text);

  // validate fraction
  const frac = Math.max(0, Math.min(1, Number(fraction) || 0));

  let result = '';
  for (const ch of text) {
    // optionally skip digits
    if (preserveDigits && /\d/.test(ch)) {
      result += ch;
      continue;
    }

    // apply replacement with probability = frac
    if (LOOKALIKES[ch] && Math.random() < frac) {
      result += choice(LOOKALIKES[ch]);
    } else if (LOOKALIKES[ch.toLowerCase()] && Math.random() < frac && ch === ch.toLowerCase()) {
      // small chance to match lowercase mapping using lowercase key (redundant but safe)
      result += choice(LOOKALIKES[ch.toLowerCase()]);
    } else {
      // no mapping or not replacing
      result += ch;
    }
  }
  return result;
}

/**
 * deobfuscate(text)
 * Replaces lookalikes back to ASCII where possible.
 */
function deobfuscate(text = '') {
  if (typeof text !== 'string') text = String(text);
  let out = '';
  for (const ch of text) {
    out += reverseMap[ch] || ch;
  }
  return out;
}

module.exports = { obfuscate, deobfuscate };
