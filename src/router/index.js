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
		component: () => import("@/views/Profile.vue"),
	},
	{
		path: "/pedidos/tablero-pedidos",
		name: "TableroPedidos",
		component: () => import("@/views/Pedidos/TableroPedidos.vue"),
	},
	{
		path: "/pedidos/nuevo-pedido",
		name: "NuevoPedido",
		component: () => import("@/views/Pedidos/NuevoPedido.vue"),
	},
	{
		path: "/pedidos/tablero-pedidos/:id",
		name: "EditarPedido",
		component: () => import("@/views/Pedidos/EditarPedido.vue"),
	},
	{
		path: "/mobikers/equipo-mobiker",
		name: "EquipoMobiker",
		component: () => import("@/views/MoBikers/EquipoMobiker.vue"),
	},
	{
		path: "/mobikers/nuevo-mobiker",
		name: "NuevoMobiker",
		component: () => import("@/views/MoBikers/NuevoMobiker.vue"),
	},
	{
		path: "/mobikers/equipo-mobiker/:id",
		name: "EditarMobiker",
		component: () => import("@/views/MoBikers/EditarMobiker.vue"),
	},
	{
		path: "/clientes/tablero-clientes",
		name: "TableroClientes",
		component: () => import("@/views/Clientes/TableroClientes.vue"),
	},
	{
		path: "/clientes/nuevo-cliente",
		name: "NuevoCliente",
		component: () => import("@/views/Clientes/NuevoCliente.vue"),
	},
	{
		path: "/clientes/tablero-clientes/:id",
		name: "EditarCliente",
		component: () => import("@/views/Clientes/EditarCliente.vue"),
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
