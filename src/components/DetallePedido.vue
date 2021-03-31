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

		<!-- Caso Cliente es Origen -->
		<div
			v-if="currentPedido.rolCliente === 'Remitente'"
			class="bg-white rounded-xl grid grid-cols-2 gap-x-8 p-4"
		>
			<div class="grid grid-flow-row text-sm py-2 px-4">
				<h2 class="text-3xl text-primary font-bold mb-4 text-center">
					Origen
				</h2>
				<p class="mb-2">
					<span class="resalta">Fecha: </span>
					{{ $date(currentPedido.fecha).format("DD MMM YYYY") }}
				</p>
				<p class="mb-2">
					<span class="resalta">Carga: </span>
					{{ currentPedido.tipoCarga }}
				</p>
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
					<span class="resalta">Teléfono: </span
					>{{ currentPedido.telefonoRemitente }}
				</p>
				<p class="mb-2">
					<span class="resalta">Otro dato: </span
					>{{ currentPedido.otroDatoRemitente }}
				</p>
				<p class="mb-2">
					<span class="resalta">Forma de Pago: </span
					>{{ currentPedido.formaPago }}
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
					<span class="resalta">Estado: </span
					>{{ currentPedido.status.codigo }} - {{ currentPedido.status.tag }}
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
				<p class="mb-2">
					<span class="resalta">Teléfono: </span
					>{{ currentPedido.telefonoConsignado }}
				</p>
				<p class="mb-2" v-if="currentPedido.otroDatoConsignado">
					<span class="resalta">Otro dato: </span
					>{{ currentPedido.otroDatoConsignado }}
				</p>
				<p class="mb-2">
					<span class="resalta">MoBiker: </span
					>{{ currentPedido.mobiker.fullName }}
				</p>
				<p class="mb-2">
					<span class="resalta">Comisión: </span>S/.
					{{ currentPedido.comision }}
				</p>
				<p class="mb-2">
					<span class="resalta">Distancia: </span
					>{{ currentPedido.distancia }}Km
				</p>
				<p class="mb-2">
					<span class="resalta">CO2 Ahorrado: </span
					>{{ currentPedido.CO2Ahorrado }}Kg
				</p>
				<p class="mb-2">
					<span class="resalta">Horas de Ruido: </span
					>{{ currentPedido.ruido }}h
				</p>
			</div>
		</div>

		<!-- Caso Cliente es Destino -->
		<div v-else class="bg-white rounded-xl grid grid-cols-2 gap-x-8 p-4">
			<div class="grid grid-flow-row text-sm py-2 px-4">
				<h2 class="text-3xl text-primary font-bold mb-4 text-center">
					Origen
				</h2>
				<p class="mb-2">
					<span class="resalta">Fecha: </span>
					{{ $date(currentPedido.fecha).format("DD MMM YYYY") }}
				</p>
				<p class="mb-2">
					<span class="resalta">Carga: </span>
					{{ currentPedido.tipoCarga }}
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
				<p class="mb-2">
					<span class="resalta">Teléfono: </span
					>{{ currentPedido.telefonoConsignado }}
				</p>
				<p class="mb-2" v-if="currentPedido.otroDatoConsignado">
					<span class="resalta">Otro dato: </span
					>{{ currentPedido.otroDatoConsignado }}
				</p>
				<p class="mb-2">
					<span class="resalta">Forma de Pago: </span
					>{{ currentPedido.formaPago }}
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
					<span class="resalta">Estado: </span
					>{{ currentPedido.status.codigo }} - {{ currentPedido.status.tag }}
				</p>
				<p class="mb-2">
					<span class="resalta">Modalidad: </span
					>{{ currentPedido.modalidad.tipo }}
				</p>
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
					<span class="resalta">Teléfono: </span
					>{{ currentPedido.telefonoRemitente }}
				</p>
				<p class="mb-2">
					<span class="resalta">Otro dato: </span
					>{{ currentPedido.otroDatoRemitente }}
				</p>
				<p class="mb-2">
					<span class="resalta">MoBiker: </span
					>{{ currentPedido.mobiker.fullName }}
				</p>
				<p class="mb-2">
					<span class="resalta">Comisión: </span>S/.
					{{ currentPedido.comision }}
				</p>
				<p class="mb-2">
					<span class="resalta">Distancia: </span
					>{{ currentPedido.distancia }}Km
				</p>
				<p class="mb-2">
					<span class="resalta">CO2 Ahorrado: </span
					>{{ currentPedido.CO2Ahorrado }}Kg
				</p>
				<p class="mb-2">
					<span class="resalta">Horas de Ruido: </span
					>{{ currentPedido.ruido }}h
				</p>
			</div>
		</div>

		<div class="mt-6 flex flex-row justify-around">
			<router-link
				:to="`/pedidos/tablero-pedidos/${currentPedido.id}`"
				custom
				v-slot="{ navigate }"
				class="bg-green-600 rounded-xl px-6 py-2 font-bold text-white focus:outline-none hover:bg-green-500"
			>
				<span @click="navigate" role="link" class="text-center cursor-pointer"
					>Editar Pedido</span
				>
			</router-link>

			<button
				@click.prevent="emitirComanda"
				class="bg-secondary rounded-xl px-6 py-2 font-bold text-white focus:outline-none hover:bg-info"
			>
				Emitir comanda
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "ReporteDetalle",
	props: {
		showDetalle: {
			type: Boolean,
			required: true,
		},
		currentPedido: {
			type: Object,
		},
	},
	data() {
		return {};
	},
	methods: {
		cerrarDetalle() {
			this.$emit("cerrarDetalle");
		},
		emitirComanda() {
			this.$emit("cerrarDetalle");
			this.$emit("emitirComanda");
		},
	},
};
</script>
