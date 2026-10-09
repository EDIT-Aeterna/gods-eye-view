/**
 * Simplified Chinese message pack. Keys must mirror `en.js` exactly; missing
 * keys fall back to English at runtime, and the coverage test enforces parity.
 */
import common from './zh-CN/common.js';
import boot from './zh-CN/boot.js';
import welcome from './zh-CN/welcome.js';
import chrome from './zh-CN/chrome.js';

export default {
  common,
  boot,
  welcome,
  chrome,
};
