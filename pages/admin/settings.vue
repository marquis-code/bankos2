<template>
  <section>
      <div v-if="!loading">
          <!-- {{ credentials }} -->
        <ApiKeysManagement :apiKeys="credentials" />
     </div>
     <div v-else>Processing...</div>
  </section>
</template>

<script setup lang="ts">
  import { useGetCredentials } from '@/composables/auth/useGetCredentials';
  const { credentials, loading } = useGetCredentials()
import { ref, onMounted } from 'vue'
//   import ApiKeysManagement from '~/components/api-keys-management.vue'

interface ApiKey {
  key: string
  value: string
}
// Define page meta
definePageMeta({
  title: 'API Keys Management',
  layout: 'default'
})

// Use head to set page title and meta
useHead({
  title: 'API Keys Management | Fintech Dashboard',
  meta: [
    { name: 'description', content: 'Manage your NIP and Easy Pay API keys for both staging and live environments.' },
    { name: 'keywords', content: 'API keys, NIP, Easy Pay, fintech, payment gateway, API management' }
  ]
})
</script>
