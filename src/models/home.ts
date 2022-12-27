import {RootState} from './index';
import {Effect, Model, SubscriptionsMapObject} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';

// 轮播图数据接口
const CAROUSEL_URL = '/carousel';
// 猜你喜欢数据接口
const GUESS_URL = '/guess';
// 列表数据接口
const CHANNEL_URL = '/channel';

export interface IPagination {
  total: number;
  current: number;
  hasMore: boolean;
}

export interface IChannel {
  id: string;
  title: string;
  image: string;
  remark: string;
  played: number;
  playing: number;
}

export interface ICarousel {
  id: string;
  image: string;
  colors: [string, string];
}

export interface IGuess {
  id: string;
  image: string;
  title: string;
}

interface HomeState {
  // num: number;
  carousels: ICarousel[];
  guess: IGuess[];
  // 当前轮播图下标
  activeCarouselIndex: number;
  // 是否显示渐变
  gradientVisible: boolean;
  channels: IChannel[];
  pagination: IPagination;
}

interface HomeModel extends Model {
  namespace: 'home';
  state: HomeState;
  reducers: {
    setState: Reducer<HomeState>;
  };
  effects: {
    fetchCarousels: Effect;
    fetchGuess: Effect;
    fetchChannels: Effect;
  };
  subscriptions?: SubscriptionsMapObject;
}

const initialState: HomeState = {
  carousels: [],
  guess: [],
  channels: [],
  activeCarouselIndex: 0,
  gradientVisible: true,
  pagination: {
    total: 0,
    current: 1,
    hasMore: true,
  },
};

const homeModel: HomeModel = {
  namespace: 'home',
  state: initialState,
  reducers: {
    setState(state = initialState, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    // 轮播图数据
    *fetchCarousels(_, {call, put}) {
      const {data} = yield call(axios.get, CAROUSEL_URL);
      // console.log('data', data);
      yield put({
        type: 'setState',
        payload: {
          carousels: data,
        },
      });
    },
    // 猜你喜欢数据
    *fetchGuess(_, {call, put}) {
      const {data} = yield call(axios.get, GUESS_URL);
      // console.log('data', data);
      yield put({
        type: 'setState',
        payload: {
          guess: data,
        },
      });
    },
    // 列表数据
    *fetchChannels({callback, payload}, {call, put, select}) {
      // 获取state的channels
      const {channels, pagination} = yield select(
        (state: RootState) => state.home,
      );
      let page = 1;
      if (payload && payload.loadMore) {
        page = pagination.current + 1;
      }
      const {data} = yield call(axios.get, CHANNEL_URL, {
        params: {
          page,
        },
      });

      let newChannels = data.results;
      if (payload && payload.loadMore) {
        newChannels = channels.concat(data.results);
      }
      yield put({
        type: 'setState',
        payload: {
          channels: newChannels,
          pagination: {
            hasMore: newChannels.length < data.pagination.total,
            current: data.pagination.current,
            total: data.pagination.total,
          },
        },
      });
      if (typeof callback === 'function') {
        callback();
      }
    },
  },
};

export default homeModel;
