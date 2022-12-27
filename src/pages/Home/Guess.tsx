import {View, Text, StyleSheet, Image} from 'react-native';
import React, {Component} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import {FlatList} from 'react-native-gesture-handler';
import {IGuess} from '@/models/home';
import Touchable from '@/components/Touchable';
import Icon from '@/assets/iconfont';
const mapStateToProps = ({home}: RootState) => {
  return {
    guess: home.guess,
  };
};

const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

export class Guess extends Component<IProps> {
  onPress = () => {};

  fetch = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/fetchGuess',
    });
  };

  componentDidMount() {
    this.fetch();
  }

  renderItem = ({item}: {item: IGuess}) => {
    return (
      <Touchable style={styles.item} onPress={this.onPress}>
        <Image source={{uri: item.image}} style={styles.image} />
        <Text numberOfLines={2}>{item.title}</Text>
      </Touchable>
    );
  };
  render() {
    const {guess} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Icon name="icon-xihuan" size={16} color="#f86442" />
            <Text style={styles.title}>猜你喜欢</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.more}>更多</Text>
            <Icon name="icon-more" size={16} color="#999" />
          </View>
        </View>
        <FlatList
          style={styles.list}
          numColumns={3}
          data={guess}
          renderItem={this.renderItem}
        />
        <Touchable style={styles.changeGuess} onPress={this.fetch}>
          <Icon name="icon-huanyipi" color={'red'} />
          <Text style={styles.changeGuessText}>换一批</Text>
        </Touchable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 8,
  },
  item: {
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 6,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  more: {
    color: '#999',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeGuess: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderTopColor: '#eee',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  changeGuessText: {
    color: 'red',
    marginLeft: 5,
  },
  list: {
    padding: 10,
  },
});
export default connector(React.memo(Guess));
