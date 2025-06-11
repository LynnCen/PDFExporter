<template>
  <div class="preview-wrapper">
    <!-- 预览信息 -->
    <div class="text-center text-gray-500 mb-4">
      <p class="text-sm">Live Preview - {{ formatDisplayName }} {{ orientationDisplayName }}</p>
      <p class="text-xs text-gray-400">{{ actualWidth }}×{{ actualHeight }}px ({{ Math.round(previewScale * 100) }}%)</p>
    </div>
    
    <!-- 预览容器 -->
    <div class="preview-frame" :style="previewFrameStyle">
      <div 
        class="preview-content"
        :class="previewContentClasses"
        :style="previewContentStyle"
        ref="previewContainer"
      >
        <!-- 纸张边界指示器 -->
        <div class="paper-boundary" :style="paperBoundaryStyle">
          <!-- 组件内容区域 -->
          <div 
            ref="exportElement" 
            class="component-content"
            :style="componentContentStyle"
          >
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ExportOptions } from '../types/demo'

interface Props {
  exportConfig: ExportOptions
  previewScale: number
}

const props = defineProps<Props>()

const exportElement = ref<HTMLElement>()
const previewContainer = ref<HTMLElement>()

// 页面格式尺寸 (转换为像素，96 DPI)
const formatDimensions = {
  a4: { width: 794, height: 1123 }, // 210×297mm
  letter: { width: 816, height: 1056 }, // 8.5×11"
  legal: { width: 816, height: 1344 } // 8.5×14"
}

const formatDisplayName = computed(() => {
  const names = { a4: 'A4', letter: 'Letter', legal: 'Legal' }
  return names[props.exportConfig.format as keyof typeof names] || 'A4'
})

const orientationDisplayName = computed(() => {
  return props.exportConfig.orientation === 'landscape' ? 'Landscape' : 'Portrait'
})

const paperDimensions = computed(() => {
  const format = formatDimensions[props.exportConfig.format as keyof typeof formatDimensions]
  const isLandscape = props.exportConfig.orientation === 'landscape'
  
  return {
    width: isLandscape ? format.height : format.width,
    height: isLandscape ? format.width : format.height
  }
})

const actualWidth = computed(() => Math.round(paperDimensions.value.width * props.previewScale))
const actualHeight = computed(() => Math.round(paperDimensions.value.height * props.previewScale))

// 预览框架样式 - 提供视觉边界
const previewFrameStyle = computed(() => ({
  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
  border: '2px dashed #cbd5e1',
  borderRadius: '12px',
  padding: '24px',
  minHeight: '600px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative' as const,
  overflow: 'hidden'
}))

// 预览内容样式
const previewContentClasses = computed(() => [
  'preview-content-inner',
  'transition-all',
  'duration-300',
  'ease-in-out',
  'shadow-xl'
])

const previewContentStyle = computed(() => ({
  transform: `scale(${Math.min(props.previewScale, 1)})`,
  transformOrigin: 'center center',
  maxWidth: '100%',
  maxHeight: '100%'
}))

// 纸张边界样式 - 模拟真实纸张
const paperBoundaryStyle = computed(() => ({
  width: `${paperDimensions.value.width}px`,
  height: `${paperDimensions.value.height}px`,
  backgroundColor: '#ffffff',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
  borderRadius: '4px',
  position: 'relative' as const,
  overflow: 'hidden'
}))

// 组件内容样式 - 确保内容适配纸张尺寸
const componentContentStyle = computed(() => ({
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column' as const
}))

// 暴露导出元素引用
defineExpose({
  exportElement
})
</script>

<style scoped>
.preview-wrapper {
  position: relative;
}

.preview-frame {
  position: relative;
  transition: all 0.3s ease;
}

.preview-frame::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(203, 213, 225, 0.1) 10px,
    rgba(203, 213, 225, 0.1) 20px
  );
  pointer-events: none;
  border-radius: inherit;
}

.preview-content-inner {
  position: relative;
  z-index: 1;
}

.paper-boundary {
  position: relative;
}

.component-content {
  font-size: 14px;
  line-height: 1.5;
}

/* 响应式调整 */
@media (max-width: 1280px) {
  .preview-frame {
    padding: 16px;
  }
}

@media (max-width: 768px) {
  .preview-frame {
    padding: 12px;
    min-height: 400px;
  }
  
  .component-content {
    font-size: 12px;
  }
}

/* 动画效果 */
@keyframes preview-fade-in {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.preview-content-inner {
  animation: preview-fade-in 0.5s ease-out;
}
</style> 