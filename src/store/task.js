import firebase from 'firebase/app';
import Task from './task_help';

export default {
	state: {
		tasks: []
	},
	mutations: {
		newTask(state, payload) {
			state.tasks.push(payload);
		}
	},
	actions: {
		// НОВЫЙ ТАСК, который полетит в firebase
		async newTask({ commit, getters }, payload) {
			commit('clearError');
			commit('setLoading', true);
			// Когда с сервера придет ответ мы меняем значения переменных
			try {
				const newTask = new Task(
					payload.title,
					payload.description,
					payload.whatWatch,
					payload.time,
					payload.tags,
					payload.completed,
					payload.editing,
					getters.user.id
				);
				const task = await firebase
					.database()
					.ref('tasks')
					.push(newTask);

				console.log('Переменная task = ', task);

				// set to the mutations
				commit('newTask', {
					...newTask,
					id: task.key
				});
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
		},
		taskDestroy(state) {
			return state.tasks.filter(task => {
				return task.remove();
			});
		}
	}
};
