import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addPerson } from '../store'

class Form extends Component {
  render () {
    return (
      <div>
        <style jsx>{`
          div {
            padding: 0 0 20px 0;
          }
      `}</style>
        <button onClick={() => this.props.addPerson('Test', 1)}>Add</button>
      </div>
    )
  }
}

const mapStateToProps = () => {}

const mapDispatchToProps = (dispatch) => {
  return {
    addPerson: bindActionCreators(addPerson, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
