import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';
import styles from './styles';
import {drop} from '../../../const/images';
import Header from '../../../components/Header';
import Input from '../../../components/Input';
import {img_bg} from '../../../const/images';
import Button from '../../../components/Button';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationActions, StackActions} from 'react-navigation';
import {connect} from 'react-redux';
import {putUser} from '../../../api/users/actions';
import Toast from 'react-native-simple-toast';
import {Gilroy_Medium} from '../../../const/fonts';

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
            value={item.value}
          />
        );
      })}
    </View>
  );
};

class EditDriver extends React.Component {
  state = {
    login: '',
    number: '',
    password: '',
    newPassword: '',
    cityValue: false,
    cityName: ''
  };

  saveChange = () => {
    const {login, phone} = this.state;
    let formData = new FormData();
    formData.append('name', login ? login : this.props.user.name);
    //formData.append('phone', phone ? phone : this.props.user.phone);

    try {
      this.props.dispatch(putUser(this.props.user.id, formData, this.props.token));
      this.props.navigation.goBack();
      Toast.show('Сохранено');
    } catch (error) {
      console.warn(error);
    }
  };

  signOut = async () => {
    //AsyncStorage.clear()
    this.props.dispatch({ type: "LOG_OUT" });
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'Screen'})],
    });
    this.props.navigation.dispatch(resetAction);
  };

  componentDidMount=()=>{
    this.setState({
      cityName: 'almaty',
      login: this.props.user && this.props.user.name
    })
  }
  
  render() {
    const {cities} = this.props
    this.list = [
      {
        text: 'Введите ваше имя',
        placeholder: this.props.user ? this.props.user.name : 'Имя',
        change: text => {
          this.setState({login: text});
        },
        value: this.state.login,
      },
      // {
      //   text: 'Введите старый пароль',
      //   placeholder: '',
      //   change: text => {
      //     this.setState({password: text});
      //   },
      //   value: this.state.password
      // },
      // {
      //   text: 'Введите новый пароль',
      //   placeholder: '',
      //   change: text => {
      //     this.setState({password: text});
      //   },
      //   value: this.state.password
      // },
    ];
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <Header
            text="Редактировать профиль"
            onpress={() => this.props.navigation.goBack()}
          />
          <ImageBackground
            source={img_bg}
            style={{width: '100%', height: '100%'}}>
            <View
              style={{
                margin: 20,
                backgroundColor: '#fff',
                borderRadius: 10,
              }}>
              <InputView data={this.list} />
            </View>
            {/* <View style={{paddingVertical: 5,backgroundColor: '#fff'}}>
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
                onPress={()=>{this.setState({cityValue: true})}}
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
              {this.state.cityValue && (
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
                    {cities.data.map(item => {
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
            </View> */}
            {/* <Button text={'Изменить пароль'} active onpress={()=>{}}/> */}
            <Button
              text={'Выйти'}
              active
              onpress={() => {
                this.signOut();
              }}
            />
          </ImageBackground>
          <View
            style={{
              position: 'absolute',
              width: '100%',
              backgroundColor: '#fff',
              bottom: 0,
            }}>
            <Button text={'Сохранить'} active onpress={this.saveChange} />
          </View>
        </SafeAreaView>
      </>
    );
  }
}
const mapStateToProps = state => ({
  user: state.users.userData,
  cities: state.cities.cityData,
  token: state.login.token
});
const mapDispatchToProps = dispatch => ({
  dispatch
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditDriver);
