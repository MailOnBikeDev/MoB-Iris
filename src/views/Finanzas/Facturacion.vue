<template>
  <div class="w-full max-h-screen p-4 mt-10 bg-gray-100 rounded-xl">
    <div class="flex justify-end">
      <h1
        class="relative inline-block px-6 py-2 mb-4 text-2xl font-bold text-center bg-gray-100 text-primary rounded-xl -top-12"
      >
        Facturación de Pedidos
      </h1>
    </div>

    <div class="overlay" v-if="showDetalle || showResumen"></div>

    <ReporteFacturacion
      :showDetalle="showDetalle"
      @cerrarDetalle="showDetalle = false"
      :pagosPorCobrar="pagosPorCobrar"
      :pagosEfectivo="pagosEfectivo"
      :casoEspecial="casoEspecial"
      :cliente="currentCliente"
    />

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
          @keyup="searchCliente"
          placeholder="Buscar contacto o empresa..."
        />
      </div>

      <div class="flex flex-row">
        <datepicker
          v-model="fechaInicio"
          name="fechaInicio"
          input-class="w-24 p-2 font-bold text-center cursor-pointer rounded-l-xl focus:outline-none text-primary"
          :monday-first="true"
          :language="es"
          format="dd MMM"
        />
        <datepicker
          v-model="fechaFin"
          name="fechaFin"
          input-class="w-24 p-2 font-bold text-center cursor-pointer focus:outline-none text-primary"
          :monday-first="true"
          :language="es"
          format="dd MMM"
        />
        <button
          type="button"
          class="px-2 py-1 mb-1 font-bold bg-white rounded-r-xl hover:bg-info hover:text-white focus:outline-none text-secondary"
          @click="buscarPorFecha"
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

      <button class="refresh-btn" @click="refreshList">
        <font-awesome-icon
          class="text-white group-hover:animate-spin"
          icon="sync-alt"
        />
      </button>

      <button
        class="px-6 py-2 font-bold text-white bg-green-600 rounded-xl focus:outline-none hover:bg-green-500"
        @click="openDetalle"
      >
        Enviar reporte
      </button>
    </div>

    <div class="grid grid-cols-4 gap-2">
      <div class="flex flex-row justify-center">
        <p>
          <span class="resalta">Total de Pedidos:</span>
          {{ cantidadPedidos }}
        </p>
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
        <div v-if="loading" class="text-center mt-36">
          <font-awesome-icon
            size="5x"
            class="animate-spin text-primary"
            icon="spinner"
          />
        </div>

        <div
          v-else
          class="grid items-center grid-cols-3 px-2 text-sm text-center border-b-2 cursor-pointer h-14 border-primary hover:bg-info hover:text-white"
          :class="{
            'bg-info text-white font-bold': cliente.cliente.id == currentIndex,
          }"
          v-for="cliente in clientesFiltrados"
          :key="cliente.cliente.id"
          @click="setActiveCliente(cliente.cliente, cliente.cliente.id)"
        >
          <div class="col-span-2">
            {{ cliente.cliente.razonComercial }}
          </div>

          <div>
            {{ cliente.cantidadPedidos }}
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
            <p v-if="pedido.status.id === 1" class="tag-programado">
              {{ pedido.status.tag }}
            </p>
            <p v-if="pedido.status.id === 2" class="tag-recoger">
              {{ pedido.status.tag }}
            </p>
            <p v-if="pedido.status.id === 3" class="tag-transito">
              {{ pedido.status.tag }}
            </p>
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
import ReporteFacturacion from "@/components/ReporteFacturacion";
import ClienteService from "@/services/cliente.service";
import Datepicker from "vuejs-datepicker";
import Pagination from "@/components/Pagination.vue";
import { es } from "vuejs-datepicker/dist/locale";

const seisDiasAtras = new Date().getTime() - 1000 * 60 * 60 * 24 * 6;

export default {
  name: "Facturacion",
  components: {
    Datepicker,
    Pagination,
    DetallePedidoComisiones,
    ReporteFacturacion,
  },
  data() {
    return {
      clientes: [],
      clientesFiltrados: [],
      pedidosCliente: [],
      pagosPorCobrar: [],
      pagosEfectivo: [],
      casoEspecial: false,
      showDetalle: false,
      showResumen: false,
      currentCliente: null,
      currentIndex: -1,
      currentPedido: null,
      currentPedidoIndex: -1,
      fechaInicio: new Date(seisDiasAtras),
      fechaFin: new Date(),
      buscador: "",

      loading: false,

      page: 1,
      cantidadPedidos: 0,
      pageSize: 200,
      es: es,
    };
  },
  methods: {
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

    retrievePedidosClientes() {
      const params = this.getRequestParams(
        this.fechaInicio.toISOString().split("T")[0],
        this.fechaFin.toISOString().split("T")[0],
        this.currentIndex,
        this.page,
        this.pageSize
      );

      ClienteService.getPedidosDelCliente(params).then(
        (response) => {
          const { pedidos, totalPedidos } = response.data;
          this.pedidosCliente = pedidos; // rows
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

    async retrieveClientesConPedidos() {
      try {
        this.loading = true;
        const params = {
          desde: this.fechaInicio.toISOString().split("T")[0],
          hasta: this.fechaFin.toISOString().split("T")[0],
        };

        const response = await ClienteService.getClientesConPedidos(params);

        this.clientes = response.data;
        this.clientesFiltrados = response.data;

        this.loading = false;
      } catch (error) {
        console.error(`Error al traer clientes con Pedidos: ${error.message}`);
      }
    },

    handlePageChange(value) {
      this.page = value;
      this.retrievePedidos();
    },

    setActiveCliente(cliente, index) {
      this.currentCliente = cliente;
      this.currentIndex = index;
      this.retrievePedidosClientes();
    },

    refreshList() {
      this.retrieveClientesConPedidos();
      this.pedidosCliente = [];
      this.cantidadPedidos = 0;

      this.clientesFiltrados = this.clientes;

      this.fechaInicio = new Date(seisDiasAtras);
      this.fechaFin = new Date();

      this.currentCliente = null;
      this.currentIndex = -1;
      this.buscador = "";
    },

    setActivePedido(pedido, index) {
      this.currentPedido = pedido;
      this.currentPedidoIndex = index;

      this.showResumen = true;
    },

    openDetalle() {
      this.showDetalle = true;
      this.filtroPorCobrar();
      this.filtroEfectivo();
    },

    closeResumen() {
      this.showResumen = false;

      this.currentPedido = null;
      this.currentPedidoIndex = -1;
    },

    filtroPorCobrar() {
      this.pagosPorCobrar = this.pedidosCliente.filter(
        (detalle) =>
          detalle.formaPago !== "Efectivo en Origen" &&
          detalle.formaPago !== "Efectivo en Destino"
      );
      if (
        this.pagosPorCobrar[0].empresaRemitente === "PHILIP MORRIS PERU S.A."
      ) {
        this.casoEspecial = true;
      } else {
        this.casoEspecial = false;
      }
    },

    filtroEfectivo() {
      this.pagosEfectivo = this.pedidosCliente.filter(
        (detalle) =>
          detalle.formaPago === "Efectivo en Origen" ||
          detalle.formaPago === "Efectivo en Destino"
      );
    },

    buscarPorFecha() {
      this.retrieveClientesConPedidos();
      this.currentCliente = null;
      this.currentIndex = -1;
    },

    async searchCliente() {
      try {
        this.clientesFiltrados = this.clientes.filter((cliente) => {
          if (
            cliente.cliente.razonComercial
              .toLowerCase()
              .includes(this.buscador.toLowerCase()) ||
            cliente.cliente.contacto
              .toLowerCase()
              .includes(this.buscador.toLowerCase())
          ) {
            return cliente;
          }
        });

        if (this.buscador.trim() === "") {
          this.clientesFiltrados = this.clientes;
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
