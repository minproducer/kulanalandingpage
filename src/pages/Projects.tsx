import { projects } from '../data/projectsData';

const Projects = () => {
  return (
    <div className="pt-20">
      {/* Hero Section with Background Image */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80"
            alt="Our Projects"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy/70"></div>
        </div>
        
        {/* Title */}
        <div className="relative h-full flex items-center justify-center z-10">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white">
            <span className="text-gold">Our</span> Projects
          </h1>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-gold text-white px-4 py-1 rounded-full text-sm font-semibold">
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="font-serif text-2xl font-bold text-text-primary mb-2">
                    {project.name}
                  </h3>
                  
                  <div className="flex items-center gap-4 mb-4 text-text-secondary text-sm">
                    <p className="font-sans flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {project.location}
                    </p>
                    {project.size && (
                      <p className="font-sans">
                        • {project.size}
                      </p>
                    )}
                  </div>
                  
                  <button className="w-full bg-navy text-white font-accent font-semibold px-6 py-3 rounded hover:bg-navy-light transition-colors duration-300">
                    View Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
