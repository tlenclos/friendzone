import React, {Component} from 'react'
import { connect } from 'react-redux'
import map from 'lodash/map'
import { bindActionCreators } from 'redux'
import { removePerson } from '../store'

class List extends Component {
  render () {
    const { people } = this.props
    return (
      <ul>
        {map(people, (person, key) =>
          <li key={key}>{person.name} {key} - <button onClick={() => this.props.removePerson(key)}>Remove</button></li>
        )}
      </ul>
    )
  }
}

const mapStateToProps = ({ people }) => ({ people })

const mapDispatchToProps = (dispatch) => {
  return {
    removePerson: bindActionCreators(removePerson, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
