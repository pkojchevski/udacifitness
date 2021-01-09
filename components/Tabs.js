import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddEntry from './AddEntry';
import Live from './Live'
import History from './History'


const Tab = createBottomTabNavigator()

 const Tabs = () => {

    // const HeaderTabs = createBottomTabNavigator({
    //     History: {
    //       screen: History,
    //       navigationOptions: {
    //         tabBarLabel:'History',
    //         tabBarIcon:({tintColor}) => <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
    //       }
    //     },
    //     AddEntry:{
    //       screen:AddEntry,
    //       navigationOptions: {
    //         tabBarLabel: 'Add Entry',
    //         tabBarIcon:({tintColor}) => <FontAwesome name="plus-square" size={30} color={tintColor} />
    //       }
    //     },
    //     Live: {
    //      navigationOptions: {
    //        tabBarLabel: 'Live',
    //        tabBarIcon:({tintColor}) => <Ionicons name="ios-apeedometer" size={30} color={tintColor} />
    //      }
    //     }
    //    },
    //     {
    //    navigationOptions : {
    //      header: null
    //    },
    //     tabBarOptions: {
    //       activeTintColor:Platform.OS === 'ios' ? purple : white,
    //       style: {
    //         height: 56,
    //         backgroundColor:Platform.OS === 'ios' ? white : purple,
    //         shadowColor: 'rgba(0,0,0,0.24)',
    //         shadowOffset: {
    //           width: 0,
    //           height: 3
    //         },
    //         shadowRadius: 6,
    //         shadowOpacity: 1
    //       }
    //      }
    //  })
  return (
      <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name="History" component={History} />
            <Tab.Screen name="AddEntry" component={AddEntry} />
            <Tab.Screen name="Live" component={Live} />
        </Tab.Navigator>
      </NavigationContainer>
    );
}

export default Tabs
