<template lang="pug">
	.content-wrapper
		section
			.container
				h1.ui-title-1 {{ $t('works') }}
				.filter
					.filter__cats
						.filter__item(:class="{ active: cat === 'All' }" @click="cat = 'All'" ) Все работы
						.filter__item(:class="{ active: cat === 'wp: WordPress' }" @click="cat = 'wp: WordPress'" ) Wordpress
						.filter__item(:class="{ active: cat === 'frontend: Верстка' }" @click="cat = 'frontend: Верстка'" ) Frontend
					
					.filter__list.row(v-if="works")
						.filter__item.col-sm-4(v-for = "work in filteredWorks")
							a.filter__link(:href="work.works_link" target="_blank") 
								img.filter__link(:src="work.works_img.url", alt="")
								.filter__title {{ work.works_name }}
								.filter__cat {{ work.works_category }}
</template>

<script>
import axios from "axios";

let blogURL = "https://timra.ru/timra/wp-json/wp/v2/pages/9662";

export default {
  data() {
    return {
      works: null,
      cat: "All"
    };
  },
  mounted() {
    this.getData();
    // console.log("asdf");
  },
  computed: {
    // filteredWorks: function() {
    //   var vm = this;
    //   var category = this.cat;

    //   if (category === "All") {
    //     return vm.works;
    //   } else {
    //     return vm.works.filter(function(work) {
    //       return work.works_category === category;
    //     });
    //   }
    // },
    filteredWorks() {
      console.log(this.cat);
      if (this.cat === "All") {
        return this.works;
      } else {
        return this.works.filter(work => work.works_category === this.cat);
      }
    }
  },
  methods: {
    getData() {
      // WORKS
      axios
        .get(blogURL)
        .then(response => {
          this.works = response.data.acf.works;
          //   console.log(response.data.acf.works);
        })
        .catch(error => {
          this.axiosError = error;
        });
    }
    // setCategory: function() {
    //   //  :click="cat = 'Wordpress'"
    //   console.log("current_cat = ");
    // },
    // setFilter: function() {
    //   console.log("setFilter = ");
    //   // WORKS
    //   axios
    //     .get(blogURL)
    //     .then(response => {
    //       this.works = response.data;
    //     })
    //     .catch(error => {
    //       this.axiosError = error;
    //     });
    // }
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

.filter__item.active {
  background: #ccc;
}
</style>
