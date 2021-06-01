<template>
  <div class="w-full max-h-screen p-4 mt-10 bg-gray-100 rounded-xl">
    <div class="flex justify-end">
      <h1
        class="relative inline-block px-6 py-2 mb-4 text-2xl font-bold text-center bg-gray-100 text-primary rounded-xl -top-12"
      >
        Facturación de Pedidos
      </h1>
    </div>

    <DetallePedidoComisiones
      :showResumen="showResumen"
      @cerrarResumen="closeResumen"
      :currentPedido="currentPedido"
    />

    <div class="flex flex-row mb-4 -mt-10 justify-evenly">
      <div>
        <input
          type="search"
          class="input"
          v-model="buscador"
          @keyup.enter="searchCliente"
          placeholder="Buscar contacto o empresa..."
        />
      </div>

      <div class="flex flex-row">
        <datepicker
          v-model="fechaInicio"
          name="fechaInicio"
          input-class="w-32 p-2 font-bold cursor-pointer rounded-l-xl focus:outline-none text-primary"
          :monday-first="true"
        />
        <datepicker
          v-model="fechaFin"
          name="fechaFin"
          input-class="w-32 p-2 font-bold cursor-pointer focus:outline-none text-primary"
          :monday-first="true"
        />
        <button
          type="button"
          class="px-2 py-1 mb-1 font-bold bg-white rounded-r-xl hover:bg-info hover:text-white focus:outline-none text-secondary"
        >
          Buscar
        </button>
      </div>

      <router-link
        to="/finanzas/historial-pedidos"
        class="px-6 py-2 font-bold text-white bg-indigo-600 rounded-xl focus:outline-none hover:bg-indigo-500"
        custom
        v-slot="{ navigate }"
      >
        <span @click="navigate" role="link" class="text-center cursor-pointer"
          >Volver al Historial</span
        >
      </router-link>

      <button
        class="px-4 py-2 bg-yellow-600 rounded-full hover:bg-yellow-500 focus:outline-none"
        @click="refreshList"
      >
        <font-awesome-icon class="text-white" icon="sync-alt" />
      </button>

      <button
        class="px-6 py-2 font-bold text-white bg-green-600 rounded-xl focus:outline-none hover:bg-green-500"
      >
        Enviar reporte
      </button>
    </div>

    <div class="grid grid-cols-4 gap-2">
      <div class="flex flex-row justify-center">
        {{ clientes.length }}
        <!-- <p>
          <span class="resalta">Total de Pedidos:</span>
          {{ cantidadPedidos }}
        </p> -->
      </div>

      <div
        class="inline-grid items-center grid-cols-6 col-span-3 text-sm font-bold text-center text-primary"
      >
        <button @click="sortPorId" class="focus:outline-none">
          <p class="font-bold"># Pedido</p>
        </button>
        <button @click="sortPorId" class="focus:outline-none">
          <p class="font-bold">Empresa</p>
        </button>
        <button @click="sortPorOrigen" class="focus:outline-none">
          <p class="font-bold">Origen</p>
        </button>
        <button @click="sortPorDestino" class="focus:outline-none">
          <p class="font-bold">Destino</p>
        </button>
        <button @click="sortPorEstado" class="focus:outline-none">
          <p class="font-bold">Estado</p>
        </button>
        <button @click="sortPorFecha" class="focus:outline-none">
          <p class="font-bold">Fecha</p>
        </button>
      </div>
      <div
        class="overflow-y-auto bg-white border border-black max-h-96 h-96 pedidos-scroll"
      >
        <div
          class="grid items-center px-2 text-sm text-center border-b-2 cursor-pointer h-14 border-primary hover:bg-info"
          :class="{
            'bg-info text-white font-bold': cliente.id == currentIndex,
          }"
          v-for="cliente in clientesFiltrados"
          :key="cliente.id"
          @click="setActiveCliente(cliente, cliente.id)"
        >
          <div class="col-span-2">
            {{ cliente.razonComercial }}
          </div>
        </div>
      </div>

      <div
        class="col-span-3 overflow-y-auto bg-white border border-black pedidos-scroll max-h-96"
      >
        <div
          class="grid items-center grid-cols-6 py-2 text-sm text-center border-b-2 cursor-pointer gap-x-1 h-14 border-primary hover:bg-info"
          :class="{
            'bg-info text-white font-bold': pedido.id == currentPedidoIndex,
          }"
          v-for="pedido in pedidosCliente"
          :key="pedido.id"
        >
          <div @click="setActivePedido(pedido, pedido.id)">
            <p>{{ pedido.id }}</p>
          </div>

          <div @click="setActivePedido(pedido, pedido.id)">
            <p v-if="pedido.rolCliente === 'Remitente'">
              {{ pedido.empresaRemitente }}
            </p>
            <p v-else>{{ pedido.empresaConsignado }}</p>
          </div>

          <div @click="setActivePedido(pedido, pedido.id)">
            <p v-if="pedido.rolCliente === 'Remitente'">
              {{ pedido.distritoRemitente }}
            </p>
            <p v-else>{{ pedido.distrito.distrito }}</p>
          </div>

          <div @click="setActivePedido(pedido, pedido.id)">
            <p v-if="pedido.rolCliente === 'Remitente'">
              {{ pedido.distrito.distrito }}
            </p>
            <p v-else>{{ pedido.distritoRemitente }}</p>
          </div>

          <div @click="setActivePedido(pedido, pedido.id)">
            <p v-if="pedido.status.id === 4" class="tag-entregado">
              {{ pedido.status.tag }}
            </p>
            <p v-if="pedido.status.id === 5" class="tag-falso-flete">
              {{ pedido.status.tag }}
            </p>
            <p v-if="pedido.status.id === 6" class="tag-anulado">
              {{ pedido.status.tag }}
            </p>
          </div>

          <div @click="setActivePedido(pedido, pedido.id)">
            <p>{{ $date(pedido.fecha).format("DD MMM YYYY") }}</p>
          </div>
        </div>
      </div>
    </div>

    <Pagination
      :page="page"
      :cantidadItems="cantidadPedidos"
      :pageSize="pageSize"
      @prevPageChange="
        page--;
        retrievePedidos();
      "
      @nextPageChange="
        page++;
        retrievePedidos();
      "
      @handlePageChange="handlePageChange"
    />
  </div>
</template>

<script>
import DetallePedidoComisiones from "@/components/DetallePedidoComisiones";
import MobikerService from "@/services/mobiker.service";
import Datepicker from "vuejs-datepicker";
import Pagination from "@/components/Pagination.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "Facturacion",
  components: {
    Datepicker,
    Pagination,
    DetallePedidoComisiones,
  },
  data() {
    return {
      clientesFiltrados: [],
      pedidosCliente: [],
      showDetalle: false,
      showResumen: false,
      currentCliente: null,
      currentIndex: -1,
      currentPedido: null,
      currentPedidoIndex: -1,
      fechaInicio: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 6),
      fechaFin: new Date(),
      buscador: "",

      page: 1,
      cantidadPedidos: 0,
      pageSize: 200,
    };
  },
  mounted() {
    this.clientesFiltrados = this.clientes;
  },
  computed: {
    ...mapState("clientes", ["clientes"]),
  },
  methods: {
    ...mapActions("clientes", ["getClientes", "buscarCliente"]),

    getRequestParams(desde, hasta, id, page, pageSize) {
      let params = {};

      if (desde) {
        params["desde"] = desde;
      }

      if (hasta) {
        params["hasta"] = hasta;
      }

      if (id) {
        params["id"] = id;
      }

      if (page) {
        params["page"] = page - 1;
      }

      if (pageSize) {
        params["size"] = pageSize;
      }

      return params;
    },

    retrievePedidosMobikers() {
      const params = this.getRequestParams(
        this.$date(this.fechaInicio).format("YYYY-MM-DD"),
        this.$date(this.fechaFin).format("YYYY-MM-DD"),
        this.currentIndex,
        this.page,
        this.pageSize
      );

      MobikerService.getPedidosDelMobiker(params).then(
        (response) => {
          const { pedidos, totalPedidos } = response.data;
          this.pedidosMobiker = pedidos; // rows
          this.cantidadPedidos = totalPedidos; // count
        },
        (error) => {
          this.pedidosMobiker =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },

    handlePageChange(value) {
      this.page = value;
      this.retrievePedidos();
    },

    setActiveCliente(cliente, index) {
      this.currentCliente = cliente;
      this.currentIndex = index;
      this.retrievePedidosMobikers();
    },

    async refreshList() {
      try {
        this.pedidosCliente = [];
        this.cantidadPedidos = 0;

        this.currentCliente = null;
        this.currentIndex = -1;
      } catch (error) {
        console.error(`Error al refrescar la lista: ${error.message}`);
      }
    },

    setActivePedido(pedido, index) {
      this.currentPedido = pedido;
      this.currentPedidoIndex = index;

      this.showResumen = true;
    },

    closeResumen() {
      this.showResumen = false;

      this.currentPedido = null;
      this.currentPedidoIndex = -1;
    },

    async searchCliente() {
      try {
        this.clientesFiltrados = await this.buscarCliente(this.buscador);

        if (this.buscador.trim() === "") {
          this.refreshList();
        }
      } catch (error) {
        console.error(`Error en el buscador de Clientes: ${error.message}`);
      }
    },

    sortPorId() {
      this.pedidos.sort((a, b) => {
        return a.id > b.id ? 1 : -1;
      });
    },

    sortPorOrigen() {
      this.pedidos.sort((a, b) => {
        return a.distritoRemitente.toLowerCase() >
          b.distritoRemitente.toLowerCase()
          ? 1
          : -1;
      });
    },

    sortPorDestino() {
      this.pedidos.sort((a, b) => {
        return a.distrito.distrito.toLowerCase() >
          b.distrito.distrito.toLowerCase()
          ? 1
          : -1;
      });
    },

    sortPorMobiker() {
      this.pedidos.sort((a, b) => {
        return a.mobiker.fullName.toLowerCase() >
          b.mobiker.fullName.toLowerCase()
          ? 1
          : -1;
      });
    },

    sortPorEstado() {
      this.pedidos.sort((a, b) => {
        return a.status.tag.toLowerCase() > b.status.tag.toLowerCase() ? 1 : -1;
      });
    },

    sortPorFecha() {
      this.pedidos.sort((a, b) => {
        return a.fecha > b.fecha ? -1 : 1;
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
