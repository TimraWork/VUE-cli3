<template lang="pug">
	.content-wrapper
		section
			.container
				.blog
					h1.ui-title-1 {{ $t('blog') }}
					.loading(v-if="!posts")
						font-awesome-icon(icon="spinner" class="fa-spin")
					.row
						.col-xs-12.col-md-4.mb-2(v-for = "post in posts")
							.ui-card.ui-card--shadow
								.blog__img
									span(v-for = "img in post._embedded['wp:featuredmedia']")
										img( :src="img.source_url", alt="")
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
          "http://timra.ru/timra/wp-json/wp/v2/posts?_embed&per_page=6&page=1"
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
</style>
