import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {PureComponent} from 'react';
import Home from '@/pages/Home/index';
import TopTabBarWrapper from '@/pages/views/TopTabBarWrapper';
import {StyleSheet} from 'react-native';

const Tab = createMaterialTopTabNavigator();

export class HomeTabs extends PureComponent {
  render() {
    return (
      <Tab.Navigator
        sceneContainerStyle={styles.scenetContainer}
        tabBar={props => <TopTabBarWrapper {...props} />}
        screenOptions={{
          lazy: true,
          tabBarScrollEnabled: true,
          tabBarItemStyle: {width: 80},
          tabBarIndicatorStyle: {
            height: 4,
            width: 20,
            marginLeft: 30,
            borderRadius: 2,
            backgroundColor: '#f86442',
          },
          tabBarActiveTintColor: '#f86442',
          tabBarInactiveTintColor: '#333',
          tabBarPressColor: '#fff',
        }}>
        <Tab.Screen
          name="Home"
          component={React.memo(Home)}
          options={{
            tabBarLabel: '推荐',
            tabBarStyle: {
              elevation: 0,
              flex: 1,
              overflow: 'hidden',
              backgroundColor: 'transparent',
              shadowColor: 'transparent',
            },
          }}
        />
        {/* <Tab.Screen name="Settings" component={Home} /> */}
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  scenetContainer: {
    backgroundColor: 'transparent',
  },
});

export default React.memo(HomeTabs);
