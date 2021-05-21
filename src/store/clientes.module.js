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

		async buscarCliente({ state }, buscador) {
			try {
				const filtro = state.clientes.filter((cliente) => {
					if (
						cliente.contacto.toLowerCase().includes(buscador.toLowerCase()) ||
						cliente.empresa.toLowerCase().includes(buscador.toLowerCase())
					) {
						return cliente;
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
