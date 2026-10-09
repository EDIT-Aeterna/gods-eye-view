/**
 * Simplified Chinese message pack. Keys must mirror `en.js` exactly; missing
 * keys fall back to English at runtime, and the coverage test enforces parity.
 */
import common from './zh-CN/common.js';
import boot from './zh-CN/boot.js';
import welcome from './zh-CN/welcome.js';
import chrome from './zh-CN/chrome.js';
import context from './zh-CN/context.js';
import cockpit from './zh-CN/cockpit.js';
import cctv from './zh-CN/cctv.js';
import display from './zh-CN/display.js';
import dock from './zh-CN/dock.js';
import feedback from './zh-CN/feedback.js';
import hud from './zh-CN/hud.js';
import imagery from './zh-CN/imagery.js';
import layers from './zh-CN/layers.js';
import location from './zh-CN/location.js';
import mapsource from './zh-CN/mapsource.js';
import radio from './zh-CN/radio.js';
import scenes from './zh-CN/scenes.js';
import settings from './zh-CN/settings.js';
import sdr from './zh-CN/sdr.js';
import streetlevel from './zh-CN/streetlevel.js';
import voice from './zh-CN/voice.js';
import weather from './zh-CN/weather.js';

export default {
  common,
  boot,
  welcome,
  chrome,
  context,
  cockpit,
  cctv,
  display,
  dock,
  feedback,
  hud,
  imagery,
  layers,
  location,
  mapsource,
  radio,
  scenes,
  settings,
  sdr,
  streetlevel,
  voice,
  weather,
};
