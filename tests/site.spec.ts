import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = [
  '/',
  '/apresentacao/',
  '/equipe/',
  '/resultados/',
  '/resultados/livro/',
  '/resultados/mural-ancestral/',
  '/galeria/',
  '/contato/',
];

test('páginas e links internos estão disponíveis', async ({ page, request }) => {
  for (const path of pages) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    await expect(page.locator('h1'), path).toHaveCount(1);
    const links = await page.locator('a[href^="/"]').evaluateAll((anchors) =>
      anchors.map((anchor) => anchor.getAttribute('href')).filter((href): href is string => href !== null),
    );
    for (const href of new Set(links)) {
      expect((await request.get(href)).ok(), `${path} → ${href}`).toBeTruthy();
    }
  }
});

for (const path of pages) {
  test(`acessibilidade automatizada: ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
    expect(results.violations).toEqual([]);
  });
}

for (const width of [320, 375, 768, 1024, 1440]) {
  test(`conteúdo sem transbordamento em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of pages) {
      await page.goto(path);
      const sizes = await page.evaluate(() => ({
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: document.documentElement.clientWidth,
      }));
      expect(sizes.documentWidth, path).toBeLessThanOrEqual(sizes.viewportWidth);
    }
  });
}

test('conteúdo essencial e galeria funcionam sem JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/resultados/mural-ancestral/');
  await expect(page.locator('.photo-grid img')).toHaveCount(16);
  const photoLink = page.locator('.photo-grid a').first();
  expect((await page.request.get((await photoLink.getAttribute('href'))!)).ok()).toBeTruthy();
  await page.getByRole('link', { name: 'Equipe', exact: true }).first().click();
  await expect(page.locator('.person-card')).toHaveCount(9);
  await context.close();
});

test('seções ainda sem material não fingem ter conteúdo', async ({ page }) => {
  await page.goto('/galeria/');
  await expect(page.getByText('Esta galeria está em preparação.')).toBeVisible();
  await page.goto('/resultados/');
  await expect(page.getByText('Esta seção está em preparação.')).toBeVisible();
});
