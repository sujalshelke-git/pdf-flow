import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-12 rounded-full glass flex items-center justify-center overflow-hidden group transition-all duration-300 hover:scale-105"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        {/* Sun icon */}
        <Sun
          className={`absolute inset-0 w-6 h-6 text-amber-500 transition-all duration-500 ${
            theme === 'light'
              ? 'rotate-0 scale-100 opacity-100'
              : 'rotate-90 scale-0 opacity-0'
          }`}
        />
        {/* Moon icon */}
        <Moon
          className={`absolute inset-0 w-6 h-6 text-primary transition-all duration-500 ${
            theme === 'dark'
              ? 'rotate-0 scale-100 opacity-100'
              : '-rotate-90 scale-0 opacity-0'
          }`}
        />
      </div>
      
      {/* Glow effect */}
      <div
        className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
          theme === 'dark' ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.3) 0%, transparent 70%)',
        }}
      />
    </button>
  );
};

export default ThemeToggle;
