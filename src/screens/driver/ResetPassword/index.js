import React from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Logo from '../../../components/Logo'

class ResetPassword extends React.Component {
  state = {};
  _resetPassword = () => {};
  render() {
    return (
      <>
        <StatusBar barStyle={'dark-content'} />
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: '#fff',
          }}>
          <Header
            text="reset password"
            onpress={() => this.props.navigation.goBack()}
          />
          <Logo />
          <View>
            <Input text="phone number" placeholder="+7"/>
          </View>
          <View
            style={{
              position: 'absolute',
              width: '100%',
              backgroundColor: '#fff',
              bottom: 0,
            }}>
            <Button
              text={'send'}
              active
              onpress={() => {
                this._resetPassword();
              }}
            />
          </View>
        </SafeAreaView>
      </>
    );
  }
}
export default ResetPassword;
