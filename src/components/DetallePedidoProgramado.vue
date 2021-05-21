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

    <div class="hidden">
      <pre v-if="currentComanda !== null">
Tipo Envío: **{{ currentComanda.tipoDeEnvio.tipo }}**
__Origen:__ {{ currentComanda.direccionRemitente }} - {{
          currentComanda.distritoRemitente
        }}
__Empresa:__ {{ currentComanda.empresaRemitente }}
__Contacto:__ {{ currentComanda.contactoRemitente }} - {{
          currentComanda.telefonoRemitente
        }}
{{
          currentComanda.otroDatoRemitente
            ? `**IMPORTANTE:  ${currentComanda.otroDatoRemitente}**`
            : null
        }}
			
__Destino:__ {{ currentComanda.direccionConsignado }} - {{
          currentComanda.distrito.distrito
        }}
__Contacto:__ {{ currentComanda.contactoConsignado }} {{
          currentComanda.empresaConsignado
            ? `- __Empresa:__ ${currentComanda.empresaConsignado}`
            : null
        }}
__Teléfono:__ {{ currentComanda.telefonoConsignado }}
__Llevar:__ {{ currentComanda.tipoCarga }}
__Modalidad:__ {{ currentComanda.modalidad.tipo }}
{{
          currentComanda.otroDatoConsignado
            ? `**IMPORTANTE:  ${currentComanda.otroDatoConsignado}**`
            : null
        }}

__Tarifa:__ S/. {{ currentComanda.tarifa }}
__Mi comisión:__ S/. {{ currentComanda.comision }}
__Pedido:__ #{{ currentComanda.id }}
__CO2:__ {{ currentComanda.CO2Ahorrado }} Kg
__Horas de Ruido:__ {{ currentComanda.ruido }} h</pre
      >
    </div>

    <form class="grid grid-cols-2 p-4 bg-white gap-x-4 rounded-t-xl">
      <div>
        <label
          for="status"
          class="block mb-1 ml-1 text-sm font-bold text-primary"
          >Estado del Pedido</label
        >
        <model-list-select
          name="status"
          v-model="pedidoAsignado.statusId"
          :list="statusDelPedido"
          v-validate="'required'"
          option-text="tag"
          option-value="id"
        />
        <div
          v-if="errors.has('status')"
          class="p-2 text-sm text-white bg-red-500 rounded"
        >
          <p>El estado es requerido</p>
        </div>
      </div>

      <div>
        <label
          for="mobiker"
          class="block mb-1 ml-1 text-sm font-bold text-primary"
          >MoBiker</label
        >
        <model-list-select
          name="mobiker"
          v-model="pedidoAsignado.mobiker"
          placeholder="Buscar MoBiker..."
          :list="mobikersFiltrados"
          v-validate="'required'"
          option-text="fullName"
          option-value="fullName"
        />
        <div
          v-if="errors.has('mobiker')"
          class="p-2 text-sm text-white bg-red-500 rounded"
        >
          <p>El MoBiker es requerido</p>
        </div>
      </div>
    </form>

    <div class="grid grid-cols-4 my-2 font-bold text-center text-white">
      <h4>#</h4>
      <h4>Cliente</h4>
      <h4>Origen</h4>
      <h4>Destino</h4>
    </div>

    <div class="p-2 overflow-y-auto bg-white h-72">
      <div
        class="grid grid-cols-4 py-2 mb-2 text-center cursor-pointer"
        :class="{
          'bg-info text-white font-bold': pedido.id == currentComandaIdx,
          'bg-green-600 text-white font-bold': comandasEnviadas.includes(
            pedido.id
          ),
        }"
        v-for="pedido in pedidosArray"
        :key="pedido.id"
        @click="seleccionComanda(pedido, pedido.id)"
      >
        <p>
          {{ pedido.id }}
        </p>

        <p>
          {{ pedido.contactoRemitente }}
        </p>

        <p>
          {{ pedido.distritoRemitente }}
        </p>

        <p>
          {{ pedido.distrito.distrito }}
        </p>
      </div>
    </div>

    <div class="flex flex-row justify-around mt-6">
      <button
        type="button"
        @click="handleAsignarPedido"
        class="px-6 py-2 font-bold text-white bg-green-600 rounded-xl focus:outline-none hover:bg-green-500"
      >
        <span v-if="!statusAsignado">
          Asignar MoBiker
        </span>

        <span v-else>Asignado</span>
      </button>

      <button
        v-if="comandaCopiada === false"
        class="px-4 py-2 font-bold text-white bg-secondary rounded-xl focus:outline-none hover:bg-info"
        @click="copiarComanda"
      >
        Copiar
      </button>

      <button
        v-else
        class="px-4 py-2 font-bold text-white bg-green-600 rounded-xl focus:outline-none hover:bg-green-500"
        @click="copiarComanda"
      >
        Copiado
      </button>
    </div>
  </div>
</template>

<script>
import { ModelListSelect } from "vue-search-select";
import PedidoService from "@/services/pedido.service";
import { mapState } from "vuex";

export default {
  name: "DetallePedidoProgramado",
  props: {
    showDetalle: {
      type: Boolean,
      required: true,
    },
    pedidosArray: {
      type: Array,
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
      statusAsignado: false,
      comandaCopiada: false,
      currentComanda: null,
      currentComandaIdx: -1,
      comandasEnviadas: [],
    };
  },
  computed: {
    ...mapState("mobikers", ["mobikers"]),
    ...mapState("auxiliares", ["statusDelPedido"]),
  },
  async mounted() {
    this.mobikersFiltrados = this.mobikers
      .filter((mobiker) => mobiker.status === "Activo")
      .sort((a, b) => {
        return a.fullName.localeCompare(b.fullName);
      });
  },
  watch: {
    "pedidoAsignado.mobiker": function() {
      if (this.pedidoAsignado.mobiker === "Asignar MoBiker") {
        this.pedidoAsignado.statusId = 1;
      } else {
        this.pedidoAsignado.statusId = 2;
      }
    },
    "pedidoAsignado.statusId": function() {
      if (this.pedidoAsignado.statusId === 1) {
        this.pedidoAsignado.mobiker = "Asignar MoBiker";
      }
    },
  },
  methods: {
    handleAsignarPedido() {
      try {
        const isValid = this.$validator.validateAll();
        if (!isValid) {
          console.error("Mensaje de error: No se pudo asignar el Pedido");
          return;
        }

        this.pedidosArray.forEach(async (pedido) => {
          const response = await PedidoService.asignarPedido(
            pedido.id,
            this.pedidoAsignado
          );
          console.log(response.message);

          if (
            this.pedidoAsignado.statusId !== 1 &&
            this.pedidoAsignado.mobiker !== "Asignar MoBiker"
          ) {
            this.statusAsignado = true;
          } else {
            this.statusAsignado = false;
          }
        });
      } catch (error) {
        console.error(`Error al asignar Pedidos: ${error.message}`);
      }
    },

    seleccionComanda(comanda, index) {
      this.currentComanda = comanda;
      this.currentComandaIdx = index;
      this.comandaCopiada = false;
    },

    copiarComanda() {
      // console.log(this.$el.children[2].children[0].innerText);
      this.$copyText(this.$el.children[1].textContent).then(() => {
        this.comandaCopiada = true;
        console.log("Texto copiado");
        this.comandasEnviadas.push(this.currentComandaIdx);
        console.log(this.comandasEnviadas);
      });
    },

    cerrarDetalle() {
      this.$emit("cerrarDetalle");
      this.comandaCopiada = false;
      this.statusAsignado = false;
      this.pedidoAsignado.statusId = 1;
      this.comandasEnviadas.length = 0;
      this.pedidoAsignado.mobiker = "Asignar MoBiker";

      this.refresh();
    },

    refresh() {
      this.$emit("refresh");
    },
  },
};
</script>
