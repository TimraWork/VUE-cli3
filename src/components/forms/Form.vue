<template lang="pug">
	.content-wrapper
		section
			.container.auth
				h1.ui-title-1 {{ $t('form') }}
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
const sendUrl = 'https://timra.ru/timra/dist/mail.php';

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
					console.log(response.data);
				})
				.then(response => {
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
