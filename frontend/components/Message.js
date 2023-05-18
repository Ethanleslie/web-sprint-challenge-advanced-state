import React from 'react'
import { connect } from 'react-redux'
import { setInfoMessage } from '../state/action-creators'


export function Message(props) {
  console.log(props.infoMessage)
  return <div id="message">{props.infoMessage}</div>
}



const mapStateToProps = state => {
  
  return{
   infoMessage: state.infoMessage
  }
}

export default connect(mapStateToProps, {setInfoMessage})(Message)