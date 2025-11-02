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
    name: 'Riverside Commercial Complex',
    location: 'Austin, TX',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    description: 'A modern commercial development featuring retail and office spaces with sustainable design elements',
    status: 'Completed 2024',
    size: '250,000 sq ft',
  },
  {
    id: 2,
    name: 'Highland Residential Tower',
    location: 'Dallas, TX',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    description: 'Luxury 40-story high-rise residential building with premium amenities and panoramic city views',
    status: 'In Progress',
    size: '180 Units',
  },
  {
    id: 3,
    name: 'Tech Campus Phase II',
    location: 'Houston, TX',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    description: 'State-of-the-art technology campus with LEED Platinum certification and collaborative workspaces',
    status: 'Completed 2023',
    size: '400,000 sq ft',
  },
  {
    id: 4,
    name: 'Downtown Heritage Restoration',
    location: 'San Antonio, TX',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
    description: 'Historic building restoration preserving architectural heritage while integrating modern infrastructure',
    status: 'Completed 2022',
    size: '75,000 sq ft',
  },
  {
    id: 5,
    name: 'Lakefront Mixed-Use Development',
    location: 'Fort Worth, TX',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80',
    description: 'Integrated residential, retail, and entertainment district with waterfront access and public spaces',
    status: 'In Planning',
    size: '500,000 sq ft',
  },
  {
    id: 6,
    name: 'Medical District Plaza',
    location: 'Dallas, TX',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    description: 'Healthcare-focused commercial development with medical offices, clinics, and specialty retail',
    status: 'In Progress',
    size: '320,000 sq ft',
  },
  {
    id: 7,
    name: 'University District Housing',
    location: 'Austin, TX',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    description: 'Student-focused residential community with modern amenities and study spaces near major universities',
    status: 'Completed 2023',
    size: '450 Beds',
  },
  {
    id: 8,
    name: 'Greenway Business Park',
    location: 'Plano, TX',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80',
    description: 'Corporate office park with landscaped grounds, walking trails, and sustainable building practices',
    status: 'In Progress',
    size: '600,000 sq ft',
  },
];
