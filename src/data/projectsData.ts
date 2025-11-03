export interface Project {
  id: number;
  name: string;
  location: string;
  image: string;
  description: string;
  status: string;
  size?: string;
  link?: string;
  // Detail fields
  detailDescription?: string;
  completionDate?: string;
  clientName?: string;
  imageGallery?: string[];
  specifications?: Array<{ key: string; value: string }>;
}

export const projects: Project[] = [
  {
    id: 1,
    name: 'Coming Soon',
    location: 'Missouri',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    description: 'Premium apartment development project in progress',
    status: 'In Progress',
  },
];
