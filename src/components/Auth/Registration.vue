<template lang="pug">
	.content-wrapper
		section
			.container
				.auth
					//- .auth__banner
					//- 	h1.ui-title-1 Hello banner
					.auth__form
						span.ui-title-2 Registration
						form(@submit.prevent="onSubmit")
							.form__item(:class="{ 'form__item--error': $v.email.$error }")
								input(type="email" placeholder="Email" v-model="email" @change="$v.email.$touch()")
								.error(v-if="!$v.email.required") Email is required
								.error(v-if="!$v.email.email") Invalid Email
							.form__item(:class="{ 'form__item--error': $v.password.$error }")
								input(type="password" placeholder="Password" v-model="password" @change="$v.password.$touch()")
								.error(v-if="!$v.password.required") Password is required
								.error(v-if="!$v.password.minLength") Password must have at least {{ $v.password.$params.minLength.min }} letters.
							.form__item(:class="{ 'form__item--error': $v.repeatPassword.$error }")
								input(type="password" placeholder="Repeat Password" v-model="repeatPassword" @change="$v.repeatPassword.$touch()")
								.error(v-if="!$v.repeatPassword.sameAsPassword") Passwords must be identical
							.buttons-list.button-list--info
								button.button.button-default(type="submit" :disabled="submitStatus === 'PENDING'") Submit!
								p.typo__p(v-if="submitStatus === 'OK'") Thanks for your submission!
								p.typo__p.typo__p--error(v-if="submitStatus === 'ERROR'") Please fill the form correctly.
								p.typo__p.typo__p--send(v-if="submitStatus === 'PENDING'") Sending...
							.buttons-list.button-list--info
								span Do you have account? 
									router-link(to="/login")  Enter Here

</template>

<script>
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators';
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
		},
		repeatPassword: {
			sameAsPassword: sameAs('password')
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
					password: this.password
				};

				this.$store.dispatch('registerUser', user);

				console.log(user);
				// do your submit logic here
				// this.submitStatus = "PENDING";
				// setTimeout(() => {
				//   this.submitStatus = "OK";
				// }, 500);
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

.error {
  color: #f00;
  font-size: 12px;
  border-color: #f00;
}

.typo__p {
  font-size: 12px;
  margin: 20px 0 0;
  color: green;

  &--error {
    color: red;
  }

  &--send {
    color: orange;
  }
}

.form__item {
  input {
    margin-bottom: 5px;
  }

  margin-bottom: 20px;

  .error {
    display: none;
  }
}

.form__item--error {
  input {
    border-color: #f00;
    animation: shake 1s;
  }

  .error {
    display: block;
  }
}

@keyframes shake {
  from, to {
    transform: translate3d(0, 0, 0);
  }

  10%, 30%, 50%, 70%, 90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%, 40%, 60%, 80% {
    transform: translate3d(1px, 0, 0);
  }
}

.text-right {
  text-align: right;
}

.buttons-list {
  text-align: center;
  margin-bottom: 20px;

  &.button-list-info {
    text-align: center;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &--info {
    font-size: 12px;
  }
}
</style>
