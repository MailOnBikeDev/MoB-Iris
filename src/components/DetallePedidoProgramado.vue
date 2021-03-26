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

		<div class="flex justify-center">
			<h1
				class="bg-white inline-block text-2xl text-primary font-bold px-6 pt-1 rounded-t-xl"
			>
				Pedido #<span class="text-red-500">{{ currentPedido.id }}</span>
			</h1>
		</div>

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

		<div class="bg-white rounded-b-xl grid grid-cols-2 gap-x-8 p-4">
			<div class="grid grid-flow-row text-sm py-2 px-4">
				<h2 class="text-3xl text-primary font-bold mb-4 text-center">
					Origen
				</h2>

				<p class="mb-2">
					<span class="resalta">Contacto: </span>
					{{ currentPedido.contactoRemitente }}
				</p>
				<p class="mb-2">
					<span class="resalta">Empresa: </span
					>{{ currentPedido.empresaRemitente }}
				</p>
				<p class="mb-2">
					<span class="resalta">Dirección: </span
					>{{ currentPedido.direccionRemitente }}
				</p>
				<p class="mb-2">
					<span class="resalta">Distrito: </span
					>{{ currentPedido.distritoRemitente }}
				</p>
				<p class="mb-2">
					<span class="resalta">Otro dato: </span
					>{{ currentPedido.otroDatoRemitente }}
				</p>
				<p class="mb-2">
					<span class="resalta">Tarifa: </span>S/.
					{{ currentPedido.tarifa }}
				</p>
				<p class="mb-2">
					<span class="resalta">Recaudo: </span>S/.
					{{ currentPedido.recaudo }}
				</p>
				<p class="mb-2">
					<span class="resalta">Trámite: </span>S/.
					{{ currentPedido.tramite }}
				</p>
			</div>

			<div class="grid grid-flow-row text-sm py-2 px-4">
				<h2 class="text-3xl text-primary font-bold mb-4 text-center">
					Destino
				</h2>
				<p class="mb-2">
					<span class="resalta">Carga: </span>
					{{ currentPedido.tipoCarga }}
				</p>
				<p class="mb-2">
					<span class="resalta">Modalidad: </span
					>{{ currentPedido.modalidad.tipo }}
				</p>
				<p class="mb-2">
					<span class="resalta">Contacto: </span>
					{{ currentPedido.contactoConsignado }}
				</p>
				<p class="mb-2" v-if="currentPedido.empresaConsignado">
					<span class="resalta">Empresa: </span
					>{{ currentPedido.empresaConsignado }}
				</p>
				<p class="mb-2">
					<span class="resalta">Dirección: </span
					>{{ currentPedido.direccionConsignado }}
				</p>
				<p class="mb-2">
					<span class="resalta">Distrito: </span
					>{{ currentPedido.distrito.distrito }}
				</p>
				<p class="mb-2" v-if="currentPedido.otroDatoConsignado">
					<span class="resalta">Otro dato: </span
					>{{ currentPedido.otroDatoConsignado }}
				</p>
				<p class="mb-2">
					<span class="resalta">Comisión: </span>S/.
					{{ currentPedido.comision }}
				</p>
				<p class="mb-2">
					<span class="resalta">Distancia: </span
					>{{ currentPedido.distancia }}Km
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
		currentPedido: {
			type: Object,
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
			this.$validator.validateAll().then((isValid) => {
				if (!isValid) {
					console.error("Mensaje de error: No se pudo asignar el Pedido");
					return;
				} else {
					PedidoService.asignarPedido(
						this.currentPedido.id,
						this.pedidoAsignado
					).then(
						(response) => {
							console.log(response.data.message);
							this.message = response.data.message;
							this.cerrarDetalle();
							this.refresh();
						},
						(err) => console.error(`Mensaje de error: ${err.message}`)
					);
				}
			});
		},

		cerrarDetalle() {
			this.$emit("cerrarDetalle");
		},

		refresh() {
			this.$emit("refresh");
		},
	},
};
</script>
