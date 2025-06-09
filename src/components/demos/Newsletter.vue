<template>
  <div class="newsletter max-w-4xl mx-auto bg-white shadow-sm">
    <!-- Header -->
    <div class="bg-primary-600 text-white p-6">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold mb-2">TechWeekly</h1>
          <p class="text-primary-100">Your source for the latest in technology</p>
        </div>
        <div class="text-right text-sm">
          <p>Issue #42</p>
          <p>March 15, 2024</p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="p-6">
      <!-- Feature Article -->
      <article class="mb-8 pb-6 border-b border-gray-200">
        <div class="bg-gray-100 h-48 rounded-lg mb-4 flex items-center justify-center">
          <span class="text-gray-500 text-lg">📱 Feature Image</span>
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-3">
          The Future of Mobile Development: React Native vs Flutter in 2024
        </h2>
        <p class="text-gray-600 text-sm mb-3">By Sarah Chen • March 10, 2024</p>
        <p class="text-gray-700 leading-relaxed mb-4">
          As we move deeper into 2024, the mobile development landscape continues to evolve rapidly. 
          Cross-platform frameworks have become increasingly sophisticated, offering developers powerful 
          tools to build native-quality applications with shared codebases. In this comprehensive analysis, 
          we examine the current state of React Native and Flutter, two leading frameworks that are 
          shaping the future of mobile development.
        </p>
        <p class="text-gray-700 leading-relaxed">
          Recent updates to both platforms have introduced significant performance improvements and new 
          features that make them even more attractive for enterprise applications. Flutter's latest 
          release includes enhanced web support and improved compilation times, while React Native has 
          introduced the new architecture that promises better performance and developer experience.
        </p>
      </article>

      <!-- Two Column Layout -->
      <div class="grid grid-cols-2 gap-6 mb-8">
        <!-- Tech News -->
        <div>
          <h3 class="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary-500">Tech News</h3>
          <div class="space-y-4">
            <article v-for="news in techNews" :key="news.id" class="pb-3 border-b border-gray-100 last:border-b-0">
              <h4 class="font-semibold text-gray-900 mb-1">{{ news.title }}</h4>
              <p class="text-sm text-gray-600 mb-2">{{ news.excerpt }}</p>
              <div class="text-xs text-gray-500">{{ news.date }} • {{ news.readTime }} min read</div>
            </article>
          </div>
        </div>

        <!-- Developer Spotlight -->
        <div>
          <h3 class="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary-500">Developer Spotlight</h3>
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="flex items-start space-x-3 mb-3">
              <div class="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                JD
              </div>
              <div>
                <h4 class="font-semibold text-gray-900">John Davidson</h4>
                <p class="text-sm text-gray-600">Senior Frontend Engineer at Meta</p>
              </div>
            </div>
            <p class="text-sm text-gray-700 mb-3">
              "The key to successful frontend development is understanding that it's not just about 
              making things look good – it's about creating experiences that are intuitive, 
              accessible, and performant."
            </p>
            <div class="space-y-2 text-xs text-gray-600">
              <p><strong>Years of Experience:</strong> 8 years</p>
              <p><strong>Specialties:</strong> React, TypeScript, Performance Optimization</p>
              <p><strong>Current Project:</strong> React Server Components</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tools & Resources -->
      <section class="mb-8">
        <h3 class="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary-500">Tools & Resources</h3>
        <div class="grid grid-cols-3 gap-4">
          <div v-for="tool in tools" :key="tool.name" class="bg-gray-50 p-4 rounded-lg">
            <div class="text-2xl mb-2">{{ tool.icon }}</div>
            <h4 class="font-semibold text-gray-900 mb-1">{{ tool.name }}</h4>
            <p class="text-sm text-gray-600 mb-2">{{ tool.description }}</p>
            <div class="text-xs text-primary-600 font-medium">{{ tool.category }}</div>
          </div>
        </div>
      </section>

      <!-- Job Board -->
      <section class="mb-8">
        <h3 class="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary-500">Job Board</h3>
        <div class="space-y-3">
          <div v-for="job in jobs" :key="job.id" class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div>
              <h4 class="font-semibold text-gray-900">{{ job.title }}</h4>
              <p class="text-sm text-gray-600">{{ job.company }} • {{ job.location }}</p>
            </div>
            <div class="text-right">
              <div class="text-sm font-medium text-primary-600">{{ job.salary }}</div>
              <div class="text-xs text-gray-500">{{ job.type }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Code Snippet -->
      <section class="mb-6">
        <h3 class="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary-500">Code of the Week</h3>
        <div class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
          <div class="text-sm text-gray-400 mb-2">TypeScript • Custom Hook for API Calls</div>
          <pre class="text-sm"><code>import { useState, useEffect } from 'react'

interface ApiResponse&lt;T&gt; {
  data: T | null
  loading: boolean
  error: string | null
}

function useApi&lt;T&gt;(url: string): ApiResponse&lt;T&gt; {
  const [data, setData] = useState&lt;T | null&gt;(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState&lt;string | null&gt;(null)

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [url])

  return { data, loading, error }
}</code></pre>
        </div>
      </section>
    </div>

    <!-- Footer -->
    <div class="bg-gray-100 p-6 text-center text-sm text-gray-600">
      <p class="mb-2">
        <strong>TechWeekly</strong> • Published every Friday • 50,000+ subscribers
      </p>
      <p>
        Visit us at techweekly.com • Follow us on Twitter @techweekly
      </p>
      <div class="mt-4 text-xs text-gray-500">
        Copyright © 2024 TechWeekly. All rights reserved.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const techNews = [
  {
    id: 1,
    title: 'GitHub Copilot X Released',
    excerpt: 'Enhanced AI coding assistant with improved context understanding and multi-language support.',
    date: 'Mar 12',
    readTime: 3
  },
  {
    id: 2,
    title: 'Bun 1.0 Stable Release',
    excerpt: 'JavaScript runtime and package manager promises significant performance improvements.',
    date: 'Mar 10',
    readTime: 5
  },
  {
    id: 3,
    title: 'TypeScript 5.4 Beta',
    excerpt: 'New features include improved inference and better performance for large codebases.',
    date: 'Mar 8',
    readTime: 4
  }
]

const tools = [
  {
    name: 'Vite 5.0',
    description: 'Lightning fast build tool with improved HMR',
    category: 'Build Tool',
    icon: '⚡'
  },
  {
    name: 'Playwright',
    description: 'Cross-browser testing framework',
    category: 'Testing',
    icon: '🎭'
  },
  {
    name: 'Prisma',
    description: 'Type-safe database toolkit',
    category: 'Database',
    icon: '🔨'
  }
]

const jobs = [
  {
    id: 1,
    title: 'Senior React Developer',
    company: 'TechStart Inc',
    location: 'Remote',
    salary: '$120k-150k',
    type: 'Full-time'
  },
  {
    id: 2,
    title: 'Frontend Lead',
    company: 'Digital Agency',
    location: 'San Francisco',
    salary: '$140k-180k',
    type: 'Full-time'
  },
  {
    id: 3,
    title: 'Vue.js Developer',
    company: 'Startup Hub',
    location: 'Austin, TX',
    salary: '$90k-120k',
    type: 'Contract'
  }
]
</script>

<style scoped>
.newsletter {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
}

pre {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  white-space: pre;
  overflow-x: auto;
}

@media print {
  .newsletter {
    box-shadow: none;
  }
}
</style> 