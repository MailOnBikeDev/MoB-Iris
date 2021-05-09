import MobikerService from "@/services/mobiker.service";

export const mobikers = {
	namespaced: true,
	state: {
		mobikers: [],
	},
	mutations: {
		setMobikersArray(state, payload) {
			state.mobikers = payload;
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

		buscarMobikers({ state }, buscador) {
			const filtro = state.mobikers.filter((mobiker) => {
				if (mobiker.fullName.toLowerCase().includes(buscador.toLowerCase())) {
					return mobiker;
				}
			});

			return filtro;
		},
	},
	getters: {},
};
