import React from 'react'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import { Flex, Box } from 'reflexbox'
import { Panel, PanelHeader } from 'rebass'
import Head from 'next/head'
import NoSSR from 'react-no-ssr';

import { initStore } from '../store'
import Form from '../components/Form'
import List from '../components/List'
import MapView from '../components/MapView'

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
        <Head>
          <title>Friendzone - Keep tracks of your friends in different timezone</title>
          <link href="//cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.3/leaflet.css" rel="stylesheet" />
          <style global jsx>{`
            html, body, .leaflet-container {
              margin: 0;
              padding: 0;
              height: 100vh;
              width: 100%;
          }
          .friend-marker {
            width: 50px !important;
            height: 50px !important;
          }
          .friend-marker img {
            width: 50px;
            height: 50px;
            border-radius: 99999px;
            border: 2px solid white;
          }
        `}</style>
        </Head>
        <Box col={9}>
          <NoSSR>
            <MapView />
          </NoSSR>
        </Box>
        <Box col={3}>
          {Object.keys(this.props.people).length > 0 &&
          <Panel style={{ margin: 0}}>
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
