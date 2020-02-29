<template lang="pug">
	.content-wrapper
		section
			.container
				.not_found 404

</template>

<script>
import { required } from 'vuelidate/lib/validators';

export default {
	data() {
		return {
			taskTitle: ''
		};
	},
	methods: {},
	computed: {
		tags() {}
	}
};
</script>

<style lang="stylus">
.not_found{
	color: blue;
	font-size: 100px;
	height: calc( 100vh - 200px);
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
