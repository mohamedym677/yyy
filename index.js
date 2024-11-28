
const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info')
const exitBut = document.querySelector('.exit-but')
const main = document.querySelector('.main');
const continueBut = document.querySelector('.continue-but');
const quizSection = document.querySelector('.quiz-section')
const quizBox = document.querySelector('.quiz-box')
const resultBox = document.querySelector('.result-box')
const tryAgainBtn = document.querySelector('.tryAgain-btn')

const goHomeBtn = document.querySelector('.goHome-btn')




startBtn.onclick = function () {
    popupInfo.classList.add('active')
    main.classList.add('active')
}
exitBut.onclick = function () {
    popupInfo.classList.remove('active')
    main.classList.remove('active')
}
continueBut.onclick = function () {
    quizSection.classList.add('active')
    popupInfo.classList.remove('active')
    main.classList.remove('active')
    quizBox.classList.add('active')
    showQuestions(0)
    quizSectionCounter(1)
    headrScore()
}
// tryAgainBtn.onclick = function () {
//     quizBox.classList.add('active')

//     nextBtn.classList.remove('active')
//     tryAgainBtn.classList.remove('active')


//     questionCount = 0;
//     questionnumer = 1;
//     userScore = 0;

//     showQuestions(questionCount)
//     quizSectionCounter(questionnumer)

//     resultBox.classList.add('nore')
//     headrScore();

// }

tryAgainBtn.onclick = function () {
    // إعادة تفعيل العناصر
    quizBox.classList.add('active');
    nextBtn.classList.add('active');
    tryAgainBtn.classList.add('active');

    // إعادة تعيين القيم
    questionCount = 0;
    questionnumer = 1;
    userScore = 0;

    showQuestions(questionCount); // عرض أول سؤال
    quizSectionCounter(questionnumer); // تحديث العد

    resultBox.classList.remove('active'); // إخفاء النتيجة
    // resultBox.classList.remove('nore'); // التأكد من إزالة الفئة التي تخفي النتيجة
    headrScore(); // تحديث النتيجة في الهيدر
}

goHomeBtn.onclick = function () {
    quizSection.classList.remove('active'); 
    nextBtn.classList.remove('active'); 
    resultBox.classList.remove('active'); 
    // إعادة تعيين القيم
    questionCount = 0;
    questionnumer = 1;
    userScore = 0;

    showQuestions(questionCount); // عرض أول سؤال
    quizSectionCounter(questionnumer); // تحديث العد

}


let questionCount = 0;
let questionnumer = 1;
let userScore = 0;

const nextBtn = document.querySelector('.next-btn')

nextBtn.onclick = function () {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount)

        questionnumer++;
        quizSectionCounter(questionnumer)

        nextBtn.classList.remove('active')
    } else {
        showResultBox();
    }
}

const optionList = document.querySelector('.option-list')


function showQuestions(index) {
    const questionText = document.querySelector('.question-text')
    questionText.textContent = `${questions[index].numb}${questions[index].question}`

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
        <div class="option"><span>${questions[index].options[1]}</span></div>
        <div class="option"><span>${questions[index].options[2]}</span></div>
        <div class="option"><span>${questions[index].options[3]}</span></div>`;

    optionList.innerHTML = optionTag;


    const option = document.querySelectorAll('.option')

    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}

function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;
    if (userAnswer == correctAnswer) {
        answer.classList.add('correct')
        userScore += 1;
        headrScore()
    }
    else {
        answer.classList.add('incorrect')
        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent == correctAnswer) {
                optionList.children[i].setAttribute('class', 'option correct');
            }
        }
    }

    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disablad')
    }
    nextBtn.classList.add('active')
}

function quizSectionCounter(index) {
    const questionTotal = document.querySelector('.question-total')

    questionTotal.textContent = `${index} of ${questions.length} Questions`
}

function headrScore() {
    const headrScoreText = document.querySelector('.header-score');
    headrScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}
function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text')
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`

    const circularProgress = document.querySelector('.circular-progress')
    const Progressvalue = document.querySelector('.progress-value');
    let ProgressStartvalue = -1;
    let ProgressEndvalue = (userScore / questions.length) * 100;
    let speed = 20;


    let progress = setInterval(() => {
        if (ProgressStartvalue < ProgressEndvalue) {
            ProgressStartvalue++; // زيادة القيمة تدريجيا

            circularProgress.style.background = `conic-gradient(#c40094 ${ProgressStartvalue * 3.6}deg, rgba(255, 255, 255, 0.1) 0deg)`;

            Progressvalue.textContent = `${Math.round(ProgressStartvalue)}%`; // عرض النسبة بشكل صحيح
        } else {
            clearInterval(progress); // توقف عند الوصول للنهاية
        }
    }, speed);
}


    // let progress = setInterval(() => {
    //     ProgressStartvalue++;
        
    //     Progressvalue.textContent = `${ProgressStartvalue}%`;
    //     circularProgress.style.background = `conic-gradient(#c40094 ${ProgressStartvalue * 3.6} deg, rgba(255, 255, 255, .
    //     1) 0deg)`;
    //     if (ProgressStartvalue >= ProgressEndvalue) {


    //         clearInterval(progress)
    //     }
    // }, speed);