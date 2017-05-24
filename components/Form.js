import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Input, Select } from 'rebass'
import momentTimezones from 'moment-timezone'
import moment from 'moment'

import { editPerson } from '../store'

const getTimeZonesForSelect = () => {
  const offsetTimezones = [];
  const timeZones = momentTimezones.tz.names();

  offsetTimezones.push({
    children: 'Select a timezone',
    value: ''
  })

  for(var i in timeZones) {
    offsetTimezones.push({
      children: " (GMT"+moment.tz(timeZones[i]).format('Z')+") " + timeZones[i],
      value: timeZones[i]
    });
  }

  return offsetTimezones;
}

class Form extends Component {
  state = this.defaultState()
  timezones = getTimeZonesForSelect()

  defaultState() {
    return {
      id: null,
      name: '',
      timezone: '',
      image: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.formEditPerson != nextProps.formEditPerson) {
      this.setState({
        ...nextProps.formEditPerson
      })
    }
  }

  handleNameChange = (event) => {
    this.setState({name: event.target.value});
  }

  handleTimezoneChange = (event) => {
    this.setState({timezone: event.target.value});
  }

  handleImageChange = (event) => {
    this.setState({image: event.target.value});
  }

  render () {
    return (
      <div>
        <style jsx>{`
          div {
            padding: 0 0 20px 0;
          }
      `}</style>
        <form onSubmit={(e) => {
          e.preventDefault()

          if (this.state.name != '' && this.state.timezone != '') {
            this.props.editPerson(this.state)
            this.setState(this.defaultState())
          }
        }}>
        <Input
          label="Name"
          name="name"
          placeholder="Name of the person"
          type="text"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
        <Select
          label="Timezone"
          name="timezone"
          options={this.timezones}
          rounded
          value={this.state.timezone}
          onChange={this.handleTimezoneChange}
        />
        <Input
          label="Image"
          name="image"
          placeholder="Image of the person"
          type="text"
          value={this.state.image}
          onChange={this.handleImageChange}
        />
        <button type="submit">{this.state.id != null ? 'Edit' : 'Add'}</button>
        <button onClick={() => this.setState(this.defaultState())}>Clear</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ formEditPerson }) => ({ formEditPerson })

const mapDispatchToProps = (dispatch) => {
  return {
    editPerson: bindActionCreators(editPerson, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
