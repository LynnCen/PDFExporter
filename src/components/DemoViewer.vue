<template>
  <div class="demo-viewer space-y-6">
    <!-- 页面头部 -->
    <div class="viewer-header">
      <div class="flex items-center space-x-4">
        <button @click="$emit('back')" class="btn-secondary shrink-0 back-button">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Back to Demos
        </button>
        <div class="demo-info">
          <h2 class="text-2xl font-bold text-gray-900">{{ demo.title }}</h2>
          <p class="text-gray-600">{{ demo.description }}</p>
        </div>
      </div>
    </div>

    <!-- 主要布局：预览区和控制面板 -->
    <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
      <!-- 预览区域 -->
      <div class="xl:col-span-8">
        <PreviewContainer
          ref="previewContainerRef"
          :export-config="exportConfig"
          :preview-scale="previewScale"
        >
          <!-- 动态组件渲染 -->
          <component :is="demoComponent" v-if="demoComponent" />
          <div v-else class="component-placeholder">
            <div class="placeholder-icon">
              <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <p class="text-gray-500 font-medium">Loading {{ demo.component }}...</p>
            <p class="text-sm text-gray-400 mt-2">Component will be ready shortly</p>
            <div class="loading-bar">
              <div class="loading-progress"></div>
            </div>
          </div>
        </PreviewContainer>
      </div>
      
      <!-- 控制面板 -->
      <div class="xl:col-span-4">
        <ExportControls
          :export-config="exportConfig"
          :preview-scale="previewScale"
          :is-exporting="isExporting"
          :export-progress="exportProgress"
          :export-message="exportMessage"
          :last-result="lastResult"
          @update:export-config="updateExportConfig"
          @update:preview-scale="updatePreviewScale"
          @export="handleExport"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, watch, nextTick } from 'vue'
import type { DemoItem, ExportOptions } from '../types/demo'
import { usePDFExport } from '../hooks/use-pdf-export'
import PreviewContainer from './PreviewContainer.vue'
import ExportControls from './ExportControls.vue'

// Component imports
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

// Refs
const previewContainerRef = ref<InstanceType<typeof PreviewContainer>>()
const demoComponent = shallowRef<any>(null)

// 导出配置 - 优化默认设置
const exportConfig = ref<ExportOptions>({
  filename: `${props.demo.id}-export.pdf`,
  format: 'a4',
  orientation: 'portrait',
  quality: 0.9, // 稍微降低默认质量以平衡文件大小和质量
})

// 预览缩放
const previewScale = ref(0.8) // 默认80%缩放，更适合预览

// 动态加载组件
const loadDemoComponent = async () => {
  const componentName = props.demo.component as keyof typeof componentModules
  if (componentModules[componentName]) {
    try {
      const module = await componentModules[componentName]()
      demoComponent.value = module.default
      
      // 组件加载完成后，稍微延迟确保渲染完成
      await nextTick()
    } catch (error) {
      console.error(`Failed to load component ${componentName}:`, error)
    }
  }
}

// 监听 demo 变化重新加载组件
watch(() => props.demo, () => {
  demoComponent.value = null
  loadDemoComponent()
}, { immediate: true })

// 更新配置
const updateExportConfig = (newConfig: ExportOptions) => {
  exportConfig.value = { ...newConfig }
}

const updatePreviewScale = (newScale: number) => {
  previewScale.value = newScale
}

// 导出处理 - 优化尺寸适配
const handleExport = async () => {
  const exportElement = previewContainerRef.value?.exportElement
  if (!exportElement) {
    console.error('Export element not found')
    return
  }

  // 临时调整元素样式以适配PDF尺寸
  const originalStyles = {
    transform: exportElement.style.transform,
    width: exportElement.style.width,
    height: exportElement.style.height,
    fontSize: exportElement.style.fontSize,
  }

  try {
    // 设置PDF导出的最佳尺寸
    const formatDimensions = {
      a4: { width: 794, height: 1123 },
      letter: { width: 816, height: 1056 },
      legal: { width: 816, height: 1344 }
    }

    const dimensions = formatDimensions[exportConfig.value.format as keyof typeof formatDimensions]
    const isLandscape = exportConfig.value.orientation === 'landscape'
    
    const targetWidth = isLandscape ? dimensions.height : dimensions.width
    const targetHeight = isLandscape ? dimensions.width : dimensions.height

    // 应用导出专用样式
    exportElement.style.transform = 'scale(1)'
    exportElement.style.width = `${targetWidth}px`
    exportElement.style.height = `${targetHeight}px`
    exportElement.style.fontSize = '14px'

    // 等待样式应用
    await new Promise(resolve => setTimeout(resolve, 100))

    // 执行导出
    await exportPDF(exportElement, {
      filename: exportConfig.value.filename,
      format: exportConfig.value.format,
      orientation: exportConfig.value.orientation,
      quality: exportConfig.value.quality,
      // 优化导出选项
      html2canvasOptions: {
        scale: 2, // 高分辨率
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        removeContainer: true,
        scrollX: 0,
        scrollY: 0,
      }
    })

  } finally {
    // 恢复原始样式
    Object.assign(exportElement.style, originalStyles)
  }
}
</script>

<style scoped>
.demo-viewer {
  min-height: calc(100vh - 200px);
}

.viewer-header {
  @apply bg-white rounded-xl p-6 shadow-sm border border-gray-100;
  animation: slide-down 0.5s ease-out;
}

.back-button {
  @apply transition-all duration-200;
}

.back-button:hover {
  @apply transform -translate-x-1;
}

.demo-info h2 {
  background: linear-gradient(135deg, #1f2937 0%, #4f46e5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.component-placeholder {
  @apply flex flex-col items-center justify-center h-full min-h-96 text-center p-8;
}

.placeholder-icon {
  @apply mb-4;
  animation: pulse-gentle 2s ease-in-out infinite;
}

.loading-bar {
  @apply w-32 h-1 bg-gray-200 rounded-full mt-4 overflow-hidden;
}

.loading-progress {
  @apply h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full;
  animation: loading-progress 1.5s ease-in-out infinite;
  width: 0%;
}

/* 动画定义 */
@keyframes slide-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse-gentle {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

@keyframes loading-progress {
  0% {
    width: 0%;
    transform: translateX(-100%);
  }
  50% {
    width: 100%;
    transform: translateX(0%);
  }
  100% {
    width: 100%;
    transform: translateX(100%);
  }
}

/* 响应式调整 */
@media (max-width: 1280px) {
  .demo-viewer {
    min-height: calc(100vh - 150px);
  }
}

@media (max-width: 768px) {
  .viewer-header {
    @apply p-4;
  }
  
  .demo-info h2 {
    @apply text-xl;
  }
}
</style> 