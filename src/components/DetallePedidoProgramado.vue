<template>
	<div
		v-if="showDetalle"
		class="bg-primary w-1/2 h-auto absolute top-14 left-1/4 z-40 py-4 px-10 rounded-xl shadow-xl"
	>
		<div class="absolute -top-4 -right-2">
			<button
				class="rounded-full bg-info hover:bg-secondary px-2 text-2xl focus:outline-none text-white"
				@click.prevent="cerrarDetalle"
			>
				<font-awesome-icon icon="times" />
			</button>
		</div>

		<!-- <div class="flex justify-center">
			<h1
				class="bg-white inline-block text-2xl text-primary font-bold px-6 pt-1 rounded-t-xl"
			>
				Pedido #<span class="text-red-500">{{ currentPedido.id }}</span>
			</h1>
		</div> -->

		<!-- <div class="hidden">
			<pre>
Tipo Envío: **{{ currentPedido.tipoDeEnvio.tipo }}**
__Origen:__ {{ currentPedido.direccionRemitente }} - {{
					currentPedido.distritoRemitente
				}}
__Empresa:__ {{ currentPedido.empresaRemitente }}
__Contacto:__ {{ currentPedido.contactoRemitente }} - {{
					currentPedido.telefonoRemitente
				}}
{{
					currentPedido.otroDatoRemitente
						? "**IMPORTANTE:" + currentPedido.otroDatoRemitente
						: null
				}}

__Destino:__ {{ currentPedido.direccionConsignado }} - {{
					currentPedido.distrito.distrito
				}}
__Contacto:__ {{ currentPedido.contactoConsignado }} - {{
					currentPedido.empresaConsignado
						? "- __Empresa:__" + currentPedido.empresaConsignado
						: null
				}}
__Teléfono:__ {{ currentPedido.telefonoConsignado }}
__Llevar:__ {{ currentPedido.tipoCarga }}
__Modalidad:__ {{ currentPedido.modalidad.tipo }}
{{
					currentPedido.otroDatoConsignado
						? "**IMPORTANTE:" + currentPedido.otroDatoConsignado
						: null
				}}

__Tarifa:__ S/. {{ currentPedido.tarifa }}
__Mi comisión:__ S/. {{ currentPedido.comision }}
__Pedido:__ #{{ currentPedido.id }}
__CO2:__ {{ currentPedido.CO2Ahorrado }} Kg
__Horas de Ruido:__ {{ currentPedido.ruido }} h</pre
			>
		</div> -->

		<form class="grid grid-cols-2 gap-x-4 bg-white p-4 rounded-t-xl">
			<div>
				<label
					for="status"
					class="block text-primary text-sm font-bold mb-1 ml-1"
					>Estado del Pedido</label
				>
				<model-list-select
					name="status"
					v-model="pedidoAsignado.statusId"
					:list="estadosPedido"
					v-validate="'required'"
					option-text="tag"
					option-value="id"
				/>
				<div
					v-if="errors.has('status')"
					class="bg-red-500 text-white text-sm rounded p-2"
				>
					<p>El estado es requerido</p>
				</div>
			</div>

			<div>
				<label
					for="mobiker"
					class="block text-primary text-sm font-bold mb-1 ml-1"
					>MoBiker</label
				>
				<model-list-select
					name="mobiker"
					v-model="pedidoAsignado.mobiker"
					placeholder="Buscar MoBiker..."
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
		</form>

		<div class="grid grid-cols-4 text-center font-bold text-white my-2">
			<h4>#</h4>
			<h4>Cliente</h4>
			<h4>Origen</h4>
			<h4>Destino</h4>
		</div>

		<div class="h-72 bg-white p-2 overflow-y-auto">
			<div
				class="grid grid-cols-4 text-center mb-2"
				v-for="pedido in pedidosArray"
				:key="pedido.id"
			>
				<p>
					{{ pedido.id }}
				</p>

				<p>
					{{ pedido.contactoRemitente }}
				</p>

				<p>
					{{ pedido.distritoRemitente }}
				</p>

				<p>
					{{ pedido.distrito.distrito }}
				</p>
			</div>
		</div>

		<div class="mt-6 flex flex-row justify-around">
			<button
				type="button"
				@click="handleAsignarPedido"
				class="bg-green-600 rounded-xl px-6 py-2 font-bold text-white focus:outline-none hover:bg-green-500"
			>
				Asignar MoBiker
			</button>

			<button
				v-if="comandaCopiada === false"
				class="bg-secondary text-white font-bold px-4 py-2 rounded-xl focus:outline-none hover:bg-info"
				@click="copiarComanda"
			>
				Copiar
			</button>

			<button
				v-else
				class="bg-green-600 text-white font-bold px-4 py-2 rounded-xl focus:outline-none hover:bg-green-500"
				@click="copiarComanda"
			>
				Copiado
			</button>
		</div>
	</div>
</template>

<script>
import AuxiliarService from "@/services/auxiliares.service";
import MobikerService from "@/services/mobiker.service";
import { ModelListSelect } from "vue-search-select";
import PedidoService from "@/services/pedido.service";

export default {
	name: "DetallePedidoProgramado",
	props: {
		showDetalle: {
			type: Boolean,
			required: true,
		},
		pedidosArray: {
			type: Array,
		},
	},
	components: {
		ModelListSelect,
	},
	data() {
		return {
			pedidoAsignado: {
				statusId: 1,
				mobiker: "Asignar MoBiker",
			},
			mobikers: [],
			estadosPedido: [],
			comandaCopiada: false,
		};
	},
	async mounted() {
		let estados = await AuxiliarService.getStatusPedidos();
		let mobiker = await MobikerService.getMobikers();

		this.estadosPedido = estados.data;

		this.mobikers = mobiker.data.filter(
			(mobiker) => mobiker.status === "Activo"
		);
	},
	methods: {
		handleAsignarPedido() {
			const isValid = this.$validator.validateAll();
			if (!isValid) {
				console.error("Mensaje de error: No se pudo asignar el Pedido");
				return;
			}

			this.pedidosArray.forEach((pedido) => {
				PedidoService.asignarPedido(pedido.id, this.pedidoAsignado)
					.then((response) => {
						console.log(response.data.message);
						this.cerrarDetalle();
					})
					.catch((error) =>
						console.error(`Mensaje de error: ${error.message}`)
					);
			});
		},

		copiarComanda() {
			// console.log(this.$el.children[2].children[0].innerText);
			this.$copyText(this.$el.children[2].children[0].innerText).then(() => {
				this.comandaCopiada = true;
				console.log("Texto copiado");
			});
		},

		cerrarDetalle() {
			this.$emit("cerrarDetalle");
			this.comandaCopiada = false;
			this.pedidoAsignado.statusId = 1;
			this.pedidoAsignado.mobiker = "Asignar MoBiker";
			this.refresh();
		},

		refresh() {
			this.$emit("refresh");
		},
	},
};
</script>
