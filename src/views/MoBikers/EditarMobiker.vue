<template>
	<div class="w-full">
		<div class="bg-gray-100 shadow-lg rounded-xl mx-auto py-4 px-8 mt-10">
			<div class="flex justify-end">
				<h1
					class="inline-block text-2xl text-primary text-center font-bold mb-4 rounded relative -top-12 py-2 bg-gray-100 px-6"
				>
					Editar MoBiker
				</h1>
			</div>

			<form
				class="-mt-10"
				@submit.prevent="handleEditarMobiker"
				autocomplete="off"
			>
				<div class="grid grid-cols-4 gap-4 mb-4">
					<div class="flex flex-col">
						<label
							for="nombres"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Nombres</label
						>
						<input
							v-model="editarMobiker.nombres"
							v-validate="'required'"
							type="text"
							name="nombres"
							class="rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 p-2"
						/>
						<div
							v-if="errors.has('nombres')"
							class="bg-red-500 text-white text-sm rounded p-2"
						>
							<p>El nombre es requerido</p>
						</div>
					</div>

					<div class="flex flex-col">
						<label
							for="apellidos"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Apellidos</label
						>
						<input
							v-model="editarMobiker.apellidos"
							type="text"
							v-validate="'required'"
							name="apellidos"
							class="rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 p-2"
						/>
						<div
							v-if="errors.has('apellidos')"
							class="bg-red-500 text-white text-sm rounded p-2"
						>
							<p>Los apellidos son requeridos</p>
						</div>
					</div>

					<div class="flex flex-col">
						<label
							for="telefono"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Teléfono</label
						>
						<input
							v-model="editarMobiker.telefono"
							type="text"
							v-validate="'required|length:9'"
							name="telefono"
							class="rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 p-2"
						/>
						<div
							v-if="errors.has('telefono')"
							class="bg-red-500 text-white text-sm rounded p-2"
						>
							<p>El teléfono es requerido</p>
						</div>
					</div>

					<div class="flex flex-col">
						<label
							for="telegram"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Usuario Telegram</label
						>
						<input
							v-model="editarMobiker.telegram"
							type="text"
							v-validate="'required'"
							name="telegram"
							class="rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 p-2"
						/>
						<div
							v-if="errors.has('telegram')"
							class="bg-red-500 text-white text-sm rounded p-2"
						>
							<p>El Telegram es requerido</p>
						</div>
					</div>
				</div>

				<div class="grid grid-cols-4 gap-4 mb-4">
					<div class="flex flex-col">
						<label
							for="direccion"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Dirección</label
						>
						<input
							v-model="editarMobiker.direccion"
							type="text"
							v-validate="'required'"
							name="direccion"
							class="rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 p-2"
						/>
						<div
							v-if="errors.has('direccion')"
							class="bg-red-500 text-white text-sm rounded p-2"
						>
							<p>La dirección es requerida</p>
						</div>
					</div>

					<div class="flex flex-col">
						<label
							for="distrito"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Distrito</label
						>
						<model-list-select
							name="distrito"
							v-model="editarMobiker.distrito"
							v-validate="'required'"
							placeholder="Buscar distrito..."
							:list="distritos"
							option-text="distrito"
							option-value="distrito"
						/>
						<div
							v-if="errors.has('distrito')"
							class="bg-red-500 text-white text-sm rounded p-2"
						>
							<p>El distrito es requerido</p>
						</div>
					</div>

					<div class="flex flex-col">
						<label
							for="tipoDocumento"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Tipo de Documento</label
						>
						<model-list-select
							v-model="editarMobiker.tipoDocumento"
							v-validate="'required'"
							name="tipoDocumento"
							:list="tiposDocumentos"
							option-text="doc"
							option-value="doc"
						/>
						<div
							v-if="errors.has('tipoDocumento')"
							class="bg-red-500 text-white text-sm rounded p-2"
						>
							<p>El tipo de documento es requerido</p>
						</div>
					</div>

					<div class="flex flex-col">
						<label
							for="numeroDocumento"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Número de Documento</label
						>
						<input
							v-model="editarMobiker.numeroDocumento"
							type="text"
							v-validate="'required|min:8|max:10'"
							name="numeroDocumento"
							class="rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 p-2"
						/>
						<div
							v-if="errors.has('numeroDocumento')"
							class="bg-red-500 text-white text-sm rounded p-2"
						>
							<p>El número de documento es requerido</p>
						</div>
					</div>
				</div>

				<div class="grid grid-cols-5 gap-4 mb-4">
					<div class="flex flex-col">
						<label
							for="genero"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Género</label
						>
						<model-list-select
							v-model="editarMobiker.genero"
							:list="generos"
							v-validate="'required'"
							name="genero"
							option-text="gen"
							option-value="gen"
						/>
						<div
							v-if="errors.has('genero')"
							class="bg-red-500 text-white text-sm rounded p-2"
						>
							<p>El Género es requerido</p>
						</div>
					</div>

					<div class="flex flex-col">
						<label
							for="fechaNacimiento"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Fecha de Nacimiento</label
						>
						<input
							v-model="editarMobiker.fechaNacimiento"
							type="date"
							v-validate="'required'"
							name="fechaNacimiento"
							class="rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 p-2"
						/>
						<div
							v-if="errors.has('fechaNacimiento')"
							class="bg-red-500 text-white text-sm rounded p-2"
						>
							<p>La fecha de Nacimiento es requerida</p>
						</div>
					</div>

					<div class="flex flex-col">
						<label
							for="email"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Email</label
						>
						<input
							v-model="editarMobiker.email"
							type="email"
							v-validate="'required'"
							name="email"
							class="rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 p-2"
						/>
						<div
							v-if="errors.has('email')"
							class="bg-red-500 text-white text-sm rounded p-2"
						>
							<p>El email es requerido</p>
						</div>
					</div>

					<div class="flex flex-col">
						<label
							for="tipoBicicleta"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Tipo de Bicicleta</label
						>
						<model-list-select
							v-model="editarMobiker.tipoBicicleta"
							:list="tipoBicicletas"
							v-validate="'required'"
							name="tipoBicicleta"
							option-text="bici"
							option-value="bici"
						/>
						<div
							v-if="errors.has('tipoBicicleta')"
							class="bg-red-500 text-white text-sm rounded p-2"
						>
							<p>El tipo de bicicleta es requerido</p>
						</div>
					</div>

					<div class="flex flex-col">
						<label
							for="equipo"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Equipo</label
						>
						<model-list-select
							v-model="editarMobiker.equipo"
							:list="equipoDeTrabajo"
							v-validate="'required'"
							name="equipo"
							option-text="equipo"
							option-value="equipo"
						/>
						<div
							v-if="errors.has('equipo')"
							class="bg-red-500 text-white text-sm rounded p-2"
						>
							<p>El equipo es requerido</p>
						</div>
					</div>
				</div>

				<div class="grid grid-cols-4 gap-4 mb-10">
					<div class="flex flex-col">
						<label
							for="fechaIngreso"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Fecha de Ingreso</label
						>
						<input
							v-model="editarMobiker.fechaIngreso"
							v-validate="'required'"
							name="fechaIngreso"
							type="date"
							class="rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 p-2"
						/>
						<div
							v-if="errors.has('fechaIngreso')"
							class="bg-red-500 text-white text-sm rounded p-2"
						>
							<p>La fecha de ingreso es requerida</p>
						</div>
					</div>

					<div class="flex flex-col">
						<label
							for="banco"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Entidad Financiera</label
						>
						<model-list-select
							v-model="editarMobiker.banco"
							v-validate="'required'"
							name="banco"
							:list="entidadesBancarias"
							option-text="banco"
							option-value="banco"
						/>
						<div
							v-if="errors.has('banco')"
							class="bg-red-500 text-white text-sm rounded p-2"
						>
							<p>El banco es requerido</p>
						</div>
					</div>

					<div class="flex flex-col">
						<label
							for="tipoCuenta"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Tipo de Cuenta Bancaria</label
						>
						<model-list-select
							v-model="editarMobiker.tipoCuenta"
							:list="cuentaBancaria"
							v-validate="'required'"
							name="tipoCuenta"
							option-text="cuenta"
							option-value="cuenta"
						/>
						<div
							v-if="errors.has('tipoCuenta')"
							class="bg-red-500 text-white text-sm rounded p-2"
						>
							<p>El tipo de cuenta es requerido</p>
						</div>
					</div>

					<div class="flex flex-col">
						<label
							for="numeroCuentaBancaria"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Número de Cuenta Bancaria</label
						>
						<input
							v-model="editarMobiker.numeroCuentaBancaria"
							type="text"
							class="rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 p-2"
						/>
					</div>
				</div>

				<div class="flex flex-row justify-between mb-6">
					<button
						@click="cancelar"
						type="button"
						class="block mx-auto bg-red-500 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition duration-200"
					>
						Cancelar
					</button>

					<button
						type="submit"
						class="block mx-auto bg-info hover:bg-secondary text-white font-bold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition duration-200"
					>
						Editar MoBiker
					</button>
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
	name: "EditarMobiker",
	data() {
		return {
			editarMobiker: new Mobiker(),
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
			this.getMobiker(this.$route.params.id);

			let resDistritos = await AuxiliarService.getDistritos();
			let resBancos = await AuxiliarService.getEntidadesBancarias();

			this.distritos = resDistritos.data;
			this.entidadesBancarias = resBancos.data;
		} catch (error) {
			console.error(error);
		}
	},
	methods: {
		async getMobiker(id) {
			try {
				let response = await MobikerService.getMobikerById(id);

				this.editarMobiker = response.data;
				this.editarMobiker.fechaNacimiento = this.$date(
					response.data.fechaNacimiento
				).format("YYYY-MM-DD");
				this.editarMobiker.fechaIngreso = this.$date(
					response.data.fechaIngreso
				).format("YYYY-MM-DD");
			} catch (error) {
				console.error("Mensaje de error:", error);
			}
		},

		handleEditarMobiker() {
			this.$validator
				.validateAll()
				.then((isValid) => {
					if (!isValid) {
						return;
					} else {
						MobikerService.editMobiker(
							this.$route.params.id,
							this.editarMobiker
						).then(
							(response) => {
								this.$router.push("/mobikers/equipo-mobiker");
								console.log(response.data.message);
								this.message = response.data.message;
							},
							(err) => console.error(err)
						);
					}
				})
				.catch((err) => console.error(err));
		},

		cancelar() {
			this.$router.push("/mobikers/equipo-mobiker");
		},
	},
	components: {
		ModelListSelect,
	},
};
</script>
