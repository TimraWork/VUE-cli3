<template lang="pug">
	.content-wrapper
		section
			.container.auth.text-center
				//- h1.ui-title-1 Выберите форму
				//- a.button.button-default(href="#" @click.prevent="component = 'FormCF7'" :class="{ active : component == 'FormCF7' }") "CF7"
				//- a.button.button-default(href="#"  @click.prevent="component = 'Form'" :class="{ active : component == 'Form' }") {{ $t('form') }}
				keep-alive
					component(:is='component')
</template>

<script>
import Form from "./Forms/Form";
import FormCF7 from "./Forms/FormCF7";
import VueRecaptcha from "vue-recaptcha";

export default {
  components: {
    Form,
    FormCF7
  },
  mounted() {
    this.form.name = "Elmira";
    this.form.email = "mer389@mail.ru";
    this.form.message = "Test message";
  },
  data() {
    return {
      url: "",
      form: {
        name: "",
        email: "",
        message: ""
      },
      errors: [],
      component: FormCF7
    };
  },
  watch: {},
  methods: {
    onSubmit: function() {}
  },
  created() {}
};
</script>
