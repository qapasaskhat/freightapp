import React from 'react';
import {SafeAreaView, View, Text, StatusBar, Image,Dimensions} from 'react-native';
import styles from './styles';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Txt from '../../../components/Text';

import {Gilroy_Medium} from '../../../const/fonts';

import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import Logo from '../../../components/Logo';
import CheckBox from '../../../components/CheckBox';
import {drop} from '../../../const/images'
import { connect } from 'react-redux'
import { fetchCity } from '../../../api/city/actions'
const { height, width } = Dimensions.get('screen')

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
const Login = ({onperss}) => {
  return (
    <TouchableOpacity onPress={onperss} style={{margin: 12}}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 14,
          marginTop: 12,
         // fontFamily: Gilroy_Medium,
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
    toggleCheckBox: false,
    cityValue: false,
    cityName: 'Almaty'
  };
  componentDidMount() {
    this.props.dispatch(fetchCity())
  }
  _changeChek = () => {
    this.setState({
      toggleCheckBox: !this.state.toggleCheckBox,
    });
  };
  getCity=(id,name)=>{
    const { cities } = this.props
    this.setState({
      cityName: name,
      cityValue: false
    })
  }
  render() {
    const {toggleCheckBox, cityValue} = this.state;
    const {cities} = this.props
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
          this.setState({password: text});
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
            <View style={{
              paddingVertical:5,
              backgroundColor: '#fff',
            }}>
              <Text style={{
                fontSize: 14,
                fontFamily: Gilroy_Medium,
                color: '#0B0B2A',
                paddingLeft: 50
              }}>Выберите город</Text>
              <TouchableOpacity style={{
                height: height*0.06,
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
                marginBottom: 20
              }}>
                <Text style={{
                  fontSize: 16,
                  fontFamily: Gilroy_Medium,
                  lineHeight: 14,
                  color: '#0B0B2A'
                }}>{this.state.cityName}</Text>
                <Image source={drop} style={{
                  width:16,
                  height: 16,
                  resizeMode: 'contain'
                }} />
              </TouchableOpacity>
              { cityValue && 
             <View style={{
                marginHorizontal: 38,
                backgroundColor: '#fff', 
                position: 'absolute',
                bottom: -10,
                width: width-2*38,
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
                <Text style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontFamily: Gilroy_Medium
                  }}>Выберите город</Text>
                {
                  cities.data.map(item=>{
                    return(
                      <TouchableOpacity onPress={()=>{this.getCity(item.id, item.name)}} style={{
                        borderWidth: 1,
                        margin: 3,
                        borderColor: '#eee',
                        paddingHorizontal: 12,
                        flexDirection: 'row'
                      }}>
                        <Text>{item.id}. </Text>
                      <Text style={{
                        fontFamily: Gilroy_Medium,
                        fontSize: 14,
                      }}>{item.name}</Text>
                      </TouchableOpacity>
                    )
                  })
                }
                </ScrollView>
              </View>}
              
            </View>
            <InputView data={this.list} />
            <View style={styles.viewCheckBox}>
              <CheckBox
                toggleCheckBox={toggleCheckBox}
                onChange={() => this._changeChek()}
              />
              <TouchableOpacity onPress={()=> this._changeChek()}>
              <Text style={styles.text}>
                Я согласен с условиями {'\n'}пользовательского соглашения
              </Text>
              </TouchableOpacity>
            </View>
            <Button
              active={toggleCheckBox}
              text="Далее"
              onpress={() => toggleCheckBox? this.props.navigation.navigate('CodeInputDriver'):{}}
            /> 
            <Login onperss={() => this.props.navigation.navigate('LoginDriver')} />
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}
const mapStateToProps = state => ({
  cities: state.cities.cityData,
  cityLoad: state.cities.loading
})
export default connect(mapStateToProps)(Register);
