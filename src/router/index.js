import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

// import Home from '../views/Home.vue';
import NotFound from '@/components/NotFound.vue';
import Blog from '@/components/Blog.vue';
import Calculator from '@/components/Calculator.vue';
import Home from '@/components/Home.vue';
import Task from '@/components/Task.vue';
import Login from '@/components/Auth/Login.vue';
import Registration from '@/components/Auth/Registration.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		component: Home,
		beforeEnter(to, from, next) {
			store.getters.checkUser ? next() : next('/login');
		}
	},
	{
		path: '/task',
		component: Task,
		beforeEnter(to, from, next) {
			store.getters.checkUser ? next() : next('/login');
		}
	},
	{
		path: '/blog',
		component: Blog
	},
	{
		path: '/calc',
		component: Calculator
	},
	{
		path: '/login',
		component: Login
	},
	{
		path: '/registration',
		component: Registration
	},
	// {
	// 	path: '/:languages',
	// 	name: 'languages',
	// 	component: NotFound
	// },
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

export default router;
