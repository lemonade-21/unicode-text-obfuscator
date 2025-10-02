# unicode-text-obfuscator

![npm](https://img.shields.io/npm/v/unicode-text-obfuscator?color=brightgreen)
![license](https://img.shields.io/npm/l/unicode-text-obfuscator)
![CI](https://img.shields.io/github/actions/workflow/status/lemonade-21/unicode-text-obfuscator/publish.yml?branch=main)

Tiny, zero-dependency utility to **obfuscate** and **deobfuscate** text by replacing ASCII characters with visually similar Unicode lookalikes (Cyrillic, Greek, fullwidth, etc.). Useful for demo data, playful text effects, or making text look “weird” while still readable.

---

## Table of Contents
- [Overview](#overview)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
  - [`obfuscate(text, options)`](#obfuscatetext-options)
  - [`deobfuscate(text)`](#deobfuscate-text)
- [CLI Reference](#cli-reference)
- [Advanced Examples](#advanced-examples)
- [Edge Cases & Limitations](#edge-cases--limitations)
- [Performance](#performance)
- [Security & Privacy](#security--privacy)
- [Troubleshooting & FAQ](#troubleshooting--faq)
- [Tests & Development](#tests--development)
- [Releasing & Versioning](#releasing--versioning)
- [TypeScript Definitions](#typescript-definitions)
- [Contribution Guide](#contribution-guide)
- [Changelog Guidance](#changelog-guidance)
- [License](#license)

---

## Overview

**What it does**  
This package replaces ASCII characters in text with visually similar Unicode lookalikes, and provides a best-effort `deobfuscate` function to map them back.

**Use cases**
- Demo/test data
- Playful UI effects
- Generate visually distinct IDs or names

> ⚠️ **Not for security/encryption purposes.**

---

## Installation

```bash
npm install unicode-text-obfuscator       # Local project
npm install -g unicode-text-obfuscator    # Global CLI
npm install github:lemonade-21/unicode-text-obfuscator  # Direct from GitHub
```

---

## Quick Start

```js
const { obfuscate, deobfuscate } = require('unicode-text-obfuscator');

const original = 'Hello world 123';
const ob = obfuscate(original);
console.log('ob:', ob);

console.log('deobfuscated:', deobfuscate(ob));

console.log(obfuscate(original, { fraction: 0.5 }));
console.log(obfuscate(original, { preserveDigits: true }));
```

ES module import:

```js
import { obfuscate, deobfuscate } from 'unicode-text-obfuscator';
```

---

## API Reference

### `obfuscate(text, options)`

- **text** — `string | any`  
- **options** — `{ fraction?: number, preserveDigits?: boolean }`  
- **Returns** — `string`  

```js
obfuscate('Hello world', { fraction: 0.5, preserveDigits: true });
```

### `deobfuscate(text)`

- **text** — `string | any`  
- **Returns** — best-effort ASCII string  

```js
deobfuscate('Hеllo wσrld');
```

---

## CLI Reference

```bash
text-obfuscator "Hello world" [--fraction=0.5] [--preserve-digits] [--deobfuscate]
```

**Examples**

```bash
text-obfuscator "Hello world"
text-obfuscator "Hello world" --fraction=0.4
text-obfuscator "User 123" --preserve-digits
text-obfuscator "Hеllo wσrld" --deobfuscate
```

---

## Advanced Examples

- Partial obfuscation: `fraction: 0.5`  
- Preserve digits: `preserveDigits: true`  
- Obfuscating filenames or slugs
- Deterministic obfuscation via custom random seed (advanced)

---

## Edge Cases & Limitations

- Font-dependent rendering  
- Not all characters round-trip perfectly  
- Surrogate pairs/emoji not modified  
- Obfuscated text differs at byte level  

---

## Performance

- `O(n)` in string length  
- Fast for typical CLI or small UI use  
- For large text, process by line/chunk  

---

## Security & Privacy

- **Not encryption**: treat as plaintext  
- Offline, zero-dependency, safe  
- Do not use to store secrets  

---

## Troubleshooting & FAQ

- Deobfuscation may not fully restore text due to mapping limitations  
- Fonts may render some lookalikes identically  
- Deterministic output requires custom random seed  

---

## Tests & Development

```bash
node test.js        # smoke test
npm link            # test CLI locally
```

Add Jest or Node asserts for more robust testing.

---

## Releasing & Versioning

**Semantic versioning:** patch.minor.major  

```bash
npm version patch
git push --follow-tags
npm publish
```

**GitHub Actions example:** auto-publish on `v*.*.*` tags using NPM_TOKEN.

---

## TypeScript Definitions

```ts
export interface ObfuscateOptions {
  fraction?: number;
  preserveDigits?: boolean;
}
export function obfuscate(text: string | any, options?: ObfuscateOptions): string;
export function deobfuscate(text: string | any): string;
```

---

## Contribution Guide

1. Fork → branch → code → PR  
2. Add tests and update docs  
3. Keep dependency-free  
4. Add JSDoc for new functions  

---

## Changelog Guidance

```md
## [1.0.3] - 2025-10-03
### Added
- `preserveDigits` option
### Fixed
- Reverse mapping for Cyrillic 'е'
```

---

## License

MIT License — see [LICENSE](LICENSE)