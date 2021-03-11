<template>
	<div
		v-if="showComanda"
		class="bg-primary w-auto h-auto absolute top-24 left-1/3 z-40 p-8 rounded-xl shadow-xl"
	>
		<div class="absolute -top-4 -right-2">
			<button
				class="rounded-full bg-info hover:bg-secondary px-2 text-2xl focus:outline-none text-white"
				@click.prevent="cerrarComanda"
			>
				<font-awesome-icon icon="times" />
			</button>
		</div>

		<div class="flex justify-center">
			<h1
				class=" bg-white inline-block text-2xl text-primary font-bold px-6 pt-1 rounded-t-xl"
			>
				Comanda #{{ currentPedido.id }}
			</h1>
		</div>

		<div class="bg-white rounded-xl">
			<div class="flex-col p-4 hidden">
				<span> Tipo Envío: **{{ currentPedido.tipoDeEnvio.tipo }}** </span>
				<span>
					__Origen:__
					{{ currentPedido.direccionRemitente }} -
					{{ currentPedido.distritoRemitente }}
				</span>
				<span> __Empresa:__ {{ currentPedido.empresaRemitente }} </span>
				<span>
					__Contacto:__
					{{ currentPedido.contactoRemitente }} -
					{{ currentPedido.telefonoRemitente }}
				</span>
				<span v-if="currentPedido.otroDatoRemitente !== null">
					**IMPORTANTE: {{ currentPedido.otroDatoRemitente }}**
				</span>
				<br />
				<span>
					__Destino:__ {{ currentPedido.direccionConsignado }} -
					{{ currentPedido.distrito.distrito }}
				</span>
				<span> __Contacto:__ {{ currentPedido.contactoConsignado }} </span>
				<span v-if="currentPedido.empresaConsignado !== null"
					>__Empresa:__ {{ currentPedido.empresaConsignado }}</span
				>
				<span> __Teléfono:__ {{ currentPedido.telefonoConsignado }} </span>
				<span>__Llevar:__ {{ currentPedido.tipoCarga }}</span>
				<span>__Modalidad:__ {{ currentPedido.modalidad.tipo }}</span>
				<br />
				<span>__Tarifa:__ S/. {{ currentPedido.tarifa }}</span>
				<span>__Mi comisión:__ S/. {{ currentPedido.comision }}</span>
				<span>__Pedido:__ #{{ currentPedido.id }}</span>
				<span>__CO2:__ {{ currentPedido.CO2Ahorrado }} Kg</span>
				<span>__Horas de Ruido:__ {{ currentPedido.ruido }} h</span>
			</div>

			<div class="flex flex-col p-4">
				<span> Tipo Envío: **{{ currentPedido.tipoDeEnvio.tipo }}** </span>
				<span>
					__Origen:__
					{{ currentPedido.direccionRemitente }} -
					{{ currentPedido.distritoRemitente }}
				</span>
				<span> __Empresa:__ {{ currentPedido.empresaRemitente }} </span>
				<span>
					__Contacto:__
					{{ currentPedido.contactoRemitente }} -
					{{ currentPedido.telefonoRemitente }}
				</span>
				<span v-if="currentPedido.otroDatoRemitente !== null">
					**IMPORTANTE: {{ currentPedido.otroDatoRemitente }}**
				</span>
				<br />
				<span>
					__Destino:__ {{ currentPedido.direccionConsignado }} -
					{{ currentPedido.distrito.distrito }}
				</span>
				<span> __Contacto:__ {{ currentPedido.contactoConsignado }} </span>
				<span v-if="currentPedido.empresaConsignado !== null"
					>__Empresa:__ {{ currentPedido.empresaConsignado }}</span
				>
				<span> __Teléfono:__ {{ currentPedido.telefonoConsignado }} </span>
				<span>__Llevar:__ {{ currentPedido.tipoCarga }}</span>
				<span>__Modalidad:__ {{ currentPedido.modalidad.tipo }}</span>
				<br />
				<span>__Tarifa:__ S/. {{ currentPedido.tarifa }}</span>
				<span>__Mi comisión:__ S/. {{ currentPedido.comision }}</span>
				<span>__Pedido:__ #{{ currentPedido.id }}</span>
				<span>__CO2:__ {{ currentPedido.CO2Ahorrado }} Kg</span>
				<span>__Horas de Ruido:__ {{ currentPedido.ruido }} h</span>
			</div>
		</div>

		<div class="flex justify-center mt-4">
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
export default {
	name: "ReporteComanda",
	props: {
		showComanda: {
			type: Boolean,
			required: true,
		},
		currentPedido: {
			type: Object,
		},
	},
	data() {
		return {
			comandaCopiada: false,
		};
	},
	methods: {
		cerrarComanda() {
			this.$emit("cerrarComanda");
		},

		copiarComanda() {
			this.$copyText(this.$el.children[2].children[1].innerText).then(() => {
				this.comandaCopiada = true;
				console.log("Texto copiado");
			});
		},
	},
};
</script>

<style></style>
