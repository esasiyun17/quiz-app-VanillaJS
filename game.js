const question = document.querySelector(".questions");
const chioces = document.querySelectorAll(".choice-text");
const guess = document.querySelector(".choice-contain");
const reset = document.querySelector(".reset");
const score = document.querySelector(".score");
const start = document.querySelector('.start');
const questionsLeft = document.querySelector('.questions-left');

//res.question.replaceAll(/%../g, " ")
//question.innerText = results[0].question.replaceAll(/%../g, " ")

fetch(
  "https://opentdb.com/api.php?amount=10&category=28&difficulty=easy&type=multiple&encode=url3986"
)
  .then((res) => {
    return res.json();
  })
  .then((loadQuestion) => {
    return loadQuestion.results.map((res) => {
      return res;
    });
  })
  .then((res) => {
    console.log(res);
    let i = 0;
    let questions;
    let correctAnswer;
    let incorretAnswers;
    let questionCount= 1;

    let getQuestion = (i) => {
      questions = res[i].question.replaceAll(/%../g, " ");
      correctAnswer = res[i].correct_answer.replaceAll(/%../g, " ");
      incorretAnswers = res[i].incorrect_answers;
      question.innerText = questions;

      let num = [0, 1, 2, 3];
      let correctNum = num.splice(num[Math.floor(Math.random() * 3)], 1);

      chioces[correctNum].innerText = correctAnswer;
      chioces[num[0]].innerText = incorretAnswers[0];
      chioces[num[1]].innerText = incorretAnswers[1];
      chioces[num[2]].innerText = incorretAnswers[2];
    };

    start.addEventListener('click',()=>{
      getQuestion(i)
    });
    

    let scoreCount = 0;

    guess.addEventListener("click", (e) => {
       
      
      questionsLeft.innerHTML = `${questionCount}/ in 10 questions`;
      questionCount++;

      if(questionCount === 12){
        alert('PLEASE RESET THE GAME !')
        questionsLeft.innerHTML = ''
        questionCount = 0;

      }
      
      if (e.target.children[1].innerText === correctAnswer) {
        scoreCount++;
        alert("You correct");
        score.innerHTML = `Your score : 10/ ${scoreCount}`;
      } else {
        alert("Upps!");
      }
      getQuestion((i += 1));
    });

    reset.addEventListener("click", () => {
      location.reload();
    });
  })
  .catch((err) => console.log(err));
