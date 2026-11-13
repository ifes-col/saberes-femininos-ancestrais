# Saberes Femininos Ancestrais

Site estático do projeto Saberes Femininos Ancestrais, feito com Astro, TypeScript e CSS. Não há backend, banco de dados ou serviços de rastreamento.

## Executar com Docker Compose

Instale Docker Engine e Docker Compose e inicie o daemon do Docker. Crie o arquivo local de configuração a partir do exemplo:

```sh
cp .env.example .env
docker compose up --build -d
```

O site estará em `http://127.0.0.1:8080`. `SITE_HOST` e `SITE_PORT` no `.env` configuram o endereço e a porta; por padrão o acesso fica restrito à própria máquina. Para publicar em rede, ajuste `SITE_HOST` somente após avaliar a segurança e as autorizações de conteúdo. Após mudar `SITE_URL`, reconstrua a imagem com `docker compose up --build -d`. Para encerrar, use `docker compose down`.

O Compose usa Node.js somente no estágio de build e serve os arquivos estáticos com Nginx no container final. A configuração `.env` não é versionada nem copiada para a imagem; `.env.example` contém apenas valores de exemplo. A imagem não inclui `fonte/`. O container serve o site na raiz do endereço; hospedagem em subdiretório exige configuração específica no proxy/servidor.

## Desenvolvimento local opcional

- Node.js 26.13.1 (consulte `.nvmrc`) e npm.

```sh
nvm use
npm ci
npm run dev
```

O comando de desenvolvimento informa o endereço local. Para validar e gerar o site:

```sh
npm run check
npm run build
npx playwright install chromium
npm test
npm run preview
```

O teste usa a porta local 43147 e inicia e encerra seu próprio servidor de prévia. `playwright install chromium` só é necessário quando o navegador do Playwright ainda não estiver instalado; algumas distribuições também podem precisar de suas dependências de sistema.

## Conteúdo e publicação

- Textos e páginas estão em `src/pages/`; equipe e fotografias do mural em `src/data/`. Mantenha nomes, funções, textos alternativos e créditos conferidos com as fontes.
- Os recursos usados pelo site estão em `src/assets/` e são transformados durante a compilação. O diretório `fonte/` é apenas material de referência e não é necessário para executar ou construir o site. O livro é acessado pelo repositório do Ifes; o PDF local não é incluído no build.
- A galeria geral já conta com material visual organizado por temas e a seção de publicações e eventos continua em preparação enquanto os materiais forem confirmados.
- **Antes de publicar**, confirme a autorização para imagens e nomes, inclusive de menores de idade, os créditos, a licença da fonte, a revisão editorial e a acessibilidade do livro. As imagens de equipe e mural já aparecem na prévia e no build; não envie `dist/` para hospedagem pública até concluir essas verificações.
- A saída `dist/` pode ser servida por qualquer hospedagem estática. Não foi configurada publicação automática nem escolhido provedor.
- Após definir o domínio, use `SITE_URL=https://exemplo.org npm run build` para habilitar URLs canônicas. Para hospedagem em subdiretório, defina também `SITE_BASE=/nome-do-site`; teste os links no endereço final. Configure o sitemap e as regras de 404 e HTTPS no provedor escolhido.
- Para atualizar o site, revise os arquivos, execute as verificações e publique novamente o build. Veja as decisões e pendências em [plano-website.md](./plano-website.md).
