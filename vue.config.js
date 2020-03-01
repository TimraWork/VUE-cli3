module.exports = {
	publicPath:
		process.env.NODE_ENV === 'production' ? '/portfolio/vue-cli3/' : '/',

	pluginOptions: {
		i18n: {
			locale: 'ru',
			fallbackLocale: 'ru',
			localeDir: 'locales',
			enableInSFC: true
		}
	}
};
