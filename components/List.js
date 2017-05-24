import React, {Component} from 'react'
import { connect } from 'react-redux'
import map from 'lodash/map'
import { bindActionCreators } from 'redux'
import moment from 'moment'

import { removePerson } from '../store'

class List extends Component {
  render () {
    const { people } = this.props
    return (
      <ul>
        {map(people, (person, key) =>
          <li key={key} style={{ padding: '0 0 10px 0' }}>
            {person.name} (GMT {moment.tz(person.timezone).format('Z')}) <button onClick={() => this.props.removePerson(key)}>Remove</button>
            <br />
            {moment.tz(person.timezone).format()}
          </li>
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
