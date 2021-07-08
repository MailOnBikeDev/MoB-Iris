<template>
  <div class="p-4 mx-auto my-12 bg-gray-100 shadow-lg rounded-xl">
    <div class="flex justify-end">
      <h1
        class="relative inline-block px-6 py-2 mb-4 text-2xl font-bold text-center bg-gray-100 text-primary rounded-xl -top-12"
      >
        Nuevo Ruteo
      </h1>
    </div>

    <div class="flex flex-row justify-center px-4 -mt-12">
      <div>
        <button
          class="px-4 py-1 font-bold text-white bg-primary rounded-xl focus:outline-none"
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

        <!-- FORMULARIO ORIGEN -->
        <div class="grid grid-cols-6 gap-2 p-2">
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
            <label for="fecha" class="label-input">Fecha Seleccionada</label>
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
      </div>

      <div class="flex flex-row justify-between mt-2"></div>

      <!-- Aqui va el CSV -->
      <div class="w-full max-h-screen p-4 mt-5 bg-gray-100 rounded-xl">
        <div class="px-1 text-3xl font-bold text-center text-primary">
          <h2>
            Destinos
          </h2>
        </div>
        <input type="file" @change="onFileChanged" multiple />

        <div style="width: 100%; min-height: 250px">
          <div
            v-if="showLoading"
            wire:loading
            class="fixed top-0 bottom-0 left-0 right-0 z-50 flex flex-col items-center justify-center w-full h-screen overflow-hidden bg-gray-700 opacity-75"
          >
            <div
              class="w-12 h-12 mb-4 ease-linear border-4 border-t-4 border-gray-200 rounded-full loader"
            ></div>
            <h2 class="text-xl font-semibold text-center text-white">
              Cargando...
            </h2>
            <p class="w-1/3 text-center text-white">
              Ésto puede tomar algunos segundos, no cierres la pagina por favor
              :D.
            </p>
          </div>
          <table class="table-auto">
            <thead class="text-primary">
              <tr>
                <th>Contacto</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Distrito</th>
                <th>Observaciones</th>
                <th>Distancia</th>
                <th>Tarifa</th>
                <th>Tarifa Sugerida</th>
                <th>Recaudo</th>
                <th>Trámite</th>
                <th>Modalidad</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(pedido, index) in pedidos"
                :key="pedido.contactoConsignado"
              >
                <td>{{ pedido.contactoConsignado }}</td>
                <td>{{ pedido.telefonoConsignado }}</td>
                <td>{{ pedido.direccionConsignado }}</td>
                <td>{{ pedido.distritoConsignado }}</td>
                <td>{{ pedido.otroDatoConsignado }}</td>
                <td>{{ pedido.distancia }} km</td>
                <td>
                  <input
                    class="input input2"
                    type="number"
                    v-model="pedido.tarifa"
                    v-on:keyup="changeTarifa"
                    @change="changeTarifa"
                  />
                </td>
                <td>{{ pedido.tarifaSugerida }}</td>
                <td>
                  <input
                    class="input input2"
                    type="number"
                    v-model="pedido.recaudo"
                    v-on:keyup="changeRecaudo"
                    @change="changeRecaudo"
                  />
                </td>
                <td>
                  <input
                    class="input input2"
                    type="number"
                    v-model="pedido.tramite"
                    v-on:keyup="changeTramite"
                    @change="changeTramite"
                  />
                </td>
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
              <tr class="bg-opacity-25 bg-info">
                <td class="p-1 text-lg font-bold text-primary">
                  Total:
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td class="p-1 text-lg font-bold text-center text-primary">
                  S/. <span>{{ tarifaTotal }}</span>
                </td>
                <td class="p-1 text-lg font-bold text-center text-primary">
                  S/. <span>{{ tarifaTotalSugerida }}</span>
                </td>
                <td class="p-1 text-lg font-bold text-center text-primary">
                  S/. <span>{{ recaudoTotal }}</span>
                </td>
                <td class="p-1 text-lg font-bold text-center text-primary">
                  S/. <span>{{ tramiteTotal }}</span>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Aqui termina CSV -->

      <!-- Aqui inicia la conversion ctrl-c ctrl-v de Excel -->
      <div class="w-full max-h-screen p-4 mt-5 bg-gray-100 rounded-xl">
        <textarea v-model="excelData" class="form-control" style="resize: none;" name="" id="" cols="30" rows="10"></textarea>
        <button type="button" class="block px-6 py-2 mx-auto font-bold text-white transition duration-200 rounded-lg shadow-lg bg-info hover:bg-secondary hover:shadow-xl focus:outline-none" @click="convertirExcelData">Convertir</button>
        <div id="tablaExcelData">
          <table class="table-auto">
            <tr v-for="(row, index) in tablaExcelData" :key="row[index]">
              <td v-for="td in row" :key="td">{{td}}</td>
            </tr>
          </table>
        </div>
      </div>
      <!-- Aqui inicia la conversion ctrl-c ctrl-v de Excel -->
      <div class="flex justify-between w-full">
        <button
          @click="cancelar"
          type="button"
          class="block px-6 py-2 mx-auto font-bold text-white transition duration-200 bg-red-500 rounded-lg shadow-lg hover:bg-red-700 hover:shadow-xl focus:outline-none"
        >
          Cancelar
        </button>

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

    <BaseAlerta v-if="alert.show" :alert="alert" />
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

import consultarApi from "@/services/maps.service";
import calcularTarifa from "@/services/tarifa.service";
import calcularEstadisticas from "@/services/ecoamigable.service";

export default {
  name: "Ruteo",
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
      memoriaCliente: null,
      es: es,
      file: null,
      pedidos: [],
      tarifaTotal: 0,
      tarifaTotalSugerida: 0,
      distanciaTotal: 0,
      recaudoTotal: 0,
      tramiteTotal: 0,
      showLoading: false,
      excelData: '',
      tablaExcelData: [],
    };
  },
  async mounted() {
    this.nuevoPedido.tarifa = 0;
    this.nuevoPedido.tarifaSugerida = 0;
    this.nuevoPedido.comision = 0.0;
    this.nuevoPedido.recaudo = 0;
    this.nuevoPedido.tramite = 0;

    this.mobikersFiltrados = this.mobikers.filter(
      (mobiker) => mobiker.status === "Activo"
    );
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

    changeModalidad(modalidad, index) {
      if (modalidad === "Con Retorno") {
        if (this.pedidos[index].viajes !== 2) {
          if (this.nuevoPedido.tipoEnvio === "E-Commerce") {
            this.pedidos[index].tarifa *= 2;
          } else {
            this.pedidos[index].tarifa += +Math.ceil(
              this.pedidos[index].tarifa / 2
            );
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

    changeTarifa() {
      let total = 0;
      for (let i in this.pedidos) {
        if (this.pedidos[i].tarifa === "" || this.pedidos[i].tarifa === null) {
          this.pedidos[i].tarifa = 0;
        }
        total += parseFloat(this.pedidos[i].tarifa);
      }
      this.tarifaTotal = total;
    },

    async convertirExcelData(){
      this.showLoading = true;
      var rows = this.excelData.split("\n");
      for(var y in rows) {
          var cells = rows[y].split("\t");
          //var row = '<tr>';
          var row = {};
          for(let x = 0; x < cells.length; x++) {
            console.log(x)
            switch (x){
              case 0: {
                row['contactoConsignado'] = cells[x];
                break;
              }
              case 1: {
                row['direccionConsignado'] = cells[x];
                break;
              }
              case 2: {
                row['distritoConsignado'] = cells[x];
                break;
              }
              case 3: {
                row['telefonoConsignado'] = cells[x];
                break;
              }
              case 4: {
                row['otroDatoConsignado'] = cells[x];
                break;
              }
            }
          }

          let info = await this.calcularDistancia(
            row.direccionConsignado,
            row.distritoConsignado
          );
          row["empresaConsignado"] = "";
          row["distancia"] = info.distancia;
          row["tarifa"] = info.tarifa;
          row["tarifaMemoria"] = info.tarifaMemoria;
          row["tarifaSugerida"] = info.tarifaSugerida;
          row["CO2Ahorrado"] = info.CO2Ahorrado;
          row["ruido"] = info.ruido;
          row["recaudo"] = 0;
          row["tramite"] = 0;
          row["modalidad"] = "Una vía";
          row["viajes"] = 1;
          this.tarifaTotal = this.tarifaTotal + info.tarifa;
          this.tarifaTotalSugerida = this.tarifaTotalSugerida + info.tarifaSugerida;
          this.distancia += info.distancia;
          this.recaudoTotal = 0;
          this.tramiteTotal = 0;
          this.pedidos.push(row);
      }
      this.showLoading = false;
    },

    changeRecaudo() {
      let total = 0;
      for (let i in this.pedidos) {
        if (
          this.pedidos[i].recaudo === "" ||
          this.pedidos[i].recaudo === null
        ) {
          this.pedidos[i].recaudo = 0;
        }
        total += parseFloat(this.pedidos[i].recaudo);
      }
      this.recaudoTotal = total;
    },

    changeTramite() {
      let total = 0;
      for (let i in this.pedidos) {
        if (
          this.pedidos[i].tramite === "" ||
          this.pedidos[i].tramite === null
        ) {
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
        for (let i = 0; i < this.pedidos.length; i++) {
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
            tarifaSugerida: this.pedidos[i].tarifaSugerida,
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
            viajes: this.pedidos[i].viajes,
          };
          const isValid = await this.$validator.validateAll();
          // if (this.nuevoPedido.distancia === (null || undefined)) {
          //   this.errorCalcularDistancia = true;
          //   return;
          // }
          if (!isValid) {
            return;
          }
          response = await PedidoService.storageNuevoPedido(pedido);
        }
        this.showLoading = false;
        this.alert.message = response.data.message;
        this.alert.show = true;
        this.alert.success = true;

        setTimeout(() => {
          this.$router.push("tablero-pedidos");
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

    async probandoDistancia(direccion, distrito) {
      let response = await consultarApi(
        this.nuevoPedido.direccionRemitente,
        this.nuevoPedido.distritoRemitente,
        direccion,
        distrito
      );
      return response;
    },

    async calcularDistancia(direccion = null, distrito = null) {
      let data = {
        distancia: null,
        tarifa: null,
        tarifaMemoria: null,
        tarifaSugerida: null,
        CO2Ahorrado: null,
        ruido: null,
      };
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
        } else {
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

        let response = await PedidoService.procesarCSV(mypostparameters);
        let data = response.data.data;

        for (let i = 0; i < data.length; i++) {
          let info = await this.calcularDistancia(
            data[i].direccionConsignado,
            data[i].distritoConsignado
          );
          data[i]["distancia"] = info.distancia;
          data[i]["tarifa"] = info.tarifa;
          data[i]["tarifaMemoria"] = info.tarifaMemoria;
          data[i]["tarifaSugerida"] = info.tarifaSugerida;
          data[i]["CO2Ahorrado"] = info.CO2Ahorrado;
          data[i]["ruido"] = info.ruido;
          data[i]["recaudo"] = 0;
          data[i]["tramite"] = 0;
          data[i]["modalidad"] = "Una vía";
          data[i]["viajes"] = 1;
          this.tarifaTotal = this.tarifaTotal + info.tarifa;
          this.tarifaTotalSugerida = this.tarifaTotalSugerida + info.tarifaSugerida;
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
table {
  width: 100%;
  max-width: 100%;
  min-width: 100%;
  overflow: scroll;
}

thead {
  display: table-header-group;
  vertical-align: middle;
  border-color: inherit;
  tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
  }
  th {
    padding: 0.75rem;
    display: table-cell;
    text-align: inherit;
    vertical-align: bottom;
    border-bottom: 3px solid #ccc;
  }
}

tbody tr {
  border-bottom: 1px solid #ccc;
  td {
    font-size: 12px;
    padding: 5px;
  }
}

.input2 {
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
