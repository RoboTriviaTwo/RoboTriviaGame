
const Quiz = (props) => {
    // console.log(props.quizQuestions)
    // const { questions } = props.quizQuestions;
    // console.log(props);
    // console.log(props.quizQuestions[1].question);
  // let optionsArr = props.quizQuestions[1].incorrect_answers;
  // const correctAn = props.quizQuestions[1].correct_answer;
  // console.log(optionsArr);
  // console.log(correctAn);
    return (
      <div>
        {props.quizQuestions.length !== 0  ?
          <>
            <h2>quiz here</h2>
            <p>Question: {props.quizQuestions[2].question}</p>
            {
              props.quizQuestions[2].allAnswers.map((answerItem, index)=>{
                return(
                  <button key={index}>{answerItem}</button>
                )
              })
            }
           
            
          </>
        :
        null}
      </div>
    );
}

export default Quiz;

