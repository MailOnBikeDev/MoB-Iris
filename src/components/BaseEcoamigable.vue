<template>
	<div class="w-full h-full">
		<div class="bg-green-500 text-white text-center font-bold">
			Un mensaje verde para cuidar el ambiente
		</div>
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
