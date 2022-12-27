import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import React, {Component} from 'react';
import Navigator from '@/navigator/index';
import {Provider} from 'react-redux';
import store from '@/config/dva';
import {StatusBar} from 'react-native';
import '@/config/http';
export default class extends Component {
  render() {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <Navigator />
          <StatusBar
            backgroundColor="transparent"
            barStyle="dark-content"
            translucent
          />
        </Provider>
      </SafeAreaProvider>
    );
  }
}
