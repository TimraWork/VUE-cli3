<template lang="pug">
	.content-wrapper
		section
			.container
				.blog
					h1.ui-title-1 Blog
					.blog__list
						.blog__item(v-for = "post in posts")
							//- .blog__title {{post}}
							//- img(:src="")

</template>

<script>
import axios from 'axios';

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
				.get('http://timra.ru/timra/wp-json/wp/v2/posts')
				.then(response => {
					this.posts = response.data;
					this.totalPhotos = parseInt(response.headers['x-wp-total']);
					this.currentPage = page;
					console.log(
						'x-wp-total = ',
						response.headers['x-wp-total']
					);
					console.log(
						'x-wp-total = ',
						response.headers['x-wp-total']
					);
					console.log(
						'x-wp-totalpages = ',
						response.headers['x-wp-totalpages']
					);
				});
		}
	},
	mounted() {},
	created() {
		this.fetchPhotos(this.currentPage);
	}
};
</script>

<style lang="stylus"></style>
