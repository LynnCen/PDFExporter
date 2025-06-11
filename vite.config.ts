import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  
  // 构建优化
  build: {
    // 启用CSS代码分割
    cssCodeSplit: true,
    
    // 构建目标
    target: 'esnext',
    
    // 压缩选项
    minify: 'esbuild',
    
    // 控制包大小警告
    chunkSizeWarningLimit: 1000,
    
    // Rollup选项
    rollupOptions: {
      output: {
        // 代码分割策略
        manualChunks: {
          // 将Vue相关库单独打包
          'vue-vendor': ['vue'],
          // 将PDF相关库单独打包
          'pdf-libs': ['html2canvas', 'jspdf'],
          // 将工具库单独打包
          'utils': ['@tailwindcss/typography']
        },
        
        // 优化文件名
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    
    // 开启gzip压缩
    reportCompressedSize: true,
    
    // 优化包大小
    sourcemap: false, // 生产环境关闭sourcemap
  },
  
  // 开发服务器优化
  server: {
    // 预热常用文件
    warmup: {
      clientFiles: ['./src/components/*.vue', './src/hooks/*.ts']
    }
  },
  
  // 依赖优化
  optimizeDeps: {
    include: [
      'vue',
      'html2canvas',
      'jspdf'
    ],
    exclude: [
      // 排除不需要预构建的包
    ]
  },
  
  // 预加载配置
  define: {
    // 在生产环境移除console
    __VUE_PROD_DEVTOOLS__: false,
  }
})
