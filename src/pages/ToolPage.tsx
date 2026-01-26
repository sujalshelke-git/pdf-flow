import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { tools } from '@/data/tools';
import UploadArea from '@/components/UploadArea';
import ActionButton from '@/components/ActionButton';

const ToolPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const tool = tools.find((t) => t.slug === slug);

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Tool not found</h1>
          <Link to="/" className="text-primary hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const Icon = tool.icon;

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to tools</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-12 opacity-0 animate-fade-up" style={{ animationFillMode: 'forwards' }}>
          <div
            className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center mx-auto mb-6 animate-float`}
          >
            <Icon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            {tool.name}
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            {tool.description}
          </p>
        </div>

        {/* Upload area */}
        <div className="opacity-0 animate-fade-up stagger-2" style={{ animationFillMode: 'forwards' }}>
          <UploadArea />
        </div>

        {/* Action button */}
        <div className="mt-8 flex justify-center opacity-0 animate-fade-up stagger-3" style={{ animationFillMode: 'forwards' }}>
          <ActionButton>
            Process Files
          </ActionButton>
        </div>
      </div>
    </main>
  );
};

export default ToolPage;
