import Vue from 'vue';
import Vuex from 'vuex';

import task from './task';
import tags from './tags';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		task,
		tags
	}
});
