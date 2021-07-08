import ClienteService from "@/services/cliente.service";

const clientesStorage = JSON.parse(localStorage.getItem("clientes"));

export const clientes = {
  namespaced: true,
  state: {
    clientes: clientesStorage ? clientesStorage : [],
  },
  mutations: {
    setClientesArray(state, payload) {
      state.clientes = payload;
      localStorage.setItem("clientes", JSON.stringify(payload));
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
