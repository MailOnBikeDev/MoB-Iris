<template>
	<div class="bg-gray-100 shadow-lg rounded-xl w-1/3 mx-auto p-4 my-12">
		<div class="flex justify-end">
			<h1
				class="inline-block text-2xl text-primary text-center font-bold mb-4 rounded-xl relative -top-12 py-2 bg-gray-100 px-6"
			>
				Perfil
			</h1>
		</div>

		<div class="-mt-12">
			<h2>
				<strong class="resalta">Perfil:</strong>
				{{ currentUser.username }}
			</h2>
			<p>
				<strong class="resalta">Nombre:</strong>
				{{ currentUser.fullName }}
			</p>
			<p>
				<strong class="resalta">Id:</strong>
				{{ currentUser.id }}
			</p>
			<p>
				<strong class="resalta">Email:</strong>
				{{ currentUser.email }}
			</p>
			<p>
				<strong class="resalta">Empresa:</strong>
				{{ currentUser.empresa }}
			</p>
			<strong class="resalta">Autorizaciones:</strong>
			<ul>
				<li v-for="(role, index) in currentUser.roles" :key="index">
					{{ role }}
				</li>
			</ul>
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
