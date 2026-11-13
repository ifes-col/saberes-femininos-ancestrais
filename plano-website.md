# Plano do website — Saberes Femininos Ancestrais

**Situação:** implementação inicial disponível para revisão local; publicação sujeita às pendências editoriais.  
**Referência técnica:** 13 de novembro de 2026.

## 1. Objetivo e premissas

Criar um website institucional, em português brasileiro, responsivo e acessível para apresentar o projeto, sua equipe e seus resultados, valorizando a memória das mulheres da Piedade e da Fonte Grande, em Vitória (ES).

O site será **estático, somente frontend**: Node.js será usado para desenvolvimento e geração dos arquivos, não como servidor de produção. Não haverá banco de dados, API própria, autenticação, painel administrativo ou processamento de formulários. O conteúdo será atualizado nos arquivos do projeto e publicado novamente.

Públicos principais: comunidades envolvidas, participantes e familiares, estudantes, educadores, pesquisadores e pessoas interessadas no projeto. O conteúdo deve ser respeitoso, claro e fiel às fontes, sem inventar histórias, créditos ou dados.

## 2. Diagnóstico do material

O [mapa do site](./fonte/mapa%20do%20site.docx) define as seções. Foram identificados:

| Conteúdo | Material disponível | Encaminhamento |
|---|---|---|
| Apresentação | [Texto de apresentação](./fonte/Apresentação/Apresentação%20Site.docx) com propósito, instituições e financiamento | Revisar e organizar em blocos; preservar os créditos ao Ifes, à EMEFTI e à Fapes. |
| Equipe | [Lista de integrantes](./fonte/Equipe/1%20Apresentação%20da%20Equipe.docx) e nove retratos | Associar fotos e nomes, confirmar grafias e autorizações antes da publicação. |
| Livro | [Link do repositório](./fonte/Resultados/Livro/link%20livro%20repositório.docx) e [PDF local](./fonte/Resultados/Livro/livro_saberes_femininos_ancestrais.pdf) | Priorizar o link oficial; verificar o acesso e a adequação da página de destino. |
| Mural ancestral | [Texto](./fonte/Resultados/Mural%20ancestral/Mural%20Ancestral.docx) e 16 fotografias | Criar página de resultado com contexto e galeria própria; obter legendas e créditos. |
| Galeria geral | Pastas temáticas previstas no mapa, mas sem fotos | Não usar fotos do mural como se fossem outros eventos; publicar apenas temas com conteúdo aprovado. |
| Publicações e eventos | Pasta sem conteúdo | Não inventar itens; manter a seção preparada, sem links vazios, até receber material. |
| Identidade visual | [Logotipos, paleta, fonte e elementos](./fonte/Identidade%20visual/) | Aplicar a identidade existente, verificando permissões e adequação para uso na web. |
| Instagram e contato | [Instagram](./fonte/Instagram/link%20do%20instagram.docx) e [e-mail institucional](./fonte/Contatos/contato.docx) | Usar links diretos, sem formulário ou integração automática. |

O PDF local do livro tem 87 páginas e foi identificado como **não marcado** para acessibilidade. Solicitar uma versão acessível ou alternativa textual; não presumir que o PDF do repositório tenha as mesmas características sem verificá-lo.

## 3. Mapa e conteúdo propostos

O menu principal terá Início, Apresentação, Equipe, Resultados, Galeria e Contato. Instagram ficará como link externo identificado no cabeçalho ou rodapé.

| Rota | Conteúdo e comportamento |
|---|---|
| `/` | Abertura com identidade do projeto, resumo, chamadas para apresentação, livro, mural e equipe; créditos institucionais e contato no rodapé. |
| `/apresentacao/` | Resumo, objetivos, metodologia e contexto institucional conforme o documento. Explicar a parceria e o financiamento sem acrescentar fatos não verificados. |
| `/equipe/` | Retratos e nomes agrupados em coordenação, tutoria, pesquisadores juniores e estudantes de graduação, conforme o material. Exibir cargos e instituições fornecidos. |
| `/resultados/` | Visão geral com cartões para livro e mural. Publicações e eventos aparecem somente quando houver conteúdo aprovado; se ainda indisponíveis, informar isso em texto, sem link quebrado. |
| `/resultados/livro/` | Apresentação sucinta e link para o [livro no repositório do Ifes](https://repositorio.ifes.edu.br/bitstreams/79db3c69-696b-48bf-8572-404eada66daf/download), identificado como acesso/download externo; confirmar disponibilidade antes do lançamento. |
| `/resultados/mural-ancestral/` | Texto fornecido sobre o mural, créditos, contexto e galeria das 16 fotos disponíveis, sujeitas a autorização, legendas e seleção editorial. |
| `/galeria/` | Índice das categorias previstas: rodas de conversa, caminhada científica, pesquisa no território, mulheres ancestrais e lançamento do livro. Enquanto não houver material aprovado, mostrar mensagem honesta de conteúdo em preparação, sem categorias clicáveis vazias. |
| `/contato/` | Nome da coordenação e [e-mail institucional](mailto:luciana.girelli@ifes.edu.br), com endereço legível para copiar. |
| `404.html` | Mensagem clara e retorno ao início, configurada conforme a hospedagem escolhida. |

Link externo para o [Instagram do projeto](https://www.instagram.com/projetosaberfemininoancestral/). Não incorporar feed: isso adicionaria dependências, scripts e possíveis questões de privacidade.

## 4. Experiência visual e responsiva

- Utilizar a marca e os elementos da identidade recebida, sem redesenhá-los ou alterar suas proporções. Reservar espaço para os créditos institucionais corretos, após confirmação das marcas e regras de uso.
- Adotar como base a paleta fornecida: vinho `#6A3C4C`, terracota `#B86C4C`, ocre `#D4A15A`, verde oliva `#6E7F5D`, azul rio `#6A8599`, verde escuro `#3F5A4A`, sálvia `#A6B39A`, bege `#E4D6C6`, areia `#F3EDE4` e creme `#FBF8F3`. Testar cada combinação de texto e fundo; ajustar a aplicação quando não houver contraste suficiente.
- Usar a fonte Marcellus fornecida em títulos, após verificar licença e converter para um formato web adequado; usar fonte de sistema legível para textos longos.
- Projetar primeiro para telas pequenas, com navegação simples, espaços confortáveis, conteúdo em uma coluna e imagens sem corte de informações importantes. Expandir para grades em telas maiores.
- Priorizar conteúdo, não efeitos: animações discretas e respeitando `prefers-reduced-motion`; não depender de animação para comunicar informações.
- Galerias com miniaturas, legendas e ampliação acessível apenas se necessária; a navegação e o acesso às imagens devem continuar possíveis sem JavaScript.

## 5. Tecnologias e arquitetura

### Escolha recomendada

- **Node.js 26 LTS**, versão de correção atualizada; em 13/11/2026, a referência consultada é [26.13.1](https://nodejs.org/en/blog/release/v26.13.1/). Fixar a versão usada pelo projeto e CI, revisando atualizações de segurança.
- **Astro 7**, em geração estática, com TypeScript, HTML semântico e CSS moderno. A [versão 7](https://astro.build/blog/astro-7/) usa Vite 8. Confirmar compatibilidade e versões estáveis no início da implementação.
- **npm** com `package-lock.json`; `npm ci` para instalações reproduzíveis. Manter dependências mínimas e atualizadas.
- Componentes Astro e CSS para a interface. JavaScript em pequenas melhorias progressivas, quando necessário; não incluir React ou outro framework de componentes sem necessidade comprovada.
- Conteúdo local versionado em Markdown e/ou arquivos de dados tipados; validar campos obrigatórios na construção. Imagens processadas para dimensões adequadas, com WebP/AVIF quando viável e fallback compatível.
- Testes de acessibilidade automatizados com axe, testes de navegação com Playwright e verificação de links locais. Complementar com revisão manual, pois ferramentas automáticas não comprovam acessibilidade completa.

O build gera HTML, CSS, JS e imagens em `dist/`; a hospedagem entrega esses arquivos diretamente. Não usar recursos de renderização em servidor, endpoints ou funções serverless. Para execução local, o Docker Compose gera os arquivos com Node.js e os serve em um container Nginx; as opções locais ficam em `.env`, que não é versionado.

### Estrutura sugerida

```text
/
├── fonte/                     # material original preservado
├── public/                    # arquivos estáticos e favicon
├── src/
│   ├── assets/                # imagens e fontes preparadas para o site
│   ├── components/            # cabeçalho, rodapé, cartões e galeria
│   ├── content/               # textos e dados editoriais validados
│   ├── layouts/               # estrutura comum e metadados
│   ├── pages/                 # rotas estáticas
│   └── styles/                # tokens visuais e estilos
├── tests/                     # testes essenciais
├── astro.config.mjs
├── package.json
└── package-lock.json
```

Os recursos usados pelo site ficam em `src/assets/`; `fonte/` é apenas material de referência e não é necessário ao build. Não incluir arquivos `:Zone.Identifier`, fontes editáveis `.ai` ou documentos internos no site gerado. O PDF local só será publicado se houver autorização e decisão explícita; o link ao repositório é a opção inicial.

### Conteúdo e manutenção

- Equipe: nome, grupo, função/instituição quando fornecida, foto, texto alternativo e crédito/autorização controlados no processo editorial.
- Fotografias: arquivo, tema, legenda, texto alternativo, autoria/crédito e situação de autorização. Descrever o conteúdo real sem presumir nomes ou relações.
- Publicações e eventos: título, data quando confirmada, descrição, link e fonte; não exibir itens incompletos como se fossem publicados.
- Alterações seguem revisão editorial, validação, build e nova publicação. Não haverá edição de conteúdo pelo navegador.

## 6. Acessibilidade, desempenho e privacidade

### Acessibilidade

Meta: atender aos critérios aplicáveis da [WCAG 2.2 nível AA](https://www.w3.org/TR/WCAG22/).

- `lang="pt-BR"`, títulos hierárquicos, regiões semânticas, link para pular ao conteúdo e rótulos descritivos.
- Navegação completa por teclado, foco visível, menu acessível e, se houver modal de fotos, foco controlado, fechamento por Escape e retorno do foco ao acionador.
- Contraste mínimo de 4,5:1 para texto normal e 3:1 para texto grande e componentes aplicáveis; não depender apenas de cor.
- Textos alternativos informativos; imagens meramente decorativas com alternativa vazia. Legendas e créditos visíveis quando fornecidos.
- Testar zoom de 200%, reorganização em 320 CSS px, leitor de tela e ausência de JavaScript. Validar o livro e providenciar alternativa acessível, se necessária.

### Desempenho

- Gerar imagens responsivas com largura e altura definidas; carregar imagens abaixo da dobra sob demanda. Não atrasar o carregamento da imagem principal.
- Evitar fontes e scripts externos desnecessários, carrosséis automáticos, vídeos pesados e download automático do livro.
- Meta de campo, quando houver dados suficientes: no percentil 75, LCP ≤ 2,5 s, INP ≤ 200 ms e CLS ≤ 0,1, conforme [Web Vitals](https://web.dev/articles/vitals). Antes da publicação, usar Lighthouse em condições móveis reproduzíveis como diagnóstico, sem confundir teste de laboratório com dados reais.

### Privacidade e direitos

- Confirmar autorização de publicação de retratos, fotografias, nomes e demais conteúdos, especialmente quando envolver menores de idade; confirmar direitos autorais e créditos de imagem, marca, fonte e livro.
- Não coletar dados pessoais no site por padrão; não incluir analytics, cookies de rastreamento, feed incorporado ou serviços externos sem avaliação e aprovação. Links externos seguem as políticas dos respectivos serviços.
- E-mail abre o aplicativo do usuário via `mailto:`; não há envio pelo site. Caso sejam solicitados formulário, métricas ou CMS, avaliar separadamente serviços externos, privacidade e implicações para a premissa sem backend.
- Configurar HTTPS e cabeçalhos de segurança disponíveis no provedor, sem prejudicar acessibilidade ou funcionamento dos links.

## 7. Implementação por etapas

1. **Validação editorial:** confirmar escopo, grafias, autorizações, créditos, links, imagens e disponibilidade das fotos temáticas; definir domínio e responsável pela manutenção.
2. **Preparação:** iniciar projeto Astro, fixar Node e dependências, configurar TypeScript, comandos de desenvolvimento, build e testes; manter `fonte/` intacta.
3. **Identidade e base:** criar tokens de cor, tipografia, layout responsivo, cabeçalho, navegação, rodapé e componentes acessíveis.
4. **Conteúdo principal:** implementar início, apresentação, equipe, resultados, livro, mural, galeria e contato; usar apenas conteúdos confirmados.
5. **Mídia e metadados:** otimizar imagens, incluir textos alternativos e créditos, títulos e descrições por página, imagem de compartilhamento aprovada, URL canônica e sitemap após definição do domínio.
6. **Validação:** executar build, checagem de tipos, testes automatizados e revisão manual; corrigir problemas encontrados e obter aprovação editorial.
7. **Publicação:** configurar hospedagem estática e domínio, validar HTTPS, rotas diretas, página 404, links e arquivos publicados. Definir rotina de atualização e responsável pelo acompanhamento.

## 8. Testes e critérios de aceite

| Área | Verificação |
|---|---|
| Conteúdo | Texto e créditos conferidos com as fontes; grafias, fotos, legendas, licenças e autorizações aprovadas; nenhum dado ou conteúdo fictício. |
| Funcional | Todas as rotas e links internos funcionam ao navegar e ao abrir diretamente; Instagram, e-mail e livro apontam aos destinos corretos; sem links para seções inexistentes. |
| Responsividade | Conferir em 320, 375, 768, 1024 e 1440 CSS px, incluindo orientação horizontal e zoom; sem rolagem horizontal indevida ou perda de conteúdo. |
| Acessibilidade | Executar axe nas páginas e revisar manualmente teclado, foco, contraste, leitor de tela, texto alternativo, zoom e funcionamento sem JS. Corrigir falhas antes do lançamento. |
| Qualidade técnica | `npm ci`, checagem de tipos, build de produção e testes configurados executam sem falhas; conferir o conteúdo de `dist/` e ausência de originais ou arquivos não autorizados. |
| Desempenho | Rodar Lighthouse móvel nas páginas representativas e corrigir problemas relevantes; registrar as condições de teste e acompanhar os Web Vitals em campo quando possível. |
| Publicação | HTTPS, domínio, sitemap, indexação, 404, recursos e navegação direta validados no endereço final; URLs com subdiretório testadas se aplicável. |

## 9. Hospedagem e operação

Escolher uma hospedagem de arquivos estáticos, como GitHub Pages ou hospedagem institucional equivalente, após confirmação do responsável. Configurar build em CI com Node fixado: instalação reproduzível, checagem, testes e publicação de `dist/` somente após aprovação. Caso seja usada uma hospedagem em subcaminho, configurar o `base` do Astro e testar todos os caminhos.

Definir acesso ao repositório, domínio, responsável editorial e responsável técnico. Registrar no README os comandos reais de instalação, desenvolvimento, teste, build, publicação e atualização do conteúdo. Monitorar validade do domínio e links externos, atualizar dependências e manter cópias dos materiais originais conforme a política institucional.

## 10. Pendências para aprovação

1. Confirmar responsável, domínio e plataforma de hospedagem.
2. Aprovar mapa, identidade visual e critérios para conteúdo ainda indisponível.
3. Fornecer fotos, legendas e créditos das cinco categorias da galeria, além de dados de publicações e eventos, quando existirem.
4. Confirmar nomes, funções, autorizações de imagem e direitos de uso da marca, fonte, fotos e livro.
5. Confirmar se o link do livro funciona para o público e obter versão acessível ou alternativa adequada.
6. Definir quem revisará e atualizará os conteúdos após o lançamento.

Essas decisões não exigem backend, mas as autorizações e a revisão editorial são pré-requisitos para publicar os materiais correspondentes.
