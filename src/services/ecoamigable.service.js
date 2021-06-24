export default function calcularEstadisticas(distancia) {
  const co2 = +(distancia / 12).toFixed(1);

  const ruido = +(distancia / 24).toFixed(2);

  return { co2, ruido };
}
