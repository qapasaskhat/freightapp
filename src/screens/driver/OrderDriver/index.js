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
import moment from 'moment';
import {ScrollView} from 'react-native-gesture-handler';

class OrderDriver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.navigation.getParam('param'),
    };
  }
  // componentDidMount(){
  //   let params =  this.props.navigation.getParam('param')
  //   this.getUser(params.id)
  // }

  callNumber = phone => {
    console.log('callNumber ----> ', phone);
    let phoneNumber = phone;
    if (Platform.OS === 'android') {
      phoneNumber = `tel:+${phone}`;
    } else {
      phoneNumber = `telprompt:+${phone}`;
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
    const {item} = this.state;
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
            <ScrollView>
              <List
                name={item.user && item.user.name}
                desc={item.body}
                line
                phone_number={item.phone}
                del
                date={moment(item.created_at).format('DD MM YYYY')}
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
              onpress={() => this.callNumber(item.phone)}
            />
          </View>
        </SafeAreaView>
      </>
    );
  }
}
export default OrderDriver;
