<template>
	<div class="w-full">
		<div class="bg-gray-100 shadow-lg rounded-xl mx-auto py-4 px-8 mt-6">
			<form
				class="mt-4"
				@submit.prevent="handleNuevoCliente"
				autocomplete="off"
			>
				<div v-if="!successful">
					<div class="grid grid-cols-3 gap-4 mb-4">
						<div class="flex flex-col">
							<label
								for="contacto"
								class="block text-primary text-sm font-bold mb-1 ml-1"
								>Contacto</label
							>
							<input
								v-model="nuevoCliente.contacto"
								type="text"
								class="rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="flex flex-col">
							<label
								for="empresa"
								class="block text-primary text-sm font-bold mb-1 ml-1"
								>Razón Social</label
							>
							<input
								v-model="nuevoCliente.empresa"
								type="text"
								class="rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="flex flex-col">
							<label
								for="telefono"
								class="block text-primary text-sm font-bold mb-1 ml-1"
								>Teléfono</label
							>
							<input
								v-model="nuevoCliente.telefono"
								type="text"
								class="rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 px-2 py-2"
							/>
						</div>
					</div>

					<div class="grid grid-cols-3 gap-4 mb-4">
						<div class="flex flex-col">
							<label
								for="email"
								class="block text-primary text-sm font-bold mb-1 ml-1"
								>Email</label
							>
							<input
								v-model="nuevoCliente.email"
								type="text"
								class="rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="flex flex-col">
							<label
								for="ruc"
								class="block text-primary text-sm font-bold mb-1 ml-1"
								>RUC</label
							>
							<input
								v-model="nuevoCliente.ruc"
								type="text"
								class="rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="flex flex-col">
							<label
								for="distrito"
								class="block text-primary text-sm font-bold mb-1 ml-1"
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

					<div class="grid grid-cols-2 gap-4 mb-4">
						<div class="flex flex-col">
							<label
								for="direccion"
								class="block text-primary text-sm font-bold mb-1 ml-1"
								>Dirección</label
							>
							<input
								v-model="nuevoCliente.direccion"
								type="text"
								class="rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="flex flex-col">
							<label
								for="otroDato"
								class="block text-primary text-sm font-bold mb-1 ml-1"
								>Otro Dato</label
							>
							<input
								v-model="nuevoCliente.otroDato"
								type="text"
								class="rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 px-2 py-2"
							/>
						</div>
					</div>

					<div class="grid grid-cols-4 gap-4 mb-10">
						<div class="flex flex-col">
							<label
								for="carga"
								class="block text-primary text-sm font-bold mb-1 ml-1"
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

						<div class="flex flex-col">
							<label
								for="pago"
								class="block text-primary text-sm font-bold mb-1 ml-1"
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

						<div class="flex flex-col">
							<label
								for="comprobante"
								class="block text-primary text-sm font-bold mb-1 ml-1"
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
								class="block text-primary text-sm font-bold mb-1 ml-1"
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
			nuevoCliente: new Cliente(),
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
			console.error(error);
		}
	},
	methods: {
		handleNuevoCliente() {
			this.message = "";
			this.submitted = true;
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
