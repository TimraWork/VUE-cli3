export default {
	state: {
		tasks: [
			{
				id: 1,
				title: 'Фильм1',
				description: 'Описание фильма1',
				whatWatch: 'Film',
				time: '1h 30m',
				comleted: false,
				editing: false
			}
		]
	},
	mutations: {
		newTask(state, payload) {
			state.tasks.push(payload);
		}
	},
	actions: {
		//              , task
		newTask({ commit }, payload) {
			//task.id
			payload.id = Math.random();
			// set to the mutations
			commit('newTask', payload);
		}
	},
	getters: {
		tasks(state) {
			return state.tasks;
		}
	}
};
