<script setup lang="ts">
import { ref } from 'vue'
import type { DemoItem } from './types/demo'
import DemoViewer from './components/DemoViewer.vue'

const activeTab = ref<string>('home')
const selectedDemo = ref<DemoItem | null>(null)

const tabs = [
  { id: 'home', label: 'Home' },
  { id: 'demos', label: 'Demos' },
]

const features = [
  {
    title: 'High Quality Export',
    description: 'Vector-based PDF generation with crisp text and images',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    title: 'TypeScript Support',
    description: 'Full TypeScript support with comprehensive type definitions',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
  },
  {
    title: 'Flexible Configuration',
    description: 'Customize page size, orientation, margins, and more',
    icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4'
  },
  {
    title: 'Vue 3 Composition API',
    description: 'Built with modern Vue 3 and Composition API patterns',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z'
  },
  {
    title: 'Progress Tracking',
    description: 'Real-time progress updates during PDF generation',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
  },
  {
    title: 'Multiple Formats',
    description: 'Support for various page formats and custom dimensions',
    icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z'
  }
]

const stats = [
  { value: '10+', label: 'Demo Templates' },
  { value: '100%', label: 'TypeScript' },
  { value: '5kb', label: 'Bundle Size' }
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
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-bold text-gray-900">Vue to PDF</h1>
              <p class="text-sm text-gray-500">Export Vue components to PDF</p>
            </div>
          </div>
          
          <nav class="hidden md:flex space-x-6">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                activeTab === tab.id 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              ]"
            >
              {{ tab.label }}
            </button>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Home Tab -->
      <div v-if="activeTab === 'home'" class="space-y-12">
        <!-- Hero Section -->
        <section class="text-center py-12">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">
            Transform Your Vue Components into PDF
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            A powerful and flexible Vue 3 + TypeScript library for exporting Vue components to PDF with high-quality rendering and customizable options.
          </p>
          <div class="flex justify-center space-x-4">
            <button @click="activeTab = 'demos'" class="btn-primary px-6 py-3 text-lg">
              Try Demos
            </button>
            <button @click="scrollToFeatures" class="btn-secondary px-6 py-3 text-lg">
              Learn More
            </button>
          </div>
        </section>

        <!-- Features Section -->
        <section id="features" class="py-12">
          <h3 class="text-3xl font-bold text-center text-gray-900 mb-12">Key Features</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="feature in features" :key="feature.title" class="card text-center">
              <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="feature.icon"></path>
                </svg>
              </div>
              <h4 class="text-xl font-semibold text-gray-900 mb-2">{{ feature.title }}</h4>
              <p class="text-gray-600">{{ feature.description }}</p>
            </div>
          </div>
        </section>

        <!-- Stats Section -->
        <section class="bg-white rounded-2xl p-8 shadow-sm">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div v-for="stat in stats" :key="stat.label">
              <div class="text-3xl font-bold text-primary-600 mb-2">{{ stat.value }}</div>
              <div class="text-gray-600">{{ stat.label }}</div>
            </div>
          </div>
        </section>
      </div>

      <!-- Demos Tab -->
      <div v-if="activeTab === 'demos'" class="space-y-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">PDF Export Demos</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Explore different types of content and see how they convert to PDF format.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="demo in demoItems" :key="demo.id" class="card hover:shadow-lg transition-shadow cursor-pointer" @click="selectDemo(demo)">
            <div class="flex items-start space-x-4">
              <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span class="text-2xl">{{ demo.icon }}</span>
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ demo.title }}</h3>
                <p class="text-gray-600 text-sm mb-3">{{ demo.description }}</p>
                <div class="flex flex-wrap gap-1">
                  <span v-for="tag in demo.tags" :key="tag" class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Demo Viewer -->
      <div v-if="activeTab === 'viewer' && selectedDemo">
        <DemoViewer :demo="selectedDemo" @back="activeTab = 'demos'" />
      </div>
    </main>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
