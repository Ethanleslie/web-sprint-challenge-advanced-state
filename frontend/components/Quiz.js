import React, {useEffect} from 'react'
import { setSelectedAnswer } from '../state/action-creators'
import { connect } from 'react-redux'
import * as actions from '../state/action-creators'

export function Quiz(props) {
  useEffect(() => {
    if(props.quiz === null){
      props.fetchQuiz()
    }else {
      
    }
      
    
  }, [])
  
  
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        props.quiz !== null ? (
          <>
            <h2>{props.quiz.question}</h2>

            <div id="quizAnswers">
              <div className={`answer ${props.quiz.answers[0].answer_id === props.selectedAnswer ? 'selected' : '' }`}>
                {props.quiz.answers[0].text}
                <button onClick={() => props.setSelectedAnswer(props.quiz.answers[0].answer_id)}>
                  
                   {props.quiz.answers[0].answer_id === props.selectedAnswer ? 'SELECTED' : 'SELECT'} 
                </button>
              </div>

              <div className={`answer ${props.quiz.answers[1].answer_id === props.selectedAnswer ? 'selected' : '' }`}>
                {props.quiz.answers[1].text}
                <button onClick={() => props.setSelectedAnswer(props.quiz.answers[1].answer_id)}>
                  {props.quiz.answers[1].answer_id === props.selectedAnswer ? 'SELECTED' : 'SELECT' }
                </button>
              </div>
            </div>

            <button disabled={!props.selectedAnswer} id="submitAnswerBtn" onClick={() => props.postQuiz(props.quiz, props.selectedAnswer)}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}


const mapStateToProps = state => {
  
  return{
    selectedAnswer: state.selectedAnswer,
    quiz: state.quiz,
    question: state.question,
    answer: state.answer,
    falseAnswer: state.answer,
  }
}

export default connect(mapStateToProps, {fetchQuiz: actions.fetchQuiz, postQuiz: actions.postQuiz, setSelectedAnswer,})(Quiz)