<template>
	<div class="w-full p-4">
		<h1 class="text-primary bg-white w-full font-bold text-2xl p-2">
			Pedidos
		</h1>

		<div class="grid grid-cols-1 bg-gray-200">
			<router-link to="/pedidos/nuevo-pedido" custom v-slot="{ navigate }">
				<span @click="navigate" role="link" class="text-center cursor-pointer"
					>Crear nuevo pedido</span
				>
			</router-link>
		</div>

		<ul v-for="pedido in pedidos" :key="pedido.id">
			<li class="text-white">
				{{ pedido.id }} / {{ pedido.fecha }} / {{ pedido.contactoRemitente }}
			</li>
		</ul>

		<p class="text-white">{{ pedidos }}</p>
	</div>
</template>

<script>
import PedidoService from "@/services/pedido.service";

export default {
	name: "Pedidos",
	data() {
		return {
			pedidos: [],
		};
	},
	mounted() {
		PedidoService.getPedidos().then(
			(response) => {
				this.pedidos = response.data;
			},
			(error) => {
				this.pedidos =
					(error.response && error.response.data) ||
					error.message ||
					error.toString();
			}
		);
	},
};
</script>

<style></style>
