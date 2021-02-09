<template>
	<div>
		<h1 class="text-white">Pedidos</h1>

		<ul v-for="pedido in pedidos" :key="pedido.id">
			<li class="text-white">
				{{ pedido.id }} / {{ pedido.fecha }} / {{ pedido.contactoRemitente }}
			</li>
		</ul>

		<p class="text-white">{{ pedidos }}</p>
	</div>
</template>

<script>
import SystemService from "@/services/system.service";

export default {
	name: "Pedidos",
	data() {
		return {
			pedidos: [],
		};
	},
	mounted() {
		SystemService.getPedidos().then(
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
