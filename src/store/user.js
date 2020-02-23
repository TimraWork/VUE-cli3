import firebase from 'firebase/app';
import User from './user_help';

export default {
	state: {
		user: null
	},
	mutations: {
		setUser(state, payload) {
			state.user = payload;
		}
	},
	actions: {
		// C БД - всегда с async
		async registerUser({ commit }, { email, password }) {
			commit('clearError');
			commit('setLoading', true);
			// Когда с сервера придет ответ мы меняем значения переменных
			try {
				// тут вся логика
				const user = await firebase
					.auth()
					.createUserWithEmailAndPassword(email, password);
				commit('setUser', new User(user.user.uid));
				console.log('new_user = ', user);
				// останавливаем загрузку
				commit('setLoading', false);
			} catch (error) {
				// останавливаем загрузку - когда поймали ошибку
				commit('setLoading', false);
				commit('setError', error.message);
				// выкидываем ошибку
				throw error;
			}
		},
		async loginUser({ commit }, { email, password }) {
			commit('clearError');
			commit('setLoading', true);
			// Когда с сервера придет ответ мы меняем значения переменных
			try {
				// тут вся логика
				const user = await firebase
					.auth()
					.signInWithEmailAndPassword(email, password);
				commit('setUser', new User(user.user.uid)); //передаем user.uid  в текущий стайт
				console.log('LOGIN ', user);
				// останавливаем загрузку
				commit('setLoading', false);
			} catch (error) {
				// останавливаем загрузку - когда поймали ошибку
				commit('setLoading', false);
				commit('setError', error.message);
				// выкидываем ошибку
				throw error;
			}
		}
	},
	getters: {
		user(state) {
			return state.user;
		},
		checkUser(state) {
			return state.user != null;
		}
	}
};
