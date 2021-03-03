<template>
	<div class="w-full h-full p-4 flex flex-col text-sm" v-if="estadisticas">
		<p class="mb-2">
			<span class="resalta">Total Bicienvios: </span>
			<span class="select-all">{{ estadisticas.biciEnvios }}</span>
		</p>
	</div>
</template>

<script>
export default {
	name: "BaseBiciEnvios",
	props: {
		estadisticas: Object,
	},
};
</script>
