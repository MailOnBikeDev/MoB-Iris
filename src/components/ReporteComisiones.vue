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
				{{ mobiker.fullName }}
			</h1>
		</div>

		<div
			class="bg-white rounded-xl pedidos-scroll h-96 max-h-96 overflow-y-auto p-4 text-sm"
		>
			<div v-for="detalle in detalles" :key="detalle.id">
				<p>
					{{ $date(detalle.fecha).format("DD/MM") }}: {{ detalle.id }} - [{{
						detalle.contactoConsignado.toUpperCase()
					}}] = {{ detalle.tarifa }} {{ detalle.formaPago }}
				</p>
			</div>
			<br />
			<div>
				<p>Envíos E-commerce = {{ contarEcommerce }}</p>
				<p>Envíos Express = {{ contarExpress }}</p>
				<p>Total de envíos = {{ detalles.length }}</p>
				<br />

				<p>Tarifas E-commerce = {{ calcularTarifaEcommerce }}</p>
				<p>Tarifas Express = {{ calcularTarifaExpress }}</p>
				<p>
					Total de tarifas =
					{{
						parseFloat(calcularTarifaEcommerce + calcularTarifaExpress).toFixed(
							2
						)
					}}
				</p>
				<br />

				<p>Comisiones E-commerce = {{ calcularComisionEcommerce }}</p>
				<p>Comisiones Express = {{ calcularComisionExpress }}</p>
				<p>
					Total de comisiones =
					{{
						parseFloat(
							calcularComisionEcommerce + calcularComisionExpress
						).toFixed(2)
					}}
				</p>
				<br />
				<p>Pagos en Efectivo = {{ calcularPagosEfectivo }}</p>
				<p>
					Total a pagar =
					{{
						parseFloat(
							calcularComisionEcommerce + calcularComisionExpress
						).toFixed(2) - parseFloat(calcularPagosEfectivo).toFixed(2)
					}}
				</p>
				<br />

				<p class="resalta">Mis Estadísticas:</p>
				<p>Mis BiciEnvíos = {{ mobiker.biciEnvios }}</p>
				<p>Mis Kilómetros = {{ mobiker.kilometros }}km</p>
				<p>CO2 Ahorrado = {{ mobiker.CO2Ahorrado }}kg</p>
				<p>Horas de Ruido Ahorrado = {{ mobiker.CO2Ahorrado }}h</p>
				<p>Mi nivel es: {{ mobiker.rango.rangoMoBiker }}</p>
			</div>
		</div>

		<div class="flex justify-center mt-4">
			<button
				v-if="reporteCopiado === false"
				class="bg-secondary text-white font-bold px-4 py-2 rounded-xl focus:outline-none hover:bg-info"
				@click="copiarReporte"
			>
				Copiar
			</button>

			<button
				v-else
				class="bg-green-600 text-white font-bold px-4 py-2 rounded-xl focus:outline-none hover:bg-green-500"
				@click="copiarReporte"
			>
				Copiado
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "ReporteComisiones",
	props: {
		showDetalle: {
			type: Boolean,
			required: true,
		},
		detalles: {
			type: Array,
		},
		mobiker: {
			type: Object,
		},
	},
	data() {
		return { reporteCopiado: false };
	},
	computed: {
		contarEcommerce() {
			let contadorEcommerce = 0;

			this.detalles.map((pedido) => {
				if (pedido.tipoDeEnvioId === 1) {
					contadorEcommerce++;
				}
			});

			return contadorEcommerce;
		},

		calcularTarifaEcommerce() {
			let tarifaEcommerce = 0;

			this.detalles.map((pedido) => {
				if (pedido.tipoDeEnvioId === 1) {
					tarifaEcommerce += pedido.tarifa;
				}
			});

			return tarifaEcommerce.toFixed(2);
		},

		calcularComisionEcommerce() {
			let comisionEcommerce = 0;

			this.detalles.map((pedido) => {
				if (pedido.tipoDeEnvioId === 1) {
					comisionEcommerce += pedido.comision;
				}
			});

			return comisionEcommerce.toFixed(2);
		},

		contarExpress() {
			let contadorExpress = 0;

			this.detalles.map((pedido) => {
				if (pedido.tipoDeEnvioId === 3) {
					contadorExpress++;
				}
			});

			return contadorExpress;
		},

		calcularTarifaExpress() {
			let tarifaExpress = 0;

			this.detalles.map((pedido) => {
				if (pedido.tipoDeEnvioId === 3) {
					tarifaExpress += pedido.tarifa;
				}
			});

			return tarifaExpress.toFixed(2);
		},

		calcularComisionExpress() {
			let comisionExpress = 0;

			this.detalles.map((pedido) => {
				if (pedido.tipoDeEnvioId === 3) {
					comisionExpress += pedido.comision;
				}
			});

			return comisionExpress.toFixed(2);
		},

		calcularPagosEfectivo() {
			let pagoEfectivo = 0;

			this.detalles.map((pedido) => {
				if (
					(pedido.tipoDeEnvioId === 1 || pedido.tipoDeEnvioId === 3) &&
					(pedido.formaPago === "Efectivo en Origen" ||
						pedido.formaPago === "Efectivo en Destino")
				) {
					pagoEfectivo += pedido.tarifa;
				}
			});

			return pagoEfectivo.toFixed(2);
		},
	},
	methods: {
		cerrarDetalle() {
			this.$emit("cerrarDetalle");
			this.reporteCopiado = false;
		},

		copiarReporte() {
			console.log(this.$el.children[2].innerText);
			this.$copyText(this.$el.children[2].innerText).then(() => {
				this.reporteCopiado = true;
				console.log("Texto copiado");
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.pedidos-scroll::-webkit-scrollbar {
	width: 0.5rem;
	background: white;

	&-thumb {
		background: #52678e;
		border-radius: 1rem;
	}
}
</style>
