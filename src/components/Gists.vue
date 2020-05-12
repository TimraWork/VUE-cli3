<template lang="pug">
	.content-wrapper
		section
			.container
				h1.ui-title-1 {{ $t('gists') }}
				.search
					input.search__input(type="text" v-model="searchQuery" :placeholder="$t('search')" )

				.loading(v-if="!posts")
					font-awesome-icon(icon="spinner" class="fa-spin")

				.blog__list
					transition-group(name="flip-list" tag="div" class="row")
						.col-xs-12.col-sm-4.mb-2(v-for = "post in searchedPosts" :key = "post.id")
							a.ui-card.ui-card--shadow(:href="post.html_url" v-html="post.description" target="_blank")
</template>

<script>
import CatList from "./Categories/CatList";

import axios from "axios";

let blogURL =
  "https://timra.ru/timra/wp-json/wp/v2/posts?_embed&per_page=6&page=";

export default {
  data() {
    return {
      posts: null,
      searchQuery: ""
    };
  },
  computed: {
    searchedPosts() {
      //   if (this.searchQuery === "") {
      //     return this.posts;
      //   } else {
      //     return this.posts.filter(
      //       post =>
      //         post.description
      //           .toLowerCase()
      //           .indexOf(this.searchQuery.toLowerCase()) !== -1
      //     );
      //   }

      return this.searchQuery
        ? this.posts.filter(
            post =>
              post.description
                .toLowerCase()
                .indexOf(this.searchQuery.toLowerCase()) >= 0
          )
        : this.posts;
    }
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    getPosts: function() {
      this.posts = null;
      //CAT ID
      let apiUrl = "https://api.github.com/users/TimraWork/gists";
      axios.get(apiUrl).then(response => {
        this.posts = response.data;
        // console.log(this.posts);
      });
    }
  }
};
</script>

<style lang="stylus">
.ui-card {
  display: block;
}

// some vue flip animation
.flip-list-move {
  transition: transform 0.4s;
}

.flip-list-leave-to {
  transition: all 0.3s ease-in-out;
  opacity: 0;
}
</style>
