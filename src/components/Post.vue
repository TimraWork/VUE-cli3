<template lang="pug">
	.content-wrapper
		section
			.container
				.loading(v-if="!post")
					font-awesome-icon(icon="spinner" class="fa-spin")
				.post(v-if='post')
					//- h1.ui-title-1 POST  {{ $route.params.id }}
					h1.ui-title-1(v-html="post.title['rendered']")
					.post__content(v-html="post.content['rendered']")

</template>

<script>
import axios from "axios";
export default {
  props: ["id"],
  data() {
    return {
      post: null,
      endpoint: "http://timra.ru/timra/wp-json/wp/v2/posts/",
    };
  },
  methods: {
    getPost(id) {
      axios(this.endpoint + id)
        .then((response) => {
          this.post = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getPost(this.id);
  },
};
</script>

<style lang="stylus">
.post__content {
  a {
    color: blue;
  }
}
</style>
