export type Project = {
  id: 'sasv' | 'airbnb' | 'gestapp';
  stack: string[];
  repoUrl?: string;
};

export const projects: Project[] = [
  {
    id: 'sasv',
    stack: ['Python', 'ReactJS', 'MySQL'],
  },
  {
    id: 'airbnb',
    stack: ['Python', 'Flask'],
    repoUrl: 'https://github.com/gustavofranco26/holbertonschool-AirBnB_clone_v4',
  },
  {
    id: 'gestapp',
    stack: ['Python', 'Flask'],
    repoUrl: 'https://github.com/gustavofranco26/mi-cueva',
  },
];