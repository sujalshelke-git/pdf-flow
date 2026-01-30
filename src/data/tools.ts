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
    api: '/convert/text',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    slug: 'image-to-pdf',
    name: 'Image to PDF',
    description: 'Turn your images into PDF documents',
    icon: Image,
     api: '/convert/image',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    slug: 'pdf-to-image',
    name: 'PDF to Image',
    description: 'Extract images from PDF files',
    icon: FileImage,
    api: '/convert/pdf-to-image',
    gradient: 'from-cyan-500 to-blue-500',
  },
 
  
  {
    slug: 'excel-to-pdf',
    name: 'Excel to PDF',
    description: 'Reduce PDF file size instantly',
    icon: FileText,
    api: '/convert/office',    
    gradient: 'from-red-500 to-pink-500',
  },
  {
    slug: 'ppt-to-pdf',
    name: 'PPT to PDF',
    description: 'Convert PDFs to editable documents',
    icon: FileType,
    api: '/convert/office',
    gradient: 'from-blue-500 to-indigo-500',
  },
  {
    slug: 'word-to-pdf',
    name: 'Word to PDF',
    description: 'Transform Word docs into PDFs',
    icon: FileType2,
    api: '/convert/office',
    gradient: 'from-purple-500 to-violet-500',
  },

  {
    slug: 'PDF Merge',
    name: 'PDF Merge',
    description: 'Extract images from PDF files',
    icon:  Merge,
    api: '/pdf/merge',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    slug: 'PDF Split',
    name: 'PDF Split',
    description: 'Convert plain text into beautiful PDFs',
    icon: FileText,
    api: '/pdf/split',
    gradient: 'from-violet-500 to-purple-500',
  }
];
