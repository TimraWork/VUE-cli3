<template lang="pug">
	.blog__list
		router-link(
			v-for = "cat in cats" :key = "cat.id"
			tag="div" 
			class="ui-card ui-card--shadow mb-2" 
			:to = " '/' + $i18n.locale + '/blog/category/' + `${cat.slug}` + '/page/1/'" active-class="active")
			.blog__img.blog__img--small
				span(v-for = "img in cat.acf")
					img( :src="img.url", alt="")
			a {{ cat.name }}

			
</template>
<script>
import axios from "axios";

let blogURL =
  "https://timra.ru/timra/wp-json/wp/v2/categories?per_page=5&page=1&order=desc&orderby=count&exclude=1";

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
