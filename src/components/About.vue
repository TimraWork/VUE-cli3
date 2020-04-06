<template lang="pug">
	.content-wrapper
		section
			.container
				h1.ui-title-1 {{ $t('about') }}
				.row
					.col-md-4
						img.mb-3(src="img/for_site.jpg")
						p
							span.contacts__icon
								font-awesome-icon(icon="envelope")
							a(href="mailto:timra.work@gmail.com" target="_blank").contacts__text timra.work@gmail.com
						p
							span.contacts__icon
								font-awesome-icon(icon="phone")
							a(href="tel:+998909654870" target="_blank").contacts__text +998 (90) 965-48-70 
						p
							span.contacts__icon
								font-awesome-icon(icon="globe")
							a(href="https://timra.ru/timra/" target="_blank").contacts__text timra.ru/timra
						p
							span.contacts__icon
								font-awesome-icon(:icon="['fab', 'skype']")
							a(href="skype:elmirochka1989?call" target="_blank").contacts__text elmirochka1989
						p
							span.contacts__icon
								font-awesome-icon(:icon="['fab', 'telegram']")
							a(href="https://t.me/timra_work" target="_blank").contacts__text timra_work
						p
							span.contacts__icon
								font-awesome-icon(:icon="['fab', 'github']")
							a(href="https://github.com/TimraWork" target="_blank").contacts__text github.com/TimraWork
						p
							span.contacts__icon
								font-awesome-icon(:icon="['fab', 'codepen']")
							a(href="https://codepen.io/ElmiraMukhamedjanova/pens/popular" target="_blank").contacts__text codepen.io/ElmiraMukhamedjanova
						p
							span.contacts__icon
								font-awesome-icon(:icon="['fab', 'bitbucket']")
							a(href="https://bitbucket.org/account/user/timra_work/" target="_blank").contacts__text bitbucket.org/user/timra_work
						p
							span.contacts__icon
								font-awesome-icon(:icon="['fas', 'file-pdf']")
							a(href="CV_Elmira_Mukhamedjanova.pdf" download).contacts__text CV_Elmira_Mukhamedjanova.pdf
					
					.col-md-7.content
						.mb-3
							p Меня зовут 
								strong Эльмира. 
							| С 2013 года занимаюсь веб-разработкой, а именно версткой сайтов, посадкой сайтов на cms Wordpress.
						
						h3.ui-title-4 Образование:
						.mb-3
							p Высшее(бакалавр) - ТашИИТ. Специальность 
								strong "инженер-программист".
						
						h3.ui-title-4 Опыт работы в сфере IT:
						.mb-3
							p
								strong
									| май 2018 - по настоящий момент - 
								a(href="http://www.metrafor.ru/" target="_blank") Metrafor
							p
								strong
									| сентябрь 2017 - май 2018 - 
								a(href="http://sabgames.org/" target="_blank") Sabgames
							p
								strong
									| сентябрь 2013 - октябрь 2014  - 
								a(href="https://stylemix.uz/" target="_blank") StyleMix

						h3.ui-title-4 Навыки:	
						.mb-3
							p • 
								strong HTML 4-5, CSS3, JS, PHOTOSHOP, Zeplin, Figma, WordPress, Bitrix
							p • Библиотека JavaScript – 
								strong JQUERY 
								| ( не изобретаю велосипеды, но клики, аяксы, мелкие события пишу без проблем ) 
							p • Фреймворк JavaScript – 
								strong Vue.js 
								| ( этот сайт написан на
								strong vue-cli3 + vue router + vuex + wordpress rest api ) 
							p • Препроцессор HTML – 
								strong JADE(PUG) 
								| ( пишу на нем, как по мне весьма удобная вещь=) ) 
							p • Компиляция CSS – 
								strong SASS(LESS, STYLUS) (по требованиям проекта) 
							p • HTML фреймворк – 
								strong Bootstrap4, UiMini 
							p • CMS – 
								strong WordPress 
								| (лендинги, визитки, небольшие блоги - с нуля, либо использую готовые темы, магазин делать пока не было задач, но было бы интересно) 
							p • Сборка проекта – 
								strong GULP, WEBPACK 
								| ( автоматизация рутинных процессов: минификация картинок, компиляция sass(less), компиляция jade, автопрефиксы, livereload ) 
							p • Работа в консоле ( у меня она красивая – 
								strong iterm2 + zsh ) 
							p • 
								strong SQL 
								| запросы к базе – знание основ (в институте нравилось это дело, в связке с wordpress к сожалению этот навык нужен крайне редко) 
							p • 
								strong Английский 
								| – на уровне свободного чтения документации (разговорный – не самый лучший) 
							p • 
								strong Git 
								| (сохраняю там все свои проекты) 
	//- h2.ui-title-2 Контакты

</template>

<script>
// export default {
// 	data() {
// 		return {};
// 	}
// };

export default {
	metaInfo: {
		title: 'Обо мне',
		meta: [
			{
				property: 'description',
				content: 'Немного о себе: образование, навыки, контакты'
			},
			{
				property: 'og:title',
				content: 'Vue App title'
			},
			{
				property: 'og:description',
				content: 'Vue App description'
			}
		]
	}
};
</script>

<style lang="stylus" scoped>
.content{
	margin-left: 20px;
}

.content p{
	margin-bottom: 10px;
}

.mb-3{
	margin: 0 0 30px;
}

.contacts__icon, .contacts__text {
	display: inline-block;
	vertical-align: top;
}

.contacts__icon .svg-inline--fa{
	color: #000;
	font-size: 10px;
	opacity: .2;
	width: 20px;
	height: 25px;
	margin-right: 15px;
	margin-bottom: 10px;
}
</style>
