<template lang="pug">
	.wrapper
		header#element
			.navbar
				.container
					.navbar-content
						router-link.header-logo(to="/")
							img.header-logo__img(src="img/logo.png", alt="")
							span.logo__text
								span.logo__title Timra
								span.logo__subtitle Front-end разработка 
						.button-burger(@click="menuShow = !menuShow" :class="{active:menuShow }")
							span.line.line-1
							span.line.line-2
							span.line.line-3
						.navbar-list__wrapper(:class="{active:menuShow }")
							ul.navbar-list
								li.navbar-item(v-for="link in linkMenu" @click="menuShow = false")
									router-link.navbar-link(:to = " '/' + $i18n.locale + `${link.url}`" ) {{ link.title }}
								li.navbar-item(v-if="checkUser" @click='logout')
									span.navbar-link {{ $t('logout') }}
								li.navbar-item
									.lang.navbar-link
										router-link( :to="generateLink(lang)" v-for="(lang, i) in $i18n.availableLocales" :key="`Lang${i}`" ) {{ lang }}

		transition(name="fade")
			router-view

		transition(name='fade')
			#pagetop.scrollToTop(v-show='scY > 300', @click='toTop')
				font-awesome-icon(icon="angle-up" )

		footer.footer
			.container
				.footer__text Мухамеджанова Эльмира


  
</template>

<script>
export default {
	data() {
		return {
			menuShow: false,
			locale: '',
			langs: ['ru', 'en'],
			scTimer: 0,
			scY: 0,
		};
	},
	methods: {
		handleScroll: function() {
			if (this.scTimer) return;
			this.scTimer = setTimeout(() => {
				this.scY = window.scrollY;
				clearTimeout(this.scTimer);
				this.scTimer = 0;
			}, 100);
		},
		toTop: function() {
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		},
		generateLink(lang) {
			const regx = new RegExp('^/' + this.$i18n.locale);
			const url = this.$route.fullPath.replace(regx, '');
			return `/${lang}${url}`;
		},
		setLocale(locale) {
			this.$i18n.locale = locale;
			this.$router.push({
				params: { lang: locale },
			});
		},
		logout() {
			this.$store.dispatch('logoutUser');

			this.$router.push('/'); // Перебрасываем на страницу Логин, после того, как была нажата ссылка logout
			console.log('LOGOUT!!!!');
		},
	},
	computed: {
		checkUser() {
			return this.$store.getters.checkUser;
		},
		linkMenu() {
			const about = this.$t('about');
			const blog = this.$t('blog');
			const calc = this.$t('calc');
			const login = this.$t('login');
			const registration = this.$t('registration');
			const addTask = this.$t('addTask');
			const tasksList = this.$t('tasksList');
			const cf7 = this.$t('cf7');
			const works = this.$t('works');
			const gists = this.$t('gists');

			const newArray = [
				{ title: `${gists}`, url: '/gists' },
				{ title: `${works}`, url: '/works' },
				{ title: `${blog}`, url: `/blog` },
				{ title: `${about}`, url: `/about` },
				// { title: `${cf7}`, url: `/cf` },
				// { title: `${calc}`, url: "/calc" }
			];

			if (this.checkUser) {
				newArray.push(
					{ title: `${addTask}`, url: `/home` },
					{ title: `${tasksList}`, url: '/task' }
				);
			} else {
				// newArray.push(
				//   { title: `${login}`, url: "/login" },
				//   { title: `${registration}`, url: `/registration` }
				// );
			}

			return newArray;

			//   return [
			//     { title: `${blog}`, url: `/blog` },
			//     { title: `${calc}`, url: "/calc" },
			//     { title: `${login}`, url: "/login" },
			//     { title: `${registration}`, url: `/registration` }
			//   ];
		},
	},
	mounted() {
		window.addEventListener('scroll', this.handleScroll);
	},
};
</script>

<style lang="stylus"></style>
