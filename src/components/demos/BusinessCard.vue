<template>
  <div class="business-card max-w-md mx-auto bg-gradient-to-br from-blue-600 to-blue-800 text-white p-6 rounded-lg shadow-lg">
    <div class="flex justify-between items-start mb-4">
      <div class="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
        </svg>
      </div>
      <div class="text-right">
        <p class="text-xs opacity-75">COMPANY</p>
        <p class="font-bold text-sm">TechCorp Inc.</p>
      </div>
    </div>
    
    <div class="space-y-2">
      <h2 class="text-xl font-bold">John Doe</h2>
      <p class="text-sm opacity-90">Senior Frontend Developer</p>
    </div>
    
    <div class="mt-6 space-y-1 text-xs">
      <div class="flex items-center space-x-2">
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
        <span>john.doe@techcorp.com</span>
      </div>
      <div class="flex items-center space-x-2">
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
        <span>+1 (555) 123-4567</span>
      </div>
      <div class="flex items-center space-x-2">
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
        </svg>
        <span>123 Tech Street, San Francisco, CA</span>
      </div>
      <div class="flex items-center space-x-2">
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.559-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.559.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clip-rule="evenodd" />
        </svg>
        <span>www.johndoe.dev</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Business card component - no props needed for this demo
</script>

<style scoped>
.business-card {
  width: 3.5in;
  height: 2in;
  font-family: 'Arial', sans-serif;
}
</style> 