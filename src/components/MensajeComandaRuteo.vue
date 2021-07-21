<template>
  <div>
    <pre>
Tipo Envío: **{{ formatearTipoEnvio(currentRuta[0].tipoDeEnvio.tipo) }}**
__Origen:__ {{ currentRuta[0].direccionRemitente }} - {{
        currentRuta[0].distritoRemitente
      }}
__Empresa:__ {{ currentRuta[0].empresaRemitente }}
__Contacto:__ {{ currentRuta[0].contactoRemitente }} - {{
        currentRuta[0].telefonoRemitente
      }}
{{
        currentRuta[0].otroDatoRemitente
          ? "**IMPORTANTE: " + currentRuta[0].otroDatoRemitente + "**"
          : undefined
      }}

**{{ currentRuta.length }} DESTINOS**
__Llevar:__ {{ currentRuta[0].tipoCarga }}
__Modalidad:__ RUTEO

__Tarifa:__ S/. {{ sumarTarifas(currentRuta) }} - {{
        formatearFormaPago(currentRuta[0].formaPago)
      }}
__Recaudo:__ S/. {{ sumarRecaudos(currentRuta) }}
__Trámite:__ S/. {{ sumarTramites(currentRuta) }}
__Mi comisión:__ S/. {{ sumarComisiones(currentRuta) }}
__CO2:__ {{ sumarCO2(currentRuta) }} Kg
__Horas de Ruido:__ {{ sumarHorasRuido(currentRuta) }} h
_____________________________________
</pre
    >
    <div v-for="(destino, idx) in currentRuta" :key="idx">
      <pre>

**Destino {{ idx + 1 }}**
__Pedido:__ #{{ destino.id }}
__Modalidad:__ **{{ destino.modalidad.tipo }}**
__Contacto:__ {{ destino.contactoConsignado }} {{
          destino.empresaConsignado
            ? "- " + destino.empresaConsignado
            : undefined
        }}
__Dirección:__ {{ destino.direccionConsignado }}
__Teléfono:__ {{ destino.telefonoConsignado }}
{{
          destino.otroDatoConsignado
            ? "**IMPORTANTE: " + destino.otroDatoConsignado + "**"
            : undefined
        }}
{{
          destino.recaudo !== 0
            ? "**COBRAR: S/. " + destino.recaudo + "**"
            : undefined
        }}
_____________________________________
</pre
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentRuta: {
      type: Array,
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

    sumarTarifas(pedidos) {
      const total = pedidos.reduce((acc, tarifa) => +tarifa.tarifa + acc, 0);

      return total;
    },

    sumarRecaudos(pedidos) {
      const total = pedidos.reduce((acc, recaudo) => +recaudo.recaudo + acc, 0);

      return total;
    },

    sumarTramites(pedidos) {
      const total = pedidos.reduce((acc, tramite) => +tramite.tramite + acc, 0);

      return total;
    },

    sumarComisiones(comisiones) {
      const total = comisiones.reduce(
        (acc, comision) => +comision.comision + acc,
        0
      );

      return total;
    },

    sumarCO2(emisiones) {
      const total = emisiones.reduce(
        (acc, emision) => +emision.CO2Ahorrado + acc,
        0
      );

      return total;
    },

    sumarHorasRuido(horas) {
      const total = horas.reduce((acc, hora) => +hora.ruido + acc, 0);

      return total;
    },
  },
};
</script>
