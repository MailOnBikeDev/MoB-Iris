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

		<div class="flex-row text-center bg-white p-4 mt-2">
			<p>
				id / fecha / cliente / origen / destinatario / destino / mobiker
			</p>
		</div>

		<div>
			<ul v-for="pedido in pedidos" :key="pedido.id">
				<li class="bg-white text-blue-600 p-4 mt-2">
					{{ pedido.id }} / {{ pedido.fecha }} /
					{{ pedido.contactoRemitente }} / {{ pedido.distritoRemitente }} /
					{{ pedido.contactoConsignado }} / {{ pedido.distrito.distrito }} /
					{{ pedido.mobiker.fullName }}
				</li>
			</ul>
		</div>
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
