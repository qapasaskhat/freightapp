/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Provider } from 'react-redux'
import store from './src/api/store'

import Route from './src/router'

class App extends React.Component{
  render(){
    return(
      <Provider store={store}>
        <Route />
      </Provider>
    )
  }
}
export default App;
