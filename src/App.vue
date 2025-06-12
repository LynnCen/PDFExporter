<script setup lang="ts">
import { ref } from 'vue'
import type { DemoItem } from './types/demo'
import DemoViewer from './components/DemoViewer.vue'
import FeatureSection from './components/FeatureSection.vue'

const activeTab = ref<string>('home')
const selectedDemo = ref<DemoItem | null>(null)

const tabs = [
  { id: 'home', label: 'Home' },
  { id: 'demos', label: 'Demos' },
]

const stats = [
  { value: '6+', label: 'Demo Templates' },
  { value: '100%', label: 'TypeScript' },
  { value: '<10kb', label: 'Bundle Size' }
]

const demoItems: DemoItem[] = [
  {
    id: 'business-card',
    title: 'Business Card',
    description: 'Professional business card layout with contact information',
    icon: '💼',
    component: 'BusinessCard',
    tags: ['Card', 'Contact', 'Professional']
  },
  {
    id: 'invoice',
    title: 'Invoice Template',
    description: 'Complete invoice with items, calculations, and branding',
    icon: '🧾',
    component: 'Invoice',
    tags: ['Business', 'Financial', 'Template']
  },
  {
    id: 'resume',
    title: 'Resume/CV',
    description: 'Modern resume layout with skills and experience sections',
    icon: '📄',
    component: 'Resume',
    tags: ['Career', 'Professional', 'Layout']
  },
  {
    id: 'report',
    title: 'Data Report',
    description: 'Charts, tables, and formatted data presentation',
    icon: '📊',
    component: 'DataReport',
    tags: ['Analytics', 'Charts', 'Data']
  },
  {
    id: 'certificate',
    title: 'Certificate',
    description: 'Award certificate with decorative borders and seals',
    icon: '🏆',
    component: 'Certificate',
    tags: ['Award', 'Achievement', 'Formal']
  },
  {
    id: 'newsletter',
    title: 'Newsletter',
    description: 'Multi-column newsletter with images and articles',
    icon: '📰',
    component: 'Newsletter',
    tags: ['Content', 'Layout', 'Publishing']
  }
]

const selectDemo = (demo: DemoItem) => {
  selectedDemo.value = demo
  activeTab.value = 'viewer'
}

const scrollToFeatures = () => {
  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
}

const backToHome = () => {
  selectedDemo.value = null
  activeTab.value = 'home'
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <!-- Header -->
    <header class="header-glass sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center space-x-3 cursor-pointer" @click="backToHome">
            <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-bold text-gray-900">Vue to PDF</h1>
              <p class="text-sm text-gray-500">Export Vue components to PDF</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <nav class="hidden md:flex space-x-2">
              <button 
                v-for="tab in tabs" 
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="[
                  'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300',
                  activeTab === tab.id 
                    ? 'bg-primary-100 text-primary-700 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                ]"
              >
                {{ tab.label }}
              </button>
            </nav>
            
            <!-- GitHub Link -->
            <a 
              href="https://github.com/LynnCen/PDFExporter" 
              target="_blank" 
              rel="noopener noreferrer"
              class="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-300 hover:scale-110 group"
              title="View on GitHub"
            >
              <svg class="w-5 h-5 text-gray-700 group-hover:text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Demo Viewer -->
      <div v-if="activeTab === 'viewer' && selectedDemo" class="animate-fade-slide-in">
        <DemoViewer :demo="selectedDemo" @back="backToHome" />
      </div>

      <!-- Home Tab -->
      <div v-else-if="activeTab === 'home'" class="space-y-20">
        <!-- Hero Section -->
        <section class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16">
          <div class="space-y-8">
            <h2 class="hero-title">
              Transform Your Vue Components into PDF
            </h2>
            <p class="text-xl text-gray-600 leading-relaxed animate-fade-in-up" style="animation-delay: 0.2s; animation-fill-mode: both;">
              A powerful and flexible Vue 3 + TypeScript library for exporting Vue components to PDF with high-quality rendering and customizable options.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style="animation-delay: 0.4s; animation-fill-mode: both;">
                              <button @click="activeTab = 'demos'" class="btn-primary px-8 py-4 text-lg font-medium rounded-xl transition-all duration-300 flex items-center justify-center group">
                  <span>Try Demos</span>
                  <svg class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
                <button @click="scrollToFeatures" class="btn-secondary px-8 py-4 text-lg font-medium rounded-xl transition-all duration-300 flex items-center justify-center">
                  Learn More
                </button>
            </div>
          </div>
          
          <!-- Hero Visual -->
          <div class="flex justify-center lg:justify-end animate-fade-in-up" style="animation-delay: 0.6s; animation-fill-mode: both;">
            <div class="relative">
              <div class="floating-card" v-for="(demo, index) in demoItems.slice(0, 3)" :key="demo.id" :style="{ animationDelay: `${index * 0.2}s` }">
                <div class="card-icon">{{ demo.icon }}</div>
                <div class="card-title">{{ demo.title }}</div>
              </div>
            </div>
          </div>
        </section>

        <!-- Features Section -->
        <FeatureSection />

        <!-- Stats Section -->
        <section class="py-16">
          <div class="bg-white rounded-3xl p-8 shadow-xl border border-gray-100" style="background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div v-for="(stat, index) in stats" :key="stat.label" class="space-y-2 animate-fade-in-up" :style="{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }">
                <div class="text-3xl lg:text-4xl font-bold text-primary-600">{{ stat.value }}</div>
                <div class="text-gray-600 font-medium">{{ stat.label }}</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Demos Tab -->
      <div v-else-if="activeTab === 'demos'" class="space-y-8 animate-fade-slide-in">
        <div class="text-center space-y-4">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900">Demo Templates</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our collection of professionally designed templates ready for PDF export
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="(demo, index) in demoItems" 
            :key="demo.id" 
            class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-2 hover:border-primary-200 animate-fade-in-up group"
            :style="{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }"
            @click="selectDemo(demo)"
          >
            <div class="flex items-start space-x-4 mb-4">
              <div class="text-3xl flex-shrink-0">{{ demo.icon }}</div>
              <div class="flex-1 space-y-2">
                <h3 class="font-semibold text-gray-900">{{ demo.title }}</h3>
                <p class="text-sm text-gray-600 leading-relaxed">{{ demo.description }}</p>
              </div>
            </div>
            
            <div class="flex flex-wrap gap-2 mb-4">
              <span v-for="tag in demo.tags" :key="tag" class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg font-medium">
                {{ tag }}
              </span>
            </div>
            
            <div class="flex items-center justify-between text-primary-600 font-medium border-t border-gray-100 pt-4">
              <span class="transition-colors duration-200">Try Template</span>
              <svg class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Header Styles */
.header-glass {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Hero Title with Gradient */
.hero-title {
  font-size: 2.5rem;
  line-height: 1.2;
  font-weight: 700;
  color: #1f2937;
  background: linear-gradient(135deg, #1f2937 0%, #4f46e5 50%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: fade-in-up 0.8s ease-out;
}

@media (min-width: 1024px) {
  .hero-title {
    font-size: 3rem;
  }
}

/* Floating Cards Animation */
.floating-card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid #f3f4f6;
  margin-bottom: 1rem;
  transform: translateY(0);
  transition: all 0.3s ease;
  animation: float 3s ease-in-out infinite;
}

.floating-card:nth-child(2) {
  margin-left: 2rem;
  animation-delay: 1s;
}

.floating-card:nth-child(3) {
  margin-left: 1rem;
  animation-delay: 2s;
}

.card-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.card-title {
  font-weight: 600;
  color: #1f2937;
}

/* Custom animations - keeping only essential ones */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Utility classes for animations */
.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out;
}

.animate-fade-slide-in {
  animation: fade-slide-in 0.6s ease-out;
}

@keyframes fade-slide-in {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hero-title {
    font-size: 1.875rem;
    text-align: center;
  }
  
  .floating-card {
    transform: scale(0.75);
  }
}
</style>
