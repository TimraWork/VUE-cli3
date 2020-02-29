module.exports = {
    publicPath:
		process.env.NODE_ENV === 'production' ? '/portfolio/vue-cli3/' : '/',

    pluginOptions: {
      i18n: {
        locale: 'en',
        fallbackLocale: 'en',
        localeDir: 'locales',
        enableInSFC: true
      }
    }
};
