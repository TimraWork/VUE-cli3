<template lang="pug">
	.content-wrapper
		section
			.container
				.blog
					h1.ui-title-1 {{ $t('blog') }}
					.blog__list
						.blog__item(v-for = "post in posts")
							.blog__img(v-for = "p in post._embedded['wp:featuredmedia']")
								img( :src="p.source_url", alt="")
							a( :href = 'post.link' target="_blank").blog__title(v-html="post.title['rendered']")

</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      posts: null,
      photos: [], // Массив фоток
      totalPhotos: 0,
      perPage: 12,
      currentPage: 1
    };
  },
  methods: {
    //  Submit New Task
    fetchPhotos: function(page) {
      var options = {
        params: {
          page: page,
          per_page: this.perPage
        }
      };
      axios
        .get(
          "http://timra.ru/timra/wp-json/wp/v2/posts?_embed&per_page=12&page=1"
        )
        .then(response => {
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
          console.log("media = ", response.data._embedded);
        });
    }
  },
  mounted() {},
  created() {
    this.fetchPhotos(this.currentPage);
  }
};
</script>

<style lang="stylus">
pre {
  font-size: 10px;
}

.blog {
  &__list {
    display: flex;
    flex-wrap: wrap;
  }

  &__item {
    margin-bottom: 20px;
    width: 30%;
  }
}
</style>
