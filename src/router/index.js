import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import i18n from '../i18n.js';

// import Home from '../views/Home.vue';
import NotFound from '@/components/NotFound.vue';
import Blog from '@/components/Blog.vue';
import Calculator from '@/components/Calculator.vue';
// import Home from '@/components/Home.vue';
// import Task from '@/components/Task.vue';
import Login from '@/components/Auth/Login.vue';
import Registration from '@/components/Auth/Registration.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		redirect: '/ru'
	},
	{
		path: '/:lang',
		component: {
			render(c) {
				return c('router-view');
			}
		},
		children: [
			{
				path: 'blog',
				component: Blog
			},
			{
				path: 'calc',
				component: Calculator
			},
			{
				path: 'login',
				component: Login
			},
			{
				path: 'registration',
				component: Registration
			}
		]
	},
	{
		path: '*',
		component: NotFound
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

router.beforeEach((to, from, next) => {
	const lang = to.params.lang;
	if (i18n.locale !== lang) {
		i18n.locale = lang;
	}
	return next();
});

export default router;
