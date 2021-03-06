import MobikerService from "@/services/mobiker.service";

const mobikersStorage = JSON.parse(localStorage.getItem("mobikers"));

export const mobikers = {
  namespaced: true,
  state: {
    mobikers: mobikersStorage ? mobikersStorage : [],
  },
  mutations: {
    setMobikersArray(state, payload) {
      state.mobikers = payload;
      localStorage.setItem("mobikers", JSON.stringify(payload));
    },
  },
  actions: {
    async getMobikers({ commit }) {
      try {
        const response = await MobikerService.getMobikers();
        commit("setMobikersArray", response.data);
      } catch (error) {
        console.error(`Mensaje de error desde la Store: ${error.message}`);
      }
    },

    obtenerComision({ state }, mobiker) {
      try {
        const res = state.mobikers.find((m) => m.fullName === mobiker);
        const comision = res.rango.comision;

        return comision;
      } catch (error) {
        console.error(`Mensaje de error desde la Store: ${error.message}`);
      }
    },

    buscarMobikers({ state }, buscador) {
      try {
        const filtro = state.mobikers.filter((mobiker) => {
          if (mobiker.fullName.toLowerCase().includes(buscador.toLowerCase())) {
            return mobiker;
          }
        });

        return filtro;
      } catch (error) {
        console.error(`Mensaje de error desde la Store: ${error.message}`);
      }
    },
  },
  getters: {},
};
