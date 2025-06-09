<template>
  <div class="invoice max-w-4xl mx-auto bg-white p-8 shadow-sm">
    <!-- Header -->
    <div class="flex justify-between items-start mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">INVOICE</h1>
        <p class="text-gray-600">#INV-2024-001</p>
      </div>
      <div class="text-right">
        <h2 class="text-xl font-bold text-primary-600 mb-2">TechCorp Inc.</h2>
        <div class="text-sm text-gray-600 space-y-1">
          <p>123 Business Avenue</p>
          <p>San Francisco, CA 94105</p>
          <p>contact@techcorp.com</p>
          <p>+1 (555) 123-4567</p>
        </div>
      </div>
    </div>

    <!-- Bill To / Date Info -->
    <div class="grid grid-cols-2 gap-8 mb-8">
      <div>
        <h3 class="font-semibold text-gray-900 mb-3">Bill To:</h3>
        <div class="text-gray-700 space-y-1">
          <p class="font-medium">Acme Corporation</p>
          <p>456 Client Street</p>
          <p>New York, NY 10001</p>
          <p>billing@acme.com</p>
        </div>
      </div>
      <div class="text-right">
        <div class="space-y-2">
          <div class="flex justify-between">
            <span class="text-gray-600">Invoice Date:</span>
            <span class="font-medium">March 15, 2024</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Due Date:</span>
            <span class="font-medium">April 15, 2024</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Payment Terms:</span>
            <span class="font-medium">Net 30</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Invoice Items -->
    <div class="mb-8">
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b-2 border-gray-200">
            <th class="text-left py-3 px-2 font-semibold">Description</th>
            <th class="text-right py-3 px-2 font-semibold w-20">Qty</th>
            <th class="text-right py-3 px-2 font-semibold w-24">Rate</th>
            <th class="text-right py-3 px-2 font-semibold w-24">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in invoiceItems" :key="item.id" class="border-b border-gray-100">
            <td class="py-3 px-2">
              <div class="font-medium">{{ item.description }}</div>
              <div class="text-sm text-gray-600">{{ item.details }}</div>
            </td>
            <td class="text-right py-3 px-2">{{ item.quantity }}</td>
            <td class="text-right py-3 px-2">${{ item.rate.toFixed(2) }}</td>
            <td class="text-right py-3 px-2 font-medium">${{ (item.quantity * item.rate).toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Totals -->
    <div class="flex justify-end mb-8">
      <div class="w-80 space-y-2">
        <div class="flex justify-between py-2">
          <span class="text-gray-600">Subtotal:</span>
          <span class="font-medium">${{ subtotal.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between py-2">
          <span class="text-gray-600">Tax (8.5%):</span>
          <span class="font-medium">${{ tax.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between py-3 border-t-2 border-gray-200 text-lg">
          <span class="font-semibold">Total:</span>
          <span class="font-bold text-primary-600">${{ total.toFixed(2) }}</span>
        </div>
      </div>
    </div>

    <!-- Payment Info -->
    <div class="border-t pt-6">
      <h3 class="font-semibold text-gray-900 mb-3">Payment Information</h3>
      <div class="grid grid-cols-2 gap-8 text-sm">
        <div>
          <p class="text-gray-600 mb-2">Bank Transfer:</p>
          <p>Bank: Chase Bank</p>
          <p>Account: 1234567890</p>
          <p>Routing: 987654321</p>
        </div>
        <div>
          <p class="text-gray-600 mb-2">Terms & Conditions:</p>
          <p class="text-xs text-gray-500">
            Payment is due within 30 days of invoice date. 
            Late payments may incur a 1.5% monthly service charge.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface InvoiceItem {
  id: number
  description: string
  details: string
  quantity: number
  rate: number
}

const invoiceItems: InvoiceItem[] = [
  {
    id: 1,
    description: 'Web Development Services',
    details: 'Frontend development with React/Vue.js',
    quantity: 40,
    rate: 125.00
  },
  {
    id: 2,
    description: 'UI/UX Design',
    details: 'User interface and experience design',
    quantity: 20,
    rate: 95.00
  },
  {
    id: 3,
    description: 'Project Management',
    details: 'Coordination and project oversight',
    quantity: 10,
    rate: 85.00
  },
  {
    id: 4,
    description: 'Testing & QA',
    details: 'Quality assurance and testing services',
    quantity: 15,
    rate: 75.00
  }
]

const subtotal = computed(() => {
  return invoiceItems.reduce((sum, item) => sum + (item.quantity * item.rate), 0)
})

const taxRate = 0.085
const tax = computed(() => subtotal.value * taxRate)
const total = computed(() => subtotal.value + tax.value)
</script>

<style scoped>
.invoice {
  font-family: 'Arial', sans-serif;
  line-height: 1.4;
}

table {
  font-size: 14px;
}

@media print {
  .invoice {
    box-shadow: none;
  }
}
</style> 