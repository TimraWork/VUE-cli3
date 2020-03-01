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
								li.navbar-item
									router-link.navbar-link(:to="'/' + $i18n.locale + '/blog'") {{$t('blog')}}
								li.navbar-item
									router-link.navbar-link(:to="'/' + $i18n.locale + '/calc'") {{$t('calc')}}
								li.navbar-item
									router-link.navbar-link(:to="'/' + $i18n.locale + '/login'") {{$t('login')}}
								li.navbar-item(v-for="link in linkMenu" @click="menuShow = false")
									router-link.navbar-link(
										:to = " '/' + $i18n.locale + `${link.url}`"
									) {{ link.title }}
								li.navbar-item(v-if="checkUser" @click='logout')
									span.navbar-link Logout
								//- li.navbar-item
								//- 	.lang.navbar-link
								//- 		router-link( :to="'/'  +  lang" v-for="(lang, i) in langs"
								//- 				:key="`Lang${i}`" @click.native="setLocale(lang)") {{ lang }} | 
								li.navbar-item
									.lang.navbar-link
										a( href="#" @click="setLocale('ru')") ru
										| |
										a( href="#" @click="setLocale('en')") en


			router-view
</template>

<script>
export default {
	data() {
		return {
			menuShow: false,
			langs: ['ru', 'en']
		};
	},
	methods: {
		doSomethingCool() {
			console.log('doSomethingCool');
		},
		setLocale(locale) {
			this.$i18n.locale = locale;
			this.$router.push({
				params: { lang: locale }
			});
		},
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
			const lang = this.$i18n.locale;
			const blog = this.$t('blog');
			const calc = this.$t('calc');
			const login = this.$t('login');
			const registration = this.$t('registration');
			if (this.checkUser) {
				return [
					{ title: 'Blog', url: `/blog` },
					{ title: 'Calculator', url: `/calc` },
					{ title: 'Home', url: '/' },
					{ title: 'Task', url: `/task` }
				];
			}
			return [
				{ title: `${blog}`, url: `/blog` },
				{ title: `${login}`, url: '/login' },
				{ title: `${registration}`, url: `/registration` }
			];
		}
	}
};
</script>

<style lang="stylus">
// @import './assets/stylus/main.styl';
.router-link-exact-active {
  color: #444ce0;
}

.button-default {
  border-radius: 5px;
}

.lang{
	a{
		color: blue;
		&.router-link-active{
			color: gray;
		}
	}
}
</style>
