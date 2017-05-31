import React from 'react'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import { Flex, Box } from 'reflexbox'
import { Panel, PanelHeader } from 'rebass'
import Head from 'next/head'
import dynamic from 'next/dynamic';

import { initStore } from '../store'
import Form from '../components/Form'
import List from '../components/List'
const MapView = dynamic(
  import('../components/MapView'),
  { ssr: false }
)

class Index extends React.Component {
  state = {
    visible: true
  }

  static getInitialProps ({ store, isServer }) {
    return { isServer }
  }

  static childContextTypes = {
    rebass: React.PropTypes.object,
    reflexbox: React.PropTypes.object
  }

  getChildContext () {
    return {
      reflexbox: {
        breakpoints: {
          sm: '(min-width: 30em)',
          md: '(min-width: 48em)',
          lg: '(min-width: 60em)'
        }
      },
      rebass: {} // TODO not working
    }
  }

  componentDidMount() {
    if (document) {
      document.addEventListener('visibilitychange', (e) => {
        this.setState({
          visible: !document.hidden
        })
      });
    }
  }

  render () {
    return (
      <Flex style={{ fontFamily: 'Avenir' }}>
        <Head>
          <title>Friendzone - Keep tracks of your friends in different timezone</title>
          <link href="//cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.3/leaflet.css" rel="stylesheet" />
          <meta name="viewport" content="width=device-width, user-scalable=no" />
          <style>{`
            html, body, .leaflet-container {
              margin: 0;
              padding: 0;
              height: 100vh;
              width: 100%;
            }
            .leaflet-container {
              position: relative;
              z-index: 1;
            }
            .friend-marker {
              width: 50px !important;
              height: 50px !important;
              border-radius: 99999px;
              border: 2px solid white;
              display: flex;
              flex: 1;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              background-color: #ddd;
            }
            .friend-marker img {
              width: 50px;
              height: 50px;
              border-radius: 99999px;
            }
        `}</style>
        </Head>
        <Box sm={0} md={12} lg={12}>
          <MapView visible={this.state.visible} />
        </Box>
        <Box sm={12} md={6} lg={3} style={{ height: '100%', overflow: 'scroll', position: 'fixed', right: 0, zIndex: 2 }}>
          {this.props.people && Object.keys(this.props.people).length > 0 &&
          <Panel style={{ margin: 0}}>
            <PanelHeader>People</PanelHeader>
            <List visible={this.state.visible} />
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
