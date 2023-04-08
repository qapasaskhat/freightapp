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
import localization_ru from 'moment/locale/ru'
import {ScrollView} from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import { language } from '../../../const/const'
import firebase from 'react-native-firebase';

class OrderDriver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //item: this.props.navigation.getParam('param'),
      //type: this.props.navigation.getParam('notification').type,
      id: this.props.navigation.getParam('id'),
      data: {}
    };
  }
  componentDidMount(){
    let notification =  this.props.navigation.getParam('id')
    console.log(notification)
    //this.state.type && 
    this.getOrder(this.state.id)
  }
  getOrder=(id)=>{
    var axios = require('axios');
    var config = {
      method: 'get',
      url: `http://gruz.viker.kz/api/announcements/${id}`,
      headers: { 
        'Authorization': `Bearer ${this.props.login.token}`
      }
    };

    axios(config)
    .then( (response) => {
      this.setState({
        data: response.data.data
      })
      if(!response.data.data.user){
        this.props.navigation.goBack()
      }
      console.log('/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/')
      console.log(JSON.stringify(response.data));
      console.log('/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/')
    })
    .catch( (error)=> {
      this.props.navigation.goBack()
      console.log("error" ,error);
    });

  }

  callNumber = phone => {

    if(Platform.OS === 'ios'){
      firebase.analytics().logEvent('callTheClientIOS',{
        clientPhone: phone,
        driver: this.props.user.name,
        driverPhone: this.props.user.phone
      })
    } else {
      firebase.analytics().logEvent('callTheClient',{
        clientPhone: phone,
        driver: this.props.user.name,
        driverPhone: this.props.user.phone
      })
    }
    
    
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
    const {item,data} = this.state;
    return (
      <>
        <StatusBar barStyle='dark-content' />
        <SafeAreaView style={styles.container}>
          <ImageBackground
            source={img_bg}
            style={{width: '100%', height: '100%'}}>
            <Header
              text={language[this.props.langId].view_orders.title}
              onpress={() => this.props.navigation.goBack()}
            />
           <ScrollView>
              <List
                name={data?.user && data.user.name}
                body={data?.body}
                visibleName
                visiblePhone
                line
                phone_number={data?.phone}
                del
                date={moment(data?.created_at).local('ru',localization_ru).format('lll')}
                from={data?.from}
                to={data?.to}
              />
            </ScrollView>

          </ImageBackground>
          <View style={styles.bottomView}>
            <Button
              text={language[this.props.langId].view_orders.call} active
              onpress={() => this.callNumber(data.phone)}  />
          </View>
        </SafeAreaView>
      </>
    );
  }
}
const mapStateToProps = state => ({
  langId: state.appReducer.langId,
  login: state.login,
  user: state.users.userData
});
export default connect(mapStateToProps)(OrderDriver);
