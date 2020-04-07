<template lang="pug">
	.wrapper
		header#element
			.navbar
				.container
					.navbar-content
						router-link.header-logo(to="/") Timra
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
			scY: 0
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
				behavior: 'smooth'
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
				params: { lang: locale }
			});
		},
		logout() {
			this.$store.dispatch('logoutUser');

			this.$router.push('/'); // Перебрасываем на страницу Логин, после того, как была нажата ссылка logout
			console.log('LOGOUT!!!!');
		}
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
				{ title: `${about}`, url: `/about` }
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
		}
	},
	mounted() {
		window.addEventListener('scroll', this.handleScroll);
	}
};
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css?family=PT+Sans&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Jura:wght@300;400;500;600;700&display=swap');

body, input, textarea, button {
  font-family: 'Jura', serif !important;
  font-weight: 300;
}

.navbar-content {
  font-weight: 500;
}

.ui-title-1 {
  font-size: 45px;
}

.navbar-link {
  transition: all 0.3s ease-in-out;
  color: #69babe;

  &.router-link-exact-active, &.router-link-active {
    color: #333;
  }
}

.button-default {
  border-radius: 5px;
}

.disabled {
  opacity: 0.4;
  pointer-events: none;
}

a{
	transition: all .3s ease-in-out;
}

a:hover, a:focus{
	color: #69babe;
}

.lang {
  a {
    color: #69babe;
    display: inline-block;

    &:before {
      content: '/';
      padding: 0 5px;
      color: #333;
    }

    &:first-child:before {
      content: '';
    }

    &.router-link-active {
      color: #333;
    }
  }
}

.scrollToTop {
  position: fixed;
  right: 10px;
  bottom: 10px;
  width: 50px;
  height: 50px;
  background: #eaeaea;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #ccc;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter, .fade-leave-to { /* .fade-leave-active до версии 2.1.8 */
  opacity: 0;
}

.text-center {
  text-align: center;
}

.button.active {
  color: blue;
  border-color: blue;
}

.button + .button {
  margin: 0 10px;
}

.mb-4 {
  margin-bottom: 50px;
}

.info_block {
  margin-bottom: 40px;
}

textarea {
  margin-bottom: 0;
}

.form__item div {
  margin: 0 auto;
}

.footer{
	position: relative;
	text-align: center;
	border-top: 1px solid #dcdfe6;
	padding: 30px 0;
}

.header-logo {
	font-weight: 800;
	font-size: 30px;
	color: #69babe;
}

.content-wrapper{
	min-height: auto;
}

// ---- ---- footer bottom flexbox autoheight BEGIN  ---- ----
html, body
	height: 100%;

.wrapper{
	display: flex;
	height: 100%;
	flex-direction: column;
	max-width: none;
}

.content-wrapper{
	flex: 1 0 auto;
}

footer{
	flex: 0 0 auto;
}
// ---- ---- footer bottom flexbox autoheight END  ---- ----
</style>
