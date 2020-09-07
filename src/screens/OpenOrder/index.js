import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
  ImageBackground,
  Alert,
} from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import {img_bg} from '../../const/images';
import Button from '../../components/Button';
import List from '../../components/List';
import moment from 'moment';

const width = Dimensions.get('window').width;
const text =
  'Таким образом рамки и место обучения кадров требуют определения и уточнения системы обучения кадров, соответствует насущным потребностям. Повседневная практика показывает, что сложившаяся структура организации способствует подготовки и реализации дальнейших направлений развития';

class CodeInputClass extends React.Component {
  state = {
    item: this.props.navigation.getParam('param'),
  };
  componentDidMount = () => {
    console.log(this.props.navigation.getParam('param'));
  };
  arhived = () => {
    Alert.alert(
      'Удалить',
      'Действительно ли вы хотите удалить?',
      [
        {
          text: 'Удалить',
          onPress: async () => {
            console.log('delete');
          },
        },
        {
          text: 'Отмена',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };
  render() {
    const {item} = this.state;
    return (
      <>
        <StatusBar />
        <SafeAreaView style={styles.container}>
          <Header
            text={'Просмотр заказа'}
            onpress={() => this.props.navigation.goBack()}
          />
          <ImageBackground style={styles.img_bg} source={img_bg}>
            <List
              onpressDelete={() => this.arhived()}
              name="Вы"
              body={item.body}
              line
              from={item.from}
              to={item.to}
              date={moment(item.created_at).format('DD MM YYYY')}
              phone_number={item.phone}
            />
          </ImageBackground>
          <View style={styles.bottom}>
            <Button
              text={'Редактировать заказ'}
              active
              onpress={() =>
                this.props.navigation.navigate('EditOrder', {param: item})
              }
            />
          </View>
        </SafeAreaView>
      </>
    );
  }
}
export default CodeInputClass;
