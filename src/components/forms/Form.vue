<template lang="pug">
	.content-wrapper
		section
			.container.auth
				h1.ui-title-1 FORM
				form( name= "form")
					.form__item
						input(type="text" v-model="form.name")
					.form__item
						input(type="email" v-model="form.email")
					.form__item
						textarea( v-model="form.message" )
					.buttons-list.button-list--info
						button.button.button-default(type="submit" @click.prevent="onSubmit()") {{ $t('send') }}
</template>
<script>
import axios from 'axios';
// const sendUrl = 'http://localhost:8081/forms';
// const sendUrl = 'https://timra.ru/timra/dist/mail.php';
const sendUrl =
	'https://timra.ru/timra/wp-json/contact-form-7/v1/contact-forms/8616/feedback';
// const sendUrl = 'mail.php';
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default {
	mounted() {
		this.form.name = 'Elmira';
		this.form.email = 'mer389@mail.ru';
		this.form.message = 'Test message';
	},
	data() {
		return {
			url: '',
			form: {
				name: '',
				email: '',
				message: ''
			},
			errors: []
		};
	},
	computed: {},
	watch: {},
	methods: {
		createDbData() {
			const form = {
				name: this.form.name,
				email: this.form.email,
				mess: this.form.message
			};
		},
		onSubmit: function() {
			console.log('onSubmit');
			axios
				.post(sendUrl, form)
				.then(response => {
					// this.posts = response.data;
					console.log(response.data);
				})
				.then(response => {
					console.log(response);
					this.errors = [];
				})
				.catch(error => {
					this.errors = error.response.data.message;
					console.log(errors);
				});
		}
	},
	created() {}
};
</script>
