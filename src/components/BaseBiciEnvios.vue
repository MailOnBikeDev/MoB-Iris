<template>
	<div class="w-full h-full p-4 flex flex-col text-sm" v-if="estadisticas">
		<div class="flex flex-col justify-center">
			<div class="mb-2 text-center">
				<span class="resalta">Total Bicienvios: </span>
				<span class="select-all">{{ estadisticas.biciEnvios }}</span>
			</div>

			<div class="mb-2 text-center">
				<span class="resalta">E-Commerce: </span>
				<span class="select-all">{{ contarEcommerce }}</span>
			</div>

			<div class="mb-2 text-center">
				<span class="resalta">Express: </span>
				<span class="select-all">{{ contarExpress }}</span>
			</div>

			<div class="mb-2 text-center">
				<span class="resalta">Kilómetros recorridos: </span>
				<span class="select-all">{{ estadisticas.kilometros }}</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "BaseBiciEnvios",
	props: {
		estadisticas: Object,
		pedidos: Array,
	},
	data() {
		return { indicesValidos: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] };
	},
	computed: {
		contarEcommerce() {
			let contador = 0;

			this.pedidos.map((pedido) => {
				if (
					pedido.tipoDeEnvioId === 1 &&
					this.indicesValidos.includes(pedido.statusId)
				) {
					contador++;
				}
			});

			return contador;
		},

		contarExpress() {
			let contador = 0;

			this.pedidos.map((pedido) => {
				if (
					pedido.tipoDeEnvioId === 3 &&
					this.indicesValidos.includes(pedido.statusId)
				) {
					contador++;
				}
			});

			return contador;
		},
	},
};
</script>
