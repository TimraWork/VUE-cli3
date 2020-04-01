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

				.loading(v-if="!works")
					font-awesome-icon(icon="spinner" class="fa-spin")

				.filter__content(v-if="works")
					transition-group(class="filter__list" name="projects" tag="div")
						.filter__item(v-for = "work in filteredWorks" :key="work.works_img.id")
							//- pre {{ work }}
							a.filter__link(:href="work.works_link" target="_blank")
								img.filter__img(:src="work.works_img.url", alt="")
								span.filter__cover
									span.filter__top
										span.filter__title {{ work.works_name }}
										span.filter__date {{ work.works_date }}
									span.filter__bottom
										span.filter__tags
											span.filter__tag(v-for = "tags in work.tegi" ) {{ tags.name }}
										//- .filter__cat {{ work.works_category }}

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
  },
  computed: {
    filteredWorks() {
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
          console.log("axios");
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

.filter__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  transition: all 0.3s ease-in-out;
}

.filter__item {
  position: relative;
  padding: 2px 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 10px;
  transition: all 0.35s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  font-weight: normal;
  border-radius: 2px;
}

.filter__content .filter__item {
  transition: all 0.35s ease-in-out;
  width: 25%;
  padding: 0;
  margin: 0;
  border-radius: 0px;
}

.filter__item.active, .filter__item:hover {
  background: #69BABE;
  color: white;
}

.filter__item .filter__img {
  max-width: 100%;
  transition: 0.3s ease-in-out;
}

.filter__item:hover .filter__img {
  transform: scale(1.05);
}

.filter__cover {
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  flex-direction: column;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.97);
  transition: 0.3s ease-in-out;
  color: #000;
  padding: 30px;
}

.filter__item:hover .filter__cover {
  opacity: 1;
}

.filter__title {
  font-weight: bold;
  font-size: 25px;
  margin-bottom: 10px;
}

.projects-enter {
  transform: scale(0.005) translatey(-30px);
  opacity: 0;
}

.projects-leave-to {
  transform: translatey(30px);
  opacity: 0;
}

.projects-leave-active {
  position: absolute;
  z-index: -1;
}

.filter__date {
  display: block;
  color: #69babe;
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 30px;
}

.filter__tags {
  font-size: 0;
  max-width: 50%;
  font-weight: bold;
  text-transform: uppercase;
}

.filter__tag {
  font-size: 14px;
  margin: 0 3px 5px;
  display: inline-block;
  border-radius: 2px;
  background: #69babe;
  padding: 0 5px;
  color: #fff;
  opacity: 0.5;
}

.filter__top {
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s 0.3s ease-in-out;
}

.filter__bottom {
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s 0.3s ease-in-out;
}

.filter__item:hover .filter__top, .filter__item:hover .filter__bottom {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 1440px) {
  .filter__content .filter__item {
    width: 33%;
  }

  .ui-title-1 {
    font-size: 35px;
  }

  .filter__title {
    font-size: 25px;
  }
}

@media (max-width: 992px) {
  .filter__content .filter__item {
    width: 50%;
  }
}

@media (max-width: 680px) {
  .filter__content .filter__item {
    width: 100%;
  }

  .ui-title-1, .filter__title {
    font-size: 25px;
  }
}
</style>
