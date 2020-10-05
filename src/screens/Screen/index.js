import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
  Alert
} from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import {img} from '../../const/images';
import {fcmService} from '../../notification';
import {connect} from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage';
import {language} from '../../const/const'

import {
  getBadgeCount,
  setBadgeCount,
  getNotificationBadgeSetting,
} from 'react-native-notification-badge';

const width = Dimensions.get('window').width;

class Screen extends React.Component {
  
   componentDidMount=async()=> {
     
    console.log('role',this.props.role)
    const {navigation} = this.props;
     if(this.props.role === 0){
      navigation.replace('AuthDriver');
     }else if(this.props.role === 1){
      navigation.replace('AuthClient');
     }
    AsyncStorage.getAllKeys().then(keys => {
      console.log(keys)
    });
    fcmService.register(
      this.onRegister,
      this.onNotification,
      this.onOpenNotification,
    )
    this.props.navigation.addListener ('willFocus', () =>
      {
        if(this.props.role === 0){
          navigation.replace('AuthDriver');
         }else if(this.props.role === 1){
          navigation.replace('AuthClient');
         }
      }
    );
  }
  onRegister = token => {
    console.log('device token ', token);
  };
  onNotification = notify => {
    console.log('onNotification ', notify);
    const channelObj = {
      channelId: 'freightChannelId',
      channelName: 'freightChannelName',
      channelDes: 'freightChannelDes',
    };
    const channel = fcmService.buildChannel(channelObj);

    const buildNotify = {
      dataId: notify._notificationId,
      title: notify._title,
      content: notify._body,
      sound: 'default',
      channel: channel,
      data: notify._data,
      color: '#007BED',
      largeIcon: 'ic_launcher',
      smallIcon: 'ic_launcher',
      vibrate: true,
    };
    const notification = fcmService.buildNotification(buildNotify);
    //console.log(notification)
    fcmService.displayNotify(notification);
  };
  onOpenNotification = notify => {
    console.log('onOpenNotification ', notify);
    Alert.alert(language[this.props.langId].cabinet.notify,notify._title,[
      {
        text:  language[this.props.langId].cabinet.cancel,
        onPress: () => console.log("Cancel Pressed"),
      },
      { 
        text: language[this.props.langId].cabinet.open, 
        onPress: () => this.props.navigation.navigate('OrderDriver',{ id: notify._data.announcement_id}),
        style: "cancel"
       }
    ],
    { cancelable: false })
    //alert(notify._data.announcement_id);
  };

  _goTo = async () => {
    //fcmService.cancellAllNotification()
    this.props.navigation.navigate('AuthClient');
  };
  _goToDriver = async () => {
    this.props.navigation.navigate('AuthDriver');
  };
  render() {

    return (
      <>
        <StatusBar />
        <SafeAreaView style={styles.container}>
          <Logo />
          <View style={{position: 'absolute',bottom: -10,}}>
            <Button active text={language[this.props.langId].main.client} onpress={() => this._goTo()} />
            <Button light text={language[this.props.langId].main.driver} onpress={() => this._goToDriver()} />
            <Image source={img}  style={{width: width,resizeMode: 'contain',height: width,}}
            />
          </View>
        </SafeAreaView>
      </>
    );
  }
}
const mapStateToProps = state => ({
  role: state.login.role,
  langId: state.appReducer.langId
});
export default connect(mapStateToProps)(Screen);
