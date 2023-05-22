import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER, SET_INFO_MESSAGE, INPUT_CHANGE, RESET_FORM} from "./action-types"
import axios from 'axios'

// ❗ You don't need to add extra action creators to achieve MVP


export const moveClockwise = () => {
  return({type: MOVE_CLOCKWISE})
}

export const moveCounterClockwise = () => {
  return({type: MOVE_COUNTERCLOCKWISE})
}

export const setQuizIntoState = (quiz) => {
    const payload = quiz
  return({type: SET_QUIZ_INTO_STATE, payload})
}

export const setSelectedAnswer = (id) => {
  return({type: SET_SELECTED_ANSWER, payload:id})
}

export const setInfoMessage = (message) => {
    const payload = message
  return({type: SET_INFO_MESSAGE, payload})
}

export const inputChange = (name, value) => {
  return({type: INPUT_CHANGE, payload: {name, value}})
}

export const resetForm = () => {
  return({type: RESET_FORM})
}


// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    dispatch(resetForm)
    axios.get(`http://localhost:9000/api/quiz/next`) 
      .then(res => {
        console.log(res.data)
        dispatch(setQuizIntoState(res.data))
      })
  }
}
export function postAnswer(form) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    
    axios.post(`http://localhost:9000/api/quiz/new`  , {
      "question_text": form.newQuestion, "true_answer_text": form.newTrueAnswer, "false_answer_text":  form.newFalseAnswer
    })
    .then(res => {
      console.log(res.data)
    
    dispatch(resetForm())
    dispatch(setInfoMessage(`Congrats: "${form.newQuestion}" is a great question!`))
    })
    
}}

export function postQuiz(quiz, selectedAnswer) {
  return function (dispatch) {
    console.log(quiz)
    axios.post(`http://localhost:9000/api/quiz/answer` ,  {
       "quiz_id": quiz.quiz_id, "answer_id": selectedAnswer
    })
    .then(res => {
      console.log(res)
      dispatch(setInfoMessage(res.data.message))
      dispatch(fetchQuiz())
      
    })
    .catch()
    
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
