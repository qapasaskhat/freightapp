import React from 'react';
import {SafeAreaView, View, Text, StatusBar, Alert} from 'react-native';
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
import {getBrand, getDeviceId} from 'react-native-device-info';

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
      Alert.alert('Пожалуйста, введите корректный номер');
      return;
    }
    if (password.length < 8) {
      Alert.alert('Пароль должен состоять как минимум из 8 символов');
      return;
    }
    let phone = phone_number.replace(/^\D+/g, '');
    let formData = new FormData();
    formData.append('phone', phone);
    formData.append('password', password);
    formData.append('device_name', `${getBrand()} ${getDeviceId()}`);
    try {
      this.props.fetchLogin(formData);
      this.props.navigation.navigate('CabinetStack');
    } catch (error) {
      console.log('LoginDriver ', error);
    }

    //console.log(this.validatePhone(phone_number))
    // if (this.validatePhone(phone_number)) {
    //   this.setState({
    //     error_message: '',
    //   });
    //   if (phone_number === '+77007007070') {
    //     if (password === '') {
    //       this.setState({
    //         error_message: 'Введите пароль',
    //       });
    //     } else {
    //       if (password === 'admin') {
    //         let user = {
    //           number: phone_number,
    //           password: password,
    //           status: 'driver',
    //         };
    //         await AsyncStorage.setItem('user', JSON.stringify(user));
    //         this.props.navigation.replace('MainDriver');
    //       } else {
    //         this.setState({
    //           error_message: 'Неверный номер телефона или пароль',
    //         });
    //       }
    //     }
    //   }
    // } else {
    //   this.setState({
    //     error_message: 'Введите корректный номер телефона',
    //   });
    // }
  };
  render() {
    const {phone_number, password, error_message} = this.state;
    this.list = [
      {
        text: 'Введите номер телефона',
        placeholder: '+ 7',
        change: text => {
          this.setState({phone_number: text});
        },
        password: false,
        value: phone_number,
      },
      {
        text: 'Ваш пароль',
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
        <StatusBar />
        <SafeAreaView style={styles.container}>
          <Logo />
          <Txt text="Войти как водитель" />
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
          <TouchableOpacity
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
              Забыли пароль?
            </Text>
          </TouchableOpacity>
          <Button
            active
            text="Войти"
            onpress={() => this._signIn(phone_number, password)}
          />
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
              Еще нет аккаунта?
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('RegisterDriver')}>
              <Text
                style={{
                  color: '#007BED',
                  fontFamily: Gilroy_Medium,
                }}>
                {' '}
                Регистрация
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const mapStateToProps = state => ({
  cities: state.cities.cityData,
  cityLoad: state.cities.loading,
});

export default connect(
  null,
  {fetchLogin},
)(Login);
