<template>
	<div class="w-full h-full p-4 flex flex-col text-sm" v-if="estadisticas">
		<div class="bg-green-500 text-white text-center font-bold">
			Un mensaje verde para cuidar el ambiente
		</div>
		{{ estadisticas.kilometros }}
		{{ estadisticas.CO2Ahorrado }}
		{{ estadisticas.ruido }}
	</div>
</template>

<script>
export default {
	name: "BaseEcoamigable",
	props: {
		estadisticas: Object,
	},
};
</script>
