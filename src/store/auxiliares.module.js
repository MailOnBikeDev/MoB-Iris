import AuxiliarService from "@/services/auxiliares.service";

export const auxiliares = {
	namespaced: true,
	state: {
		rolesUsuarios: [],
		distritos: [],
		tiposDeCarga: [],
		tiposDeComprobante: [],
		tiposDeEnvio: [],
		formasDePago: [],
		modalidades: [],
		rangosMoBiker: [],
		rolCliente: [],
		entidadesBancarias: [],
		statusDelPedido: [],
	},
	mutations: {
		setRolesUsuarios(state, payload) {
			state.rolesUsuarios = payload;
		},
		setDistritos(state, payload) {
			state.distritos = payload;
		},
		setTiposCarga(state, payload) {
			state.tiposDeCarga = payload;
		},
		setTiposComprobante(state, payload) {
			state.tiposDeComprobante = payload;
		},
		setTiposEnvios(state, payload) {
			state.tiposDeEnvio = payload;
		},
		setFormasPago(state, payload) {
			state.formasDePago = payload;
		},
		setModalidades(state, payload) {
			state.modalidades = payload;
		},
		setRangosMoBiker(state, payload) {
			state.rangosMoBiker = payload;
		},
		setRolCliente(state, payload) {
			state.rolCliente = payload;
		},
		setEntidadesBancarias(state, payload) {
			state.entidadesBancarias = payload;
		},
		setStatusPedido(state, payload) {
			state.statusDelPedido = payload;
		},
	},
	actions: {
		async getRolesUsuarios({ commit }) {
			try {
				const response = await AuxiliarService.getRolesUsers();
				commit("setRolesUsuarios", response.data);
			} catch (error) {
				console.error(error);
			}
		},
		async getDistritosLima({ commit }) {
			try {
				const response = await AuxiliarService.getDistritos();
				commit("setDistritos", response.data);
			} catch (error) {
				console.error(error);
			}
		},
		async getTiposCarga({ commit }) {
			try {
				const response = await AuxiliarService.getTipoCarga();
				commit("setTiposCarga", response.data);
			} catch (error) {
				console.error(error);
			}
		},
		async getComprobantes({ commit }) {
			try {
				const response = await AuxiliarService.getTipoComprobante();
				commit("setTiposComprobante", response.data);
			} catch (error) {
				console.error(error);
			}
		},
		async getTiposEnvios({ commit }) {
			try {
				const response = await AuxiliarService.getTipoEnvio();
				commit("setTiposEnvios", response.data);
			} catch (error) {
				console.error(error);
			}
		},
		async getFormasPago({ commit }) {
			try {
				const response = await AuxiliarService.getFormasPago();
				commit("setFormasPago", response.data);
			} catch (error) {
				console.error(error);
			}
		},
		async getModalidades({ commit }) {
			try {
				const response = await AuxiliarService.getModalidad();
				commit("setModalidades", response.data);
			} catch (error) {
				console.error(error);
			}
		},
		async getRangosMoB({ commit }) {
			try {
				const response = await AuxiliarService.getRangosMoB();
				commit("setRangosMoBiker", response.data);
			} catch (error) {
				console.error(error);
			}
		},
		async getRolCliente({ commit }) {
			try {
				const response = await AuxiliarService.getRolCliente();
				commit("setRolCliente", response.data);
			} catch (error) {
				console.error(error);
			}
		},
		async getEntidadesBancarias({ commit }) {
			try {
				const response = await AuxiliarService.getEntidadesBancarias();
				commit("setEntidadesBancarias", response.data);
			} catch (error) {
				console.error(error);
			}
		},
		async getStatusPedido({ commit }) {
			try {
				const response = await AuxiliarService.getStatusPedidos();
				commit("setStatusPedido", response.data);
			} catch (error) {
				console.error(error);
			}
		},
	},
	getters: {},
};
