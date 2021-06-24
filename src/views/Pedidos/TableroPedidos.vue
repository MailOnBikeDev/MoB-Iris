<template>
  <div class="w-full min-h-full p-4 mt-10 bg-gray-100 rounded-xl">
    <div class="flex justify-end">
      <h1
        class="relative inline-block px-6 py-2 mb-4 text-2xl font-bold text-center bg-gray-100 text-primary rounded-xl -top-12"
      >
        Tablero de Pedidos
      </h1>
    </div>

    <ReporteComanda
      :showComanda="showComanda"
      @cerrarComanda="showComanda = false"
      :currentPedido="currentPedido"
    />

    <DetallePedido
      :showDetalle="showDetalle"
      @cerrarDetalle="showDetalle = false"
      @emitirComanda="showComanda = true"
      :currentPedido="currentPedido"
    />

    <div class="flex flex-row items-center mb-4 -mt-10 justify-evenly">
      <div class="flex flex-row">
        <datepicker
          v-model="buscadorFecha"
          name="buscadorFecha"
          input-class="p-2 mb-1 font-bold cursor-pointer rounded-l-xl w-28 focus:outline-none text-primary"
          :monday-first="true"
          :language="es"
          :use-utc="true"
        />
        <button
          type="button"
          class="px-2 py-1 mb-1 font-bold bg-white rounded-r-xl text-secondary hover:bg-info hover:text-white focus:outline-none"
          @click="retrievePedidos"
        >
          Buscar
        </button>
      </div>

      <div>
        <input
          type="text"
          placeholder="Buscar Pedido..."
          class="input"
          v-model="buscador"
          @keyup.enter="buscarPedido"
        />
      </div>

      <router-link
        to="/pedidos/pedidos-programados"
        class="px-6 py-2 font-bold text-white bg-indigo-600 rounded-xl focus:outline-none hover:bg-indigo-500"
        custom
        v-slot="{ navigate }"
      >
        <span @click="navigate" role="link" class="text-center cursor-pointer"
          >Asignar Pedidos</span
        >
      </router-link>

      <button
        class="px-4 py-2 bg-yellow-600 rounded-full hover:bg-yellow-500 focus:outline-none"
        @click="refreshList"
        title="Actualizar listado"
      >
        <font-awesome-icon class="text-white" icon="sync-alt" />
      </button>

      <router-link
        to="/pedidos/nuevo-pedido"
        class="px-6 py-2 font-bold text-white bg-green-600 rounded-xl focus:outline-none hover:bg-green-500"
        custom
        v-slot="{ navigate }"
      >
        <span @click="navigate" role="link" class="text-center cursor-pointer"
          >Crear nuevo Pedido</span
        >
      </router-link>
      <router-link
        to="/pedidos/ruteo"
        class="px-6 py-2 font-bold text-white bg-green-600 rounded-xl focus:outline-none hover:bg-green-500"
        custom
        v-slot="{ navigate }"
      >
        <span @click="navigate" role="link" class="text-center cursor-pointer"
          >Crear nuevo Ruteo</span
        >
      </router-link>
    </div>

    <div class="grid grid-cols-4 gap-2">
      <div class="flex flex-row justify-center">
        <p>
          <span class="resalta">N° de Pedidos del día:</span>
          {{ pedidos.filter((pedido) => pedido.statusId !== 6).length }}
        </p>
      </div>

      <div
        class="inline-grid items-center grid-cols-7 col-span-3 text-sm text-center text-primary"
      >
        <button @click="sortPorId" class="focus:outline-none">
          <p class="font-bold"># Pedido</p>
        </button>
        <button @click="sortPorOrigen" class="focus:outline-none">
          <p class="font-bold">Origen</p>
        </button>
        <button @click="sortPorDestino" class="focus:outline-none">
          <p class="font-bold">Destino</p>
        </button>
        <button @click="sortPorMobiker" class="focus:outline-none">
          <p class="font-bold">MoBiker</p>
        </button>
        <button @click="sortPorEstado" class="focus:outline-none">
          <p class="font-bold">Estado</p>
        </button>
        <button @click="sortPorFecha" class="focus:outline-none">
          <p class="font-bold">Fecha</p>
        </button>
        <div>
          <p class="font-bold">Acciones</p>
        </div>
      </div>

      <div class="p-4 bg-white border border-black">
        <h2 class="mb-4 text-3xl font-bold text-primary">
          Cliente
        </h2>

        <div class="flex flex-col text-sm max-h-96" v-if="currentPedido">
          <p class="mb-2">
            <span class="resalta">Contacto: </span>
            {{ currentPedido.contactoRemitente }}
          </p>
          <p class="mb-2">
            <span class="resalta">Empresa: </span
            >{{ currentPedido.empresaRemitente }}
          </p>
          <p class="mb-2">
            <span class="resalta">Dirección: </span
            >{{ currentPedido.direccionRemitente }}
          </p>
          <p class="mb-2">
            <span class="resalta">Distrito: </span
            >{{ currentPedido.distritoRemitente }}
          </p>
          <p class="mb-2">
            <span class="resalta">Teléfono: </span
            >{{ currentPedido.telefonoRemitente }}
          </p>
          <p class="mb-2">
            <span class="resalta">Observaciones: </span
            >{{ currentPedido.otroDatoRemitente }}
          </p>
          <p class="mb-2">
            <span class="resalta">Forma de Pago: </span
            >{{ currentPedido.formaPago }}
          </p>
          <p class="mb-2">
            <span class="resalta">Tarifa: </span>S/.
            {{ currentPedido.tarifa }}
          </p>
          <p class="mb-2">
            <span class="resalta">Modalidad: </span
            >{{ currentPedido.modalidad.tipo }}
          </p>
          <p class="mb-2">
            <span class="resalta">Rol: </span>{{ currentPedido.rolCliente }}
          </p>
        </div>

        <div class="flex flex-col text-sm max-h-96" v-else>
          <p class="mb-2">
            <span class="resalta">Contacto: </span>
          </p>
          <p class="mb-2">
            <span class="resalta">Empresa: </span>
          </p>
          <p class="mb-2">
            <span class="resalta">Dirección: </span>
          </p>
          <p class="mb-2"><span class="resalta">Distrito: </span></p>
          <p class="mb-2"><span class="resalta">Teléfono: </span></p>
          <p class="mb-2">
            <span class="resalta">Observaciones: </span>
          </p>
          <p class="mb-2">
            <span class="resalta">Forma de Pago: </span>
          </p>
          <p class="mb-2"><span class="resalta">Tarifa: </span>S/.</p>
          <p class="mb-2"><span class="resalta">Modalidad: </span></p>
          <p class="mb-2"><span class="resalta">Rol: </span></p>
        </div>
      </div>

      <div
        class="col-span-3 overflow-y-auto bg-white border border-black max-h-96 pedidos-scroll"
      >
        <div
          class="grid items-center grid-cols-7 py-2 text-sm text-center border-b-2 cursor-pointer gap-x-1 h-14 border-primary hover:bg-info hover:text-white"
          :class="{ 'bg-info text-white font-bold': pedido.id == currentIndex }"
          v-for="pedido in pedidosFiltrados"
          :key="pedido.id"
          @click="setActivePedido(pedido, pedido.id)"
          :title="
            `Cliente: ${pedido.contactoRemitente}. Observaciones: Del origen: ${pedido.otroDatoRemitente} / Del destino: ${pedido.otroDatoConsignado}`
          "
        >
          <div>
            <p>{{ pedido.id }}</p>
          </div>
          <div>
            <p v-if="pedido.rolCliente === 'Remitente'">
              {{ pedido.distritoRemitente }}
            </p>
            <p v-else>{{ pedido.distrito.distrito }}</p>
          </div>
          <div>
            <p v-if="pedido.rolCliente === 'Remitente'">
              {{ pedido.distrito.distrito }}
            </p>
            <p v-else>{{ pedido.distritoRemitente }}</p>
          </div>
          <div>
            <p>{{ pedido.mobiker.fullName }}</p>
          </div>
          <div>
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
          <div>
            <p>{{ $date(pedido.fecha).format("DD MMM YYYY") }}</p>
          </div>
          <div class="flex items-center justify-center">
            <button
              class="focus:outline-none"
              @click="showComanda = true"
              title="Emitir Comanda"
            >
              <font-awesome-icon class="text-2xl text-primary" icon="receipt" />
            </button>

            <button
              class="focus:outline-none"
              @click="showDetalle = true"
              title="Detalles del Pedido"
            >
              <font-awesome-icon
                class="ml-6 text-2xl text-primary"
                icon="window-maximize"
              />
            </button>
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
import PedidoService from "@/services/pedido.service";
import ReporteComanda from "@/components/ReporteComanda";
import DetallePedido from "@/components/DetallePedido";
import Datepicker from "vuejs-datepicker";
import Pagination from "@/components/Pagination.vue";
import { es } from "vuejs-datepicker/dist/locale";

export default {
  name: "Pedidos",
  components: {
    ReporteComanda,
    DetallePedido,
    Datepicker,
    Pagination,
  },
  data() {
    return {
      pedidos: [],
      pedidosFiltrados: [],
      buscador: "",
      showComanda: false,
      showDetalle: false,
      currentPedido: null,
      currentIndex: -1,
      buscadorFecha: new Date(),

      page: 1,
      cantidadPedidos: 0,
      pageSize: 200,
      es: es,
    };
  },
  mounted() {
    this.retrievePedidos();
  },
  methods: {
    getRequestParams(fecha, page, pageSize) {
      let params = {};

      if (fecha) {
        params["fecha"] = fecha;
      }

      if (page) {
        params["page"] = page - 1;
      }

      if (pageSize) {
        params["size"] = pageSize;
      }

      return params;
    },

    async retrievePedidos() {
      try {
        const params = this.getRequestParams(
          this.buscadorFecha.toISOString().split("T")[0],
          this.page,
          this.pageSize
        );

        const response = await PedidoService.getPedidosPorFecha(params);
        const { pedidos, totalPedidos } = response.data;
        this.pedidos = pedidos; // rows
        this.pedidosFiltrados = pedidos;
        this.cantidadPedidos = totalPedidos; // count
      } catch (error) {
        console.error(`Error al obtener los Pedidos:`);
      }
    },

    async buscarPedido() {
      try {
        const response = await PedidoService.searchPedido(this.buscador);

        this.pedidosFiltrados = response.data;

        if (this.buscador.trim() === "") {
          this.pedidosFiltrados = this.pedidos;
        }
      } catch (error) {
        console.error(`Error al buscar un Pedido. ${error.message}`);
      }
    },

    handlePageChange(value) {
      this.page = value;
      this.retrievePedidos();
    },

    setActivePedido(pedido, index) {
      this.currentPedido = pedido;
      this.currentIndex = index;
    },

    refreshList() {
      this.buscadorFecha = new Date();
      this.page = 1;
      this.retrievePedidos();
      this.pedidosFiltrados = this.pedidos;

      this.currentPedido = null;
      this.currentIndex = -1;
    },

    sortPorId() {
      this.pedidosFiltrados.sort((a, b) => {
        return a.id > b.id ? 1 : -1;
      });
    },

    sortPorOrigen() {
      this.pedidosFiltrados.sort((a, b) => {
        return a.distritoRemitente.toLowerCase() >
          b.distritoRemitente.toLowerCase()
          ? 1
          : -1;
      });
    },

    sortPorDestino() {
      this.pedidosFiltrados.sort((a, b) => {
        return a.distrito.distrito.toLowerCase() >
          b.distrito.distrito.toLowerCase()
          ? 1
          : -1;
      });
    },

    sortPorMobiker() {
      this.pedidosFiltrados.sort((a, b) => {
        return a.mobiker.fullName.toLowerCase() >
          b.mobiker.fullName.toLowerCase()
          ? 1
          : -1;
      });
    },

    sortPorEstado() {
      this.pedidosFiltrados.sort((a, b) => {
        return a.status.tag.toLowerCase() > b.status.tag.toLowerCase() ? 1 : -1;
      });
    },

    sortPorFecha() {
      this.pedidosFiltrados.sort((a, b) => {
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
