import fs from 'node:fs';

const files = fs
  .readdirSync('src/ui/templates')
  .filter((f) => f.endsWith('.html'));
const enPack = [];
function collect(node, ns) {
  for (const [k, v] of Object.entries(node)) {
    if (v && typeof v === 'object') collect(v, `${ns}.${k}`);
    else if (typeof v === 'string') enPack.push(v);
  }
}
for (const f of fs.readdirSync('src/i18n/locales/en')) {
  if (f.endsWith('.js')) {
    const src = fs.readFileSync(`src/i18n/locales/en/${f}`, 'utf8');
    const mod = src.replace(/^import[\s\S]*?from\s+'[^']*';\s*/m, '').replace(/export default /m, 'module.exports._pack = ');
    try {
      evalInModule(mod, f, (pack) => collect(pack, f.replace('.js', '')));
    } catch {
      enPack.push(`__FAILED_TO_PARSE__${f}`);
    }
  }
}
function evalInModule(code, name, cb) {
  const wrapped = `(function(module){ ${code} ; cb(module.exports._pack); })`;
  const fn = eval(wrapped);
  fn({ exports: {} }, (p) => cb(p));
}

// collect JS render strings from non-template, non-test sources
const jsStrings = [];
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = `${dir}/${e.name}`;
    if (e.isDirectory()) {
      if (!['node_modules', '.git', 'templates'].includes(e.name)) walk(p);
    } else if (/\.js$/.test(e.name) && !/test/.test(e.name)) {
      jsStrings.push(fs.readFileSync(p, 'utf8'));
    }
  }
}
walk('src/ui');
walk('src');

const known = enPack.join('\n') + '\n' + jsStrings.join('\n');
const brands =
  /^(OpenSky|adsb\.lol|AISStream|OpenStreetMap|Normal|HUD|VIEW|KTS|FLT|MIL|SITE|AIS|OFF|READY|ENABLE|DETECT|UNKNOWN)$/;

let realGaps = 0;
for (const f of files) {
  const html = fs.readFileSync(`src/ui/templates/${f}`, 'utf8');
  const re = /<([a-z0-9]+)([^>]*)>([^<>]*[A-Za-z]{3,}[^<>]*)<\/\1>/g;
  let m;
  const gaps = [];
  while ((m = re.exec(html))) {
    const [, tag, attrs, text] = m;
    if (/data-i18n|material-symbols|material-icons|aria-hidden/.test(attrs)) continue;
    if (['script', 'style', 'svg', 'path'].includes(tag)) continue;
    const clean = text.trim();
    if (!/[A-Za-z]{3,}/.test(clean)) continue;
    if (/^[a-z_]{3,20}$/.test(clean)) continue; // icon ligature
    if (brands.test(clean)) continue;
    if (/^[A-Z0-9 °·:.,\-—%/{}$#()]+$/.test(clean)) continue; // acronym/instrument jargon
    if (known.includes(clean)) continue; // translated at render time
    gaps.push(clean);
  }
  if (gaps.length) {
    realGaps += gaps.length;
    console.log(`== ${f}`);
    gaps.forEach((g) => console.log(`   "${g}"`));
  }
}
console.log('REAL template gaps (not in pack, not in JS, not brand/jargon):', realGaps);
