<template>
  <div class="w-full mx-auto">
    <div class="w-full max-w-7xl mx-auto px-6">
      <div class="mt-4">
        <router-link class=" hover:underline dark:text-gray-100" to="/"
          >&larr; Zur Übersicht</router-link
        >
      </div>

      <div class="py-4">
        <h1 class="text-3xl w-full font-semibold capitalize dark:text-gray-100">{{ room.title }}</h1>
        <p class="text-xl capitalize dark:text-gray-100">{{ room.subheading }}</p>
      </div>
    </div>

    <div class="w-full max-w-7xl flex mx-auto mt-5 px-6">
      <div class="relative w-full h-96 rounded overflow-hidden">
        <img class="absolute h-full w-full object-cover" :src="room.image" />
      </div>
    </div>

    <div class="w-full max-w-7xl flex mx-auto mt-5 px-6">
      <p class="flex items-center dark:text-gray-100">
        <svg
          class="h-4 w-auto mr-1"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          /></svg
        >{{ room.city }}
      </p>
    </div>

    <div class="w-full max-w-7xl flex flex-wrap mx-auto mt-5 px-6 ">
      <div class="w-full md:w-2/3 md:pr-10">
        <div class="w-full pt-4 border-t border-gray-200 dark:border-gray-600 dark:text-gray-100">
         <h2 class="text-2xl font-semibold py-4 capitalize">{{ room.subheading }}</h2>
          <p>{{ room.description }}</p>
        </div>
      </div>

      <div class="w-full md:w-1/3 mt-8 md:mt-0 md:pl-4">
        <div
          class="w-full mx-auto rounded bg-gray-100 px-4 py-6 border border-gray-100"
        >
          <div class="text-5xl font-bold pb-4">
            <span class="font-normal text-base align-top">Ab </span
            >{{ room.pricePerDay }}€<span
              class="font-normal text-base align-baseline"
            >
              pro Nacht</span
            >
          </div>
          <form class="grid grid-cols-1 gap-3">
            <label class="block">
              <span class="text-gray-700">Check In</span>
              <input
                type="date"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>

            <label class="block">
              <span class="text-gray-700">Check Out</span>
              <input
                type="date"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>

            <label class="block">
              <span class="text-gray-700">Gäste</span>
              <select
                class="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </label>

            <button
              class="rounded-full font-semibold mt-4 flex mx-auto whitespace-nowrap hover:bg-indigo-600 bg-indigo-500 text-white py-2 px-4"
            >
              Verfügbarkeit prüfen
            </button>
          </form>
        </div>
      </div>
    </div>

    <div class="w-full max-w-7xl flex flex-wrap mx-auto mt-5 px-6" v-if="$store.state.showReviews">
      <div class="w-full md:w-2/3 md:pr-10">
        <div class="w-full pt-4 border-t border-gray-200 dark:border-gray-600 dark:text-gray-100">
          <h2 class="text-2xl font-semibold py-4 mb-4">Bewertungen ({{ reviews.length }})</h2>

          <div v-for="review in reviews" :key="review.userId" class="block mb-10 p-2">
            <div class="flex items-center">
              <img
                class="h-16 w-16 rounded-full bg-gray-100 object-cover"
                :src="`https://robohash.org/${review.userId}`"
              />
              <div class="ml-2 block">
                <div class="font-semibold">{{ review.fullName }}</div>
                <div class="flex items-center">
                  <svg
                    v-for="i in 5"
                    :key="i"
                    :class="
                      i <= review.rating ? 'text-indigo-600' : 'text-gray-400'
                    "
                    class="h-4 w-auto fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      d="M12 18.26l-7.053 3.948 1.575-7.928L.587 8.792l8.027-.952L12 .5l3.386 7.34 8.027.952-5.935 5.488 1.575 7.928z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div class="font-thin mt-4">
                <p>{{ review.comment }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RoomReviewApi } from "../service/room-review-api";
export default {
  name: "RoomDetail",
  data() {
    return {
      room: {},
      reviews: [],
    };
  },
  async created() {
    const api = new RoomReviewApi();

    this.room = (await api.getRoomById(this.$route.params.roomId)) || {};

    this.reviews = (await api.getReviewsById(this.room.id)) || [];
  },
};
</script>
