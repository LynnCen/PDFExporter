<template>
  <div class="certificate max-w-4xl mx-auto bg-white p-12 shadow-lg border-8 border-yellow-500" style="background-image: radial-gradient(circle at 1px 1px, rgba(255,215,0,0.15) 1px, transparent 0); background-size: 20px 20px;">
    <!-- Decorative Border -->
    <div class="border-4 border-yellow-400 p-8 relative">
      <!-- Corner Decorations -->
      <div class="absolute top-2 left-2 w-8 h-8 border-l-4 border-t-4 border-yellow-600"></div>
      <div class="absolute top-2 right-2 w-8 h-8 border-r-4 border-t-4 border-yellow-600"></div>
      <div class="absolute bottom-2 left-2 w-8 h-8 border-l-4 border-b-4 border-yellow-600"></div>
      <div class="absolute bottom-2 right-2 w-8 h-8 border-r-4 border-b-4 border-yellow-600"></div>
      
      <!-- Header -->
      <div class="text-center mb-8">
        <!-- Seal/Logo -->
        <div class="w-20 h-20 mx-auto mb-6 bg-yellow-500 rounded-full flex items-center justify-center border-4 border-yellow-600">
          <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        
        <h1 class="text-4xl font-serif font-bold text-gray-900 mb-2">CERTIFICATE OF ACHIEVEMENT</h1>
        <div class="w-32 h-1 bg-yellow-500 mx-auto mb-4"></div>
        <p class="text-lg text-gray-600 italic">This is to certify that</p>
      </div>

      <!-- Recipient -->
      <div class="text-center mb-8">
        <h2 class="text-5xl font-serif font-bold text-primary-700 mb-4 underline decoration-yellow-500 decoration-4">
          Michael Rodriguez
        </h2>
        <p class="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
          has successfully completed the comprehensive training program in
        </p>
      </div>

      <!-- Course Details -->
      <div class="text-center mb-8">
        <h3 class="text-3xl font-serif font-bold text-gray-900 mb-2">
          Advanced Web Development with Vue.js
        </h3>
        <p class="text-lg text-gray-600 mb-4">
          60 hours of intensive training covering modern frontend development practices
        </p>
        <div class="flex justify-center space-x-8 text-sm text-gray-600">
          <div>
            <span class="font-semibold">Course Duration:</span> 8 weeks
          </div>
          <div>
            <span class="font-semibold">Final Score:</span> 95%
          </div>
          <div>
            <span class="font-semibold">Grade:</span> A+
          </div>
        </div>
      </div>

      <!-- Date and Signatures -->
      <div class="grid grid-cols-3 gap-8 mt-12">
        <div class="text-center">
          <div class="mb-4">
            <div class="text-lg font-semibold text-gray-900">March 15, 2024</div>
            <div class="w-32 border-t-2 border-gray-400 mx-auto mt-2"></div>
            <div class="text-sm text-gray-600 mt-1">Date of Completion</div>
          </div>
        </div>
        
        <div class="text-center">
          <!-- Certificate Number -->
          <div class="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-3 inline-block">
            <div class="text-sm text-gray-600">Certificate No.</div>
            <div class="font-bold text-gray-900">VJS-2024-001</div>
          </div>
        </div>
        
        <div class="text-center">
          <div class="mb-4">
            <div class="text-lg font-semibold text-gray-900 italic">Dr. Sarah Johnson</div>
            <div class="w-32 border-t-2 border-gray-400 mx-auto mt-2"></div>
            <div class="text-sm text-gray-600 mt-1">Program Director</div>
          </div>
        </div>
      </div>

      <!-- Institution -->
      <div class="text-center mt-8 pt-6 border-t border-gray-300">
        <h4 class="text-xl font-semibold text-primary-600 mb-2">TechAcademy Institute</h4>
        <p class="text-sm text-gray-600">Accredited by the International Coding Education Board</p>
        <div class="flex justify-center space-x-4 mt-4 text-xs text-gray-500">
          <span>www.techacademy.edu</span>
          <span>•</span>
          <span>contact@techacademy.edu</span>
          <span>•</span>
          <span>+1 (555) 123-TECH</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Certificate component - static content for demo
</script>

<style scoped>
.certificate {
  font-family: 'Times New Roman', serif;
  min-height: 600px;
}

@media print {
  .certificate {
    box-shadow: none;
  }
}
</style> 