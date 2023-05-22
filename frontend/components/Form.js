import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import {inputChange, resetForm} from '../state/action-creators'
import * as actions from '../state/action-creators'

export function Form(props) {
  const [isDisabled, setDisabled] = useState(true)
  useEffect(() => {
    setDisabled(props.form.newQuestion.trim().length > 1 && props.form.newTrueAnswer.trim().length > 1 && props.form.newFalseAnswer.trim().length > 1)
      // if(props.form.newQuestion.trim().length < 1 ){

      // }
  
}, [props.form.newQuestion.length, props.form.newTrueAnswer.length, props.form.newFalseAnswer.length])
  

  const onChange = evt => {
    evt.preventDefault()
    const {value, name} = evt.target
    props.inputChange(name, value)
    
   
    
  }


  const onSubmit = evt => {
    console.log(resetForm)
    evt.preventDefault()
    props.postAnswer(props.form)
    props.resetForm()
  }



  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} min={1} onChange={onChange} value={props.form.newQuestion} name="newQuestion" id="newQuestion" placeholder="Enter question" />
      <input maxLength={50} min={1} onChange={onChange} value={props.form.newTrueAnswer} name="newTrueAnswer" id="newTrueAnswer" placeholder="Enter true answer" />
      <input maxLength={50} min={1} onChange={onChange} value={props.form.newFalseAnswer} name="newFalseAnswer" id="newFalseAnswer" placeholder="Enter false answer" />
      <button disabled={!isDisabled} id="submitNewQuizBtn" onClick={() => props.postAnswer(props.form)}>Submit new quiz</button>
    </form>
  )
}

const mapStateToProps = state => {
  return{
   form: state.form,
   
  }
}

export default connect(mapStateToProps, {postAnswer: actions.postAnswer, inputChange, resetForm})(Form)
