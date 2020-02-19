import Vue from 'vue';
import Vuelidate from 'vuelidate';
import Uimini from 'uimini/dist/css/uimini.css';
import animate from 'animate.css';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/messaging';
import 'firebase/storage';

Vue.use(Vuelidate, Uimini);
// Vue.use(Vuelidate);

Vue.config.productionTip = false;

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

new Vue({
	router,
	store,
	animate,
	render: h => h(App)
}).$mount('#app');
