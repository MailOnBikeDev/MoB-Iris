import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/tailwind.css";
import VeeValidate from "vee-validate";
import vClickOutside from "v-click-outside";
import "vue-search-select/dist/VueSearchSelect.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPencilAlt, faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import VueDayjs from "vue-dayjs-plugin";

library.add(faPencilAlt, faSyncAlt);

Vue.config.productionTip = false;

Vue.use(VeeValidate);
Vue.use(vClickOutside);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(VueDayjs);

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");
