<template lang="pug">
	.content-wrapper
		section
			.container
				.task-list__header
					h1.ui-title-1 Tasks list
					.buttons-list
						.button.button-default.button--round(@click=" filter = 'active' " :class="{ active : filter == 'active' }") Active
						.button.button-default.button--round(@click=" filter = 'completed' " :class="{ active : filter == 'completed' }") Completed
						.button.button-default.button--round(@click=" filter = 'all' " :class="{ active : filter == 'all' }") All
				.task-list
					transition-group(name="taskList" tag="div") 
						.task-item(
							v-for = "task in tasksFilter"
							:key = "task.id"
							:class = "{ completed: task.completed }"
						)
							.ui-card.ui-card--shadow
								.task-item__info
									span.task-item__wrap
										span.ui-label.ui-label--light {{ task.whatWatch }}
										span Total Time: {{ task.time }}
									span.button-close
								.task-item__content
									.task-item__header
										.ui-checkboc-wrapper
											input.ui-checkbox(
												type="checkbox"
												v-model="task.completed"
												@click="taskCompleted(task.id, task.completed)"
											)
										span.ui-title-3 {{ task.title }}
									.task-item__body
										p.ui-text-regular {{ task.description }}
									.task-item__footer
										// All Tags
										.tag-list
											.ui-tag__wrapper(v-for="tag in task.tags")
												.ui-tag
													span.tag-title {{ tag.title }}

</template>

<script>
export default {
	data() {
		return {
			filter: 'active',
			completed: false
		};
	},
	methods: {
		// Completed
		taskCompleted(id, completed) {
			completed ? (completed = false) : (completed = true);
			this.$store.dispatch('completedTask', {
				id,
				completed
			});
		}
	},
	computed: {
		tasksFilter() {
			if (this.filter === 'active') {
				return this.$store.getters.taskNotCompleted;
			} else if (this.filter === 'completed') {
				return this.$store.getters.taskCompleted;
			} else if (this.filter === 'all') {
				return this.$store.getters.tasks;
			}
			return this.filter === 'active';
		},
		taskDestroy() {
			return this.$store.getters.taskDestroy;
		}
		// tasks() {
		//   return this.$store.getters.tasks;
		// }
	}
};
</script>

<style lang="stylus" scoped>
.task-item {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }

  &.completed {
    color: rgba(0, 0, 0, 0.1);
    opacity: 0.7;
    pointer-events: none;

    .ui-card.ui-card--shadow {
      background: rgba(0, 0, 0, 0.07);
    }

    .ui-title-3 {
      color: gray;
      text-decoration: line-through;
    }
  }
}

.ui-label {
  margin-right: 8px;
}

.task-item__info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  .button-close {
    width: 20px;
    height: @width;
  }
}

.task-item__header {
  display: flex;
  align-items: center;

  .ui-checkbox {
    margin-right: 10px;
    margin-bottom: 0;
  }

  .ui-checkbox-wrapper {
    margin-right: 8px;
  }

  .ui-title-3 {
    margin-bottom: 0;
  }
}

.total-time {
  margin: 0 0 10px;
}

.task-list__header {
  display: flex;
  justify-content: space-between;
}

.buttons-list {
  margin-bottom: 30px;
}

.buttons-list .button {
  margin: 0 5px;
}

.buttons-list .button:last-child {
  margin-right: 0;
}

.buttons-list .button.active {
  background: #ccc;
}
</style>
