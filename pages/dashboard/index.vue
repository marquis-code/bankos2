<template>
  <div class="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-br from-[#F1F7FD] via-[#E9F2FA] to-[#D7F4D7]">
    <div v-if="step === 1" class="space-y-4 bg-white lg:w-5/12 p-10 lg:p-16 rounded-md">
      <!-- First UI: Account Creation Success -->
      <h2 class="text-3xl font-semibold max-w-sm text-[#323740]">Your Account Has Been Successfully Created</h2>
      <p class="text-sm text-gray-600">Here’s your account details</p>
      <p class="text-sm font-medium text-gray-600 text-center">Tier 1 Account</p>
      <div class="bg-[#E8FFEB] text-[#323740] py-3 px-6 rounded-md mb-4 w-full text-center">Transaction limit (₦0 - ₦50,000)</div>
      <div class="text-center w-full">
        <p class="text-3xl font-bold">0125771275</p>
        <p class="text-2xl font-bold">Wesley Bank</p>
      </div>
      <div class="pt-6 w-full">
        <button @click="goToPinSetup" class="bg-[#2F6D67] w-full text-white py-3.5 rounded-md hover:bg-[#2F6D67] transition">Set Transaction PIN</button>
      </div>
    </div>

    <div v-else-if="step === 2" class="space-y-4 bg-white lg:w-3/12 p-6 rounded-lg">
      <!-- Secure PIN Creation -->
      <h2 class="text-2xl font-bold">Secure your transactions</h2>
      <p class="text-sm mzx-w-xs font-light leading-loose">Create your 4 digit pin which would be used to authorize transactions on your account</p>
      <div class="flex space-x-2 justify-center">
        <input v-for="(digit, index) in pin" :key="index" class="border-b-2 w-16 shadow-none outline-none border-none h-16 text-center bg-[#F4F5F7]" type="password" maxlength="1" v-model="pin[index]" />
      </div>
      <div class="grid grid-cols-3 gap-4 mt-4">
        <!-- Number pad -->
        <button v-for="num in numberPad" :key="num" class="p-3 py-6 bg-[#FFF2F2] text-[#DD3636] font-bold rounded-md" @click="handlePinInput(num)">
          {{ num }}
        </button>
        <button class="mt-4 " @click="goToNextStep">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.2231 39.7942C29.0059 39.7942 28.7888 39.7142 28.6174 39.5428L21.6802 32.6056C21.3488 32.2742 21.3488 31.7256 21.6802 31.3942L28.6174 24.4571C28.9488 24.1256 29.4974 24.1256 29.8288 24.4571C30.1602 24.7885 30.1602 25.3371 29.8288 25.6685L23.4974 31.9999L29.8288 38.3314C30.1602 38.6628 30.1602 39.2114 29.8288 39.5428C29.6688 39.7142 29.4402 39.7942 29.2231 39.7942Z" fill="#666666"/>
            <path d="M41.7145 32.8569H22.4802C22.0116 32.8569 21.623 32.4683 21.623 31.9997C21.623 31.5311 22.0116 31.1426 22.4802 31.1426H41.7145C42.183 31.1426 42.5716 31.5311 42.5716 31.9997C42.5716 32.4683 42.183 32.8569 41.7145 32.8569Z" fill="#666666"/>
            </svg>
        </button>
      </div>
    </div>

    <div v-else-if="step === 3" class="space-y-4 bg-white lg:w-3/12 p-6 rounded-lg ">
      <!-- PIN Confirmation -->
      <h2 class="text-2xl font-medium text-[#323740]">Re-enter your 4 digit pin</h2>
      <div class="flex space-x-2 justify-center">
        <!-- <input v-for="(digit, index) in confirmPin" :key="index" class="border-b-2 w-10 text-center" type="password" maxlength="1" v-model="confirmPin[index]" /> -->
        <input  v-for="(digit, index) in confirmPin" :key="index" class="border-b-2 w-16 shadow-none outline-none border-none h-16 text-center bg-[#F4F5F7]" type="password" maxlength="1" v-model="confirmPin[index]" />
      </div>
      <div class="grid grid-cols-3 gap-4 pt-10">
        <!-- Number pad -->
        <!-- <button v-for="num in numberPad" :key="num" class="p-4 bg-red-200 rounded" @click="handleConfirmPinInput(num)">
          {{ num }}
        </button> -->
        <button v-for="num in numberPad" :key="num" class="p-3 py-6 bg-[#FFF2F2] text-[#DD3636] font-bold rounded-md" @click="handleConfirmPinInput(num)">
          {{ num }}
        </button>
        <button class="mt-4" @click="confirmAndProceed">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.2231 39.7942C29.0059 39.7942 28.7888 39.7142 28.6174 39.5428L21.6802 32.6056C21.3488 32.2742 21.3488 31.7256 21.6802 31.3942L28.6174 24.4571C28.9488 24.1256 29.4974 24.1256 29.8288 24.4571C30.1602 24.7885 30.1602 25.3371 29.8288 25.6685L23.4974 31.9999L29.8288 38.3314C30.1602 38.6628 30.1602 39.2114 29.8288 39.5428C29.6688 39.7142 29.4402 39.7942 29.2231 39.7942Z" fill="#666666"/>
            <path d="M41.7145 32.8569H22.4802C22.0116 32.8569 21.623 32.4683 21.623 31.9997C21.623 31.5311 22.0116 31.1426 22.4802 31.1426H41.7145C42.183 31.1426 42.5716 31.5311 42.5716 31.9997C42.5716 32.4683 42.183 32.8569 41.7145 32.8569Z" fill="#666666"/>
            </svg>
        </button>
      </div>
    </div>

    <div v-else-if="step === 4" class="space-y-4">
      <div class="flex justify-center items-center bg-white">
        <div class="bg-[#EDFFF0] rounded-lg p-8 py-32 text-center max-w-md">
          <div class="flex justify-center mb-4">
            <!-- Success Icon -->
            <div class="flex items-center justify-center">
             <img src="@/assets/icons/success-check.svg" alt="" />
            </div>
          </div>
          <h2 class="text-2xl font-bold text-gray-800">Successful</h2>
          <p class="text-gray-600 mt-2 leading-loose">
            Account creation successful.
            Kindly note that your existing LoaniQ data will be fully loaded under 24 hours.
          </p>
       <div class="w-full pt-4">
          <button @click="goToMFAScreen"
          class="mt-6 bg-[#2F6D67] hover:bg-[#2F6D67] w-full text-white font-semibold py-4 text-base px-4 rounded-lg"
        >
        Continue to account
        </button>
       </div>
        </div>
      </div>
    </div>

    <div v-else-if="step === 5" class="space-y-4 bg-white p-10 lg:w-4/12 text-center">
      <!-- MFA Screen -->
      <h2 class="text-2xl font-bold">Secure your account better with Multi-factor Authentication.</h2>
      <p class="text-sm leading-loose">
        Multi-factor Authentication (MFA) provides an extra layer of security for your account. From September 9, you will need MFA to make single transactions above   ₦5,000,000.00
      </p>
    <div class="mt-6">
      <button @click="goToDashboard"
      class="mt-6 bg-[#2F6D67] hover:bg-[#2F6D67] w-full text-white font-semibold py-4 text-base px-4 rounded-lg"
    >
    Continue to account
    </button>
    </div>
    </div>

    <div v-else-if="step === 6" class="w-full">
      <!-- Dashboard Overview -->
      <DashboardOverview />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DashboardOverview from '@/components/DashboardOverview.vue' // Ensure this path is correct

const pin = ref(["", "", "", ""])
const confirmPin = ref(["", "", "", ""])
const step = ref(1) // Step indicator
const numberPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] // Keypad numbers

// Go to PIN setup after account creation success screen
const goToPinSetup = () => {
  step.value = 2
}

// Handle pin input
const handlePinInput = (num: number) => {
  const emptyIndex = pin.value.findIndex((digit) => digit === "")
  if (emptyIndex !== -1) {
    pin.value[emptyIndex] = num.toString()
  }
}

// Move to next step after PIN is set
const goToNextStep = () => {
  if (pin.value.every((digit) => digit !== "")) {
    step.value = 3
  }
}

// Handle confirm pin input
const handleConfirmPinInput = (num: number) => {
  const emptyIndex = confirmPin.value.findIndex((digit) => digit === "")
  if (emptyIndex !== -1) {
    confirmPin.value[emptyIndex] = num.toString()
  }
}

// Confirm pin and move to success screen
const confirmAndProceed = () => {
  if (confirmPin.value.join('') === pin.value.join('')) {
    step.value = 4
  } else {
    alert("PINs do not match.")
  }
}

// Go to MFA screen
const goToMFAScreen = () => {
  step.value = 5
}

// Switch to the Dashboard after MFA
const goToDashboard = () => {
  step.value = 6
}

definePageMeta({
     layout: 'dashboard',
    //  middleware: 'auth'
  })
</script>

<style scoped>
input {
  font-size: 24px;
  text-align: center;
}
</style>
