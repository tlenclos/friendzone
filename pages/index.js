import React from 'react'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'

import { initStore } from '../store'
import Form from '../components/Form'
import List from '../components/List'

class Index extends React.Component {
  static getInitialProps ({ store, isServer }) {
    return { isServer }
  }

  render () {
    return (
      <div>
        <Form />
        <List />
      </div>
    )
  }
}

export default withRedux(initStore, null, null)(Index)
