import { test, expect } from '@playwright/test';

test('dados do projeto ficam compactos e podem ser abertos pelo teclado', async ({ page }) => {
  await page.goto('/apresentacao/');
  const details = page.locator('.project-info details');
  const summary = details.locator('summary');
  await expect(details).not.toHaveAttribute('open');
  expect((await details.boundingBox())!.height).toBeLessThan(120);
  await expect(details.getByText('Luciana Silvestre Girelli')).not.toBeVisible();
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(details.getByText('Luciana Silvestre Girelli')).toBeVisible();
  await expect(details.getByText('2026-3277F').first()).toBeVisible();
});

for (const width of [375, 1440]) {
  test(`legendas e marcas institucionais centralizadas em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const figures = page.locator('.institutional-brands figure');
    await expect(figures).toHaveCount(3);
    for (const figure of await figures.all()) {
      const image = figure.locator('img');
      const caption = figure.locator('figcaption');
      const figureBox = await figure.boundingBox();
      const imageBox = await image.boundingBox();
      expect(figureBox).not.toBeNull();
      expect(imageBox).not.toBeNull();
      expect(Math.abs((figureBox!.x + figureBox!.width / 2) - (imageBox!.x + imageBox!.width / 2))).toBeLessThan(1);
      await expect(caption).toHaveCSS('text-align', 'center');
    }
    await expect(figures.nth(0).locator('figcaption')).toHaveText('Ifes – campus Vitória');
    await expect(figures.nth(1).locator('figcaption')).toHaveText('Fapes – Governo do Espírito Santo');
  });
}
