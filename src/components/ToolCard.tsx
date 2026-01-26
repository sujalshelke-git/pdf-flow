import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface ToolCardProps {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  index: number;
}

const ToolCard = ({ slug, name, description, icon: Icon, gradient, index }: ToolCardProps) => {
  return (
    <Link
      to={`/tool/${slug}`}
      className={`group relative glass-card p-6 card-glow opacity-0 animate-fade-up stagger-${index + 1}`}
      style={{ animationFillMode: 'forwards' }}
    >
      {/* Gradient border on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl p-[1px] overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50`} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
        >
          <Icon className="w-7 h-7 text-white" />
        </div>

        {/* Text */}
        <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-gradient transition-colors duration-300">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      {/* Subtle glow on hover */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl`}
      />
    </Link>
  );
};

export default ToolCard;
