<template>
    <div class="flex flex-col md:flex-row min-h-screen bg-white">
      <div class="w-full md:w-64 border-r border-gray-200 p-6 space-y-8 shrink-0">
        <div>
          <h3 class="text-sm font-medium text-gray-500 mb-4">API Providers</h3>
          <ul class="space-y-3">
            <li>
              <a 
                href="#" 
                @click.prevent="activeProvider = 'nip'"
                class="flex items-center transition-colors"
                :class="activeProvider === 'nip' ? 'text-primary-600 font-medium' : 'text-gray-700 hover:text-gray-900'"
              >
                <ServerIcon class="w-5 h-5 mr-3" :class="activeProvider === 'nip' ? 'text-primary-600' : 'text-gray-500'" />
                <span>NIP</span>
              </a>
            </li>
            <li>
              <a 
                href="#" 
                @click.prevent="activeProvider = 'easyPay'"
                class="flex items-center transition-colors"
                :class="activeProvider === 'easyPay' ? 'text-primary-600 font-medium' : 'text-gray-700 hover:text-gray-900'"
              >
                <CreditCardIcon class="w-5 h-5 mr-3" :class="activeProvider === 'easyPay' ? 'text-primary-600' : 'text-gray-500'" />
                <span>Easy Pay</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
  

      <div class="flex-1 p-6 md:p-10 overflow-auto">
        <div class="max-w-4xl mx-auto">

          <div class="mb-8">
            <h1 class="text-2xl font-bold text-gray-900 mb-2">{{ activeProvider === 'nip' ? 'NIP' : 'Easy Pay' }} API Keys</h1>
            <p class="text-gray-600">Manage API keys for {{ activeProvider === 'nip' ? 'Nigerian Instant Payment' : 'Easy Pay Payment Gateway' }}</p>
          </div>
  

          <div class="mb-8 animate-fade-in">
            <div class="flex border-b border-gray-200">
              <button 
                @click="activeEnvironment = 'staging'" 
                class="px-6 py-3 font-medium text-sm transition-colors relative"
                :class="activeEnvironment === 'staging' ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700'"
              >
                Staging
                <div v-if="activeEnvironment === 'staging'" class="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 animate-fade-in"></div>
              </button>
              <button 
                @click="activeEnvironment = 'live'" 
                class="px-6 py-3 font-medium text-sm transition-colors relative"
                :class="activeEnvironment === 'live' ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700'"
              >
                Live
                <div v-if="activeEnvironment === 'live'" class="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 animate-fade-in"></div>
              </button>
            </div>
          </div>
  
    
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
  

            <div class="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden animate-fade-in">
              <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 class="text-lg font-medium text-gray-900">Client Credentials</h3>
              </div>
              <div class="p-6 space-y-6">

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
  

            <div class="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden animate-fade-in">
              <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 class="text-lg font-medium text-gray-900">Institution Details</h3>
              </div>
              <div class="p-6 space-y-6">

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
  

            <div class="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden animate-fade-in">
              <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 class="text-lg font-medium text-gray-900">GL Accounts</h3>
              </div>
              <div class="p-6 space-y-6">

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
  

            <div class="flex items-start text-orange-600 mb-8 animate-fade-in p-4 bg-orange-50 border border-orange-200 rounded-md">
              <AlertTriangleIcon class="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>Never share your secret keys with anyone. Our support team will never ask for your secret keys.</span>
            </div>
          </div>
        </div>
      </div>
  

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
  

      <Teleport to="body">
        <div v-if="showConfirmModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div class="bg-white rounded-lg max-w-md w-full p-6 shadow-xl animate-scale-in">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Confirm Action</h3>
            <p class="text-gray-600 mb-4">Please enter your password to confirm this action.</p>
            
            <div class="mb-4">
              <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                id="password" 
                v-model="confirmPassword" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter your password"
              />
            </div>
            
            <div class="flex justify-end space-x-3">
              <button 
                @click="closeConfirmModal" 
                class="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                Cancel
              </button>
              <button 
                @click="confirmAction" 
                class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                :disabled="!confirmPassword"
                :class="{'opacity-50 cursor-not-allowed': !confirmPassword}"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </Teleport>
  

      <Teleport to="body">
        <div v-if="showEditKeyModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
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
  

      <Teleport to="body">
        <div v-if="showRegenerateKeyModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
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
  

      <Teleport to="body">
        <div v-if="showSaveChangesModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
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
  import { useGetCredentials } from '@/composables/auth/useGetCredentials';
  const { credentials, loading } = useGetCredentials()
  import { ref, computed, watch } from 'vue';
  import { 
    FingerprintIcon, 
    MessageSquareIcon, 
    MailIcon, 
    SettingsIcon, 
    UsersIcon, 
    LockIcon, 
    ShieldAlertIcon,
    KeyIcon, 
    File, 
    WebhookIcon, 
    RouteIcon,
    GlobeIcon, 
    PuzzleIcon,
    Eye, 
    EyeOff, 
    Copy,
    InfoIcon, 
    LinkIcon,
    PlusIcon, 
    TrashIcon, 
    CheckIcon,
    PencilIcon,
    RefreshCwIcon,
    SaveIcon,
    AlertTriangleIcon,
    ServerIcon,
    CreditCardIcon,
    HelpCircleIcon
  } from 'lucide-vue-next';
  
  // API Provider and Environment
  const activeProvider = ref('nip');
  const activeEnvironment = ref('staging');
  
  // API Keys
  const apiKeys = ref({
    easyPay: {
      staging: {
        baseUrl: 'https://api-staging.easypay.com/v1',
        clientId: 'ep_staging_client_12345',
        clientSecret: 'ep_staging_secret_67890abcdef',
        clientCode: 'EP_STAGING_001',
        institutionCode: 'EPAY001',
        billerid: 'EPAY_BILL_001',
        authorizationcode: 'ep_staging_auth_12345abcde',
        glCredit: '1001-2002-3003-4004',
        glDebit: '5005-6006-7007-8008',
        lastUpdated: '2023-11-15'
      },
      live: {
        baseUrl: 'https://api.easypay.com/v1',
        clientId: 'ep_live_client_67890',
        clientSecret: 'ep_live_secret_12345abcdef',
        clientCode: 'EP_LIVE_001',
        institutionCode: 'EPAY001',
        billerid: 'EPAY_BILL_001',
        authorizationcode: 'ep_live_auth_67890abcde',
        glCredit: '1001-2002-3003-4004',
        glDebit: '5005-6006-7007-8008',
        lastUpdated: '2023-12-20'
      }
    },
    nip: {
      staging: {
        baseUrl: 'https://api-staging.nip.com/v1',
        clientId: 'nip_staging_client_54321',
        clientSecret: 'nip_staging_secret_fedcba09876',
        clientCode: 'NIP_STAGING_001',
        institutionCode: 'NIP001',
        billerid: 'NIP_BILL_001',
        authorizationcode: 'nip_staging_auth_54321edcba',
        glCredit: '9009-8008-7007-6006',
        glDebit: '5005-4004-3003-2002',
        lastUpdated: '2024-01-10'
      },
      live: {
        baseUrl: 'https://api.nip.com/v1',
        clientId: 'nip_live_client_09876',
        clientSecret: 'nip_live_secret_fedcba12345',
        clientCode: 'NIP_LIVE_001',
        institutionCode: 'NIP001',
        billerid: 'NIP_BILL_001',
        authorizationcode: 'nip_live_auth_09876edcba',
        glCredit: '9009-8008-7007-6006',
        glDebit: '5005-4004-3003-2002',
        lastUpdated: '2024-02-05'
      }
    }
  });
  
  // Visibility toggles for sensitive keys
  const showKey = ref({
    clientId: false,
    clientSecret: false,
    clientCode: false,
    authorizationcode: false
  });
  
  // Modal states
  const showConfirmModal = ref(false);
  const showEditKeyModal = ref(false);
  const showRegenerateKeyModal = ref(false);
  const showSaveChangesModal = ref(false);
  const confirmPassword = ref('');
  const currentAction = ref<string | null>(null);
  const currentKeyName = ref<string | null>(null);
  
  // Edit key state
  const editKeyName = ref('');
  const editKeyValue = ref('');
  const regenerateKeyName = ref('');
  
  // Toast notification
  const showToast = ref(false);
  const toastMessage = ref('');
  
  // Unsaved changes tracking
  const hasUnsavedChanges = ref(false);
  
  // Reset unsaved changes when switching provider or environment
  watch([activeProvider, activeEnvironment], () => {
    if (hasUnsavedChanges.value) {
      if (confirm('You have unsaved changes. Do you want to discard them?')) {
        hasUnsavedChanges.value = false;
      }
    }
  });
  
  // Helper functions
  const getKeyValue = (keyName: string) => {
    return apiKeys.value[activeProvider.value][activeEnvironment.value][keyName as keyof typeof apiKeys.value.nip.staging];
  };
  
  const getLastUpdated = () => {
    return apiKeys.value[activeProvider.value][activeEnvironment.value].lastUpdated;
  };
  
  const maskKey = (key: string) => {
    if (!key) return '';
    const prefix = key.substring(0, 8);
    const suffix = key.substring(key.length - 4);
    return `${prefix}${'•'.repeat(10)}${suffix}`;
  };
  
  // Toggle key visibility
  const toggleKeyVisibility = (keyName: string) => {
    showKey.value[keyName as keyof typeof showKey.value] = !showKey.value[keyName as keyof typeof showKey.value];
  };
  
  // Copy functions
  const copyToClipboard = async (text: string, successMessage: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showSuccessToast(successMessage);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };
  
  const copyKey = (keyName: string) => {
    openConfirmModal('copy', keyName);
  };
  
  // Edit key functions
  const openEditKeyModal = (keyName: string) => {
    editKeyName.value = keyName;
    editKeyValue.value = getKeyValue(keyName);
    showEditKeyModal.value = true;
  };
  
  const closeEditKeyModal = () => {
    showEditKeyModal.value = false;
    editKeyValue.value = '';
  };
  
  const updateKey = () => {
    apiKeys.value[activeProvider.value][activeEnvironment.value][editKeyName.value as keyof typeof apiKeys.value.nip.staging] = editKeyValue.value;
    hasUnsavedChanges.value = true;
    closeEditKeyModal();
    showSuccessToast(`${editKeyName.value} updated. Don't forget to save your changes.`);
  };
  
  // Regenerate key functions
  const openRegenerateKeyModal = (keyName: string) => {
    regenerateKeyName.value = keyName;
    showRegenerateKeyModal.value = true;
  };
  
  const closeRegenerateKeyModal = () => {
    showRegenerateKeyModal.value = false;
  };
  
  const regenerateKey = () => {
    // In a real app, this would call an API to regenerate the key
    const prefix = activeProvider.value === 'nip' ? 'nip' : 'ep';
    const env = activeEnvironment.value === 'staging' ? 'staging' : 'live';
    const randomSuffix = Math.random().toString(36).substring(2, 15);
    
    let newKey = '';
    if (regenerateKeyName.value === 'clientSecret') {
      newKey = `${prefix}_${env}_secret_${randomSuffix}`;
    } else if (regenerateKeyName.value === 'authorizationcode') {
      newKey = `${prefix}_${env}_auth_${randomSuffix}`;
    }
    
    apiKeys.value[activeProvider.value][activeEnvironment.value][regenerateKeyName.value as keyof typeof apiKeys.value.nip.staging] = newKey;
    hasUnsavedChanges.value = true;
    closeRegenerateKeyModal();
    showSuccessToast(`${regenerateKeyName.value} regenerated. Don't forget to save your changes.`);
  };
  
  // Save changes functions
  const openSaveChangesModal = () => {
    if (hasUnsavedChanges.value) {
      showSaveChangesModal.value = true;
    } else {
      showSuccessToast('No changes to save.');
    }
  };
  
  const closeSaveChangesModal = () => {
    showSaveChangesModal.value = false;
  };
  
  const saveChanges = () => {
    openConfirmModal('save', null);
  };
  
  // Modal functions
  const openConfirmModal = (action: string, keyName: string | null) => {
    currentAction.value = action;
    currentKeyName.value = keyName;
    showConfirmModal.value = true;
  };
  
  const closeConfirmModal = () => {
    showConfirmModal.value = false;
    confirmPassword.value = '';
    currentAction.value = null;
    currentKeyName.value = null;
  };
  
  const confirmAction = () => {
    // In a real app, you would validate the password against the user's actual password
    if (confirmPassword.value) {
      if (currentAction.value === 'copy' && currentKeyName.value) {
        const keyToCopy = getKeyValue(currentKeyName.value);
        copyToClipboard(keyToCopy, `${currentKeyName.value} copied to clipboard`);
      } else if (currentAction.value === 'save') {
        // In a real app, this would call an API to save the changes
        apiKeys.value[activeProvider.value][activeEnvironment.value].lastUpdated = new Date().toISOString().split('T')[0];
        hasUnsavedChanges.value = false;
        showSuccessToast('Changes saved successfully');
        closeSaveChangesModal();
      }
      closeConfirmModal();
    }
  };
  
  // Toast notification
  const showSuccessToast = (message: string) => {
    toastMessage.value = message;
    showToast.value = true;
    
    setTimeout(() => {
      showToast.value = false;
    }, 3000);
  };

//   useHead({
//     title: '',
//     des
//   })

//   definePageMeta({
//       useHead({
        
//       })
//   })
// useHead({
//     title: "API Keys Management | Fintech Dashboard";
//     meta: [
//       { name: "description", content: "Manage your NIP and Easy Pay API keys for both staging and live environments." },
//       { name: "keywords", content: "API keys, NIP, Easy Pay, fintech, payment gateway, API management" }
//     ];
//   })
  </script>
  
  <style>
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
  
/* 
  head {
    title: "API Keys Management | Fintech Dashboard";
    meta: [
      { name: "description", content: "Manage your NIP and Easy Pay API keys for both staging and live environments." },
      { name: "keywords", content: "API keys, NIP, Easy Pay, fintech, payment gateway, API management" }
    ];
  } */
  </style>