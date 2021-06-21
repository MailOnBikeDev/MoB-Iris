<template>
  <div
    v-if="showDetalle"
    class="absolute z-40 w-1/2 h-auto px-10 py-4 shadow-xl bg-primary top-14 left-1/4 rounded-xl"
  >
    <div class="absolute -top-4 -right-2">
      <button
        class="px-2 text-2xl text-white rounded-full bg-info hover:bg-secondary focus:outline-none"
        @click.prevent="cerrarDetalle"
      >
        <font-awesome-icon icon="times" />
      </button>
    </div>

    <div class="flex justify-center">
      <h1
        class="inline-block px-6 pt-1 text-2xl font-bold bg-white text-primary rounded-t-xl"
      >
        {{ cliente.razonComercial }}
      </h1>
    </div>

    <div
      class="p-4 overflow-y-auto text-sm bg-white rounded-xl pedidos-scroll h-96 max-h-96"
    >
      <div v-for="detalle in detalles" :key="detalle.id">
        <p>
          {{ $date(detalle.fecha).format("DD/MM") }}: {{ detalle.id }} - [{{
            detalle.contactoConsignado.toUpperCase()
          }}] = {{ detalle.tarifa }}
        </p>
      </div>
      <br />
      <div>
        <p>
          Total de tarifas =
          {{ totalTarifa }}
        </p>
        <br />
        <p>Pagos en Efectivo = {{ pagosEfectivo }}</p>

        <p>
          Total a pagar =
          {{ totalPagar }}
        </p>
        <br />

        <p class="resalta">Mis Estadísticas:</p>
        <p>Mis BiciEnvíos = {{ cliente.biciEnvios }}</p>
        <p>Mis Kilómetros = {{ cliente.kilometros }}km</p>
        <p>CO2 Ahorrado = {{ cliente.CO2Ahorrado }}kg</p>
        <p>Horas de Ruido Ahorrado = {{ cliente.ruido }}h</p>
      </div>
    </div>

    <div class="flex justify-center mt-4">
      <button
        v-if="reporteCopiado === false"
        class="px-4 py-2 font-bold text-white bg-secondary rounded-xl focus:outline-none hover:bg-info"
        @click="copiarReporte"
      >
        Copiar
      </button>

      <button
        v-else
        class="px-4 py-2 font-bold text-white bg-green-600 rounded-xl focus:outline-none hover:bg-green-500"
        @click="copiarReporte"
      >
        Copiado
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReporteFacturacion",
  props: {
    showDetalle: {
      type: Boolean,
      required: true,
    },
    detalles: {
      type: Array,
    },
    cliente: {
      type: Object,
    },
  },
  data() {
    return { reporteCopiado: false };
  },
  computed: {
    totalTarifa() {
      let total = 0;
      this.detalles.forEach((detalle) => {
        total += detalle.tarifa;
      });
      return total.toFixed(2);
    },

    pagosEfectivo() {
      let nuevoDetalle = this.detalles.filter(
        (detalle) =>
          detalle.formaPago === ("Efectivo en Origen" || "Efectivo en Destino")
      );
      console.log(nuevoDetalle);
      let total = 0;
      nuevoDetalle.forEach((detalle) => {
        total += detalle.tarifa;
      });
      return total.toFixed(2);
    },

    totalPagar() {
      let total = +(this.totalTarifa - this.pagosEfectivo);
      return total.toFixed(2);
    },
  },
  methods: {
    cerrarDetalle() {
      this.$emit("cerrarDetalle");
      this.reporteCopiado = false;
    },

    copiarReporte() {
      //   console.log(this.$el.children[2].innerText);
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
