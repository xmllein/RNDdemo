import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import {
  MaterialTopTabBar,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import {SafeAreaView} from 'react-native-safe-area-context';
import AnimatedGradientTransition from 'react-native-linear-animated-gradient-transition';
import Touchable from '@/components/Touchable';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';

const mapStateToProps = ({home}: RootState) => {
  return {
    gradientVisible: home.gradientVisible,
    linearColors:
      home.carousels.length > 0
        ? home.carousels[home.activeCarouselIndex].colors
        : ['#ccc', '#e2e2e2'],
  };
};
const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends MaterialTopTabBarProps, ModelState {}

class TopTabBarWrapper extends Component<IProps> {
  // 渐变色
  get linearGradient() {
    const {gradientVisible, linearColors = ['#ccc', '#e2e2e2']} = this.props;
    if (gradientVisible) {
      return (
        <AnimatedGradientTransition
          colors={linearColors}
          style={styles.linearGradient}
        />
      );
    }
    return null;
  }

  render() {
    const {gradientVisible, ...resetProps} = this.props;
    const {state, descriptors} = resetProps;

    let textStyle = styles.text;
    let activeTintColor = '#f86442';
    if (gradientVisible) {
      textStyle = styles.whiteText;
      activeTintColor = '#fff';
    }
    state.routes.map(route => {
      const {options} = descriptors[route.key];
      options.tabBarActiveTintColor = activeTintColor;
      options.tabBarIndicatorStyle = {
        height: 4,
        width: 20,
        marginLeft: 30,
        borderRadius: 2,
        backgroundColor: activeTintColor,
      };
    });
    return (
      <SafeAreaView style={styles.container}>
        {this.linearGradient}
        <View style={styles.topBarView}>
          <MaterialTopTabBar {...resetProps} />
          <Touchable style={styles.categoryBtn}>
            <Text style={textStyle}>分类</Text>
          </Touchable>
        </View>
        <View style={styles.bottom}>
          <Touchable style={styles.searchBtn}>
            <Text style={textStyle}>搜素按钮</Text>
          </Touchable>
          <Touchable style={styles.historyBtn}>
            <Text style={textStyle}>历史记录</Text>
          </Touchable>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: Platform.OS === 'ios' ? 130 : 120,
    paddingBottom: 10,
    marginBottom: 10,
  },
  linearGradient: {
    ...StyleSheet.absoluteFillObject,
    height: 260,
  },
  topBarView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabBar: {
    elevation: 0,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  categoryBtn: {
    paddingHorizontal: 10,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: '#ccc',
  },
  bottom: {
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  searchBtn: {
    flex: 1,
    paddingLeft: 12,
    height: 30,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 20,
    // marginHorizontal: 10,
    // marginVertical: 10,
  },
  historyBtn: {
    marginLeft: 24,
  },
  text: {
    color: '#333',
  },
  whiteText: {
    color: '#fff',
  },
});

export default connector(TopTabBarWrapper);
