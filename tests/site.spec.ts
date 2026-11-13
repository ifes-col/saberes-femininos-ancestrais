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
  await page.goto('/galeria/');
  const galleryLink = page.locator('.gallery-card a').first();
  const imageResponse = await page.request.get((await galleryLink.getAttribute('href'))!);
  expect(imageResponse.ok()).toBeTruthy();
  expect(imageResponse.headers()['content-type']).toMatch(/^image\//);
  await page.getByRole('navigation', { name: 'Temas da galeria' }).getByRole('link', { name: 'Rodas de conversa' }).click();
  await expect(page).toHaveURL(/#rodas-de-conversa$/);
  const extraPhotos = page.locator('#rodas-de-conversa .gallery-more');
  await expect(extraPhotos).not.toHaveAttribute('open');
  await extraPhotos.locator('summary').click();
  const extraLink = extraPhotos.locator('.gallery-card a').last();
  await expect(extraLink).toBeVisible();
  expect((await page.request.get((await extraLink.getAttribute('href'))!)).ok()).toBeTruthy();
  await extraPhotos.locator('summary').click();
  await expect(extraLink).not.toBeVisible();
  await page.getByRole('link', { name: 'Equipe', exact: true }).first().click();
  await expect(page.locator('.person-card')).toHaveCount(9);
  await context.close();
});

test('prévia da galeria permite navegação e expansão acessível por teclado', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto('/galeria/');
  const navigation = page.getByRole('navigation', { name: 'Temas da galeria' });
  await expect(navigation.getByRole('link')).toHaveCount(5);
  await navigation.getByRole('link', { name: 'Mulheres ancestrais' }).click();
  await expect(page).toHaveURL(/#mulheres-ancestrais$/);
  const theme = page.locator('#mulheres-ancestrais');
  await expect(theme.locator('.gallery-card:visible')).toHaveCount(3);
  const details = theme.locator('.gallery-more');
  const summary = details.locator('summary');
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(details).toHaveAttribute('open');
  await expect(theme.locator('.gallery-card:visible')).toHaveCount(20);
  await expect(summary).toContainText('Recolher fotos de Mulheres ancestrais');
  const width = await page.evaluate(() => ({
    document: document.documentElement.scrollWidth,
    viewport: document.documentElement.clientWidth,
  }));
  expect(width.document).toBeLessThanOrEqual(width.viewport);
  const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
  expect(accessibility.violations).toEqual([]);
  await page.keyboard.press('Enter');
  await expect(details).not.toHaveAttribute('open');
  await expect(theme.locator('.gallery-card:visible')).toHaveCount(3);
  await expect(summary).toBeFocused();
});

test('visualizador navega em ciclo e devolve o foco ao fechar', async ({ page }) => {
  await page.goto('/resultados/mural-ancestral/');
  const firstPhoto = page.locator('.photo-grid a').first();
  await firstPhoto.click();
  const viewer = page.getByRole('dialog', { name: 'Visualizador de imagens do mural' });
  await expect(viewer).toBeVisible();
  const firstUrl = new URL(await firstPhoto.getAttribute('href') ?? '', page.url()).href;
  await expect(viewer.locator('img')).toHaveAttribute('src', firstUrl);
  await expect(viewer.locator('.lightbox-caption')).toContainText('Imagem 1 de 16');

  await viewer.getByRole('button', { name: 'Imagem anterior' }).click();
  await expect(viewer.locator('.lightbox-caption')).toContainText('Imagem 16 de 16');
  await page.keyboard.press('ArrowRight');
  await expect(viewer.locator('.lightbox-caption')).toContainText('Imagem 1 de 16');
  await viewer.getByRole('button', { name: 'Próxima imagem' }).click();
  await expect(viewer.locator('.lightbox-caption')).toContainText('Imagem 2 de 16');

  const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
  expect(accessibility.violations).toEqual([]);
  await page.keyboard.press('Escape');
  await expect(viewer).not.toBeVisible();
  await expect(firstPhoto).toBeFocused();
});

test('visualizador da galeria navega entre todas as fotos e devolve o foco', async ({ page }) => {
  await page.goto('/galeria/');
  const firstPhoto = page.locator('.gallery-card a').first();
  await firstPhoto.click();
  const viewer = page.getByRole('dialog', { name: 'Visualizador de imagens da galeria' });
  await expect(viewer).toBeVisible();
  await expect(viewer.locator('img')).toHaveAttribute('src', new URL((await firstPhoto.getAttribute('href'))!, page.url()).href);
  await expect(viewer.locator('.lightbox-caption')).toContainText('Imagem 1 de 72');
  await page.keyboard.press('ArrowLeft');
  await expect(viewer.locator('.lightbox-caption')).toContainText('Imagem 72 de 72');
  await viewer.getByRole('button', { name: 'Próxima imagem' }).click();
  await expect(viewer.locator('.lightbox-caption')).toContainText('Imagem 1 de 72');
  await viewer.getByRole('button', { name: 'Próxima imagem' }).click();
  await expect(viewer.locator('.lightbox-caption')).toContainText('Imagem 2 de 72');
  const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
  expect(accessibility.violations).toEqual([]);
  await page.keyboard.press('Escape');
  await expect(viewer).not.toBeVisible();
  await expect(firstPhoto).toBeFocused();

  const thirdPhoto = page.locator('#rodas-de-conversa .gallery-card a').nth(2);
  await thirdPhoto.click();
  await page.keyboard.press('ArrowRight');
  await expect(viewer.locator('.lightbox-caption')).toContainText('Imagem 4 de 72');
  await expect(viewer.locator('img')).toHaveAttribute('src', new URL((await page.locator('#rodas-de-conversa .gallery-card a').nth(3).getAttribute('href'))!, page.url()).href);
  await page.keyboard.press('Escape');
  await expect(thirdPhoto).toBeFocused();

  await page.locator('#rodas-de-conversa .gallery-more summary').click();
  const lastRoda = page.locator('#rodas-de-conversa .gallery-card a').last();
  await lastRoda.click();
  await expect(viewer.locator('.lightbox-caption')).toContainText('Imagem 10 de 72');
  await page.keyboard.press('ArrowRight');
  await expect(viewer.locator('.lightbox-caption')).toContainText('Imagem 11 de 72');
  await expect(viewer.locator('img')).toHaveAttribute('src', new URL((await page.locator('#caminhada-cientifica .gallery-card a').first().getAttribute('href'))!, page.url()).href);
  await viewer.getByRole('button', { name: 'Fechar visualizador' }).click();
  await expect(lastRoda).toBeFocused();
});

test('visualizador mantém a imagem e os controles visíveis em tela horizontal', async ({ page }) => {
  await page.setViewportSize({ width: 640, height: 320 });
  await page.goto('/resultados/mural-ancestral/');
  await page.locator('.photo-grid a').nth(5).click();
  for (const element of await page.locator('.lightbox img, .lightbox button, .lightbox-caption').all()) {
    const box = await element.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y).toBeGreaterThanOrEqual(0);
    expect(box!.y + box!.height).toBeLessThanOrEqual(320);
  }
});

for (const [width, height] of [[640, 320], [320, 320], [320, 480]] as const) {
  test(`visualizador da galeria mantém controles visíveis em ${width}x${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto('/galeria/');
    await page.locator('#caminhada-cientifica .gallery-card a').nth(1).click();
    for (const element of await page.locator('.lightbox img, .lightbox button, .lightbox-caption').all()) {
      const box = await element.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.y).toBeGreaterThanOrEqual(0);
      expect(box!.y + box!.height).toBeLessThanOrEqual(height);
    }
  });
}

test('marcas institucionais são carregadas no rodapé', async ({ page }) => {
  await page.goto('/');
  const images = page.locator('.institutional-brands img');
  await expect(images).toHaveCount(3);
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((element) => element instanceof HTMLImageElement ? element.naturalWidth : 0)).toBeGreaterThan(0);
    await expect(image).toHaveAttribute('alt', /.+/);
  }
});

test('galeria exibe o acervo completo, narrativas e grupos estáveis', async ({ page }) => {
  await page.goto('/galeria/');
  await expect(page.getByRole('heading', { name: 'Rodas de conversa' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Mulheres ancestrais' })).toBeVisible();
  await expect(page.locator('.gallery-theme')).toHaveCount(5);
  await expect(page.locator('.gallery-theme img')).toHaveCount(72);
  await expect(page.locator('.gallery-theme .gallery-card:visible')).toHaveCount(15);
  await expect(page.locator('.gallery-more:not([open])')).toHaveCount(5);
  await expect(page.locator('.gallery-narrative')).toHaveCount(4);
  for (const [id, count] of [
    ['rodas-de-conversa', 10],
    ['caminhada-cientifica', 16],
    ['pesquisa-no-territorio', 14],
    ['mulheres-ancestrais', 20],
    ['eventos-cientificos', 12],
  ] as const) {
    await expect(page.locator(`#${id} .gallery-card img`)).toHaveCount(count);
  }
  await expect(page.locator('#mulheres-ancestrais img[alt="Delza e Carminha"]')).toHaveCount(1);
  await expect(page.locator('#pesquisa-no-territorio img[alt="Visita guiada por Pauliane, no Terreirinho, Piedade"]')).toHaveCount(1);

  const convertedHeif = page.locator('#mulheres-ancestrais img[alt="Escadaria em homenagem a Guiomar Leite de Oliveira, no bairro da Piedade."]');
  await page.locator('#mulheres-ancestrais .gallery-more summary').click();
  await convertedHeif.scrollIntoViewIfNeeded();
  await expect.poll(() => convertedHeif.evaluate((image) => image instanceof HTMLImageElement ? image.naturalWidth / image.naturalHeight : 0)).toBeCloseTo(3024 / 4032, 2);
  expect((await page.request.get((await convertedHeif.locator('..').getAttribute('href'))!)).ok()).toBeTruthy();
  for (const image of await page.locator('#eventos-cientificos img').all()) {
    await expect(image).toHaveAttribute('alt', /^Registro fotográfico de evento científico \d+$/);
    await expect(image).not.toHaveAttribute('src', /whatsapp|c[oó]pia|IMG-/i);
  }

  await page.goto('/resultados/');
  await expect(page.getByRole('heading', { name: 'Eventos científicos.' })).toBeVisible();
  await expect(page.getByText('Esta seção está em preparação.')).toHaveCount(0);
});
