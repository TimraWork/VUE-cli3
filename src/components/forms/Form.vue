<template lang="pug">
	.content-wrapper
		section
			.container.auth
				h1.ui-title-1 FORM
				form( name= "form")
					.form__item
						input(type="text" v-model="form.ename")
					.form__item
						input(type="email" v-model="form.email")
					.form__item
						textarea( v-model="form.message")
					.buttons-list.button-list--info
						button.button.button-default(type="submit" @click.prevent="onSubmit()") {{ $t('send') }}
</template>
<script>
import axios from 'axios';
// const sendUrl = 'http://localhost:8081/forms';
// const sendUrl = 'https://timra.ru/timra/dist/mail.php';
const sendUrl =
	'https://timra.ru/timra/wp-json/contact-form-7/v1/contact-forms/8616/feedback';
// const sendUrl =
// 	'https://timra.ru/timra/wp-json/contact-form-7/v1/contact-forms/8616';
// const sendUrl = 'mail.php';
// axios.defaults.headers.common.accept = 'application/json';

export default {
	mounted() {
		this.form.ename = 'Elmira';
		this.form.email = 'mer389@mail.ru';
		this.form.message = 'Test message';
	},
	data() {
		return {
			url: '',
			form: {
				ename: '',
				email: '',
				message: ''
			},
			errors: []
		};
	},
	computed: {},
	watch: {},
	methods: {
		createDbData() {},
		onSubmit: function() {
			const form = {
				_wpcf7: '8616',
				_wpcf7_version: '5.1.7',
				_wpcf7_locale: 'ru_RU',
				_wpcf7_unit_tag: 'wpcf7-f8616-o1',
				_wpcf7_container_post: '0',
				ename: this.form.ename,
				email: this.form.email,
				mess: this.form.message
			};
			console.log('form = ', this.form);
			var config = {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			};
			const formData = new FormData();
			formData.append('ename', this.form.ename);
			formData.append('email', this.form.email);

			axios
				.post(sendUrl, formData)
				.then(response => {
					// this.posts = response.data;
					// console.log('response.data = ', response.data);
					console.log(response.data);
					// console.log(response.status);
					// console.log(response.statusText);
					// console.log(response.headers);
					// console.log(response.config);
				})
				.then(response => {
					// console.log('response = ', response);
					this.errors = [];
				})
				.catch(error => {
					this.errors = error.response.data.message;
				});
		}
	},
	created() {}
};
</script>
