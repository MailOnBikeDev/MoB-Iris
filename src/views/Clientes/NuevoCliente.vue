<template>
	<div class="w-full justify-center items-center">
		<div
			class="bg-gray-100 shadow-lg rounded-xl overflow-hidden mx-auto py-4 px-8 mt-6 "
		>
			<div class="flex justify-end">
				<h1
					class="inline-block bg-primary text-white text-center font-bold px-4 py-2 rounded-xl"
				>
					Nuevo Cliente
				</h1>
			</div>

			<form
				class="mt-6"
				@submit.prevent="handleNuevoCliente"
				autocomplete="off"
			>
				<div v-if="!successful">
					<div class="grid grid-cols-3 mb-4">
						<div class="flex flex-col mr-4">
							<label
								for="contacto"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Contacto</label
							>
							<input
								v-model="nuevoCliente.contacto"
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="flex flex-col mr-4">
							<label
								for="empresa"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Razón Social</label
							>
							<input
								v-model="nuevoCliente.empresa"
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="flex flex-col">
							<label
								for="telefono"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Teléfono</label
							>
							<input
								v-model="nuevoCliente.telefono"
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>
					</div>

					<div class="grid grid-cols-3 mb-4">
						<div class="flex flex-col mr-4">
							<label
								for="email"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Email</label
							>
							<input
								v-model="nuevoCliente.email"
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="flex flex-col mr-4">
							<label
								for="ruc"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>RUC</label
							>
							<input
								v-model="nuevoCliente.ruc"
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="flex flex-col">
							<label
								for="distrito"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Distrito</label
							>
							<model-list-select
								name="distrito"
								v-model="nuevoCliente.distrito"
								placeholder="Buscar distrito..."
								:list="distritos"
								option-text="distrito"
								option-value="distrito"
							/>
						</div>
					</div>

					<div class="grid grid-cols-2 mb-4">
						<div class="flex flex-col mr-4">
							<label
								for="direccion"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Dirección</label
							>
							<input
								v-model="nuevoCliente.direccion"
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="flex flex-col">
							<label
								for="otroDato"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Otro Dato</label
							>
							<input
								v-model="nuevoCliente.otroDato"
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>
					</div>

					<div class="grid grid-cols-4 mb-10">
						<div class="flex flex-col mr-4">
							<label
								for="carga"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Tipo de Carga</label
							>
							<model-list-select
								name="carga"
								v-model="nuevoCliente.carga"
								:list="tiposDeCarga"
								option-text="tipo"
								option-value="tipo"
							/>
						</div>

						<div class="flex flex-col mr-4">
							<label
								for="pago"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Forma de Pago</label
							>
							<model-list-select
								name="pago"
								v-model="nuevoCliente.pago"
								:list="formasDePago"
								option-text="pago"
								option-value="pago"
							/>
						</div>

						<div class="flex flex-col mr-4">
							<label
								for="comprobante"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Comprobante</label
							>
							<model-list-select
								name="pago"
								v-model="nuevoCliente.comprobante"
								:list="comprobantes"
								option-text="tipo"
								option-value="tipo"
							/>
						</div>

						<div class="flex flex-col">
							<label
								for="rol"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Rol</label
							>
							<model-list-select
								name="pago"
								v-model="nuevoCliente.rol"
								:list="rolesCliente"
								option-text="rol"
								option-value="rol"
							/>
						</div>
					</div>

					<div class="grid grid-cols-1 mb-6">
						<button
							class="block w-full bg-info hover:bg-blue-600 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
						>
							Crear Nuevo Cliente
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import Cliente from "@/models/cliente";
import { ModelListSelect } from "vue-search-select";
import AuxiliarService from "@/services/auxiliares.service";
import ClienteService from "@/services/cliente.service";

export default {
	name: "NuevoCliente",
	data() {
		return {
			nuevoCliente: new Cliente("", "", "", "", "", "", "", "", "", "", "", ""),
			submitted: false,
			successful: false,
			message: "",
			distritos: [],
			tiposDeCarga: [],
			formasDePago: [],
			comprobantes: [],
			rolesCliente: [],
		};
	},
	async mounted() {
		try {
			let resDistritos = await AuxiliarService.getDistritos();
			let resCarga = await AuxiliarService.getTipoCarga();
			let pagos = await AuxiliarService.getFormasPago();
			let comp = await AuxiliarService.getTipoComprobante();
			let roles = await AuxiliarService.getRolCliente();

			this.distritos = resDistritos.data;
			this.tiposDeCarga = resCarga.data;
			this.formasDePago = pagos.data;
			this.comprobantes = comp.data;
			this.rolesCliente = roles.data;
		} catch (error) {
			console.log(error);
		}
		AuxiliarService.getDistritos().then(
			(response) => {
				this.distritos = response.data;
			},
			(error) => {
				this.roles =
					(error.response && error.response.data) ||
					error.message ||
					error.toString();
			}
		);
	},
	methods: {
		handleNuevoCliente() {
			ClienteService.storageNuevoCliente(this.nuevoCliente).then(
				() => {
					this.$router.push("/clientes/tablero-clientes");
				},
				(err) => console.log(err)
			);
		},
	},
	components: {
		ModelListSelect,
	},
};
</script>
