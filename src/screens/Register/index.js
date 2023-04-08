import React from 'react';
import {
  SafeAreaView,View,Text,StatusBar,Image,Dimensions,
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
import AutoHeightWebView from 'react-native-autoheight-webview'
import firebase from 'react-native-firebase';

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
  componentDidMount = () =>  this.props.fetchCity()

  getAllCities=()=>{
    var axios = require('axios');
    var config = {
      method: 'get',
      url: 'http://gruz.viker.kz/api/cities/',
    };

    axios(config)
    .then( (response) => this.setState({ allCities: response.data }) )
    .catch( (error) => console.log(error) );
  }

  changeCity=(id)=> this.props.cities.data.map((city)=> city.id === id && this.setState({ cityName: city.name, cityId: city.id }) )

  _changeCheck = () => this.setState({ toggleCheckBox: !this.state.toggleCheckBox });

  getCity = (id, name) => this.setState({ cityName: name, cityValue: false });
  
  
  getTerm=()=>{
    this.setState({ termModal: true, load: true })
    var axios = require('axios');

    var config = {
      method: 'get',
      url: 'http://gruz.viker.kz/api/terms',
      headers: { }
    };

    axios(config)
    .then( (response) => this.setState({ load: false, termHtml: response.data.terms }) )
    .catch( (error) => console.log(error) );
  }

  createUser = () => {

    const { login, phone_number, cityName, password, repeatPassword, cityId } = this.state;
    if (login === '') {
      Alert.alert('Пожалуйста, заполните поле имя');
      return;
    }
    if (phone_number.length < 11 || phone_number.length > 12) {
      Alert.alert('Пожалуйста, введите корректный номер');
      return;
    }
    // if (password.length < 8) {
    //   Alert.alert('Пароль должен состоять как минимум из 8 символов');
    //   return;
    // }
    // if (password !== repeatPassword) {
    //   Alert.alert('Пароль не совпадает');
    //   return;
    // }
    let formData = new FormData();
    let phone = phone_number.replace(/^\D+/g, '');
    var axios = require('axios');

    formData.append('name', login);
    formData.append('phone', phone);
    formData.append('password', '12345678');
    formData.append('password_confirmation', '12345678');

    formData.append('city_id', cityId); //TO DO
    formData.append('type', 0);
    formData.append('device_name', `${getBrand()} ${getDeviceId()}`);

    console.log(formData);

    var config = {
      method: 'post',
      url: 'http://gruz.viker.kz/api/sanctum/register',
      headers: { },
      data : formData
    };
    
    axios(config)
    .then( (response) => this.navigateApp(login, phone, response.data))
    .catch( (error) => console.log(error));

    // try {
    //   this.props.postRegister(formData, () => {
    //     if(Platform.OS === 'ios'){
    //       firebase.analytics().logEvent('registerClientIOS',{ name: login, phone: phone })
    //     } else {
    //       firebase.analytics().logEvent('registerClient',{ name: login, phone: phone })
    //     }
    //     this.props.navigation.replace('CodeInput')
    //   },
    //   );
    //   //this.props.navigation.navigate('CodeInput');
    // } catch (error) {
    //   console.log('createUser error: ', error);
    // }
  };

  navigateApp=(login, phone, data)=>{
    Alert.alert('На ваш номер отправлен код!')
    if(Platform.OS === 'ios'){
      firebase.analytics().logEvent('registerClientIOS',{ name: login, phone: phone })
    } else {
      firebase.analytics().logEvent('registerClient',{ name: login, phone: phone })
    }
    this.props.navigation.replace('CodeInputLogin', { data: data} )
  }

  render() {
    const {toggleCheckBox, cityValue, allCities, cityName, visibleModal, page } = this.state;
    const { cities, cityLoad, langId, navigation } = this.props;

    this.list = [
      {
        text: language[langId].register.name,
        placeholder: 'Александр',
        change: text => this.setState({login: text}),
        password: false,
      },
      {
        text: language[langId].register.phone,
        placeholder: '+ 7',
        change: text => this.setState({phone_number: text}),
        password: false,
      },
      // {
      //   text: language[this.props.langId].register.password,
      //   placeholder: '•  •  •  •  •  •  •  • ',
      //   change: text => {
      //     this.setState({password: text});
      //   },
      //   password: true,
      // },
      // {
      //   text: language[this.props.langId].register.repeatPass,
      //   placeholder: '•  •  •  •  •  •  •  • ',
      //   change: text => {
      //     this.setState({repeatPassword: text});
      //   },
      //   password: true,
      // },
    ];

    return (
      <>
        <StatusBar barStyle='dark-content' />
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ?'padding': 'height'} style={styles.container}>
          <ScrollView>
            <View style={{height: 20,}} />
            <Logo little />
            <Txt text={language[langId].register.title} />
            <View style={styles.body}>
              <Text style={styles.cityTitle}>
                {language[langId].register.city}
              </Text>
              <TouchableOpacity style={styles.touch} onPress={() => this.setState({visibleModal: true}) }>
                <Text style={styles.cityName}>
                  {cityName}
                </Text>
                <Image source={drop} style={styles.dropImg} />
              </TouchableOpacity>

              <Modal
                isVisible={visibleModal}
                style={{ margin: 0,paddingTop: 30 }}
                backdropColor="#B4B3DB"
                backdropOpacity={0.5}
                animationIn="zoomInUp"
                animationOut="zoomOut"
                animationInTiming={600}
                animationOutTiming={600}
                backdropTransitionInTiming={600}
                backdropTransitionOutTiming={600}>
              <View style={styles.cityModalContainer}>
                <Text style={styles.cityModalTitle}>
                  {language[langId].register.city}
                </Text>
                <ScrollView >
                {
                  cities &&
                  cities.data &&
                  cities.data.map((i, index) => {
                    return (
                      <TouchableOpacity key={index.toString()}
                        onPress={()=> this.setState({visibleModal: false, page: 1},()=> this.changeCity(i.id) ) }
                        style={styles.cityModalSelect}>
                        <Text>{i.name}</Text>
                      </TouchableOpacity>
                    );
                  }
                )}
                <View style={styles.cityModalBtnRow}>
                <TouchableOpacity
                  style={styles.cityModalBtn}
                  onPress={() => {
                    if(page===1)
                    {}
                    else{
                      this.props.fetchCity(page-1)
                      this.setState({ page: page-1 })
                    }
                  }}>
                  <Text style={{textAlign:'center'}}> {'<<<'} </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cityModalBtn} onPress={() => this.setState({  visibleModal: false, page: 1  }) }>
                  <Text style={{ textAlign:'center' }}>{language[langId].cabinet.otmena}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cityModalBtn}
                  onPress={() => {
                    if (cities && cities.data && cities.data.length===15)
                    {
                      this.props.fetchCity(page+1)
                      this.setState({ page: page + 1 });
                    }
                  }}>
                  <Text style={{textAlign:'center'}}>{'>>>'}</Text>
                </TouchableOpacity>
                </View>
                </ScrollView>
              </View>
            </Modal>
            </View>
            <InputView data={this.list} />
            <View style={styles.viewCheckBox}>
              <CheckBox toggleCheckBox={toggleCheckBox} onChange={() => this._changeCheck()}  />
              <TouchableOpacity activeOpacity={0.5} onPress={() => this._changeCheck()}>
                <Text style={[styles.text]}>
                  {language[langId].register.agreement}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={this.getTerm}>
              <Text style={styles.agreementText}>
                {language[langId].register.view_agreement}
              </Text>
            </TouchableOpacity>

            <Modal isVisible={this.state.termModal}>
              <View style={styles.termModal}>
                {this.state.load?
                <ActivityIndicator />:
                <ScrollView horizontal style={{width: '100%', height: '100%'}}>
                  <AutoHeightWebView 
                    originWhitelist={['*']}
                    customStyle={`* { font-family: 'Times New Roman'; }p { font-size: 14px; }`}
                    //viewportContent={'width=device-width, user-scalable=no'}
                    scalesPageToFit={true}
                    source={{ html: `${this.state.termHtml}` }} />
                  </ScrollView>               
                }
                <TouchableOpacity style={styles.termModalClose} onPress={()=> this.setState({termModal: false}) }>
                  <Text style={styles.termModalCloseText}>Закрыть</Text>
                </TouchableOpacity>                    
              </View> 
            </Modal>
            <Button
              active={toggleCheckBox}
              text={language[langId].register.next}
              onpress={() => (toggleCheckBox ? this.createUser() : {})} />
            <Login 
              txt={language[langId].login.bnt} 
              text={language[langId].register.login} 
              onperss={() => navigation.navigate('Login')} />
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
