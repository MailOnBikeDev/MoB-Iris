export default function calcularEstadisticas(distancia) {
  const emisionAutomovil = 0.3; // 300 gramos de CO2 por cada Km
  // const emisionBicicleta = 8.6 / 1000; // 8.6 gramos de CO2 por cada Km

  // const velocidadPromedioBicicleta = 15; // 15 Km/h velocidad estimada de un ciclista
  const velocidadPromedioAutomovil = 40; // 40 Km/h velocidad estimada de los vehículos en la ciudad de Lima

  const co2 = +(distancia * emisionAutomovil).toFixed(1);

  const ruido = +(distancia / velocidadPromedioAutomovil).toFixed(2);

  return { co2, ruido };
}
