<template>
  <div class="flex flex-col md:flex-row min-h-screen bg-white">
    
    <!-- Sidebar -->
    <div class="w-full md:w-64 border-r border-gray-200 p-6 space-y-8 shrink-0">
      <div>
        <h3 class="text-sm font-medium text-gray-500 mb-4">API Providers</h3>
        <ul class="space-y-3">
          <li>
            <button 
              @click="handleProviderChange('nip')"
              class="flex items-center transition-colors w-full text-left"
              :class="activeProvider === 'nip' ? 'text-primary-600 font-medium' : 'text-gray-700 hover:text-gray-900'"
            >
              <ServerIcon class="w-5 h-5 mr-3" :class="activeProvider === 'nip' ? 'text-primary-600' : 'text-gray-500'" />
              <span>NIP</span>
            </button>
          </li>
          <li>
            <button 
              @click="handleProviderChange('easyPay')"
              class="flex items-center transition-colors w-full text-left"
              :class="activeProvider === 'easyPay' ? 'text-primary-600 font-medium' : 'text-gray-700 hover:text-gray-900'"
            >
              <CreditCardIcon class="w-5 h-5 mr-3" :class="activeProvider === 'easyPay' ? 'text-primary-600' : 'text-gray-500'" />
              <span>Easy Pay</span>
            </button>
          </li>
        </ul>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 p-6 md:p-10 overflow-auto">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-2xl font-bold text-gray-900 mb-2">
            {{ activeProvider === 'nip' ? 'NIP' : 'Easy Pay' }} API Keys
          </h1>
          <p class="text-gray-600">
            Manage API keys for {{ activeProvider === 'nip' ? 'Nigerian Instant Payment' : 'Easy Pay Payment Gateway' }}
          </p>
        </div>

        <!-- Environment Tabs -->
        <div class="mb-8 animate-fade-in">
          <div class="flex border-b border-gray-200">
            <button 
              @click="handleEnvironmentChange('staging')" 
              class="px-6 py-3 font-medium text-sm transition-colors relative"
              :class="activeEnvironment === 'staging' ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700'"
            >
              Staging
              <div v-if="activeEnvironment === 'staging'" class="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 animate-fade-in"></div>
            </button>
            <button 
              @click="handleEnvironmentChange('live')" 
              class="px-6 py-3 font-medium text-sm transition-colors relative"
              :class="activeEnvironment === 'live' ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700'"
            >
              Live
              <div v-if="activeEnvironment === 'live'" class="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 animate-fade-in"></div>
            </button>
          </div>
        </div>

        <!-- API Keys Sections -->
        <div class="space-y-8">
          <!-- Base URL -->
          <div class="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden animate-fade-in">
            <div class="flex items-center justify-between bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div class="flex items-center">
                <h3 class="text-lg font-medium text-gray-900">Base URL</h3>
                <div class="relative ml-2 group">
                  <HelpCircleIcon class="w-5 h-5 text-gray-400 cursor-help" />
                  <div class="absolute left-0 bottom-full mb-2 w-64 bg-gray-900 text-white text-sm rounded-md p-3 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                    <div class="absolute left-0 bottom-[-6px] transform translate-x-1 rotate-45 w-3 h-3 bg-gray-900"></div>
                    The base URL for all API requests. Use this as the prefix for all endpoints.
                  </div>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <button @click="openEditKeyModal('baseUrl')" class="text-gray-500 hover:text-gray-700 transition-colors">
                  <PencilIcon class="w-5 h-5" />
                </button>
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md p-4">
                <div class="font-mono text-sm text-gray-800 overflow-hidden overflow-ellipsis">
                  {{ getKeyValue('baseUrl') }}
                </div>
                <div class="flex items-center space-x-2">
                  <button @click="copyKey('baseUrl')" class="text-gray-500 hover:text-gray-700 transition-colors">
                    <Copy class="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Client Credentials Section -->
          <div class="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden animate-fade-in">
            <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">Client Credentials</h3>
            </div>
            <div class="p-6 space-y-6">
              <!-- Client ID -->
              <div>
                <div class="flex items-center mb-2">
                  <h4 class="text-sm font-medium text-gray-700">Client ID</h4>
                  <div class="relative ml-2 group">
                    <HelpCircleIcon class="w-4 h-4 text-gray-400 cursor-help" />
                    <div class="absolute left-0 bottom-full mb-2 w-64 bg-gray-900 text-white text-sm rounded-md p-3 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                      <div class="absolute left-0 bottom-[-6px] transform translate-x-1 rotate-45 w-3 h-3 bg-gray-900"></div>
                      Unique identifier for your application. Required for authentication.
                    </div>
                  </div>
                </div>
                <div class="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md p-4">
                  <div class="font-mono text-sm text-gray-800 overflow-hidden overflow-ellipsis">
                    {{ showKey.clientId ? getKeyValue('clientId') : maskKey(getKeyValue('clientId')) }}
                  </div>
                  <div class="flex items-center space-x-2">
                    <button @click="toggleKeyVisibility('clientId')" class="text-gray-500 hover:text-gray-700 transition-colors">
                      <Eye v-if="!showKey.clientId" class="w-5 h-5" />
                      <EyeOff v-else class="w-5 h-5" />
                    </button>
                    <button @click="copyKey('clientId')" class="text-gray-500 hover:text-gray-700 transition-colors">
                      <Copy class="w-5 h-5" />
                    </button>
                    <button @click="openEditKeyModal('clientId')" class="text-gray-500 hover:text-gray-700 transition-colors">
                      <PencilIcon class="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <!-- Client Secret -->
              <div>
                <div class="flex items-center mb-2">
                  <h4 class="text-sm font-medium text-gray-700">Client Secret</h4>
                  <div class="relative ml-2 group">
                    <HelpCircleIcon class="w-4 h-4 text-gray-400 cursor-help" />
                    <div class="absolute left-0 bottom-full mb-2 w-64 bg-gray-900 text-white text-sm rounded-md p-3 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                      <div class="absolute left-0 bottom-[-6px] transform translate-x-1 rotate-45 w-3 h-3 bg-gray-900"></div>
                      Secret key used to authenticate your application. Keep this secure and never share it.
                    </div>
                  </div>
                </div>
                <div class="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md p-4">
                  <div class="font-mono text-sm text-gray-800 overflow-hidden overflow-ellipsis">
                    {{ showKey.clientSecret ? getKeyValue('clientSecret') : maskKey(getKeyValue('clientSecret')) }}
                  </div>
                  <div class="flex items-center space-x-2">
                    <button @click="toggleKeyVisibility('clientSecret')" class="text-gray-500 hover:text-gray-700 transition-colors">
                      <Eye v-if="!showKey.clientSecret" class="w-5 h-5" />
                      <EyeOff v-else class="w-5 h-5" />
                    </button>
                    <button @click="copyKey('clientSecret')" class="text-gray-500 hover:text-gray-700 transition-colors">
                      <Copy class="w-5 h-5" />
                    </button>
                    <button @click="openEditKeyModal('clientSecret')" class="text-gray-500 hover:text-gray-700 transition-colors">
                      <PencilIcon class="w-5 h-5" />
                    </button>
                    <button @click="openRegenerateKeyModal('clientSecret')" class="text-gray-500 hover:text-gray-700 transition-colors">
                      <RefreshCwIcon class="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <!-- Client Code -->
              <div>
                <div class="flex items-center mb-2">
                  <h4 class="text-sm font-medium text-gray-700">Client Code</h4>
                  <div class="relative ml-2 group">
                    <HelpCircleIcon class="w-4 h-4 text-gray-400 cursor-help" />
                    <div class="absolute left-0 bottom-full mb-2 w-64 bg-gray-900 text-white text-sm rounded-md p-3 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                      <div class="absolute left-0 bottom-[-6px] transform translate-x-1 rotate-45 w-3 h-3 bg-gray-900"></div>
                      Unique code assigned to your client account. Used for transaction identification.
                    </div>
                  </div>
                </div>
                <div class="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md p-4">
                  <div class="font-mono text-sm text-gray-800 overflow-hidden overflow-ellipsis">
                    {{ showKey.clientCode ? getKeyValue('clientCode') : maskKey(getKeyValue('clientCode')) }}
                  </div>
                  <div class="flex items-center space-x-2">
                    <button @click="toggleKeyVisibility('clientCode')" class="text-gray-500 hover:text-gray-700 transition-colors">
                      <Eye v-if="!showKey.clientCode" class="w-5 h-5" />
                      <EyeOff v-else class="w-5 h-5" />
                    </button>
                    <button @click="copyKey('clientCode')" class="text-gray-500 hover:text-gray-700 transition-colors">
                      <Copy class="w-5 h-5" />
                    </button>
                    <button @click="openEditKeyModal('clientCode')" class="text-gray-500 hover:text-gray-700 transition-colors">
                      <PencilIcon class="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Institution Details Section -->
          <div class="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden animate-fade-in">
            <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">Institution Details</h3>
            </div>
            <div class="p-6 space-y-6">
              <!-- Institution Code -->
              <div>
                <div class="flex items-center mb-2">
                  <h4 class="text-sm font-medium text-gray-700">Institution Code</h4>
                  <div class="relative ml-2 group">
                    <HelpCircleIcon class="w-4 h-4 text-gray-400 cursor-help" />
                    <div class="absolute left-0 bottom-full mb-2 w-64 bg-gray-900 text-white text-sm rounded-md p-3 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                      <div class="absolute left-0 bottom-[-6px] transform translate-x-1 rotate-45 w-3 h-3 bg-gray-900"></div>
                      Code that identifies your financial institution in the payment network.
                    </div>
                  </div>
                </div>
                <div class="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md p-4">
                  <div class="font-mono text-sm text-gray-800 overflow-hidden overflow-ellipsis">
                    {{ getKeyValue('institutionCode') }}
                  </div>
                  <div class="flex items-center space-x-2">
                    <button @click="copyKey('institutionCode')" class="text-gray-500 hover:text-gray-700 transition-colors">
                      <Copy class="w-5 h-5" />
                    </button>
                    <button @click="openEditKeyModal('institutionCode')" class="text-gray-500 hover:text-gray-700 transition-colors">
                      <PencilIcon class="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <!-- Biller ID -->
              <div>
                <div class="flex items-center mb-2">
                  <h4 class="text-sm font-medium text-gray-700">Biller ID</h4>
                  <div class="relative ml-2 group">
                    <HelpCircleIcon class="w-4 h-4 text-gray-400 cursor-help" />
                    <div class="absolute left-0 bottom-full mb-2 w-64 bg-gray-900 text-white text-sm rounded-md p-3 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                      <div class="absolute left-0 bottom-[-6px] transform translate-x-1 rotate-45 w-3 h-3 bg-gray-900"></div>
                      Unique identifier for your organization as a biller in the payment system.
                    </div>
                  </div>
                </div>
                <div class="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md p-4">
                  <div class="font-mono text-sm text-gray-800 overflow-hidden overflow-ellipsis">
                    {{ getKeyValue('billerid') }}
                  </div>
                  <div class="flex items-center space-x-2">
                    <button @click="copyKey('billerid')" class="text-gray-500 hover:text-gray-700 transition-colors">
                      <Copy class="w-5 h-5" />
                    </button>
                    <button @click="openEditKeyModal('billerid')" class="text-gray-500 hover:text-gray-700 transition-colors">
                      <PencilIcon class="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <!-- Authorization Code -->
              <div>
                <div class="flex items-center mb-2">
                  <h4 class="text-sm font-medium text-gray-700">Authorization Code</h4>
                  <div class="relative ml-2 group">
                    <HelpCircleIcon class="w-4 h-4 text-gray-400 cursor-help" />
                    <div class="absolute left-0 bottom-full mb-2 w-64 bg-gray-900 text-white text-sm rounded-md p-3 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                      <div class="absolute left-0 bottom-[-6px] transform translate-x-1 rotate-45 w-3 h-3 bg-gray-900"></div>
                      Code used to authorize transactions. Keep this secure and never share it.
                    </div>
                  </div>
                </div>
                <div class="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md p-4">
                  <div class="font-mono text-sm text-gray-800 overflow-hidden overflow-ellipsis">
                    {{ showKey.authorizationcode ? getKeyValue('authorizationcode') : maskKey(getKeyValue('authorizationcode')) }}
                  </div>
                  <div class="flex items-center space-x-2">
                    <button @click="toggleKeyVisibility('authorizationcode')" class="text-gray-500 hover:text-gray-700 transition-colors">
                      <Eye v-if="!showKey.authorizationcode" class="w-5 h-5" />
                      <EyeOff v-else class="w-5 h-5" />
                    </button>
                    <button @click="copyKey('authorizationcode')" class="text-gray-500 hover:text-gray-700 transition-colors">
                      <Copy class="w-5 h-5" />
                    </button>
                    <button @click="openEditKeyModal('authorizationcode')" class="text-gray-500 hover:text-gray-700 transition-colors">
                      <PencilIcon class="w-5 h-5" />
                    </button>
                    <button @click="openRegenerateKeyModal('authorizationcode')" class="text-gray-500 hover:text-gray-700 transition-colors">
                      <RefreshCwIcon class="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- GL Accounts Section -->
          <div class="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden animate-fade-in">
            <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">GL Accounts</h3>
            </div>
            <div class="p-6 space-y-6">
              <!-- GL Credit -->
              <div>
                <div class="flex items-center mb-2">
                  <h4 class="text-sm font-medium text-gray-700">GL Credit</h4>
                  <div class="relative ml-2 group">
                    <HelpCircleIcon class="w-4 h-4 text-gray-400 cursor-help" />
                    <div class="absolute left-0 bottom-full mb-2 w-64 bg-gray-900 text-white text-sm rounded-md p-3 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                      <div class="absolute left-0 bottom-[-6px] transform translate-x-1 rotate-45 w-3 h-3 bg-gray-900"></div>
                      General Ledger account for credit transactions. Used for accounting purposes.
                    </div>
                  </div>
                </div>
                <div class="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md p-4">
                  <div class="font-mono text-sm text-gray-800 overflow-hidden overflow-ellipsis">
                    {{ getKeyValue('glCredit') }}
                  </div>
                  <div class="flex items-center space-x-2">
                    <button @click="copyKey('glCredit')" class="text-gray-500 hover:text-gray-700 transition-colors">
                      <Copy class="w-5 h-5" />
                    </button>
                    <button @click="openEditKeyModal('glCredit')" class="text-gray-500 hover:text-gray-700 transition-colors">
                      <PencilIcon class="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <!-- GL Debit -->
              <div>
                <div class="flex items-center mb-2">
                  <h4 class="text-sm font-medium text-gray-700">GL Debit</h4>
                  <div class="relative ml-2 group">
                    <HelpCircleIcon class="w-4 h-4 text-gray-400 cursor-help" />
                    <div class="absolute left-0 bottom-full mb-2 w-64 bg-gray-900 text-white text-sm rounded-md p-3 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                      <div class="absolute left-0 bottom-[-6px] transform translate-x-1 rotate-45 w-3 h-3 bg-gray-900"></div>
                      General Ledger account for debit transactions. Used for accounting purposes.
                    </div>
                  </div>
                </div>
                <div class="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md p-4">
                  <div class="font-mono text-sm text-gray-800 overflow-hidden overflow-ellipsis">
                    {{ getKeyValue('glDebit') }}
                  </div>
                  <div class="flex items-center space-x-2">
                    <button @click="copyKey('glDebit')" class="text-gray-500 hover:text-gray-700 transition-colors">
                      <Copy class="w-5 h-5" />
                    </button>
                    <button @click="openEditKeyModal('glDebit')" class="text-gray-500 hover:text-gray-700 transition-colors">
                      <PencilIcon class="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Save Changes Button -->
          <div class="flex justify-end mb-8 animate-fade-in">
            <button 
              @click="openSaveChangesModal" 
              class="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors flex items-center shadow-sm"
              :class="{'opacity-50 cursor-not-allowed': !hasUnsavedChanges}"
              :disabled="!hasUnsavedChanges"
            >
              <SaveIcon class="w-5 h-5 mr-2" />
              <span>Save Changes</span>
            </button>
          </div>

          <!-- Warning Message -->
          <div class="flex items-start text-orange-600 mb-8 animate-fade-in p-4 bg-orange-50 border border-orange-200 rounded-md">
            <AlertTriangleIcon class="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
            <span>Never share your secret keys with anyone. Our support team will never ask for your secret keys.</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Sidebar -->
    <div class="w-full md:w-64 p-6 border-t md:border-t-0 md:border-l border-gray-200 shrink-0">
      <div class="space-y-4">
        <button class="flex items-center text-gray-700 hover:text-gray-900 w-full">
          <LinkIcon class="w-5 h-5 mr-2" />
          <span>Show API URLs</span>
        </button>
        <button class="flex items-center text-gray-700 hover:text-gray-900 w-full">
          <KeyIcon class="w-5 h-5 mr-2" />
          <span>Show JWT public key</span>
        </button>
        <button class="flex items-center text-gray-700 hover:text-gray-900 w-full">
          <SettingsIcon class="w-5 h-5 mr-2" />
          <span>Configure API Version</span>
        </button>

        <div class="pt-4 border-t border-gray-200">
          <div class="text-sm text-gray-600 mb-2">Configured API version 2022-10-23</div>
          <div class="text-sm text-gray-600">Latest API version 2023-12-09</div>
        </div>

        <!-- API Key Information -->
        <div class="pt-4 border-t border-gray-200">
          <h3 class="text-sm font-medium text-gray-700 mb-2">Current Selection</h3>
          <div class="text-sm text-gray-600 mb-1">
            <span class="font-medium">Provider:</span> {{ activeProvider === 'nip' ? 'NIP' : 'Easy Pay' }}
          </div>
          <div class="text-sm text-gray-600 mb-1">
            <span class="font-medium">Environment:</span> {{ activeEnvironment === 'staging' ? 'Staging' : 'Live' }}
          </div>
          <div class="text-sm text-gray-600">
            <span class="font-medium">Last Updated:</span> {{ getLastUpdated() }}
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Key Modal -->
    <Teleport to="body">
      <div v-if="editKeyModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
        <div class="bg-white rounded-lg max-w-md w-full p-6 shadow-xl animate-scale-in">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            Edit {{ editKeyName }}
          </h3>
          
          <div class="mb-4">
            <label for="keyValue" class="block text-sm font-medium text-gray-700 mb-1">
              {{ activeProvider === 'nip' ? 'NIP' : 'Easy Pay' }} {{ activeEnvironment === 'staging' ? 'Staging' : 'Live' }} {{ editKeyName }}
            </label>
            <input 
              type="text" 
              id="keyValue" 
              v-model="editKeyValue" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono text-sm"
              placeholder="Enter key value"
            />
          </div>
          
          <div class="flex justify-end space-x-3">
            <button 
              @click="closeEditKeyModal" 
              class="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
            <button 
              @click="updateKey" 
              class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              :disabled="!editKeyValue"
              :class="{'opacity-50 cursor-not-allowed': !editKeyValue}"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Regenerate Key Modal -->
    <Teleport to="body">
      <div v-if="regenerateKeyModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
        <div class="bg-white rounded-lg max-w-md w-full p-6 shadow-xl animate-scale-in">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Regenerate {{ regenerateKeyName }}</h3>
          <p class="text-gray-600 mb-4">
            Are you sure you want to regenerate the {{ activeProvider === 'nip' ? 'NIP' : 'Easy Pay' }} {{ activeEnvironment === 'staging' ? 'Staging' : 'Live' }} {{ regenerateKeyName }}? 
            This action cannot be undone and will invalidate the current key.
          </p>
          
          <div class="flex justify-end space-x-3">
            <button 
              @click="closeRegenerateKeyModal" 
              class="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
            <button 
              @click="regenerateKey" 
              class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Regenerate
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Save Changes Modal -->
    <Teleport to="body">
      <div v-if="saveChangesModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
        <div class="bg-white rounded-lg max-w-md w-full p-6 shadow-xl animate-scale-in">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Save Changes</h3>
          <p class="text-gray-600 mb-4">
            Are you sure you want to save changes to the {{ activeProvider === 'nip' ? 'NIP' : 'Easy Pay' }} {{ activeEnvironment === 'staging' ? 'Staging' : 'Live' }} API keys?
          </p>
          
          <div class="flex justify-end space-x-3">
            <button 
              @click="closeSaveChangesModal" 
              class="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
            <button 
              @click="saveChanges" 
              class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Success Toast -->
    <Teleport to="body">
      <div 
        v-if="showToast" 
        class="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg flex items-center animate-slide-in-right"
      >
        <CheckIcon class="w-5 h-5 mr-2" />
        <span>{{ toastMessage }}</span>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { useUpdateCredentials } from '@/composables/auth/useUpdateCredentials'
import { ref, computed, watch, onMounted } from 'vue'
import { 
  ServerIcon, 
  CreditCardIcon, 
  HelpCircleIcon,
  Eye, 
  EyeOff, 
  Copy,
  LinkIcon,
  KeyIcon,
  SettingsIcon,
  PencilIcon,
  RefreshCwIcon as RefreshCw,
  SaveIcon,
  AlertTriangleIcon,
  CheckIcon
} from 'lucide-vue-next'
const {  updateCredentials, loading } = useUpdateCredentials()

interface ApiKey {
  key: string
  value: string
}

interface GroupedApiKeys {
  [provider: string]: {
    [environment: string]: {
      [key: string]: string
    }
  }
}

const props = defineProps<{
  apiKeys: ApiKey[]
}>()

// API Provider and Environment
const activeProvider = ref('easyPay')
const activeEnvironment = ref('staging')

// Grouped API keys
const groupedKeys = ref<GroupedApiKeys>({})

// Visibility toggles for sensitive keys
const showKey = ref({
  clientId: false,
  clientSecret: false,
  clientCode: false,
  authorizationcode: false
})

// Modal states
const editKeyModal = ref(false)
const regenerateKeyModal = ref(false)
const saveChangesModal = ref(false)

// Edit key state
const editKeyName = ref('')
const editKeyValue = ref('')
const regenerateKeyName = ref('')

// Toast notification
const showToast = ref(false)
const toastMessage = ref('')

// Unsaved changes tracking
const hasUnsavedChanges = ref(false)

// Group the API keys on component mount
onMounted(() => {
  console.log('API Keys received:', props.apiKeys)
  if (props.apiKeys && props.apiKeys.length > 0) {
    groupedKeys.value = groupApiKeys(props.apiKeys)
    console.log('Grouped keys:', groupedKeys.value)
  } else {
    console.error('No API keys received or empty array')
  }
})

// Function to group API keys by provider and environment
const groupApiKeys = (keys: ApiKey[]): GroupedApiKeys => {
  const grouped: GroupedApiKeys = {}
  
  console.log('Grouping API keys:', keys)
  
  keys.forEach(item => {
    // Parse the key to extract provider, environment, and actual key name
    const keyParts = item.key.split('.')
    
    if (keyParts.length !== 2) {
      console.warn(`Skipping key with unexpected format: ${item.key}`)
      return
    }
    
    const fullProvider = keyParts[0]
    const keyName = keyParts[1]
    
    // Determine provider and environment
    let provider: string
    let environment: string
    
    if (fullProvider === "easypay") {
      provider = "easyPay"
      environment = "live"
    } else if (fullProvider === "easypay-staging") {
      provider = "easyPay"
      environment = "staging"
    } else if (fullProvider === "nip") {
      provider = "nip"
      environment = "live"
    } else if (fullProvider === "nip-staging") {
      provider = "nip"
      environment = "staging"
    } else {
      console.warn(`Skipping key with unknown provider: ${fullProvider}`)
      return // Skip if not matching expected format
    }
    
    // Initialize nested objects if they don't exist
    if (!grouped[provider]) {
      grouped[provider] = {}
    }
    
    if (!grouped[provider][environment]) {
      grouped[provider][environment] = {}
    }
    
    // Add the key-value pair
    grouped[provider][environment][keyName] = item.value
  })
  
  // Add lastUpdated field to each environment
  Object.keys(grouped).forEach(provider => {
    Object.keys(grouped[provider]).forEach(env => {
      grouped[provider][env].lastUpdated = new Date().toISOString().split('T')[0]
    })
  })
  
  return grouped
}

// Reset unsaved changes when switching provider or environment
watch([activeProvider, activeEnvironment], () => {
  if (hasUnsavedChanges.value) {
    if (confirm('You have unsaved changes. Do you want to discard them?')) {
      hasUnsavedChanges.value = false
    }
  }
})

// Helper functions
const getKeyValue = (keyName: string): string => {
  if (!groupedKeys.value[activeProvider.value]) {
    console.warn(`Provider not found: ${activeProvider.value}`)
    return ""
  }
  
  if (!groupedKeys.value[activeProvider.value][activeEnvironment.value]) {
    console.warn(`Environment not found: ${activeEnvironment.value} for provider ${activeProvider.value}`)
    return ""
  }
  
  if (!groupedKeys.value[activeProvider.value][activeEnvironment.value][keyName]) {
    console.warn(`Key not found: ${keyName} for provider ${activeProvider.value} and environment ${activeEnvironment.value}`)
    return ""
  }
  
  return groupedKeys.value[activeProvider.value][activeEnvironment.value][keyName]
}

const getLastUpdated = (): string => {
  if (!groupedKeys.value[activeProvider.value] || 
      !groupedKeys.value[activeProvider.value][activeEnvironment.value] || 
      !groupedKeys.value[activeProvider.value][activeEnvironment.value].lastUpdated) {
    return "N/A"
  }
  
  return groupedKeys.value[activeProvider.value][activeEnvironment.value].lastUpdated
}

const maskKey = (key: string): string => {
  if (!key) return ''
  const prefix = key.substring(0, 8)
  const suffix = key.substring(key.length - 4)
  return `${prefix}${'•'.repeat(10)}${suffix}`
}

// Toggle key visibility
const toggleKeyVisibility = (keyName: string): void => {
  showKey.value[keyName as keyof typeof showKey.value] = !showKey.value[keyName as keyof typeof showKey.value]
}

// Copy functions
const copyToClipboard = async (text: string, successMessage: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text)
    showSuccessToast(successMessage)
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}

const copyKey = async (keyName: string): Promise<void> => {
  const keyValue = getKeyValue(keyName)
  await copyToClipboard(keyValue, `${keyName} copied to clipboard`)
}

// Edit key functions
const openEditKeyModal = (keyName: string): void => {
  editKeyName.value = keyName
  editKeyValue.value = getKeyValue(keyName)
  editKeyModal.value = true
}

const closeEditKeyModal = (): void => {
  editKeyModal.value = false
  editKeyValue.value = ''
}

const updateKey = (): void => {
  if (!groupedKeys.value[activeProvider.value]) {
    groupedKeys.value[activeProvider.value] = {}
  }
  
  if (!groupedKeys.value[activeProvider.value][activeEnvironment.value]) {
    groupedKeys.value[activeProvider.value][activeEnvironment.value] = {}
  }
  
  groupedKeys.value[activeProvider.value][activeEnvironment.value][editKeyName.value] = editKeyValue.value
  hasUnsavedChanges.value = true
  closeEditKeyModal()
  showSuccessToast(`${editKeyName.value} updated. Don't forget to save your changes.`)
}

// Regenerate key functions
const openRegenerateKeyModal = (keyName: string): void => {
  regenerateKeyName.value = keyName
  regenerateKeyModal.value = true
}

const closeRegenerateKeyModal = (): void => {
  regenerateKeyModal.value = false
}

const regenerateKey = (): void => {
  // In a real app, this would call an API to regenerate the key
  const prefix = activeProvider.value === 'nip' ? 'nip' : 'ep'
  const env = activeEnvironment.value === 'staging' ? 'staging' : 'live'
  const randomSuffix = Math.random().toString(36).substring(2, 15)
  
  let newKey = ''
  if (regenerateKeyName.value === 'clientSecret') {
    newKey = `${prefix}_${env}_secret_${randomSuffix}`
  } else if (regenerateKeyName.value === 'authorizationcode') {
    newKey = `${prefix}_${env}_auth_${randomSuffix}`
  }
  
  groupedKeys.value[activeProvider.value][activeEnvironment.value][regenerateKeyName.value] = newKey
  hasUnsavedChanges.value = true
  closeRegenerateKeyModal()
  showSuccessToast(`${regenerateKeyName.value} regenerated. Don't forget to save your changes.`)
}

// Save changes functions
const openSaveChangesModal = (): void => {
  if (hasUnsavedChanges.value) {
    saveChangesModal.value = true
  } else {
    showSuccessToast('No changes to save.')
  }
}

const closeSaveChangesModal = (): void => {
  saveChangesModal.value = false
}

const saveChanges = async (): Promise<void> => {
  try {
    // Create an array of updated keys in the format expected by the backend
    const updatedKeys: ApiKey[] = []
    
    Object.entries(groupedKeys.value[activeProvider.value][activeEnvironment.value]).forEach(([key, value]) => {
      if (key !== 'lastUpdated') {
        const prefix = activeProvider.value === 'easyPay' 
          ? (activeEnvironment.value === 'staging' ? 'easypay-staging' : 'easypay')
          : (activeEnvironment.value === 'staging' ? 'nip-staging' : 'nip')
        
        updatedKeys.push({
          key: `${prefix}.${key}`,
          value: value
        })
      }
    })
    
    // Here you would make the API call to update the keys
    console.log('Saving updated keys:', updatedKeys)

    await updateCredentials(updatedKeys)
    
    // In a real app, you would call an API endpoint
    // const response = await fetch('/api/update-keys', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(updatedKeys),
    // })
    
    // if (!response.ok) {
    //   throw new Error('Failed to save changes')
    // }
    
    // Update the lastUpdated field
    groupedKeys.value[activeProvider.value][activeEnvironment.value].lastUpdated = new Date().toISOString().split('T')[0]
    
    hasUnsavedChanges.value = false
    closeSaveChangesModal()
    showSuccessToast('Changes saved successfully')
  } catch (error) {
    console.error('Error saving changes:', error)
    showSuccessToast('Failed to save changes', false)
  }
}

// Handle provider change
const handleProviderChange = (provider: string): void => {
  if (hasUnsavedChanges.value) {
    if (confirm('You have unsaved changes. Do you want to discard them?')) {
      activeProvider.value = provider
      hasUnsavedChanges.value = false
    }
  } else {
    activeProvider.value = provider
  }
}

// Handle environment change
const handleEnvironmentChange = (environment: string): void => {
  if (hasUnsavedChanges.value) {
    if (confirm('You have unsaved changes. Do you want to discard them?')) {
      activeEnvironment.value = environment
      hasUnsavedChanges.value = false
    }
  } else {
    activeEnvironment.value = environment
  }
}

// Toast notification
const showSuccessToast = (message: string, success: boolean = true): void => {
  toastMessage.value = message
  showToast.value = true
  
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}
</script>

<style scoped>
/* Animations */
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

.animate-scale-in {
  animation: scaleIn 0.3s ease-in-out;
}

.animate-slide-in-right {
  animation: slideInRight 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>