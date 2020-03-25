import Vue from 'vue';
import VueRouter from 'vue-router';
import i18n from '../i18n.js';

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
	// Редирект с главной на блог, если пользователь не зарегестрирован BEGIN
	{
		path: '/',
		redirect: '/ru/blog/page/1',
		component: Blog
	},
	{
		path: '/ru/blog',
		redirect: '/ru/blog/page/1',
		component: Blog
	},
	// Редирект с главной на блог, если пользователь не зарегестрирован END

	// Правила для обработки дочерних ссылок с атрибутом lang BEGIN
	{
		path: '/:lang',
		component: {
			render(c) {
				return c('router-view');
			}
		},
		children: [
			{
				path: '',
				component: Blog
			},
			{
				path: 'blog',
				name: 'Blog',
				component: Blog
			},
			{
				path: 'blog/post/:id',
				name: 'Post',
				component: Post,
				props: true
			},
			{
				path: 'blog/page/:page_number',
				component: Blog,
				name: 'PageNumber',
				props: true
			},
			{
				path: 'blog/category/:cat_name/page/:page_number',
				component: Blog,
				name: 'CatPage',
				props: true
			},
			{
				path: 'calc',
				name: 'Calc',
				component: Calculator
			},
			{
				path: 'login',
				name: 'Login',
				component: Login
			},
			{
				path: 'registration',
				name: 'Reg',
				component: Registration
			},
			{
				path: 'home',
				name: 'Home',
				component: Home
			},
			{
				path: 'task',
				name: 'Task',
				component: Task
			},
			{
				path: 'cf',
				name: 'ContactForm',
				component: ContactForm,
				props: true
			}
		]
	},
	// Правила для обработки дочерних ссылок с атрибутом lang END
	// 404 BEGIN
	{
		path: '*',
		component: NotFound
	}
	// 404 END
];

const router = new VueRouter({
	// mode: 'history',
	base: process.env.BASE_URL,
	routes
});

router.beforeEach((to, from, next) => {
	// console.log('to.name', to.name);

	const lang = to.params.lang;
	if (i18n.locale !== lang) {
		i18n.locale = lang;
	}

	// If this isn't an initial page load.
	if (to.name) {
		// Start the route progress bar.
		NProgress.start();
	}
	return next();
});

router.afterEach((to, from) => {
	// Complete the animation of the route progress bar.
	NProgress.done();
});

export default router;
