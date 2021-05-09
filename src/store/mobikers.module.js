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
	},
	getters: {},
};
