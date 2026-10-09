# i18n Coverage — God's Eye View zh-CN

Status ledger for the Simplified Chinese localization, per module. This file
is the review checklist for "complete own-UI coverage": every row records the
implementation state, how it was verified, and anything deliberately left
English with a reason. Update it whenever UI text is added or moved.

Verified against base `6be2559` on `codex/i18n-zh-cn`, including the
2026-10-09 acceptance-review fixes (privacy-mode storage guards, keyed panel
collapse actions, sync-chip initial copy, locale-pinned QA gates).

Legend: ✅ translated + verified · 🟡 translated, partial (see note) · ⬜ kept
English by decision · ➖ not applicable.

## Architecture

| Piece | State | Verified by |
| --- | --- | --- |
| `src/i18n/core.js` engine (keys, `{param}` interpolation, en fallback, plurals, Intl formatters) | ✅ | `src/i18n/core.test.mjs` (13 tests) |
| Locale packs (35 namespaces, en + zh-CN) | ✅ | `src/i18n/locales/parity.test.mjs` (key + placeholder parity) |
| Saved > browser > en locale resolution, `gods-eye-view.locale` persistence | ✅ | `src/i18n/browser.js` + live browser matrix (below); storage is resolved inside the guards, so a privacy mode whose `localStorage` **getter** throws cannot block startup (`browser.test.mjs` + a real browser session with a throwing getter) |
| Pre-paint loading-screen localization (`public/locale-boot.js`) | ✅ | `src/i18n/bootMarkup.test.mjs` + browser: zh first paint |
| No-reload switch via Display-panel language select | ✅ | live matrix: open panels re-render instantly |
| Static markup binding (`data-i18n`, `data-i18n-attr`) | ✅ | `src/ui/staticI18n.js` + browser |
| English regression (default locale byte-identical output) | ✅ | existing suite green; en pack values verbatim |

## Live browser acceptance matrix (dev server, Chrome)

| Scenario | Result |
| --- | --- |
| Saved `zh-CN`, cold load | ✅ zh loading screen pre-paint, zh welcome launcher, zh HUD/dock |
| Browser locale `zh` (no saved choice) | ✅ detected → zh (headless system locale) |
| Saved `en` on a zh machine | ✅ en boot, beats browser preference |
| Persistence across reload | ✅ choice survives; no re-prompt |
| zh↔en switch, no reload | ✅ open panels re-render in place; `document.documentElement.lang` follows |
| Switch with a selected/tracked contact | ✅ subject, cohort distances, camera and trail preserved (SWA396 across zh→en→zh) |
| Injection probe (`<img onerror>` via search) | ✅ rendered as text; no element created, no handler fired |
| Share link | ✅ `#v=2` protocol unchanged; copy toast localized (honest failure path verified in sandbox) |
| Layout 1440×900 / 1024×768 / 800×600 | ✅ no clipped chrome, no horizontal overflow (qa-artifacts/i18n/*.png) |
| Production `build` + `preview` | ✅ zh detected and applied in dist output, no page errors |

Evidence screenshots: `qa-artifacts/i18n/` (git-ignored; regenerate with the
steps in the PR description).

## Module coverage

### Chrome and shells
| Module | State | Notes |
| --- | --- | --- |
| `index.html` + loading screen | ✅ | pre-paint zh; brand title kept |
| Title bar, top actions, style indicator, status chips, toast | ✅ | `chrome` pack; chip labels re-render via `loadingFeedback` |
| Welcome launcher (`welcome.html`, `firstRunExperience.js`) | ✅ | incl. runtime-painted ENVIRONMENTAL tile title |
| Command dock (visual presets, location bar, search) | ✅ | `dock` pack |
| Display panel (`display-controls.html`, `visualSettings.js`) | ✅ | language selector lives here; style status labels keyed |
| Data Layers panel (`layerPanel.js`) | ✅ | groups, states, meta lines, ages; every registered layer id keyed |
| Context rail (contacts/missions/radio/SDR) | ✅ | `context`, `radio`, `sdr` packs |
| Weather rail cards + timeline (`weatherPanel.js`, `rail*.js`) | ✅ | `weather` pack; UTC suffix kept |
| Cockpit (`cockpit.html`, `cockpit*.js`) | ✅ | `cockpit` pack; classification banner + instrument abbreviations kept |
| HUD (`hud.js`, `hudLocality.js`, `hudSummaryResponse.js`) | 🟡 | labels/bands/regions/locality zh; `TOP SECRET // SI-TK // NOFORN` banner kept verbatim (visual-design contract); HUD summary provenance layer NAMES pass through registration English (voice/HUD matching keys) |
| Provider Settings (`provider-settings.html`, `keySetup.js`, `keySetupCore.mjs`) | ✅ | rows/status/OAuth flow zh; server validation/refusal strings kept English (protocol responses rendered verbatim) — documented exclusion |
| Voice UI (`voice/*`) | ✅ | spoken replies + cards zh; tool schemas/system prompts untouched |
| Scenes director UI (`sceneControls/Presentation/Sharing`) | ✅ | `scenes` pack; director-produced statuses keyed at production |
| Street Level UI | ✅ | `streetlevel` pack; provider chips keep Mapillary |
| Recent Imagery UI (`recentImagery.js`, `imageryBoxTool.js`) | ✅ | `imagery` pack; NASA GIBS/HLS/VIIRS credit kept |
| Map stack chips (`maps/*`, `mapStackChips.js`) | ✅ | provider names kept |
| Location bar presets (`locations.js` + `location*`) | ✅ | record `name` fields stay English (geocoder/voice/CCTV matching keys); display resolves via `location` pack |
| MCP panel host (`globePanelRuntime.js`) | ⬜ | serialized into the host page without imports; dev-hosted fallback surface — excluded, listed for a future wave |

### Layer families (cards, panels, summaries, overlays)
| Family | State | Pack |
| --- | --- | --- |
| Launches / Space Missions | ✅ | `space` |
| Satellites (+ class legend) | ✅ | `space` (DENSE chip token kept) |
| Global Context / awareness | ✅ | `awareness` (engine reason strings translated at panel edge) |
| Earthquakes | ✅ | `geology` |
| Submarine cables | ✅ | labels are data; row name keyed |
| Weather (radar/lightning/clouds) | ✅ | `atmos` |
| Wind | ✅ | `atmos` |
| Cyclones | ✅ | `hazard` |
| FIRMS fires | ✅ | `hazard` |
| Fire perimeters | ✅ | `hazard` |
| Flights / Military / Vessels (tracked cards, HUD AIS) | ✅ | `fleet` |
| Aircraft classes + AIS vessel types | ✅ | parallel key maps; data tokens byte-identical |
| Local ADS-B | ✅ | `sensors` (ICAO/ALT/GS/TRK/V-S abbreviations kept) |
| Traffic | ✅ | `ground` (TomTom/OSM/Hybrid chip tokens kept) |
| Transit / Bikeshare | ✅ | `ground` |
| Directions (turn-by-turn) | ✅ | `ground`; served OSRM instruction recomposed client-side |
| ALPR | ✅ | `sensors` |
| Installations | ✅ | `sensors` |
| Radio (layer) | ✅ | `airwaves` incl. directory status sentences |
| Draw / annotations | ✅ | `draw` |
| Bhote Koshi event panel | ✅ | `events`; evidence data titles are join keys, kept |
| Analyst answer card caveats | ✅ | `analyst` |
| Scenarios/director flows | ✅ | `director`; field-validation internals kept (diagnostic) |

### Deliberate English exclusions
| Content | Reason |
| --- | --- |
| Layer registration `name:`/`source:` fields | voice/HUD/QA matching keys; display resolves via `PANEL_LABEL_KEYS` / pack maps |
| Portable boundary modules (`layers/*/source|records|recordPolicy|ingestion` for flights/military/vessels, `sources/*`, `director/playback.js`) | portable package graphs stay free of presentation; composed status strings translate at the presentation edge |
| Server protocol error JSON (Provider Settings, OpenAI realtime, regional providers, Overpass, GBFS, terrain) | server responses rendered verbatim by contract; the browser presents its own fallback copy where one exists |
| Voice tool schemas, system prompts, action ids, `server/providers/openai/tools.js` | model contract, not UI |
| Entity names (callsigns, MMSI, ship/satellite names), coordinates, MGRS | data |
| Brands: God's Eye View, Cesium, Google, Bing, Esri, OSM, TomTom, Mapillary, NOAA, NHC, CelesTrak, adsb.lol, AISStream, OpenSky, Radio Browser, USGS, NASA, InciWeb, WebUSB, RTL-SDR | proper nouns |
| Units and conventions: kt, ft, km, m, dBZ, MW, UTC, °C, FL, MGRS, GSD, NIIRS, ALT, ONA, COLL, HDG, BRG, ICAO, MMSI, MSG/S, N/E/S/W compass | standard symbols per task rules |
| HUD classification banner `TOP SECRET // SI-TK // NOFORN` | fictional visual-design marking, pinned by source-shape tests |
| `data/dataCredits.js` attribution lines | legal text kept verbatim (may gain a gloss later without replacing the original) |
| Analyst spec-error templates, director field-validation messages | model-/developer-facing diagnostics |
| Third-party content (live feeds, provider pages, model voices) | outside own UI; speech audio language follows the realtime model, documented in README |

### Known gaps (honest ledger)
- HUD summary provenance lists layer registration names (English) — the
  summary line prefix/state is zh, names stay matching keys.
- Loading-chip detail lines that embed producer `statusMessage` strings
  (e.g. `adsb.lol · 250nm regional fallback`) keep the producer's English.
- Some state-held error/status lines re-render on their next data tick rather
  than instantly at switch (directions/routing errors, firms context records,
  cockpit pushed signal rows ≤250 ms, transient voice `say()` lines).
- Story/evidence titles inside `event.json` (Bhote Koshi data) and recipe shot
  titles stay English (join keys for packs/append matching).
- Voice replies generated by the realtime model follow the model's language,
  not the UI locale; the app's own spoken lines and cards are zh.
- `globePanelRuntime.js` (MCP host fallback UI) remains English (import-free
  surface).

## Automated checks

Numbers below are from commit `74d5a5c` + the acceptance-report fixes, on
Windows / Node 24.16.0 / Chrome 152 (npmmirror build), dev server on
`localhost:4173`.

- `npm test` — 6,246 tests; 6,235 pass, 1 fail, 10 skipped. The only failure
  (`codexOauthRealtime` executable resolution) reproduces on base `6be2559`
  on Windows and is untouched by this work.
- `npm run test:track` — **109/109** (the harness pins `en` before load; its
  visible-text assertions are English contracts).
- `npm run format:check` (1,380 files), `npm run check:boundaries`,
  `npm run build` — green.
- i18n suites: `core.test.mjs` (13), `browser.test.mjs` (10, incl. the
  privacy-mode getter/getItem/setItem guards), `locales/parity.test.mjs` (3),
  `bootMarkup.test.mjs` (5).

### Locale-relevant browser gates

| Gate | Result | Notes |
| --- | --- | --- |
| `qa:panel-resize` | pass (verified in the 2026-10-09 acceptance run) | locale-independent; not re-run after the collapse-label fix |
| `qa:map-source-tray` | **locale assertions fixed; 2 environment failures remain** | The gate now pins `en` before load; the Esri fallback message asserted in English renders correctly (80 assertions pass). The two remaining failures are network-environmental on this machine: `services.arcgisonline.com/?f=json` is CORS-unreachable (so Esri is classified "unavailable" instead of "tile requests failed") and Bing `http:` tile probes are CSP-blocked, which trips the "no console errors" check. Neither is locale- or translation-related; the gate passes on a network that reaches those endpoints. |
| `qa:street-level:fixtures` | **pass 29/29** | was failing on zh button text (`BUTTON:开` vs `BUTTON:ON`); the gate pins `en` and passes with a dummy Mapillary token. One earlier run hit a flaky photo-click (`images:0` at click time) that did not reproduce on the warmed server. |
| `qa:transit` | **launch fixed; live-feed wait times out here** | The gate hardcoded the macOS Chrome path and never launched on Windows; it now resolves Chrome like every other gate (12/12 heading-regression assertions pass). The Boston (MBTA) section times out waiting 90 s for real GTFS-RT vehicles — a live-feed dependency, not a locale issue. |

### Browser acceptance matrix notes

The matrix below was verified live on 2026-10-09; the acceptance review later
found the initial-state sync chips and the panel collapse labels, which are
now fixed and re-verified in a throwing-localStorage privacy-mode browser
session (boot succeeds, `展开 数据图层`/`折叠 显示` labels, zh chips, no
page errors).
