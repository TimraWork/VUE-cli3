<template lang="pug">
	.content-wrapper
		section
			.container
				h1.ui-title-1 {{ $t('works') }}
				.filter
					.filter__cats
						a(href="#").filter__item(:class="{ active: setFilter === 'ALL' }" ) Все работы
						a(href="#").filter__item(:click="setFilter('Wordpress')" ) Wordpress
						a(href="#").filter__item(:class="{ active: setFilter === 'Frontend' }" ) Frontend
					
					.filter__list.row(v-if="works")
						.filter__item.col-md-4(v-for = "work in works['acf']['works']")
							a.filter__link(:href="work.works_link" target="_blank") 
								img.filter__link(:src="work.works_img.url", alt="")
								.filter__title {{ work.works_name }}
								.filter__cat {{ work.works_category }}
						//- .filter__item.col-md-4(v-for = "work in filteredWorks")
						//- 	.filter__title {{ work.works_name }}
</template>

<script>
import axios from "axios";

let blogURL = "https://timra.ru/timra/wp-json/wp/v2/pages/9662";

export default {
  data() {
    return {
      works: null,
      cat: null
    };
  },
  mounted() {
    this.setFilter("All");
  },
  computed: {
    filteredWorks: function() {}
  },
  methods: {
    setFilter: function(cat) {
      console.log("cat =", cat);
      // WORKS
      axios
        .get(blogURL)
        .then(response => {
          this.works = response.data;
        })
        .catch(error => {
          this.axiosError = error;
        });
    }
  }
};
</script>

<style lang="stylus">
.filter__cats {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}

.filter__item {
  display: block;
  padding: 5px;
  margin-bottom: 10px;
}
</style>