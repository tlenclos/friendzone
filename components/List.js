import React, {Component} from 'react'
import { connect } from 'react-redux'
import map from 'lodash/map'
import { bindActionCreators } from 'redux'
import moment from 'moment'

import { removePerson, selectPerson } from '../store'

class List extends Component {
  state = {
    selectedPerson: null
  }

  render () {
    const { people } = this.props
    return (
      <div>
        <ul>
          {map(people, (person, key) =>
            <li key={key} style={{ padding: '0 0 10px 0' }} onClick={() => this.props.selectPerson(key)}>
              {person.name} <button onClick={() => this.props.removePerson(key)}>Remove</button>
              <br />
              {moment.tz(person.timezone).format()}
            </li>
          )}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ people }) => ({ people })

const mapDispatchToProps = (dispatch) => {
  return {
    selectPerson: bindActionCreators(selectPerson, dispatch),
    removePerson: bindActionCreators(removePerson, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
