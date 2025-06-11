/**
 * 性能优化工具类
 */

// 懒加载图片
export const lazyLoadImages = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
};

// 预加载关键资源
export const preloadCriticalResources = () => {
  const criticalResources = [
    '/src/components/DemoViewer.vue',
    '/src/hooks/use-pdf-export.ts'
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'modulepreload';
    link.href = resource;
    document.head.appendChild(link);
  });
};

// 延迟加载非关键JS
export const deferNonCriticalJS = () => {
  const nonCriticalScripts = document.querySelectorAll('script[data-defer]');
  
  const loadScript = (script: Element) => {
    const newScript = document.createElement('script');
    newScript.src = (script as HTMLScriptElement).dataset.src || '';
    newScript.type = 'module';
    document.head.appendChild(newScript);
  };

  // 在页面加载完成后加载非关键脚本
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        nonCriticalScripts.forEach(loadScript);
      }, 100);
    });
  } else {
    setTimeout(() => {
      nonCriticalScripts.forEach(loadScript);
    }, 100);
  }
};

// 性能监控
export const performanceMonitor = {
  // 监控Core Web Vitals
  measureCoreWebVitals: () => {
    // FCP (First Contentful Paint)
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        console.log('FCP:', entry.startTime);
      }
    }).observe({ entryTypes: ['paint'] });

    // LCP (Largest Contentful Paint)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // CLS (Cumulative Layout Shift)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      console.log('CLS:', clsValue);
    }).observe({ entryTypes: ['layout-shift'] });
  },

  // 监控资源加载时间
  measureResourceTiming: () => {
    window.addEventListener('load', () => {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      console.log('页面加载时间:', perfData.loadEventEnd - perfData.fetchStart);
      console.log('DNS查询时间:', perfData.domainLookupEnd - perfData.domainLookupStart);
      console.log('TCP连接时间:', perfData.connectEnd - perfData.connectStart);
      console.log('首字节时间:', perfData.responseStart - perfData.requestStart);
    });
  }
};

// 初始化性能优化
export const initPerformanceOptimizations = () => {
  // 预加载关键资源
  preloadCriticalResources();
  
  // 懒加载图片
  lazyLoadImages();
  
  // 延迟加载非关键JS
  deferNonCriticalJS();
  
  // 开启性能监控（仅在开发环境）
  if (import.meta.env.DEV) {
    performanceMonitor.measureCoreWebVitals();
    performanceMonitor.measureResourceTiming();
  }
}; 