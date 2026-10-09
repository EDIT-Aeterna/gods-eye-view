import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { LOCALE_STORAGE_KEY } from './browser.js';
import en from './locales/en.js';
import zhCN from './locales/zh-CN.js';

const repoRoot = fileURLToPath(new URL('../..', import.meta.url));
const indexHtml = readFileSync(`${repoRoot}/index.html`, 'utf8');

test('the pre-paint bootstrap uses the namespaced storage key', () => {
  assert.ok(
    indexHtml.includes(`'${LOCALE_STORAGE_KEY}'`),
    'index.html inline bootstrap must read gods-eye-view.locale',
  );
});

test('the pre-paint bootstrap mirrors the zh-CN loader status string', () => {
  assert.match(indexHtml, /loaderStatus\.textContent = '([^']+)';/);
  const inline = indexHtml.match(/loaderStatus\.textContent = '([^']+)';/)[1];
  assert.equal(inline, zhCN.boot.loader.status);
  assert.notEqual(inline, en.boot.loader.status);
});

test('the inline bootstrap recognizes both supported locale prefixes', () => {
  assert.ok(indexHtml.includes("lower.indexOf('en-') === 0"));
  assert.ok(indexHtml.includes("lower.indexOf('zh-') === 0"));
});

test('the inline bootstrap sets the document language', () => {
  assert.ok(indexHtml.includes('document.documentElement.lang = locale'));
});
