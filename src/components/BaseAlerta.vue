<template>
	<div
		v-if="alert.show"
		class="absolute top-1/4 right-0 p-10 rounded-l-lg text-white font-bold"
		:class="[alert.success ? 'bg-green-500' : 'bg-red-500']"
	>
		{{ alert.message }}
	</div>
</template>

<script>
export default {
	props: {
		alert: Object,
	},
};
</script>

<style></style>
