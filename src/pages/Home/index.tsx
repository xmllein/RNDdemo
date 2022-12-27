import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {Component} from 'react';
import {RootStackNavigation} from '@/navigator/index';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import Carousel, {sliderHeight} from './Carousel';
import Guess from './Guess';
import {IChannel} from '@/models/home';
import ChannelItem from './ChannelItem';

const mapStateToProps = ({home, loading}: RootState) => {
  return {
    loading: loading.effects['home/fetchChannels'],
    hasMore: home.pagination.hasMore,
    channels: home.channels,
    gradientVisible: home.gradientVisible,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: RootStackNavigation;
}

export class Home extends Component<IProps> {
  state = {
    refreshing: false,
  };

  componentDidMount(): void {
    const {dispatch} = this.props;
    // 轮播数据
    dispatch({
      type: 'home/fetchCarousels',
    });
    // 列表数据
    dispatch({
      type: 'home/fetchChannels',
    });
  }

  // 列表跳转详情
  onPress = (data: IChannel) => {
    const {navigation} = this.props;
    navigation.navigate('Detail', {id: data.id});
  };

  renderItem = ({item}: {item: IChannel}) => {
    return <ChannelItem data={item} onPress={this.onPress} />;
  };

  header = () => {
    return (
      <View>
        <Carousel />
        <View style={styles.background}>
          <Guess />
        </View>
      </View>
    );
  };

  footer = () => {
    const {hasMore, loading, channels} = this.props;
    if (!hasMore) {
      return (
        <View style={styles.end}>
          <Text>没有更多数据了</Text>
        </View>
      );
    }
    if (loading && hasMore && channels.length > 0) {
      return (
        <View style={styles.loading}>
          <Text>正在加载更多数据</Text>
        </View>
      );
    }

    return null;
  };

  empty = () => {
    const {loading} = this.props;
    if (loading) {
      return null;
    }
    return (
      <View style={styles.empty}>
        <Text>暂无数据</Text>
      </View>
    );
  };

  // 加载更多
  onEndReached = () => {
    const {hasMore, loading, dispatch} = this.props;
    if (!hasMore || loading) {
      return;
    }
    dispatch({
      type: 'home/fetchChannels',
      payload: {
        loadMore: true,
      },
    });
  };

  // 下拉刷新
  onRefresh = () => {
    const {dispatch} = this.props;
    this.setState({refreshing: true});
    dispatch({
      type: 'home/fetchChannels',
      callback: () => {
        this.setState({refreshing: false});
      },
    });
  };

  // 滚动监听
  onScroll = ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {dispatch, gradientVisible} = this.props;
    // 偏移值
    const offsetY = nativeEvent.contentOffset.y;
    let newGradientVisible = offsetY < sliderHeight;
    // 防止重复渲染
    if (gradientVisible !== newGradientVisible) {
      dispatch({
        type: 'home/setState',
        payload: {
          gradientVisible: newGradientVisible,
        },
      });
    }
  };

  render() {
    const {channels} = this.props;
    const {refreshing} = this.state;
    return (
      <FlatList
        ListHeaderComponent={this.header}
        ListFooterComponent={this.footer}
        ListEmptyComponent={this.empty}
        data={channels}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.2}
        onRefresh={this.onRefresh}
        refreshing={refreshing}
        onScroll={this.onScroll}
      />
    );
  }
}

const styles = StyleSheet.create({
  end: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  loading: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 100,
  },
  background: {
    backgroundColor: '#fff',
  },
});

export default connector(React.memo(Home));
