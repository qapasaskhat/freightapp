import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Header from '../../components/Header';
import {img_bg} from '../../const/images';
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationActions, StackActions} from 'react-navigation';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import {putUser,fetchUser} from '../../api/users/actions';
import { language } from '../../const/const'

import Modal from 'react-native-modal';
import { WebView } from 'react-native-webview';
import AutoHeightWebView from 'react-native-autoheight-webview'


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

class EditClient extends React.Component {
  state = {
    login: '',
    number: '',
    password: '',
    termHtml: '',
    load: false
  };
  signOut = async () => {
    Alert.alert(
      language[this.props.langId].edit.logout,
      language[this.props.langId].edit.logout_text,
      [
        {
          text: language[this.props.langId].edit.logout,
          style: 'cancel',
          onPress: async () => {
            setTimeout(async() => {
              //AsyncStorage.clear();
              this.props.dispatch({ type: "LOG_OUT" });
              this.props.dispatch({ type: "GET_CITY_NAME", payload: {
                id: 0,
                name: 'Алматы'
              } });
              const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Screen'})],
              });
              this.props.navigation.dispatch(resetAction);
            }, 1000)
          },
        },
        {
          text: language[this.props.langId].cabinet.otmena,
          onPress: () => console.log('Cancel Pressed'),
        },
      ],
      {cancelable: false},
    );
  };
  saveChange = () => {
    const {login, phone} = this.state;
    let formData = new FormData();
    formData.append('name', login ? login : this.props.user.name);
    //formData.append('city_id',1)
    formData.append('_method','PUT')
    try {
      
      this.props.dispatch(putUser(this.props.user.id, formData, this.props.token));
      this.props.dispatch(fetchUser(this.props.token,1));
      this.props.navigation.goBack();
      Toast.show('Сохранено');
    } catch (error) {
      console.warn(error);
    }
  };
  componentDidMount=()=>{
    this.setState({
      login: this.props.user.name
    })
  }
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

  render() {
    this.list = [
      {
        text: language[this.props.langId].edit.name,
        placeholder: this.props.user ? this.props.user.name : 'Имя',
        change: text => {
          this.setState({login: text});
        },
        value: this.state.login,
      },
    ];
    return (
      <>
        <StatusBar barStyle={'dark-content'} />
        <SafeAreaView style={styles.container}>
          <Header
            text={language[this.props.langId].edit.title}
            onpress={() => this.props.navigation.goBack()}
          />
          <ImageBackground
            source={img_bg}
            style={{width: '100%', height: '100%'}}>
              <View style={{
                flexDirection:'row', 
                justifyContent:'space-between',
                marginHorizontal:20,
                backgroundColor:'#fff',
                marginTop: 20,
                paddingVertical:10,
                alignItems: 'center',
                borderRadius: 10,
                paddingHorizontal:30,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
                }}>
                <Text style={{
                  fontSize: 15,
                  fontWeight: '600',
                }}>{language[this.props.langId].edit.lang}</Text>
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
              </View>
              <View>
              <TouchableOpacity 
              style={{
                backgroundColor: '#fff',
                shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                  marginTop:6,
                  marginHorizontal:20,
                  paddingVertical:10
              }} onPress={()=>{ 
                this.getTerm()
                this.setState({termModal: true}) }}>
              <Text style={{
                textAlign: 'center',
                color:'#007BED',
                fontWeight:'bold',
                //fontFamily: Gilroy_Medium
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
              </View>
            <View
              style={{
                backgroundColor: '#fff',
                margin: 20,
                borderRadius: 10,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
              <InputView data={this.list} />
            </View>
            <Button
              text={language[this.props.langId].edit.logout}
              active
              onpress={() => { this.signOut() }}
            />
            <Button
              text={language[this.props.langId].edit.save}
              active
              onpress={() => { this.saveChange() }}
            />
          </ImageBackground>
          
          {/* <View
            style={{
              //position: 'absolute',
              //width: '100%',
              backgroundColor: '#fff',
              //bottom: 0,
            }}>
            <Button
              text={language[this.props.langId].edit.save}
              active
              onpress={() => { this.saveChange() }}
            />
          </View> */}
        </SafeAreaView>
      </>
    );
  }
}
const mapStateToProps = state => ({
  user: state.users.userData,
  token: state.login.token,
  langId: state.appReducer.langId,

});
const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditClient);
