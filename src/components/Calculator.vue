<template lang="pug">
	.content-wrapper
		section
			.calc
				h1.ui-title-1 Calculator
				input.calc__input(type="text" v-model="result" placeholder="0" @keyup.enter="onResult()")
				.calc__container
					button.calc__button(v-for="num in nums" @click='onShowInInput(num)') {{num}}
					button.calc__operation(v-for="operation in operations" @click='onShowInInput(operation)') {{operation}}
					button.calc__reset(@click='onReset()') RESET
					button.calc__result(@click='onResult()') =
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      result: "",
      nums: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      operations: ["+", "-", "*", "/"]
    };
  },
  methods: {
    //  Submit New Task
    onShowInInput(operation) {
      //   console.log("onOperantion =", operation);
      this.result = this.result.toString();
      this.result += operation;
    },
    onReset() {
      this.result = "";
    },
    onResult() {
      this.result = eval(this.result);
    }
  },
  computed: {
    tags() {}
  }
};
</script>

<style lang="stylus">
.calc {
  max-width: 300px;
  margin: 0 auto;

  button {
    transition: all 0.3s ease-in-out;
  }

  &__result {
    color: white;
    border: 1px solid transparent;
    background: black;
    width: 100%;
    height: 60px;

    &:hover {
      background-color: #122027;
    }
  }

  &__operation {
    color: white;
    border: 1px solid transparent;
    background: orange;
    width: 33.33333333%;
    height: 60px;

    &:hover {
      background-color: #122027;
    }
  }

  &__reset {
    color: white;
    border: 1px solid transparent;
    background: red;
    width: 33.33333333%;
    height: 60px;

    &:hover {
      background-color: #122027;
    }
  }

  &__button {
    color: white;
    border: 1px solid transparent;
    background: transparent;
    width: 33.33333333%;
    height: 60px;

    &:hover {
      background-color: #122027;
    }
  }

  &__container {
    display: flex;
    flex-wrap: wrap;
    background: #263238;
  }
}
</style>
