import firebase from 'firebase/app';
import Task from './task_help';

export default {
	state: {
		tasks: []
	},
	mutations: {
		loadTasks(state, payload) {
			state.tasks = payload;
		},
		newTask(state, payload) {
			state.tasks.push(payload);
		},
		completedTask(state, { id, completed }) {
			return state.tasks.find(t => {
				return t.id === id;
			});
			task.completed = completed;
		}
	},
	actions: {
		// ПОДГРУЗИТЬ ТАСКИ ОТ ТЕКУЩЕГО ПОЛЬЗОВАТЕЛЯ из базы firebase
		async loadTasks({ commit }, payload) {
			commit('clearError');
			commit('setLoading', true);
			// Когда с сервера придет ответ мы меняем значения переменных
			try {
				// Забрать из firebase ЗНАЧЕНИЯ ТАБЛИЦЫ TASKS
				const task = await firebase
					.database()
					.ref('tasks')
					.once('value');

				const tasks = task.val(); //выводит в консоле список тасков

				const tasksArray = [];
				Object.keys(tasks).forEach(key => {
					const t = tasks[key];
					// console.log(t);
					// Пушим через вспомогательный класс task_help.js
					tasksArray.push(
						new Task(
							t.title,
							t.description,
							t.whatWatch,
							t.time,
							t.tags,
							t.completed,
							t.editing,
							t.user,
							key
						)
					);
				});

				commit('loadTasks', tasksArray);

				// console.log(tasks);
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
		},
		async completedTask({ commit }, { id, completed }) {
			// Send mutation
			commit('completedTask', {
				id,
				completed
			});
		}
	},
	getters: {
		tasks(state, getters) {
			// console.log('tasks getters = ', getters);
			// Функция, которая фильтрует пользователей по id
			return state.tasks.filter(task => {
				return task.user === getters.user.id;
			});
		},
		// создадим ф-ю и передадим в нее state
		taskCompleted(state, getters) {
			// console.log('taskCompleted getters = ', getters);
			return getters.tasks.filter(task => {
				return task.completed;
			});
		},
		taskNotCompleted(state, getters) {
			// console.log('taskNotCompleted getters = ', getters);
			return getters.tasks.filter(task => {
				return task.completed === false;
			});
		}
	}
};
