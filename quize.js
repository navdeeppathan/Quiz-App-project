const questions=[
    {
        question:"which is the largest animal in the world?",
        answers:[
            {text: "shark", correct:"false"},
            {text: "blue whale", correct:"true"},
            {text: "tiger", correct:"false"},
            {text: "elephant", correct:"false"},
            
        ]
    },
    {
        question:"which is the largest desert in the world?",
        answers:[
            {text: "Kalahari", correct:"false"},
            {text: "Gobi", correct:"false"},
            {text: "Sahara", correct:"false"},
            {text: "Antartica", correct:"true"},
            
        ]
    },
    {
        question:"which is the smallest country in the world?",
        answers:[
            {text: "Vatican city", correct:"true"},
            {text: "Bhutan", correct:"false"},
            {text: "Nepal", correct:"false"},
            {text: "Shrilanka", correct:"false"},
            
        ]
    },
    {
        question:"which is the smallest continent in the world?",
        answers:[
            {text: "Asia", correct:"false"},
            {text: "Australia", correct:"true"},
            {text: "Arctic", correct:"false"},
            {text: "Africa", correct:"false"},
            
        ]
    }

    
];

const questionElement=document.getElementById("question");
const answerButton=document.getElementById("answer-button");
const nextBtn=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuize(){
    resetState();
    currentQuestionIndex=0;
    score=0;
    nextBtn.innerHTML="Next";
    showQuestion();

}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo =currentQuestionIndex+1;
    questionElement.innerHTML=questionNo + ". " + currentQuestion.question;
    
    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener('click',selectAns);
    })
}

function resetState(){
    nextBtn.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }

}

function selectAns(e){
    const selectBtn=e.target;
    const isCorrect=selectBtn.dataset.correct==="true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled="true";
    })
    nextBtn.style.display="block";
}

function showScore(){
   resetState();
    questionElement.innerHTML=`you scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML="Play Again";
    nextBtn.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextBtn.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuize();
    }
});
startQuize();
