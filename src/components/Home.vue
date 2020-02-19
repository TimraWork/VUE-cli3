<template lang="pug">
	.content-wrapper
		section
			.container
				h1.ui-title-1 Home
				form(@submit.prevent="onSubmit")
					.form__item(:class="{ 'form__item--error': $v.taskTitle.$error }")
						input(
							type = "text"
							placeholder = "What we will watch?"
							v-model = "taskTitle"
							@change="$v.taskTitle.$touch()"
						)
						.error(v-if="!$v.taskTitle.required") Input is required
					.form__item
						textarea(
							placeholder = "What we will watch?"
							v-model = "taskDescription"
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
					transition(name="fade")
						.tag-list.tag-list--menu(v-if="tagMenuShow")
							input.tag-add--input(type="text" placeholder="New tag" v-model="tagTitle" @keyup.enter="newTag")
							.button.button-default(@click="newTag") Send

					// All Tags
					.tag-list
						transition-group( name="ui-tag__wrapper"  tag="div" enter-active-class="animated fadeIn")
							.ui-tag__wrapper(v-for="tag in tags" :key="tag.title" )
								.ui-tag( @click = "addTagUsed(tag)" :class="{ active: tag.use}")
									span.tag-title {{ tag.title }}
									span.button-close

					//- p {{  tagsUsed }}

					.text-right
						button.button.button--round.button-primary(type="submit" :disabled="submitStatus === 'PENDING'") Send
						p.typo__p(v-if="submitStatus === 'OK'") Thanks for your submission!
						p.typo__p.typo__p--error(v-if="submitStatus === 'ERROR'") Please fill the form correctly.
						p.typo__p.typo__p--send(v-if="submitStatus === 'PENDING'") Sending...
		

</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      taskTitle: "",
      taskDescription: "",
      whatWatch: "Film",

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

      submitStatus: null
    };
  },
  validations: {
    taskTitle: {
      required
    }
  },
  methods: {
    //  Submit New Task
    onSubmit() {
      this.$v.$touch();
      console.log("this.$v =", this.$v);

      if (this.$v.$invalid) {
        console.log("ERROR");
        this.submitStatus = "ERROR";
      } else {
        console.log("SEND!");
        // do your submit logic here
        this.submitStatus = "PENDING";
        setTimeout(() => {
          this.submitStatus = "OK";
        }, 500);
      }

      let time;
      if (!this.taskTitle) return;
      if (this.whatWatch === "Film") {
        time = this.filmTime;
      } else {
        time = this.serialTime;
      }

      //   this.tasks.push({
      const task = {
        title: this.taskTitle,
        description: this.taskDescription,
        whatWatch: this.whatWatch,
        time,
        tags: this.tagsUsed,
        completed: false,
        editing: false
      };
      this.$store.dispatch("newTask", task);
      console.log(task);

      // Reset for task
      this.taskTitle = "";
      this.taskDescription = "";
      // Reset $v (validate)
      this.$v.$reset();

      // Reset for Tags
      this.tagMenuShow = false;
      this.tagsUsed = [];
      this.tagTitle = "";

      for (let i = 0; i < this.tags.length; i++) {
        this.tags[i].use = false;
      }
      console.log("newTask");
    },
    newTag() {
      if (this.tagTitle === "") {
        return;
      }
      //   this.tasks.push({
      const tag = {
        title: this.tagTitle,
        use: false
      };

      this.$store.dispatch("newTag", tag); // В dispatch мы отправим новый метод newTag и отпавим туда константу tag

      // Reset
      this.tagTitle = "";
      console.log("newTag");
    },
    // tagMenuShow() {},
    addTagUsed(tag) {
      tag.use = !tag.use;
      if (tag.use) {
        this.tagsUsed.push({
          title: tag.title
        });
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
    tags() {
      return this.$store.getters.tags;
      console.log("tags()");
    },
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

<style lang="stylus">
// Animaton for Tasks
.taskList-enter-active, .taskList-leave-active {
  transition: all 0.6s;
}

.taskList-enter, .taskList-leave-to { /* .fade-leave-active до версии 2.1.8 */
  opacity: 0;
  transform: translateY(10px);
}

// Animaton for Tags menu
.fade-enter-active, .fade-leave-active {
  transition: all 0.8s ease-in-out;
}

.fade-enter, .fade-leave-to { /* .fade-leave-active до версии 2.1.8 */
  opacity: 0;
}
</style>

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
  padding-bottom: 30px;
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

// // Animate.css
.animated {
  animation-duration: 1s;
}

// Animation for Tasks
// Active
.taskList-enter-active, .taskList-leave-active {
  transition: all 0.6s;
}

// Enter
.taskList-enter, .taskList-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

// Animation for Tags menu
// Active
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}

// Enter
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.fadeInLeft {
  -webkit-animation-name: fadeInLeft;
  animation-name: fadeInLeft;
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.fadeInRight {
  -webkit-animation-name: fadeInRight;
  animation-name: fadeInRight;
}

@keyframes fadeOutDown {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }
}

.fadeOutDown {
  -webkit-animation-name: fadeOutDown;
  animation-name: fadeOutDown;
}

.tag-list .button {
  margin-left: 30px;
  border-radius: 5px;
}
</style>
