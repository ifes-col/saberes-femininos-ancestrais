export const siteName = 'Saberes Femininos Ancestrais';
export const instagramUrl = 'https://www.instagram.com/projetosaberfemininoancestral/';
export const bookUrl = 'https://repositorio.ifes.edu.br/bitstreams/79db3c69-696b-48bf-8572-404eada66daf/download';
export const email = 'luciana.girelli@ifes.edu.br';

export const navItems = [
  { label: 'Início', path: '/' },
  { label: 'Apresentação', path: '/apresentacao/' },
  { label: 'Equipe', path: '/equipe/' },
  { label: 'Resultados', path: '/resultados/' },
  { label: 'Galeria', path: '/galeria/' },
  { label: 'Contato', path: '/contato/' },
];

export function localPath(path: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}`;
}
