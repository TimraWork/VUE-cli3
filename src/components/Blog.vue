<template lang="pug">
	.content-wrapper
		section
			.container
				.blog
					h1.ui-title-1 {{ $t('blog') }}
					input.search__input(type="text" v-model="search" placeholder="Поиск")
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
						span.button.button-default(v-on:click='currentPage -= 1, posts = null') - 
						span.page-nav__label You're on page: {{ currentPage }}
						span.button.button-default(v-on:click='currentPage += 1, posts = null') +

</template>

<script>
import axios from "axios";

var blogURL =
  "https://timra.ru/timra/wp-json/wp/v2/posts?_embed&per_page=8&page=";

export default {
  data() {
    return {
      textSearch: "",
      posts: null,
      totalPhotos: 0,
      perPage: 12,
      currentPage: 1,

      search: ""
    };
  },
  computed: {
    filteredList() {
      // let posts = Object.keys(this.posts);
      // return posts.filter(post =>
      // 	post.title.toLowerCase().includes(this.search.toLowerCase())
      // );
    }
  },
  watch: {
    currentPage: "fetchPhotos"
  },
  methods: {
    // Slice array
    getExcerpt: post_content => post_content.slice(0, 200),
    //  Submit New Task
    fetchPhotos: function(page) {
      axios.get(blogURL + this.currentPage).then(response => {
        this.posts = response.data;
        this.totalPhotos = parseInt(response.headers["x-wp-total"]);
        this.currentPage = page;
        // console.log(
        // 	'x-wp-total = ',
        // 	response.headers['x-wp-total']
        // );
        // console.log(
        // 	'x-wp-total = ',
        // 	response.headers['x-wp-total']
        // );
        // console.log(
        // 	'x-wp-totalpages = ',
        // 	response.headers['x-wp-totalpages']
        // );
        //   console.log("data ", response.data);
      });

      console.log(typeof this.posts);
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

// .blog {
// &__list {
// display: flex;
// flex-wrap: wrap;
// }

// &__item {
// margin-bottom: 20px;
// width: 30%;
// }
// }
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
</style>
