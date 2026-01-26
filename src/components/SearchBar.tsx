import { Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tools } from '@/data/tools';

interface SearchBarProps {
  compact?: boolean;
}

const SearchBar = ({ compact = false }: SearchBarProps) => {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const filteredTools = query
    ? tools.filter(
        (tool) =>
          tool.name.toLowerCase().includes(query.toLowerCase()) ||
          tool.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelect = (slug: string) => {
    navigate(`/tool/${slug}`);
    setQuery('');
    setFocused(false);
  };

  return (
    <div className="relative w-full">
      <div
        className={`relative transition-all duration-300 ${
          focused ? 'scale-[1.02]' : 'scale-100'
        }`}
      >
        {/* Glow effect */}
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-brand blur-xl transition-opacity duration-300 ${
            focused ? 'opacity-30' : 'opacity-0'
          }`}
        />

        {/* Input container */}
        <div
          className={`relative glass-card overflow-hidden transition-all duration-300 ${
            compact ? 'h-11' : 'h-14'
          } ${focused ? 'border-gradient' : ''}`}
        >
          <div className="absolute inset-0 flex items-center px-4 gap-3">
            <Search
              className={`transition-colors duration-300 ${
                compact ? 'w-4 h-4' : 'w-5 h-5'
              } ${focused ? 'text-primary' : 'text-muted-foreground'}`}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 200)}
              placeholder="Search PDF tools..."
              className={`flex-1 bg-transparent outline-none placeholder:text-muted-foreground/60 text-foreground ${
                compact ? 'text-sm' : 'text-base'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Dropdown results */}
      {focused && query && filteredTools.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-card p-2 animate-scale-in z-50">
          {filteredTools.map((tool) => (
            <button
              key={tool.slug}
              onClick={() => handleSelect(tool.slug)}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-primary/10 transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center">
                <tool.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-foreground">{tool.name}</p>
                <p className="text-sm text-muted-foreground">{tool.description}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {focused && query && filteredTools.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-card p-4 animate-scale-in z-50 text-center">
          <p className="text-muted-foreground">No tools found</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
