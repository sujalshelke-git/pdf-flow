import SearchBar from './SearchBar';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-1 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-brand opacity-10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 opacity-0 animate-fade-up" style={{ animationFillMode: 'forwards' }}>
            All Your PDF Tools.{' '}
            <span className="text-gradient">One Clean Space.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto opacity-0 animate-fade-up stagger-2" style={{ animationFillMode: 'forwards' }}>
            Convert, edit and manage PDFs effortlessly. Beautiful tools that just work.
          </p>
        </div>

        {/* Search bar */}
        {/* <div className="max-w-2xl mx-auto opacity-0 animate-fade-up stagger-3" style={{ animationFillMode: 'forwards' }}>
          <SearchBar />
        </div> */}
      </div>
    </section>
  );
};

export default Hero;
