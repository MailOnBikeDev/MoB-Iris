<template>
	<div class="w-96 bg-white p-4 mt-20 mx-auto rounded">
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
</template>

<script>
export default {
	name: "Perfil",
	computed: {
		currentUser() {
			return this.$store.state.auth.user;
		},
	},
	mounted() {
		if (!this.currentUser) {
			this.$router.push("/login");
		}
	},
};
</script>
