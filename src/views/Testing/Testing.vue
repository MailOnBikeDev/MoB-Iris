<template>
  <div class="p-4 mx-auto my-12 bg-gray-100 shadow-lg rounded-xl">
    <div class="flex justify-end">
      <h1
        class="relative inline-block px-6 py-2 mb-4 text-2xl font-bold text-center bg-gray-100 text-primary rounded-xl -top-12"
      >
        Nuevo Pedido Masivo
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

    <form class="h-full p-2 mt-2" autocomplete="off" ref="pedido">
      <div class="grid h-full grid-cols-1">
        <div class="px-1 text-3xl font-bold text-center text-primary">
          <h2>Origen</h2>
        </div>

        <!-- <div class="px-1 text-3xl font-bold text-center text-primary">
          <h2 v-if="nuevoPedido.rolCliente === 'Destinatario'">Origen</h2>
          <h2 v-else>Destino</h2>
        </div> -->

        <!-- FORMULARIO ORIGEN -->
        <div class="grid grid-cols-6 gap-2 p-2 border-r-2 border-secondary">
          <div>
            <button
              class="w-full py-2 mt-6 font-bold text-white rounded bg-secondary focus:outline-none"
              @click="asignarHoy()"
              type="button"
            >
              Para hoy
            </button>
          </div>

          <div>
            <button
              class="w-full py-2 mt-6 font-bold text-white rounded bg-secondary focus:outline-none"
              @click="asignarMañana()"
              type="button"
            >
              Para mañana
            </button>
          </div>

          <div>
            <label for="fecha" class="label-input"
              >Fecha Seleccionada</label
            >
            <datepicker
              v-model="nuevoPedido.fecha"
              v-validate="'required'"
              name="fecha"
              input-class="input"
              :monday-first="true"
              placeholder="Fecha del Pedido"
              :use-utc="true"
              :language="es"
            />
            <div
              v-if="errors.has('fecha')"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>La fecha es requerida</p>
            </div>
          </div>

          <div>
            <label for="contactoRemitente" class="label-input">Contacto</label>
            <input
              v-model="nuevoPedido.contactoRemitente"
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
              v-model="nuevoPedido.empresaRemitente"
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
              v-model="nuevoPedido.telefonoRemitente"
              type="string"
              v-validate="'required|min:6|max:12'"
              name="telefonoRemitente"
              class="input"
            />
            <div
              v-if="errors.has('telefonoRemitente')"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>El teléfono es requerido y tener máximo 9 números</p>
            </div>
          </div>

          <div class="col-span-2 ">
            <label for="direccionRemitente" class="label-input"
              >Direccion</label
            >
            <input
              v-model="nuevoPedido.direccionRemitente"
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
              v-model="nuevoPedido.distritoRemitente"
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
              v-model="nuevoPedido.otroDatoRemitente"
              type="text"
              class="input"
            />
          </div>

          <div>
            <label for="formaPago" class="label-input">Forma de pago</label>
            <model-list-select
              name="formaPago"
              v-model="nuevoPedido.formaPago"
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

          <!-- <div>
            <label for="tarifa" class="label-input">Tarifa</label>
            <input
              v-model.number="nuevoPedido.tarifa"
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
          </div> -->

          <!-- <div>
            <label for="tarifaSugerida" class="label-input"
              >Tarifa Sugerida</label
            >
            <p class="w-full h-10 p-2 bg-white rounded tex-gray-700">
              {{ tarifaSugerida }}
            </p>
          </div> -->

          <!-- <div class="col-span-2"> -->
          <div>
            <label for="tipoCarga" class="label-input">Tipo de Carga</label>
            <model-list-select
              name="tipoCarga"
              v-model="nuevoPedido.tipoCarga"
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
            <label for="tipoEnvio" class="label-input">Tipo de Envío</label>
            <model-list-select
              name="tipoEnvio"
              v-model="nuevoPedido.tipoEnvio"
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
            <label for="status" class="label-input">Estado del Pedido</label>
            <model-list-select
              name="status"
              v-model="nuevoPedido.status"
              :list="statusDelPedido"
              v-validate="'required'"
              option-text="tag"
              option-value="id"
            />
          </div>

          <!-- <div>
            <label for="modalidad" class="label-input">Modalidad</label>
            <model-list-select
              name="modalidad"
              v-model="nuevoPedido.modalidad"
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
          </div> -->

          <div>
            <label for="rol" class="label-input">Rol</label>
            <model-list-select
              name="rolCliente"
              :list="rolCliente"
              v-model="nuevoPedido.rolCliente"
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

          <div>
            <label for="mobiker" class="label-input">Mobiker</label>
            <model-list-select
              name="mobiker"
              v-model="nuevoPedido.mobiker"
              placeholder="Buscar distrito..."
              :list="mobikersFiltrados"
              v-validate="'required'"
              option-text="fullName"
              option-value="fullName"
            />
            <div
              v-if="errors.has('mobiker') || errorCalcularDistancia"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>El MoBiker es requerido</p>
            </div>
          </div>
        </div>

        <!-- FORMULARIO DESTINO --
        <div class="grid grid-cols-3 gap-2 p-2">
          <div>
            <label for="tipoEnvio" class="label-input">Tipo de Envío</label>
            <model-list-select
              name="tipoEnvio"
              v-model="nuevoPedido.tipoEnvio"
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
              v-model="nuevoPedido.modalidad"
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
              v-model="nuevoPedido.status"
              :list="statusDelPedido"
              v-validate="'required'"
              option-text="tag"
              option-value="id"
            />
          </div>

          <div>
            <label for="contactoConsignado" class="label-input">Contacto</label>
            <input
              v-model="nuevoPedido.contactoConsignado"
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
              v-model="nuevoPedido.empresaConsignado"
              type="text"
              name="empresaConsignado"
              class="input"
            />
          </div>

          <div>
            <label for="telefonoConsignado" class="label-input">Teléfono</label>
            <input
              v-model="nuevoPedido.telefonoConsignado"
              type="string"
              v-validate="'required|min:6|max:12'"
              name="telefonoConsignado"
              class="input"
            />
            <div
              v-if="errors.has('telefonoConsignado')"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>El telefono es requerido y debe tener máximo 9 números</p>
            </div>
          </div>

          <div class="col-span-2">
            <label for="direccionConsignado" class="label-input"
              >Dirección</label
            >
            <input
              v-model="nuevoPedido.direccionConsignado"
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
              v-model="nuevoPedido.distritoConsignado"
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
              v-model="nuevoPedido.otroDatoConsignado"
              type="text"
              class="input"
            />
          </div>

          <div>
            <label for="comision" class="label-input">Comisión</label>
            <p class="w-full h-10 p-2 bg-white rounded tex-gray-700">
              {{ nuevoPedido.comision }}
            </p>
          </div>

          <div>
            <label for="mobiker" class="label-input">Mobiker</label>
            <model-list-select
              name="mobiker"
              v-model="nuevoPedido.mobiker"
              placeholder="Buscar distrito..."
              :list="mobikersFiltrados"
              v-validate="'required'"
              option-text="fullName"
              option-value="fullName"
            />
            <div
              v-if="errors.has('mobiker') || errorCalcularDistancia"
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
              {{ nuevoPedido.distancia }}
            </p>
            <div
              v-if="errorCalcularDistancia === true"
              class="p-2 text-sm text-white bg-red-500 rounded"
            >
              <p>Falta calcular la distancia</p>
            </div>
          </div>

          <div>
            <label for="recaudo" class="label-input">Recaudo</label>
            <input
              v-model.number="nuevoPedido.recaudo"
              type="number"
              class="input"
            />
          </div>

          <div>
            <label for="tramite" class="label-input">Trámite</label>
            <input
              v-model.number="nuevoPedido.tramite"
              type="number"
              class="input"
            />
          </div>
        </div>
        -->
      </div>

      <div class="flex flex-row justify-between mt-2">
       
      </div> 

      <!-- Aqui va el CSV -->
      <div class="w-full max-h-screen p-4 mt-5 bg-gray-100 rounded-xl">
        <div class="px-1 text-3xl font-bold text-center text-primary">
            <h2>
              Destinos
            </h2>
          </div>
        <input type="file" @change="onFileChanged" multiple />
        <!-- <button @click="uploadFile">Enviar</button> -->

        <div style="width: 100%; min-height: 250px">
          <div v-if="showLoading" wire:loading class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
            <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
            <p class="w-1/3 text-center text-white">This may take a few seconds, please don't close this page.</p>
          </div>                                      
          <table class="table-auto">
            <thead>
              <tr>
                <th>Contacto</th>
                <th>Empresa</th>
                <th>Telefono</th>
                <th>Direccion</th>
                <th>Distrito</th>
                <th>Observaciones</th>
                <th>Distancia</th>
                <th>Tarifa</th>
                <th>Recaudo</th>
                <th>Tramite</th>
                <th>Modalidad</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(pedido, index) in pedidos" :key="pedido.contactoConsignado">
                <td>{{pedido.contactoConsignado}}</td>
                <td>{{pedido.empresaConsignado}}</td>
                <td>{{pedido.telefonoConsignado}}</td>
                <td><input class="input input2" type="text" v-model="pedido.direccionConsignado"></td>
                <td>{{ pedido.distritoConsignado }}</td>
                <td>{{pedido.otroDatoConsignado}}</td>
                <td>{{ pedido.distancia }}</td>
                <td><input class="input input2" type="number" v-model="pedido.tarifa" v-on:keyup="changeTarifa" @change="changeTarifa"></td>
                <td><input class="input input2" type="number" v-model="pedido.recaudo" v-on:keyup="changeRecaudo" @change="changeRecaudo"></td>
                <td><input class="input input2" type="number" v-model="pedido.tramite" v-on:keyup="changeTramite" @change="changeTramite"></td>
                <td>
                  <model-list-select
                    name="modalidad"
                    v-model="pedido.modalidad"
                    v-validate="'required'"
                    :list="modalidades"
                    option-text="tipo"
                    option-value="tipo"
                    @input="changeModalidad(pedido.modalidad, index)"
                  />
                </td>
              </tr>
              <tr style="background-color: aliceblue;">
                 <td style="font-weight: 600; font-size:18px; padding: 5px;">Total: </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td style="font-weight: 600;text-align:center; font-size:18px; padding: 5px;">$ <span>{{ tarifaTotal }}</span></td>
                <td style="font-weight: 600;text-align:center; font-size:18px; padding: 5px;">$ <span>{{ recaudoTotal }}</span></td>
                <td style="font-weight: 600;text-align:center; font-size:18px; padding: 5px;">$ <span>{{ tramiteTotal }}</span></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Aqui termina CSV -->
      <div style="width: 100%; display: flex; justify-content: space-between;">
<button
          @click="cancelar"
          type="button"
          class="block px-6 py-2 mx-auto font-bold text-white transition duration-200 bg-red-500 rounded-lg shadow-lg hover:bg-red-700 hover:shadow-xl focus:outline-none"
        >
          Cancelar
        </button>

        <!-- <button
          type="submit"
          @click.prevent="handleAnadirPedido"
          class="block px-6 py-2 mx-auto font-bold text-white transition duration-200 bg-green-500 rounded-lg shadow-lg hover:bg-green-700 hover:shadow-xl focus:outline-none"
        >
          Añadir otro Pedido
        </button> -->

        <button
          v-if="nuevoPedido.mobiker === 'Asignar MoBiker'"
          type="submit"
          @click.prevent="handleNuevoPedido"
          class="block px-6 py-2 mx-auto font-bold text-white transition duration-200 bg-yellow-500 rounded-lg shadow-lg hover:bg-yellow-600 hover:shadow-xl focus:outline-none"
        >
          Programar Pedido
        </button>

        <button
          v-else
          type="submit"
          @click.prevent="handleNuevoPedido"
          class="block px-6 py-2 mx-auto font-bold text-white transition duration-200 rounded-lg shadow-lg bg-info hover:bg-secondary hover:shadow-xl focus:outline-none"
        >
          Asignar Pedido
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
import PedidoService from "@/services/pedido.service";
import BuscadorCliente from "@/components/BuscadorCliente";
import Datepicker from "vuejs-datepicker";
import { mapState, mapActions } from "vuex";
import { es } from "vuejs-datepicker/dist/locale";
import TestingService from "@/services/testing.service";

import consultarApi from "@/services/maps.service";
import calcularTarifa from "@/services/tarifa.service";
import calcularEstadisticas from "@/services/ecoamigable.service";

export default {
  name: "nuevoPedido",
  data() {
    return {
      nuevoPedido: new Pedido(),
      showBuscador: false,
      mobikersFiltrados: [],
      alert: {
        message: "",
        success: false,
        show: false,
      },
      errorCalcularDistancia: false,
      tarifaSugerida: 0,
      memoriaCliente: null,
      es: es,
      file: null,
      pedidos: [],
      tarifaTotal: 0,
      tarifaTotalSugerida:0,
      distanciaTotal: 0,
      recaudoTotal: 0,
      tramiteTotal: 0,
      showLoading: false,
    };
  },
  async mounted() {
    this.nuevoPedido.tarifa = 0;
    this.nuevoPedido.comision = 0.0;
    this.nuevoPedido.recaudo = 0;
    this.nuevoPedido.tramite = 0;

    this.mobikersFiltrados = this.mobikers
      .filter((mobiker) => mobiker.status === "Activo")
      .sort((a, b) => {
        return a.fullName.localeCompare(b.fullName);
      });
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

    ...mapState("mobikers", ["mobikers"]),
  },
  watch: {
    "nuevoPedido.mobiker": async function() {
      if (this.nuevoPedido.mobiker === "Asignar MoBiker") {
        this.nuevoPedido.status = 1;
      } else {
        this.nuevoPedido.status = 2;
      }

      if (this.nuevoPedido.mobiker) {
        const comision = await this.obtenerComision(this.nuevoPedido.mobiker);
        this.nuevoPedido.comision =
          this.nuevoPedido.tarifa !== 0
            ? +(this.nuevoPedido.tarifa * comision).toFixed(2)
            : 0;
      }
    },

    "nuevoPedido.status": function() {
      if (this.nuevoPedido.status === 1) {
        this.nuevoPedido.mobiker = "Asignar MoBiker";
      }
    },

    "nuevoPedido.tarifa": async function() {
      if (this.nuevoPedido.mobiker) {
        const comision = await this.obtenerComision(this.nuevoPedido.mobiker);
        this.nuevoPedido.comision =
          this.nuevoPedido.tarifa !== 0
            ? (this.nuevoPedido.tarifa * comision).toFixed(2)
            : 0;
      }
    },

    "nuevoPedido.modalidad": function() {
      if (this.nuevoPedido.modalidad === "Con Retorno") {
        this.nuevoPedido.viajes = 2;
        // if (this.nuevoPedido.tipoEnvio === "E-Commerce") {
        //   this.nuevoPedido.tarifa *= 2;
        // } else {
        //   this.nuevoPedido.tarifa += +Math.ceil(this.nuevoPedido.tarifa / 2);
        // }
      }
      if (this.nuevoPedido.modalidad === "Una vía") {
        this.nuevoPedido.viajes = 1;
        //this.nuevoPedido.tarifa = this.tarifaMemoria;
      }
    },
  },
  methods: {
    ...mapActions("mobikers", ["obtenerComision"]),

    changeModalidad (modalidad, index) {
      if (modalidad === "Con Retorno") {
        if(this.pedidos[index].viajes !== 2){
          if (this.nuevoPedido.tipoEnvio === "E-Commerce") {
            this.pedidos[index].tarifa *= 2;
          } else {
            this.pedidos[index].tarifa += +Math.ceil(this.pedidos[index].tarifa / 2);
          }
        }
        this.pedidos[index].viajes = 2;
      }
      if (modalidad === "Una vía") {
        this.pedidos[index].viajes = 1;
        this.pedidos[index].tarifa = this.pedidos[index].tarifaMemoria;
      }
      this.changeTarifa();
    },

    changeTarifa(){
      let total = 0;
      for(let i in this.pedidos){
        if(this.pedidos[i].tarifa === '' || this.pedidos[i].tarifa === null){
          this.pedidos[i].tarifa = 0;
        }
        total += parseFloat(this.pedidos[i].tarifa);
      }
      this.tarifaTotal = total;
    },

    changeRecaudo(){
      let total = 0;
      for(let i in this.pedidos){
        if(this.pedidos[i].recaudo === '' || this.pedidos[i].recaudo === null){
          this.pedidos[i].recaudo = 0;
        }
        total += parseFloat(this.pedidos[i].recaudo);
      }
      this.recaudoTotal = total;
    },

    changeTramite(){
      let total = 0;
      for(let i in this.pedidos){
        if(this.pedidos[i].tramite === '' || this.pedidos[i].tramite === null){
          this.pedidos[i].tramite = 0;
        }
        total += parseFloat(this.pedidos[i].tramite);
      }
      this.tramiteTotal = total;
    },

    async handleNuevoPedido() {
      try {
        this.showLoading = true;
        let response = {};
        for(let i = 0; i < this.pedidos.length; i++){
          this.nuevoPedido.operador = this.$store.getters.operador;
          let pedido = {
            fecha: this.nuevoPedido.fecha,
            contactoRemitente: this.nuevoPedido.contactoRemitente,
            empresaRemitente: this.nuevoPedido.empresaRemitente,
            direccionRemitente: this.nuevoPedido.direccionRemitente,
            distritoRemitente: this.nuevoPedido.distritoRemitente,
            telefonoRemitente: this.nuevoPedido.telefonoRemitente,
            otroDatoRemitente: this.nuevoPedido.otroDatoRemitente,
            contactoConsignado: this.pedidos[i].contactoConsignado,
            empresaConsignado: this.pedidos[i].empresaConsignado,
            direccionConsignado: this.pedidos[i].direccionConsignado,
            telefonoConsignado: this.pedidos[i].telefonoConsignado,
            otroDatoConsignado: this.pedidos[i].otroDatoConsignado,
            distritoConsignado: this.pedidos[i].distritoConsignado,
            tipoCarga: this.nuevoPedido.tipoCarga,
            formaPago: this.nuevoPedido.formaPago,
            tarifa: this.pedidos[i].tarifa,
            recaudo: this.pedidos[i].recaudo,
            tramite: this.pedidos[i].tramite,
            comision: this.nuevoPedido.comision,
            distancia: this.pedidos[i].distancia,
            CO2Ahorrado: this.pedidos[i].CO2Ahorrado,
            ruido: this.pedidos[i].ruido,
            status: this.nuevoPedido.status,
            mobiker: this.nuevoPedido.mobiker,
            tipoEnvio: this.nuevoPedido.tipoEnvio,
            modalidad: this.nuevoPedido.modalidad,
            operador: this.nuevoPedido.operador,
            rolCliente: this.nuevoPedido.rolCliente,
            viajes: this.pedidos[i].viajes
          }
          const isValid = await this.$validator.validateAll();
          // if (this.nuevoPedido.distancia === (null || undefined)) {
          //   this.errorCalcularDistancia = true;
          //   return;
          // }
          if (!isValid) {
            return;
          }
          response = await PedidoService.storageNuevoPedido(
            pedido
          );
        }
        this.showLoading = false;
        this.alert.message = response.data.message;
        this.alert.show = true;
        this.alert.success = true;

        setTimeout(() => {
          this.$router.push("pedidos/tablero-pedidos");
        }, 1500);
      } catch (error) {
        console.log(
          `Error al crear Nuevo Pedido: ${error.response.data.message}`
        );
        this.alert.message = error.response.data.message;
        this.alert.show = true;
        this.alert.success = false;
        setTimeout(() => (this.alert.show = false), 2500);
      }
    },

    async handleAnadirPedido() {
      try {
        const isValid = await this.$validator.validateAll();
        if (!isValid) {
          return;
        }

        this.nuevoPedido.operador = this.$store.getters.operador;

        const response = await PedidoService.storageNuevoPedido(
          this.nuevoPedido
        );
        this.alert.message = response.data.message;
        this.alert.show = true;
        this.alert.success = true;
        this.memoriaCliente.fecha = this.nuevoPedido.fecha;

        setTimeout(() => {
          this.alert.show = false;
        }, 1500);

        this.resetForm();
      } catch (error) {
        console.log(
          `Error al añadir Nuevo Pedido: ${error.response.data.message}`
        );
        this.alert.message = error.response.data.message;
        this.alert.show = true;
        this.alert.success = false;
        setTimeout(() => (this.alert.show = false), 2500);
      }
    },

    resetForm() {
      this.nuevoPedido.fecha = this.memoriaCliente.fecha;
      this.nuevoPedido.contactoRemitente = this.memoriaCliente.contacto;
      this.nuevoPedido.empresaRemitente = this.memoriaCliente.razonComercial;
      this.nuevoPedido.telefonoRemitente = this.memoriaCliente.telefono;
      this.nuevoPedido.direccionRemitente = this.memoriaCliente.direccion;
      this.nuevoPedido.distritoRemitente = this.memoriaCliente.distrito.distrito;
      // this.nuevoPedido.otroDatoRemitente = this.memoriaCliente.otroDato;
      this.nuevoPedido.formaPago = this.memoriaCliente.formaDePago.pago;
      this.nuevoPedido.tarifa = 0;
      this.nuevoPedido.tarifaSugerida = 0;
      this.nuevoPedido.tipoCarga = this.memoriaCliente.tipoDeCarga.tipo;
      this.nuevoPedido.rolCliente = this.memoriaCliente.rolCliente.rol;
      this.nuevoPedido.tipoEnvio = this.memoriaCliente.tipoDeEnvio.tipo;
      this.nuevoPedido.modalidad = "Una vía";
      this.nuevoPedido.contactoConsignado = null;
      this.nuevoPedido.empresaConsignado = null;
      this.nuevoPedido.telefonoConsignado = null;
      this.nuevoPedido.direccionConsignado = null;
      this.nuevoPedido.distritoConsignado = "";
      this.nuevoPedido.otroDatoConsignado = null;
      this.nuevoPedido.comision = 0;
      this.nuevoPedido.distancia = 0;
      this.nuevoPedido.recaudo = 0;
      this.nuevoPedido.tramite = 0;

      if (this.nuevoPedido.mobiker === "Asignar MoBiker") {
        this.nuevoPedido.status = 1;
        this.nuevoPedido.mobiker = "Asignar MoBiker";
      }
    },

    async probandoDistancia(direccion, distrito){
      let response = await consultarApi(
        this.nuevoPedido.direccionRemitente,
        this.nuevoPedido.distritoRemitente,
        direccion,
        distrito
      )
      return response;
    },

    async calcularDistancia(direccion = null, distrito = null) {
      let data = {
        distancia: null,
        tarifa: null,
        tarifaMemoria: null,
        tarifaSugerida: null,
        CO2Ahorrado: null,
        ruido:null
      }
      try {
        if (direccion != null && distrito != null) {

          data.distancia = await consultarApi(
            this.nuevoPedido.direccionRemitente,
            this.nuevoPedido.distritoRemitente,
            direccion,
            distrito
          );

          const response = calcularTarifa(
            data.distancia,
            this.nuevoPedido.tipoEnvio
          );

          data.tarifa = response.tarifa;
          data.tarifaMemoria = response.tarifa;
          data.tarifaSugerida = response.tarifaSugerida;

          // Calcular las estadísticas Ecoamigables
          const stats = calcularEstadisticas(data.distancia);
          data.CO2Ahorrado = stats.co2;
          data.ruido = stats.ruido; 

          return data;
          
        }else{
          return 0;
        }
      } catch (error) {
        console.error("Mensaje de error: ", error.message);
      } 
    },

    cancelar() {
      console.log("Creación de Pedido cancelada");
      history.go(-1);
    },

    activarCliente(cliente) {
      if (cliente) {
        this.nuevoPedido.contactoRemitente = cliente.contacto;
        this.nuevoPedido.empresaRemitente = cliente.razonComercial;
        this.nuevoPedido.telefonoRemitente = cliente.telefono;
        this.nuevoPedido.direccionRemitente = cliente.direccion;
        this.nuevoPedido.distritoRemitente = cliente.distrito.distrito;
        this.nuevoPedido.otroDatoRemitente = cliente.otroDato;
        this.nuevoPedido.tipoCarga = cliente.tipoDeCarga.tipo;
        this.nuevoPedido.formaPago = cliente.formaDePago.pago;
        this.nuevoPedido.statusFinanciero = 1;
        this.nuevoPedido.rolCliente = cliente.rolCliente.rol;
        this.nuevoPedido.tipoEnvio = cliente.tipoDeEnvio.tipo;
        this.nuevoPedido.modalidad = "Una vía";
        this.nuevoPedido.status = 1;

        this.memoriaCliente = cliente;
        this.memoriaCliente.fecha = new Date();
      }
    },

    asignarHoy() {
      let hoy = new Date().toISOString().split("T")[0];
      return (this.nuevoPedido.fecha = hoy);
    },

    asignarMañana() {
      let hoy = new Date();
      let DIA_EN_MS = 24 * 60 * 60 * 1000;
      let manana = new Date(hoy.getTime() + DIA_EN_MS)
        .toISOString()
        .split("T")[0];
      return (this.nuevoPedido.fecha = manana);
    },

    onFileChanged(event) {
      this.file = event.target.files[0];
			this.uploadFile();
    },

    async uploadFile() {
      try {
        this.showLoading = true;
        const mypostparameters = new FormData();
        mypostparameters.append("file", this.file, this.file.name);

        let response = await TestingService.testFile(mypostparameters);
				let data = response.data.data;

        for(let i = 0; i < data.length; i++){
          let info = await this.calcularDistancia(data[i].direccionConsignado, data[i].distritoConsignado);
          data[i]['distancia'] = info.distancia;
          data[i]['tarifa'] = info.tarifa;
          data[i]['tarifaMemoria'] = info.tarifaMemoria;
          data[i]['tarifaSugerida'] = info.tarifaSugerida;
          data[i]['CO2Ahorrado'] = info.CO2Ahorrado;
          data[i]['ruido'] = info.ruido;
          data[i]['recaudo'] = 0;
          data[i]['tramite'] = 0;
          data[i]['modalidad'] = 'Una vía';
          data[i]['viajes'] = 1;
          this.tarifaTotal = this.tarifaTotal + info.tarifa;
          this.distancia += info.distancia;
          this.recaudoTotal = 0;
          this.tramiteTotal = 0;
        }  
        this.pedidos = [];
        this.pedidos = data;
        this.showLoading = false;
      } catch (error) {
        console.log(error);
      }
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


<style lang="scss">
  table{
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    overflow: scroll;
  }
  thead{
    display: table-header-group;
    vertical-align: middle;
    border-color: inherit;
    tr{
      display: table-row;
      vertical-align: inherit;
      border-color: inherit;
    }
    th{
        padding: .75rem;
        display: table-cell;
        text-align: inherit;
        vertical-align: bottom;
        border-bottom: 3px solid #ccc;
      }
  }

  tbody tr{
    border-bottom: 1px solid #ccc;
    td {
      font-size: 12px;
    }
  }

  .input2{
    width: 90%;
    border-radius: 3px;
    margin: 5px;
  }

  .loader {
    border-top-color: #3498db;
    -webkit-animation: spinner 1.5s linear infinite;
    animation: spinner 1.5s linear infinite;
  }

  @-webkit-keyframes spinner {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
    