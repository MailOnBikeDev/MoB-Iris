<template>
  <div>
    <pre>
Tipo Envío: **{{
        formatearTipoEnvio(currentRuta.pedidosRuta[0].tipoDeEnvio.tipo)
      }}**
__Origen:__ {{ currentRuta.pedidosRuta[0].direccionRemitente }} - {{
        currentRuta.pedidosRuta[0].distritoRemitente
      }}
__Empresa:__ {{ currentRuta.pedidosRuta[0].empresaRemitente }}
__Contacto:__ {{ currentRuta.pedidosRuta[0].contactoRemitente }} - {{
        currentRuta.pedidosRuta[0].telefonoRemitente
      }}
{{
        currentRuta.pedidosRuta[0].otroDatoRemitente
          ? "**IMPORTANTE: " +
            currentRuta.pedidosRuta[0].otroDatoRemitente +
            "**"
          : undefined
      }}
**{{ currentRuta.pedidosRuta.length }} DESTINOS**
__Llevar:__ {{ currentRuta.pedidosRuta[0].tipoCarga }}
__Modalidad:__ RUTEO

__Tarifa:__ S/. {{ sumarTarifas(currentRuta.pedidosRuta) }} - {{
        formatearFormaPago(currentRuta.pedidosRuta[0].formaPago)
      }}
__Mi comisión:__ S/. {{ sumarComisiones(currentRuta.pedidosRuta) }}
__CO2:__ {{ sumarCO2(currentRuta.pedidosRuta) }} Kg
__Horas de Ruido:__ {{ sumarHorasRuido(currentRuta.pedidosRuta) }} h
_____________________________________
</pre
    >
    <div v-for="(destino, idx) in currentRuta.pedidosRuta" :key="idx">
      <pre>

**Destino {{ idx + 1 }}**
__Pedido:__ #{{ destino.id }}
__Contacto:__ {{ destino.contactoConsignado }} {{
          destino.empresaConsignado
            ? "- " + destino.empresaConsignado
            : undefined
        }}
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

    sumarTarifas(tarifas) {
      const total = tarifas.reduce((acc, tarifa) => +tarifa.tarifa + acc, 0);

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
