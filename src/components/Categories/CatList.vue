<template lang="pug">
	section
		//- .mb-2(v-for = "cat in cats" :key = "cat.id") 
		//- 	span(v-for = "img in cat.acf")
		//- 		| {{ img['url'] }}


		.blog__list
			.ui-card.ui-card--shadow.mb-2(v-for = "cat in cats" :key = "cat.id")
				.blog__img.blog__img--small
					span(v-for = "img in cat.acf")
						img( :src="img.url", alt="")
				a(:href="cat.link").blog__title
					| {{ cat.name }}
				//- router-link.blog__title(:to = " '/' + $i18n.locale + '/blog/post/' + `${post.id}`" v-html="post.title['rendered']" )
</template>
<script>
import axios from 'axios';

let blogURL =
	'http://timra.ru/timra/wp-json/wp/v2/categories?per_page=5&page=1&order=desc&orderby=count&exclude=1';

export default {
	data() {
		return {
			cats: null
		};
	},
	mounted() {
		this.getCats();
	},
	methods: {
		getCats: function() {
			// POSTS
			axios
				.get(blogURL)
				.then(response => {
					this.cats = response.data;
				})
				.catch(error => {
					this.axiosError = error;
				});
		}
	}
};
</script>
