<template>
  <div class="report max-w-4xl mx-auto bg-white p-8 shadow-sm">
    <!-- Header -->
    <div class="text-center mb-8 pb-4 border-b-2 border-gray-200">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Q1 2024 Sales Report</h1>
      <p class="text-gray-600">January - March 2024</p>
      <div class="text-sm text-gray-500 mt-2">Generated on {{ new Date().toLocaleDateString() }}</div>
    </div>

    <!-- Key Metrics -->
    <section class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Key Performance Indicators</h2>
      <div class="grid grid-cols-4 gap-4">
        <div v-for="metric in kpis" :key="metric.label" class="bg-gray-50 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold" :class="metric.color">{{ metric.value }}</div>
          <div class="text-sm text-gray-600">{{ metric.label }}</div>
          <div class="text-xs" :class="metric.changeColor">{{ metric.change }}</div>
        </div>
      </div>
    </section>

    <!-- Sales Data Table -->
    <section class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Sales by Region</h2>
      <table class="w-full border-collapse border border-gray-300">
        <thead class="bg-gray-100">
          <tr>
            <th class="border border-gray-300 px-4 py-2 text-left">Region</th>
            <th class="border border-gray-300 px-4 py-2 text-right">Q1 2024</th>
            <th class="border border-gray-300 px-4 py-2 text-right">Q1 2023</th>
            <th class="border border-gray-300 px-4 py-2 text-right">Growth</th>
            <th class="border border-gray-300 px-4 py-2 text-center">Performance</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="region in salesData" :key="region.name" class="hover:bg-gray-50">
            <td class="border border-gray-300 px-4 py-2 font-medium">{{ region.name }}</td>
            <td class="border border-gray-300 px-4 py-2 text-right">${{ region.current.toLocaleString() }}</td>
            <td class="border border-gray-300 px-4 py-2 text-right">${{ region.previous.toLocaleString() }}</td>
            <td class="border border-gray-300 px-4 py-2 text-right" :class="region.growth >= 0 ? 'text-green-600' : 'text-red-600'">
              {{ region.growth >= 0 ? '+' : '' }}{{ region.growth.toFixed(1) }}%
            </td>
            <td class="border border-gray-300 px-4 py-2 text-center">
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-primary-600 h-2 rounded-full" :style="{ width: `${Math.min(region.performance, 100)}%` }"></div>
              </div>
              <div class="text-xs text-gray-600 mt-1">{{ region.performance }}%</div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- Charts Section -->
    <section class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Monthly Trends</h2>
      <div class="grid grid-cols-2 gap-6">
        <!-- Simple Bar Chart -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="font-semibold mb-4">Revenue by Month</h3>
          <div class="flex items-end justify-between h-32 gap-2">
            <div v-for="month in monthlyData" :key="month.name" class="flex-1 flex flex-col items-center">
              <div class="bg-primary-600 rounded-t w-full" :style="{ height: `${(month.value / 500000) * 100}%` }"></div>
              <div class="text-xs text-gray-600 mt-2">{{ month.name }}</div>
            </div>
          </div>
        </div>

        <!-- Product Categories -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="font-semibold mb-4">Top Product Categories</h3>
          <div class="space-y-3">
            <div v-for="category in productCategories" :key="category.name" class="flex justify-between items-center">
              <span class="text-sm">{{ category.name }}</span>
              <div class="flex items-center space-x-2">
                <div class="w-20 bg-gray-200 rounded-full h-2">
                  <div class="bg-primary-600 h-2 rounded-full" :style="{ width: `${category.percentage}%` }"></div>
                </div>
                <span class="text-xs text-gray-600 w-8">{{ category.percentage }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Summary -->
    <section class="bg-primary-50 p-6 rounded-lg">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Executive Summary</h2>
      <div class="space-y-3 text-gray-700">
        <p>• Q1 2024 showed strong performance with 15.2% growth compared to the same period last year</p>
        <p>• North America continues to be our strongest market, contributing 45% of total revenue</p>
        <p>• Software products saw exceptional growth at 28%, driven by new enterprise clients</p>
        <p>• Recommended focus areas for Q2: expanding European operations and launching new mobile features</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const kpis = [
  {
    label: 'Total Revenue',
    value: '$1.2M',
    change: '+15.2%',
    color: 'text-primary-600',
    changeColor: 'text-green-600'
  },
  {
    label: 'New Customers',
    value: '234',
    change: '+8.5%',
    color: 'text-green-600',
    changeColor: 'text-green-600'
  },
  {
    label: 'Conversion Rate',
    value: '3.4%',
    change: '+0.8%',
    color: 'text-blue-600',
    changeColor: 'text-green-600'
  },
  {
    label: 'Avg Order Value',
    value: '$340',
    change: '-2.1%',
    color: 'text-purple-600',
    changeColor: 'text-red-600'
  }
]

const salesData = [
  { name: 'North America', current: 540000, previous: 480000, growth: 12.5, performance: 95 },
  { name: 'Europe', current: 320000, previous: 290000, growth: 10.3, performance: 78 },
  { name: 'Asia Pacific', current: 280000, previous: 220000, growth: 27.3, performance: 85 },
  { name: 'Latin America', current: 60000, previous: 55000, growth: 9.1, performance: 62 }
]

const monthlyData = [
  { name: 'Jan', value: 380000 },
  { name: 'Feb', value: 420000 },
  { name: 'Mar', value: 400000 }
]

const productCategories = [
  { name: 'Software', percentage: 45 },
  { name: 'Hardware', percentage: 30 },
  { name: 'Services', percentage: 15 },
  { name: 'Support', percentage: 10 }
]
</script>

<style scoped>
.report {
  font-family: 'Arial', sans-serif;
  line-height: 1.5;
}

table {
  font-size: 14px;
}

@media print {
  .report {
    box-shadow: none;
  }
}
</style> 