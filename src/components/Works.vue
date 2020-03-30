<template lang="pug">
	.content-wrapper
		section
			.container
				h1.ui-title-1 {{ $t('works') }}
				.filter
					.filter__cats
						a(href="" :click.stop.prevent="setCategory").filter__item(:class="{ active: cat === 'ALL' }" ) Все работы
						a(href="" :click.stop.prevent="setCategory('Wordpress')").filter__item(:class="{ active: cat === 'Wordpress' }") Wordpress
						a(href="" :click.stop.prevent="setCategory").filter__item(:class="{ active: cat === 'Frontend' }" ) Frontend
					
					.filter__list.row(v-if="works")
						.filter__item.col-sm-4(v-for = "work in works['acf']['works']")
							span(v-if="work.works_category === cat")
							a.filter__link(:href="work.works_link" target="_blank") 
								img.filter__link(:src="work.works_img.url", alt="")
								.filter__title {{ work.works_name }}
								.filter__cat {{ work.works_category }}
						//- .filter__item.col-md-4(v-for = "work in filteredWorks")
						//- 	.filter__title {{ work.works_name }}
</template>

<script>
import axios from 'axios';

let blogURL = 'https://timra.ru/timra/wp-json/wp/v2/pages/9662';

export default {
	data() {
		return {
			works: null,
			cat: 'ALL'
		};
	},
	mounted() {
		// this.setFilter('All');
	},
	computed: {
		setFilter: function() {
			// console.log(cat);
			axios
				.get(blogURL)
				.then(response => {
					this.works = response.data;
				})
				.catch(error => {
					this.axiosError = error;
				});
		}
	},
	methods: {
		setCategory: function(cat) {
			//  :click="cat = 'Wordpress'"
			console.log('current_cat = ', cat);
			this.cat = cat;
		}
		// setFilter: function(cat) {
		// 	console.log('cat =', cat);
		// 	// WORKS
		// 	axios
		// 		.get(blogURL)
		// 		.then(response => {
		// 			this.works = response.data;
		// 		})
		// 		.catch(error => {
		// 			this.axiosError = error;
		// 		});
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
</style>
