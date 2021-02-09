<template>
	<div>
		<h1 class="text-white">Clientes</h1>

		<h2 class="text-white">{{ clientes }}</h2>
	</div>
</template>

<script>
import SystemService from "@/services/system.service";

export default {
	data() {
		return {
			clientes: [],
		};
	},
	mounted() {
		SystemService.getClientes().then(
			(response) => {
				this.clientes = response.data;
			},
			(error) => {
				this.clientes =
					(error.response && error.response.data) ||
					error.message ||
					error.toString();
			}
		);
	},
};
</script>

<style></style>
