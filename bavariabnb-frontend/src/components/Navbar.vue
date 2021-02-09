<template>
  <nav role="navigation" class="w-full bg-white dark:bg-gray-900 shadow-lg">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <button @click="open = !open" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" x-bind:aria-expanded="open" aria-expanded="true">
            <span class="sr-only">Open main menu</span>
            <!-- Icon when menu is closed. -->
            <svg :class="{ 'hidden': open, 'block': !open }" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
</svg>
            <!-- Icon when menu is open. -->
            <svg :class="{ 'hidden': !open, 'block': open }" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
</svg>
          </button>
        </div>

        <div
          class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex-shrink-0 flex items-center">
            <router-link to="/">
              <img class="lg:block h-8 w-auto" src="@/assets/logo.svg" />
            </router-link>
          </div>
        </div>

        <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
                        <router-link
            class="text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white px-3 py-2 rounded-full font-semibold"
            to="/login"
            >Login</router-link
          >
          <router-link
            class="text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white px-3 py-2 rounded-full font-semibold"
            to="/login"
            >{{ $store.state.signUpExpirementLabel.label }}</router-link
          >
            </div>
          </div>




        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <SwitchGroup as="div" v-if="$store.state.showDarkmode" class="flex items-center space-x-2">
            <SwitchLabel class="hidden sm:block text-xs dark:text-gray-400 text-gray-600">Dark Mode</SwitchLabel>
            <Switch
              as="button"
              v-model="darkmode"
              class="relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:shadow-outline"
              :class="darkmode ? 'bg-indigo-600' : 'bg-gray-200'"
              v-slot="{ checked }"
            >
              <span
                class="inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full"
                :class="{ 'translate-x-5': checked, 'translate-x-0': !checked }"
              />
            </Switch>
          </SwitchGroup>


        </div>
      </div>
    </div>
    <div :class="{ 'block': open, 'hidden': !open }" class="sm:hidden block">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <router-link
            class="text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white px-3 py-2 rounded-full block font-semibold"
            to="/login"
            >Login</router-link
          >
          <router-link
            class="text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white px-3 py-2 rounded-full block font-semibold"
            to="/login"
            >{{ $store.state.signUpExpirementLabel.label }}</router-link
          >
      </div>
    </div>
  </nav>
</template>

<script>
import { SwitchGroup, Switch, SwitchLabel } from "@headlessui/vue";
export default {
  components: {
    SwitchGroup,
    Switch,
    SwitchLabel,
  },
  data() {
    return {
      darkmode: this.modelValue,
      open: true
    }
  },
  props: {
    modelValue: Boolean
  },
  watch: {
    darkmode() {
      this.$emit('update:modelValue', this.darkmode)
    }
  }
};
</script>
