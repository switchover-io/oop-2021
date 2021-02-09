import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as switchover from "switchover-js-sdk";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import "./index.css";

const swClient = switchover.createClient(process.env.VUE_APP_SDK_KEY, {
  autoRefresh: true,
  refreshInterval: 10
});

(async () => {
  const fp = await FingerprintJS.load();
  const result = await fp.get();

  const visitorId = result.visitorId;
  console.log(visitorId);

  const app = createApp(App);
  app.config.globalProperties.$swClient = swClient;
  app.config.globalProperties.$visitorId = visitorId;
  app
    .use(store)
    .use(router)
    .mount("#app");
})();
