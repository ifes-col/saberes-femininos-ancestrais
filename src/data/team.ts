import alexssandra from '../assets/team/alexssandra.jpg';
import bruna from '../assets/team/bruna.png';
import diego from '../assets/team/diego.jpg';
import heloisa from '../assets/team/heloisa.jpg';
import luciana from '../assets/team/luciana.jpg';
import marcela from '../assets/team/marcela.jpg';
import paulo from '../assets/team/paulo.jpg';
import roberta from '../assets/team/roberta.jpg';
import sheila from '../assets/team/sheila.png';
import type { ImageMetadata } from 'astro';

type Person = { name: string; image: ImageMetadata; role?: string };
type Group = { title: string; people: Person[] };

export const team: Group[] = [
  {
    title: 'Coordenação',
    people: [{ name: 'Luciana Silvestre Girelli', image: luciana, role: 'Professora do Ifes – campus Vitória' }],
  },
  {
    title: 'Tutoria',
    people: [{ name: 'Sheila Maria Vidal', image: sheila, role: 'Professora da EMEFTI Anacleta Schneider Lucas' }],
  },
  {
    title: 'Pesquisadores juniores',
    people: [
      { name: 'Alexssandra da Penha Reis', image: alexssandra },
      { name: 'Diego de Paula', image: diego },
      { name: 'Heloísa de Vilhena Queiroz Vilela Zacharias', image: heloisa },
      { name: 'Paulo Henrique Ribeiro Lima', image: paulo },
      { name: 'Roberta Natielly Pereira Victor', image: roberta },
    ],
  },
  {
    title: 'Pesquisadoras de graduação',
    people: [
      { name: 'Marcela Ribeiro de Marins', image: marcela },
      { name: 'Bruna Caroline Ferreira Menezes Lemos', image: bruna },
    ],
  },
];
