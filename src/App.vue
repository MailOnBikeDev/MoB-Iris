<template>
	<div id="app">
		<header>
			<Navigation />
		</header>

		<main class="container justify-center mx-auto cols-md-12">
			<router-view />
		</main>
	</div>
</template>

<script>
import Navigation from "./components/Navigation.vue";

export default {
	name: "App",
	components: { Navigation },
	mounted() {
		// Llamando a todas las tablas auxiliares
		this.$store.dispatch("auxiliares/getRolesUsuarios");
		this.$store.dispatch("auxiliares/getDistritosLima");
		this.$store.dispatch("auxiliares/getTiposCarga");
		this.$store.dispatch("auxiliares/getComprobantes");
		this.$store.dispatch("auxiliares/getTiposEnvios");
		this.$store.dispatch("auxiliares/getFormasPago");
		this.$store.dispatch("auxiliares/getModalidades");
		this.$store.dispatch("auxiliares/getRangosMoB");
		this.$store.dispatch("auxiliares/getRolCliente");
		this.$store.dispatch("auxiliares/getEntidadesBancarias");
		this.$store.dispatch("auxiliares/getStatusPedido");
		console.log("Tablas auxiliares cargadas, todo ok");
	},
};
</script>
