import { teamMembers } from '../data/teamData';

const ManagementTeam = () => {
  return (
    <div className="pt-20">
      {/* Hero Section with Background Image */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1920&q=80"
            alt="Management Team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy/70"></div>
        </div>
        
        {/* Title */}
        <div className="relative h-full flex items-center justify-center z-10">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white">
            Management <span className="text-gold">Team</span>
          </h1>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow"
              >
                {/* Image and Name Row */}
                <div className="flex items-start gap-6 mb-6">
                  {/* Circular Image */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover flex-shrink-0"
                  />
                  
                  {/* Name and Title */}
                  <div className="flex-1 pt-4">
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-text-primary mb-2">
                      {member.name}
                    </h3>
                    <p className="font-sans text-lg text-text-secondary">
                      {member.title}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <div className="font-sans text-sm text-text-secondary leading-relaxed">
                  {member.bio.split('\n\n').map((paragraph, pIndex) => (
                    <p key={pIndex} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManagementTeam;
