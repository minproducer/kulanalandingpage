export interface Project {
  id: number;
  name: string;
  location: string;
  image: string;
  description: string;
  status: string;
  size?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    name: 'Coming Soon',
    location: 'Missouri',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    description: 'Premium apartment development project in progress',
    status: 'In Progress',
  },
];
