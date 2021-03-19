<template>
	<div class="w-full h-full p-4 flex flex-col text-sm" v-if="estadisticas">
		<div class="mb-2 text-center">
			<span class="resalta">CO2 Ahorrado: </span>
			<span class="select-all">{{ estadisticas.CO2Ahorrado }}</span>
		</div>

		<div class="mb-2 text-center">
			<span class="resalta">Ruido evitado: </span>
			<span class="select-all">{{ estadisticas.ruido }}</span>
		</div>
	</div>
</template>

<script>
export default {
	name: "BaseEcoamigable",
	props: {
		estadisticas: Object,
		pedidos: Array,
	},
};
</script>
