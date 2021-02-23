<template>
	<div class="w-full flex flex-col justify-center items-center mt-6">
		<div
			class="max-w-lg bg-gray-100 shadow-lg rounded-xl overflow-hidden mx-auto py-4 px-8"
		>
			<form
				class="flex flex-col mt-4"
				@submit.prevent="handleRegister"
				autocomplete="off"
			>
				<div v-if="!successful">
					<div class="flex flex-row">
						<div class="mb-4 rounded mr-4">
							<label
								for="fullName"
								class="block text-primary text-sm font-bold mb-1 ml-1"
								>Nombre completo</label
							>
							<input
								v-model="user.fullName"
								v-validate="'required|min:3|max:30'"
								type="text"
								class="rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 px-2 py-2"
								name="fullName"
							/>
							<div
								v-if="submitted && errors.has('fullName')"
								class="bg-red-500 text-white text-sm rounded p-2"
							>
								<p>El nombre es requerido</p>
							</div>
						</div>
						<div class="mb-4 rounded">
							<label
								for="username"
								class="block text-primary text-sm font-bold mb-1 ml-1"
								>Usuario</label
							>
							<input
								v-model="user.username"
								v-validate="'required|min:3|max:25'"
								type="text"
								class="rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 px-2 py-2"
								name="username"
							/>
							<div
								v-if="submitted && errors.has('username')"
								class="bg-red-500 text-white text-sm rounded p-2"
							>
								<p>El usuario es requerido</p>
							</div>
						</div>
					</div>

					<div class="flex flex-row">
						<div class="mb-4 rounded mr-4">
							<label
								for="empresa"
								class="block text-primary text-sm font-bold mb-1 ml-1"
								>Empresa</label
							>
							<input
								v-model="user.empresa"
								v-validate="'required|min:3|max:30'"
								type="text"
								class="rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 px-2 py-2"
								name="empresa"
							/>
							<div
								v-if="submitted && errors.has('empresa')"
								class="bg-red-500 text-white text-sm rounded p-2"
							>
								<p>La empresa es requerida</p>
							</div>
						</div>
						<div class="mb-4 rounded">
							<label
								for="email"
								class="block text-primary text-sm font-bold mb-1 ml-1"
								>Email</label
							>
							<input
								v-model="user.email"
								v-validate="'required|email|max:50'"
								type="email"
								class="rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 px-2 py-2"
								name="email"
							/>
							<div
								v-if="submitted && errors.has('email')"
								class="bg-red-500 text-white text-sm rounded p-2"
							>
								<p>El email es requerido</p>
							</div>
						</div>
					</div>

					<div class="mb-4 rounded">
						<label
							for="password"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Password</label
						>
						<input
							v-model="user.password"
							v-validate="'required|min:6|max:40'"
							type="password"
							class="rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 px-2 py-2"
							name="password"
						/>
						<div
							v-if="submitted && errors.has('password')"
							class="bg-red-500 text-white text-sm rounded p-2"
						>
							<p>La contraseña es requerida</p>
						</div>
					</div>

					<div class="flex flex-row">
						<div class="mb-2 rounded mx-auto">
							<label
								for="roles"
								class="block text-primary text-sm font-bold mb-2 ml-1"
								>Seleccione un Rol</label
							>
							<div v-for="(rol, index) in roles" :key="index">
								<input
									type="checkbox"
									name="roles"
									v-model="user.roles"
									:value="rol.name"
								/>
								<label class="ml-2" :for="rol">{{ roles[index].name }}</label>
							</div>
							<div
								v-if="submitted && errors.has('roles')"
								class="bg-red-500 text-white text-sm rounded p-2"
							>
								{{ errors.first("roles") }}
							</div>
						</div>
					</div>

					<button
						class="block w-full mt-4 bg-info hover:bg-secondary text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200 mb-4 focus:outline-none"
					>
						Crear Nuevo Usuario
					</button>
				</div>
			</form>

			<div
				v-if="message"
				class="text-white text-center text-sm rounded p-2"
				:class="successful ? 'bg-green-500' : 'bg-red-500'"
			>
				{{ message }}
			</div>
		</div>
	</div>
</template>

<script>
import User from "../models/user";
import AuxiliarService from "@/services/auxiliares.service";

export default {
	name: "Register",
	data() {
		return {
			user: new User("", "", "", "", "", []),
			submitted: false,
			successful: false,
			message: "",
			roles: [],
		};
	},
	mounted() {
		AuxiliarService.getRolesUsers().then(
			(response) => {
				this.roles = response.data;
			},
			(error) => {
				this.roles =
					(error.response && error.response.data) ||
					error.message ||
					error.toString();
			}
		);
	},
	computed: {
		loggedIn() {
			return this.$store.state.status.loggedIn;
		},
	},
	methods: {
		handleRegister() {
			this.message = "";
			this.submitted = true;
			this.$validator.validate().then((isValid) => {
				if (isValid) {
					this.$store.dispatch("register", this.user).then(
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

<style lang="scss">
input[type="checkbox"] {
	position: relative;
	width: 2rem;
	height: 1rem;
	appearance: none;
	background: #c6c6c6;
	outline: none;
	border-radius: 1rem;
	box-shadow: inset 0 0 0.5rem rgba(0, 0, 0, 0.2);
	transition: 0.3s;

	&:checked {
		background: #6f8fc8;
	}

	&::before {
		content: "";
		position: absolute;
		width: 1rem;
		height: 1rem;
		border-radius: 1rem;
		top: 0;
		left: 0;
		background: #fff;
		transform: scale(1.1);
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
		transition: 0.3s;
	}

	&:checked::before {
		left: 1rem;
	}
}
</style>
