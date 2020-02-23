import firebase from 'firebase/app';
import User from './user_help';

export default {
	state: {
		loading: false,
		error: null
	},
	mutations: {
		// Меняем загрузку, в зависимости от ответа сервера
		setLoading(state, payload) {
			state.loading = payload;
		},
		setError(state, payload) {
			state.error = payload;
		},
		clearError(state) {
			state.error = null;
		}
	},
	actions: {
		// Покажем пользователю что идет загрузка
		setLoading({ commit }, payload) {
			commit('setLoading', payload);
		},
		// Покажем Ошибку
		setError({ commit }, payload) {
			commit('setError', payload);
		},
		// Очистить Ошибку
		clearError({ commit }) {
			commit('clearError');
		}
	},
	getters: {
		loading(state) {
			return state.loading;
		},
		error(state) {
			return state.error;
		}
	}
};
