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
									router-link.navbar-link(:to = " '/' + $i18n.locale + `${link.url}`" ) {{ link.title }}
								li.navbar-item(v-if="checkUser" @click='logout')
									span.navbar-link {{ $t('logout') }}
								li.navbar-item
									.lang.navbar-link
										router-link( :to="generateLink(lang)" v-for="(lang, i) in $i18n.availableLocales" :key="`Lang${i}`" ) {{ lang }}


			router-view
</template>

<script>
export default {
  data() {
    return {
      menuShow: false,
      locale: "",
      langs: ["ru", "en"]
    };
  },
  methods: {
    generateLink(lang) {
      const regx = new RegExp("^/" + this.$i18n.locale);
      const url = this.$route.fullPath.replace(regx, "");
      return `/${lang}${url}`;
    },
    doSomethingCool() {
      console.log("doSomethingCool");
    },
    setLocale(locale) {
      this.$i18n.locale = locale;
      this.$router.push({
        params: { lang: locale }
      });
    },
    logout() {
      this.$store.dispatch("logoutUser");

      this.$router.push("/"); // Перебрасываем на страницу Логин, после того, как была нажата ссылка logout
      console.log("LOGOUT!!!!");
    }
  },
  computed: {
    checkUser() {
      return this.$store.getters.checkUser;
    },
    linkMenu() {
      const blog = this.$t("blog");
      const calc = this.$t("calc");
      const login = this.$t("login");
      const registration = this.$t("registration");
      const addTask = this.$t("addTask");
      const tasksList = this.$t("tasksList");
      if (this.checkUser) {
        return [
          { title: `${blog}`, url: `/blog` },
          { title: `${calc}`, url: "/calc" },
          { title: `${addTask}`, url: `/home` },
          { title: `${tasksList}`, url: "/task" }
        ];
      }
      return [
        { title: `${blog}`, url: `/blog` },
        { title: `${calc}`, url: "/calc" },
        { title: `${login}`, url: "/login" },
        { title: `${registration}`, url: `/registration` }
      ];
    }
  }
};
</script>

<style lang="stylus">
.navbar-link {
  color: blue;

  &.router-link-exact-active {
    color: #333;
  }
}

.button-default {
  border-radius: 5px;
}

.lang {
  a {
    color: blue;
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
</style>
