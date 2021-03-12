<template>
	<div
		v-if="showComanda"
		class="bg-primary w-auto h-auto absolute top-14 left-1/3 z-40 py-4 px-10 rounded-xl shadow-xl"
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
				Pedido #<span class="text-red-500">{{ currentPedido.id }}</span>
			</h1>
		</div>

		<div class="bg-white rounded-xl">
			<!-- Texto formateado como mensaje de Telegram a copiar -->
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
				<span v-if="currentPedido.otroDatoConsignado !== null">
					**IMPORTANTE: {{ currentPedido.otroDatoConsignado }}**
				</span>
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

			<!-- Texto de ejemplo para que el operador confirme la comanda -->
			<div class="flex flex-col p-4">
				<p>
					<span class="resalta">Tipo Envío: </span
					>{{ currentPedido.tipoDeEnvio.tipo }}
				</p>
				<p>
					<span class="resalta">
						Origen:
					</span>
					{{ currentPedido.direccionRemitente }} -
					{{ currentPedido.distritoRemitente }}
				</p>
				<p>
					<span class="resalta">Empresa: </span
					>{{ currentPedido.empresaRemitente }}
				</p>
				<p>
					<span class="resalta">
						Contacto:
					</span>
					{{ currentPedido.contactoRemitente }} -
					{{ currentPedido.telefonoRemitente }}
				</p>
				<p v-if="currentPedido.otroDatoRemitente !== null">
					<span class="resalta">IMPORTANTE: </span
					>{{ currentPedido.otroDatoRemitente }}
				</p>
				<br />
				<p>
					<span class="resalta"> Destino: </span
					>{{ currentPedido.direccionConsignado }} -

					{{ currentPedido.distrito.distrito }}
				</p>
				<p>
					<span class="resalta">Contacto: </span>
					{{ currentPedido.contactoConsignado }}
				</p>
				<p v-if="currentPedido.empresaConsignado !== null">
					<span class="resalta">Empresa: </span>
					{{ currentPedido.empresaConsignado }}
				</p>
				<p v-if="currentPedido.otroDatoConsignado !== null">
					<span class="resalta">IMPORTANTE: </span
					>{{ currentPedido.otroDatoConsignado }}
				</p>
				<p>
					<span class="resalta">Teléfono: </span>
					{{ currentPedido.telefonoConsignado }}
				</p>
				<p>
					<span class="resalta">Llevar: </span> {{ currentPedido.tipoCarga }}
				</p>
				<p>
					<span class="resalta">Modalidad: </span>
					{{ currentPedido.modalidad.tipo }}
				</p>
				<br />
				<p>
					<span class="resalta">Tarifa: </span> S/. {{ currentPedido.tarifa }}
				</p>
				<p>
					<span class="resalta">Mi comisión: </span> S/.
					{{ currentPedido.comision }}
				</p>
				<p><span class="resalta">Pedido: </span> #{{ currentPedido.id }}</p>
				<p>
					<span class="resalta">CO2: </span> {{ currentPedido.CO2Ahorrado }} Kg
				</p>
				<p>
					<span class="resalta">Horas de Ruido: </span>
					{{ currentPedido.ruido }} h
				</p>
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
			this.comandaCopiada = false;
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
