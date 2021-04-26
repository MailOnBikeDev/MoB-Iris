import Vue from "vue";
import Vuex from "vuex";

import AuxiliarService from "../services/auxiliares.service";

Vue.use(Vuex);

export const auxiliares = {
	namespaced: true,
	state: {
		rolesUsuarios: [],
		distritos: [],
		tiposDeCarga: [],
		tiposDeComprobante: [],
		tiposDeEnvios: [],
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
	},
	actions: {
		async getRolesUsuarios({ commit }) {
			const response = await AuxiliarService.getRolesUsers();
			commit("setRolesUsuarios", response.data);
		},
	},
	getters: {},
};
