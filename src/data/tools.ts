import {
  FileText,
  Image,
  FileImage,
  Merge,
  Split,
  Minimize2,
  FileType,
  FileType2,
} from 'lucide-react';

export const tools = [
  {
    slug: 'text-to-pdf',
    name: 'Text to PDF',
    description: 'Convert plain text into beautiful PDFs',
    icon: FileText,
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    slug: 'image-to-pdf',
    name: 'Image to PDF',
    description: 'Turn your images into PDF documents',
    icon: Image,
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    slug: 'pdf-to-image',
    name: 'PDF to Image',
    description: 'Extract images from PDF files',
    icon: FileImage,
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    slug: 'merge-pdf',
    name: 'Merge PDF',
    description: 'Combine multiple PDFs into one',
    icon: Merge,
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    slug: 'split-pdf',
    name: 'Split PDF',
    description: 'Separate PDF pages into files',
    icon: Split,
    gradient: 'from-orange-500 to-amber-500',
  },
  {
    slug: 'compress-pdf',
    name: 'Compress PDF',
    description: 'Reduce PDF file size instantly',
    icon: Minimize2,
    gradient: 'from-red-500 to-pink-500',
  },
  {
    slug: 'pdf-to-word',
    name: 'PDF to Word',
    description: 'Convert PDFs to editable documents',
    icon: FileType,
    gradient: 'from-blue-500 to-indigo-500',
  },
  {
    slug: 'word-to-pdf',
    name: 'Word to PDF',
    description: 'Transform Word docs into PDFs',
    icon: FileType2,
    gradient: 'from-purple-500 to-violet-500',
  },
];
