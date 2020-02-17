<template lang="pug">
	.content-wrapper
		section
			.container
				.auth
					//- .auth__banner
					//- 	h1.ui-title-1 Hello banner
					.auth__form
						span.ui-title-2 Login
						form(@submit.prevent="onSubmit")
							.form__item(:class="{ 'form__item--error': $v.email.$error }")
								input(type="email" placeholder="Email" v-model="email" @change="$v.email.$touch()")
								.error(v-if="!$v.email.required") Email is required
								.error(v-if="!$v.email.email") Invalid Email
							.form__item(:class="{ 'form__item--error': $v.password.$error }")
								input(type="password" placeholder="Password" v-model="password" @change="$v.password.$touch()")
								.error(v-if="!$v.password.required") Password is required
								.error(v-if="!$v.password.minLength") Password must have at least {{ $v.password.$params.minLength.min }} letters.
							.buttons-list.button-list--info
								button.button.button-default(type="submit" :disabled="submitStatus === 'PENDING'") Submit!
								p.typo__p(v-if="submitStatus === 'OK'") Thanks for your submission!
								p.typo__p(v-if="submitStatus === 'ERROR'") Please fill the form correctly.
								p.typo__p(v-if="submitStatus === 'PENDING'") Sending...
							.buttons-list.button-list--info
								| Do you need 
								router-link(to="/login")  Registration

</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators';
export default {
	data() {
		return {
			email: '',
			password: '',
			repeatPassword: '',
			submitStatus: null
		};
	},
	validations: {
		email: {
			required,
			email
		},
		password: {
			required,
			minLength: minLength(6)
		}
	},
	methods: {
		onSubmit() {
			this.$v.$touch();
			if (this.$v.$invalid) {
				this.submitStatus = 'ERROR';
			} else {
				console.log('submit!');
				// do your submit logic here
				const user = {
					email: this.email,
					pass: this.password
				};
				console.log(user);
				// do your submit logic here
				this.submitStatus = 'PENDING';
				setTimeout(() => {
					this.submitStatus = 'OK';
				}, 500);
			}
		}
	}
};
</script>

<style lang="stylus">
.auth {
	max-width: 500px;
	margin: 0 auto;
}

.error{
	color: #f00;
	font-size: 12px;
	border-color: #f00;
}

.typo__p{
	font-size 12px;
	margin: 20px 0 0;
	color: green;
}

.form__item{
	input{
		margin-bottom: 5px;
	}
	margin-bottom: 20px;
	.error{
		display: none;
	}
}

.form__item--error {
	input{
		border-color: #f00;
	}
	.error{
		display: block;
	}
}

.text-right{
	text-align: right;
}

.buttons-list{
	text-align: center;
	margin-bottom: 20px;
	&.button-list-info{
		text-align center
		&:last-child{
			margin-bottom: 0;
		}
	}
	&--info{
		font-size: 12px;
	}
}
</style>
