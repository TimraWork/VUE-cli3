<template lang="pug">
	.content-wrapper
		section
			.container
				.loading(v-if="!post")
					font-awesome-icon(icon="spinner" class="fa-spin")
				.post(v-if='post')
					h1.ui-title-1 {{ $t('about') }}
					//- h1.ui-title-1(v-html="post.title['rendered']")
					.post__content(v-html="post.content['rendered']")
</template>
<script>
import axios from "axios";
export default {
  props: ["id"],
  data() {
    return {
      post: null,
      endpoint: "http://timra.ru/timra/wp-json/wp/v2/pages/10618"
    };
  },
  methods: {
    getPost(id) {
      axios(this.endpoint)
        .then(response => {
          this.post = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.getPost(this.id);
  }
};
</script>
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
