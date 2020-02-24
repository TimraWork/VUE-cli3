<template lang="pug">
	.wrapper
		header
			.navbar
				.container
					.navbar-content
						router-link.header-logo(to="/") Vue-cli3
						.button-burger(@click="menuShow = !menuShow" :class="{active:menuShow }")
							span.line.line-1
							span.line.line-2
							span.line.line-3
						.navbar-list__wrapper(:class="{active:menuShow }")
							ul.navbar-list
								li.navbar-item(v-for="link in linkMenu" @click="menuShow = false")
									router-link.navbar-link(
										:to = "`${link.url}`"
									) {{ link.title }}
								li.navbar-item(v-if="checkUser" @click='logout')
									span.navbar-link Logout
		router-view
</template>

<script>
export default {
	data() {
		return {
			menuShow: false
		};
	},
	methods: {
		logout() {
			this.$store.dispatch('logoutUser');

			this.$router.push('/login'); // Перебрасываем на страницу Логин, после того, как была нажата ссылка logout
			console.log('LOGOUT!!!!');
		}
	},
	computed: {
		checkUser() {
			return this.$store.getters.checkUser;
		},
		linkMenu() {
			if (this.checkUser) {
				return [
					{ title: 'Home', url: '/' },
					{ title: 'Task', url: '/task' }
				];
			}
			return [
				{ title: 'Login', url: '/login' },
				{ title: 'Registration', url: '/registration' }
			];
		}
	}
};
</script>

<style lang="stylus">
// @import './assets/stylus/main.styl';
.router-link-exact-active{
	color: #444ce0;
}
.button-default{
	border-radius: 5px;
}
</style>
