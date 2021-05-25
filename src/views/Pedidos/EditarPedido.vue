<template>
  <div class="p-4 mx-auto my-12 bg-gray-100 shadow-lg rounded-xl">
    <div class="flex justify-end">
      <h1
        class="relative inline-block px-6 py-2 mb-4 text-2xl font-bold text-center bg-gray-100 text-primary rounded-xl -top-12"
      >
        Editar Pedido
      </h1>
    </div>

    <div class="flex flex-row px-4 -mt-12">
      <div>
        <button
          class="relative px-4 py-1 font-bold text-white bg-primary left-56 rounded-xl focus:outline-none"
          @click="showBuscador = true"
        >
          Buscar cliente
        </button>
      </div>

      <BuscadorCliente
        :showBuscador="showBuscador"
        @cerrarBuscador="showBuscador = false"
        @activarCliente="activarCliente"
      />
    </div>

    <form class="h-full p-2 mt-2" autocomplete="off">
      <div class="grid h-full grid-cols-2">
        <div class="px-1 text-3xl font-bold text-center text-primary">
          <h2 v-if="editarPedido.rolCliente === 'Destinatario'">
            Destino
          </h2>
          <h2 v-else>Origen</h2>
        </div>

        <div class="px-1 text-3xl font-bold text-center text-primary">
          <h2 v-if="editarPedido.rolCliente === 'Destinatario'">Origen</h2>
          <h2 v-else>Destino</h2>
        </div>

        <!-- FORMULARIO ORIGEN -->
        <div class="grid grid-cols-3 gap-2 p-2 border-r-2 border-secondary">
          <div>
            <button
              class="w-full py-2 mt-5 font-bold text-white rounded bg-secondary focus:outline-none"
              @click="asignarHoy()"
              type="button"
            >
              Para hoy
            </button>
          </div>

          <div>
            <button
              class="w-full py-2 mt-5 font-bold text-white rounded bg-secondary focus:outline-none"
              @click="asignarMañana()"
              type="button"
            >
              Para mañana
            </button>
          </div>
          <div>
            <label for="fecha" class="block ml-1 text-sm font-bold text-primary"
              >Fecha</label
            >
            <datepicker
              v-model="editarPedido.fecha"
              v-validate="'required'"
              name="fechaNacimiento"
              input-class="input"
              :monday-first="true"
            />
          </div>

          <div>
            <label for="contactoRemitente" class="label-input">Contacto</label>
            <input
              v-model="editarPedido.contactoRemitente"
              type="text"
              v-validate="'required'"
              name="contactoRemitente"
              class="input"
            />
            <div
              v-if="errors.has('contactoRemitente')"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>El contacto del cliente es requerido</p>
            </div>
          </div>

          <div>
            <label for="empresaRemitente" class="label-input">Empresa</label>
            <input
              v-model="editarPedido.empresaRemitente"
              type="text"
              v-validate="'required'"
              name="empresaRemitente"
              class="input"
            />
            <div
              v-if="errors.has('empresaRemitente')"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>La empresa del cliente es requerida</p>
            </div>
          </div>

          <div>
            <label
              for="telefonoRemitente"
              class="mb-1 ml-1 text-sm font-bold text-primary"
              >Teléfono</label
            >
            <input
              v-model="editarPedido.telefonoRemitente"
              type="number"
              v-validate="'required|length:9'"
              name="telefonoRemitente"
              class="input"
            />
            <div
              v-if="errors.has('telefonoRemitente')"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>El teléfono es requerido</p>
            </div>
          </div>

          <div class="col-span-2 ">
            <label for="direccionRemitente" class="label-input"
              >Direccion</label
            >
            <input
              v-model="editarPedido.direccionRemitente"
              type="text"
              v-validate="'required'"
              name="direccionRemitente"
              class="input"
            />
            <div
              v-if="errors.has('direccionRemitente') || errorCalcularDistancia"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>La dirección es requerida</p>
            </div>
          </div>

          <div>
            <label for="distritoRemitente" class="label-input">Distrito</label>
            <model-list-select
              name="distritoRemitente"
              v-model="editarPedido.distritoRemitente"
              v-validate="'required'"
              placeholder="Buscar distrito..."
              class="w-full"
              :list="distritos"
              option-text="distrito"
              option-value="distrito"
            />
            <div
              v-if="errors.has('distritoRemitente') || errorCalcularDistancia"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>El distrito es requerido</p>
            </div>
          </div>

          <div class="col-span-3">
            <label for="otroDatoRemitente" class="label-input">Otro Dato</label>
            <input
              v-model="editarPedido.otroDatoRemitente"
              type="text"
              class="input"
            />
          </div>

          <div>
            <label for="formaPago" class="label-input">Forma de pago</label>
            <model-list-select
              name="formaPago"
              v-model="editarPedido.formaPago"
              class="w-full"
              v-validate="'required'"
              :list="formasDePago"
              option-text="pago"
              option-value="pago"
            />
            <div
              v-if="errors.has('formaPago')"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>La forma de pago es requerida</p>
            </div>
          </div>

          <div>
            <label for="tarifa" class="label-input">Tarifa</label>
            <input
              v-model.number="editarPedido.tarifa"
              type="number"
              v-validate="'required'"
              name="tarifa"
              class="input"
            />
            <div
              v-if="errors.has('tarifa')"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>La tarifa es requerida</p>
            </div>
          </div>

          <div>
            <label for="tarifaSugerida" class="label-input"
              >Tarifa Sugerida</label
            >
            <p class="w-full h-10 p-2 bg-white rounded tex-gray-700">
              {{ (tarifaSugerida = sugerirTarifa) }}
            </p>
          </div>

          <div class="col-span-2">
            <label for="tipoCarga" class="label-input">Tipo de Carga</label>
            <model-list-select
              name="tipoCarga"
              v-model="editarPedido.tipoCarga"
              :list="tiposDeCarga"
              v-validate="'required'"
              option-text="tipo"
              option-value="tipo"
            />
            <div
              v-if="errors.has('tipoCarga')"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>El tipo de carga es requerido</p>
            </div>
          </div>

          <div>
            <label for="rol" class="label-input">Rol</label>
            <model-list-select
              name="rolCliente"
              :list="rolCliente"
              v-model="editarPedido.rolCliente"
              v-validate="'required'"
              option-text="rol"
              option-value="rol"
            />
            <div
              v-if="errors.has('rolCliente')"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>El rol del cliente es requerido</p>
            </div>
          </div>
        </div>

        <!-- FORMULARIO DESTINO -->
        <div class="grid grid-cols-3 gap-2 p-2">
          <div>
            <label for="tipoEnvio" class="label-input">Tipo de Envío</label>
            <model-list-select
              name="tipoEnvio"
              v-model="editarPedido.tipoEnvio"
              v-validate="'required'"
              :list="tiposDeEnvio"
              option-text="tipo"
              option-value="tipo"
            />
            <div
              v-if="errors.has('tipoEnvio')"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>El tipo de Envío es requerido</p>
            </div>
          </div>

          <div>
            <label for="modalidad" class="label-input">Modalidad</label>
            <model-list-select
              name="modalidad"
              v-model="editarPedido.modalidad"
              v-validate="'required'"
              :list="modalidades"
              option-text="tipo"
              option-value="tipo"
            />
            <div
              v-if="errors.has('modalidad')"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>La modalidad es requerida</p>
            </div>
          </div>

          <div>
            <label for="status" class="label-input">Estado del Pedido</label>
            <model-list-select
              name="status"
              v-model="editarPedido.statusId"
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
            <label for="contactoConsignado" class="label-input">Contacto</label>
            <input
              v-model="editarPedido.contactoConsignado"
              type="text"
              v-validate="'required'"
              name="contactoConsignado"
              class="input"
            />
            <div
              v-if="errors.has('contactoConsignado')"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>El contacto es requerido</p>
            </div>
          </div>

          <div>
            <label for="empresaConsignado" class="label-input">Empresa</label>
            <input
              v-model="editarPedido.empresaConsignado"
              type="text"
              name="empresaConsignado"
              class="input"
            />
          </div>

          <div>
            <label for="telefonoConsignado" class="label-input">Teléfono</label>
            <input
              v-model="editarPedido.telefonoConsignado"
              type="number"
              v-validate="'required|length:9'"
              name="telefonoConsignado"
              class="input"
            />
            <div
              v-if="errors.has('telefonoConsignado')"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>El telefono es requerido y debe tener 9 caracteres</p>
            </div>
          </div>

          <div class="col-span-2">
            <label for="direccionConsignado" class="label-input"
              >Dirección</label
            >
            <input
              v-model="editarPedido.direccionConsignado"
              type="text"
              v-validate="'required'"
              name="direccionConsignado"
              class="input"
            />
            <div
              v-if="errors.has('direccionConsignado') || errorCalcularDistancia"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>La dirección es requerida</p>
            </div>
          </div>

          <div>
            <label for="distritoConsignado" class="label-input">Distrito</label>
            <model-list-select
              name="distritoConsignado"
              v-model="editarPedido.distritoConsignado"
              placeholder="Buscar distrito..."
              v-validate="'required'"
              :list="distritos"
              option-text="distrito"
              option-value="distrito"
            />
            <div
              v-if="errors.has('distritoConsignado') || errorCalcularDistancia"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>El distrito es requerido</p>
            </div>
          </div>

          <div class="col-span-3">
            <label for="otroDatoConsignado" class="label-input"
              >Otro Dato</label
            >
            <input
              v-model="editarPedido.otroDatoConsignado"
              type="text"
              class="input"
            />
          </div>

          <div>
            <label for="comision" class="label-input">Comisión</label>
            <p class="w-full h-10 p-2 bg-white rounded tex-gray-700">
              {{ (editarPedido.comision = calcularComision) }}
            </p>
          </div>

          <div>
            <label for="mobiker" class="label-input">Mobiker</label>
            <model-list-select
              name="mobiker"
              v-model="editarPedido.mobiker"
              placeholder="Buscar distrito..."
              :list="mobikers"
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

          <div class="text-center">
            <button
              class="p-2 mt-6 font-bold text-white bg-primary rounded-xl focus:outline-none"
              @click.prevent="calcularDistancia"
            >
              Calcular distancia
            </button>
          </div>

          <div>
            <label for="distancia" class="label-input">Distancia</label>
            <p class="w-full h-10 p-2 bg-white rounded tex-gray-700">
              {{ editarPedido.distancia }}
            </p>
          </div>

          <div>
            <label for="recaudo" class="label-input">Recaudo</label>
            <input
              v-model.number="editarPedido.recaudo"
              type="number"
              class="input"
            />
          </div>

          <div>
            <label for="tramite" class="label-input">Trámite</label>
            <input
              v-model.number="editarPedido.tramite"
              type="number"
              class="input"
            />
          </div>
        </div>
      </div>

      <div class="flex flex-row justify-between mt-2">
        <button
          @click="cancelar"
          type="button"
          class="block px-6 py-2 mx-auto font-bold text-white transition duration-200 bg-red-500 rounded-lg shadow-lg hover:bg-red-700 hover:shadow-xl focus:outline-none"
        >
          Cancelar
        </button>

        <button
          type="button"
          @click.prevent="anularPedido"
          class="block px-6 py-2 mx-auto font-bold text-white transition duration-200 bg-yellow-500 rounded-lg shadow-lg hover:bg-yellow-700 hover:shadow-xl focus:outline-none"
        >
          Anular
        </button>

        <button
          type="submit"
          @click.prevent="handleEditarPedido"
          class="block px-6 py-2 mx-auto font-bold text-white transition duration-200 rounded-lg shadow-lg bg-info hover:bg-secondary hover:shadow-xl focus:outline-none"
        >
          Editar Pedido
        </button>
      </div>
    </form>

    <transition name="alerta">
      <BaseAlerta v-if="alert.show" :alert="alert" />
    </transition>
  </div>
</template>

<script>
import BaseAlerta from "@/components/BaseAlerta.vue";
import Pedido from "@/models/pedido";
import { ModelListSelect } from "vue-search-select";
import MobikerService from "@/services/mobiker.service";
import PedidoService from "@/services/pedido.service";
import BuscadorCliente from "@/components/BuscadorCliente";
import Datepicker from "vuejs-datepicker";
import { mapState } from "vuex";
// import axios from "axios";
// import googleMaps_API from "@/googleMaps-API";

export default {
  data() {
    return {
      editarPedido: new Pedido(),
      showBuscador: false,
      alert: {
        message: "",
        success: false,
        show: false,
      },
      errorCalcularDistancia: false,
      mobikers: [],
      tarifaSugerida: null,
    };
  },
  async mounted() {
    try {
      this.getPedido(this.$route.params.id);

      let mobiker = await MobikerService.getMobikers();

      this.mobikers = mobiker.data.filter(
        (mobiker) => mobiker.status === "Activo"
      );
    } catch (error) {
      console.error("Mensaje de error:", error);
    }
  },
  computed: {
    ...mapState("auxiliares", [
      "distritos",
      "formasDePago",
      "tiposDeCarga",
      "rolCliente",
      "modalidades",
      "tiposDeEnvio",
      "statusDelPedido",
    ]),
    calcularComision() {
      let comision = this.editarPedido.tarifa * 0.6;
      return comision.toFixed(2);
    },

    sugerirTarifa() {
      let tarifaPorKm = 0.8;
      let tarifaSugerida = this.editarPedido.distancia * tarifaPorKm;
      return tarifaSugerida.toFixed(2);
    },
  },
  watch: {
    "editarPedido.mobiker": function() {
      if (this.editarPedido.mobiker.fullName === "Asignar MoBiker") {
        this.editarPedido.statusId = 1;
      } else {
        this.editarPedido.statusId = 2;
      }
    },
    "editarPedido.statusId": function() {
      if (this.editarPedido.statusId === 1) {
        this.editarPedido.mobiker.fullName = "Asignar MoBiker";
      }
    },
  },
  methods: {
    async getPedido(id) {
      try {
        let response = await PedidoService.getPedidoById(id);

        this.editarPedido = response.data;
        this.editarPedido.distritoConsignado = response.data.distrito.distrito;
        this.editarPedido.tipoEnvio = response.data.tipoDeEnvio.tipo;
      } catch (error) {
        console.error("Mensaje de error:", error);
      }
    },

    async handleEditarPedido() {
      try {
        const isValid = await this.$validator.validateAll();
        if (!isValid) {
          return;
        }

        const response = await PedidoService.editPedido(
          this.$route.params.id,
          this.editarPedido
        );
        this.alert.message = response.data.message;
        this.alert.show = true;
        this.alert.success = true;

        setTimeout(() => {
          this.$router.push("/pedidos/tablero-pedidos");
        }, 1500);
      } catch (error) {
        console.log(`Error al Editar Pedido: ${error.response.data.message}`);
        this.alert.message = error.response.data.message;
        this.alert.show = true;
        this.alert.success = false;
        setTimeout(() => (this.alert.show = false), 2500);
      }
    },

    async calcularDistancia() {
      try {
        if (
          !(
            this.nuevoPedido.direccionRemitente &&
            this.nuevoPedido.distritoRemitente &&
            this.nuevoPedido.direccionConsignado &&
            this.nuevoPedido.distritoConsignado
          )
        ) {
          this.errorCalcularDistancia = true;
          console.error("Mensaje de error: No se pudo calcular la distancia");
          return;
        }
        this.errorCalcularDistancia = false;
        // let origen = `${this.nuevoPedido.direccionRemitente.replace(
        // 	/ /g,
        // 	"+"
        // )}+${this.nuevoPedido.distritoRemitente.replace(/ /g, "+")}`;
        // let destino = `${this.nuevoPedido.direccionConsignado.replace(
        // 	/ /g,
        // 	"+"
        // )}+${this.nuevoPedido.distritoConsignado.replace(/ /g, "+")}`;

        // // console.log("Origen:", origen);
        // // console.log("Destino:", destino);

        // const API_URL = `https://cors-anywhere.herokuapp.com/${googleMaps_API.BASE_URL}/json?&origins=${origen}&destinations=${destino}&mode=walking&key=${process.env.VUE_APP_GOOGLEMAPS_API_KEY}`;

        // let distancia = await axios.get(API_URL);
        // // console.log(`Distancia: ${distancia}`);

        // let distanciaCalculada =
        // 	distancia.data.rows[0].elements[0].distance.value / 1000;

        // console.log(`distancia calculada: ${distanciaCalculada}`);

        let distanciaCalculada = 3.8;

        this.nuevoPedido.distancia = distanciaCalculada.toFixed(1);
        this.nuevoPedido.tarifa = 7.0;
        this.nuevoPedido.CO2Ahorrado = (
          this.nuevoPedido.distancia / 12
        ).toFixed(1);
        this.nuevoPedido.ruido = (this.nuevoPedido.distancia / 24).toFixed(2);
        this.nuevoPedido.recaudo = 0;
        this.nuevoPedido.tramite = 0;

        console.log(`
					\n distancia: ${this.nuevoPedido.distancia} Km,
					\n CO2: ${this.nuevoPedido.CO2Ahorrado} Kg,
					\n ruido: ${this.nuevoPedido.ruido} h`);

        return (
          this.nuevoPedido.distancia,
          this.nuevoPedido.tarifa,
          this.nuevoPedido.CO2Ahorrado,
          this.nuevoPedido.ruido
        );
      } catch (error) {
        console.error("Mensaje de error: ", error.message);
      }
    },

    cancelar() {
      this.$router.push("/pedidos/tablero-pedidos");
    },

    activarCliente(cliente) {
      if (cliente) {
        this.editarPedido.contactoRemitente = cliente.contacto;
        this.editarPedido.empresaRemitente = cliente.razonComercial;
        this.editarPedido.telefonoRemitente = cliente.telefono;
        this.editarPedido.direccionRemitente = cliente.direccion;
        this.editarPedido.distritoRemitente = cliente.distrito.distrito;
        this.editarPedido.otroDatoRemitente = cliente.otroDato;
        this.editarPedido.tipoCarga = cliente.tipoDeCarga.tipo;
        this.editarPedido.formaPago = cliente.formaDePago.pago;
        this.editarPedido.statusFinanciero = 1;
        this.editarPedido.rolCliente = cliente.rolCliente.rol;
      }
    },

    anularPedido() {
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          console.error("Mensaje de error: No se pudo editar el Pedido");
          return;
        } else {
          this.editarPedido.statusId = 17;
          // console.log(this.editarPedido.status);
          PedidoService.editPedido(
            this.$route.params.id,
            this.editarPedido
          ).then(
            (response) => {
              this.$router.push("/pedidos/tablero-pedidos");
              console.log(response.data.message);
              this.message = response.data.message;
            },
            (err) => console.error(`Mensaje de error: ${err.message}`)
          );
        }
      });
    },

    asignarHoy() {
      let hoy = new Date();
      return (this.editarPedido.fecha = hoy);
    },

    asignarMañana() {
      let hoy = new Date();
      let DIA_EN_MS = 24 * 60 * 60 * 1000;
      let manana = new Date(hoy.getTime() + DIA_EN_MS);
      return (this.editarPedido.fecha = manana);
    },
  },
  components: {
    ModelListSelect,
    BuscadorCliente,
    Datepicker,
    BaseAlerta,
  },
};
</script>
