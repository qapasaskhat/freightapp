import React, { Component } from 'react';
import { View, Text, StatusBar, SafeAreaView, StyleSheet, Dimensions, Image } from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';
import { NavigationActions, StackActions } from 'react-navigation';
import Logo from '../../components/Logo';
import Txt from '../../components/Text';
import Button from '../../components/Button';
import { img } from '../../const/images';
import { Gilroy_Medium } from '../../const/fonts';

import {connect} from 'react-redux'
import { fetch_success_login } from '../../api/login/actions'
import { fetchUser } from '../../api/users/actions'
import { fetchCity } from '../../api/city/actions'

const width = Dimensions.get('window').width;

class CodeInputLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data: {},
        time: 30,
        timeLeft: null,
        timer: null,
        activeBtn: false,
        error: ''
    };
  }

  componentDidMount=()=>{
    this.setState({ data: this.props.navigation.state.params.data }, () => this.startTimer(30))
    this.props.fetchCity()
  }

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
    const { data } = this.state
    const { fetch_success_login, navigation, fetchUser } = this.props

    var axios = require('axios');
    var FormData = require('form-data');
    var formData = new FormData();
    formData.append('code', code);

    var config = {
        method: 'post',
        url: 'http://gruz.viker.kz/api/sanctum/verify',
        headers: { 
            'Authorization': 'Bearer ' + data.token, 
        },
        data : formData
    };
    
    // fetch_success_login(data.token, 1)
    // fetchUser(data.token, 1)
    // navigation.navigate('Screen')

    axios(config)
    .then( () => {
        this.setState({
            activeBtn: true,
        },()=>{
            fetch_success_login(data.token, 1)
            fetchUser(data.token, 1)
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({routeName: 'Screen'})],
            });
            navigation.dispatch(resetAction);
        })
    })
    .catch((error)  => console.log(error));
  }

  render() {
    const { error, timeLeft } = this.state
    return (
      <>
        <StatusBar barStyle='dark-content' />
        <SafeAreaView style={styles.container}>
            <Logo little />
            <Txt text={'Код из СМС'} />
            <View style={{ height: 200, backgroundColor: '#fff', paddingTop: 30 }}>
                <View style={{ height: 200, backgroundColor: '#fff', paddingTop: 30 }}>
                    <CodeInput
                        codeLength={4}
                        inputPosition={'center'}
                        space={10}
                        keyboardType={'numeric'}
                        cellBorderWidth={1}
                        activeColor={'#007BED'}
                        inactiveColor={'#B1B9C0'}
                        autoFocus={true}
                        size={75}
                        ref={'codeInput'}
                        className={'border-box'}
                        onFulfill={(code)=>this._codeInput(code)}
                        codeInputStyle={styles.codeInputStyle} />
                </View>
            
            {
                error === 'error' && <Text style={styles.errorTxt}>Ошибка кода</Text>
            }
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.notCodeTxt}>
                    Не пришел код?
                </Text>
                {
                    timeLeft !== 0 
                    && <Text style={styles.timerTxt}>
                        Отправить заново можно через {timeLeft} сек
                    </Text>
                }
                {
                    timeLeft === 0 && (
                    <View style={{ width: '100%' }}>
                        <Button text={'Отправить заново'} active onpress={() => this.startTimer(30)} />
                    </View>)
                }
            </View>
        </View>
        {/* <Button text="Далее" active={activeBtn} onpress={() => activeBtn && this.success()} /> */}
        <Text></Text>
        <View style={styles.footer}>
            <Image source={img} style={styles.footerImg}/>
        </View>
        </SafeAreaView>
      </>
    );
  }
}
const mapStateToProps = state => ({
    login: state.login
});
export default connect(mapStateToProps,{
    fetch_success_login,
    fetchUser,
    fetchCity
}) (CodeInputLogin);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    codeInputStyle: {
        borderRadius: 10,
        height: 89,
        backgroundColor: '#B1B9C0',
        opacity: 0.5,
        fontSize: 20
    },
    errorTxt: {
        fontSize: 14,
        fontFamily: Gilroy_Medium,
        color: 'red',
        textAlign:'center'
    },
    notCodeTxt: {
        fontSize: 16,
        fontFamily: Gilroy_Medium,
    },
    timerTxt: {
        fontSize: 16,
        fontFamily: Gilroy_Medium,
        color: '#007BED',
        marginTop: 20,
    },
    footer: {
        position: 'absolute',
        bottom: -(width / 3.4),
        zIndex: 1
    },
    footerImg: {
        position:'absolute',
        width: width,
        height: width,
        resizeMode: 'contain',
        bottom: 0
    }
})