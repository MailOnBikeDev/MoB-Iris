<template>
	<div class="w-full justify-center items-center">
		<div
			class="bg-gray-100 shadow-lg rounded-xl overflow-hidden mx-auto py-4 px-8 mt-6"
		>
			<div class="flex justify-end">
				<h1
					class="inline-block bg-primary text-white text-center font-bold px-4 py-2 rounded-xl"
				>
					Nuevo Pedido
				</h1>
			</div>
			<div>
				<input
					type="text"
					class="bg-blue-100 text-white"
					v-model="cliente"
					v-on:keyup.enter="searchCliente"
				/>

				<button type="button" @click="searchCliente">
					Buscar
				</button>
			</div>

			<form class="mt-4" @submit.prevent="handleNuevoPedido" autocomplete="off">
				<div v-if="!successful" class="grid grid-cols-2 grid-flow-col gap-4">
					<div class="grid-cols-6 grid-flow-col">
						<h2>Cliente (Origen)</h2>

						<div class="grid-cols-6 grid-flow-col gap-4 mb-4">
							<label
								for="fecha"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Fecha</label
							>
							<input
								v-model="nuevoPedido.fecha"
								type="date"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="grid-cols-6 grid-flow-col gap-4 mb-4">
							<label
								for="contactoRemitente"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Contacto</label
							>
							<input
								v-model="nuevoPedido.contactoRemitente"
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="grid-cols-1 grid-flow-col gap-4 mb-4">
							<label
								for="empresaRemitente"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Empresa</label
							>
							<input
								v-model="nuevoPedido.empresaRemitente"
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="grid-cols-1 grid-flow-col gap-4 mb-4">
							<label
								for="telefonoRemitente"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Telefono</label
							>
							<input
								v-model="nuevoPedido.telefonoRemitente"
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="grid-cols-1 grid-flow-col gap-4 mb-4">
							<label
								for="direccionRemitente"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Direccion</label
							>
							<input
								v-model="nuevoPedido.direccionRemitente"
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="grid-cols-1 grid-flow-col gap-4 mb-4">
							<label
								for="distritoRemitente"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Distrito</label
							>
							<model-list-select
								name="distrito"
								v-model="nuevoPedido.distritoRemitente"
								placeholder="Buscar distrito..."
								:list="distritos"
								option-text="distrito"
								option-value="distrito"
							/>
						</div>

						<div class="grid-cols-1 grid-flow-col gap-4 mb-4">
							<label
								for="otroDatoRemitente"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Otro Dato</label
							>
							<input
								v-model="nuevoPedido.otroDatoRemitente"
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="grid-cols-1 grid-flow-col gap-4 mb-4">
							<label
								for="tipoCarga"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Tipo de Carga</label
							>
							<model-list-select
								name="carga"
								v-model="nuevoPedido.tipoCarga"
								:list="tiposDeCarga"
								option-text="tipo"
								option-value="tipo"
							/>
						</div>

						<div class="grid-cols-2 gap-4 mb-4">
							<label
								for="tarifa"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Tarifa</label
							>
							<input
								v-model="nuevoPedido.tarifa"
								type="number"
								class="bg-white rounded  text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>

							<label
								for="tarifaSugerida"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Tarifa Sugerida</label
							>
							<p></p>
						</div>

						<div class="grid-cols-1 grid-flow-col gap-4 mb-4">
							<label
								for="formaPago"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Forma de pago</label
							>
							<model-list-select
								name="formaPago"
								v-model="nuevoPedido.formaPago"
								:list="formasDePago"
								option-text="pago"
								option-value="pago"
							/>
						</div>

						<div class="grid-cols-1 grid-flow-col gap-4 mb-4">
							<label
								for="rol"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Rol</label
							>
							<model-list-select
								name="pago"
								:list="rolesCliente"
								option-text="rol"
								option-value="rol"
							/>
						</div>

						<div class="grid-cols-1 grid-flow-col gap-4 mb-4">
							<label
								for="tipoEnvio"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Tipo de Envío</label
							>
							<model-list-select
								name="tipoEnvio"
								v-model="nuevoPedido.tipoEnvio"
								:list="tiposDeEnvio"
								option-text="tipo"
								option-value="tipo"
							/>
						</div>
					</div>

					<div class="grid-cols-6">
						<h2>Cosignado (Destino)</h2>

						<div class="grid-cols-1 grid-flow-col gap-4 mb-4">
							<label
								for="contactoConsignado"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Contacto</label
							>
							<input
								v-model="nuevoPedido.contactoConsignado"
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="grid-cols-1 grid-flow-col gap-4 mb-4">
							<label
								for="empresaConsignado"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Empresa</label
							>
							<input
								v-model="nuevoPedido.empresaConsignado"
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="grid-cols-1 grid-flow-col gap-4 mb-4">
							<label
								for="direccionConsignado"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Dirección</label
							>
							<input
								v-model="nuevoPedido.direccionConsignado"
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="grid-cols-1 grid-flow-col gap-4 mb-4">
							<label
								for="distritoConsignado"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Distrito</label
							>
							<model-list-select
								name="distrito"
								v-model="nuevoPedido.distritoConsignado"
								placeholder="Buscar distrito..."
								:list="distritos"
								option-text="distrito"
								option-value="distrito"
							/>
						</div>

						<div class="grid-cols-1 grid-flow-col gap-4 mb-4">
							<label
								for="telefonoConsignado"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Teléfono</label
							>
							<input
								v-model="nuevoPedido.telefonoConsignado"
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="grid-cols-1 grid-flow-col gap-4 mb-4">
							<label
								for="otroDatoConsignado"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Otro Dato</label
							>
							<input
								v-model="nuevoPedido.otroDatoConsignado"
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="grid-cols-1 grid-flow-col gap-4 mb-4">
							<label
								for="mobiker"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Mobiker</label
							>
							<model-list-select
								name="distrito"
								v-model="nuevoPedido.mobiker"
								placeholder="Buscar distrito..."
								:list="mobikers"
								option-text="fullName"
								option-value="fullName"
							/>
						</div>

						<div class="grid-cols-1 grid-flow-col gap-4 mb-4">
							<label
								for="comision"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Comisión</label
							>
							<input
								v-model="nuevoPedido.comision"
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="grid-cols-1 grid-flow-col gap-4 mb-4">
							<label
								for="modalidad"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Modalidad</label
							>
							<model-list-select
								name="distrito"
								v-model="nuevoPedido.modalidad"
								:list="modalidades"
								option-text="tipo"
								option-value="tipo"
							/>
						</div>

						<div class="grid-cols-1 grid-flow-col gap-4 mb-4">
							<label
								for="distancia"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Distancia</label
							>
							<input
								v-model="nuevoPedido.distancia"
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="grid-cols-1 grid-flow-col gap-4 mb-4">
							<label
								for="CO2Ahorrado"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>CO2 Ahorrado</label
							>
							<input
								v-model="nuevoPedido.CO2Ahorrado"
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="grid-cols-1 grid-flow-col gap-4 mb-4">
							<label
								for="ruido"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Ruido Ahorrado</label
							>
							<input
								v-model="nuevoPedido.ruido"
								type="text"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="grid-cols-1 grid-flow-col gap-4 mb-4">
							<label
								for="status"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Estado</label
							>
							<input
								v-model="nuevoPedido.status"
								type="number"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>

						<div class="grid-cols-1 grid-flow-col gap-4 mb-4">
							<label
								for="statusFinanciero"
								class="block text-gray-700 text-sm font-bold mb-2 ml-3"
								>Estado Financiero</label
							>
							<input
								v-model="nuevoPedido.statusFinanciero"
								type="number"
								class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-2 py-2"
							/>
						</div>
					</div>
				</div>

				<div class="grid grid-cols-1 mb-4">
					<button
						class="block w-full bg-info hover:bg-blue-600 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
					>
						Crear Nuevo Pedido
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import Pedido from "@/models/pedido";
import { ModelListSelect } from "vue-search-select";
import AuxiliarService from "@/services/auxiliares.service";
import MobikerService from "@/services/mobiker.service";
import ClienteService from "@/services/cliente.service";
import PedidoService from "@/services/pedido.service";

export default {
	data() {
		return {
			nuevoPedido: new Pedido(),
			submitted: false,
			successful: false,
			message: "",
			cliente: "",
			distritos: [],
			tiposDeCarga: [],
			formasDePago: [],
			rolesCliente: [],
			modalidades: [],
			mobikers: [],
			tiposDeEnvio: [],
		};
	},
	async mounted() {
		try {
			let resDistritos = await AuxiliarService.getDistritos();
			let resCarga = await AuxiliarService.getTipoCarga();
			let pagos = await AuxiliarService.getFormasPago();
			let roles = await AuxiliarService.getRolCliente();
			let modalidad = await AuxiliarService.getModalidad();
			let envios = await AuxiliarService.getTipoEnvio();

			let mobiker = await MobikerService.getMobikers();

			this.distritos = resDistritos.data;
			this.tiposDeCarga = resCarga.data;
			this.formasDePago = pagos.data;
			this.rolesCliente = roles.data;
			this.modalidades = modalidad.data;
			this.tiposDeEnvio = envios.data;

			this.mobikers = mobiker.data;
		} catch (error) {
			console.error(error);
		}
	},
	methods: {
		handleNuevoPedido() {
			PedidoService.storageNuevoPedido(this.nuevoPedido).then(
				() => {
					this.$router.push("/pedidos/tablero-pedidos");
				},
				(err) => console.log(err)
			);
		},

		async searchCliente() {
			try {
				let findCliente = await ClienteService.searchCliente(this.cliente);

				// console.log(findCliente.data[0]);
				this.cliente = findCliente.data[0];
				this.nuevoPedido.contactoRemitente = this.cliente.contacto;
				this.nuevoPedido.empresaRemitente = this.cliente.empresa;
				this.nuevoPedido.telefonoRemitente = this.cliente.telefono;
				this.nuevoPedido.direccionRemitente = this.cliente.direccion;
				this.nuevoPedido.distritoRemitente = this.cliente.distrito.distrito;
				this.nuevoPedido.otroDatoRemitente = this.cliente.otroDato;
				this.nuevoPedido.tipoCarga = this.cliente.tipoDeCarga.tipo;
				this.nuevoPedido.formaPago = this.cliente.formaDePago.pago;
			} catch (error) {
				console.error(error);
			}
		},
	},
	components: {
		ModelListSelect,
	},
};
</script>
