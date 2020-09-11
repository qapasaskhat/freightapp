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
import Input from '../../components/Input';
import Button from '../../components/Button';
import Txt from '../../components/Text';
import {Gilroy_Medium} from '../../const/fonts';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import Logo from '../../components/Logo';
import CheckBox from '../../components/CheckBox';
import {drop} from '../../const/images';
const {height, width} = Dimensions.get('screen');
import {connect} from 'react-redux';
import {fetchCity} from '../../api/city/actions';
import {postRegister} from '../../api/register/actions';
import {getBrand, getDeviceId} from 'react-native-device-info';

const InputView = ({data}) => {
  return (
    <View style={styles.view}>
      {data.map((item, index) => {
        return (
          <Input
            key={index.toString()}
            text={item.text}
            placeholder={item.placeholder}
            onchange={item.change}
            password={item.password}
          />
        );
      })}
    </View>
  );
};

const Login = ({onperss}) => {
  return (
    <TouchableOpacity onPress={onperss} style={{margin: 12}}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 14,
          marginTop: '3%',
          fontFamily: Gilroy_Medium,
        }}>
        Уже есть аккаунт?{' '}
        <Text style={{color: '#007BED', fontFamily: Gilroy_Medium}}>Войти</Text>
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
    cityName: '',
    cityId: 1
  };
  componentDidMount=()=> {
    setTimeout(() => {
      this.props.fetchCity();
    }, 1000);
    
    console.log('fetchCity')
    this.changeCity(1)
  }
  changeCity=(id)=>{
    const { cities } = this.props
    cities.data.map(item=>{
      if(item.id === id){
        this.setState({
          cityName: item.name,
          cityId: item.id
        })
      }
    })
  }
  _changeChek = () => {
    this.setState({
      toggleCheckBox: !this.state.toggleCheckBox,
    });
  };

  getCity = (id, name) => {
    const {cities} = this.props;
    this.setState({
      cityName: name,
      cityValue: false,
    });
  };

  createUser = () => {
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

    formData.append('city_id', cityId); //TO DO
    formData.append('type', 0);
    formData.append('device_name', `${getBrand()} ${getDeviceId()}`);

    try {
      this.props.postRegister(formData, () =>
        this.props.navigation.navigate('Login'),
      );
      //this.props.navigation.navigate('CodeInput');
    } catch (error) {
      console.log('createUser error: ', error);
    }
  };
  render() {
    const {toggleCheckBox, cityValue} = this.state;
    const {cities} = this.props;
    this.list = [
      {
        text: 'Введите ваше имя',
        placeholder: 'Александр',
        change: text => {
          this.setState({login: text});
        },
        password: false,
      },
      {
        text: 'Введите номер телефона',
        placeholder: '+ 7',
        change: text => {
          this.setState({phone_number: text});
        },
        password: false,
      },
      {
        text: 'Ваш пароль',
        placeholder: '•  •  •  •  •  •  •  • ',
        change: text => {
          this.setState({password: text});
        },
        password: true,
      },
      {
        text: 'Повторите пароль',
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
            <Txt text={'Регистрация'} />
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
                Выберите город
              </Text>
              <TouchableOpacity
                style={styles.touch}
                onPress={() => {
                  this.setState({cityValue: true});
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
                      Выберите город
                    </Text>
                    {cities.data && cities.data.map(item => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            this.changeCity(item.id)
                            this.setState({cityValue: false})
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
                <Text style={[styles.text]}>
                  Я согласен с условиями {'\n'}пользовательского соглашения
                </Text>
              </TouchableOpacity>
            </View>
            <Button
              active={toggleCheckBox}
              text="Далее"
              onpress={() => (toggleCheckBox ? this.createUser() : {})}
            />
            <Login onperss={() => this.props.navigation.navigate('Login')} />
          </ScrollView>
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
  mapStateToProps,
  {postRegister, fetchCity},
)(Register);
