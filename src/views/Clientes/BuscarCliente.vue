<template>
	<div class="bg-white">
		<h1>buscar cliente</h1>
		<form @submit.prevent="handleSearchCliente">
			<input type="text" class="bg-gray-600" v-model="findCliente" />
			<button>Buscar</button>
		</form>

		{{ clientes }}
	</div>
</template>

<script>
import ClienteService from "@/services/cliente.service";

export default {
	data() {
		return {
			findCliente: "",
			clientes: [],
		};
	},
	methods: {
		async handleSearchCliente() {
			try {
				let clientes = await ClienteService.searchCliente(this.findCliente);

				this.clientes = clientes.data;
			} catch (error) {
				console.error(error);
			}
		},
	},
};
</script>
