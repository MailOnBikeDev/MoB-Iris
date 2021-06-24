export default function calcularTarifa(distancia, tipoEnvio) {
  let tarifaBase;
  let tarifa;
  let tarifaSugerida;

  const distanciaBase = 3.75;

  const factorKmBase = 1.3333;
  const factorKmEspecial = 1.45;

  switch (tipoEnvio) {
    case "E-Commerce":
      tarifaBase = 7;
      if (distancia < distanciaBase * 3) {
        tarifa = tarifaBase;
        tarifaSugerida = +Math.ceil(
          tarifaBase + (distancia - distanciaBase) * factorKmBase
        );
      }
      if (distancia >= distanciaBase * 3 && distancia < distanciaBase * 3.5) {
        tarifa = 9;
        tarifaSugerida = +Math.ceil(
          tarifaBase + (distancia - distanciaBase) * factorKmBase
        );
      }
      if (distancia >= distanciaBase * 3.5 && distancia < distanciaBase * 4) {
        tarifa = 12;
        tarifaSugerida = +Math.ceil(
          tarifaBase + (distancia - distanciaBase) * factorKmBase
        );
      }
      if (distancia >= distanciaBase * 4 && distancia < distanciaBase * 4.5) {
        tarifa = 14;
        tarifaSugerida = +Math.ceil(
          tarifaBase + (distancia - distanciaBase) * factorKmBase
        );
      }
      if (distancia >= distanciaBase * 4.5 && distancia < distanciaBase * 5) {
        tarifa = 16;
        tarifaSugerida = +Math.ceil(
          tarifaBase + (distancia - distanciaBase) * factorKmBase
        );
      }
      if (distancia >= distanciaBase * 5 && distancia < distanciaBase * 5.5) {
        tarifa = 18;
        tarifaSugerida = +Math.ceil(
          tarifaBase + (distancia - distanciaBase) * factorKmBase
        );
      }
      if (distancia >= distanciaBase * 5.5) {
        tarifaBase = 18;
        tarifa = +Math.ceil(
          tarifaBase + (distancia - distanciaBase) * factorKmBase
        );
        tarifaSugerida = +Math.ceil(
          tarifaBase + (distancia - distanciaBase) * factorKmBase
        );
      }
      break;

    case "Express":
      tarifaBase = 7;

      if (distancia <= 11) {
        tarifa = tarifaBase;
        tarifaSugerida = +Math.ceil(
          tarifaBase + (distancia - distanciaBase) * factorKmBase
        );
      } else {
        tarifa = tarifaBase;
        tarifaSugerida = +Math.ceil(
          tarifaBase + (distancia - distanciaBase) * factorKmEspecial
        );
      }
      break;

    case "EmpresaG":
      tarifaBase = 10;

      if (distancia <= 11) {
        tarifa = tarifaBase;
        tarifaSugerida = +Math.ceil(
          tarifaBase + (distancia - distanciaBase) * factorKmBase
        );
      } else {
        tarifa = tarifaBase;
        tarifaSugerida = +Math.ceil(
          tarifaBase + (distancia - distanciaBase) * factorKmEspecial
        );
      }
      break;

    case "Persona":
      tarifaBase = 10;

      if (distancia <= 11) {
        tarifa = tarifaBase;
        tarifaSugerida = +Math.ceil(
          tarifaBase + (distancia - distanciaBase) * factorKmBase
        );
      } else {
        tarifa = tarifaBase;
        tarifaSugerida = +Math.ceil(
          tarifaBase + (distancia - distanciaBase) * factorKmEspecial
        );
      }
      break;
  }

  return { tarifa, tarifaSugerida };
}
