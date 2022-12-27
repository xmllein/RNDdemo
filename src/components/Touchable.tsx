import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import React, {FC} from 'react';

const Touchable: FC<TouchableOpacityProps> = props => (
  <TouchableOpacity activeOpacity={0.8} {...props} />
);

export default Touchable;
