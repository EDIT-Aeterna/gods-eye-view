/**
 * Browser-side locale selection and persistence.
 *
 * Entry-only: this module touches `navigator`, `localStorage` and
 * `document`, so reusable/portable modules must not import it. The browser
 * application bootstrap calls `initBrowserLocale` before any controls render,
 * and the language control calls `persistLocale` on manual switches.
 */
import { detectLocaleFromTags, isSupportedLocale } from './core.js';

/** Namespaced storage key so co-hosted apps never collide. */
export const LOCALE_STORAGE_KEY = 'gods-eye-view.locale';

/** Read the saved locale; returns null when unset, invalid, or storage is unavailable. */
export function readStoredLocale(storage = globalThis.localStorage) {
  try {
    const value = storage?.getItem(LOCALE_STORAGE_KEY);
    return isSupportedLocale(value) ? value : null;
  } catch {
    return null;
  }
}

/** Persist a manual choice; storage failures (privacy mode) are non-fatal. */
export function persistLocale(locale, storage = globalThis.localStorage) {
  try {
    storage?.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    /* Session-only switch; the app keeps running. */
  }
}

/**
 * Locale from browser preferences: `navigator.languages` first, then the
 * legacy `navigator.language`, then null (caller falls back to English).
 */
export function detectBrowserLocale(navigatorRef = globalThis.navigator) {
  return detectLocaleFromTags(
    navigatorRef?.languages?.length
      ? navigatorRef.languages
      : navigatorRef?.language
        ? [navigatorRef.language]
        : [],
  );
}

/**
 * Resolve the startup locale: saved choice first, then browser preference,
 * then English. Returns the resolved tag without touching any state.
 */
export function resolveStartupLocale(storage = globalThis.localStorage) {
  return readStoredLocale(storage) ?? detectBrowserLocale() ?? 'en';
}

/** Keep `<html lang>` in sync with the active locale. */
export function applyDocumentLanguage(
  locale,
  documentRef = globalThis.document,
) {
  if (documentRef?.documentElement) {
    documentRef.documentElement.lang = locale;
  }
}
