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
    load: false
  };

  componentDidMount=()=>{
    const {user,login} = this.props
    console.log(login)
  }
  sendToSupport=()=>{
    Keyboard.dismiss()
    const {login,user} = this.props
    //console.log(access_token)
    this.setState({load: true})
    var axios = require('axios');
    var FormData = require('form-data');
    var data = new FormData();
    data.append('text', this.state.text);
    data.append('user_id', user.id);
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
      this.setState({load: false,text:''})
      console.log(JSON.stringify(response.data));
      Alert.alert('Успешно!','Сообшение отправлено')
    })
    .catch( (error)=> {
      this.setState({load: false})
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
            style={{  width: '100%',  height: '100%',  }}>
            <View
              style={{
                backgroundColor: '#fff',
                margin: 20,
                borderRadius: 10,
              }}>
              <Input
                multiline
                top
                height={300}
                radius={14}
                value={this.state.text}
                placeholder={language[this.props.langId].menu.text}
                onchange={text => {
                  this.setState({text: text});
                }}
              />
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
