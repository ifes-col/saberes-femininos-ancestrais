import type { ImageMetadata } from 'astro';

const imageModules = import.meta.glob<ImageMetadata>(
  '../assets/gallery/**/*.{jpg,jpeg}',
  { eager: true, import: 'default' },
);

export type GalleryImage = {
  image: ImageMetadata;
  alt: string;
  caption?: string;
};

type GalleryTheme = {
  id: string;
  title: string;
  description?: string;
  images: GalleryImage[];
  hasNarrative?: boolean;
};

type CaptionLookup = (filename: string) => string | undefined;

const collator = new Intl.Collator('pt-BR', { numeric: true, sensitivity: 'base' });

const rodaCaptions: Record<string, string> = {
  '1.1': '1ª roda de conversa com a convidada Ana Paula Rocha',
  '1.2': '1ª roda de conversa com a convidada Ana Paula Rocha',
  '1.3': '1ª roda de conversa com a convidada Ana Paula Rocha',
  '2.1': '2ª roda de conversa com Sandra Reis',
  '2.2': '2ª roda de conversa com Sandra Reis',
  '2.3': '2ª roda de conversa com Sandra Reis',
  '2.4': '2ª roda de conversa com Sandra Reis',
  '3.1': '3ª roda de conversa com Carmen Pascolar (Carminha)',
  '3.2': '3ª roda de conversa com Carmen Pascolar (Carminha)',
  '3.3': '3ª roda de conversa com Carmen Pascolar (Carminha)',
};

const caminhadaCaptions: Record<string, string> = {
  '1': 'Realização do processo seletivo dos estudantes, considerando entrevistas, rendimento escolar e vínculo com os territórios pesquisados.',
  '2': 'Leituras, dinâmicas e atividades sobre ancestralidade feminina e a história das comunidades da Piedade e da Fonte Grande.',
  '3': 'Encontros com mulheres da comunidade que compartilharam suas histórias, experiências e conhecimentos, além de indicarem possíveis participantes da pesquisa.',
  '4': 'Identificação de mulheres reconhecidas por seus conhecimentos e contribuições para as comunidades, com o apoio de moradores e familiares.',
  '6': 'Conhecimento dos espaços e das histórias da Piedade e da Fonte Grande a partir das narrativas de moradores.',
  '7': 'Realização de entrevistas com as mulheres, conhecendo suas histórias e saberes relacionados ao cuidado, à saúde, à educação, à cultura e à religiosidade.',
  '8': 'Organização das informações, reflexão sobre os conhecimentos compartilhados e seleção dos conteúdos para compor o livro.',
  '9': 'Construção coletiva da proposta e produção dos textos que reúnem as histórias e os saberes das mulheres entrevistadas.',
  '10': 'Realização de uma ação de grafitagem em muros da comunidade da Piedade, homenageando as mulheres e divulgando os resultados da pesquisa.',
  '11': 'Participação em eventos acadêmicos para compartilhar os resultados, trocar experiências e divulgar o projeto para diferentes públicos.',
};

const mulheresCaptions: Record<string, string> = {
  '1.1 Pastoral': 'Integrantes da Pastoral da Criança: Delza, Carminha, Nadir e Terezinha (da esquerda para a direita).',
  '1.2 Mulheres do Movimento Comunitário e da Pastoral': 'Integrantes da Pastoral da Criança: Delza, Carminha, Nadir e Terezinha.',
  '1.3 Elda': 'Elda Amorim, primeira presidenta do movimento comunitário da Piedade. Acervo pessoal de Roberto Luiz Avelino Pereira Filho',
  '1.4': 'Delza e Carminha',
  '2.1 Sônia enfermeira_': 'Sônia Mara Paulino segurando os instrumentos que ela utilizava no trabalho de enfermeira',
  '2.2 Guiomar Foto 1 Escadaria': 'Escadaria em homenagem a Guiomar Leite de Oliveira, no bairro da Piedade.',
  '3.1 Lavadeiras_': 'Foto de painel feito pelo coletivo de Cultura cores que acolhem, no morro do Moscoso.',
  '4.1 Rosalina samba e cuidados': 'Rosalina Lobo Barbosa com trajes de carnaval.',
  '5.1 Rita Samba': 'Rita de Cássia Duarte',
  '5.2 Doquinha Samba': 'Maria da Glória dos Santos Ramos',
  '5.3 Estelita Samba': 'Estelita Gomes Sales',
  '5.4 Rejane baiana': 'Rejane de Oliveira Aguiar',
  '5.5 Anjinha - samba': 'Maria dos Anjos Martins',
  '6.1 Anacleta professora_': 'Anacleta Schneider Lucas',
  '6.2 Carlita professora_': 'Carlita Corrêa Pereira',
  '7.1 Carmem Leite parteira': 'Carmem Leite do Nascimento e sua família.',
  '7.2 Carmem Alonso parteira_': 'Carmen Alonso Pascolar',
  '8.1 Sandra Reis Benzedeira_': 'Sandra Reis',
  '8.2 Escadaria Rosa Martins Reis': 'Escadaria em homenagem a Rosa Martins Reis',
  '9.1 Rosinha cuidado coletivo_': 'Rosa Maria Reis, na Piedade.',
};

const sourceAliases: Record<string, Record<string, string>> = {
  rodas: {
    '1.1': 'rodas-1.jpg',
    '2.1': 'rodas-2.jpg',
    '3.1': 'rodas-3.jpg',
  },
  caminhada: {
    '1. Seleção dos estudantes_': 'caminhada-1.jpg',
    '3. roda de conversa': 'caminhada-2.jpg',
    '11. evento científico': 'caminhada-3.jpg',
  },
  pesquisa: {
    'Bolsistas recebendo os materiais do projeto': 'pesquisa-1.jpg',
    'Pesquisadores no território_': 'pesquisa-2.jpg',
    'Visita guiada nos territórios_': 'pesquisa-3.jpg',
  },
  mulheres: {
    '1.2 Mulheres do Movimento Comunitário e da Pastoral': 'mulheres-1.jpg',
    '3.1 Lavadeiras_': 'mulheres-2.jpg',
    '6.1 Anacleta professora_': 'mulheres-3.jpg',
  },
};

const imageStem = (path: string) => path.split('/').pop()!.replace(/\.(?:jpe?g)$/i, '');

function imagesFor(
  folder: string,
  captionFor: CaptionLookup,
  showFilenameCaption = false,
): GalleryImage[] {
  const aliases = sourceAliases[folder] ?? {};
  const aliasFiles = new Set(Object.values(aliases));
  const sourceImages = Object.entries(imageModules)
    .filter(([path]) => path.startsWith(`../assets/gallery/${folder}/`))
    .map(([path, image]) => ({ filename: imageStem(path), image }))
    .filter(({ filename }) => !aliasFiles.has(`${filename}.jpg`) && !aliasFiles.has(`${filename}.jpeg`));

  for (const [filename, alias] of Object.entries(aliases)) {
    const image = imageModules[`../assets/gallery/${folder}/${alias}`];
    if (!image) throw new Error(`Missing gallery image: ${folder}/${alias}`);
    sourceImages.push({ filename, image });
  }

  return sourceImages
    .sort((left, right) => collator.compare(left.filename, right.filename))
    .map(({ filename, image }, index) => {
      const caption = captionFor(filename);
      const readableFilename = filename.replace(/_+$/, '').trim();
      return {
        image,
        alt: caption ?? (folder === 'eventos' ? `Registro fotográfico de evento científico ${index + 1}` : readableFilename),
        ...(caption || showFilenameCaption ? { caption: caption ?? readableFilename } : {}),
      };
    });
}

const rodaCaption = (filename: string) => rodaCaptions[filename];
const caminhadaCaption = (filename: string) => {
  if (filename === '5-mapeamento' || filename === '8. Sistematização das entrevistas_') {
    return 'Registro da caminhada científica.';
  }
  const number = filename.match(/^(\d+)/)?.[1];
  return number ? caminhadaCaptions[number] : undefined;
};
const mulherCaption = (filename: string) => mulheresCaptions[filename];
const pesquisaCaption = (filename: string) => {
  if (filename === 'Pesquisadores na Escadaria Guimar Leite de Oliveira, na Piedade_') {
    return 'Pesquisadores na Escadaria Guiomar Leite de Oliveira, na Piedade';
  }
  return filename.replace(/_+$/, '').trim();
};

export const galleryThemes: GalleryTheme[] = [
  {
    id: 'rodas-de-conversa',
    title: 'Rodas de conversa',
    description: 'Encontros de escuta, partilha e aprendizagem coletiva entre participantes e pesquisadores.',
    images: imagesFor('rodas', rodaCaption),
    hasNarrative: true,
  },
  {
    id: 'caminhada-cientifica',
    title: 'Caminhada científica',
    description: 'Percursos de pesquisa, entrevistas e sistematização dos saberes em território.',
    images: imagesFor('caminhada', caminhadaCaption, true),
    hasNarrative: true,
  },
  {
    id: 'pesquisa-no-territorio',
    title: 'Pesquisa no território',
    description: 'Visitas, entrevistas e registros do cotidiano da Piedade e da Fonte Grande.',
    images: imagesFor('pesquisa', pesquisaCaption, true),
    hasNarrative: true,
  },
  {
    id: 'mulheres-ancestrais',
    title: 'Mulheres ancestrais',
    description: 'Retratos e memórias de mulheres que guardam saberes de parteiras, lavadeiras, sambistas e educadoras.',
    images: imagesFor('mulheres', mulherCaption, true),
    hasNarrative: true,
  },
  {
    id: 'eventos-cientificos',
    title: 'Eventos científicos',
    images: imagesFor('eventos', () => undefined),
  },
];
