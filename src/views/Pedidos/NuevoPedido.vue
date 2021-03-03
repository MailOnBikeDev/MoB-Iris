<template>
	<div class="bg-gray-100 shadow-lg rounded-xl mx-auto p-4 my-12">
		<div class="flex justify-end">
			<h1
				class="inline-block text-2xl text-primary text-center font-bold mb-4 rounded-xl relative -top-12 py-2 bg-gray-100 px-6"
			>
				Nuevo Pedido
			</h1>
		</div>

		<div class="px-4 flex flex-row justify-around -mt-12">
			<div>
				<button
					class="bg-primary text-white px-4 py-1 rounded-xl focus:outline-none font-bold"
					@click="showBuscador = true"
				>
					Buscar cliente
				</button>
			</div>

			<BuscadorCliente
				:showBuscador="showBuscador"
				@cerrarBuscador="showBuscador = false"
				@activarCliente="activarCliente"
			/>

			<div>
				<button
					class="bg-primary text-white px-4 py-1 rounded-xl focus:outline-none font-bold"
					@click="calcularDistancia"
				>
					Calcular distancia
				</button>
			</div>
		</div>

		<form class="mt-2 h-full p-2" autocomplete="off">
			<div class="grid grid-cols-2 h-full">
				<div class="text-3xl text-primary font-bold px-1 text-center">
					<h2>Origen</h2>
				</div>

				<div class="text-3xl text-primary font-bold px-1 text-center">
					<h2>Destino</h2>
				</div>

				<!-- FORMULARIO ORIGEN -->
				<div class="grid grid-cols-3 gap-2 p-2">
					<div>
						<button
							class="mt-5 bg-secondary py-2 w-full rounded text-white font-bold focus:outline-none"
							@click="asignarHoy()"
							type="button"
						>
							Para hoy
						</button>
					</div>

					<div>
						<button
							class="mt-5 bg-secondary py-2 w-full rounded text-white font-bold focus:outline-none"
							@click="asignarMañana()"
							type="button"
						>
							Para mañana
						</button>
					</div>

					<div>
						<label for="fecha" class="block text-primary text-sm font-bold ml-1"
							>Fecha Seleccionada</label
						>
						<p class="bg-white rounded w-full h-10 tex-gray-700 p-2">
							{{ $date(nuevoPedido.fecha).format("DD/MM/YYYY") }}
						</p>
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
							v-if="errors.has('direccionRemitente') || errorCalcularDistancia"
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
							v-if="errors.has('distritoRemitente') || errorCalcularDistancia"
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
							v-if="errors.has('direccionConsignado') || errorCalcularDistancia"
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
							v-if="errors.has('distritoConsignado') || errorCalcularDistancia"
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

					<div class="col-span-2">
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
							for="recaudo"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Recaudo</label
						>
						<input
							v-model.number="nuevoPedido.recaudo"
							type="number"
							class="rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 p-2"
						/>
					</div>

					<div>
						<label
							for="tramite"
							class="block text-primary text-sm font-bold mb-1 ml-1"
							>Trámite</label
						>
						<input
							v-model.number="nuevoPedido.tramite"
							type="number"
							class="rounded w-full text-gray-700 focus:outline-none border-b-4 focus:border-info transition duration-500 p-2"
						/>
					</div>
				</div>
			</div>

			<div class="flex flex-row justify-between mt-2">
				<button
					@click="cancelar"
					type="button"
					class="block mx-auto bg-red-500 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition duration-200 focus:outline-none"
				>
					Cancelar
				</button>

				<button
					type="submit"
					@click.prevent="handleAnadirPedido"
					class="block mx-auto bg-green-500 hover:bg-green-700 text-white font-bold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition duration-200 focus:outline-none"
				>
					Añadir otro Pedido
				</button>

				<button
					type="submit"
					@click.prevent="handleNuevoPedido"
					class="block mx-auto bg-info hover:bg-secondary text-white font-bold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition duration-200 focus:outline-none"
				>
					Crear Nuevo Pedido
				</button>
			</div>
		</form>
	</div>
</template>

<script>
import axios from "axios";
import Pedido from "@/models/pedido";
import { ModelListSelect } from "vue-search-select";
import AuxiliarService from "@/services/auxiliares.service";
import MobikerService from "@/services/mobiker.service";
import PedidoService from "@/services/pedido.service";
import BuscadorCliente from "@/components/BuscadorCliente";
import googleMaps_API from "@/googleMaps-API";

export default {
	data() {
		return {
			nuevoPedido: new Pedido(),
			showBuscador: false,
			message: "",
			errorCalcularDistancia: false,
			distritos: [],
			tiposDeCarga: [],
			formasDePago: [],
			rolesCliente: [],
			modalidades: [],
			mobikers: [],
			tiposDeEnvio: [],
			rolDelCliente: "",
			tarifaSugerida: null,
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
			let comision = this.nuevoPedido.tarifa * 0.6;
			return comision.toFixed(2);
		},

		sugerirTarifa() {
			let tarifaPorKm = 0.8;
			let tarifaSugerida = this.nuevoPedido.distancia * tarifaPorKm;
			return tarifaSugerida.toFixed(2);
		},
	},
	methods: {
		handleNuevoPedido() {
			this.$validator.validateAll().then((isValid) => {
				if (!isValid) {
					console.error("Mensaje de error: No se pudo crear el Pedido");
					return;
				} else {
					PedidoService.storageNuevoPedido(this.nuevoPedido).then(
						() => {
							this.$router.push("/pedidos/tablero-pedidos");
						},
						(err) => console.error(`Mensaje de error: ${err.message}`)
					);
				}
			});
		},

		handleAnadirPedido() {
			this.$validator.validateAll().then((isValid) => {
				if (!isValid) {
					console.error("Mensaje de error: No se pudo crear el Pedido");
					return;
				} else {
					PedidoService.storageNuevoPedido(this.nuevoPedido).then(
						() => {
							console.log("El pedido fue añadido correctamente");

							this.nuevoPedido.contactoConsignado = "";
							this.nuevoPedido.empresaConsignado = "";
							this.nuevoPedido.telefonoConsignado = "";
							this.nuevoPedido.direccionConsignado = "";
							this.nuevoPedido.distritoConsignado = "";
							this.nuevoPedido.otroDatoConsignado = "";
						},
						(err) => console.error(`Mensaje de error: ${err.message}`)
					);
				}
			});
		},

		async calcularDistancia() {
			try {
				if (
					!(
						this.nuevoPedido.direccionRemitente &&
						this.nuevoPedido.distritoRemitente &&
						this.nuevoPedido.direccionConsignado &&
						this.nuevoPedido.distritoConsignado
					)
				) {
					this.errorCalcularDistancia = true;
					console.error("Mensaje de error: No se pudo calcular la distancia");
					return;
				}

				let origen = `${this.nuevoPedido.direccionRemitente.replace(
					/ /g,
					"%20"
				)}%20${this.nuevoPedido.distritoRemitente.replace(/ /g, "%20")}`;
				let destino = `${this.nuevoPedido.direccionConsignado.replace(
					/ /g,
					"%20"
				)}%20${this.nuevoPedido.distritoConsignado.replace(/ /g, "%20")}`;

				console.log("Origen:", origen);
				console.log("Destino:", destino);

				const API_URL = `${googleMaps_API.BASE_URL}/json?&origins=${origen}&destinations=${destino}&mode=walking&key=${process.env.VUE_APP_GOOGLEMAPS_API_KEY}`;

				let distancia = await axios.get(API_URL);
				console.log(distancia);
				this.nuevoPedido.distancia = distancia.data.route.distance.toFixed(3);
				this.nuevoPedido.tarifa = 7.0;
				this.nuevoPedido.CO2Ahorrado = (
					this.nuevoPedido.distancia / 12
				).toFixed(1);
				this.nuevoPedido.ruido = (this.nuevoPedido.distancia / 24).toFixed(2);
				this.nuevoPedido.recaudo = 0;
				this.nuevoPedido.tramite = 0;

				console.log(`
					\n distancia: ${this.nuevoPedido.distancia} Km,
					\n CO2: ${this.nuevoPedido.CO2Ahorrado} Kg,
					\n ruido: ${this.nuevoPedido.ruido} h`);

				return (
					this.nuevoPedido.distancia,
					this.nuevoPedido.tarifa,
					this.nuevoPedido.CO2Ahorrado,
					this.nuevoPedido.ruido
				);
			} catch (error) {
				console.error("Mensaje de error: ", error.message);
			}
		},

		cancelar() {
			this.$router.push("/pedidos/tablero-pedidos");
		},

		activarCliente(cliente) {
			if (cliente) {
				this.nuevoPedido.contactoRemitente = cliente.contacto;
				this.nuevoPedido.empresaRemitente = cliente.empresa;
				this.nuevoPedido.telefonoRemitente = cliente.telefono;
				this.nuevoPedido.direccionRemitente = cliente.direccion;
				this.nuevoPedido.distritoRemitente = cliente.distrito.distrito;
				this.nuevoPedido.otroDatoRemitente = cliente.otroDato;
				this.nuevoPedido.tipoCarga = cliente.tipoDeCarga.tipo;
				this.nuevoPedido.formaPago = cliente.formaDePago.pago;
				this.nuevoPedido.status = 100;
				this.nuevoPedido.statusFinanciero = 1;
				this.rolDelCliente = cliente.rolCliente.rol;
			}
		},

		asignarHoy() {
			let hoy = new Date();
			console.log(`Fecha de hoy: ${this.$date(hoy).format("DD/MM/YYYY")}`);
			return (this.nuevoPedido.fecha = this.$date(hoy).format("YYYY/MM/DD"));
		},

		asignarMañana() {
			let hoy = new Date();
			let DIA_EN_MS = 24 * 60 * 60 * 1000;
			let manana = new Date(hoy.getTime() + DIA_EN_MS);
			console.log(`Fecha mañana: ${this.$date(manana).format("DD/MM/YYYY")}`);
			return (this.nuevoPedido.fecha = this.$date(manana).format("YYYY/MM/DD"));
		},
	},
	components: {
		ModelListSelect,
		BuscadorCliente,
	},
};
</script>
