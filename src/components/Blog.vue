<template lang="pug">
	.content-wrapper
		section
			.container
				h1.ui-title-1 {{ $t('blog') }}
				.row
					.col-sm-10
						.blog
							form.search(action="#" @submit.prevent='getPosts(), currentPage = 1, parentCatName="", clickToSearch = "SEARCH" ')
								input.search__input(type="text" v-model.lazy.trim="searchQuery" :placeholder="$t('search')" )
								router-link.button.button-default.search__btn(
									:to="{ name: 'PageNumber', params: { page_number: '1' }, query: { search: " + "`${searchQuery}`" + " }}" 
									@click.native='getPosts(), currentPage = 1, parentCatName="", clickToSearch = "SEARCH" ' 
								) {{ $t('search') }}

							transition(name="fade")
								.cat_name.mb-2(v-if="parentCatName") Aрхив рубрики: 
									strong {{ parentCatName }}

							transition(name="fade")
								.cat_name.mb-2(v-if="searchQuery") Вы искали: 
									strong {{ searchQuery }}
							
							.page-nav.mb-2(v-if="posts && totalPages > 0")
								a(href="#" @click.prevent="goToPage('prev')" :class="{ disabled : currentPage < 2 }" ).button.button-default <
								span.page-nav__label {{ currentPage }} {{ $t('of') }} {{ totalPages }}
								a(href="#" @click.prevent="goToPage('next')" :class="{ disabled : currentPage > totalPages - 1 }" ).button.button-default >

							.row.blog__list
								.col-xs-12.col-sm-4.mb-2(v-for = "post in posts" :key = "post.id")
									.ui-card.ui-card--shadow
										.blog__img
											span(v-for = "img in post._embedded['wp:featuredmedia']")
												img( :src="img.source_url", alt="")
										router-link.blog__title(:to = " '/' + $i18n.locale + '/blog/post/' + `${post.id}`" v-html="post.title['rendered']" )
							
							.loading(v-if="!posts && !axiosError")
								font-awesome-icon(icon="spinner" class="fa-spin")
								
							.sory.text-center(v-if="totalPages < 0") {{ $t('not_found') }}
							.sory.text-center(v-if="axiosError") {{ axiosError }}
						
					.col-sm-2
						//- h3.ui-title-3 {{ $t('cats') }}
						CatList
</template>

<script>
import CatList from "./CatList";

import axios from "axios";

let blogURL =
  "http://timra.ru/timra/wp-json/wp/v2/posts?_embed&per_page=6&page=";

export default {
  components: {
    CatList,
  },
  props: ["page_number", "cat_name"],
  data() {
    return {
      posts: null,
      searchQuery: "",
      currentPage: 1,
      totalPages: 0,
      clickToSearch: "",
      axiosError: "",
      parentCatName: "",
      parentCatId: "",
    };
  },
  mounted() {
    // console.log('cat_name = ', this.cat_name);
    // console.log('page_number = ', this.page_number);

    if (this.$route.query.search) {
      this.searchQuery = this.$route.query.search;
    }
    if (this.cat_name) {
      this.getCatName();
    } else {
      this.getPosts();
    }
  },
  watch: {
    currentPage: "getPosts",
    cat_name: "getCatName",
    // $route(toR, fromR) {
    // 	console.log('Номер текущей страницы ==', toR.params['page_number']);
    // }
  },
  methods: {
    getCatName: function () {
      if (this.cat_name) {
        this.searchQuery = "";

        // console.log(' ++++++++++++++ getCatName ++++++++++++++++');
        this.posts = null;
        //CAT ID
        let apiListCatsUrl =
          "http://timra.ru/timra/wp-json/wp/v2/categories/?slug=" +
          encodeURI(this.cat_name);
        axios.get(apiListCatsUrl).then((response) => {
          this.parentCatName = response.data[0]["name"];
          this.parentCatId = response.data[0]["id"];
          // console.log(response.data[0]);

          this.currentPage = "1";

          let apiListPostsUrl =
            blogURL + this.currentPage + "&categories=" + this.parentCatId;

          axios
            .get(apiListPostsUrl)
            .then((response) => {
              this.posts = response.data;
              this.totalPages = response.headers["x-wp-totalpages"] - 1;
              //   console.log("getCatName");
            })
            .catch((error) => {
              this.axiosError = error;
            });
        });
      }
    },
    goToPage: function (to) {
      switch (to) {
        case "prev": // if (to == 'prev') {
          this.currentPage--;
          break;
        case "next": // if (to == 'next') {
          this.currentPage++;
          break;
        default:
          this.currentPage = 1;
          break;
      }
      // console.log(this.searchQuery);
      if (this.searchQuery) {
        this.$router.push({
          name: "PageNumber",
          params: {
            page_number: this.currentPage,
          },
          query: {
            search: this.searchQuery,
          },
        });
      } else if (this.cat_name) {
        this.$router.push({
          name: "CatPage",
          params: {
            page_number: this.currentPage,
            cat_name: this.cat_name,
          },
        });
      } else {
        this.$router.push({
          name: "PageNumber",
          params: {
            page_number: this.currentPage,
          },
        });
      }
    },
    getPosts: function (searchQuery) {
      this.posts = null;

      // PAGER
      this.page_number && !this.clickToSearch
        ? (this.currentPage = Number(this.page_number))
        : this.currentPage;

      // API URL
      let apiListPostsUrl = this.searchQuery
        ? blogURL + this.currentPage + "&search=" + encodeURI(this.searchQuery)
        : blogURL + this.currentPage;

      //CATEGORY
      if (this.cat_name) {
        apiListPostsUrl =
          blogURL + this.currentPage + "&categories=" + this.parentCatId;
        // console.log('apiListPostsUrl = ', apiListPostsUrl);
      }

      // POSTS
      axios
        .get(apiListPostsUrl)
        .then((response) => {
          this.posts = response.data;
          this.totalPages = response.headers["x-wp-totalpages"] - 1;
          //   console.log("getPosts");
        })
        .catch((error) => {
          this.axiosError = error;
        });
    },
  },
};
</script>

<style lang="stylus">
pre {
  font-size: 10px;
  margin-bottom: 60px !important;
}

.svg-inline--fa.fa-w-16 {
  width: 40px;
  height: 40px;
}

.mb-2 {
  margin-bottom: 15px;
}

.loading {
  text-align: center;
  color: #69babe;
  padding: 50px 0 0;
  opacity: 0.5;
}

.ui-card {
  height: 100%;
  font-size: 14px;
  font-weight: bold;
  padding: 12px;
}

.blog__img {
  height: 191px;
  margin-bottom: 15px;
  padding: 15px;
  background: url(../assets/images/No-Image-Placeholder.svg) no-repeat #eeeeee center center;
  background-size: 100% 100%;
  display: flex;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  text-align: center;

  img {
    max-height: 150px;
    object-fit: contain;
  }

  &--small {
    height: 50px;

    img {
      max-height: 50px;
    }
  }
}

.page-nav {
  text-align: center;
  margin-bottom: 30px;
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
  margin: 0 0 30px !important;
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

.ok {
  color: #0f0;
}

.sory {
  color: #f00;
}

.search {
  display: flex;
  margin-bottom: 60px;
}

.search input {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
}

.search__input {
  margin-bottom: 0;
}

.search__btn {
  display: flex;
  align-items: center;
}

.ui-card.active {
  color: blue;
  background: #f4f4f4;
}
</style>
