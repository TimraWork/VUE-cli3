import Vue from 'vue';
import VueRouter from 'vue-router';
import i18n from '../i18n.js';

import About from '@/components/About.vue';
import Gists from '@/components/Gists.vue';
import Works from '@/components/Works.vue';
import ContactForm from '@/components/ContactForm.vue';
import Post from '@/components/Post.vue';
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
		redirect: '/ru/works',
		component: Blog,
	},
	{
		path: '/ru/blog',
		redirect: '/ru/blog/page/1',
		component: Blog,
	},
	{
		path: '/:lang',
		component: {
			render(c) {
				return c('router-view');
			},
		},
		children: [
			{
				path: '',
				component: Blog,
			},
			{
				path: 'gists',
				name: 'Gists',
				component: Gists,
			},
			{
				path: 'blog',
				name: 'Blog',
				component: Blog,
			},
			{
				path: 'blog/post/:id',
				name: 'Post',
				component: Post,
				props: true,
			},
			{
				path: 'blog/page/:page_number',
				component: Blog,
				name: 'PageNumber',
				props: true,
			},
			{
				path: 'blog/category/:cat_name/page/:page_number',
				component: Blog,
				name: 'CatPage',
				props: true,
			},
			{
				path: 'calc',
				name: 'Calc',
				component: Calculator,
			},
			{
				path: 'login',
				name: 'Login',
				component: Login,
			},
			{
				path: 'Works',
				name: 'Works',
				component: Works,
			},
			{
				path: 'registration',
				name: 'Reg',
				component: Registration,
			},
			{
				path: 'home',
				name: 'Home',
				component: Home,
			},
			{
				path: 'about',
				name: 'About',
				component: About,
			},
			{
				path: 'task',
				name: 'Task',
				component: Task,
			},
			{
				path: 'cf',
				name: 'ContactForm',
				component: ContactForm,
				props: true,
			},
		],
	},
	{
		path: '*',
		component: NotFound,
	},
];

const router = new VueRouter({
	// mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, from, next) => {
	const lang = to.params.lang;
	if (i18n.locale !== lang) {
		i18n.locale = lang;
	}
	if (to.name) {
		NProgress.start();
	}
	return next();
});

router.afterEach((to, from) => {
	NProgress.done();
});

export default router;
