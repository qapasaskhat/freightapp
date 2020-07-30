import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  ImageBackground,
  FlatList,
  Linking,
  Alert,
  Platform,
} from 'react-native';
import styles from './styles';
import {img_bg} from '../../../const/images';
import Header from '../../../components/Header';
import List from '../../../components/List';
import Button from '../../../components/Button';
import moment from 'moment'
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios'

const text =
  'Таким образом рамки и место обучения кадров требуют определения и уточнения системы обучения кадров, соответствует насущным потребностям. Повседневная практика показывает, что сложившаяся структура организации способствует подготовки и реализации дальнейших направлений развития';
const myNumber = 87073163307;

class OrderDriver extends React.Component {
  constructor(props){
    super(props)
    this.state={
      item: this.props.navigation.getParam('param'),
      user: {}
    }
  }
  componentDidMount(){
    let params =  this.props.navigation.getParam('param')
    this.getUser(params.id)
  }
  getUser =(id)=>{
    const api = `http://gruz.sport-market.kz/api/announcements/${id}/`
    axios.get(api).then(response => {
          console.log('action fetchAnnouncements')
          console.log(response.data)
          this.setState({
            user: response.data.data.user
          })
      })
  }
  callNumber = phone => {
    console.log('callNumber ----> ', phone);
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    console.log('phoneNumber ----> ', phoneNumber);
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => console.log(err));
  };
  render() {
    const { item, user } = this.state
    return (
      <>
        <StatusBar />
        <SafeAreaView style={styles.container}>
          <ImageBackground
            source={img_bg}
            style={{width: '100%', height: '100%'}}>
            <Header
              text={'Просмотр заказа'}
              onpress={() => this.props.navigation.goBack()}
            />
            <ScrollView >
            <List
              name={user.name}
              desc={item.body}
              line
              phone_number={item.phone}
              del
              date={moment(item.created_at).format('L').replace('/','.').replace('/','.')}
              from={item.from}
              to={item.to}
            />
            </ScrollView>
          </ImageBackground>
          <View
            style={{
              position: 'absolute',
              width: '100%',
              backgroundColor: '#fff',
              bottom: 0,
            }}>
            <Button
              text={'Позвонить'}
              active
              onpress={() =>this.callNumber(item.phone)}
            />
          </View>
        </SafeAreaView>
      </>
    );
  }
}
export default OrderDriver;
