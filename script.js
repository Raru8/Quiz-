let width = 0
let counter = 0
let object = []
let score = 0
let bar = document.querySelector('.bar')
let timer = document.querySelector('.timer')
let category = document.querySelector('.category')
let questions = document.querySelector('.questions')
let response = document.querySelectorAll('.response')
let punctuation = document.querySelector('.punctuation')
let label = document.querySelectorAll('.response label span')
let custom_radio = document.querySelectorAll('.custom-radio')
let input = document.querySelectorAll('.response label input')
let quiz_container = document.querySelector('.quiz-container')
let restart_button = document.querySelector('.points-container button')
let points_container = document.querySelector('.points-container')

function randomCompare() {
    return Math.random() - 0.5
}

fetch('https://the-trivia-api.com/api/questions?limit=6&difficulty=easy')
    .then((response) => response.json())
    .then((data) => {
        for (let i = 0; i < data.length; i++) {
            object.push({
                category: data[i].category,
                question: data[i].question,
                answers: data[i].incorrectAnswers,
                right_answer: data[i].correctAnswer
            })
        }
        updateQuestion()
    })

function updateQuestion() {
    console.log(counter)
    if (counter < 5) {
        category.innerHTML = object[counter].category
        questions.innerHTML = object[counter].question

        let allAnswers = object[counter].answers.concat(object[counter].right_answer)
        allAnswers.sort(randomCompare)

        label.forEach((element, index) => {
            element.innerHTML = allAnswers[index]
            input[index].values = allAnswers[index]
            response[index].classList.remove('answers')
            response[index].classList.remove('correct-answers')
            response[index].classList.remove('incorrect-answers')
            custom_radio[index].classList.remove('correct-answers-radio')
            custom_radio[index].classList.remove('incorrect-answers-radio')
        })
    } else {
        quiz_container.style.display = 'none'
        points_container.style.display = 'flex'
    }
}

let aux;
for (let i = 0; i < input.length; i++) {
    aux = i
    input[i].addEventListener('click', () => {
        CheckAnswers(input[i].values, object[counter].right_answer, i)
        input[i].values = ''
    })
}

restart_button.addEventListener('click', () => {
    location.reload()
})

function CheckAnswers(answers, right_answer, index) {
    if (answers == right_answer) {
        counter++
        width += 20
        punctuation.innerHTML = score += 2
        bar.style.width = `${width}%`
        response[index].classList.add('answers')
        response[index].classList.add('correct-answers')
        custom_radio[index].classList.add('correct-answers-radio')
        setTimeout(() => {
            updateQuestion()
            input[index].checked = false
            timer.innerHTML = 10
        }, 1000)
    }
    else {
        counter++
        width += 20
        bar.style.width = `${width}%`
        response[index].classList.add('answers')
        response[index].classList.add('incorrect-answers')
        custom_radio[index].classList.add('incorrect-answers-radio')
        setTimeout(() => {
            updateQuestion()
            input[index].checked = false
            timer.innerHTML = 10
        }, 1000)
    }
}

function timerQuiz() {
    timer.innerHTML -= 1
    if (timer.innerHTML == 0) {
        timer.innerHTML = 10
        CheckAnswers(object[counter].right_answer, object[counter].right_answer, aux)
        input[aux].checked = true
    }
}
setInterval(() => {
    if (counter < 5) {
        timerQuiz()
    }
}, 1000) 