<template>
  <div
    v-if="showDetalle"
    class="absolute z-40 w-11/12 h-auto p-4 mx-auto transform -translate-x-1/2 shadow-xl -translate-y-2/3 bg-primary rounded-xl top-2/3 left-1/2"
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
      class="flex flex-col items-center p-4 overflow-y-auto text-sm bg-white rounded-xl pedidos-scroll h-96 max-h-96"
    >
      <!-- Por cobrar -->
      <h2 class="text-xl resalta">Por cobrar</h2>
      <TablaFacturacion :casoEspecial="casoEspecial" :info="pagosPorCobrar" />

      <!-- Pagos en Efectivo -->
      <h2 class="mt-4 text-xl resalta">Pagos en Efectivo</h2>
      <TablaFacturacion :casoEspecial="casoEspecial" :info="pagosEfectivo" />

      <!-- Imagen de Tabla de Facturacion -->
      <h2 class="mt-4 text-xl resalta">Reporte a copiar</h2>
      <div class="w-full" ref="facturado">
        <TablaEnviarFactura
          :casoEspecial="casoEspecial"
          :info="pagosPorCobrar"
        />
      </div>

      <div class="p-4 mt-6 text-lg border-2 border-primary">
        <p class="mb-2 resalta">Estadísticas:</p>
        <p>
          Mis BiciEnvíos =
          <span class="cursor-pointer select-all">{{
            cliente.biciEnvios
          }}</span>
        </p>
        <p>
          Mis Kilómetros =
          <span class="cursor-pointer select-all">{{ cliente.kilometros }}</span
          >km
        </p>
        <p>
          CO2 Ahorrado =
          <span class="cursor-pointer select-all">{{
            cliente.CO2Ahorrado
          }}</span
          >kg
        </p>
        <p>
          Horas de Ruido Ahorrado =
          <span class="cursor-pointer select-all">{{ cliente.ruido }}</span
          >h
        </p>
      </div>
    </div>

    <div class="flex justify-center mt-4">
      <button
        v-if="reporteCopiado === false"
        class="px-4 py-2 font-bold text-white bg-secondary rounded-xl focus:outline-none hover:bg-info"
        @click="copiarReporte"
      >
        Copiar reporte
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
import TablaFacturacion from "./TablaFacturacion.vue";
import TablaEnviarFactura from "./TablaEnviarFactura.vue";

export default {
  name: "ReporteFacturacion",
  components: { TablaFacturacion, TablaEnviarFactura },
  props: {
    showDetalle: {
      type: Boolean,
      required: true,
    },
    pagosPorCobrar: {
      type: Array,
    },
    pagosEfectivo: {
      type: Array,
    },
    casoEspecial: {
      type: Boolean,
    },
    cliente: {
      type: Object,
    },
  },
  data() {
    return {
      reporteCopiado: false,
    };
  },
  methods: {
    cerrarDetalle() {
      this.$emit("cerrarDetalle");
      this.reporteCopiado = false;
    },

    copiarReporte() {
      this.$copyText(this.$refs.facturado.innerText).then(() => {
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
