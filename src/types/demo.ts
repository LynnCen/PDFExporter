export interface DemoItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  component: string;
  tags: string[];
}

export interface ExportOptions {
  filename?: string;
  format?: 'a4' | 'letter' | 'legal';
  orientation?: 'portrait' | 'landscape';
  quality?: number;
} 