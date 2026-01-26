import { tools } from '@/data/tools';
import ToolCard from './ToolCard';

const ToolsGrid = () => {
  return (
    <section className="pb-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {tools.map((tool, index) => (
            <ToolCard
              key={tool.slug}
              {...tool}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsGrid;
