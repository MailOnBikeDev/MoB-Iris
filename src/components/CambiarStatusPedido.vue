<template>
  <div
    v-if="showCambiarStatus"
    class="absolute z-40 w-1/3 h-auto px-10 py-4 transform -translate-x-1/2 -translate-y-1/2 shadow-xl bg-primary top-1/2 left-1/2 rounded-xl"
  >
    <div class="absolute -top-4 -right-2">
      <button
        class="px-2 text-2xl text-white rounded-full bg-info hover:bg-secondary focus:outline-none"
        @click.prevent="cerrarModal"
      >
        <font-awesome-icon icon="times" />
      </button>
    </div>

    <div class="flex justify-center">
      <h1
        class="inline-block px-6 pt-1 text-2xl font-bold bg-white text-primary rounded-t-xl"
      >
        Pedido #<span class="text-red-500">{{ currentPedido.id }}</span>
      </h1>
    </div>

    <form class="flex flex-col items-center p-4 bg-white rounded-xl">
      <div>
        <label
          for="status"
          class="block mb-1 ml-1 text-sm font-bold text-primary"
          >Estado del Pedido</label
        >
        <model-list-select
          name="status"
          id="status"
          v-model="currentPedido.statusId"
          :list="statusDelPedido"
          option-text="tag"
          option-value="id"
        />
      </div>

      <div
        v-if="
          currentPedido.statusId === 4 ||
            currentPedido.statusId === 5 ||
            currentPedido.statusId === 6
        "
        class="mt-6"
      >
        <label
          for="comentario"
          class="block mb-1 ml-1 text-sm font-bold text-primary"
          >Comentario</label
        >
        <textarea
          class="mx-auto"
          name="comentario"
          id="comentario"
          cols="26"
          rows="3"
          v-model="currentPedido.comentario"
        ></textarea>
      </div>
    </form>

    <div class="flex justify-center mt-6">
      <button
        type="submit"
        class="px-6 py-2 font-bold text-white bg-green-600 rounded-xl focus:outline-none hover:bg-green-500"
        @click="handleCambiarStatusPedido"
      >
        <span v-if="!statusCambiado">
          Cambiar estado
        </span>

        <span v-else>Correcto</span>
      </button>
    </div>
  </div>
</template>

<script>
import PedidoService from "@/services/pedido.service";
import { ModelListSelect } from "vue-search-select";
import { mapState } from "vuex";

export default {
  name: "CambiarStatusPedido",
  components: {
    ModelListSelect,
  },
  props: {
    showCambiarStatus: {
      type: Boolean,
      required: true,
    },
    currentPedido: {
      type: Object,
    },
  },
  data() {
    return {
      statusCambiado: false,
    };
  },
  computed: {
    ...mapState("auxiliares", ["statusDelPedido"]),
  },
  methods: {
    async handleCambiarStatusPedido() {
      try {
        const pedidoCambiado = {
          statusId: this.currentPedido.statusId,
          mobiker: this.currentPedido.mobiker.fullName,
          comentario: this.currentPedido.comentario,
        };

        const response = await PedidoService.cambiarEstadoPedido(
          this.currentPedido.id,
          pedidoCambiado
        );

        console.log(response.data.message);

        if (this.currentPedido.statusId !== 1) {
          this.statusAsignado = true;
        } else {
          this.statusAsignado = false;
        }

        this.cerrarModal();
      } catch (error) {
        console.error(`Error al cambiar estado del Pedido: ${error.message}`);
      }
    },

    cerrarModal() {
      this.$emit("cerrarModal");

      this.$emit("refresh");
    },
  },
};
</script>
