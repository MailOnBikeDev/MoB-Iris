<template>
	<div class="w-96 bg-white p-4 mt-20 mx-auto">
		<h2>
			<strong>{{ currentUser.username }}</strong> Profile
		</h2>
		<p>
			{{ currentUser.fullName }}
		</p>
		<p>
			<strong>Id:</strong>
			{{ currentUser.id }}
		</p>
		<p>
			<strong>Email:</strong>
			{{ currentUser.email }}
		</p>
		<p>
			<strong>Empresa:</strong>
			{{ currentUser.empresa }}
		</p>
		<strong>Authorities:</strong>
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
