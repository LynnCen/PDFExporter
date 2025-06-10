<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div class="flex items-center space-x-4">
        <button @click="$emit('back')" class="btn-secondary shrink-0">
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
        <button @click="exportToPDF" :disabled="isExporting" class="btn-primary shrink-0">
          <svg v-if="!isExporting" class="w-4 h-4 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <svg v-else class="w-4 h-4 mr-2 animate-spin shrink-0" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{{ isExporting ? 'Exporting...' : 'Export PDF' }}</span>
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

    <!-- Export Configuration -->
    <div class="card">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Export Settings</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Filename</label>
          <input v-model="exportConfig.filename" type="text" class="input-field" placeholder="document.pdf">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Format</label>
          <select v-model="exportConfig.format" class="input-field">
            <option value="a4">A4 (210×297mm)</option>
            <option value="letter">Letter (8.5×11")</option>
            <option value="legal">Legal (8.5×14")</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Orientation</label>
          <select v-model="exportConfig.orientation" class="input-field">
            <option value="portrait">Portrait (纵向)</option>
            <option value="landscape">Landscape (横向)</option>
          </select>
        </div>
      </div>
      
      <!-- 预览信息 -->
      <div class="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
        <div class="flex items-center justify-between">
          <span>Preview: {{ formatDisplayName }} - {{ orientationDisplayName }}</span>
          <span>Aspect Ratio: {{ currentAspectRatio }}</span>
        </div>
      </div>
    </div>

    <!-- Demo Component Preview with Responsive Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- Preview Area -->
      <div class="lg:col-span-8">
        <div class="text-center text-gray-500 mb-4">
          <p class="text-sm">Live Preview - {{ formatDisplayName }} {{ orientationDisplayName }}</p>
        </div>
        
        <div class="flex justify-center">
          <div 
            :class="previewContainerClasses"
            class="w-full max-w-2xl mx-auto p-6"
            :style="previewContainerStyle"
          >
            <!-- Dynamic Component Rendering -->
            <div ref="exportElement" class="demo-content">
              <component :is="demoComponent" v-if="demoComponent" />
              <div v-else class="text-center py-12 text-gray-500">
                <p>Demo component "{{ demo.component }}" not found</p>
                <p class="text-sm mt-2">Component will be created soon...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Configuration Panel -->
      <div class="lg:col-span-4">
        <div class="card sticky top-6">
          <h4 class="font-semibold text-gray-900 mb-3">Layout Settings</h4>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Quality</label>
              <input 
                v-model.number="exportConfig.quality" 
                type="range" 
                min="0.1" 
                max="1" 
                step="0.1" 
                class="w-full"
              >
              <div class="flex justify-between text-xs text-gray-500 mt-1">
                <span>Low (0.1)</span>
                <span>{{ exportConfig.quality }}</span>
                <span>High (1.0)</span>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Preview Scale</label>
              <input 
                v-model.number="previewScale" 
                type="range" 
                min="0.5" 
                max="1.5" 
                step="0.1" 
                class="w-full"
              >
              <div class="flex justify-between text-xs text-gray-500 mt-1">
                <span>50%</span>
                <span>{{ Math.round(previewScale * 100) }}%</span>
                <span>150%</span>
              </div>
            </div>
            
            <div class="pt-4 border-t border-gray-200">
              <h5 class="text-sm font-medium text-gray-700 mb-2">Dimensions</h5>
              <div class="text-xs text-gray-600 space-y-1">
                <div>Width: {{ actualWidth }}px</div>
                <div>Height: {{ actualHeight }}px</div>
                <div>Ratio: {{ currentAspectRatio }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, shallowRef, computed, watch } from 'vue'
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

// Preview settings
const previewScale = ref(1)

// Component reference for export
const exportElement = ref<HTMLElement>()
const demoComponent = shallowRef<any>(null)

// Page format dimensions (in mm for A4, inches for Letter/Legal)
const formatDimensions = {
  a4: { width: 210, height: 297, unit: 'mm' },
  letter: { width: 8.5, height: 11, unit: 'in' },
  legal: { width: 8.5, height: 14, unit: 'in' }
}

// Computed properties for responsive preview
const formatDisplayName = computed(() => {
  const names = {
    a4: 'A4',
    letter: 'Letter',
    legal: 'Legal'
  }
  return names[exportConfig.value.format as keyof typeof names] || 'A4'
})

const orientationDisplayName = computed(() => {
  return exportConfig.value.orientation === 'landscape' ? 'Landscape' : 'Portrait'
})

const currentAspectRatio = computed(() => {
  const format = formatDimensions[exportConfig.value.format as keyof typeof formatDimensions]
  const isLandscape = exportConfig.value.orientation === 'landscape'
  
  const width = isLandscape ? format.height : format.width
  const height = isLandscape ? format.width : format.height
  
  const ratio = width / height
  return `${width}:${height} (${ratio.toFixed(2)})`
})

const actualWidth = computed(() => {
  const format = formatDimensions[exportConfig.value.format as keyof typeof formatDimensions]
  const isLandscape = exportConfig.value.orientation === 'landscape'
  const baseWidth = isLandscape ? format.height : format.width
  
  // Convert to pixels (assuming 96 DPI)
  const pixelWidth = format.unit === 'mm' ? baseWidth * 3.78 : baseWidth * 96
  return Math.round(pixelWidth * previewScale.value)
})

const actualHeight = computed(() => {
  const format = formatDimensions[exportConfig.value.format as keyof typeof formatDimensions]
  const isLandscape = exportConfig.value.orientation === 'landscape'
  const baseHeight = isLandscape ? format.width : format.height
  
  // Convert to pixels (assuming 96 DPI)
  const pixelHeight = format.unit === 'mm' ? baseHeight * 3.78 : baseHeight * 96
  return Math.round(pixelHeight * previewScale.value)
})

const previewContainerClasses = computed(() => {
  return [
    'preview-container',
    `format-${exportConfig.value.format}`,
    `orientation-${exportConfig.value.orientation}`
  ]
})

const previewContainerStyle = computed(() => {
  return {
    transform: `scale(${previewScale.value})`,
    transformOrigin: 'top center',
    maxWidth: exportConfig.value.orientation === 'landscape' ? '100%' : '600px'
  }
})

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

// Watch for configuration changes and provide feedback
watch(exportConfig, (newConfig) => {
  console.log('Export configuration updated:', newConfig)
}, { deep: true })
</script>

<style scoped>
.demo-content {
  min-height: 400px;
}

/* 确保预览容器在缩放时不影响布局 */
.preview-container {
  margin-bottom: 2rem;
}

/* 响应式调整 */
@media (max-width: 1024px) {
  .preview-container {
    transform: scale(0.8) !important;
  }
}

@media (max-width: 768px) {
  .preview-container {
    transform: scale(0.6) !important;
  }
}
</style> 