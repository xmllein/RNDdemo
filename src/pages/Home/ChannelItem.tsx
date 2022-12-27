import {View, Text, StyleSheet, Image} from 'react-native';
import React, {FC} from 'react';
import {IChannel} from '@/models/home';
import Icon from '@/assets/iconfont/index';
import Touchable from '@/components/Touchable';

interface IProps {
  data: IChannel;
  onPress: (data: IChannel) => void;
}

const ChannelItem: FC<IProps> = props => {
  const ItemOnPress = () => {
    const {data, onPress} = props;
    if (typeof onPress === 'function') {
      onPress(data);
    }
  };
  const {data} = props;
  return (
    <Touchable style={styles.container} onPress={ItemOnPress}>
      <Image source={{uri: data.image}} style={styles.image} />
      <View style={styles.rightContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {data.title}
        </Text>
        <Text style={styles.remark} numberOfLines={2}>
          {data.remark}
        </Text>
        <View style={styles.bottom}>
          <View style={styles.playedView}>
            <Icon name="icon-V" size={14} />
            <Text style={styles.playText}>{data.played}</Text>
          </View>
          <View style={styles.playingView}>
            <Icon name="icon-shengyin" size={14} />
            <Text style={styles.playText}>{data.playing}</Text>
          </View>
        </View>
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#eee',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#ddd',
    marginRight: 10,
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  remark: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#f8f8f8',
    padding: 5,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  playedView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playingView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
});

export default React.memo(ChannelItem);
