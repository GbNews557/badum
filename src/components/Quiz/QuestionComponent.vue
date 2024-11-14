<template>
  <div>
    <div v-for="(question, qIndex) in quizData" :key="qIndex" class="quiz-item">
      <h2>{{ question.question }}</h2>
      <ul class="options-list">
        <li
          v-for="(answer, index) in question.answers"
          :key="index"
          :class="{
            selected: selectedOptions[qIndex] === index,
            'user-selected': selectedOptions[qIndex] === index,
            correct: checkAnswer && question.correct_answer === index,
            incorrect:
              checkAnswer && selectedOptions[qIndex] === index && question.correct_answer !== index
          }"
          @click="selectOption(qIndex, index)"
        >
          <span class="option-label">{{ String.fromCharCode(97 + index) }}</span> {{ answer }}
        </li>
      </ul>
    </div>
    <button @click="checkAnswers" :disabled="checkAnswer.value">{{ buttonLabel }}</button>
    <button v-if="showResult" @click="resetQuiz">Limpar Quiz</button>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'QuizComponent',
  props: {
    quizData: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const selectedOptions = ref(Array(props.quizData.length).fill(null))
    const checkAnswer = ref(false)
    const showResult = ref(false)

    const selectOption = (qIndex, index) => {
      if (!checkAnswer.value) {
        selectedOptions.value[qIndex] = index
      }
    }

    const checkAnswers = () => {
      checkAnswer.value = true
      showResult.value = true
    }

    const resetQuiz = () => {
      selectedOptions.value = Array(props.quizData.length).fill(null)
      checkAnswer.value = false
      showResult.value = false
    }

    const totalQuestions = props.quizData.length
    const correctAnswers = computed(() => {
      return selectedOptions.value.filter((selected, qIndex) => {
        return selected === props.quizData[qIndex].correct_answer
      }).length
    })

    const buttonLabel = computed(() => {
      return checkAnswer.value
        ? `Verificar Respostas (${correctAnswers.value}/${totalQuestions})`
        : 'Ver Respostas'
    })

    const resultText = computed(() => {
      return `Você acertou ${correctAnswers.value}/${totalQuestions} questões!`
    })

    return {
      selectedOptions,
      checkAnswer,
      showResult,
      selectOption,
      checkAnswers,
      resetQuiz,
      buttonLabel,
      resultText
    }
  }
})
</script>

<style>
@import '../../assets/base.css';
.quiz-item {
  margin-bottom: 20px;
}

.options-list {
  list-style-type: none;
  padding: 0;
}

.options-list li {
  cursor: pointer;
  padding: 10px;
  margin: 5px 0;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
}

.options-list li.selected {
  background-color: #cfe2ff;
}

.options-list li.user-selected {
  background-color: #cfe2ff;
}

.options-list li.correct {
  background-color: #d4edda;
}

.options-list li.incorrect {
  background-color: #f8d7da;
}

.option-label {
  display: inline-block;
  width: 30px;
  color: var(--black);
  background-color: var(--secondary-color);
  border-radius: 50%;
  text-align: center;
  line-height: 30px;
  margin-right: 10px;
}

button {
  margin-top: 20px;
  margin-right: 10px;
  padding: 10px 20px;
  cursor: pointer;
  background-color: var(--tertiary-color);
  color: white;
  border: none;
  border-radius: 4px;
}

button:hover {
  background-color: #218838;
}

button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

p {
  margin-top: 20px;
  font-weight: bold;
}

h2 {
  font-size: 1.2em;
  margin-bottom: 10px;
}
</style>
