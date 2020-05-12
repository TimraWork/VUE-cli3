const path = require('path');

module.exports = {
	// publicPath:
	// 	process.env.NODE_ENV === 'production' ? '/portfolio/vue-cli3/' : '/',

	// Вот пример для stylus, который импортирует ./src/styles/imports.styl в каждый однофайловый компонент и в каждый файл stylus
	// chainWebpack: (config) => {
	// 	const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
	// 	types.forEach((type) =>
	// 		addStyleResource(config.module.rule('stylus').oneOf(type))
	// 	);
	// },

	css: {
		loaderOptions: {
			css: {
				sourceMap: true,
			},
			stylus: {
				sourceMap: true,
			},
		},
	},

	pwa: {
		icons: [
			{
				src: 'img/icons/android-icon-192x192.png',
				sizes: '192x192',
				type: 'image/png',
			},
			{
				src: 'img/icons/android-chrome-512x512.png',
				sizes: '512x512',
				type: 'image/png',
			},
		],
		themeColor: '#69babe',
		msTileColor: '#000000',
		iconPaths: {
			favicon32: 'img/icons/favicon-32x32.png',
			favicon16: 'img/icons/favicon-16x16.png',
			appleTouchIcon: 'img/icons/apple-touch-icon-180x180.png',
			maskIcon: 'img/icons/safari-pinned-tab.svg',
			msTileImage: 'img/icons/mstile-144x144.png',
		},
	},

	pluginOptions: {
		i18n: {
			locale: 'ru',
			fallbackLocale: 'ru',
			localeDir: 'locales',
			enableInSFC: true,
		},
	},
};

// function addStyleResource(rule) {
// 	rule.use('style-resource')
// 		.loader('style-resources-loader')
// 		.options({
// 			patterns: [path.resolve(__dirname, './src/styles/imports.styl')],
// 		});
// }
