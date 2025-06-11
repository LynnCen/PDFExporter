<template>
  <section id="features" class="py-16">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h3 class="text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">Key Features</h3>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
          Powerful tools and features designed to make PDF export seamless and efficient
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="(feature, index) in features" 
          :key="feature.title" 
          class="feature-card"
          :style="{ animationDelay: `${index * 100 + 400}ms` }"
          @mouseenter="onCardHover"
          @mouseleave="onCardLeave"
        >
          <div class="feature-icon" :class="`bg-${feature.color}-100`">
            <svg 
              class="w-8 h-8 transition-all duration-300" 
              :class="`text-${feature.color}-600`"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="feature.icon"></path>
            </svg>
          </div>
          
          <h4 class="text-xl font-semibold text-gray-900 mb-3">{{ feature.title }}</h4>
          <p class="text-gray-600 leading-relaxed">{{ feature.description }}</p>
          
          <!-- 悬停效果指示器 -->
          <div class="feature-indicator"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Feature {
  title: string
  description: string
  icon: string
  color: string
}

const features: Feature[] = [
  {
    title: 'High Quality Export',
    description: 'Vector-based PDF generation with crisp text and images that maintain perfect clarity at any resolution.',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    color: 'green'
  },
  {
    title: 'TypeScript Support',
    description: 'Full TypeScript support with comprehensive type definitions for enhanced development experience.',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    color: 'blue'
  },
  {
    title: 'Flexible Configuration',
    description: 'Customize page size, orientation, margins, quality and more with extensive configuration options.',
    icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4',
    color: 'purple'
  },
  {
    title: 'Vue 3 Composition API',
    description: 'Built with modern Vue 3 and Composition API patterns for optimal performance and maintainability.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    color: 'emerald'
  },
  {
    title: 'Progress Tracking',
    description: 'Real-time progress updates during PDF generation with detailed status information and error handling.',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    color: 'indigo'
  },
  {
    title: 'Multiple Formats',
    description: 'Support for various page formats including A4, Letter, Legal and custom dimensions for any use case.',
    icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
    color: 'orange'
  }
]

const onCardHover = (event: MouseEvent) => {
  const card = event.currentTarget as HTMLElement
  card.style.transform = 'translateY(-8px) scale(1.02)'
}

const onCardLeave = (event: MouseEvent) => {
  const card = event.currentTarget as HTMLElement
  card.style.transform = 'translateY(0) scale(1)'
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}

.feature-card {
  @apply bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center relative overflow-hidden;
  @apply transition-all duration-300 ease-out;
  @apply animate-fade-in-up;
  cursor: pointer;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.feature-card:hover::before {
  opacity: 1;
}

.feature-card:hover {
  @apply shadow-xl border-primary-200;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(59, 130, 246, 0.1);
}

.feature-icon {
  @apply w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 relative z-10;
  @apply transition-all duration-300;
}

.feature-card:hover .feature-icon {
  @apply transform scale-110;
}

.feature-indicator {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  transition: width 0.3s ease;
  border-radius: 2px 2px 0 0;
}

.feature-card:hover .feature-indicator {
  width: 60px;
}

/* 动画定义 */
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

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
  opacity: 0;
}

.animation-delay-200 {
  animation-delay: 200ms;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .feature-card {
    @apply p-6;
  }
  
  .feature-icon {
    @apply w-12 h-12 mb-4;
  }
}

/* 颜色变体 - 移除循环依赖，直接使用 Tailwind 类 */
</style> 