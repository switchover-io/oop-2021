import { createStore } from "vuex";




export default createStore({
  state: {
    showDarkmode: false,
    signUpExpirementLabel: { label: "Sign Up"},
    newSearchOptionReleaseToggle: false,
    showReviews: false
  },
  mutations: {
    switchDarkmodeToggle(state, value) {
      state.showDarkmode = value; 
    },
    switchSignupToggle(state, value) {
      state.signUpExpirementLabel = value;
    },
    switchReviewsToggle(state, value) {
      state.showReviews = value;
    }
  },
  actions: {
  },
  modules: {}
});
