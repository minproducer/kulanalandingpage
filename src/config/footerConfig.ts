// Footer configuration - can be controlled via admin panel later
export const footerConfig = {
  sections: {
    companyInfo: {
      enabled: true,
      logo: '/KulanaDev Logo - center.png',
      description: 'Transforming concepts into high-performing assets with precision, integrity, and commitment to long-term value.',
    },
    navigation: {
      enabled: true,
    },
    contact: {
      enabled: false, // Hidden for now - can be enabled via admin panel
      email: 'info@kulanadevelopment.com',
      phone: '(555) 123-4567',
      location: 'Texas & Southeast',
    },
    social: {
      enabled: false, // Hidden for now - can be enabled via admin panel
      links: {
        email: '#',
        linkedin: '#',
        facebook: '#',
      },
    },
  },
  copyright: {
    text: 'Kulana Development',
    year: new Date().getFullYear(),
  },
};
