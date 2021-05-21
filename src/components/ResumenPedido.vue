<template>
  <div
    v-if="showResumen"
    class="absolute z-40 w-1/2 h-auto px-10 py-4 shadow-xl bg-primary top-14 left-1/4 rounded-xl"
  >
    <div class="absolute -top-4 -right-2">
      <button
        class="px-2 text-2xl text-white rounded-full bg-info hover:bg-secondary focus:outline-none"
        @click.prevent="cerrarResumen"
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

    <!-- Caso Cliente es Origen -->
    <div
      v-if="currentPedido.rolCliente === 'Remitente'"
      class="grid grid-cols-2 p-4 bg-white rounded-xl gap-x-8"
    >
      <div class="grid grid-flow-row px-4 py-2 text-sm">
        <h2 class="mb-4 text-3xl font-bold text-center text-primary">
          Origen
        </h2>
        <p class="mb-2">
          <span class="resalta">Fecha: </span>
          {{ $date(currentPedido.fecha).format("DD MMM YYYY") }}
        </p>
        <p class="mb-2">
          <span class="resalta">Carga: </span>
          {{ currentPedido.tipoCarga }}
        </p>
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
          <span class="resalta">Otro dato: </span
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
          <span class="resalta">Recaudo: </span>S/.
          {{ currentPedido.recaudo }}
        </p>
        <p class="mb-2">
          <span class="resalta">Trámite: </span>S/.
          {{ currentPedido.tramite }}
        </p>
      </div>

      <div class="grid grid-flow-row px-4 py-2 text-sm">
        <h2 class="mb-4 text-3xl font-bold text-center text-primary">
          Destino
        </h2>
        <p class="mb-2">
          <span class="resalta">Estado: </span
          >{{ currentPedido.status.codigo }} - {{ currentPedido.status.tag }}
        </p>
        <p class="mb-2">
          <span class="resalta">Modalidad: </span
          >{{ currentPedido.modalidad.tipo }}
        </p>
        <p class="mb-2">
          <span class="resalta">Contacto: </span>
          {{ currentPedido.contactoConsignado }}
        </p>
        <p class="mb-2" v-if="currentPedido.empresaConsignado">
          <span class="resalta">Empresa: </span
          >{{ currentPedido.empresaConsignado }}
        </p>
        <p class="mb-2">
          <span class="resalta">Dirección: </span
          >{{ currentPedido.direccionConsignado }}
        </p>
        <p class="mb-2">
          <span class="resalta">Distrito: </span
          >{{ currentPedido.distrito.distrito }}
        </p>
        <p class="mb-2">
          <span class="resalta">Teléfono: </span
          >{{ currentPedido.telefonoConsignado }}
        </p>
        <p class="mb-2" v-if="currentPedido.otroDatoConsignado">
          <span class="resalta">Otro dato: </span
          >{{ currentPedido.otroDatoConsignado }}
        </p>
        <p class="mb-2">
          <span class="resalta">MoBiker: </span
          >{{ currentPedido.mobiker.fullName }}
        </p>
        <p class="mb-2">
          <span class="resalta">Comisión: </span>S/.
          {{ currentPedido.comision }}
        </p>
        <p class="mb-2">
          <span class="resalta">Distancia: </span
          >{{ currentPedido.distancia }}Km
        </p>
        <p class="mb-2">
          <span class="resalta">CO2 Ahorrado: </span
          >{{ currentPedido.CO2Ahorrado }}Kg
        </p>
        <p class="mb-2">
          <span class="resalta">Horas de Ruido: </span
          >{{ currentPedido.ruido }}h
        </p>
      </div>
    </div>

    <!-- Caso Cliente es Destino -->
    <div v-else class="grid grid-cols-2 p-4 bg-white rounded-xl gap-x-8">
      <div class="grid grid-flow-row px-4 py-2 text-sm">
        <h2 class="mb-4 text-3xl font-bold text-center text-primary">
          Origen
        </h2>
        <p class="mb-2">
          <span class="resalta">Fecha: </span>
          {{ $date(currentPedido.fecha).format("DD MMM YYYY") }}
        </p>
        <p class="mb-2">
          <span class="resalta">Carga: </span>
          {{ currentPedido.tipoCarga }}
        </p>
        <p class="mb-2">
          <span class="resalta">Contacto: </span>
          {{ currentPedido.contactoConsignado }}
        </p>
        <p class="mb-2" v-if="currentPedido.empresaConsignado">
          <span class="resalta">Empresa: </span
          >{{ currentPedido.empresaConsignado }}
        </p>
        <p class="mb-2">
          <span class="resalta">Dirección: </span
          >{{ currentPedido.direccionConsignado }}
        </p>
        <p class="mb-2">
          <span class="resalta">Distrito: </span
          >{{ currentPedido.distrito.distrito }}
        </p>
        <p class="mb-2">
          <span class="resalta">Teléfono: </span
          >{{ currentPedido.telefonoConsignado }}
        </p>
        <p class="mb-2" v-if="currentPedido.otroDatoConsignado">
          <span class="resalta">Otro dato: </span
          >{{ currentPedido.otroDatoConsignado }}
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
          <span class="resalta">Recaudo: </span>S/.
          {{ currentPedido.recaudo }}
        </p>
        <p class="mb-2">
          <span class="resalta">Trámite: </span>S/.
          {{ currentPedido.tramite }}
        </p>
      </div>

      <div class="grid grid-flow-row px-4 py-2 text-sm">
        <h2 class="mb-4 text-3xl font-bold text-center text-primary">
          Destino
        </h2>
        <p class="mb-2">
          <span class="resalta">Estado: </span
          >{{ currentPedido.status.codigo }} - {{ currentPedido.status.tag }}
        </p>
        <p class="mb-2">
          <span class="resalta">Modalidad: </span
          >{{ currentPedido.modalidad.tipo }}
        </p>
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
          <span class="resalta">Otro dato: </span
          >{{ currentPedido.otroDatoRemitente }}
        </p>
        <p class="mb-2">
          <span class="resalta">MoBiker: </span
          >{{ currentPedido.mobiker.fullName }}
        </p>
        <p class="mb-2">
          <span class="resalta">Comisión: </span>S/.
          {{ currentPedido.comision }}
        </p>
        <p class="mb-2">
          <span class="resalta">Distancia: </span
          >{{ currentPedido.distancia }}Km
        </p>
        <p class="mb-2">
          <span class="resalta">CO2 Ahorrado: </span
          >{{ currentPedido.CO2Ahorrado }}Kg
        </p>
        <p class="mb-2">
          <span class="resalta">Horas de Ruido: </span
          >{{ currentPedido.ruido }}h
        </p>
      </div>
    </div>

    <div class="flex flex-row justify-around mt-6">
      <button
        class="px-6 py-2 font-bold text-white bg-secondary rounded-xl focus:outline-none hover:bg-info"
        @click="marcarAsignar"
      >
        Marcar para Asignar
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResumenPedido",
  props: {
    showResumen: {
      type: Boolean,
      required: true,
    },
    currentPedido: {
      type: Object,
    },
  },
  methods: {
    cerrarResumen() {
      this.$emit("cerrarResumen");
    },

    marcarAsignar() {
      this.$emit("marcarAsignar");
    },
  },
};
</script>
