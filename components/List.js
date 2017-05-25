import React, {Component} from 'react'
import { connect } from 'react-redux'
import map from 'lodash/map'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import { Avatar, Badge, Button } from 'rebass'
import { Flex, Box } from 'reflexbox'

import { removePerson, selectPerson } from '../store'

class List extends Component {
  state = {
    selectedPerson: null
  }

  render () {
    const { people } = this.props
    return (
      <div>
        <style jsx>{`
          ul {
            padding: 0;
            list-style-type: none;
          }
          li {
            margin-bottom: 10px;
          }
	    `}</style>
        <ul>
          {map(people, (person, key) =>
            <li key={key} onClick={() => this.props.selectPerson(key)}>
              <Flex align="center" justify="space-between">
                <Flex align="center">
                  {person.image ? <Avatar
                  circle
                  size={48}
                  src={person.image}
                  style={{ marginRight: 10 }}
                  /> : null}

                  {person.name}
                </Flex>
                <Button backgroundColor="#ddd" onClick={() => this.props.removePerson(key)}>Remove</Button>
              </Flex>
              <Badge theme="info" style={{ padding: 5, marginTop: 5, height: 'auto' }}>{moment.tz(person.timezone).format('LLLL')}</Badge>
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
