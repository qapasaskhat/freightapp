import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import styles from './styles';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Txt from '../../../components/Text';

import {Gilroy_Medium} from '../../../const/fonts';

import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import Logo from '../../../components/Logo';
import CheckBox from '../../../components/CheckBox';
import {drop} from '../../../const/images';
import {connect} from 'react-redux';
import {fetchCity} from '../../../api/city/actions';
import {postRegister} from '../../../api/register/actions';
import {getBrand, getDeviceId} from 'react-native-device-info';
import { language } from '../../../const/const'
const {height, width} = Dimensions.get('screen');

const InputView = ({data}) => {
  return (
    <View style={styles.view}>
      {data.map(item => {
        return (
          <Input
            text={item.text}
            placeholder={item.placeholder}
            onchange={item.change}
            password={item.password}
            key={item.text}
          />
        );
      })}
    </View>
  );
};
const Login = ({onperss,text,txt}) => {
  return (
    <TouchableOpacity onPress={onperss} style={{margin: 12}}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 14,
          marginTop: 12,
          // fontFamily: Gilroy_Medium,
        }}>
        {text}{' '}
        <Text style={{color: '#007BED', fontFamily: Gilroy_Medium}}>{txt}</Text>
      </Text>
    </TouchableOpacity>
  );
};
class Register extends React.Component {
  state = {
    login: '',
    phone_number: '',
    password: '',
    repeatPassword: '',
    toggleCheckBox: false,
    cityValue: false,
    cityName: 'Almaty',
    allCities: {},
    cityId: 1
  };
  componentDidMount() {
    this.getAllCities()
    //this.props.dispatch(fetchCity());
  }
  getAllCities=()=>{
    var axios = require('axios');
    var config = {
      method: 'get',
      url: 'http://gruz.sport-market.kz/api/cities/',
    };

    axios(config)
    .then( (response) => {
      console.log(JSON.stringify(response.data));
      this.setState({
        allCities: response.data
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  _changeChek = () => {
    this.setState({
      toggleCheckBox: !this.state.toggleCheckBox,
    });
  };
  changeCity=(id)=>{
    const { allCities } = this.state

    allCities.data.map(item=>{
      if(item.id === id){
        this.setState({
          cityName: item.name,
          cityId: item.id
        })
      }
    })
  }
  getCity = (id, name) => {
    const {cities} = this.props;
    this.setState({
      cityName: name,
      cityValue: false,
    });
  };
  createDriver = () => {
    const {
      login,
      phone_number,
      cityName,
      password,
      repeatPassword,
      cityId
    } = this.state;
    if (login === '') {
      Alert.alert('Пожалуйста, заполните поле имя');
      return;
    }
    if (phone_number.length < 11 || phone_number.length > 12) {
      Alert.alert('Пожалуйста, введите корректный номер');
      return;
    }
    if (password.length < 8) {
      Alert.alert('Пароль должен состоять как минимум из 8 символов');
      return;
    }

    if (password !== repeatPassword) {
      Alert.alert('Пароль не совпадает');
      return;
    }

    let formData = new FormData();
    let phone = phone_number.replace(/^\D+/g, '');

    formData.append('name', login);
    formData.append('phone', phone);
    formData.append('password', password);
    formData.append('password_confirmation', password);
    formData.append('city_id', cityId); // TO DO
    formData.append('type', 1);
    formData.append('device_name', `${getBrand()} ${getDeviceId()}`);

    try {
      this.props.dispatch(
        postRegister(formData, () => this.props.navigation.navigate('Login')),
      );
      //this.props.navigation.navigate('CodeInput');
    } catch (error) {
      console.log('createUserDriver error: ', error);
    }
  };

  render() {
    const {toggleCheckBox, cityValue, allCities} = this.state;
    const {cities} = this.props;
    this.list = [
      {
        text: language[this.props.langId].register.name,
        placeholder: 'Александр',
        change: text => {
          this.setState({login: text});
        },
        password: false,
      },
      {
        text: language[this.props.langId].register.phone,
        placeholder: '+ 7',
        change: text => {
          this.setState({phone_number: text});
        },
        password: false,
      },
      {
        text: language[this.props.langId].register.password,
        placeholder: '•  •  •  •  •  •  •  • ',
        change: text => {
          this.setState({password: text});
        },
        password: true,
      },
      {
        text: language[this.props.langId].register.repeatPass,
        placeholder: '•  •  •  •  •  •  •  • ',
        change: text => {
          this.setState({repeatPassword: text});
        },
        password: true,
      },
    ];
    return (
      <>
        <StatusBar />
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <Logo little />
            <Txt text={language[this.props.langId].register.title} />
            <View
              style={{
                paddingVertical: 5,
                backgroundColor: '#fff',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: Gilroy_Medium,
                  color: '#0B0B2A',
                  paddingLeft: 50,
                }}>
                {language[this.props.langId].register.city}
              </Text>
              <TouchableOpacity
                style={{
                  height: height * 0.06,
                  marginHorizontal: 38,
                  backgroundColor: '#fff',
                  borderRadius: 60,
                  justifyContent: 'space-between',
                  paddingHorizontal: 12,
                  shadowColor: 'rgba(170, 178, 190, 0.25)',
                  shadowOffset: {
                    width: 1,
                    height: 2,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 4,
                  elevation: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 20,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: Gilroy_Medium,
                    lineHeight: 14,
                    color: '#0B0B2A',
                  }}>
                  {this.state.cityName}
                </Text>
                <Image
                  source={drop}
                  style={{
                    width: 16,
                    height: 16,
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
              {cityValue && (
                <View
                  style={{
                    marginHorizontal: 38,
                    backgroundColor: '#fff',
                    position: 'absolute',
                    bottom: -10,
                    width: width - 2 * 38,
                    height: '130%',
                    borderRadius: 12,
                    shadowColor: 'rgba(170, 178, 190, 0.25)',
                    shadowOffset: {
                      width: 1,
                      height: 2,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 4,
                    elevation: 5,
                  }}>
                  <ScrollView>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontFamily: Gilroy_Medium,
                      }}>
                      {language[this.props.langId].register.city}
                    </Text>
                    { allCities.data && allCities.data.map(item => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            this.getCity(item.id, item.name);
                          }}
                          style={{
                            borderWidth: 1,
                            margin: 3,
                            borderColor: '#eee',
                            paddingHorizontal: 12,
                            flexDirection: 'row',
                          }}>
                          <Text>{item.id}. </Text>
                          <Text
                            style={{
                              fontFamily: Gilroy_Medium,
                              fontSize: 14,
                            }}>
                            {item.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>
              )}
            </View>
            <InputView data={this.list} />
            <View style={styles.viewCheckBox}>
              <CheckBox
                toggleCheckBox={toggleCheckBox}
                onChange={() => this._changeChek()}
              />
              <TouchableOpacity onPress={() => this._changeChek()}>
                <Text style={styles.text}>
                  {language[this.props.langId].register.agreement}
                </Text>
              </TouchableOpacity>
            </View>
            <Button
              active={toggleCheckBox}
              text={language[this.props.langId].register.next}
              onpress={() =>
                toggleCheckBox
                  ? this.createDriver() //this.props.navigation.navigate('CodeInputDriver')
                  : {}
              }
            />
            <Login
              text={language[this.props.langId].register.login}
              txt = {language[this.props.langId].login.bnt}
              onperss={() => this.props.navigation.navigate('LoginDriver')}
            />
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}
const mapStateToProps = state => ({
  cities: state.cities.cityData,
  cityLoad: state.cities.loading,
  langId: state.appReducer.langId

});
export default connect(mapStateToProps)(Register);
