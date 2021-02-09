<template>
  <div class="bg-white dark:bg-gray-700 shadow-lg rounded overflow-hidden">
    <div class="relative bg-white h-64">
        <router-link :to="`/rooms/${property.id}`">
      <img class="absolute h-full w-full object-cover hover:opacity-70 transition-opacity ease-in duration-300" :src="property.image" />
        </router-link>
      <div
        v-if="property.plus"
        class="absolute top-0 right-0 mr-2 mt-2 text-white text-xs rounded-full px-2 py-1 font-bold bg-teal-400"
      >
        Plus
      </div>
    </div>
    <div class="px-4 py-4">
      <h3 class="font-semibold dark:text-gray-100 text-lg truncate capitalize hover:underline"><router-link :to="`/rooms/${property.id}`">{{ property.title }}</router-link></h3>
      <p class="text-gray-600 dark:text-gray-400 text-sm truncate">{{ property.description }}</p>
      <p class="mt-4 dark:text-gray-100 font-semibold" >
        {{ property.pricePerDay }} EUR
        <span class="text-gray-600 dark:text-gray-400 font-normal">pro Tag</span>
      </p>

      <div class="mt-4 flex items-center" v-if="$store.state.showReviews">
        <svg
          v-for="i in 5"
          :key="i"
          :class="i <= property.ratingAvg ? 'text-indigo-600' : 'text-gray-400'"
          class="h-4 w-auto fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M12 18.26l-7.053 3.948 1.575-7.928L.587 8.792l8.027-.952L12 .5l3.386 7.34 8.027.952-5.935 5.488 1.575 7.928z"
          />
        </svg>
        <span class="ml-2 text-gray-600 dark:text-gray-400 text-sm"
          >{{ property.reviews }} Reviews</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["property"]
};
</script>
