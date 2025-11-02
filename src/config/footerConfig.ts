// Footer configuration - can be controlled via admin panel later
export const footerConfig = {
  sections: {
    companyInfo: {
      enabled: true,
      logoUrl: '/KulanaDev Logo - center.png',
      description: 'Transforming concepts into high-performing assets with precision, integrity, and commitment to long-term value.',
    },
    navigation: {
      enabled: true,
      title: 'Quick Links',
      links: [
        { name: 'Home', path: '/' },
        { name: 'Projects', path: '/projects' },
        { name: 'Management Team', path: '/management-team' },
        { name: 'FAQ', path: '/faq' },
      ],
    },
    contact: {
      enabled: false, // Hidden for now - can be enabled via admin panel
      title: 'Contact',
      email: 'info@kulanadevelopment.com',
      phone: '(555) 123-4567',
      location: 'Texas & Southeast',
    },
    social: {
      enabled: false, // Hidden for now - can be enabled via admin panel
      title: 'Follow Us',
      links: {
        email: '#',
        linkedin: '#',
        facebook: '#',
      },
    },
  },
  copyright: {
    enabled: true,
    text: 'Kulana Development',
    year: new Date().getFullYear(),
  },
};
