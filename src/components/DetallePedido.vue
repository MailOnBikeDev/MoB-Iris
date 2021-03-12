<template>
	<div
		v-if="showDetalle"
		class="bg-primary w-auto h-auto absolute top-36 left-1/4 z-40 py-4 px-10 rounded-xl shadow-xl"
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

		<div class="bg-white rounded-xl grid grid-cols-4 gap-x-16 p-4">
			<div class="grid grid-flow-row col-span-2 text-sm">
				<h2 class="text-3xl text-primary font-bold mb-4 text-center">
					Cliente
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
					<span class="resalta">Modalidad: </span
					>{{ currentPedido.modalidad.tipo }}
				</p>
				<p class="mb-2"><span class="resalta">Rol: </span>Remitente</p>
			</div>

			<div class="grid grid-flow-row col-span-2 text-sm">
				<h2 class="text-3xl text-primary font-bold mb-4 text-center">
					Consignado
				</h2>
				<p class="mb-2">
					<span class="resalta">Contacto: </span>
					{{ currentPedido.contactoConsignado }}
				</p>
				<p class="mb-2">
					<span class="resalta">Empresa: </span
					>{{ currentPedido.empresaConsignado }}
				</p>
				<p class="mb-2">
					<span class="resalta">Dirección: </span
					>{{ currentPedido.direccionConsignado }}
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
					<span class="resalta">Modalidad: </span
					>{{ currentPedido.modalidad.tipo }}
				</p>
			</div>
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
	},
};
</script>
