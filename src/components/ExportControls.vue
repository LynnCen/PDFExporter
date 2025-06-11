<template>
  <div class="export-controls space-y-6">
    <!-- 导出按钮和进度 -->
    <div class="card">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h3 class="text-lg font-semibold text-gray-900">Export Settings</h3>
        <button 
          @click="$emit('export')" 
          :disabled="isExporting" 
          class="btn-primary shrink-0 export-button"
          :class="{ 'exporting': isExporting }"
        >
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

      <!-- 基本配置 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div class="form-group">
          <label class="form-label">Filename</label>
          <input 
            v-model="localConfig.filename" 
            type="text" 
            class="input-field"
            placeholder="document.pdf"
            @input="updateConfig"
          >
        </div>
        <div class="form-group">
          <label class="form-label">Format</label>
          <select v-model="localConfig.format" class="input-field" @change="updateConfig">
            <option value="a4">A4 (210×297mm)</option>
            <option value="letter">Letter (8.5×11")</option>
            <option value="legal">Legal (8.5×14")</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Orientation</label>
          <select v-model="localConfig.orientation" class="input-field" @change="updateConfig">
            <option value="portrait">Portrait (纵向)</option>
            <option value="landscape">Landscape (横向)</option>
          </select>
        </div>
      </div>
      
      <!-- 预览信息 -->
      <div class="info-panel">
        <div class="flex items-center justify-between">
          <span>Preview: {{ formatDisplayName }} - {{ orientationDisplayName }}</span>
          <span>{{ actualDimensions }}</span>
        </div>
      </div>
    </div>

    <!-- 导出进度 -->
    <div v-if="isExporting" class="card progress-card">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm font-medium text-gray-700">{{ exportMessage }}</span>
        <span class="text-sm text-gray-500">{{ exportProgress }}%</span>
      </div>
      <div class="progress-bar">
        <div 
          class="progress-fill"
          :style="{ width: `${exportProgress}%` }"
        ></div>
      </div>
    </div>

    <!-- 导出结果 -->
    <div v-if="lastResult && !isExporting" class="card result-card" :class="{ 'success': lastResult.success, 'error': !lastResult.success }">
      <div v-if="lastResult.success" class="flex items-center text-green-600">
        <svg class="w-5 h-5 mr-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        PDF exported successfully! 
        <span class="ml-2 text-sm text-gray-600">
          ({{ ((lastResult.fileSize || 0) / 1024).toFixed(1) }}KB, {{ lastResult.processingTime }}ms)
        </span>
      </div>
      <div v-else class="flex items-center text-red-600">
        <svg class="w-5 h-5 mr-2 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        Export failed: {{ lastResult.error }}
      </div>
    </div>

    <!-- 高级设置 -->
    <div class="card advanced-settings">
      <h4 class="font-semibold text-gray-900 mb-3">Advanced Settings</h4>
      
      <div class="space-y-4">
        <!-- 质量设置 -->
        <div class="form-group">
          <label class="form-label mb-2">Quality ({{ localConfig.quality }})</label>
          <input 
            v-model.number="localConfig.quality" 
            type="range" 
            min="0.1" 
            max="1" 
            step="0.1" 
            class="range-slider"
            @input="updateConfig"
          >
          <div class="range-labels">
            <span>Low (0.1)</span>
            <span>High (1.0)</span>
          </div>
        </div>
        
        <!-- 预览缩放 -->
        <div class="form-group">
          <label class="form-label mb-2">Preview Scale ({{ Math.round(previewScale * 100) }}%)</label>
          <input 
            v-model.number="localPreviewScale" 
            type="range" 
            min="0.3" 
            max="1.2" 
            step="0.1" 
            class="range-slider"
            @input="updatePreviewScale"
          >
          <div class="range-labels">
            <span>30%</span>
            <span>120%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { ExportOptions } from '../types/demo'
import type { ExportResult } from '../pdf/type'

interface Props {
  exportConfig: ExportOptions
  previewScale: number
  isExporting: boolean
  exportProgress: number
  exportMessage: string
  lastResult: ExportResult | null
}

interface Emits {
  (e: 'update:exportConfig', config: ExportOptions): void
  (e: 'update:previewScale', scale: number): void
  (e: 'export'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// 本地副本，避免直接修改 props
const localConfig = ref<ExportOptions>({ ...props.exportConfig })
const localPreviewScale = ref(props.previewScale)

// 监听 props 变化
watch(() => props.exportConfig, (newConfig) => {
  localConfig.value = { ...newConfig }
}, { deep: true })

watch(() => props.previewScale, (newScale) => {
  localPreviewScale.value = newScale
})

const formatDisplayName = computed(() => {
  const names = { a4: 'A4', letter: 'Letter', legal: 'Legal' }
  return names[localConfig.value.format as keyof typeof names] || 'A4'
})

const orientationDisplayName = computed(() => {
  return localConfig.value.orientation === 'landscape' ? 'Landscape' : 'Portrait'
})

const actualDimensions = computed(() => {
  const formats = {
    a4: { width: 794, height: 1123 },
    letter: { width: 816, height: 1056 },
    legal: { width: 816, height: 1344 }
  }
  
  const format = formats[localConfig.value.format as keyof typeof formats]
  const isLandscape = localConfig.value.orientation === 'landscape'
  
  const width = isLandscape ? format.height : format.width
  const height = isLandscape ? format.width : format.height
  
  return `${width}×${height}px`
})

const updateConfig = () => {
  emit('update:exportConfig', { ...localConfig.value })
}

const updatePreviewScale = () => {
  emit('update:previewScale', localPreviewScale.value)
}
</script>

<style scoped>
.export-controls {
  position: sticky;
  top: 24px;
}

.form-group {
  @apply space-y-1;
}

.form-label {
  @apply block text-sm font-medium text-gray-700;
}

.export-button {
  @apply transition-all duration-300;
  position: relative;
  overflow: hidden;
}

.export-button:not(:disabled):hover {
  @apply transform scale-105 shadow-lg;
}

.export-button.exporting {
  @apply cursor-not-allowed;
}

.export-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.export-button:hover::before {
  left: 100%;
}

.info-panel {
  @apply text-sm text-gray-600 bg-gray-50 rounded-lg p-3;
}

.progress-card {
  @apply border-blue-200 bg-blue-50;
}

.progress-bar {
  @apply w-full bg-gray-200 rounded-full h-2;
}

.progress-fill {
  @apply bg-primary-600 h-2 rounded-full transition-all duration-300;
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
}

.result-card {
  @apply transition-all duration-300;
}

.result-card.success {
  @apply border-green-200 bg-green-50;
}

.result-card.error {
  @apply border-red-200 bg-red-50;
}

.advanced-settings {
  @apply border-gray-200;
}

.range-slider {
  @apply w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer;
}

.range-slider::-webkit-slider-thumb {
  @apply appearance-none w-4 h-4 bg-primary-600 rounded-full cursor-pointer shadow-md;
  transition: all 0.2s ease;
}

.range-slider::-webkit-slider-thumb:hover {
  @apply transform scale-125 bg-primary-700;
}

.range-slider::-moz-range-thumb {
  @apply w-4 h-4 bg-primary-600 rounded-full cursor-pointer border-0 shadow-md;
  transition: all 0.2s ease;
}

.range-labels {
  @apply flex justify-between text-xs text-gray-500 mt-1;
}

/* 动画效果 */
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

.export-controls {
  animation: fade-slide-in 0.5s ease-out;
}
</style> 