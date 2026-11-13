import type { ImageMetadata } from 'astro';

import rodas1 from '../assets/gallery/rodas/rodas-1.jpg';
import rodas2 from '../assets/gallery/rodas/rodas-2.jpg';
import rodas3 from '../assets/gallery/rodas/rodas-3.jpg';
import caminhada1 from '../assets/gallery/caminhada/caminhada-1.jpg';
import caminhada2 from '../assets/gallery/caminhada/caminhada-2.jpg';
import caminhada3 from '../assets/gallery/caminhada/caminhada-3.jpg';
import pesquisa1 from '../assets/gallery/pesquisa/pesquisa-1.jpg';
import pesquisa2 from '../assets/gallery/pesquisa/pesquisa-2.jpg';
import pesquisa3 from '../assets/gallery/pesquisa/pesquisa-3.jpg';
import mulheres1 from '../assets/gallery/mulheres/mulheres-1.jpg';
import mulheres2 from '../assets/gallery/mulheres/mulheres-2.jpg';
import mulheres3 from '../assets/gallery/mulheres/mulheres-3.jpg';

type GalleryImage = { image: ImageMetadata; alt: string };

type GalleryTheme = {
  title: string;
  description: string;
  images: GalleryImage[];
};

export const galleryThemes: GalleryTheme[] = [
  {
    title: 'Rodas de conversa',
    description: 'Encontros de escuta, partilha e aprendizagem coletiva entre participantes e pesquisadores.',
    images: [
      { image: rodas1, alt: 'Participantes em roda de conversa durante o projeto.' },
      { image: rodas2, alt: 'Diálogo coletivo entre mulheres e integrantes do projeto em encontro presencial.' },
      { image: rodas3, alt: 'Roda de conversa com registro de memórias e saberes ancestrais.' },
    ],
  },
  {
    title: 'Caminhada científica',
    description: 'Percursos de pesquisa, entrevistas e sistematização dos saberes em território.',
    images: [
      { image: caminhada1, alt: 'Estudantes selecionados para a caminhada científica em grupo.' },
      { image: caminhada2, alt: 'Roda de conversa e preparação de materiais na caminhada científica.' },
      { image: caminhada3, alt: 'Apresentação em evento científico do projeto e dos resultados da pesquisa.' },
    ],
  },
  {
    title: 'Pesquisa no território',
    description: 'Visitas, entrevistas e registros do cotidiano da Piedade e da Fonte Grande.',
    images: [
      { image: pesquisa1, alt: 'Bolsistas recebendo materiais do projeto durante pesquisa no território.' },
      { image: pesquisa2, alt: 'Pesquisadores no território acompanhando memória e trajetória da comunidade.' },
      { image: pesquisa3, alt: 'Visita guiada em território com registro de encontros e conhecimentos locais.' },
    ],
  },
  {
    title: 'Mulheres ancestrais',
    description: 'Retratos e memórias de mulheres que guardam saberes de parteiras, lavadeiras, sambistas e educadoras.',
    images: [
      { image: mulheres1, alt: 'Mulheres do movimento comunitário e da pastoral em encontro coletivo.' },
      { image: mulheres2, alt: 'Lavadeiras em imagem que registra cuidado, trabalho e memória coletiva.' },
      { image: mulheres3, alt: 'Professora e pesquisadora Anacleta em retrato que representa saberes ancestrais.' },
    ],
  },
];
