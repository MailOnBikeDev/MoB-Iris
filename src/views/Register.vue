<template>
	<div class="w-full flex flex-col justify-center items-center mt-10 mb-40">
		<div
			class="max-w-lg bg-gray-100 shadow-lg rounded-xl overflow-hidden mx-auto py-4 px-8 mt-10"
		>
			<form
				name="flex flex-col"
				@submit.prevent="handleRegister"
				autocomplete="off"
			>
				<div v-if="!successful">
					<div class="flex flex-row">
						<div class="my-6 pt-3 rounded  mr-10">
							<label
								for="fullName"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Nombre completo</label
							>
							<input
								v-model="user.fullName"
								v-validate="'required|min:3|max:20'"
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-3 py-3"
								name="fullName"
							/>
							<div
								v-if="submitted && errors.has('fullName')"
								class="alert-danger"
							>
								{{ errors.first("fullName") }}
							</div>
						</div>
						<div class="my-6 pt-3 rounded">
							<label
								for="username"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Username</label
							>
							<input
								v-model="user.username"
								v-validate="'required|min:3|max:20'"
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-3 py-3"
								name="username"
							/>
							<div
								v-if="submitted && errors.has('username')"
								class="alert-danger"
							>
								{{ errors.first("username") }}
							</div>
						</div>
					</div>

					<div class="flex flex-row">
						<div class="my-6 pt-3 rounded mr-10">
							<label
								for="empresa"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Empresa</label
							>
							<input
								v-model="user.empresa"
								v-validate="'required|min:3|max:20'"
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-3 py-3"
								name="empresa"
							/>
							<div
								v-if="submitted && errors.has('empresa')"
								class="alert-danger"
							>
								{{ errors.first("empresa") }}
							</div>
						</div>
						<div class="my-6 pt-3 rounded">
							<label
								for="email"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Email</label
							>
							<input
								v-model="user.email"
								v-validate="'required|email|max:50'"
								type="email"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-3 py-3"
								name="email"
							/>
							<div v-if="submitted && errors.has('email')" class="alert-danger">
								{{ errors.first("email") }}
							</div>
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
							v-validate="'required|min:6|max:40'"
							type="password"
							class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-3 py-3"
							name="password"
						/>
						<div
							v-if="submitted && errors.has('password')"
							class="alert-danger"
						>
							{{ errors.first("password") }}
						</div>
					</div>

					<div class="flex flex-row">
						<div class="my-6 pt-3 rounded mx-auto">
							<label
								for="roles"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Seleccione un Rol</label
							>
							<div v-for="(rol, index) in roles" :key="index">
								<input
									type="checkbox"
									name="roles"
									v-model="user.roles"
									:value="rol"
								/>
								<label class="ml-4" :for="rol">{{ roles[index] }}</label>
							</div>
							<div v-if="submitted && errors.has('roles')" class="alert-danger">
								{{ errors.first("roles") }}
							</div>
						</div>
					</div>

					<button
						class="block w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200 mb-6"
					>
						Registrarse
					</button>
				</div>
			</form>

			<div
				v-if="message"
				class="alert"
				:class="successful ? 'alert-success' : 'alert-danger'"
			>
				{{ message }}
			</div>
		</div>
	</div>
</template>

<script>
import User from "../models/user";

export default {
	name: "Register",
	data() {
		return {
			user: new User("", "", "", "", "", []),
			submitted: false,
			successful: false,
			message: "",
			roles: ["administrador", "operador", "auditor", "cliente", "mobiker"],
		};
	},
	computed: {
		loggedIn() {
			return this.$store.state.auth.status.loggedIn;
		},
	},
	methods: {
		handleRegister() {
			this.message = "";
			this.submitted = true;
			this.$validator.validate().then((isValid) => {
				if (isValid) {
					this.$store.dispatch("auth/register", this.user).then(
						(data) => {
							this.message = data.message;
							this.successful = true;
						},
						(error) => {
							this.message =
								(error.response && error.response.data) ||
								error.message ||
								error.toString();
							this.successful = false;
						}
					);
				}
			});
		},
	},
};
</script>
