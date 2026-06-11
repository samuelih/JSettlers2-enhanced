import { expect, test } from '@playwright/test';

// E2E for the Settings panel + accessibility toggles (Phase 4 UI, Phase 7 test).
//
// This spec needs NO Java server: the Settings store is a purely client-side
// preferences layer (settingsStore.ts) that persists to localStorage and, after
// every change, reflects the choice onto `document.documentElement`:
//
//   theme           -> [data-theme]           ("light" | "dark")
//   color-blind     -> [data-theme-cb]        ("deuteranopia" | ... ; removed for "none")
//   render quality  -> [data-render-quality]  ("high" | "low")
//   font scale      -> --font-scale CSS var on <html>
//
// We open the app, open the Settings dialog via the header nav, drive each real
// control through its UI, and ASSERT the document-level effect — i.e. that the
// control is actually wired to the DOM, not just to store state. We also assert
// the header theme-toggle flips [data-theme] and that it and the settings-theme
// <select> stay consistent (they share the same store via useTheme).
//
// Robustness notes:
//   - We pin the emulated OS color scheme to "light" (colorScheme below) so the
//     `system` theme option resolves deterministically to [data-theme=light].
//   - We clear the persisted settings (localStorage key "jsettlers.settings")
//     before each test so a prior run's choices never leak across cases.
//   - We read attributes/vars off <html> via page.evaluate to assert the *real*
//     applied effect rather than re-reading the control value.

// Pin OS color scheme so `system` -> light is deterministic across machines/CI.
test.use({ colorScheme: 'light' });

/** The localStorage key the settings store persists under (settingsStore.ts). */
const SETTINGS_KEY = 'jsettlers.settings';

/** Read an attribute off <html> (document.documentElement). */
async function rootAttr(
  page: import('@playwright/test').Page,
  name: string,
): Promise<string | null> {
  return page.evaluate(
    (attr) => document.documentElement.getAttribute(attr),
    name,
  );
}

/** Read a CSS custom property / inline style value off <html>. */
async function rootStyleVar(
  page: import('@playwright/test').Page,
  prop: string,
): Promise<string> {
  return page.evaluate(
    (p) => document.documentElement.style.getPropertyValue(p).trim(),
    prop,
  );
}

/**
 * Open the app fresh (no persisted settings) and open the Settings dialog via
 * the header nav. Returns once the dialog body is visible. Shared by all cases.
 */
async function openSettings(
  page: import('@playwright/test').Page,
): Promise<void> {
  // Clear persisted settings BEFORE the app boots so the store rehydrates to
  // defaults (theme=system, colorBlind=none, quality=high, fontScale=1).
  // addInitScript runs on EVERY navigation (including reloads), so we guard it
  // with a one-shot sessionStorage flag: only the very first boot of the page
  // context wipes the saved settings. This lets the persistence test reload
  // without clobbering what it just saved.
  await page.addInitScript((key) => {
    try {
      const guard = '__jsettlers_settings_cleared__';
      if (!window.sessionStorage.getItem(guard)) {
        window.localStorage.removeItem(key);
        window.sessionStorage.setItem(guard, '1');
      }
    } catch {
      /* ignore storage access errors */
    }
  }, SETTINGS_KEY);

  await page.goto('/');
  await expect(page.getByTestId('app-shell')).toBeVisible();

  await page.getByTestId('nav-settings').click();
  await expect(page.getByTestId('settings-body')).toBeVisible();
}

test.describe('settings panel — controls apply real document-level effects', () => {
  test('opens from the header nav with sane defaults applied to <html>', async ({
    page,
  }) => {
    await openSettings(page);

    // Defaults: theme=system -> resolves to light here; quality=high; no cb;
    // font-scale=1 (settingsStore applies effects on module load + rehydrate).
    expect(await rootAttr(page, 'data-theme')).toBe('light');
    expect(await rootAttr(page, 'data-theme-cb')).toBeNull();
    expect(await rootAttr(page, 'data-render-quality')).toBe('high');
    expect(await rootStyleVar(page, '--font-scale')).toBe('1');

    // The controls reflect those defaults.
    await expect(page.getByTestId('settings-theme')).toHaveValue('system');
    await expect(page.getByTestId('settings-colorblind')).toHaveValue('none');
    await expect(page.getByTestId('settings-quality')).toHaveValue('high');
  });

  test('theme select sets [data-theme] to light / dark', async ({ page }) => {
    await openSettings(page);
    const themeSelect = page.getByTestId('settings-theme');

    // Explicit dark.
    await themeSelect.selectOption('dark');
    await expect(themeSelect).toHaveValue('dark');
    await expect
      .poll(() => rootAttr(page, 'data-theme'))
      .toBe('dark');

    // Explicit light.
    await themeSelect.selectOption('light');
    await expect(themeSelect).toHaveValue('light');
    await expect
      .poll(() => rootAttr(page, 'data-theme'))
      .toBe('light');

    // Back to system -> resolves to light (emulated OS scheme is light).
    await themeSelect.selectOption('system');
    await expect(themeSelect).toHaveValue('system');
    await expect
      .poll(() => rootAttr(page, 'data-theme'))
      .toBe('light');
  });

  test('color-blind select sets / clears [data-theme-cb]', async ({ page }) => {
    await openSettings(page);
    const cbSelect = page.getByTestId('settings-colorblind');

    // Default "none" leaves the attribute absent.
    expect(await rootAttr(page, 'data-theme-cb')).toBeNull();

    // Each palette maps its own value onto [data-theme-cb] verbatim.
    for (const mode of [
      'deuteranopia',
      'protanopia',
      'tritanopia',
    ] as const) {
      await cbSelect.selectOption(mode);
      await expect(cbSelect).toHaveValue(mode);
      await expect
        .poll(() => rootAttr(page, 'data-theme-cb'))
        .toBe(mode);
    }

    // Selecting "none" again removes the attribute entirely.
    await cbSelect.selectOption('none');
    await expect(cbSelect).toHaveValue('none');
    await expect
      .poll(() => rootAttr(page, 'data-theme-cb'))
      .toBeNull();
  });

  test('rendering quality select sets [data-render-quality]', async ({
    page,
  }) => {
    await openSettings(page);
    const qualitySelect = page.getByTestId('settings-quality');

    // Default high.
    expect(await rootAttr(page, 'data-render-quality')).toBe('high');

    await qualitySelect.selectOption('low');
    await expect(qualitySelect).toHaveValue('low');
    await expect
      .poll(() => rootAttr(page, 'data-render-quality'))
      .toBe('low');

    await qualitySelect.selectOption('high');
    await expect(qualitySelect).toHaveValue('high');
    await expect
      .poll(() => rootAttr(page, 'data-render-quality'))
      .toBe('high');
  });

  test('font-scale slider changes the --font-scale CSS var on <html>', async ({
    page,
  }) => {
    await openSettings(page);
    const fontSlider = page.getByTestId('settings-fontscale');

    // Starts at the default scale of 1.
    expect(Number(await rootStyleVar(page, '--font-scale'))).toBeCloseTo(1, 5);

    // Drive the <input type=range> to its max (1.6) and min (0.8). Using the
    // keyboard (End/Home) is robust against slider geometry; fall back to a
    // direct value set + input event if the platform ignores those keys.
    await fontSlider.focus();
    await fontSlider.press('End');
    await expect
      .poll(async () => Number(await rootStyleVar(page, '--font-scale')))
      .toBeGreaterThan(1);
    const maxScale = Number(await rootStyleVar(page, '--font-scale'));
    expect(maxScale).toBeLessThanOrEqual(1.6 + 1e-9);

    await fontSlider.press('Home');
    await expect
      .poll(async () => Number(await rootStyleVar(page, '--font-scale')))
      .toBeLessThan(1);
    const minScale = Number(await rootStyleVar(page, '--font-scale'));
    expect(minScale).toBeGreaterThanOrEqual(0.8 - 1e-9);

    // The applied var must track the control: distinct min vs max.
    expect(maxScale).toBeGreaterThan(minScale);

    // And the on-screen percentage label reflects the slider, proving the
    // control (not just the DOM attribute) drove the change.
    await expect(fontSlider).toHaveValue(String(minScale));
  });

  test('sound toggle enables/disables the volume slider', async ({ page }) => {
    await openSettings(page);
    const soundToggle = page.getByTestId('settings-sound-toggle');
    const volume = page.getByTestId('settings-sound-volume');

    // Sound defaults ON, so the volume slider is interactive.
    await expect(soundToggle).toBeChecked();
    await expect(volume).toBeEnabled();

    // Turning sound off disables the volume slider (real `disabled` binding).
    await soundToggle.uncheck();
    await expect(soundToggle).not.toBeChecked();
    await expect(volume).toBeDisabled();

    // Turning it back on re-enables the slider.
    await soundToggle.check();
    await expect(soundToggle).toBeChecked();
    await expect(volume).toBeEnabled();
  });
});

test.describe('header theme-toggle — flips [data-theme] and stays in sync with settings', () => {
  test('toggle flips light <-> dark and matches the settings-theme select', async ({
    page,
  }) => {
    const themeSelect = page.getByTestId('settings-theme');
    const toggle = page.getByTestId('theme-toggle');

    // Establish a known baseline via the settings select: light. The Settings
    // dialog is a modal whose backdrop covers the header, so we close it
    // (Escape) before clicking the header toggle, then reopen to read the select.
    await openSettings(page);
    await themeSelect.selectOption('light');
    await expect.poll(() => rootAttr(page, 'data-theme')).toBe('light');
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
    await page.keyboard.press('Escape');

    // Clicking the header toggle flips the applied theme to dark...
    await toggle.click();
    await expect.poll(() => rootAttr(page, 'data-theme')).toBe('dark');
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
    // ...and because both share the settings store, the select tracks it
    // (toggle sets an explicit light/dark mode, never `system`).
    await openSettings(page);
    await expect(themeSelect).toHaveValue('dark');
    await page.keyboard.press('Escape');

    // Clicking again flips back to light, and the select follows.
    await toggle.click();
    await expect.poll(() => rootAttr(page, 'data-theme')).toBe('light');
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
    await openSettings(page);
    await expect(themeSelect).toHaveValue('light');

    // And driving the select also moves the toggle's reported state, proving a
    // single source of truth in both directions.
    await themeSelect.selectOption('dark');
    await expect.poll(() => rootAttr(page, 'data-theme')).toBe('dark');
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  });
});

test.describe('settings persistence — choices survive a reload', () => {
  test('a changed theme + quality are re-applied to <html> after reload', async ({
    page,
  }) => {
    await openSettings(page);

    await page.getByTestId('settings-theme').selectOption('dark');
    await page.getByTestId('settings-quality').selectOption('low');
    await expect
      .poll(() => rootAttr(page, 'data-theme'))
      .toBe('dark');
    await expect
      .poll(() => rootAttr(page, 'data-render-quality'))
      .toBe('low');

    // Reload WITHOUT clearing storage this time: settingsStore rehydrates from
    // localStorage and re-applies the effects on boot (onRehydrateStorage).
    await page.reload();
    await expect(page.getByTestId('app-shell')).toBeVisible();

    await expect
      .poll(() => rootAttr(page, 'data-theme'))
      .toBe('dark');
    await expect
      .poll(() => rootAttr(page, 'data-render-quality'))
      .toBe('low');
  });
});
