<template>
  <main>
    <div class="flex flex-col items-center justify-center w-full h-screen">
      <div class="lg:w-[500px] p-4 flex flex-col justify-start items-start">
        <div class="flex justify-start items-start pt-10 lg:pt-0">
          <img
            src="@/assets/img/logo.png"
            alt="LoaniQ Logo"
            class="mx-auto mb-4 w-32 lg:w-44"
          />
        </div>
       <div v-if="activeStep === 'personal-info'">
        <h2 class="lg:text-3xl text-xl flex items-center gap-x-2 font-medium text-[#323740] text-center mb-2">
          <img src="@/assets/icons/auth-home.svg" />
             
           Let’s get started
         </h2>
         <p class="text-[#687181] text-sm">To create your business account, kindly fill in the following information </p>
       </div>
       <div v-if="activeStep === 'business-info'">
        <h2 class="text-3xl flex items-center gap-x-2 font-medium text-[#323740] text-center mb-2">
          Enter Your Business Email Address and Phone Number
         </h2>
       </div>
        <form v-if="activeStep === 'personal-info'" class="w-full space-y-6" @submit.prevent="register">
          <div class="mb-4">
            <label
              class="block text-[#7D8799] font-medium mb-1 text-sm"
              for="email"
              >Your Business Name</label
            >
            <input
              type="email"
              id="email"
              v-model="credential.email.value"
              class="w-full px-4 py-4 bg-[#F4F5F7] outline-none border-[0.5px] border-[#F4F5F7] rounded-md focus:outline-none focus:border-green-500"
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-[#7D8799] font-medium mb-1 text-sm"
              for="email"
              >What industry do you work in?</label
            >
            <select id="email"
            v-model="credential.email.value"
            class="w-full px-4 py-4 bg-[#F4F5F7] outline-none border-[0.5px] border-[#F4F5F7] rounded-md focus:outline-none focus:border-green-500"
          >
          <option>Oil and Gas</option>
          </select>
          </div>

          <div class="mb-4">
            <label
              class="block text-[#7D8799] font-medium mb-1 text-sm"
              for="email"
              >Select your business type</label
            >
<fieldset>
  <legend class="sr-only">Notifications</legend>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
    <div v-for="(item, idx) in ['Limited Liability Company', 'Sole Proprietorship', 'Partnership', 'Religious Organization', 'Clubs/Societies/Associations']" :key="idx" class="relative flex items-start">
      <div class="flex h-6 items-center">
        <input id="comments" aria-describedby="comments-description" name="comments" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
      </div>
      <div class="ml-3 text-sm leading-6">
        <label for="comments" class="font-medium text-gray-900">{{item}}</label>
      </div>
    </div>
  </div>
</fieldset>

          </div>
          <div class="pt-6">
            <button
  type="submit"
  class="w-full disabled:cursor-not-allowed disabled:opacity-25 bg-[#2F6D67] text-white py-3.5 rounded-md hover:bg-[#2F6D67] transition"
>
  {{ loading ? "Processing..." : "Next: Business Info" }}
</button>

          </div>
        </form>
        <form v-if="activeStep === 'business-info'" class="w-full space-y-6" @submit.prevent="register">
          <div class="pt-4">
            <button
              type="button"
              class="w-full bg-gray-500 text-white py-3.5 rounded-md"
              @click="goBackToPersonalInfo"
            >
              Go Back to Personal Info
            </button>
          </div>
          <div class="mb-4">
            <label
              class="block text-[#7D8799] font-medium mb-1 text-sm"
              for="email"
              >Your Business Name</label
            >
            <input
              type="email"
              id="email"
              v-model="credential.email.value"
              class="w-full px-4 py-4 bg-[#F4F5F7] outline-none border-[0.5px] border-[#F4F5F7] rounded-md focus:outline-none focus:border-green-500"
            />
          </div>
          <div class="mb-4">
            <label class="block text-[#7D8799] font-medium mb-1 text-sm" for="phone">Enter Your Phone Number</label>
            <input type="text" id="phone" v-model="credential.phoneNumber.value" class="w-full px-4 py-4  bg-[#F4F5F7] outline-none border-[0.5px] border-[#F4F5F7] rounded-md focus:outline-none focus:border-green-500" />
          </div>
          <div class="pt-6">
            <button
  :disabled="isFormDisabled"
  type="submit"
  class="w-full disabled:cursor-not-allowed disabled:opacity-25 bg-[#2F6D67] text-white py-3.5 rounded-md hover:bg-[#2F6D67] transition"
>
  {{ loading ? "Processing..." : "Create New Account" }}
</button>

          </div>
        </form>
        <div class="text-center mt-4 flex items-center gap-y-4 flex-col w-full">
          <p
            @click="openModal"
            class="text-[#2E3A59] cursor-pointer text-center"
          >
            By signing up, you accept our
            <span class="text-[#2C64E3]">Terms & Conditions</span>
          </p>
          <p class="text-[#687181] flex items-center gap-x-3">
            Already have an account?
            <NuxtLink to="/login" class="text-[#2F6D67] hover:underline"
              >Log in</NuxtLink
            >
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 4.86165L13.3333 10.695L7.5 16.5283"
                stroke="#2F6D67"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </p>
        </div>
      </div>
    </div>
    <CoreBaseModal v-model:modelValue="isModalOpen" title="Terms & Conditions">
      <p class="leading-loose text-justify">
        Feugiat mattis pellentesque elit nulla. Laoreet massa ultrices tempor
        magna quis ultrices commodo a, sed. Eu pharetra amet enim aliquam libero
        posuere in vitae. Id at nulla ut quis pellentesque pulvinar turpis urna.
        Ut amet risus enim massa, cursus enim dictum. Aliquam quam eleifend nunc
        diam. Viverra viverra tristique felis tempus aliquet ornare erat
        scelerisque. Vitae aenean elementum malesuada mattis convallis volutpat.
        Pharetra vel nibh nulla mauris aliquet ultrices proin tempor amet. Neque
        placerat nisl ac neque. Eget ridiculus sagittis duis pellentesque
        scelerisque in platea mus in.
      </p>
      <template #footer>
        <button
          @click="isModalOpen = false"
          class="px-4 py-3 bg-gray-500 w-full text-white rounded-lg"
        >
          Close
        </button>
      </template>
    </CoreBaseModal>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { use_auth_register } from "@/composables/auth/register";

const { credential, register, loading, isFormDisabled } = use_auth_register();

// Modal open/close state
const isModalOpen = ref(false);

// Function to open the modal
const openModal = () => {
  isModalOpen.value = true;
};

// Step state
const activeStep = ref('personal-info');

// Get router and route objects
const router = useRouter();
const route = useRoute();

// On mount, check if query parameter exists, if not set default and forcefully push into URL
onMounted(() => {
  const step = route.query.step || 'personal-info';
  activeStep.value = step as string;

  // Forcefully push the query parameter into the URL if it doesn't exist
  if (!route.query.step) {
    router.replace({ query: { step: 'personal-info' } });
  }
});

// Function to navigate to business info step
const goToBusinessInfo = () => {
  activeStep.value = 'business-info';
  router.push({ query: { step: 'business-info' } });
};

// Function to go back to personal info step
const goBackToPersonalInfo = () => {
  activeStep.value = 'personal-info';
  router.push({ query: { step: 'personal-info' } });
};
</script>

