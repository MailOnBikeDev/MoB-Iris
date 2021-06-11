import ClienteService from "@/services/cliente.service";

export const clientes = {
  namespaced: true,
  state: {
    clientes: [],
  },
  mutations: {
    setClientesArray(state, payload) {
      state.clientes = payload;
    },
  },
  actions: {
    async getClientes({ commit }) {
      try {
        const response = await ClienteService.getClientes();
        commit("setClientesArray", response.data);
      } catch (error) {
        console.error(`Mensaje de error desde la Store: ${error.message}`);
      }
    },
  },
  getters: {},
};
