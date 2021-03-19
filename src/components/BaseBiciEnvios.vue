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
				<span class="resalta">Total de kilómetros: </span>
				<span class="select-all">{{ estadisticas.kilometros }} km</span>
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
		return {};
	},
	computed: {
		contarEcommerce() {
			let contador = 0;

			this.pedidos.map((pedido) => {
				if (pedido.tipoDeEnvioId === 1) {
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
