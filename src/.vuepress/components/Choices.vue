<template>
    <div class="multiple-choice-question">
      <p>{{ text }}</p>
      <div class="language-container" v-if="code">
        <ShikiRenderer :code="code" language="cpp"/>
      </div>
      <div v-for="(option, index) in options" :key="index" class="option">
        <label>
          <input
            type="checkbox"
            :value="option"
            v-model="selectedOptions"
          />
          {{ option }}
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
      initQuestion() {
        if(this.selectedQuestion === undefined) {
          this.selectedQuestion = this.questions[Math.floor(Math.random() * this.questions.length)];
          this.selectedQuestion.options = this.selectedQuestion.options.sort(() => Math.random() - 0.5);
        }
      },
      submitAnswer() {
        this.showFeedback = true;
        this.isCorrect = this.selectedOptions.length === this.answers.length && this.selectedOptions.every(option => this.answers.includes(option));
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

.language-container {
  position: relative;
  border-radius: 6px;
  font-size: 16px;
}
</style>