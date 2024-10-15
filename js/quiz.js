const QUESTIONS = [
    {
        label: 'Какие криптовалюты вас интересуют и почему?',
        answers: [
            'Биткоин, так как он является самой популярной криптовалютой и имеет высокую ликвидность.',
            'Эфириум, благодаря его возможностям для создания смарт-контрактов.',
            'Лайткоин, из-за его более быстрых транзакций и низких комиссий.',
            'Риппл, поскольку он активно используется в банковском секторе для международных переводов.',
        ],
    },
    {
        label: 'Какими видами трейдинга вы занимались ранее?',
        answers: [
            'Дневной трейдинг на фондовом рынке.',
            'Торговля фьючерсами и опционами.',
            'Алготрейдинг с использованием автоматических торговых систем.',
            'Спекуляции на рынке форекс.',
        ],
    },
    {
        label: 'Каковы ваши текущие доходы от инвестиций?',
        answers: [
            'Мой текущий доход от инвестиций составляет около 10% годовых.',
            'Я получаю дивиденды от акций в размере 5% годовых.',
            'Мои доходы варьируются в зависимости от волатильности криптовалютного рынка.',
            'За последний год мои инвестиции принесли около 15% прибыли.',
        ],
    },
    {
        label: 'Как вы оцениваете риски, связанные с криптовалютами?',
        answers: [
            'Я считаю, что риски высоки из-за волатильности и неопределённости рынка.',
            'Риски умеренные, если использовать правильные стратегии и проводить тщательный анализ.',
            'Риски высокие, но они оправданы потенциально высокой прибылью.',
            'Я оцениваю риски как приемлемые при условии диверсификации портфеля.',
        ],
    },
    {
        label: 'Какие стратегии инвестиций вы предпочитаете?',
        answers: [
            'Долгосрочные вложения в акции крупных компаний.',
            'Диверсификация портфеля между различными активами.',
            'Инвестирование в стартапы и новые технологии.',
            'Регулярное реинвестирование полученных доходов.',
        ],
    },
    {
        label: 'Какие платформы для трейдинга вы используете?',
        answers: [
            'MetaTrader 4 для форекс-трейдинга.',
            'Binance для торговли криптовалютами.',
            'Interactive Brokers для торговли акциями и опционами.',
            'TD Ameritrade для дневного трейдинга.',
        ],
    },
    {
        label: 'Каковы ваши ожидания от инвестиций в криптовалюты?',
        answers: [
            'Увеличение капитала на долгосрочную перспективу.',
            'Получение пассивного дохода через стейкинг криптовалют.',
            'Высокая доходность благодаря волатильности рынка.',
            'Диверсификация инвестиционного портфеля.',
        ],
    },
    {
        label: 'Как вы оцениваете свою финансовую грамотность?',
        answers: [
            'Я считаю, что у меня высокий уровень финансовой грамотности.',
            'Моя финансовая грамотность на среднем уровне, но я постоянно учусь.',
            'Мне нужно больше знаний и опыта в финансовой сфере.',
            'Я только начинаю разбираться в финансовых вопросах.',
        ],
    },
    {
        label: 'Какими источниками информации о финансовых рынках вы пользуетесь?',
        answers: [
            'Читаю специализированные финансовые журналы и книги.',
            'Следую за аналитиками и экспертами в социальных сетях.',
            'Посещаю вебинары и курсы по трейдингу и инвестициям.',
            'Использую аналитические платформы и инструменты для анализа рынка.',
        ],
    },
    {
        label: 'Какие инвестиционные инструменты вам наиболее интересны?',
        answers: [
            'Акции крупных технологических компаний.',
            'Криптовалюты и токены новых проектов.',
            'Инвестиционные фонды и ETF.',
            'Недвижимость для долгосрочных инвестиций.',
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
                    <h3>Заполни форму для получения БЕСПЛАТНЫХ Топ-5 эффективных стратегий в криптотрейдинге</h3>
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
