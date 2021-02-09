<template>
	<nav class="bg-secondary flex px-4 py-2 text-white items-center">
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
			<ul class="flex mr-4">
				<li class="mr-6" v-for="nav in navigationMenu" :key="nav.title">
					<router-link :to="nav.link" custom v-slot="{ navigate }" class="link">
						<span @click="navigate" role="link">
							{{ nav.title }}
						</span>
					</router-link>
				</li>
			</ul>

			<button
				class="py-2 px-4 text-white bg-info rounded-xl font-bold"
				@click="dropMenu = !dropMenu"
			>
				{{ currentUser.username }}
			</button>

			<!-- Dropdown Menu -->
			<ul
				v-if="dropMenu"
				class="sub-menu flex flex-col bg-white text-black shadow-xl rounded-sm"
			>
				<li class="px-4 my-1" v-for="link in linksDropMenu" :key="link.title">
					<router-link
						:to="link.link"
						custom
						v-slot="{ navigate }"
						class="link"
					>
						<span @click="navigate" role="link">
							{{ link.title }}
						</span>
					</router-link>
				</li>
				<div class="divider"></div>
				<li class="px-4 my-1">
					<a href @click.prevent="logOut">Cerrar Sesión</a>
				</li>
			</ul>
		</div>

		<div class="ml-auto mr-4 content-center" v-else>
			<ul class="flex mr-4">
				<li class="mr-4">
					<router-link to="/login" custom v-slot="{ navigate }" class="link">
						<span @click="navigate" role="link">
							Login
						</span>
					</router-link>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script>
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
				{ title: "Finanzas", link: "/finanzas" },
				{ title: "Clientes", link: "/clientes" },
				{ title: "MoBikers", link: "/mobikers" },
				{ title: "Pedidos", link: "/pedidos" },
			],
		};
	},
	computed: {
		currentUser() {
			3;
			return this.$store.state.auth.user;
		},
	},
	methods: {
		logOut() {
			this.$store.dispatch("auth/logout");
			this.$router.push("/login");
		},
	},
};
</script>

<style lang="scss" scoped>
.sub-menu {
	position: absolute;
	top: 60px;
	right: -7%;
	transform: translateX(-50%);
	width: max-content;

	.divider {
		width: 100%;
		height: 2px;
		background: #303868;
	}
}

.link {
	cursor: pointer;
}
</style>
