<template lang="pug">
	.content-wrapper
		section
			.container.auth
				h1.ui-title-1 CF7
				.text-center.mb-2.ok(v-if="errors" :class="{ sory : status == 'validation_failed' }") {{ errors }}
				form( name= "form")
					.form__item
						input(type="text" v-model="form.ename")
						.text-center.mb-2.sory(v-if="input_err.ename") {{ input_err.ename }}
					.form__item
						input(type="email" v-model="form.email")
						.text-center.mb-2.sory(v-if="input_err.email") {{ input_err.email }}
					.form__item
						textarea( v-model="form.message")
					.form__item
						vue-recaptcha(sitekey="6LfbreEUAAAAAOcJgK_fqvQVHhYxv0-UP0mGY1Mr", :loadRecaptchaScript="true", @verify="recaptchaVerified")
						.text-center.mb-2.sory(v-if="input_err.recaptcha") {{ input_err.recaptcha }}
					.buttons-list.button-list--info
						button.button.button-default(type="submit" @click.prevent="onSubmit()") {{ $t('send') }}

</template>
<script>
import axios from 'axios';
import VueRecaptcha from 'vue-recaptcha';
// const sendUrl = 'https://timra.ru/timra/dist/mail.php';
const sendUrl =
	'https://timra.ru/timra/wp-json/contact-form-7/v1/contact-forms/8616/feedback';

export default {
	mounted() {
		this.form.ename = 'Elmira';
		// this.form.email = 'mer389@mail.ru';
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
			recaptchaVerify: null,
			status: '',
			errors: '',
			input_err: {
				ename: '',
				email: '',
				recaptcha: '',
				message: ''
			}
		};
	},
	components: { VueRecaptcha },
	computed: {},
	watch: {
		recaptchaVerify: 'recaptchaVerified'
	},
	methods: {
		createDbData() {},
		recaptchaVerified() {
			this.recaptchaVerify = true;
			if (this.recaptchaVerify) {
				this.input_err.recaptcha = '';
			}
		},
		onSubmit: function(recaptchaToken) {
			const form = {
				_wpcf7: '8616',
				_wpcf7_version: '5.1.7',
				_wpcf7_locale: 'ru_RU',
				_wpcf7_unit_tag: 'wpcf7-f8616-o1',
				_wpcf7_container_post: '0',
				ename: this.form.ename,
				email: this.form.email,
				mess: this.form.message,
				recaptchaToken: recaptchaToken
			};
			var config = {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			};
			const formData = new FormData();
			formData.append('ename', this.form.ename);
			formData.append('email', this.form.email);

			// this.$refs.recaptcha.execute();

			if (this.recaptchaVerify) {
				this.input_err.recaptcha = '';
				axios
					.post(sendUrl, formData)
					.then(response => {
						this.errors = response.data.message;
						this.status = response.data.status;

						if (response.data.status === 'validation_failed') {
							response.data.invalidFields.forEach(element => {
								const errorsArray = element.into.split('.');
								const input_name =
									errorsArray[errorsArray.length - 1];
								const input_mes = element.message;
								this.input_err[input_name] = input_mes;
							});
						} else {
							this.input_err = '';
						}
					})
					.catch(error => {
						// this.errors = error.response.data.message;
						// console.log('response = ', response);
					});
			} else {
				this.input_err.recaptcha = 'Отметьте флажочек';
			}
		}
	},
	created() {}
};
</script>
