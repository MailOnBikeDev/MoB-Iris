<template>
	<div class="w-full flex flex-col justify-center items-center mt-28">
		<div
			class="max-w-lg bg-gray-100 shadow-lg rounded-xl mx-auto py-4 px-8 flex flex-col justify-center"
		>
			<img
				id="profile-img"
				src="@/assets/MoB-logo.png"
				alt="Mail On Bike Logo"
				class="w-40 mx-auto relative -top-24"
			/>
			<form class="-mt-16" @submit.prevent="handleLogin" autocomplete="off">
				<div class="rounded">
					<label for="username" class="label-input">Usuario</label>
					<input
						v-model="user.username"
						v-validate="'required'"
						type="text"
						name="username"
						class="input"
					/>
					<div
						v-if="errors.has('username')"
						class="bg-red-500 text-white text-sm rounded p-2"
					>
						<p>El usuario es requerido</p>
					</div>
				</div>

				<div class="my-6 rounded">
					<label for="password" class="label-input">Contraseña</label>
					<input
						v-model="user.password"
						v-validate="'required'"
						type="password"
						name="password"
						class="input"
					/>
					<div
						v-if="errors.has('password')"
						class="bg-red-500 text-white text-sm rounded p-2"
					>
						<p>La contraseña es requerida</p>
					</div>
					<button
						class="block w-full my-6 bg-info hover:bg-secondary text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200 focus:outline-none"
					>
						<span>Iniciar Sesión</span>
					</button>
				</div>
			</form>
		</div>

		<BaseAlerta :message="message" :success="success" />
	</div>
</template>

<script>
import BaseAlerta from "@/components/BaseAlerta.vue";
import User from "../models/user";

export default {
	name: "Login",
	components: { BaseAlerta },
	data() {
		return {
			user: new User("", ""),
			message: "",
			success: false,
		};
	},
	computed: {
		loggedIn() {
			return this.$store.state.status.loggedIn;
		},
	},
	created() {
		if (this.loggedIn) {
			this.$router.push("/perfil");
		}
	},
	methods: {
		handleLogin() {
			this.$validator.validateAll().then((isValid) => {
				if (!isValid) {
					this.success = false;
					return;
				}
				if (this.user.username && this.user.password) {
					this.$store.dispatch("login", this.user).then(
						() => {
							this.$router.push("/perfil");
						},
						(error) => {
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
