<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <button @click="$emit('back')" class="btn-secondary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Back to Demos
        </button>
        <div>
          <h2 class="text-2xl font-bold text-gray-900">{{ demo.title }}</h2>
          <p class="text-gray-600">{{ demo.description }}</p>
        </div>
      </div>
      
      <div class="flex items-center space-x-2">
        <button @click="exportToPDF" :disabled="isExporting" class="btn-primary">
          <svg v-if="!isExporting" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <svg v-else class="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isExporting ? 'Exporting...' : 'Export PDF' }}
        </button>
      </div>
    </div>

    <!-- Export Progress -->
    <div v-if="isExporting" class="card">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm font-medium text-gray-700">{{ exportMessage }}</span>
        <span class="text-sm text-gray-500">{{ exportProgress }}%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div 
          class="bg-primary-600 h-2 rounded-full transition-all duration-300"
          :style="{ width: `${exportProgress}%` }"
        ></div>
      </div>
    </div>

    <!-- Export Result -->
    <div v-if="lastResult && !isExporting" class="card">
      <div v-if="lastResult.success" class="flex items-center text-green-600">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        PDF exported successfully! 
        <span class="ml-2 text-sm text-gray-600">
          ({{ ((lastResult.fileSize || 0) / 1024).toFixed(1) }}KB, {{ lastResult.processingTime }}ms)
        </span>
      </div>
      <div v-else class="flex items-center text-red-600">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        Export failed: {{ lastResult.error }}
      </div>
    </div>

    <!-- Demo Component Preview -->
    <div class="bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-200 p-8">
      <div class="text-center text-gray-500 mb-4">
        <p class="text-sm">Preview Area</p>
      </div>
      
      <!-- Dynamic Component Rendering -->
      <div ref="exportElement" class="demo-content">
        <component :is="demoComponent" v-if="demoComponent" />
        <div v-else class="text-center py-12 text-gray-500">
          <p>Demo component "{{ demo.component }}" not found</p>
          <p class="text-sm mt-2">Component will be created soon...</p>
        </div>
      </div>
    </div>

    <!-- Export Configuration -->
    <div class="card">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Export Settings</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Filename</label>
          <input v-model="exportConfig.filename" type="text" class="input-field" placeholder="document.pdf">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Format</label>
          <select v-model="exportConfig.format" class="input-field">
            <option value="a4">A4</option>
            <option value="letter">Letter</option>
            <option value="legal">Legal</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Orientation</label>
          <select v-model="exportConfig.orientation" class="input-field">
            <option value="portrait">Portrait</option>
            <option value="landscape">Landscape</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, shallowRef } from 'vue'
import type { DemoItem, ExportOptions } from '../types/demo'
import { usePDFExport } from '../hooks/use-pdf-export'

// Component imports - we'll import these dynamically
const componentModules = {
  BusinessCard: () => import('./demos/BusinessCard.vue'),
  Invoice: () => import('./demos/Invoice.vue'),
  Resume: () => import('./demos/Resume.vue'),
  DataReport: () => import('./demos/DataReport.vue'),
  Certificate: () => import('./demos/Certificate.vue'),
  Newsletter: () => import('./demos/Newsletter.vue'),
}

const props = defineProps<{
  demo: DemoItem
}>()

defineEmits<{
  back: []
}>()

// PDF Export Hook
const { isExporting, exportProgress, exportMessage, lastResult, exportToPDF: exportPDF } = usePDFExport()

// Export configuration
const exportConfig = ref<ExportOptions>({
  filename: `${props.demo.id}-demo.pdf`,
  format: 'a4',
  orientation: 'portrait',
  quality: 1
})

// Component reference for export
const exportElement = ref<HTMLElement>()
const demoComponent = shallowRef<any>(null)

// Load demo component dynamically
const loadDemoComponent = async () => {
  const componentName = props.demo.component as keyof typeof componentModules
  if (componentModules[componentName]) {
    try {
      const module = await componentModules[componentName]()
      demoComponent.value = module.default
    } catch (error) {
      console.error(`Failed to load component ${componentName}:`, error)
    }
  }
}

// Load component on mount
loadDemoComponent()

const exportToPDF = async () => {
  if (!exportElement.value) {
    console.error('Export element not found')
    return
  }

  await exportPDF(exportElement.value, {
    filename: exportConfig.value.filename,
    format: exportConfig.value.format,
    orientation: exportConfig.value.orientation,
    quality: exportConfig.value.quality
  })
}
</script>

<style scoped>
.demo-content {
  min-height: 400px;
}
</style> 