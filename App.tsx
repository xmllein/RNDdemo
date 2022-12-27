import {Text, StyleSheet, View, FlatList} from 'react-native';
import React, {Component} from 'react';
import Config from 'react-native-config';

console.log('Config', Config.API_URL);

export default class App extends Component {
  state = {
    movies: [],
  };

  // 获取电影列表
  getMoviesFromApiAsync = async () => {
    try {
      let response = await fetch(
        'https://facebook.github.io/react-native/movies.json',
      );
      let responseJson = await response.json();
      console.log('电影列表', responseJson);
      // this.setState({
      //   movies: responseJson.movies,
      // });
      this.setState(prevState => {
        console.log('prevState', prevState);
        // 数组合并
        return {movies: [...prevState.movies, ...responseJson.movies]};
        // return {movies: responseJson.movies};
      });
    } catch (error) {
      console.error(error);
    }
  };

  // 组件挂载完成后执行
  componentDidMount() {
    this.getMoviesFromApiAsync();
  }

  renderItem = ({item}: {item: any}) => {
    return <Text>{item.title}</Text>;
  };

  render() {
    const {movies} = this.state;
    return (
      <View style={styles.container}>
        <Text>App {Config.API_URL}</Text>
        <View style={styles.box}>
          <Text>Box</Text>
        </View>
        <View style={styles.boxOne}>
          <Text>Box-1</Text>
        </View>
        <View style={styles.boxTwo}>
          <Text>Box-2</Text>
        </View>
        <FlatList data={movies} renderItem={this.renderItem} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },
  box: {
    width: '20%',
    height: 100,
    backgroundColor: 'red',
  },
  boxOne: {
    width: '20%',
    height: 100,
    backgroundColor: 'green',
  },
  boxTwo: {
    width: '20%',
    height: 100,
    backgroundColor: 'blue',
  },
});
