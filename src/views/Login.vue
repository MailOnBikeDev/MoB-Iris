<template>
	<div class="w-full flex flex-col justify-center items-center mt-10 mb-40">
		<div
			class="max-w-lg bg-gray-100 shadow-lg rounded-xl overflow-hidden mx-auto py-4 px-8 mt-10 flex flex-col justify-center"
		>
			<img
				id="profile-img"
				src="@/assets/MoB-logo.png"
				alt="Mail On Bike Logo"
				class="w-40 mx-auto"
			/>
			<form name="form" @submit.prevent="handleLogin" autocomplete="off">
				<div class="my-6 pt-3 rounded">
					<label
						for="username"
						class="block text-gray-700 text-sm font-bold mb-2 ml-3"
						>Username</label
					>
					<input
						v-model="user.username"
						v-validate="'required'"
						type="text"
						name="username"
						class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-3 py-3"
					/>
					<div v-if="errors.has('username')">
						Username is required!
					</div>
				</div>

				<div class="my-6 pt-3 rounded">
					<label
						for="password"
						class="block text-gray-700 text-sm font-bold mb-2 ml-3"
						>Password</label
					>
					<input
						v-model="user.password"
						v-validate="'required'"
						type="password"
						name="password"
						class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-3 py-3"
					/>
					<div v-if="errors.has('password')">
						Password is required!
					</div>
					<button
						class="flex-row w-full mt-10 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
					>
						<span>Iniciar Sesión</span>
					</button>
					<div v-if="message">
						{{ message }}
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import User from "../models/user";

export default {
	name: "Login",
	data() {
		return {
			user: new User("", ""),
			message: "",
		};
	},
	computed: {
		loggedIn() {
			return this.$store.state.auth.status.loggedIn;
		},
	},
	created() {
		if (this.loggedIn) {
			this.$router.push("/perfil");
		}
	},
	methods: {
		handleLogin() {
			this.loading = true;
			this.$validator.validateAll().then((isValid) => {
				if (!isValid) {
					this.loading = false;
					return;
				}
				if (this.user.username && this.user.password) {
					this.$store.dispatch("login", this.user).then(
						() => {
							this.$router.push("/perfil");
						},
						(error) => {
							this.loading = false;
							this.message =
								(error.response && error.response.data) ||
								error.messsage ||
								error.toString();
						}
					);
				}
			});
		},
	},
};
</script>
