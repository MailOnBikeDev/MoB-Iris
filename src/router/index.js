import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/login",
		component: Login,
	},
	{
		path: "/register",
		component: Register,
	},
	{
		path: "/perfil",
		name: "Perfil",
		// lazy-loaded
		component: () => import("@/views/Profile.vue"),
	},
	{
		path: "/pedidos/tablero-pedidos",
		name: "TableroPedidos",
		component: () => import("@/views/Pedidos/TableroPedidos.vue"),
	},
	{
		path: "/mobikers/equipo-mobiker",
		name: "EquipoMobikers",
		component: () => import("@/views/MoBikers/EquipoMobiker.vue"),
	},
	{
		path: "/clientes/tablero-clientes",
		name: "TableroClientes",
		component: () => import("@/views/Clientes/TableroClientes.vue"),
	},
	{
		path: "/finanzas/finanzas",
		name: "Finanzas",
		component: () => import("@/views/Finanzas/Finanzas.vue"),
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, from, next) => {
	const publicPages = ["/login", "/"];
	const authRequired = !publicPages.includes(to.path);
	const loggedIn = localStorage.getItem("user");

	if (authRequired && !loggedIn) {
		next("/login");
	} else {
		next();
	}
});

export default router;
