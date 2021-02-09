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
		path: "/home",
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
		path: "/user",
		name: "User",
		// lazy-loaded
		component: () => import("@/views/BoardUser.vue"),
	},
	{
		path: "/pedidos",
		name: "Pedidos",
		component: () => import("@/views/Pedidos.vue"),
	},
	{
		path: "/mobikers",
		name: "Mobikers",
		component: () => import("@/views/Mobikers.vue"),
	},
	{
		path: "/clientes",
		name: "Clientes",
		component: () => import("@/views/Clientes.vue"),
	},
	{
		path: "/finanzas",
		name: "Finanzas",
		component: () => import("@/views/Finanzas.vue"),
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
