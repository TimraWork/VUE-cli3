<template lang="pug">
	.content-wrapper
		section
			.container
				h1.ui-title-1 Tasks list
				.task-list
					.task-item(
						v-for = "task in tasks"
						:key = "task.id"
						:class = "{ competed: task.completed }"
					)
						.ui-card.ui-card--shadow
							.task-item__info
								span.ui-label.ui-label--light {{ task.whatWatch }}
								span Total Time: 
								span.button-close
							.task-item__content
								.task-item__header
									.ui-checkboc-wrapper
										input.ui-checkbox(
											type="checkbox"
											v-model="task.competed"
										)
									span.ui-title-3 {{ task.title }}
								.task-item__body
									p.ui-text-regular {{ task.description }}

</template>

<script>
export default {
  data() {
    return {
      tasks: [
        {
          id: 1,
          title: "GrowthBuster: Hooked on Growth",
          description:
            "I directed this documentary challengie directed this documentary challengie",
          whatWatch: "Film",
          comleted: false,
          editing: false
        },
        {
          id: 2,
          title: "Game of thrones",
          description:
            "Best serials Bes directed this documentary challengie  t serialsBest serials Best serials Best serialsBest serials",
          whatWatch: "Serial",
          comleted: false,
          editing: false
        }
      ]
    };
  }
};
</script>

<style lang="stylus" scoped>
.task-item {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
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
</style>
