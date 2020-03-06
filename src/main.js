import Vue from 'vue';
import Vuelidate from 'vuelidate';
import Uimini from 'uimini/dist/css/uimini.css';
import animate from 'animate.css';
import App from './App.vue';

import './registerServiceWorker';
import router from './router';
import store from './store';
import VueScrollTo from 'vue-scrollto';

import axios from 'axios';
import VueAxios from 'vue-axios';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/messaging';
import 'firebase/storage';
import i18n from './i18n';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faAngleUp);
library.add(faSpinner);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(Vuelidate, Uimini);
Vue.use(VueAxios, axios);
Vue.use(VueScrollTo);
// Vue.use(Vuelidate);

Vue.config.productionTip = false;

export default {
	components: {
		'v-scroll': VueScrollTo // or just vuescroll tried both
	}
};

new Vue({
	router,
	store,
	animate,
	render: h => h(App),
	i18n,
	created() {
		const firebaseConfig = {
			apiKey: 'AIzaSyC9SqamVPZ9YBoAaUVo5bZn0uUhhd70w9U',
			authDomain: 'vue-cli3-ea58f.firebaseapp.com',
			databaseURL: 'https://vue-cli3-ea58f.firebaseio.com',
			projectId: 'vue-cli3-ea58f',
			storageBucket: 'vue-cli3-ea58f.appspot.com',
			messagingSenderId: '415777151690',
			appId: '1:415777151690:web:593c85c62d10e67bb13233'
		};
		firebase.initializeApp(firebaseConfig);
		firebase.auth().onAuthStateChanged(user => {
			// проверка остался ли пользователь в системе после обновления страницы
			if (user) {
				//создаем новый метод, loggedUser
				this.$store.dispatch('loggedUser', user);
				// console.log(user);
			}
			this.$store.dispatch('loadTasks');
		});
	}
}).$mount('#app');
