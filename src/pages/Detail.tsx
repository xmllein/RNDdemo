import {Text, View} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '@/navigator/index';

// interface IProps {
//   route: RouteProp<RootStackParamList, 'Detail'>;
// }

// export class Detail extends Component<IProps> {
//   render() {
//     const {route} = this.props;
//     return (
//       <View>
//         <Text>Detail</Text>
//         <Text>{route.params.id}</Text>
//       </View>
//     );
//   }
// }

// export default Detail;

const Detail = ({route}: StackScreenProps<RootStackParamList, 'Detail'>) => {
  return (
    <View>
      <Text>Detail</Text>
      <Text>{route.params.id}</Text>
    </View>
  );
};

export default Detail;
