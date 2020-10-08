<template lang="pug">
	.content-wrapper
		section
			.container
				h1.ui-title-1 {{ $t('about') }}
				.row
					.col-sm-4
						img.mb-3(src="./../assets/images/about.jpg")
						h3.ui-title-4 Образование
						.mb-3 высшее (ТашИИТ) – инженер-программист
						
						h3.ui-title-4 Сертификаты
						.mb-3
							.row
								.col-md-6
									a(href="https://assets.htmlacademy.ru/certificates/intensive/167/1504387.pdf" target="_blank")
										img(src="./../assets/images/js1.jpg")
								.col-md-6
									a(href="https://assets.htmlacademy.ru/certificates/intensive/169/1504387.pdf" target="_blank")
										img(src="./../assets/images/js2.jpg")

						h3.ui-title-4 Опыт работы
						.mb-3 5 лет (на должности html-верстальщик)

						h3.ui-title-4 Контакты и соц.сети

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
						p.mb-3
							span.contacts__icon
								font-awesome-icon(:icon="['fas', 'file-pdf']")
							a(href="img/CV_Elmira_Mukhamedjanova.pdf" download).contacts__text CV_Elmira_Mukhamedjanova.pdf
					
					.col-sm-7.content
						.mb-3
							h3.ui-title-4 Меня зовут Эльмира. 
							| С 2013 года занимаюсь веб-разработкой, а именно версткой сайтов, посадкой несложных сайтов (лендингов) на cms Wordpress, Bitrix.  
						
						h3.ui-title-4 Опыт работы:
						.mb-3
							p
								strong
									| 04.2018 - 05.2018 - 
								a(href="http://www.metrafor.ru/" target="_blank") Metrafor
							p
								strong
									| 10.2017 / 04.2018 - 
								a(href="http://sabgames.org/" target="_blank") Sabgames
							p
								strong
									| 08.2013 / 10.2014  - 
								a(href="https://stylemix.uz/" target="_blank") StyleMix


						h3.ui-title-4 Навыки:	
						.mb-3
							p • 
								strong HTML 4-5, CSS3, JS, JQUERY, VUE.JS, REACT.JS, PHOTOSHOP, Zeplin, Figma, WordPress, Bitrix
							p • Библиотека JavaScript – 
								strong JQUERY 
								| ( не изобретаю велосипеды, но клики, аяксы, мелкие события пишу без проблем ) 
							p • Фреймворк JavaScript – 
								strong Vue.js 
								| ( этот сайт написан на 
								strong  vue-cli3 + vue router + vuex + wordpress rest api ) 
							p • Библиотека – 
								strong React 
								| ( изучаю самостоятельно 
								strong  create-react-app + MATERIAL-UI + wordpress rest api ) 
							p • Препроцессор HTML – 
								strong JADE(PUG) 
								| ( пишу на нем, как по мне весьма удобная вещь=) для скорости написания однотиптых блоков ) 
							p • Компиляция CSS – 
								strong SASS(LESS, STYLUS) (по требованиям проекта) 
							p • HTML(CSS) фреймворк – 
								strong Bootstrap4, UiMini, MATERIAL-UI
							p • CMS – 
								strong WordPress 
								| (лендинги, визитки, небольшие блоги - с нуля, либо использую готовые темы, магазин делать пока не было задач, но было бы очень интересно) 
							p • Сборка проекта – 
								strong GULP, WEBPACK3,4 
								| ( настраивала несколько своих шаблонов, использовала готовые варианты сборки, но зависит от проекта - для автоматизация рутинных процессов: минификация картинок, компиляция sass(less), компиляция jade, автопрефиксы, livereload ) 
							p • Работа в консоле ( у меня она красивая – 
								strong iterm2 + zsh ) 
							p • Оптимизация скорости сайта 
								strong PageSpeed Insights 
								| ( оптимизировала существующий сайт под сервис гугла, при нынешних скоростях интернета не очень актуально, но если нужно могу верстать учитывая данные требования + учитывая грамотное сео, ) 
							p • 
								strong SQL 
								| запросы к базе – знание основ (в институте нравилось это дело, в связке с wordpress к сожалению этот навык нужен крайне редко) 
							p • 
								strong PHP 
								| в рамках дипломной работы в институте разрабатывала сайт на php без sms
							p • 
								strong Английский 
								| – на уровне свободного чтения документации
								| - занимаюсь с преподавателем (уровень знаний - Pre-Intermediate )
							p • 
								strong Git, Bitbacket, Gists
								| (сохраняю там все свои проекты, наработки) 

</template>

<style lang="stylus" scoped>
.content p {
  margin-bottom: 10px;
}

.mb-3 {
  margin: 0 0 30px;
}

.contacts__icon, .contacts__text {
  display: inline-block;
  vertical-align: top;
}

.contacts__icon .svg-inline--fa {
  color: #000;
  font-size: 10px;
  opacity: 0.2;
  width: 20px;
  height: 25px;
  margin-right: 15px;
  margin-bottom: 10px;
}
</style>
