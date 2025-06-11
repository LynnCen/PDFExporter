import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { initPerformanceOptimizations } from './utils/performance'

// 创建Vue应用
const app = createApp(App)

// 初始化性能优化
initPerformanceOptimizations()

// 挂载应用
app.mount('#app')
