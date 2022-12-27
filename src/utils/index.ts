import {Dimensions} from 'react-native';

// Get the screen dimensions
export const {width: viewportWidth, height: viewportHeight} =
  Dimensions.get('window');

// 根据百分比获取宽度
export function wp(percentage: number) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

// 根据百分比获取高度
export function hp(percentage: number) {
  const value = (percentage * viewportHeight) / 100;
  return Math.round(value);
}
