import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
  Alert
} from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import {img} from '../../const/images';
import Txt from '../../components/Text';
import CodeInput from 'react-native-confirmation-code-input';
import {Gilroy_Medium} from '../../const/fonts';
import {connect} from 'react-redux'

const width = Dimensions.get('window').width;

class CodeInputClass extends React.Component {
  state = {
    time: 30,
    timeLeft: null,
    timer: null,
    activeBtn: false,
    error: ''
  };

  componentDidMount = () =>  this.startTimer(this.state.time);

  _goTo = () => this.props.navigation.replace('AuthClient')

  _goToDriver = () => this.props.navigation.replace('AuthDriver')

  startTimer = timeLeft => {
    clearInterval(this.state.timer);
    let timer = setInterval(() => {
      var timeLeft = this.state.timeLeft - 1;
      if (timeLeft === 0) {
        clearInterval(timer);
      }
      this.setState({ timeLeft: timeLeft });
    }, 1000);
    return this.setState({timeLeft: timeLeft, timer: timer});
  };

  _codeInput=(code)=>{
    console.log(code)
    console.log(this.props.login, this.props.token)

    const token  = this.props.login.token

    var axios = require('axios');

    var FormData = require('form-data');
    var data = new FormData();
    data.append('code', code);

    var config = {
      method: 'post',
      url: 'http://gruz.viker.kz/api/sanctum/verify',
      headers: {  'Authorization': `Bearer ${token}` },
      data : data
    };

    axios(config)
    .then( (response) => {
      if (response.status = 200){
        this.setState({ activeBtn: true })
        //this.props.navigation.replace('Login')
      }
      console.log(JSON.stringify(response.data));
    })
    .catch( (error) => {
      this.setState({ error: 'error'})
      console.log(error);
    });
  }
  success=()=>{
    // this.props.navigation.goBack()
    this.props.navigation.replace('Screen')
    // Alert.alert('Регистрация прошла успешно! ')
  }
  render() {
    const {time, timeLeft, activeBtn, error} = this.state;
    return (
      <>
        <StatusBar barStyle='dark-content' />
        <SafeAreaView style={styles.container}>
          <Logo little />
          <Txt text={'Код из СМС'} />
          <View style={{ height: 200, backgroundColor: '#fff',paddingTop: 30, }}>
            <CodeInput
              codeLength={4}
              inputPosition={'center'}
              space={10}
              keyboardType={'numeric'}
              //secureTextEntry
              cellBorderWidth={1}
              activeColor={'#007BED'}
              inactiveColor={'#B1B9C0'}
              autoFocus={true}
              size={75}
              ref={'codeInput'}
              className={'border-box'}
              onFulfill={(code)=>this._codeInput(code)}
              //containerStyle={{ marginTop: 30, backgroundColor:'red', }}
              codeInputStyle={{
                borderRadius: 10,
                height: 89,
                backgroundColor: '#B1B9C0',
                opacity: 0.5,
              }}
            />
          </View>
          {error==='error' && <Text style={{
            fontSize: 14,
            fontFamily: Gilroy_Medium,
            color: 'red',
            textAlign:'center'
          }}>Ошибка кода</Text>}
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: Gilroy_Medium,
              }}>
              Не пришел код?
            </Text>
            {timeLeft !== 0 && <Text
              style={{
                fontSize: 16,
                fontFamily: Gilroy_Medium,
                color: '#007BED',
                marginTop: 20,
              }}>
              Отправить заново можно через {timeLeft} сек
            </Text>}
            {timeLeft === 0 ? (
              <View style={{ width: '100%' }}>
                <Button
                  text={'Отправить заново'}
                  active
                  onpress={() => this.startTimer(30)}
                />
              </View>
            ) : (
              <View />
            )}
          </View>
          <Button
            text="Далее"
            active={activeBtn}
            onpress={() => activeBtn? this.success(): {}}
          />
          <View
            style={{
              position: 'absolute',
              bottom: -(width / 3.4),
              zIndex: 1
            }}>
            <Image
              source={img}
              style={{
                position:'absolute',
                width: width,
                height: width,
                resizeMode: 'contain',
                bottom: 0
              }}
            />
          </View>
        </SafeAreaView>
      </>
    );
  }
}
const mapStateToProps = state => ({
  login: state.register.user,
  token: state.login.token
});
export default connect(mapStateToProps)(CodeInputClass);
