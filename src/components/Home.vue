<template lang="pug">
	.content-wrapper
		section
			.container
				h1.ui-title-1 Home
				input(
					type = "text"
					placeholder = "What we will watch?"
					v-model = "taskTitle"
					@keyup.enter  = "newTask"
				)
				textarea(				
					placeholder = "What we will watch?"
					v-model = "taskDescription"
					@keyup.enter  = "newTask"
				)
				.option-list
					input.what-watch--radio(
						type="radio"
						id="radioFilm"
						value="Film"
						v-model="whatWatch"
					)
					label(
						for="radioFilm"
					) Film


					input.what-watch--radio(
						type="radio"
						id="radioSerial"
						value="Serial"
						v-model="whatWatch"
					)
					label(
						for="radioSerial"
					) Serial

				
				// TOTAL TIME
				.total-time

					// Film Time
					.total-time__film( v-if="whatWatch === 'Film'")
						span.time-title Hours
						input.time-input(
							type="number"
							v-model="filmHours"
						)
						span.time-title Minutes
						input.time-input(
							type="number"
							v-model="filmMinutes"
						)
						p {{ filmTime }}
						
					// Serial Time
					.total-time__serial( v-if="whatWatch === 'Serial'" )
						span Total Serial Times
						span.time-title How many season?
						input.time-input(
							type="number"
							v-model="serialSeason"
						)
						span.time-title How many series?
						input.time-input(
							type="number"
							v-model="serialSeries"
						)
						span.time-title How long is one series? (minutes)
						input.time-input(
							type="number"
							v-model="serialSeriesMinutes"
						)
						p {{ serialTime }}


				// TAG LIST
				// Add New Tag
				.tag-list.tag-list--add
					.ui-tag__wrapper( @click = "tagMenuShow = ! tagMenuShow")
						.ui-tag
							span.tag-title Add New
							span.button-close( :class="{ active: !tagMenuShow }")

				// Show/hide Input
				.tag-list.tag-list--menu(v-if="tagMenuShow")
					input.tag-add--input(type="text" placeholder="New tag" v-model="tagTitle" @keyup.enter="newTag")
					.button.button-default(@click="newTag") Send

				// All Tags
				.tag-list
					.ui-tag__wrapper(v-for="tag in tags")
						.ui-tag( @click = "addTagUsed(tag)" :class="{ active: tag.use}")
							span.tag-title {{ tag.title }}
							span.button-close

				//- p {{  tagsUsed }}

				.text-right
					.button.button--round.button-primary(@click="newTask") Send
		

</template>

<script>
export default {
  data() {
    return {
      taskTitle: "",
      taskDescription: "",
      whatWatch: "Film",
      taskId: 3,

      // Total Time
      // Film
      filmHours: 1,
      filmMinutes: 30,
      // Serial
      serialSeason: 1,
      serialSeries: 11,
      serialSeriesMinutes: 40,

      //Tags
      tagsUsed: [],
      tagTitle: "",
      tagMenuShow: false,
      tags: [
        {
          title: "Comedy",
          use: true
        },
        {
          title: "Westerns",
          use: false
        },
        {
          title: "Adventure",
          use: false
        }
      ]
    };
  },
  methods: {
    newTag() {
      if (this.tagTitle === "") {
        return;
      }
      //   this.tasks.push({
      this.tags.push({
        title: this.tagTitle,
        use: false
      });
    },
    newTask() {
      if (!this.taskTitle) return;

      //   this.tasks.push({
      const task = {
        id: this.taskId,
        title: this.taskTitle,
        description: this.taskDescription,
        whatWatch: this.whatWatch,
        tagsUsed: this.tags,
        completed: false,
        editing: false
      };

      console.log(task);

      // Reset
      this.taskId += 1;
      this.taskTitle = "";
      this.taskDescription = "";
      this.tagsUsed = [];
    },
    // tagMenuShow() {},
    addTagUsed(tag) {
      tag.use = !tag.use;
      if (tag.use) {
        this.tagsUsed.push(tag.title);
      } else {
        this.tagsUsed.splice(tag.title, 1);
      }
    },
    getHoursAndMinutes(minutes) {
      let hours = Math.trunc(minutes / 60);
      let min = minutes % 60;
      return hours + " Hours " + (min + " Minutes");
    }
  },
  computed: {
    filmTime() {
      let min = this.filmHours * 60 + this.filmMinutes;
      return this.getHoursAndMinutes(min);
    },
    serialTime() {
      let min =
        this.serialSeason * this.serialSeries * this.serialSeriesMinutes;
      return this.getHoursAndMinutes(min);
    }
  }
};
</script>

<style lang="stylus" scoped>
.option-list {
  display: flex;

  .what-watch--radio {
    margin-right: 12px;
  }

  label {
    margin-right: 20px;

    &:last-child {
      margin-right: 0;
    }
  }
}

// Total time
.total-time {
  margin-bottom: 20px;
}

.ui-tag.active {
  color: blue;
}

// Tags
.tag-list {
  margin-bottom: 20px;
}

.ui-tag__wrapper {
  margin-right: 18px;
  margin-bottom: 10px;

  &:last-child {
    margin-right: 0;
  }
}

.ui-tag {
  .button-close {
    &.active {
      transform: rotate(45deg);
    }
  }

  &.addTagUsed {
    background-color: #444ce0;
    color: #fff;

    .button-close {
      &:before, &:after {
        background-color: #fff;
      }
    }
  }
}

// Tag Menu Show
.tag-list--menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tag-list .tag-add--input, .what-watch--radio {
  margin-bottom: 0;
}

.what-watch--radio {
  margin-top: 5px;
}

// New tag INput
.text-right {
  text-align: right;
}
</style>
