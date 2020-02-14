export default {
	state: {
		tasks: [
			{
				id: 1,
				title: 'Фильм1',
				description: 'Описание фильма1',
				whatWatch: 'Film',
				time: '1h 30m',
				completed: false,
				editing: false
			},
			{
				id: 2,
				title: 'Фильм2',
				description: 'Описание фильма2',
				whatWatch: 'Serial',
				time: '1h 30m',
				completed: true,
				editing: false
			},
			{
				id: 3,
				title: 'Фильм3',
				description: 'Описание фильма3',
				whatWatch: 'Serial',
				time: '1h 30m',
				completed: false,
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
		},
		// создадим ф-ю и передадим в нее state
		taskCompleted(state) {
			return state.tasks.filter(task => {
				return task.completed;
			});
		},
		taskNotCompleted(state) {
			return state.tasks.filter(task => {
				return task.completed === false;
			});
		}
	}
};
