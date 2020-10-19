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
      url: `http://gruz.sport-market.kz/api/announcements/${id}`,
      headers: { 
        'Authorization': 'Bearer 390|l36MS2SOVLuoTevgzR5gCwmgsdZuzRVLeLDeGSqZarvSoeSocXHLHX6L94sNvFtprUzfVAE42iTzeknl'
      }
    };

    axios(config)
    .then( (response) => {
      this.setState({
        data: response.data.data
      })
      console.log(JSON.stringify(response.data));
    })
    .catch( (error)=> {
      console.log(error);
    });

  }

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
    const {item,data} = this.state;
    return (
      <>
        <StatusBar />
        <SafeAreaView style={styles.container}>
          <ImageBackground
            source={img_bg}
            style={{width: '100%', height: '100%'}}>
            <Header
              text={language[this.props.langId].view_orders.title}
              onpress={() => this.props.navigation.goBack()}
            />
           { //this.state.type?
           <ScrollView>
              <List
                name={data.user && data.user.name}
                body={data.body}
                visibleName
                visiblePhone
                line
                phone_number={data.phone}
                del
                date={moment(data.created_at).local('ru',localization_ru).format('lll')}
                from={data.from}
                to={data.to}
              />
            </ScrollView>
            // :<ScrollView>
            //   <List
            //     name={item.user && item.user.name}
            //     desc={item.body}
            //     line
            //     phone_number={item.phone}
            //     del
            //     date={moment(item.created_at).local('ru',localization_ru).format('lll')}
            //     from={item.from}
            //     to={item.to}
            //   />
            // </ScrollView>
            }
          </ImageBackground>
          <View
            style={{
              position: 'absolute',
              width: '100%',
              backgroundColor: '#fff',
              bottom: 0,
            }}>
            <Button
              text={language[this.props.langId].view_orders.call}
              active
              onpress={() => this.callNumber(data.phone)}  />
          </View>
        </SafeAreaView>
      </>
    );
  }
}
const mapStateToProps = state => ({
  langId: state.appReducer.langId
});
export default connect(mapStateToProps)(OrderDriver);
