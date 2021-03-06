import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
  Alert, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView, Platform
} from 'react-native';
import styles from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Txt from '../../components/Text';
import {Gilroy_Medium} from '../../const/fonts';
import { ScrollView} from 'react-native-gesture-handler';
import Logo from '../../components/Logo';
import CheckBox from '../../components/CheckBox';
import {drop} from '../../const/images';

const {height, width} = Dimensions.get('screen');

import {connect} from 'react-redux';
import {fetchCity} from '../../api/city/actions';
import {postRegister} from '../../api/register/actions';
import {getBrand, getDeviceId} from 'react-native-device-info';
import { language } from '../../const/const'
import Modal from 'react-native-modal';
import { WebView } from 'react-native-webview';
import AutoHeightWebView from 'react-native-autoheight-webview'

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
            keyboardType={item.keyboardType}
          />
        );
      })}
    </View>
  );
};

const hhtml = "<h1>hello</h1>"

const Login = ({onperss, text, txt}) => {
  return (
    <TouchableOpacity onPress={onperss} style={{margin: 12}}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 14,
          marginTop: '3%',
          fontFamily: Gilroy_Medium,
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
    cityName: 'Выберите город',
    cityId: 1,
    allCities: {},
    termModal:false,
    termHtml: '',
    load:false,
    page: 1,
    visibleModal: false
  };
  componentDidMount=()=> {
    this.props.fetchCity()
    //this.getAllCities()
    console.log('fetchCity')
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
    this.setState({
      cityName: name,
      cityValue: false,
    });
  };
  getTerm=()=>{
    this.setState({
      termModal: true,
      load: true
    })
    var axios = require('axios');

    var config = {
      method: 'get',
      url: 'http://gruz.sport-market.kz/api/terms',
      headers: { }
    };

    axios(config)
    .then( (response) => {
      this.setState({
        load: false,
        termHtml: response.data.terms
      })
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }
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
        this.props.navigation.replace('CodeInput'),
      );
      //this.props.navigation.navigate('CodeInput');
    } catch (error) {
      console.log('createUser error: ', error);
    }
  };
  render() {
    const {toggleCheckBox, cityValue, allCities} = this.state;
    const { cities, cityLoad } = this.props
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
        <StatusBar barStyle='dark-content' />
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ?'padding': 'height'} style={styles.container}>
          <ScrollView>
            <View style={{height: 20,}} />
            <Logo little />
            <Txt text={language[this.props.langId].register.title} />
            <View
              style={{
                paddingVertical: 10,
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
                style={styles.touch}
                onPress={() => {
                  this.setState({visibleModal: true});
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: Gilroy_Medium,
                    lineHeight: 16,
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
              <Modal
              isVisible={this.state.visibleModal}
              style={styles.modal}
              backdropColor="#B4B3DB"
              backdropOpacity={0.5}
              animationIn="zoomInUp"
              animationOut="zoomOut"
              animationInTiming={600}
              animationOutTiming={600}
              backdropTransitionInTiming={600}
              backdropTransitionOutTiming={600}>
              <View
                style={{
                  backgroundColor: '#fff',
                  height: height,
                  alignItems: 'center',
                  paddingTop: 50,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    paddingBottom: 10
                    //fontFamily: Gilroy_Bold,
                  }}>
                  {language[this.props.langId].register.city}
                </Text>
                <ScrollView >
                {
                  
                  cities &&
                  cities.data &&
                  cities.data.map((i, index) => {
                    return (
                      <TouchableOpacity
                        key={index.toString()}
                        onPress={()=>{
                          this.changeCity(i.id)
                          this.setState({visibleModal: false,page: 1})
                        }}
                        style={{
                          paddingHorizontal: 20,
                          paddingVertical: 7,
                          borderTopWidth: 0.6
                        }}>
                        <Text>{i.name}</Text>
                      </TouchableOpacity>
                    );
                  }
                )}
                <View style={{
                  flexDirection:'row',
                  justifyContent:'space-evenly',
                  width: '100%',
                  borderTopWidth: 0.6,
                  paddingTop: 6
                }}>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                    backgroundColor: '#ececec',
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    if(this.state.page===1)
                    {}
                    else{
                      this.props.fetchCity(this.state.page-1)
                      this.setState({
                        page: this.state.page-1
                      })
                    }
                  }}>
                  <Text style={{textAlign:'center'}}> {'<<<'} </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                    backgroundColor: '#ececec',
                    borderRadius: 10,
                  }}
                  onPress={() => { this.setState({  visibleModal: false, page: 1  });
                  }}>
                  <Text style={{textAlign:'center'}}>{language[this.props.langId].cabinet.otmena}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                    backgroundColor: '#ececec',
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    if (cities && cities.data && cities.data.length===15)
                    {
                      this.props.fetchCity(this.state.page+1)
                      this.setState({
                        page: this.state.page + 1
                      });
                    }
                  }}>
                  <Text style={{textAlign:'center'}}>{'>>>'}</Text>
                </TouchableOpacity>
                </View>
                </ScrollView>
              </View>
            </Modal>
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
                    {allCities.data && allCities.data.map(item => {
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
                onChange={() => this._changeChek()}  />
              <TouchableOpacity onPress={() => this._changeChek()}>
                <Text style={[styles.text]}>
                  {language[this.props.langId].register.agreement}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={()=>{
              this.getTerm()
            }}>
              <Text style={{
                textAlign: 'center',
                color:'#007BED',
                fontFamily: Gilroy_Medium
              }}>{language[this.props.langId].register.view_agreement}</Text>
            </TouchableOpacity>
            <Modal isVisible={this.state.termModal}>
              <View style={{
                width:'100%',
                height:'90%',
                backgroundColor: '#fff',
                borderRadius: 11,
                padding: 30
              }}>
                {this.state.load?
                <ActivityIndicator />:
                <ScrollView horizontal style={{width: '100%', height: '100%'}}>
                <AutoHeightWebView 
                  originWhitelist={['*']}
                  customStyle={`
                            * {
                              font-family: 'Times New Roman';
                            }
                            p {
                              font-size: 14px;
                            }
                          `}
                  //viewportContent={'width=device-width, user-scalable=no'}
                  scalesPageToFit={true}
                  source={{ html: `${this.state.termHtml}` }} />
                  </ScrollView>               
                }
                <TouchableOpacity style={{
                  backgroundColor:'#007BED',
                  padding:10,
                  borderRadius: 30
                }} onPress={()=>{this.setState({termModal: false})}}>
                  <Text style={{textAlign:'center',color:'#fff'}}>Закрыть</Text>
                </TouchableOpacity>                    
              </View> 
            </Modal>
            <Button
              active={toggleCheckBox}
              text={language[this.props.langId].register.next}
              onpress={() => (toggleCheckBox ? this.createUser() : {})} />
            <Login 
              txt={language[this.props.langId].login.bnt} 
              text={language[this.props.langId].register.login} 
              onperss={() => this.props.navigation.navigate('Login')} />
          </ScrollView>
        </KeyboardAvoidingView>
      </>
    );
  }
}
const mapStateToProps = state => ({
  cities: state.cities.cityData,
  cityLoad: state.cities.loading,
  langId: state.appReducer.langId
});
export default connect(
  mapStateToProps,
  {postRegister, fetchCity},
)(Register);
