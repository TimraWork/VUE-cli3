export default {
	state: {
		tags: [
			{
				title: 'Comedy',
				use: false
			},
			{
				title: 'Westerns',
				use: false
			},
			{
				title: 'Adventure',
				use: false
			}
		]
	},
	mutations: {
		newTag(state, payload) {
			state.tags.push(payload);
		}
	},
	actions: {
		newTag({ commit }, payload) {
			commit('newTag', payload);
		}
	},
	getters: {
		//напишем новый геттер, tags (state)
		tags(state) {
			return state.tags;
		}
	}
};
