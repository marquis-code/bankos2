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
  
  const apiKeys = ref<ApiKey[]>([])
  
  // In a real app, you would fetch this data from your API
//   onMounted(async () => {
//     // Simulating API call
//     apiKeys.value = [
//       {
//         "key": "easypay.baseUrl",
//         "value": "https://apitest.nibss-plc.com.ng"
//       },
//       {
//         "key": "easypay.clientId",
//         "value": "fbc8f4aa-54bc-4c3e-b735-f103be4d3208"
//       },
//       {
//         "key": "easypay.clientSecret",
//         "value": "Xst8Q~~qpgOuB9nRkv1H9dyvWxc1IoyDfMQW6czs"
//       },
//       {
//         "key": "easypay.clientCode",
//         "value": "000413"
//       },
//       {
//         "key": "easypay.institutionCode",
//         "value": "999998"
//       },
//       {
//         "key": "easypay.billerid",
//         "value": "ADC19BDC-7D3A-4C00-4F7B-08DA06684F59"
//       },
//       {
//         "key": "easypay.authorizationcode",
//         "value": "MA-0112345678-2022315-53097"
//       },
//       {
//         "key": "easypay.glCredit",
//         "value": "12"
//       },
//       {
//         "key": "easypay.glDebit",
//         "value": "10"
//       },
//       {
//         "key": "easypay-staging.baseUrl",
//         "value": "https://apitest.nibss-plc.com.ng"
//       },
//       {
//         "key": "easypay-staging.clientId",
//         "value": "fbc8f4aa-54bc-4c3e-b735-f103be4d3208"
//       },
//       {
//         "key": "easypay-staging.clientSecret",
//         "value": "Xst8Q~~qpgOuB9nRkv1H9dyvWxc1IoyDfMQW6czs"
//       },
//       {
//         "key": "easypay-staging.clientCode",
//         "value": "000413"
//       },
//       {
//         "key": "easypay-staging.institutionCode",
//         "value": "999998"
//       },
//       {
//         "key": "easypay-staging.billerid",
//         "value": "ADC19BDC-7D3A-4C00-4F7B-08DA06684F59"
//       },
//       {
//         "key": "easypay-staging.authorizationcode",
//         "value": "MA-0112345678-2022315-53097"
//       },
//       {
//         "key": "easypay-staging.glCredit",
//         "value": "12"
//       },
//       {
//         "key": "easypay-staging.glDebit",
//         "value": "10"
//       }
//     ]
//     apiKeys.value = credentials.value
//   })
  
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
  