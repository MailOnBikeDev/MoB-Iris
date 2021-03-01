<template>
	<div class="bg-gray-100 shadow-lg rounded-xl mx-auto py-4 px-8 mt-10">
		<div class="flex justify-end">
			<h1
				class="inline-block text-2xl text-primary text-center font-bold mb-4 rounded relative -top-12 py-2 bg-gray-100 px-6"
			>
				Editar Cliente
			</h1>
		</div>

		<form
			class="-mt-10"
			@submit.prevent="handleEditarCliente"
			autocomplete="off"
		>
			<div class="grid grid-cols-3 gap-4 mb-4">
				<div class="flex flex-col">
					<label
						for="contacto"
						class="block text-primary text-sm font-bold mb-1 ml-1"
						>Contacto</label
					>
					<input
						v-model="editarCliente.contacto"
						v-validate="'required'"
						type="text"
						name="contacto"
						class="rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 px-2 py-2"
					/>
					<div
						v-if="errors.has('contacto')"
						class="bg-red-500 text-white text-sm rounded p-2"
					>
						<p>El contacto es requerido</p>
					</div>
				</div>

				<div class="flex flex-col">
					<label
						for="empresa"
						class="block text-primary text-sm font-bold mb-1 ml-1"
						>Razón Social</label
					>
					<input
						v-model="editarCliente.empresa"
						v-validate="'required'"
						type="text"
						name="empresa"
						class="rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 px-2 py-2"
					/>
					<div
						v-if="errors.has('empresa')"
						class="bg-red-500 text-white text-sm rounded p-2"
					>
						<p>La empresa es requerida</p>
					</div>
				</div>

				<div class="flex flex-col">
					<label
						for="telefono"
						class="block text-primary text-sm font-bold mb-1 ml-1"
						>Teléfono</label
					>
					<input
						v-model="editarCliente.telefono"
						v-validate="'required|length:9'"
						type="text"
						name="telefono"
						class="rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 px-2 py-2"
					/>
					<div
						v-if="errors.has('telefono')"
						class="bg-red-500 text-white text-sm rounded p-2"
					>
						<p>El telefono es requerido y debe tener 9 caracteres</p>
					</div>
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
						v-model="editarCliente.email"
						v-validate="'required'"
						type="text"
						name="email"
						class="rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 px-2 py-2"
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
						for="ruc"
						class="block text-primary text-sm font-bold mb-1 ml-1"
						>RUC</label
					>
					<input
						v-model="editarCliente.ruc"
						v-validate="'length:11'"
						name="ruc"
						type="text"
						class="rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 px-2 py-2"
					/>
					<div
						v-if="errors.has('ruc')"
						class="bg-red-500 text-white text-sm rounded p-2"
					>
						<p>El RUC debe tener 11 números</p>
					</div>
				</div>

				<div class="flex flex-col">
					<label
						for="distrito"
						class="block text-primary text-sm font-bold mb-1 ml-1"
						>Distrito</label
					>
					<model-list-select
						v-validate="'required'"
						name="distrito"
						v-model="editarCliente.distrito"
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
			</div>

			<div class="grid grid-cols-2 gap-4 mb-4">
				<div class="flex flex-col">
					<label
						for="direccion"
						class="block text-primary text-sm font-bold mb-1 ml-1"
						>Dirección</label
					>
					<input
						v-model="editarCliente.direccion"
						v-validate="'required'"
						name="direccion"
						type="text"
						class="rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 px-2 py-2"
					/>
					<div
						v-if="errors.has('direccion')"
						class="bg-red-500 text-white text-sm rounded p-2"
					>
						<p>La direccion es requerida</p>
					</div>
				</div>

				<div class="flex flex-col">
					<label
						for="otroDato"
						class="block text-primary text-sm font-bold mb-1 ml-1"
						>Otro Dato</label
					>
					<input
						v-model="editarCliente.otroDato"
						name="otroDato"
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
						v-validate="'required'"
						name="carga"
						v-model="editarCliente.carga"
						:list="tiposDeCarga"
						option-text="tipo"
						option-value="tipo"
					/>
					<div
						v-if="errors.has('carga')"
						class="bg-red-500 text-white text-sm rounded p-2"
					>
						<p>El tipo de carga es requerido</p>
					</div>
				</div>

				<div class="flex flex-col">
					<label
						for="pago"
						class="block text-primary text-sm font-bold mb-1 ml-1"
						>Forma de Pago</label
					>
					<model-list-select
						v-validate="'required'"
						name="pago"
						v-model="editarCliente.pago"
						:list="formasDePago"
						option-text="pago"
						option-value="pago"
					/>
					<div
						v-if="errors.has('pago')"
						class="bg-red-500 text-white text-sm rounded p-2"
					>
						<p>La forma de pago es requerida</p>
					</div>
				</div>

				<div class="flex flex-col">
					<label
						for="comprobante"
						class="block text-primary text-sm font-bold mb-1 ml-1"
						>Comprobante</label
					>
					<model-list-select
						v-validate="'required'"
						name="pago"
						v-model="editarCliente.comprobante"
						:list="comprobantes"
						option-text="tipo"
						option-value="tipo"
					/>
					<div
						v-if="errors.has('comprobante')"
						class="bg-red-500 text-white text-sm rounded p-2"
					>
						<p>El comprobante es requerido</p>
					</div>
				</div>

				<div class="flex flex-col">
					<label
						for="rol"
						class="block text-primary text-sm font-bold mb-1 ml-1"
						>Rol</label
					>
					<model-list-select
						v-validate="'required'"
						name="rol"
						v-model="editarCliente.rol"
						:list="rolesCliente"
						option-text="rol"
						option-value="rol"
					/>
					<div
						v-if="errors.has('rol')"
						class="bg-red-500 text-white text-sm rounded p-2"
					>
						<p>El rol es requerido</p>
					</div>
				</div>
			</div>

			<div class="flex flex-row justify-between mb-6">
				<button
					type="button"
					@click="cancelar"
					class="block mx-auto bg-red-500 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition duration-200 focus:outline-none"
				>
					Cancelar
				</button>

				<button
					type="submit"
					class="block mx-auto bg-info hover:bg-secondary text-white font-bold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition duration-200 focus:outline-none"
				>
					Editar Cliente
				</button>
			</div>
		</form>

		<div v-if="message" class="bg-green-500 p-4 text-white text-center">
			{{ message }}
		</div>
	</div>
</template>

<script>
import Cliente from "@/models/cliente";
import { ModelListSelect } from "vue-search-select";
import AuxiliarService from "@/services/auxiliares.service";
import ClienteService from "@/services/cliente.service";

export default {
	name: "EditarCliente",
	data() {
		return {
			editarCliente: new Cliente(),
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
			this.getCliente(this.$route.params.id);

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
		async getCliente(id) {
			try {
				let response = await ClienteService.getClienteById(id);

				this.editarCliente = response.data;

				this.editarCliente.carga = response.data.tipoDeCarga["tipo"];
				this.editarCliente.pago = response.data.formaDePago["pago"];
				this.editarCliente.comprobante =
					response.data.tipoDeComprobante["tipo"];
				this.editarCliente.rol = response.data.rolCliente["rol"];
			} catch (error) {
				console.error("Mensaje de error:", error);
			}
		},
		handleEditarCliente() {
			this.$validator.validateAll().then((isValid) => {
				if (!isValid) {
					return;
				} else {
					ClienteService.editCliente(this.$route.params.id, this.editarCliente)
						.then((response) => {
							this.$router.push("/clientes/tablero-clientes");
							console.log(response.data.message);
							this.message = response.data.message;
						})
						.catch((err) => {
							console.log(err);
						});
				}
			});
		},
		cancelar() {
			this.$router.push("/clientes/tablero-clientes");
		},
	},
	components: {
		ModelListSelect,
	},
};
</script>
