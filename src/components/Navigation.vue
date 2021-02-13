<template>
	<nav class="bg-secondary flex px-6 py-2 text-white items-center">
		<div>
			<router-link to="/" custom v-slot="{ navigate }">
				<img
					@click="navigate"
					role="link"
					class="w-14"
					src="@/assets/MoB-logo.png"
					alt="Mail On Bike Logo"
				/>
			</router-link>
		</div>

		<div v-if="currentUser" class="flex flex-row ml-auto items-center">
			<!-- Navigation -->
			<div v-for="nav in navigationMenu" :key="nav.title">
				<!-- <button class="mr-6">
					<span>{{ nav.title }}</span> <i class="fas fa-chevron-down"></i>
				</button> -->

				<router-link
					:to="nav.link"
					custom
					v-slot="{ navigate }"
					class="link mr-6"
				>
					<span @click="navigate" role="link">
						{{ nav.title }}
					</span>
					<font-awesome-icon icon="chevron-down" class="ml-1" />
				</router-link>
			</div>

			<!-- Dropdown Menu -->
			<div>
				<button
					class="py-2 px-4 text-white bg-info rounded-xl font-bold active:bg-blue-400 focus:oultine-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
					@click="dropMenu = !dropMenu"
				>
					{{ currentUser.username }}
				</button>

				<div
					v-if="dropMenu"
					class="sub-menu flex flex-col bg-white text-black shadow-xl rounded mt-1 text-sm absolute -translate-x-1/2"
					v-click-outside="clickExterno"
				>
					<div
						v-for="link in linksDropMenu"
						:key="link.title"
						class="link px-2 py-2 hover:bg-blue-500 hover:text-white rounded"
					>
						<router-link :to="link.link" custom v-slot="{ navigate }">
							<span @click="navigate" role="link">
								{{ link.title }}
							</span>
						</router-link>
					</div>
					<div class="divider"></div>
					<a
						class="link px-2 py-2 hover:bg-blue-500 hover:text-white rounded"
						href
						@click.prevent="logOut"
						>Cerrar Sesión</a
					>
				</div>
			</div>
		</div>

		<div class="ml-auto mr-4 content-center" v-else>
			<div class="flex mr-4">
				<router-link to="/login" custom v-slot="{ navigate }" class="link">
					<span @click="navigate" role="link">
						Login
					</span>
				</router-link>
			</div>
		</div>
	</nav>
</template>

<script>
import vClickOutside from "v-click-outside";

export default {
	data() {
		return {
			dropMenu: false,
			linksDropMenu: [
				{ title: "Mi Perfil", link: "/perfil" },
				{ title: "Crear usuario", link: "/register" },
				{ title: "Gestionar usuarios", link: "/register" },
				{ title: "Mis Estadísticas", link: "/register" },
			],
			navigationMenu: [
				{
					title: "Finanzas",
					link: "/finanzas/finanzas",
					subMenu: [{ title: "f", subLink: "/" }],
				},
				{
					title: "Clientes",
					link: "/clientes/tablero-clientes",
					subMenu: [
						{ title: "Perfiles", subLink: "/clientes/tablero-clientes" },
						{ title: "Nuevo Cliente", subLink: "/clientes/nuevo-cliente" },
						{ title: "Nuevo Cliente", subLink: "/clientes/nuevo-cliente" },
					],
				},
				{
					title: "MoBikers",
					link: "/mobikers/equipo-mobiker",
					subMenu: [{ title: "f", subLink: "/" }],
				},
				{
					title: "Pedidos",
					link: "/pedidos/tablero-pedidos",
					subMenu: [{ title: "f", subLink: "/" }],
				},
			],
		};
	},
	computed: {
		currentUser() {
			return this.$store.state.auth.user;
		},
	},
	directives: {
		vClickOutside: vClickOutside.directive,
	},
	methods: {
		logOut() {
			this.$store.dispatch("auth/logout");
			this.dropMenu = false;
			this.$router.push("/login");
		},
		clickExterno() {
			this.dropMenu = false;
		},
	},
};
</script>

<style lang="scss" scoped>
.divider {
	width: 100%;
	height: 2px;
	background: #303868;
}

.link {
	cursor: pointer;
}
</style>
