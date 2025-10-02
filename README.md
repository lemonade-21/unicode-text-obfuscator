# text-obfuscator-simple

Tiny, dependency-free utility to **obfuscate** and **deobfuscate** text by replacing ASCII characters with visually similar Unicode lookalikes (Cyrillic, Greek, fullwidth, etc.). Useful for demo data, playful text effects, generating visually distinct IDs, or making text look “weird” while still readable.

---

## Features
- Fast, zero-dependency functions: `obfuscate()` and `deobfuscate()`.
- CLI tool for quick terminal usage.
- Options to control how many characters are obfuscated and whether to preserve digits.
- Designed small and safe for publishing to npm.

---

## Install

Install locally for a project:

```bash
npm install text-obfuscator-simple
```

Install globally:

```bash
npm install -g text-obfuscator-simple
```

---

## Usage (JS)

```js
// CommonJS
const { obfuscate, deobfuscate } = require('text-obfuscator-simple');

// Obfuscate everything possible
console.log(obfuscate('Hello world!'));

// Obfuscate ~50% of eligible characters
console.log(obfuscate('Hello world!', { fraction: 0.5 }));

// Preserve digits while obfuscating other characters
console.log(obfuscate('User ID: 1234', { preserveDigits: true }));

// Deobfuscate back to ASCII where mapping exists
const ob = obfuscate('Hello world!');
console.log('ob:', ob);
console.log('de:', deobfuscate(ob));
```

If you are using ES modules, import like:

```js
import { obfuscate, deobfuscate } from 'text-obfuscator-simple';
```

---

## API

### `obfuscate(text, options)`

- `text` — `string` (or value convertible to string). Required.
- `options` — `object` (optional):
  - `fraction` — `number` between `0` and `1`. Fraction of eligible characters to replace. Default: `1`.
  - `preserveDigits` — `boolean`. If `true`, digits are not obfuscated. Default: `false`.

Returns obfuscated `string`.

### `deobfuscate(text)`

- `text` — `string`. Required.

Returns a best-effort ASCII approximation by mapping known lookalike Unicode characters back to ASCII. Characters without mapping are left unchanged.

---

## CLI

After global install (or via `npm link` during development), run:

```bash
# Obfuscate
text-obfuscator "Hello world"

# Obfuscate with a fraction (0..1)
text-obfuscator "Hello world" --fraction=0.5

# Preserve digits
text-obfuscator "User 123" --preserve-digits

# Deobfuscate
text-obfuscator "Hеllo wσrld" --deobfuscate
```

---

## Examples

```bash
# Node inline
node -e "console.log(require('./index').obfuscate('Hello world'))"

# Deobfuscate inline
node -e "console.log(require('./index').deobfuscate('Неⅼłɵ ｗσŗłđ'))"
```

---

## Development & Testing

Quick local test:

```bash
# run smoke test
node test.js

# try CLI locally
npm link
text-obfuscator "Hello world" --fraction=0.6
```

When ready to publish:
1. Ensure `package.json.name` is unique on npm.
2. Bump version in `package.json` (semantic versioning).
3. Login to npm if needed: `npm login`.
4. Publish: `npm publish`  
   - If your package is scoped (e.g. `@yourname/package`) on first publish use:  
     `npm publish --access public`

---

## Packaging notes

- Keep `node_modules/` out of the repo (`.gitignore`).
- Keep development files (e.g., `test.js`, coverage) out of the published package via `.npmignore` if you want a smaller package:
  ```text
  test.js
  coverage/
  ```
- Provide `README.md` and `LICENSE` at package root so they are visible on npm and GitHub.

---

## Security & Limitations

- This is a visual obfuscation only — **not** encryption. Do **not** use this to protect secrets or sensitive data.
- Some Unicode lookalikes may not round-trip (i.e., deobfuscation may not perfectly restore every character).
- Rendering depends on fonts; certain consoles or fonts might display characters differently.

---

## Contributing

Contributions are welcome! Suggested improvements:
- Add TypeScript type definitions (`index.d.ts`).
- Expand the lookalike mappings and make them configurable.
- Add unit tests (Jest/mocha) for robust mapping coverage.

If you open issues or PRs, include clear examples and the Node version you use.

---

## Changelog

Keep a `CHANGELOG.md` in repo for meaningful releases. For initial publish, start with `1.0.0` and note the first stable API.

---

## License

This project is released under the MIT License — see `LICENSE` file for details.
