import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';
import { FileText } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold hidden sm:block">
            <span className="text-gradient">PDF</span>
            <span className="text-foreground"> Studio</span>
          </span>
        </Link>

        {/* Centered Search - hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <SearchBar compact />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
