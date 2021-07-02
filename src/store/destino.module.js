import DestinoService from "@/services/destino.service";

const destinosStorage = JSON.parse(localStorage.getItem("destinos"));

export const destinos = {
  namespaced: true,
  state: {
    destinos: destinosStorage ? destinosStorage : [],
  },
  mutations: {
    setDestinosArray(state, payload) {
      state.destinos = payload;
      localStorage.setItem("destinos", JSON.stringify(payload));
    },
  },
  actions: {
    async getDestinos({ commit }) {
      try {
        const response = await DestinoService.getDestinos();
        commit("setDestinosArray", response.data);
      } catch (error) {
        console.error(`Mensaje de error desde la Store: ${error.message}`);
      }
    },
  },
};
