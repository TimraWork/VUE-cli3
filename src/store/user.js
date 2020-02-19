import firebase from 'firebase/app';

export default {
	state: {
		user: null
	},
	mutations: {},
	actions: {
		// C БД - всегда с async
		async registerUser({ commit }, { email, password }) {
			console.log(email, password);
			const user = await firebase
				.auth()
				.createUserWithEmailAndPassword(email, password);
			console.log('new_user', user);
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
