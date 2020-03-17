import React, { Component, } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Provider, connect } from 'react-redux';
import reducers from './reducers';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';


import Home from './screens/Home';
import Result from './screens/Result';

import {colors} from './helpers'

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));


const AppNavigator = createStackNavigator({
  Home: {
    screen: Home
  },
  Result: {
    screen: Result
  }
},
  {
    defaultNavigationOptions: {
      header: null,
      // title: 'BMI CALCULATOR',
      // headerTitleAlign: 'center',
      // headerStyle: {
      //   backgroundColor: colors.primaryColor,
      //   elevation: 0,
      // },
      // headerTintColor: '#fff',
      // headerTitleStyle: {
      //   fontWeight: 'bold',
      // },
    }
  });

  const MyDrawerNavigator = createDrawerNavigator({
    Home: {
      screen: Home,
    },
    Result: {
      screen: Result,
    },
  },
 );

const AppContainer = createAppContainer(MyDrawerNavigator);

export default class App extends Component {


  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <AppContainer />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});





