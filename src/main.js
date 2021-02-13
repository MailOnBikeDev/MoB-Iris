import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/tailwind.css";
import VeeValidate from "vee-validate";
import vClickOutside from "v-click-outside";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

library.add(faChevronDown);

Vue.config.productionTip = false;

Vue.use(VeeValidate);
Vue.use(vClickOutside);
Vue.component("font-awesome-icon", FontAwesomeIcon);

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");
