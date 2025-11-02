export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const faqs: FAQItem[] = [
  {
    category: 'General',
    question: 'What types of projects does Kulana Development handle?',
    answer: 'We specialize in commercial, residential, and mixed-use developments across Texas and the Southeast. Our portfolio includes high-rise construction, historic restorations, medical facilities, tech campuses, and master-planned communities. From feasibility studies to turnkey delivery, we manage every aspect of development with precision and accountability.',
  },
  {
    category: 'General',
    question: 'What regions do you serve?',
    answer: 'We primarily serve Texas and the Southeast region, with completed projects in Austin, Dallas, Houston, San Antonio, Fort Worth, and surrounding metropolitan areas. Our experience spans urban infill developments to suburban master-planned communities.',
  },
  {
    category: 'Process',
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on scope, complexity, and regulatory requirements. A commercial renovation might take 6-12 months, while a high-rise development typically requires 24-36 months. We provide detailed schedules during feasibility and maintain transparent communication throughout construction with regular milestone updates.',
  },
  {
    category: 'Process',
    question: 'What is your approach to project management?',
    answer: 'We employ The Kulana Way—a proven methodology featuring milestone gates, real-time cost tracking, and schedule health checks. Our integrated team approach ensures one point of accountability from concept through completion, with regular reporting and proactive problem-solving.',
  },
  {
    category: 'Services',
    question: 'Do you handle project financing?',
    answer: 'We work closely with investors and can connect you with our network of financing partners, including commercial banks, private equity firms, and institutional lenders. Our team provides comprehensive feasibility studies and financial modeling to support funding decisions and investor presentations.',
  },
  {
    category: 'Services',
    question: 'Can you work with my existing architect or design team?',
    answer: 'Absolutely! We excel at coordinating with architects, engineers, designers, and other stakeholders. Our design coordination services ensure seamless collaboration, value engineering, and constructability reviews to optimize both design intent and project efficiency.',
  },
  {
    category: 'Partnership',
    question: 'What makes Kulana Development different?',
    answer: 'Our decades of combined experience, commitment to quality, and focus on accountability set us apart. We put people first—safety, respect, and continuous learning drive everything we do. Every project benefits from lessons learned on previous developments, making each delivery stronger than the last.',
  },
  {
    category: 'Partnership',
    question: 'How do I start a project with Kulana Development?',
    answer: 'Begin with a consultation where we discuss your vision, site, budget, and timeline. We then conduct a preliminary feasibility analysis and provide a proposal outlining scope, approach, and investment. Once engaged, we assemble your project team and begin the entitlement and design process.',
  },
  {
    category: 'Quality',
    question: 'How do you ensure quality and meet deadlines?',
    answer: 'Quality and schedule adherence are built into The Kulana Way. We implement rigorous quality control checkpoints at every milestone, conduct regular third-party inspections, and maintain detailed progress tracking. Our proactive approach identifies potential issues early, allowing us to resolve them before they impact schedule or budget.',
  },
  {
    category: 'Quality',
    question: 'What sustainability practices do you incorporate?',
    answer: 'We integrate sustainable practices across all projects, including LEED certification support, energy-efficient systems, water conservation measures, and responsible material sourcing. Our team stays current with green building standards and works with clients to balance sustainability goals with project economics.',
  },
];
