<template>
	<div class="bg-gray-100 shadow-lg rounded-xl w-1/2 mx-auto p-4 my-12">
		<div class="flex justify-end">
			<h1
				class="inline-block text-2xl text-primary text-center font-bold mb-4 rounded-xl relative -top-12 py-2 bg-gray-100 px-6"
			>
				Perfil
			</h1>
		</div>

		<div class="-mt-12">
			<div class="p-4">
				<h2 class="mb-2">
					<strong class="resalta">Perfil:</strong>
					{{ currentUser.username }}
				</h2>
				<p class="mb-2">
					<strong class="resalta">Nombre:</strong>
					{{ currentUser.fullName }}
				</p>
				<p class="mb-2">
					<strong class="resalta">Email:</strong>
					{{ currentUser.email }}
				</p>
				<p class="mb-2">
					<strong class="resalta">Empresa:</strong>
					{{ currentUser.empresa }}
				</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Perfil",
	computed: {
		currentUser() {
			return this.$store.state.user;
		},
	},
	mounted() {
		if (!this.currentUser) {
			this.$router.push("/login");
		}
	},
};
</script>
