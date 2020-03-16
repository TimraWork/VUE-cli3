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
				component: Blog
			},
			{
				path: 'blog/post/:id',
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
			},
			{
				path: 'home',
				component: Home
			},
			{
				path: 'task',
				component: Task
			},
			{
				path: 'cf',
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
	const lang = to.params.lang;
	if (i18n.locale !== lang) {
		i18n.locale = lang;
	}
	return next();
});

export default router;
