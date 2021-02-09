<template>
  <div class="w-full mx-auto">
    <!-- search bar -->
    <section class="w-full mx-auto bg-image pb-40 pt-20 px-6">
      <h1
        class="text-white w-full max-w-3xl mx-auto text-center font-black text-5xl"
      >
        Drum o Mensch, sei weise, pack die Koffer und verreise.
      </h1>
      <div
        role="search"
        class="my-5 md:my-10 w-full mx-auto bg-white shadow md:max-w-3xl border border-gray-100 px-4 py-2 rounded-full"
      >
        <label for="search" class="flex items-center">
          <svg
            class="h-8 w-auto text-gray-400 dark:text-gray-200"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
          <input
            id="search"
            placeholder="Wo willst du hin?"
            type="text"
            class="block text-xl w-full border-0 focus:ring-0"
          />
          <button
            class="bg-indigo-400 hover:bg-indigo-600 rounded-full px-4 py-2 text-white"
          >
            Los
          </button>
        </label>
      </div>
    </section>

    <section
      class="w-full flex mx-auto"
      v-if="$store.state.signUpExpirementLabel.teaser > 0"
    >
      <div class="w-full flex mx-auto md:px-6">
        <component
          :is="`teaser-${$store.state.signUpExpirementLabel.teaser}`"
        />
      </div>
    </section>

    <section class="w-full flex flex-row mx-auto">
      <div class="w-full max-w-7xl mt-10 mx-auto px-6">
        <h2 class="text-5xl w-full font-semibold dark:text-gray-100 py-4 mb-5">
          Aktuelle Angebote
        </h2>

        <div class="w-full flex flex-wrap mx-auto items-center">
          <div
            class="w-full sm:w-1/2 md:w-1/3 p-2"
            v-for="(property, index) in rooms"
            :key="index"
          >
            <Card class="w-full" :property="property" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */

import { RoomReviewApi } from "../service/room-review-api";
import Card from "../components/Card";
import Teaser1 from "../components/Teaser1";
import Teaser2 from "../components/Teaser2";
import Teaser3 from "../components/Teaser3";

export default {
  name: "Home",
  components: {
    Card,
    // prettier-ignore
    Teaser1,
    Teaser2,
    Teaser3
  },
  data() {
    return {
      rooms: []
    };
  },
  async mounted() {
    this.rooms = await new RoomReviewApi().getRooms();
  }
};
</script>

<style>
.bg-image {
  background-image: url("../assets/landscape-02-01.jpg");
}
</style>
