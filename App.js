
import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { purple } from './utils/colors';
import { Constants } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { setLocalNotification } from './utils/helpers';
import Tabs from './components/Tabs'

const UdaciStatusBar = ({backgroundColor, ...props}) => {
   return (
     <View style={{backgroundColor , height: Constants.statusBarHeight}}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
     </View>
   )
}

class App extends React.Component {

  componentDidMount() {
    setLocalNotification();
  }

  
  render() {
    return (
      <Provider store = {createStore(reducer)}>
        <View style={{flex:1}}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content"/>
          <Tabs />
        </View>
      </Provider>
    );

  }

}


export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



