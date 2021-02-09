<template>
	<div
		class="max-w-lg bg-gray-100 shadow-lg rounded-xl overflow-hidden my-40 mx-auto py-4 px-8"
	>
		<h2 class="text-center mb-10">Bienvenidos a Iris</h2>

		<h3 class="mb-4">Por favor, inicia sesión aquí:</h3>
		<router-link
			to="/login"
			class="bg-secondary px-4 py-2 text-white my-4 link rounded-lg"
			custom
			v-slot="{ navigate }"
		>
			<span @click="navigate" role="link">
				Iniciar Sesión
			</span>
		</router-link>
	</div>
</template>

<script>
export default {
	name: "Home",
};
</script>

<style lang="scss" scoped>
.link {
	cursor: pointer;
}
</style>
