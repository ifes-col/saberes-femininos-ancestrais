import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('relatos das quatro áreas da galeria podem ser consultados sem JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/galeria/');
  const narratives = page.locator('.gallery-narrative');
  await expect(narratives).toHaveCount(4);
  for (const narrative of await narratives.all()) {
    await narrative.locator('summary').click();
  }
  await expect(page.getByRole('heading', { name: '1ª roda de conversa com a convidada Ana Paula Rocha' })).toBeVisible();
  await expect(page.getByText('Apresentação em eventos científicos.', { exact: true })).toBeVisible();
  await expect(page.getByText('A pesquisa também contou com a realização de entrevistas', { exact: false })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Rosa Maria Reis: o saber de reunir e celebrar' })).toBeVisible();
  await context.close();
});

test('relatos abertos atendem às verificações de acessibilidade', async ({ page }) => {
  await page.goto('/galeria/');
  for (const summary of await page.locator('.gallery-narrative summary').all()) {
    await summary.click();
  }
  const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
  expect(accessibility.violations).toEqual([]);
});

test('resultados apresentam os três eventos científicos da fonte', async ({ page }) => {
  await page.goto('/resultados/');
  await expect(page.getByRole('heading', { name: 'Eventos científicos.' })).toBeVisible();
  await expect(page.getByText('I Seminário Nacional Samba, Paulo Freire e Sustentabilidade', { exact: false })).toBeVisible();
  await expect(page.getByText('11ª Semana de Letras do Ifes Campus Vitória', { exact: false })).toBeVisible();
  await expect(page.getByText('Semana de Ciência e Tecnologia do Ifes Campus Vitória', { exact: false })).toBeVisible();
  await expect(page.locator('time[datetime]')).toHaveCount(3);
});

test('galeria usa duas colunas em telas estreitas', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto('/galeria/');
  const cards = page.locator('#rodas-de-conversa .gallery-card');
  const first = await cards.nth(0).boundingBox();
  const second = await cards.nth(1).boundingBox();
  const third = await cards.nth(2).boundingBox();
  expect(first).not.toBeNull();
  expect(second).not.toBeNull();
  expect(third).not.toBeNull();
  expect(second!.x).toBeGreaterThan(first!.x);
  expect(third!.y).toBeGreaterThan(first!.y);
});

test('créditos do livro e legendas sem etapa presumida estão disponíveis', async ({ page }) => {
  await page.goto('/resultados/livro/');
  await page.getByText('Créditos do livro').click();
  await expect(page.getByText('Identidade visual e projeto gráfico: Gustavo Binda.', { exact: false })).toBeVisible();
  await expect(page.getByText('Fotografias do livro:', { exact: false })).toBeVisible();
  const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
  expect(accessibility.violations).toEqual([]);
  await page.goto('/galeria/');
  await expect(page.getByRole('img', { name: 'Registro da caminhada científica.', exact: true })).toHaveCount(2);
  await expect(page.getByText('Integrantes da Pastoral da Criança: Delza, Carminha, Nadir e Terezinha.', { exact: true })).toHaveCount(1);
  await expect(page.getByText('Integrantes da Pastoral da Criança: Delza, Carminha, Nadir e Terezinha (da esquerda para a direita).', { exact: true })).toHaveCount(1);
  await expect(page.getByRole('img', { name: 'Carlita Corrêa Pereira', exact: true })).toHaveCount(1);
  await expect(page.getByRole('img', { name: 'Carmen Alonso Pascolar', exact: true })).toHaveCount(1);
  await expect(page.getByRole('img', { name: 'Pesquisadores na Escadaria Guiomar Leite de Oliveira, na Piedade', exact: true })).toHaveCount(1);
});
