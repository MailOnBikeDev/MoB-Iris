<template>
  <div
    v-if="showDetalle"
    class="absolute z-40 w-1/2 h-auto px-10 py-4 transform -translate-x-1/2 shadow-xl bg-primary top-1/2 left-1/2 -translate-y-1/3 rounded-xl"
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
        Pedido #<span class="text-red-500">{{ currentPedido.id }}</span>
      </h1>
    </div>

    <InfoPedido :currentPedido="currentPedido" />

    <div class="flex flex-row justify-around mt-6">
      <router-link
        :to="`/pedidos/tablero-pedidos/${currentPedido.id}`"
        custom
        v-slot="{ navigate }"
        class="px-6 py-2 font-bold text-white bg-green-600 rounded-xl focus:outline-none hover:bg-green-500"
      >
        <span @click="navigate" role="link" class="text-center cursor-pointer"
          >Editar Pedido</span
        >
      </router-link>
    </div>
  </div>
</template>

<script>
import InfoPedido from "./InfoPedido.vue";

export default {
  name: "ReporteDetalle",
  components: { InfoPedido },
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
