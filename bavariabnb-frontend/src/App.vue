<template>
<div :class="{ 'dark' : darkmode }"  class="min-h-screen flex flex-col antialiased">
  <div class="min-h-screen dark:bg-gray-800">
    <div id="nav">
      <Navbar v-model="darkmode"></Navbar>
    </div>
    <router-view />
  </div>
</div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  components: {
    Navbar
  },
  data() {
    return {
      darkmode: false
    }
  },
  methods: {
    updateToggles() {
      this.$store.commit("switchDarkmodeToggle", this.$swClient.toggleValue('darkmode', false));
      this.$store.commit("switchReviewsToggle", this.$swClient.toggleValue('showReviews', false));
      this.$store.commit("switchSignupToggle", this.$swClient.toggleValue('signUpExperiment', { teaser: 0, label: "Sign Up"}, {
        uuid: this.$visitorId
      }));
    }
  },
  created() {
    this.$swClient.fetch(this.updateToggles);
    this.$swClient.onUpdate(this.updateToggles) 
  }
};
</script>
