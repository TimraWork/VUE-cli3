<template lang="pug">
	.content-wrapper
		section
			.container
				.auth
					//- .auth__banner
					//- 	h1.ui-title-1 Hello banner
					.auth__form
						span.ui-title-2 {{ $t('login') }}
						form(@submit.prevent="onSubmit"  autocomplete="on")
							.form__item(:class="{ 'form__item--error': $v.email.$error }")
								input(type="email" :placeholder="$t('email')" v-model="email" @change="$v.email.$touch()")
								.error(v-if="!$v.email.required") {{ $t('Email is required') }}
								.error(v-if="!$v.email.email") {{ $t('Invalid Email') }}
							.form__item(:class="{ 'form__item--error': $v.password.$error }")
								input(type="password" :placeholder="$t('pass')" v-model="password" @change="$v.password.$touch()" autocomplete="on")
								.error(v-if="!$v.password.required") {{ $t('Password is required') }}
								.error(v-if="!$v.password.minLength")  {{ $tc('passLenght', $v.password.$params.minLength.min ) }} 
							.buttons-list.button-list--info
								button.button.button-default(type="submit" :disabled="submitStatus === 'PENDING'") {{ $t('send') }}
								p.typo__p(v-if="submitStatus === 'OK'") {{ $t('send_ok') }}
								p.typo__p.typo__p--error(v-if="submitStatus === 'ERROR'") {{ $t('Please fill the form correctly') }}
								p.typo__p.typo__p--error(v-else) {{ submitStatus }}
							.buttons-list.button-list--info
								| {{ $t('need') }}
								router-link(:to= "'/' + $i18n.locale + '/registration'")  {{ $t('registration')  }}

</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      email: "",
      password: "",
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
        this.submitStatus = "ERROR";
      } else {
        console.log("submit!");
        // do your submit logic here
        const user = {
          email: this.email,
          password: this.password
        };
        console.log(user);

        this.$store
          .dispatch("loginUser", user)
          .then(() => {
            console.log("LOGIN!!!!!");
            this.submitStatus = "OK";
            this.$router.push("/");
          })
          .catch(err => {
            this.submitStatus = err.message;
          });
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
