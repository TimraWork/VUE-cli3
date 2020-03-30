<template lang="pug">
	.content-wrapper
		section
			.container.auth
				h1.ui-title-1 Contact Form 7
				.text-center.mb-2.ok(v-if="errors" :class="{ sory : status == 'validation_failed' }") {{ errors }}
				form( name= "form")
					.form__item(:class="{ 'form__item--error': $v.email.$ename }")
						input(type="text" @change="$v.ename.$touch()" :placeholder="$t('name')")
						.error(v-if="input_err.ename") {{ $t('The field is required') }}
						//- .text-center.mb-2.sory(v-if="!$v.email.ename") {{ $t('The field is required') }}
					.form__item(:class="{ 'form__item--error': $v.email.$error || $v.email.required}")
						input(type="email" v-model="form.email" @change="$v.email.$touch()" :placeholder="$t('email')")
						//- .text-center.mb-2.sory(v-if="input_err.email") {{ $t('Email is required') }}
						.error(v-if="!$v.email.required") {{ $t('Email is required') }}
						//- .text-center.mb-2.sory(v-if="!$v.email.email") {{ $t('The field is required') }}
					.form__item
						textarea( v-model="form.message"  :placeholder="$t('message')")
					.form__item(:class="{ 'form__item--error': input_err.recaptcha }")
						vue-recaptcha(
							:sitekey="recaptchaKey", 
							:loadRecaptchaScript="true", 
							@verify="recaptchaVerified", 
							:placeholder="$t('mess')"
						)
						.error(v-if="input_err.recaptcha") {{ $t('captcha') }}
					.buttons-list.button-list--info
						button.button.button-default(type="submit" @click.prevent="onSubmit()") {{ $t('send') }}
					
					//- p.typo__p(v-if="submitStatus === 'OK'") Thanks for your submission!
					//- 	p.typo__p.typo__p--error(v-if="submitStatus === 'ERROR'") Please fill the form correctly.
					//- 	p.typo__p.typo__p--send(v-if="submitStatus === 'PENDING'") Sending...
					//- 	p.typo__p.typo__p--send(v-else) {{ submitStatus }}

</template>
<script>
import axios from 'axios';
import VueRecaptcha from 'vue-recaptcha';
import { required, email, minLength } from 'vuelidate/lib/validators';

// const sendUrl = 'https://timra.ru/timra/dist/mail.php';
const sendUrl =
	'https://timra.ru/timra/wp-json/contact-form-7/v1/contact-forms/8616/feedback';

export default {
	created() {
		if (process.env.NODE_ENV === 'production') {
			this.recaptchaKey = '6LdqdqIUAAAAANREZhN9o9kCf2kI-cVGNEf3rJcj';
		} else {
			this.recaptchaKey = '6LfbreEUAAAAAOcJgK_fqvQVHhYxv0-UP0mGY1Mr';
		}
	},
	mounted() {},
	data() {
		return {
			url: '',
			form: {
				ename: '',
				email: '',
				message: ''
			},
			recaptchaVerify: null,
			recaptchaKey: null,
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
	validations: {
		ename: {
			required
		},
		email: {
			required,
			email
		},
		password: {
			required,
			minLength: minLength(6)
		}
	},
	components: { VueRecaptcha },
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
				this.input_err.recaptcha = true;
			}
		}
	}
};
</script>
