<template lang="pug">
	.content-wrapper
		section
			.container
				.blog
					h1.ui-title-1 {{ $t('blog') }}
					//- input.search__input(type="text" v-model.lazy.trim="searchQuery" placeholder="Поиск" v-on:change="fetchPhotos" )
					input.search__input(type="text" v-model="searchQuery" placeholder="Поиск" v-on:change="fetchPhotos" )
					a.button.button-default(href="#" v-on:click="fetchPhotos()") Поиск
					br
					br
					.ui-title-3 You searched: {{searchQuery}}
					.row.blog__list
						.col-xs-12.col-md-3.mb-2(v-for = "post in posts" :key = "post.id")
							.ui-card.ui-card--shadow
								.blog__img
									span(v-for = "img in post._embedded['wp:featuredmedia']")
										img( :src="img.source_url", alt="")
								router-link.blog__title(:to = " '/' + $i18n.locale + '/post/' + `${post.id}`" v-html="post.title['rendered']" )
					
					.loading(v-if="!posts")
						font-awesome-icon(icon="spinner" class="fa-spin")
					.page-nav(v-if="posts")
						router-link.button.button-default(:to = " '/' + $i18n.locale + '/page/' + `${currentPage-1}`"  @click.native='currentPage -= 1, posts = null') -
						span.page-nav__label You're on page: {{ currentPage }}
						router-link.button.button-default(:to = " '/' + $i18n.locale + '/page/' + `${currentPage+1}`" @click.native='currentPage += 1, posts = null') +

</template>

<script>
import axios from 'axios';

let blogURL =
	'https://timra.ru/timra/wp-json/wp/v2/posts?_embed&per_page=8&page=';

export default {
	data() {
		return {
			textSearch: '',
			posts: null,
			totalPhotos: 0,
			perPage: 12,
			currentPage: 1,
			searchQuery: ''
		};
	},
	computed: {},
	watch: {
		currentPage: 'fetchPhotos'
	},
	methods: {
		// Slice array
		getExcerpt: post_content => post_content.slice(0, 200),
		//  Submit New Task
		fetchPhotos: function() {
			if (this.searchQuery) {
				var searchUrl = this.generateUrl(blogURL);
				console.log(searchUrl);
				axios.get(searchUrl).then(response => {
					this.posts = response.data;
				});
			} else {
				axios.get(blogURL + this.currentPage).then(response => {
					this.posts = response.data;
				});
			}
		},
		// Generate the search URL
		generateUrl: function(blogURL) {
			// Add search parameters.
			if (this.searchQuery) {
				this.posts = null;
				return (
					blogURL +
					this.currentPage +
					'&search=' +
					encodeURI(this.searchQuery)
				);
			} else {
				return blogURL;
			}
		}
	},
	created() {
		this.fetchPhotos(this.currentPage);
	}
};
</script>

<style lang="stylus">
pre {
  font-size: 10px;
}

.svg-inline--fa.fa-w-16 {
  width: 60px;
  height: 60px;
}

.mb-2 {
  margin-bottom: 15px;
}

.loading {
  text-align: center;
  color: #ccc;
  padding: 100px 0;
}

.ui-card {
  height: 100%;
  font-size: 14px;
  font-weight: bold;
}

.blog__img {
  text-align: center;
}

.blog__img {
  height: 180px;
  margin-bottom: 15px;
  padding: 15px;
  background: #eaeaea;
  display: flex;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
}

.blog__img img {
  max-height: 150px;
  object-fit: contain;
}

.page-nav {
  text-align: center;
}

.page-nav__label, .button, button {
  padding: 0 10px;
  display: inline-block;
  vertical-align: middle;
}

.blog__list {
  margin-bottom: 20px;
}

pre .pln {
  color: #000;
}

pre .str {
  color: #080;
}

pre .kwd {
  color: #008;
}

pre .com {
  color: #800;
}

pre .typ {
  color: #606;
}

pre .lit {
  color: #066;
}

pre .clo, pre .opn, pre .pun {
  color: #660;
}

pre .tag {
  color: #008;
}

pre .atn {
  color: #606;
}

pre .atv {
  color: #080;
}

pre .dec, pre .var {
  color: #606;
}

pre .fun {
  color: red;
}

pre.prettyprint {
  border: 1px solid #ccc;
  font-size: 12px;
  line-height: 16px;
  margin: 6px 0;
  padding: 2px 7px;
  word-wrap: normal;
  overflow: auto;
  width: 98%;
}

ol.linenums li {
  line-height: 16px;
  margin: 0;
  padding: 0;
  list-style: none;
}

ol.linenums li:after, ol.linenums li:before {
  content: none;
}

ol.linenums {
  margin: 0;
  padding-left: 27px;
}

ol.linenums li.L0, ol.linenums li.L1, ol.linenums li.L2, ol.linenums li.L3, ol.linenums li.L4, ol.linenums li.L5, ol.linenums li.L6, ol.linenums li.L7, ol.linenums li.L8, ol.linenums li.L9 {
  list-style-type: decimal;
}

ol.linenums li.L1, ol.linenums li.L3, ol.linenums li.L5, ol.linenums li.L7, ol.linenums li.L9 {
  list-style-type: decimal;
  background: #eee;
}

pre.prettyprint {
  margin: 0 0 10px !important;
  font-family: Arial;
  padding: 8px 10px !important;
  background: #f9fff5;
  border: 0 !important;
  border-left: 3px solid #31C419 !important;
  font: 10px Monaco, Consolas, 'Andale Mono', 'DejaVu Sans Mono', monospace !important;
  width: auto !important;
}

table pre.prettyprint {
  margin: 10px 0 !important;
  border: 0;
  line-height: 1.3;
  display: block;
  padding: 6px 10px;
  background: #fff;
  font-size: 10px;
  border-left: 3px solid #31C419;
  white-space: pre-wrap;
}

.post__content h2 {
  font-size: 20px;
  font-weight: bold;
  font-family: Arial;
  margin: 30px 0 30px;
  line-height: 1.2;
}

.post__content h3 {
  font-size: 18px;
  font-weight: bold;
  font-family: Arial !important;
  margin: 30px 0 30px !important;
  line-height: 1.2;
}

.post__content h4 {
  font-size: 16px;
  font-weight: bold;
  font-family: Arial !important;
  margin: 30px 0 30px !important;
  line-height: 1.2;
}

.post__content img, .comment-content img, .widget img {
  height: auto;
  margin: 0 auto;
  display: block;
}

img.retina {
  zoom: 0.5;
  max-height: 500px;
}

img.not_retina {
  zoom: 1 !important;
  max-height: 500px;
}

.post__content table img {
  display: inline-block;
  vertical-align: middle;
}

.singular .entry-meta .edit-link a {
  left: 0px;
  top: 50px;
}

code {
  max-width: 100%;
  white-space: nowrap;
  font-family: SFMono-Medium, 'SF Mono', 'Segoe UI Mono', 'Roboto Mono', 'Ubuntu Mono', Menlo, Consolas, Courier, monospace;
  font-size: 11px;
  overflow-x: auto;
  padding: 3px 5px;
  background: rgb(244, 245, 247);
  border-radius: 3px;
  margin: 0 7px;
}

table {
  font-size: 12px;
  line-height: 1.3;
  border-bottom: none !important;
  margin-bottom: 40px !important;
}

table td {
  padding: 15px 10px !important;
  border: none !important;
  vertical-align: middle;
}

table tr:nth-child(2n + 1) td {
  background: #f6f6f6;
}

table td:first-child {
  width: 25%;
}

.entry-title {
  line-height: 1.2;
  margin-bottom: 20px;
}

.singular .hentry {
  padding: 2em 0;
}

.singular .entry-title {
  font-size: 32px;
  line-height: 1.2;
  border-bottom: 2px solid black;
  margin-bottom: 0;
}

.post__content h1 {
  font-size: 32px;
}

.post__content h2 {
  font-size: 28px;
}

.post__content h3 {
  font-size: 23px;
  text-transform: none;
  letter-spacing: 0;
  margin: 10px 0;
}

.post__content p {
  margin-bottom: 20px;
}
</style>
