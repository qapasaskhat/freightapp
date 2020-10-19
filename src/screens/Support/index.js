import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  ImageBackground,
  Image,
  Alert,
  Keyboard
} from 'react-native';
import styles from './styles';
import {FlatList, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Header from '../../components/Header';
import {img_bg} from '../../const/images';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {connect} from 'react-redux';
import axios from 'axios'
import {postSupportMesssages} from '../../api/supportMessages/actions';
import {language} from '../../const/const'

class Support extends React.Component {
  state = {
    text: '',
    load: false,
    email: ''
  };

  componentDidMount=()=>{
    const {user,login} = this.props
    console.log(login)
  }
  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  sendToSupport=()=>{
    Keyboard.dismiss()
    const {login,user} = this.props
    if(!this.validateEmail(this.state.email)){
      Alert.alert(language[this.props.langId].support.emailError)
      return
    }
    if(this.state.text===''){
      Alert.alert(language[this.props.langId].support.messageError)
      return
    }
    this.setState({load: true})
    var axios = require('axios');
    var FormData = require('form-data');
    var data = new FormData();
    data.append('text', this.state.text);
    data.append('user_id', user.id);
    data.append('email',this.state.email);

    var config = {
      method: 'post',
      url: 'http://gruz.sport-market.kz/api/supportMessages',
      headers: { 
        'Authorization': `Bearer ${login.token}`,
        'Accept': 'application/json',
      },
      data : data
    };
    axios(config)
    .then( (response)=> {
      if(response.status===201){
        this.setState({load: false,text:''})
        console.log(JSON.stringify(response.data));
        Alert.alert(language[this.props.langId].support.success,language[this.props.langId].support.text)
      }
    })
    .catch( (error)=> {
      this.setState({load: false})
      Alert.alert('Ошибка отправки сообщение')
      console.log(error);
    });

  }

  render() {
    return (
      <>
        <StatusBar />
        <SafeAreaView style={styles.container}>
          <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
          <Header text={language[this.props.langId].menu.support} left />
          <ImageBackground
            source={img_bg}
            style={{  width: '100%',  height: '100%',marginTop:2  }}>
            <View
              style={{
                backgroundColor: '#fff',
                margin: 20,
                borderRadius: 10,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.18,
                shadowRadius: 1.00,
                elevation: 1,
              }}>
                <Input 
                  placeholder={language[this.props.langId].support.email}
                  value={this.state.email}
                  onchange={text=>{ this.setState({ email: text }) }}
                   />
                   <View style={{marginTop:-22, marginBottom: 10}}>
                <Input
                  multiline
                  top
                  height={300}
                  radius={14}
                  value={this.state.text}
                  placeholder={language[this.props.langId].menu.text}
                  onchange={text => { this.setState({text: text}) }}
                />
              </View>
            </View>
          </ImageBackground>
          </TouchableWithoutFeedback>
          <View
            style={{
              position: 'absolute',
              width: '100%',
              backgroundColor: '#fff',
              bottom: 0,
            }}>
            <Button load={this.state.load} text={language[this.props.langId].menu.btn} active 
              onpress={()=>this.sendToSupport()} />
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.userData,
  login: state.login,
  langId: state.appReducer.langId,
});
export default connect(
  mapStateToProps,
  {postSupportMesssages},
)(Support);
