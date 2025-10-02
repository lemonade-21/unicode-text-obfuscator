#!/usr/bin/env node
// cli.js
'use strict';

const { obfuscate, deobfuscate } = require('./index');

const argv = process.argv.slice(2);

if (argv.length === 0) {
  console.log('Usage: text-obfuscator <text> [--deobfuscate] [--fraction=0.5] [--preserve-digits]');
  process.exit(1);
}

let text = argv[0];
const flags = argv.slice(1);

const params = {
  fraction: 1,
  preserveDigits: false
};

for (const f of flags) {
  if (f.startsWith('--fraction=')) {
    const v = parseFloat(f.split('=')[1]);
    if (!Number.isNaN(v)) params.fraction = Math.max(0, Math.min(1, v));
  }
  if (f === '--preserve-digits') params.preserveDigits = true;
  if (f === '--deobfuscate') {
    console.log(deobfuscate(text));
    process.exit(0);
  }
}

console.log(obfuscate(text, params));
