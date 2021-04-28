<template>
	<div
		v-if="message !== ''"
		class="absolute top-1/4 right-0 p-10 rounded-l-lg text-white font-bold"
		:class="{ 'bg-red-500': success === false }"
	>
		{{ message.message }}
	</div>
</template>

<script>
export default {
	props: {
		message: String,
		success: Boolean,
	},
};
</script>

<style></style>
