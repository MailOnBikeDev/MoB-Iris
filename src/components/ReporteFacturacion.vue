<template>
  <div
    v-if="showDetalle"
    class="absolute z-40 w-11/12 h-auto p-4 mx-auto shadow-xl bg-primary top-20 rounded-xl"
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
      class="flex flex-col items-center p-4 overflow-y-auto text-sm bg-white justify-evenly rounded-xl pedidos-scroll h-96 max-h-96"
    >
      <table
        class="table w-full border-2 border-collapse table-auto border-secondary"
      >
        <tr
          class="table-row text-center text-white border-2 bg-secondary border-secondary"
        >
          <th class="table-cell">Fecha</th>
          <th class="table-cell">Consignado</th>
          <th class="table-cell">Dirección</th>
          <th class="table-cell">Distrito</th>
          <th class="table-cell">Tarifa</th>
          <th class="table-cell">Texto Factura</th>
          <th class="table-cell">Forma de Pago</th>
        </tr>

        <tr
          class="table-row border-2 odd:bg-info odd:text-white text-secondary border-secondary"
          v-for="detalle in detalles"
          :key="detalle.id"
        >
          <td class="table-cell px-2 text-center border-2 border-secondary">
            {{ $date(detalle.fecha).format("DD MMM") }}
          </td>
          <td class="table-cell px-2 border-2 border-secondary">
            {{ capitalizar(detalle.contactoConsignado) }}
          </td>
          <td class="table-cell px-2 border-2 border-secondary">
            {{ capitalizar(detalle.direccionConsignado) }}
          </td>
          <td class="table-cell px-2 border-2 border-secondary">
            {{ detalle.distrito.distrito }}
          </td>
          <td class="table-cell px-2 text-center border-2 border-secondary">
            {{ detalle.tarifa }}
          </td>
          <td class="table-cell px-2 border-2 border-secondary">
            BICIDELIVERY: {{ capitalizar(detalle.contactoConsignado) }}
          </td>
          <td class="table-cell px-2 text-center border-2 border-secondary">
            {{ detalle.formaPago }}
          </td>
        </tr>

        <tr class="table-row">
          <td class="table-cell"></td>
          <td class="table-cell"></td>
          <td class="table-cell"></td>
          <td class="table-cell"></td>
          <td
            class="table-cell font-bold text-center border-2 border-secondary text-primary"
          >
            {{ totalTarifa }}
          </td>
        </tr>
      </table>

      <div>
        <p class="mb-2 resalta">Mis Estadísticas:</p>
        <p>
          Mis BiciEnvíos =
          <span class="select-all">{{ cliente.biciEnvios }}</span>
        </p>
        <p>
          Mis Kilómetros =
          <span class="select-all">{{ cliente.kilometros }}km</span>
        </p>
        <p>
          CO2 Ahorrado =
          <span class="select-all">{{ cliente.CO2Ahorrado }}kg</span>
        </p>
        <p>
          Horas de Ruido Ahorrado =
          <span class="select-all">{{ cliente.ruido }}h</span>
        </p>
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

    capitalizar(texto) {
      const nuevoTexto = texto
        .trim()
        .toLowerCase()
        .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));

      return nuevoTexto;
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
