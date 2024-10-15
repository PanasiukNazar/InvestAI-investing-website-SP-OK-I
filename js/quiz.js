const QUESTIONS = [
    {
        label: 'Как вы принимаете решения по инвестициям?',
        answers: [
            'Доверяю интуиции.',
            'Следую рекомендациям ИИ.',
            'Ориентируюсь на аналитику.',
            'Анализирую долгосрочные прогнозы.',
        ],
    },
    {
        label: 'Какую стратегию покупки акций выбираете?',
        answers: [
            'Часто покупаю акции.',
            'Долгосрочные вложения.',
            'Использую AI для выбора.',
            'Инвестирую небольшие суммы.',
        ],
    },
    {
        label: 'Как оцениваете риск при вложениях?',
        answers: [
            'Готов к высокому риску.',
            'Предпочитаю сбалансированный риск.',
            'Избегаю рисков.',
            'Доверяю ИИ в оценке.',
        ],
    },
    {
        label: 'Какой доход ожидаете от своих инвестиций?',
        answers: [
            'Высокий заработок.',
            'Умеренный доход.',
            'Минимальная прибыль.',
            'Стабильный доход от вложений.',
        ],
    },
];

const $container = document.getElementById('container');

const startStep = {
    render: () => {
        $container.innerHTML = `
        <div class="container quiz-wrapper">
            <div class="row quiz-content">
                <div class="col-lg-6 col-md-6 col-lg-6">
                    <img class="quiz-img" src="img/quiz.jpg">
                </div>
                <div class="col-lg-6 col-md-6 col-lg-6">
                    <h2 class="title">ИнвестИИ</h2>
                    <h3>Eзнай свой уровень знаний и получи доступ к бесплатному курсу по инвестициям</h3>
                    <button class="btn btn-primary w-50 py-3 first-button" data-action="startQuiz">Начать</button>
                </div>
            </div>
        </div>
      `;
    },
    onClick: (el) => {
        if (el.getAttribute('data-action') === 'startQuiz') {
            quiz.nextStep(questionsStep);
        }
    },
};

const questionsStep = {
    questionIndex: 0,
    answers: {},
    render: () => {
        const question = QUESTIONS[questionsStep.questionIndex];

        $container.innerHTML = `
        <div class="container quiz-wrapper">

            <div class="row quiz-content text-center">

                <h3>${question.label}</h3>

                <div class="row answers">
                    ${question.answers
                        .map(
                            (answer, index) =>
                                `
                                <button class="answer col-md-12 col-lg-6 border rounded" data-action="selectAnswer" data-answer-index="${index}">
                                    ${answer}
                                </button>
                            `,
                        )
                        .join('')}
                </div>
            </div>
        </div>
      `;
    },
    onClick: (el) => {
        switch (el.getAttribute('data-action')) {
            case 'goToNextQuestion':
                return questionsStep.goToNextQuestion();
            case 'goToPreviousQuestion':
                return questionsStep.goToPreviousQuestion();
            case 'selectAnswer':
                return questionsStep.selectAnswer(
                    parseInt(el.getAttribute('data-answer-index'), 10),
                );
        }
    },
    goToPreviousQuestion: () => {
        questionsStep.questionIndex -= 1;
        questionsStep.render();
    },
    selectAnswer: (answerIndex) => {
        const question = QUESTIONS[questionsStep.questionIndex];
        const selectedAnswer = question.answers[answerIndex];

        questionsStep.answers = {
            ...questionsStep.answers,
            [question.label]: selectedAnswer,
        };

        if (questionsStep.isFinalQuestion()) {
            questionsStep.completeStep();
        } else {
            questionsStep.goToNextQuestion();
        }
    },
    isFinalQuestion: () => questionsStep.questionIndex === QUESTIONS.length - 1,
    goToNextQuestion: () => {
        questionsStep.questionIndex += 1;
        questionsStep.render();
    },
    completeStep: () => {
        quiz.setAnswers(questionsStep.answers);
        quiz.nextStep(finalStep);
    },
};

const finalStep = {
    render: () => {
        $container.innerHTML = `
        <div class="container quiz-wrapper">
            <div class="row quiz-content">
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <h2 class="title">ИнвестИИ</h2>
                    <h3>Заполни форму узнай чтобы получить свой бесплатный курс по инвестициям!</h3>
                    <form>
                        <input class="form-control" name="name" type="name" placeholder="Имя" required>
                        <input class="form-control" name="email" type="email" placeholder="Email" required>
                        <input class="form-control" name="phone" type="phone" placeholder="Номер" required>
                        
                        ${Object.keys(quiz.answers)
                            .map(
                                (question) =>
                                    `<input name="${question}" value="${quiz.answers[question]}" hidden>`,
                            )
                            .join('')}
                
                        <button data-action="submitAnswers" class="btn btn-primary w-50 py-3">Отправить</button>
                    </form>
                </div>
            </div>
        </div>
      `;
    },
    onClick: (el) => {
        if (el.getAttribute('data-action') === 'submitAnswers') {
            localStorage.setItem('quizDone', true);
            document.getElementById('quiz-page').classList.add('hide');
            window.location.href = 'thanks.html';
        }
    },
};

const quiz = {
    activeStep: startStep,
    answers: {},
    clear: () => ($container.innerHTML = ''),
    init: () => {
        $container.addEventListener('click', (event) =>
            quiz.activeStep.onClick(event.target),
        );
        $container.addEventListener('submit', (event) =>
            event.preventDefault(),
        );
    },
    render: () => {
        quiz.clear();
        quiz.activeStep.render();
    },
    nextStep: (step) => {
        quiz.activeStep = step;
        quiz.render();
    },
    setAnswers: (answers) => (quiz.answers = answers),
};

if (!localStorage.getItem('quizDone')) {
    // document.getElementById('main-page').classList.add('hide');
    quiz.init();
    quiz.render();
}
