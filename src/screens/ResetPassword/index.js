import React from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';

class Reset extends React.Component {
  _resetPassword=()=>{
    ToastAndroid.showWithGravity('helllo', ToastAndroid.SHORT, ToastAndroid.CENTER)
  }
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: '#fff',
          }}>
          <Header
            text="Сбросить пароль"
            onpress={() => {
              this.props.navigation.goBack();
            }}
          />
          <Logo />
          <View>
            <Input text="Номер телефона" />
          </View>
          <View
            style={{
              position: 'absolute',
              width: '100%',
              backgroundColor: '#fff',
              bottom: 30,
            }}>
            <Button text={'send'} active onpress={() => {this._resetPassword()}} />
          </View>
        </SafeAreaView>
      </>
    );
  }
}
export default Reset