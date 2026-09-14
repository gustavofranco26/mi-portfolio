export type StackCategory = 'frontend' | 'backend' | 'database' | 'tools';

export const stack: { category: StackCategory; items: string[] }[] = [
  {
    category: 'frontend',
    items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    category: 'backend',
    items: ['Python', 'Flask', 'Supabase'],
  },
  {
    category: 'database',
    items: ['MySQL', 'PostgreSQL'],
  },
  {
    category: 'tools',
    items: ['Git', 'GitHub', 'Bash'],
  },
];
