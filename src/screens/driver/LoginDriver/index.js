import React from 'react';
import {SafeAreaView, View, Text, StatusBar, Alert, ActivityIndicator, ScrollView, Platform, KeyboardAvoidingView} from 'react-native';
import styles from './styles';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Logo from '../../../components/Logo';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Gilroy_Medium} from '../../../const/fonts';
import Txt from '../../../components/Text';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {fetchLogin} from '../../../api/login/actions';
import {NavigationActions, StackActions} from 'react-navigation';

import {getBrand, getDeviceId} from 'react-native-device-info';
import { language } from '../../../const/const'
import firebase from 'react-native-firebase';

const InputView = ({data}) => {
  return (
    <View style={styles.view}>
      {data.map(item => {
        return (
          <Input
            key={item.text}
            text={item.text}
            placeholder={item.placeholder}
            onchange={item.change}
            password={item.password}
            value={item.value}
            keyboardType={item.keyboardType}
          />
        );
      })}
    </View>
  );
};

class Login extends React.Component {
  state = {
    phone_number: '', //'+7',
    password: '', //'',
    error_message: '',
  };
  async componentDidMount() {}
  validatePhone = number => {
    let val = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return val.test(String(number));
  };
  _signIn = async (phone_number, password) => {
    if (phone_number.length < 11 || phone_number.length > 12) {
      Alert.alert(language[this.props.langId].login.alert_phone);
      return;
    }
    if (password.length < 8) {
      Alert.alert(language[this.props.langId].login.alert_password);
      return;
    }
    let phone = phone_number.replace(/^\D+/g, '');
    let formData = new FormData();
    formData.append('phone', phone);
    formData.append('password', password);
    formData.append('device_name', `${getBrand()} ${getDeviceId()}`);
    try {
      this.props.dispatch(fetchLogin(formData,0));
      setTimeout(() => {
        this.props.loginError ? null : this.navigate();
      }, 1000)
      
    } catch (error) {
      console.log('LoginDriver ', error);
    }
  }

  navigate=()=>{
    
    // firebase.messaging().subscribeToTopic(`gruzz${1}`).then((res)=>{
    //   console.log('Уведомление включено')
    // }).catch((error)=>{
    //   console.log('./././././././././././././././././././././././././././')
    //   console.log('error')
    //   console.log(error)
    //   console.log('./././././././././././././././././././././././././././')
    // }) 
    if(Platform.OS === 'ios'){
      firebase.analytics().logEvent('loginDriverIOS',{
        phone: this.state.phone_number
      })
    } else {
      firebase.analytics().logEvent('loginDriver',{
        phone: this.state.phone_number
      })
    }
    
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'Screen'})],
    });
    this.props.navigation.dispatch(resetAction);
  }
  render() {
    const {phone_number, password, error_message} = this.state;
    const {loginLoad}= this.props
    this.list = [
      {
        text: language[this.props.langId].login.phone,
        placeholder: '+ 7',
        change: text => {
          this.setState({phone_number: text});
        },
        password: false,
        value: phone_number,
      },
      {
        text: language[this.props.langId].login.password,
        placeholder: '•  •  •  •  •  •  •  • ',
        change: text => {
          this.setState({password: text});
        },
        password: true,
        value: password,
      },
    ];
    return (
      <>
        <StatusBar barStyle='dark-content'/>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios'? 'padding':'height'} style={styles.container}>
          <ScrollView keyboardShouldPersistTaps='handled'>
          <Logo />
          <View style={{
            alignSelf:'center',
            flexDirection:'row',
            width:80,
            height:30,
            borderRadius:30,
            backgroundColor: '#fff',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            }}>
            <TouchableOpacity onPress={()=>{
              this.props.dispatch({ type: "CHANGE_LANG", payload: 0 })
            }} style={{backgroundColor: this.props.langId===0? '#007BED':'#fff', height: 30, width:40, justifyContent:'center', alignItems:'center',borderRadius:20}}>
              <Text style={{color:this.props.langId===0?'#fff':'#000'}}>Рус</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
              this.props.dispatch({ type: "CHANGE_LANG", payload: 1 })
            }} style={{backgroundColor:this.props.langId===1? '#007BED':'#fff', height: 30, width:40, justifyContent:'center', alignItems:'center',borderRadius:20}}>
              <Text style={{color:this.props.langId===1?'#fff':'#000'}}>Қаз</Text>
            </TouchableOpacity>
          </View>
          <Txt text={language[this.props.langId].login.titleDriver}/>
          <InputView data={this.list} />
          {
            <Text
              style={{
                color: 'red',
                textAlign: 'center',
                fontFamily: Gilroy_Medium,
              }}>
              {error_message}
            </Text>
          }
          {/* <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('ResetPasswordDriver');
            }}>
            <Text
              style={{
                color: '#007BED',
                fontFamily: Gilroy_Medium,
                //marginTop: 12,
                textAlign: 'right',
                marginRight: 32,
              }}>
              {language[this.props.langId].login.forgot}
            </Text>
          </TouchableOpacity> */}
          {loginLoad?
          <ActivityIndicator />:
            <Button
            active
            text={language[this.props.langId].login.bnt}
            onpress={() => this._signIn(phone_number, password)}
          />}
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              marginTop: 36,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: Gilroy_Medium,
              }}>
              {language[this.props.langId].login.register}
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('RegisterDriver')}>
              <Text
                style={{
                  color: '#007BED',
                  fontFamily: Gilroy_Medium,
                }}>
                {' '}
                {language[this.props.langId].register.title}
              </Text>
            </TouchableOpacity>
          </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </>
    );
  }
}

const mapStateToProps = state => ({
  cities: state.cities.cityData,
  cityLoad: state.cities.loading,
  loginLoad: state.login.loading,
  loginError: state.login.error,
  langId: state.appReducer.langId
});
const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
