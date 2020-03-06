<template lang="pug">
	.content-wrapper
		section
			.container.auth
				h1.ui-title-1 FORM
				form( name= "form")
					.form__item
						input(type="text" placeholder="Name" v-model="form.name" )
					.form__item
						input(type="email" placeholder="Email" v-model="form.email" )
					.form__item
						textarea( v-model="form.message" )
					.buttons-list.button-list--info
						button.button.button-default(type="submit") {{ $t('send') }}
</template>
<script>
export default {
	mounted() {
		// this.form.name = 'Elmira';
		// this.form.email = 'mer389@mail.ru';
		// this.form.message = 'Test message';
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
		onSubmit: function() {}
	},
	created() {}
};
</script>
