<template>
	<div class="bg-gray-100 shadow-lg rounded-xl mx-auto p-4 my-12">
		<div class="flex justify-end">
			<h1
				class="inline-block text-2xl text-primary text-center font-bold mb-4 rounded relative -top-12 py-2 bg-gray-100 px-6"
			>
				Nuevo Pedido
			</h1>
		</div>

		<div class="px-4 flex flex-row justify-between -mt-12">
			<div>
				<input
					type="text"
					class="rounded text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 p-1"
					placeholder="Buscar cliente..."
					v-model="buscador"
					v-on:keyup.enter="searchCliente"
				/>

				<button
					type="button"
					class="bg-white ml-2 py-1 px-2 rounded font-bold hover:bg-info hover:text-white focus:outline-none"
					@click="searchCliente"
				>
					Buscar
				</button>
			</div>

			<div>
				<button
					class="bg-primary text-white px-4 py-1 rounded"
					@click="calcularDistancia"
				>
					Calcular distancia
				</button>
			</div>
		</div>

		<form
			class="mt-2 h-full p-2"
			@submit.prevent="handleNuevoPedido"
			autocomplete="off"
		>
			<div class="grid grid-cols-2 h-full">
				<div class="text-3xl text-primary font-bold px-1 text-center">
					<h2>Origen</h2>
				</div>

				<div class="text-3xl text-primary font-bold px-1 text-center">
					<h2>Destino</h2>
				</div>

				<!-- FORMULARIO ORIGEN -->
				<div class="grid grid-cols-3 gap-2 p-2">
					<div class="col-span-3 ">
						<label for="fecha" class="block text-primary text-sm font-bold ml-1"
							>Fecha</label
						>
						<input
							v-model="nuevoPedido.fecha"
							type="date"
							class="rounded text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 p-2"
						/>
					</div>

					<div>
						<label
							for="contactoRemitente"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Contacto</label
						>
						<input
							v-model="nuevoPedido.contactoRemitente"
							type="text"
							v-validate="'required'"
							name="contactoRemitente"
							class="rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 p-2"
						/>
						<div
							v-if="errors.has('contactoRemitente')"
							class="bg-red-500 text-white text-sm rounded p-2"
						>
							<p>El contacto del cliente es requerido</p>
						</div>
					</div>

					<div>
						<label
							for="empresaRemitente"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Empresa</label
						>
						<input
							v-model="nuevoPedido.empresaRemitente"
							type="text"
							v-validate="'required'"
							name="empresaRemitente"
							class="rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 p-2"
						/>
						<div
							v-if="errors.has('empresaRemitente')"
							class="bg-red-500 text-white text-sm rounded p-2"
						>
							<p>La empresa del cliente es requerida</p>
						</div>
					</div>

					<div>
						<label
							for="telefonoRemitente"
							class=" text-primary text-sm font-bold mb-1 ml-1"
							>Teléfono</label
						>
						<input
							v-model="nuevoPedido.telefonoRemitente"
							type="text"
							v-validate="'required|length:9'"
							name="telefonoRemitente"
							class="rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 p-2"
						/>
						<div
							v-if="errors.has('telefonoRemitente')"
							class="bg-red-500 text-white text-sm rounded p-2"
						>
							<p>El teléfono es requerido</p>
						</div>
					</div>

					<div class=" col-span-2">
						<label
							for="direccionRemitente"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Direccion</label
						>
						<input
							v-model="nuevoPedido.direccionRemitente"
							type="text"
							v-validate="'required'"
							name="direccionRemitente"
							class="rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 p-2"
						/>
						<div
							v-if="errors.has('direccionRemitente')"
							class="bg-red-500 text-white text-sm rounded p-2"
						>
							<p>La dirección es requerida</p>
						</div>
					</div>

					<div>
						<label
							for="distritoRemitente"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Distrito</label
						>
						<model-list-select
							name="distritoRemitente"
							v-model="nuevoPedido.distritoRemitente"
							v-validate="'required'"
							placeholder="Buscar distrito..."
							class="w-full"
							:list="distritos"
							option-text="distrito"
							option-value="distrito"
						/>
						<div
							v-if="errors.has('distritoRemitente')"
							class="bg-red-500 text-white text-sm rounded p-2"
						>
							<p>El distrito es requerido</p>
						</div>
					</div>

					<div class="col-span-3">
						<label
							for="otroDatoRemitente"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Otro Dato</label
						>
						<input
							v-model="nuevoPedido.otroDatoRemitente"
							type="text"
							class="rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 p-2"
						/>
					</div>

					<div>
						<label
							for="formaPago"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Forma de pago</label
						>
						<model-list-select
							name="formaPago"
							v-model="nuevoPedido.formaPago"
							class="w-full"
							v-validate="'required'"
							:list="formasDePago"
							option-text="pago"
							option-value="pago"
						/>
						<div
							v-if="errors.has('formaPago')"
							class="bg-red-500 text-white text-sm rounded p-2"
						>
							<p>La forma de pago es requerida</p>
						</div>
					</div>

					<div>
						<label
							for="tarifa"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Tarifa</label
						>
						<input
							v-model.number="nuevoPedido.tarifa"
							type="number"
							v-validate="'required'"
							name="tarifa"
							class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 p-2"
						/>
						<div
							v-if="errors.has('tarifa')"
							class="bg-red-500 text-white text-sm rounded p-2"
						>
							<p>La tarifa es requerida</p>
						</div>
					</div>

					<div>
						<label
							for="tarifaSugerida"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Tarifa Sugerida</label
						>
						<p class="bg-white rounded w-full h-10 tex-gray-700 p-2">
							{{ (tarifaSugerida = sugerirTarifa) }}
						</p>
					</div>

					<div class="col-span-2">
						<label
							for="tipoCarga"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Tipo de Carga</label
						>
						<model-list-select
							name="tipoCarga"
							v-model="nuevoPedido.tipoCarga"
							:list="tiposDeCarga"
							v-validate="'required'"
							option-text="tipo"
							option-value="tipo"
						/>
						<div
							v-if="errors.has('tipoCarga')"
							class="bg-red-500 text-white text-sm rounded p-2"
						>
							<p>El tipo de carga es requerido</p>
						</div>
					</div>

					<div>
						<label
							for="rol"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Rol</label
						>
						<model-list-select
							name="rolCliente"
							:list="rolesCliente"
							v-model="rolDelCliente"
							v-validate="'required'"
							option-text="rol"
							option-value="rol"
						/>
						<div
							v-if="errors.has('rolCliente')"
							class="bg-red-500 text-white text-sm rounded p-2"
						>
							<p>El rol del cliente es requerido</p>
						</div>
					</div>
				</div>

				<!-- FORMULARIO DESTINO -->
				<div class="grid grid-cols-3 gap-2  p-2">
					<div>
						<label
							for="tipoEnvio"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Tipo de Envío</label
						>
						<model-list-select
							name="tipoEnvio"
							v-model="nuevoPedido.tipoEnvio"
							v-validate="'required'"
							:list="tiposDeEnvio"
							option-text="tipo"
							option-value="tipo"
						/>
						<div
							v-if="errors.has('tipoEnvio')"
							class="bg-red-500 text-white text-sm rounded p-2"
						>
							<p>El tipo de Envío es requerido</p>
						</div>
					</div>

					<div class="col-span-2">
						<label
							for="modalidad"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Modalidad</label
						>
						<model-list-select
							name="modalidad"
							v-model="nuevoPedido.modalidad"
							v-validate="'required'"
							:list="modalidades"
							option-text="tipo"
							option-value="tipo"
						/>
						<div
							v-if="errors.has('modalidad')"
							class="bg-red-500 text-white text-sm rounded p-2"
						>
							<p>La modalidad es requerida</p>
						</div>
					</div>

					<div>
						<label
							for="contactoConsignado"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Contacto</label
						>
						<input
							v-model="nuevoPedido.contactoConsignado"
							type="text"
							v-validate="'required'"
							name="contactoConsignado"
							class="rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 p-2"
						/>
						<div
							v-if="errors.has('contactoConsignado')"
							class="bg-red-500 text-white text-sm rounded p-2"
						>
							<p>El contacto es requerido</p>
						</div>
					</div>

					<div>
						<label
							for="empresaConsignado"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Empresa</label
						>
						<input
							v-model="nuevoPedido.empresaConsignado"
							type="text"
							name="empresaConsignado"
							class="rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 p-2"
						/>
					</div>

					<div>
						<label
							for="telefonoConsignado"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Teléfono</label
						>
						<input
							v-model="nuevoPedido.telefonoConsignado"
							type="text"
							v-validate="'required|length:9'"
							name="telefonoConsignado"
							class="rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 p-2"
						/>
						<div
							v-if="errors.has('telefonoConsignado')"
							class="bg-red-500 text-white text-sm rounded p-2"
						>
							<p>El telefono es requerido y debe tener 9 caracteres</p>
						</div>
					</div>

					<div class="col-span-2">
						<label
							for="direccionConsignado"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Dirección</label
						>
						<input
							v-model="nuevoPedido.direccionConsignado"
							type="text"
							v-validate="'required'"
							name="direccionConsignado"
							class="rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 p-2"
						/>
						<div
							v-if="errors.has('direccionConsignado')"
							class="bg-red-500 text-white text-sm rounded p-2"
						>
							<p>La dirección es requerida</p>
						</div>
					</div>

					<div>
						<label
							for="distritoConsignado"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Distrito</label
						>
						<model-list-select
							name="distritoConsignado"
							v-model="nuevoPedido.distritoConsignado"
							placeholder="Buscar distrito..."
							v-validate="'required'"
							:list="distritos"
							option-text="distrito"
							option-value="distrito"
						/>
						<div
							v-if="errors.has('distritoConsignado')"
							class="bg-red-500 text-white text-sm rounded p-2"
						>
							<p>El distrito es requerido</p>
						</div>
					</div>

					<div class="col-span-3">
						<label
							for="otroDatoConsignado"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Otro Dato</label
						>
						<input
							v-model="nuevoPedido.otroDatoConsignado"
							type="text"
							class="rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 p-2"
						/>
					</div>

					<div>
						<label
							for="comision"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Comisión</label
						>
						<p class="bg-white rounded w-full h-10 tex-gray-700 p-2">
							{{ (nuevoPedido.comision = calcularComision) }}
						</p>
					</div>

					<div class=" col-span-2">
						<label
							for="mobiker"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Mobiker</label
						>
						<model-list-select
							name="mobiker"
							v-model="nuevoPedido.mobiker"
							placeholder="Buscar distrito..."
							:list="mobikers"
							v-validate="'required'"
							option-text="fullName"
							option-value="fullName"
						/>
						<div
							v-if="errors.has('mobiker')"
							class="bg-red-500 text-white text-sm rounded p-2"
						>
							<p>El MoBiker es requerido</p>
						</div>
					</div>

					<div>
						<label
							for="distancia"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Distancia</label
						>
						<p class="bg-white rounded w-full h-10 tex-gray-700 p-2">
							{{ nuevoPedido.distancia }}
						</p>
					</div>

					<div>
						<label
							for="CO2Ahorrado"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>CO2 Ahorrado</label
						>
						<p class="bg-white rounded w-full h-10 tex-gray-700 p-2">
							{{ (nuevoPedido.CO2Ahorrado = calcularCO2) }}
						</p>
					</div>

					<div>
						<label
							for="ruido"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Ruido Ahorrado</label
						>
						<p class="bg-white rounded w-full h-10 tex-gray-700 p-2">
							{{ (nuevoPedido.ruido = calcularRuido) }}
						</p>
					</div>
				</div>
			</div>

			<div class="flex flex-row justify-between mt-2">
				<button
					@click="cancelar"
					type="button"
					class="block mx-auto bg-red-500 hover:bg-red-700 text-white font-bold px-10 py-4 rounded-lg shadow-lg hover:shadow-xl transition duration-200"
				>
					Cancelar
				</button>

				<button
					type="submit"
					class="block mx-auto bg-info hover:bg-secondary text-white font-bold px-10 py-4 rounded-lg shadow-lg hover:shadow-xl transition duration-200"
				>
					Crear Nuevo Pedido
				</button>
			</div>
		</form>
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
			message: "",
			buscador: "",
			distritos: [],
			tiposDeCarga: [],
			formasDePago: [],
			rolesCliente: [],
			modalidades: [],
			mobikers: [],
			tiposDeEnvio: [],
			rolDelCliente: "",
			tarifaSugerida: "",
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
	computed: {
		calcularComision() {
			return this.nuevoPedido.tarifa * 0.6;
		},

		sugerirTarifa() {
			return this.nuevoPedido.tarifa + 5;
		},

		calcularCO2() {
			return this.nuevoPedido.distancia / 12;
		},

		calcularRuido() {
			return this.nuevoPedido.distancia / 24;
		},
	},
	methods: {
		handleNuevoPedido() {
			this.$validator.validateAll().then((isValid) => {
				if (!isValid) {
					return;
				} else {
					PedidoService.storageNuevoPedido(this.nuevoPedido).then(
						() => {
							this.$router.push("/pedidos/tablero-pedidos");
						},
						(err) => console.log(err)
					);
				}
			});
		},

		calcularDistancia() {
			this.nuevoPedido.distancia = 6.7;
			this.nuevoPedido.tarifa = 7.0;
			return this.nuevoPedido.distancia, this.nuevoPedido.tarifa;
		},

		cancelar() {
			this.$router.push("/pedidos/tablero-pedidos");
		},

		async searchCliente() {
			try {
				let findCliente = await ClienteService.searchCliente(this.buscador);

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

				this.nuevoPedido.status = 100;
				this.nuevoPedido.statusFinanciero = 1;

				this.rolDelCliente = this.cliente.rolCliente.rol;

				this.buscador = "";
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
