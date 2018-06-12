import React from 'react'
import { AppRegistry } from 'react-native'
import { Router, Scene } from 'react-native-router-flux'
import { Provider } from 'react-redux'
import configureStore from './lib/configureStore'

import App from './containers/App'
import { setVersion } from './reducers/device/deviceActions'
import { setStore } from './reducers/global/globalActions'

import AuthInitialState from './reducers/auth/authInitialState'
import DeviceInitialState from './reducers/device/deviceInitialState'
import GlobalInitialState from './reducers/global/globalInitialState'
import ProfileInitialState from './reducers/profile/profileInitialState'
import SmsInitialState from './reducers/sms/smsInitialState'

import pack from '../package'
var VERSION = pack.version

function getInitialState () {
  return {
    auth: new AuthInitialState(),
    device: (new DeviceInitialState()).set('isMobile', true),
    global: (new GlobalInitialState()),
    profile: new ProfileInitialState(),
    sms: SmsInitialState
  }
}

export default class AppComponent extends React.PureComponent {
  render () {
    const store = configureStore(getInitialState())
    store.dispatch(setVersion(VERSION))
    store.dispatch(setStore(store))

    return (

      <Provider store={store}>
        <Router sceneStyle={{ backgroundColor: 'white' }}>
          <Scene key='root' hideNavBar>
            <Scene key='App'
              component={App}
              type='replace'
              initial />
          </Scene>
        </Router>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('snowflake', () => AppComponent)
