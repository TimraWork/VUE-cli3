<template lang="pug">
	.content-wrapper
		section
			.container
				.auth
					//- .auth__banner
					//- 	h1.ui-title-1 Hello banner
					.auth__form
						span.ui-title-2  {{ $t('registration') }}
						form(@submit.prevent="onSubmit")
							.form__item(:class="{ 'form__item--error': $v.email.$error }")
								input(type="email" :placeholder="$t('email')" v-model="email" @change="$v.email.$touch()")
								.error(v-if="!$v.email.required") {{ $t('The field is required') }}
								.error(v-if="!$v.email.email") {{ $t('Invalid Email') }}
							.form__item(:class="{ 'form__item--error': $v.password.$error }")
								input(type="password" :placeholder="$t('pass')" v-model="password" @change="$v.password.$touch()")
								.error(v-if="!$v.password.required") {{ $t('Password is required') }}
								.error(v-if="!$v.password.minLength")  {{ $tc('passLenght', $v.password.$params.minLength.min ) }} 
							.form__item(:class="{ 'form__item--error': $v.repeatPassword.$error }")
								input(type="password" :placeholder="$t('repass')" v-model="repeatPassword" @change="$v.repeatPassword.$touch()")
								.error(v-if="!$v.repeatPassword.sameAsPassword") {{ $t('Passwords must be identical') }} 
							.buttons-list.button-list--info
								button.button.button-default(
									type="submit") 
										span(v-if="loading") {{ $t('LOADING') }} ...
										span(v-else)  {{ $t('registration') }}
								p.typo__p(v-if="submitStatus === 'OK'") {{ $t('send_ok') }}
								p.typo__p.typo__p--error(v-if="submitStatus === 'ERROR'") {{ $t('Please fill the form correctly') }}
								p.typo__p.typo__p--send(v-if="submitStatus === 'PENDING'") {{ $t('Sending') }} ...
								//- p.typo__p.typo__p--send(v-else) {{ submitStatus }}
							.buttons-list.button-list--info
								span {{ $t('account') }} - 
									router-link(to="/login") {{ $t('login') }}

</template>

<script>
import { required, email, sameAs, minLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      email: "",
      password: "",
      repeatPassword: "",
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
      sameAsPassword: sameAs("password")
    }
  },
  methods: {
    onSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        console.log("submit!");
        // do your submit logic here
        const user = {
          email: this.email,
          password: this.password
        };

        this.$store
          .dispatch("registerUser", user)
          .then(() => {
            console.log("REGISTER !!!");
            this.submitStatus = "OK";
            // Если пользователь зарегестрирован, перекидыавем на главную
            this.$router.push("/");
          })
          .catch(err => {
            this.submitStatus = err.message;
          });

        console.log(user);
        // do your submit logic here
        // this.submitStatus = "PENDING";
        // setTimeout(() => {
        //   this.submitStatus = "OK";
        // }, 500);
      }
    }
  },
  computed: {
    loading() {
      // берем loading из common.js
      return this.$store.getters.loading;
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
