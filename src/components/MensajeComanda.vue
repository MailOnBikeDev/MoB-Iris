<template>
  <div v-if="currentPedido">
    <pre>
Tipo Envío: **{{ formatearTipoEnvio(currentPedido.tipoDeEnvio.tipo) }}**
__Origen:__ {{ currentPedido.direccionRemitente }} - {{
        currentPedido.distritoRemitente
      }}
__Empresa:__ {{ currentPedido.empresaRemitente }}
__Contacto:__ {{ currentPedido.contactoRemitente }} - {{
        currentPedido.telefonoRemitente
      }}
{{
        currentPedido.otroDatoRemitente
          ? "**IMPORTANTE: " + currentPedido.otroDatoRemitente + "**"
          : null
      }}

__Destino:__ {{ currentPedido.direccionConsignado }} - {{
        currentPedido.distrito.distrito
      }}
__Contacto:__ {{ currentPedido.contactoConsignado }} {{
        currentPedido.empresaConsignado
          ? "- " + currentPedido.empresaConsignado
          : null
      }}
__Teléfono:__ {{ currentPedido.telefonoConsignado }}
__Llevar:__ {{ currentPedido.tipoCarga }}
__Modalidad:__ {{ currentPedido.modalidad.tipo }}
{{
        currentPedido.otroDatoConsignado
          ? "**IMPORTANTE: " + currentPedido.otroDatoConsignado + "**"
          : null
      }}
{{
        currentPedido.recaudo !== 0
          ? "**COBRAR: S/. " + currentPedido.recaudo + "**"
          : null
      }}

__Tarifa:__ S/. {{ currentPedido.tarifa }} - {{
        formatearFormaPago(currentPedido.formaPago)
      }}
__Mi comisión:__ S/. {{ currentPedido.comision }}
__Pedido:__ #{{ currentPedido.id }}
__CO2:__ {{ currentPedido.CO2Ahorrado }} Kg
__Horas de Ruido:__ {{ currentPedido.ruido }} h</pre
    >
  </div>
</template>

<script>
export default {
  props: {
    currentPedido: {
      type: Object,
    },
  },
  methods: {
    formatearFormaPago(pago) {
      let nuevaFormaPago;

      let compararPago = pago.split(" ")[0];

      if (compararPago === "Crédito") {
        nuevaFormaPago = "Crédito";
      } else {
        nuevaFormaPago = pago;
      }

      return nuevaFormaPago;
    },

    formatearTipoEnvio(envio) {
      let nuevoTipoEnvio;

      if (envio === "EmpresaG" || envio === "Persona") {
        nuevoTipoEnvio = "Express";
      } else {
        nuevoTipoEnvio = envio;
      }

      return nuevoTipoEnvio;
    },
  },
};
</script>
