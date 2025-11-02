const Home = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80"
            alt="Building with Purpose"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-navy/60 to-navy/50"></div>
        </div>
        
        {/* Content */}
        <div className="relative h-full flex items-center justify-center text-center z-10">
          <div className="max-w-5xl mx-auto px-4">
            <h1 className="font-serif text-6xl md:text-7xl lg:text-hero font-bold text-white mb-8 leading-tight animate-fade-in">
              Trusted Development, Built to Last
            </h1>
            
            {/* Separator Bar */}
            <div className="w-32 h-1 bg-gold mx-auto"></div>
          </div>
        </div>
      </section>

      {/* About / Introduction */}
      <section className="py-24 bg-ivory">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <p className="font-serif text-body text-text-primary leading-relaxed-custom">
            With decades of combined experience, Kulana Development partners with investors, builders, and architects to transform concepts into high-performing assets. From feasibility and design to construction and delivery, we manage each stage with precision, integrity, and a commitment to long-term value.
          </p>
        </div>
      </section>

      {/* What We Deliver Section */}
      <section id="what-we-deliver" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: Image */}
            <div className="order-2 lg:order-1">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80" 
                alt="What We Deliver - Modern Building Development" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Right: Text */}
            <div className="order-1 lg:order-2">
              <h2 className="font-serif text-4xl font-bold text-text-primary mb-6">
                What We Deliver
              </h2>
              <p className="font-sans text-base text-text-secondary leading-relaxed-custom">
                From Feasibility to Turnkey Delivery, we manage entitlements, design coordination, procurement, and site execution—one accountable team focused on outcomes that endure and schedule health checks keep your project on time, on spec, and built to last.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Build - The Kulana Way Section */}
      <section className="py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: Text */}
            <div>
              <h2 className="font-serif text-4xl font-bold text-text-primary mb-6">
                How We Build - The Kulana Way
              </h2>
              <p className="font-sans text-base text-text-secondary leading-relaxed-custom">
                Results You Can Measure — Milestone gates, cost tracking, and schedule health checks keep your project on time, on spec, and built to last.
              </p>
            </div>

            {/* Right: Image */}
            <div>
              <img 
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80" 
                alt="How We Build - Construction Excellence" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* A Culture Built to Last Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: Image */}
            <div className="order-2 lg:order-1">
              <img 
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80" 
                alt="A Culture Built to Last - Team Collaboration" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Right: Text */}
            <div className="order-1 lg:order-2">
              <h2 className="font-serif text-4xl font-bold text-text-primary mb-6">
                A Culture Built to Last
              </h2>
              <p className="font-sans text-base text-text-secondary leading-relaxed-custom">
                Lessons learned feed every new project—so each delivery is stronger than the last. We put people first—safety, respect, and accountability—that's how quality, schedule, and budget follow.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
