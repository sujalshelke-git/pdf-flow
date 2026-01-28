import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { tools } from '@/data/tools';
import UploadArea from '@/components/UploadArea';
import ActionButton from '@/components/ActionButton';
import { useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE_URL;


const ToolPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const tool = tools.find((t) => t.slug === slug);

  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Tool not found</h1>
          <Link to="/" className="text-primary hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const Icon = tool.icon;

  const handleProcess = async () => {
    if (files.length === 0) return;

    setLoading(true);

    const formData = new FormData();

    // backend usually expects "file"
    files.forEach((file) => {
      formData.append('file', file);
    });

    try {
      const res = await fetch(`${API_BASE}${tool.api}`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Conversion failed');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `${tool.slug}.pdf`;
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-screen pt-20 pb-6 overflow-hidden">
      <div className="container mx-auto px-4 h-full max-w-5xl flex flex-col">

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

          {/* Tool Info */}
          <div className="space-y-4 text-center md:text-left">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">{tool.name}</h1>
            <p className="text-muted-foreground">{tool.description}</p>
          </div>

          {/* Upload + Action */}
          <div className="glass-card rounded-2xl p-5 flex flex-col justify-between max-h-[420px]">
            <UploadArea compact onChange={setFiles} />

            <ActionButton
  className="w-full mt-4"
  onClick={handleProcess}
  loading={loading}
  disabled={files.length === 0}
>
  Process Files
</ActionButton>

          </div>
        </div>
      </div>
    </main>
  );
};

export default ToolPage;
