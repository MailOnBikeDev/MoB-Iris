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
			state.tiposDeEnvios = payload;
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
			const response = await AuxiliarService.getRolesUsers();
			commit("setRolesUsuarios", response.data);
		},

		async getDistritosLima({ commit }) {
			const response = await AuxiliarService.getDistritos();
			commit("setDistritos", response.data);
		},

		async getTiposCarga({ commit }) {
			const response = await AuxiliarService.getTipoCarga();
			commit("setTiposCarga", response.data);
		},

		async getComprobantes({ commit }) {
			const response = await AuxiliarService.getTipoComprobante();
			commit("setTiposComprobante", response.data);
		},

		async getTiposEnvios({ commit }) {
			const response = await AuxiliarService.getTipoEnvio();
			commit("setTiposEnvios", response.data);
		},

		async getFormasPago({ commit }) {
			const response = await AuxiliarService.getFormasPago();
			commit("setFormasPago", response.data);
		},

		async getModalidades({ commit }) {
			const response = await AuxiliarService.getModalidad();
			commit("setModalidades", response.data);
		},

		async getRangosMoB({ commit }) {
			const response = await AuxiliarService.getRangosMoB();
			commit("setRangosMoBiker", response.data);
		},

		async getRolCliente({ commit }) {
			const response = await AuxiliarService.getRolCliente();
			commit("setRolCliente", response.data);
		},

		async getEntidadesBancarias({ commit }) {
			const response = await AuxiliarService.getEntidadesBancarias();
			commit("setEntidadesBancarias", response.data);
		},

		async getStatusPedido({ commit }) {
			const response = await AuxiliarService.getStatusPedidos();
			commit("setStatusPedido", response.data);
		},
	},
	getters: {},
};
