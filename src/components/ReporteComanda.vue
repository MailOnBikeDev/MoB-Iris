<template>
	<div
		v-if="showComanda"
		class="bg-primary w-1/2 h-auto absolute top-14 left-1/4 z-40 py-4 px-10 rounded-xl shadow-xl"
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
				class="bg-white inline-block text-2xl text-primary font-bold px-6 pt-1 rounded-t-xl"
			>
				Pedido #<span class="text-red-500">{{ currentPedido.id }}</span>
			</h1>
		</div>

		<div class="bg-white rounded-xl justify-center">
			<!-- Texto formateado como mensaje de Telegram a copiar -->
			<div class="hidden">
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
			</div>

			<!-- Texto de ejemplo para que el operador confirme la comanda -->
			<div class="p-4">
				<div>
					<span class="resalta">Tipo Envío: </span
					>{{ currentPedido.tipoDeEnvio.tipo }}
				</div>
				<div>
					<span class="resalta">
						Origen:
					</span>
					{{ currentPedido.direccionRemitente }} -
					{{ currentPedido.distritoRemitente }}
				</div>
				<div>
					<span class="resalta">Empresa: </span
					>{{ currentPedido.empresaRemitente }}
				</div>
				<div>
					<span class="resalta">
						Contacto:
					</span>
					{{ currentPedido.contactoRemitente }} -
					{{ currentPedido.telefonoRemitente }}
				</div>
				<div v-if="currentPedido.otroDatoRemitente !== null">
					<span class="resalta">IMPORTANTE: </span
					>{{ currentPedido.otroDatoRemitente }}
				</div>
				<br />
				<div>
					<span class="resalta"> Destino: </span
					>{{ currentPedido.direccionConsignado }} -

					{{ currentPedido.distrito.distrito }}
				</div>
				<div>
					<span class="resalta">Contacto: </span>
					{{ currentPedido.contactoConsignado }}
				</div>
				<div v-if="currentPedido.empresaConsignado !== null">
					<span class="resalta">Empresa: </span>
					{{ currentPedido.empresaConsignado }}
				</div>
				<div v-if="currentPedido.otroDatoConsignado !== null">
					<span class="resalta">IMPORTANTE: </span
					>{{ currentPedido.otroDatoConsignado }}
				</div>
				<div>
					<span class="resalta">Teléfono: </span>
					{{ currentPedido.telefonoConsignado }}
				</div>
				<div>
					<span class="resalta">Llevar: </span> {{ currentPedido.tipoCarga }}
				</div>
				<div>
					<span class="resalta">Modalidad: </span>
					{{ currentPedido.modalidad.tipo }}
				</div>
				<br />
				<div>
					<span class="resalta">Tarifa: </span> S/. {{ currentPedido.tarifa }}
				</div>
				<div>
					<span class="resalta">Mi comisión: </span> S/.
					{{ currentPedido.comision }}
				</div>
				<div><span class="resalta">Pedido: </span> #{{ currentPedido.id }}</div>
				<div>
					<span class="resalta">CO2: </span> {{ currentPedido.CO2Ahorrado }} Kg
				</div>
				<div>
					<span class="resalta">Horas de Ruido: </span>
					{{ currentPedido.ruido }} h
				</div>
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
			// console.log(this.$el.children[2].children[0].innerText);
			this.$copyText(this.$el.children[2].children[0].innerText).then(() => {
				this.comandaCopiada = true;
				console.log("Texto copiado");
			});
		},
	},
};
</script>
