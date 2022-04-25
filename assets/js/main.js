'use strict'

document.addEventListener('DOMContentLoaded', () => {
  const btnOpenModal = document.querySelector('#btnOpenModal')
  const formAnswers = document.querySelector('#formAnswers')
  const questionTitle = document.querySelector('#question')
  const modalBlock = document.querySelector('#modalBlock')
  const closeModal = document.querySelector('#closeModal')
  const prevButton = document.querySelector('#prev')
  const nextButton = document.querySelector('#next')
  const sendButton = document.querySelector('#send')

  const questions = [
    {
      question: 'Какого цвета бургер ?',
      answers: [
        {
          title: 'Стандарт',
          url: './assets/images/burger.png'
        },
        {
          title: 'Черный',
          url: './assets/images/burgerBlack.png'
        }
      ],
      type: 'radio'
    },
    {
      question: 'Из какого мяса котлета ?',
      answers: [
        {
          title: 'Курица',
          url: './assets/images/chickenMeat.png'
        },
        {
          title: 'Говядина',
          url: './assets/images/beefMeat.png'
        },
        {
          title: 'Свинина',
          url: './assets/images/porkMeat.png'
        }
      ],
      type: 'radio'
    },
    {
      question: 'Дополнительные ингредиенты ?',
      answers: [
        {
          title: 'Помидор',
          url: './assets/images/tomato.png'
        },
        {
          title: 'Огурец',
          url: './assets/images/cucumber.png'
        },
        {
          title: 'Салат',
          url: './assets/images/salad.png'
        },
        {
          title: 'Лук',
          url: './assets/images/onion.png'
        }
      ],
      type: 'checkbox'
    },
    {
      question: 'Добавить соус ?',
      answers: [
        {
          title: 'Чесночный',
          url: './assets/images/garlicSauce.png'
        },
        {
          title: 'Томатный',
          url: './assets/images/tomatoSauce.png'
        },
        {
          title: 'Горчичный',
          url: './assets/images/mustardSauce.png'
        }
      ],
      type: 'radio'
    }
  ]

  btnOpenModal.addEventListener('click', () => {
    modalBlock.classList.add('d-block')
    playTest()
  })

  closeModal.addEventListener('click', () =>
    modalBlock.classList.remove('d-block')
  )

  const playTest = () => {
    const finalAnswers = []
    let numberQuestion = 0

    const renderAnswers = index => {
      questions[index].answers.forEach(answer => {
        const answerItem = document.createElement('div')
        answerItem.classList.add(
          'answers-item',
          'd-flex',
          'justify-content-center'
        )

        answerItem.innerHTML = `
        <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value='${answer.title}'/>
        <label for="${answer.title}" class="d-flex flex-column justify-content-between" >
          <img class="answerImg" src=${answer.url} alt="burger" />
          <span>${answer.title}</span>
        </label>`

        formAnswers.appendChild(answerItem)
      })
    }

    const renderQuestions = indexQuestion => {
      formAnswers.innerHTML = ' '

      if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
        questionTitle.textContent = `${questions[indexQuestion].question}`
        renderAnswers(indexQuestion)
        nextButton.classList.remove('d-none')
        prevButton.classList.remove('d-none')
        sendButton.classList.add('d-none')
      }

      if (numberQuestion === 0) {
        prevButton.classList.add('d-none')
      }

      if (numberQuestion === questions.length) {
        nextButton.classList.add('d-none')
        prevButton.classList.add('d-none')
        sendButton.classList.remove('d-none')
        questionTitle.innerHTML = ''
        formAnswers.innerHTML = `
        <div class='form-group'>
          <label for='numberPhone'>Введите свой номер</label>
          <input type='phone' class='form-control' id='numberPhone'>
        </div>`
      }

      if (numberQuestion === questions.length + 1) {
        sendButton.classList.add('d-none')
        formAnswers.textContent = 'Спасибо за пройденный тест !'
        setTimeout(() => modalBlock.classList.remove('d-block'), 2000)
      }
    }
    renderQuestions(numberQuestion)

    const checkAnswer = () => {
      const obj = {}

      const inputs = [...formAnswers.elements].filter(input => input.checked || input.id === 'numberPhone')

      inputs.forEach(input => {
        if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
          obj[`${questions[numberQuestion].question}`] = input.value
        }

        if (numberQuestion === questions.length) {
          obj['Номер телефона'] = input.value
        }
      })

      finalAnswers.push(obj)
    }

    prevButton.onclick = () => {
      numberQuestion--
      renderQuestions(numberQuestion)
    }

    nextButton.onclick = () => {
      checkAnswer()
      numberQuestion++
      renderQuestions(numberQuestion)
    }

    sendButton.onclick = () => {
      checkAnswer()
      numberQuestion++
      renderQuestions(numberQuestion)
      console.log(finalAnswers)
    }
  }
})
