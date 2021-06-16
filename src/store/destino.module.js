import DestinoService from "@/services/destino.service";

export const destinos = {
  namespaced: true,
  state: {
    destinos: [],
  },
  mutations: {
    setDestinosArray(state, payload) {
      state.destinos = payload;
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
