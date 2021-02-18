<template>
	<div class="w-full justify-center items-center">
		<div
			class="bg-gray-100 shadow-lg rounded-xl overflow-hidden mx-auto py-4 px-8 mt-6 "
		>
			<div class="flex justify-end">
				<h1
					class="inline-block bg-primary text-white text-center font-bold px-4 py-2 rounded-xl"
				>
					Nuevo Mobiker
				</h1>
			</div>

			<form
				class="mt-4"
				@submit.prevent="handleNuevoMobiker"
				autocomplete="off"
			>
				<div v-if="!successful">
					<div class="grid grid-cols-4 gap-4 mb-4">
						<div class="flex flex-col">
							<label
								for="nombres"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Nombres</label
							>
							<input
								v-model="nuevoMobiker.nombres"
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="flex flex-col">
							<label
								for="apellidos"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Apellidos</label
							>
							<input
								v-model="nuevoMobiker.apellidos"
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
								v-model="nuevoMobiker.telefono"
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="flex flex-col">
							<label
								for="telegram"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Usuario Telegram</label
							>
							<input
								v-model="nuevoMobiker.telegram"
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>
					</div>

					<div class="grid grid-cols-4 gap-4 mb-4">
						<div class="flex flex-col">
							<label
								for="direccion"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Dirección</label
							>
							<input
								v-model="nuevoMobiker.direccion"
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
								v-model="nuevoMobiker.distrito"
								placeholder="Buscar distrito..."
								:list="distritos"
								option-text="distrito"
								option-value="distrito"
							/>
						</div>

						<div class="flex flex-col">
							<label
								for="tipoDocumento"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Tipo de Documento</label
							>
							<model-list-select
								v-model="nuevoMobiker.tipoDocumento"
								:list="tiposDocumentos"
								option-text="doc"
								option-value="doc"
							/>
						</div>

						<div class="flex flex-col">
							<label
								for="numeroDocumento"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Número de Documento</label
							>
							<input
								v-model="nuevoMobiker.numeroDocumento"
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>
					</div>

					<div class="grid grid-cols-5 gap-4 mb-4">
						<div class="flex flex-col">
							<label
								for="genero"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Género</label
							>
							<model-list-select
								v-model="nuevoMobiker.genero"
								:list="generos"
								option-text="gen"
								option-value="gen"
							/>
						</div>

						<div class="flex flex-col">
							<label
								for="fechaNacimiento"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Fecha de Nacimiento</label
							>
							<input
								v-model="nuevoMobiker.fechaNacimiento"
								type="date"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="flex flex-col">
							<label
								for="email"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Email</label
							>
							<input
								v-model="nuevoMobiker.email"
								type="email"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="flex flex-col">
							<label
								for="tipoBicicleta"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Tipo de Bicicleta</label
							>
							<model-list-select
								v-model="nuevoMobiker.tipoBicicleta"
								:list="tipoBicicletas"
								option-text="bici"
								option-value="bici"
							/>
						</div>

						<div class="flex flex-col">
							<label
								for="equipo"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Equipo</label
							>
							<model-list-select
								v-model="nuevoMobiker.equipo"
								:list="equipoDeTrabajo"
								option-text="equipo"
								option-value="equipo"
							/>
						</div>
					</div>

					<div class="grid grid-cols-4 gap-4 mb-10">
						<div class="flex flex-col">
							<label
								for="fechaIngreso"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Fecha de Ingreso</label
							>
							<input
								v-model="nuevoMobiker.fechaIngreso"
								type="date"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="flex flex-col">
							<label
								for="banco"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Entidad Financiera</label
							>
							<model-list-select
								v-model="nuevoMobiker.banco"
								:list="entidadesBancarias"
								option-text="banco"
								option-value="banco"
							/>
						</div>

						<div class="flex flex-col">
							<label
								for="tipoCuenta"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Tipo de Cuenta Bancaria</label
							>
							<model-list-select
								v-model="nuevoMobiker.tipoCuenta"
								:list="cuentaBancaria"
								option-text="cuenta"
								option-value="cuenta"
							/>
						</div>

						<div class="flex flex-col">
							<label
								for="numeroCuentaBancaria"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Número de Cuenta Bancaria</label
							>
							<input
								v-model="nuevoMobiker.numeroCuentaBancaria"
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>
					</div>

					<div class="grid grid-cols-1 mb-4">
						<button
							class="block w-full bg-info hover:bg-blue-600 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
						>
							Crear Nuevo MoBiker
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import Mobiker from "@/models/mobiker";
import { ModelListSelect } from "vue-search-select";
import AuxiliarService from "@/services/auxiliares.service";
import MobikerService from "@/services/mobiker.service";

export default {
	name: "NuevoMobiker",
	data() {
		return {
			nuevoMobiker: new Mobiker(
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				""
			),
			submitted: false,
			successful: false,
			message: "",
			distritos: [],
			tiposDocumentos: [
				{ doc: "DNI" },
				{ doc: "Pasaporte" },
				{ doc: "Carnet de Extranjería" },
				{ doc: "PTP" },
			],
			generos: [
				{ gen: "Masculino" },
				{ gen: "Femenino" },
				{ gen: "No Binario" },
			],
			tipoBicicletas: [
				{ bici: "MTB" },
				{ bici: "Rutera/Fixie" },
				{ bici: "Cargo" },
			],
			equipoDeTrabajo: [
				{ equipo: "Caja Térmica" },
				{ equipo: "Jaba/Canastilla" },
				{ equipo: "Mochila" },
			],
			cuentaBancaria: [
				{ cuenta: "Sin Cuenta" },
				{ cuenta: "Cuenta de Ahorros" },
				{ cuenta: "Cuenta Corriente" },
			],
			entidadesBancarias: [],
		};
	},
	async mounted() {
		try {
			let resDistritos = await AuxiliarService.getDistritos();
			let resBancos = await AuxiliarService.getEntidadesBancarias();

			this.distritos = resDistritos.data;
			this.entidadesBancarias = resBancos.data;
		} catch (error) {
			console.error(error);
		}
	},
	methods: {
		handleNuevoMobiker() {
			MobikerService.storageNuevoMobiker(this.nuevoMobiker).then(
				() => {
					this.$router.push("/mobikers/equipo-mobiker");
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
