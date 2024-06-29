<template>
  <div class="multiple-choice-question">
    <p>{{ text }}</p>
    <div class="code-container" v-if="code">
      <ShikiRenderer :code="code" language="cpp"/>
    </div>
    <div v-for="(option, index) in options" :key="index" class="option">
      <label>
        <div class="option-label">
          <input type="checkbox" :value="option" v-model="selectedOptions"/>
          <ShikiRenderer :code="option" language="text"/>
        </div>
      </label>
    </div>
    <button class="custom-button" @click="submitAnswer">提交</button>
    <div v-if="showFeedback">
      <p v-if="isCorrect">回答正确</p>
      <p v-else>回答错误，正确答案是：{{ answers.join(', ') }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
      questions: {
          type: Array,
          required: true
      },
  },
  data() {
    return {
      selectedQuestion: undefined,
      queuedQuestions: [],
      selectedOptions: [],
      showFeedback: false,
      isCorrect: false,
    };
  },
  computed: {
    text() {
      this.initQuestion();
      return this.selectedQuestion.text;
    },
    code() {
      this.initQuestion();
      return this.selectedQuestion.code;
    },
    options() {
      this.initQuestion();
      return this.selectedQuestion.options;
    },
    answers() {
      this.initQuestion();
      return this.selectedQuestion.answers;
    }
  },
  methods: {
    clearAndNext() {
      this.selectedOptions = [];
      this.showFeedback = false;

      this.queuedQuestions = this.queuedQuestions.filter(q => q != this.selectedQuestion);
      if(this.queuedQuestions.length === 0) {
        this.queuedQuestions = this.questions.slice(0);
        this.queuedQuestions = this.queuedQuestions.sort(() => Math.random() - 0.5);
      }

      this.selectedQuestion = this.queuedQuestions[0];

      if(this.selectedQuestion.shuffleOptions ?? true)
        this.selectedQuestion.options = this.selectedQuestion.options.sort(() => Math.random() - 0.5);
    },
    initQuestion() {
      if(this.selectedQuestion === undefined) {
        this.clearAndNext();
      }
    },
    submitAnswer() {
      this.showFeedback = true;
      this.isCorrect = this.selectedOptions.length === this.answers.length && this.selectedOptions.every(option => this.answers.includes(option));

      if(this.isCorrect) {
        setTimeout(() => {this.clearAndNext();}, 1000);
      }
    }
  }
};
</script>

<style scoped>
.multiple-choice-question {
  margin: 20px;
}
.option {
  margin: 10px 0;
}

.option input {
  padding: 0%;
  margin: 0rem 1rem;
}

.custom-button {
  height: 2.5rem;
  margin: 0.25rem 0.5rem;
  padding: 0 1.75rem;
  border-radius: 0.5rem;
  border: 1px solid var(--theme-color);
  display: inline;

  background-color: var(--bg-color-secondary);
  color: var(--theme-color);

  font-size: 1rem;
  font-weight: 500;
  line-height: 2.5;
  text-decoration: none !important;
}

.custom-button:hover{
  cursor: pointer;
  box-shadow: 1px 1px 4px 2px var(--card-shadow);
}
</style>