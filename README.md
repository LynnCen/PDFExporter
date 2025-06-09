# Vue to PDF Exporter

🚀 A powerful and flexible Vue 3 + TypeScript library for exporting Vue components to PDF with high-quality rendering and customizable options.

![Vue to PDF Demo](https://img.shields.io/badge/Vue-3-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-4.8+-blue.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## ✨ Features

- 🎨 **High-Quality Export**: Vector-based PDF generation with crisp text and images
- 📱 **Responsive**: Works with responsive Vue components
- 🔧 **Flexible Configuration**: Customize page size, orientation, margins, and more
- 🎯 **TypeScript Support**: Full TypeScript support with comprehensive type definitions
- ⚡ **Vue 3 Composition API**: Built with modern Vue 3 and Composition API patterns
- 📊 **Progress Tracking**: Real-time progress updates during PDF generation
- 📄 **Multiple Formats**: Support for A4, Letter, Legal, and custom page dimensions
- 🎪 **Demo Components**: 6+ demo components showcasing different use cases

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/LynnCen/PDFExporter.git
cd PDFExporter

# Install dependencies
npm install

# Start development server
npm run dev
```

### Basic Usage

```typescript
import { usePDFExport } from './hooks/use-pdf-export'

// In your Vue component
const { isExporting, exportProgress, exportMessage, exportToPDF } = usePDFExport()

// Export an element
const exportElement = ref<HTMLElement>()

const handleExport = async () => {
  await exportToPDF(exportElement.value, {
    filename: 'my-document.pdf',
    format: 'a4',
    orientation: 'portrait',
    quality: 1
  })
}
```

## 📚 Demo Components

The project includes 6 professionally designed demo components:

### 1. 💼 Business Card
Professional business card layout with contact information
- **Tags**: Card, Contact, Professional
- **Use Case**: Personal branding, networking

### 2. 🧾 Invoice Template
Complete invoice with items, calculations, and branding
- **Tags**: Business, Financial, Template
- **Use Case**: Billing, accounting, business transactions

### 3. 📄 Resume/CV
Modern resume layout with skills and experience sections
- **Tags**: Career, Professional, Layout
- **Use Case**: Job applications, professional profiles

### 4. 📊 Data Report
Charts, tables, and formatted data presentation
- **Tags**: Analytics, Charts, Data
- **Use Case**: Business reports, analytics dashboards

### 5. 🏆 Certificate
Award certificate with decorative borders and seals
- **Tags**: Award, Achievement, Formal
- **Use Case**: Education, training completion, recognition

### 6. 📰 Newsletter
Multi-column newsletter with images and articles
- **Tags**: Content, Layout, Publishing
- **Use Case**: Marketing, content distribution, communication

## 🛠️ API Reference

### `usePDFExport()` Hook

The main composable for PDF export functionality.

```typescript
interface UsePDFExport {
  isExporting: ComputedRef<boolean>
  exportProgress: ComputedRef<number>
  exportMessage: ComputedRef<string>
  lastResult: ComputedRef<ExportResult | null>
  exportToPDF: (element: HTMLElement, config?: ExportConfig) => Promise<ExportResult>
}
```

### Export Configuration

```typescript
interface ExportConfig {
  filename?: string              // Default: 'export-{timestamp}.pdf'
  quality?: number              // Default: 1 (0.1 - 1)
  orientation?: 'portrait' | 'landscape'  // Default: 'portrait'
  format?: 'a4' | 'letter' | 'legal'     // Default: 'a4'
  fillMode?: FillMode          // Default: FillMode.FIT
  html2canvasOptions?: Html2CanvasOptions
}
```

### Export Result

```typescript
interface ExportResult {
  success: boolean
  fileSize?: number            // File size in bytes
  processingTime?: number      // Processing time in ms
  layout?: ImageLayout         // Layout information
  error?: string              // Error message if failed
}
```

## 🏗️ Project Structure

```
src/
├── components/          # Vue components
│   ├── demos/          # Demo components
│   │   ├── BusinessCard.vue
│   │   ├── Invoice.vue
│   │   ├── Resume.vue
│   │   ├── DataReport.vue
│   │   ├── Certificate.vue
│   │   └── Newsletter.vue
│   └── DemoViewer.vue  # Component viewer and exporter
├── hooks/              # Composables
│   └── use-pdf-export.ts
├── pdf/                # PDF generation core
│   ├── index.ts        # Main exporter class
│   ├── canvas-generator.ts
│   ├── pdf-generator.ts
│   └── type.ts         # Type definitions
├── types/              # Additional type definitions
│   └── demo.ts
└── App.vue            # Main application
```

## 🎨 Styling

The project uses **TailwindCSS** for styling with custom design system:

- **Primary Colors**: Blue color palette (`primary-50` to `primary-700`)
- **Components**: Pre-built components like `.btn-primary`, `.card`, `.input-field`
- **Responsive**: Mobile-first responsive design
- **Print-Ready**: Optimized styles for PDF export

## ⚙️ Configuration

### TailwindCSS Configuration

The project includes a custom TailwindCSS configuration with:

```javascript
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
```

### TypeScript Configuration

Strict TypeScript configuration with:
- **Strict Mode**: Enabled for better type safety
- **No Unused Variables**: Enforced for clean code
- **Vue Support**: Full Vue 3 + TypeScript integration

## 🌐 Browser Compatibility & Known Issues

### Safari & iOS Compatibility

This library includes special handling for Safari-specific issues:

#### Document.write() Warning
You might see a console warning like:
```
[Violation] Avoid using document.write(). https://developers.google.com/web/updates/2016/08/removing-document-write
elementToCanvas @ canvas-generator.ts:56
```

**This is expected and safe to ignore.** The warning comes from the html2canvas library internally and does not affect functionality. Our implementation includes workarounds to ensure proper operation across all browsers.

#### Lazy Loading Images Issue
Safari has known issues with lazy-loaded images that can cause the export process to hang at "Starting document clone". Our solution automatically handles this by:

1. **Temporarily converting lazy images to eager loading** before export
2. **Automatically restoring original loading attributes** after export  
3. **Ignoring problematic elements** during the rendering process
4. **Preprocessing elements** to ensure Safari compatibility

#### Automatic Safari Fixes Applied

The `CanvasGenerator` class automatically:
- Detects and temporarily modifies `loading="lazy"` images
- Ignores external links that might cause CORS issues
- Uses optimized configurations for WebKit browsers
- Restores all changes after export completion

### Troubleshooting Export Issues

If you encounter problems:

1. **Export hangs at 0ms**: Usually caused by lazy-loaded images (handled automatically)
2. **CORS errors**: Enable `useCORS: true` in configuration
3. **Blank images**: Check image loading and CORS policies  
4. **Memory issues**: Reduce quality or scale for large content

### Browser Support

- ✅ **Chrome/Chromium**: Full support
- ✅ **Firefox**: Full support  
- ✅ **Safari/WebKit**: Full support with automatic compatibility fixes
- ✅ **Edge**: Full support
- ✅ **iOS Safari**: Full support with special handling
- ✅ **Android Chrome**: Full support

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Build Process

1. **TypeScript Compilation**: `vue-tsc -b`
2. **Vite Build**: Production-optimized bundle
3. **Assets**: Automatic asset optimization and bundling

## 📦 Dependencies

### Core Dependencies
- **Vue 3**: Modern reactive framework
- **html2canvas**: DOM to canvas conversion
- **jsPDF**: PDF generation library

### Development Dependencies
- **Vite**: Fast build tool and dev server
- **TypeScript**: Type safety and better DX
- **TailwindCSS**: Utility-first CSS framework
- **Vue TSC**: Vue TypeScript compiler

## 🎯 Use Cases

### Business Applications
- **Invoices & Bills**: Generate professional invoices
- **Reports**: Create data-driven reports with charts
- **Certificates**: Design and export certificates
- **Business Cards**: Professional contact cards

### Personal Projects
- **Resumes**: Modern CV layouts
- **Newsletters**: Content distribution
- **Documents**: Any Vue component to PDF

## 🚀 Performance

### Optimization Features
- **Lazy Loading**: Components are loaded on-demand
- **Progress Tracking**: Real-time export progress
- **Error Handling**: Comprehensive error management
- **Memory Management**: Efficient canvas and PDF generation

### Performance Tips
1. **Optimize Images**: Use appropriate image formats and sizes
2. **Minimize DOM Complexity**: Simpler components export faster
3. **Quality Settings**: Balance quality vs file size
4. **Progressive Enhancement**: Show progress during export

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/LynnCen/PDFExporter/issues)
- **Documentation**: This README and inline code comments
- **Examples**: Demo components in `/src/components/demos/`

## 🌟 Showcase

Try the live demo to see all components in action:

1. **Home Page**: Overview of features and capabilities
2. **Demo Gallery**: Browse all available demo components
3. **Interactive Export**: Test PDF export with different settings
4. **Real-time Preview**: See exactly what will be exported

---

Built with ❤️ using Vue 3, TypeScript, and TailwindCSS
