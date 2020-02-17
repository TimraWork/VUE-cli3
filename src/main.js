import Vue from 'vue';
import Vuelidate from 'vuelidate';
import Uimini from 'uimini/dist/css/uimini.css';
import animate from 'animate.css';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.use(Vuelidate, Uimini);
// Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	animate,
	render: h => h(App)
}).$mount('#app');
