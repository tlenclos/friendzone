import React from 'react'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import { Flex, Box } from 'reflexbox'
import { Panel, PanelHeader } from 'rebass'

import { initStore } from '../store'
import Form from '../components/Form'
import List from '../components/List'

class Index extends React.Component {
  static getInitialProps ({ store, isServer }) {
    return { isServer }
  }

  static childContextTypes = {
    rebass: React.PropTypes.object
  }

  getChildContext () {
    return {
      rebass: {} // TODO not working
    }
  }

  render () {
    return (
      <Flex style={{ fontFamily: 'Avenir' }}>
        <Box col={9}>
          <p>Map</p>
        </Box>
        <Box col={3}>
          {Object.keys(this.props.people).length > 0 &&
          <Panel>
            <PanelHeader>People</PanelHeader>
            <List />
          </Panel>
          }
          <Panel>
            <PanelHeader>Add person</PanelHeader>
            <Form />
          </Panel>
        </Box>
      </Flex>
    )
  }
}

export default withRedux(initStore, ({people}) => ({ people }), null)(Index)
