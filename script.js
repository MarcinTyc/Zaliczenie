const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'W którym roku był 1 rozbiór Polski?',
    answers: [
      { text: '1772', correct: true },
      { text: '1773', correct: false },
      { text: '1656', correct: false }
    ]
  },
  {
    question: 'Kiedy była bitwa pod grunwaldem?',
    answers: [
      { text: '1410', correct: true },
      { text: '1615', correct: false },
      { text: '1256', correct: false },
      { text: '1492', correct: false }
    ]
  },
  {
    question: 'Kto był ostatnim królem Polski?',
    answers: [
      { text: 'Stanisław August Poniatowski', correct: true },
      { text: 'Zygmunt III Waza', correct: false },
      { text: 'Władysław Łokietek', correct: false },
      { text: 'Nie wiem', correct: false }
    ]
  },
  {
    question: 'Kto odkrył Amerykę',
    answers: [
      { text: 'Krzysztof Kolumb', correct: true },
      { text: 'Vasco da Gama', correct: true },
      { text: 'Neil Armstrong', correct: true }
    ]
  }
]