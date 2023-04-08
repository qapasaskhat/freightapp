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
} from 'react-native';

import Button from '../../components/Button';
import Input from '../../components/Input';
import Header from '../../components/Header';
import {img_bg} from '../../const/images';
import styles from './styles';
import {NavigationActions, StackActions} from 'react-navigation';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import {putUser,fetchUser} from '../../api/users/actions';
import { language } from '../../const/const'

import Modal from 'react-native-modal';
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
    const { user, token, dispatch, navigation  } = this.props;

    let formData = new FormData();
    formData.append('name', login ? login : user.name);
    //formData.append('city_id',1)
    formData.append('_method','PUT')
    try {
      
      dispatch(putUser(user.id, formData, token));
      dispatch(fetchUser(token,1));
      navigation.goBack();
      Toast.show('Сохранено');
    } catch (error) {
      console.warn(error);
    }
  };
  
  componentDidMount=()=>{
    this.setState({ login: this.props.user.name })
  }
  _deleteAccount=()=>{
    const { langId } = this.props

    Alert.alert(
      language[langId].edit.delete,
      language[langId].edit.delete_text,
      [
        {
          text: language[langId].edit.delete,
          style: 'cancel',
          onPress: () => { this._delete() }
        },
        {
          text: language[langId].cabinet.otmena,
          onPress: () => {}
        }
      ],
      {cancelable: false}
    )
  }

  _delete=()=>{
    const { token, user, dispatch, navigation } = this.props;

    var axios = require('axios');
    var config = {
      method: 'delete',
      url: 'http://gruz.viker.kz/api/users/' + user.id,
      headers: { 
        'Authorization': 'Bearer ' + token
      }
    };

    axios(config)
    .then( (response) => {
      dispatch({ type: "LOG_OUT" });
      dispatch({ type: "GET_CITY_NAME", payload: { id: 0, name: 'Алматы' } });
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Screen'})],
      });
      navigation.dispatch(resetAction);
      // console.log(JSON.stringify(response.data));
    })
    .catch( (error) => {
      console.log(error);
    });
  }

  getTerm=()=>{
    this.setState({ termModal: true,load: true })
    var axios = require('axios');

    var config = {
      method: 'get',
      url: 'http://gruz.viker.kz/api/terms',
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
          <Header text={language[this.props.langId].edit.title}
            onpress={() => this.props.navigation.goBack()} />
            <ImageBackground source={img_bg} style={styles.bgImg}>
              <View style={styles.mainContainer}>
                <Text style={styles.langStyle}>{language[this.props.langId].edit.lang}</Text>
                <View style={styles.switchStyle}>
                  <TouchableOpacity onPress={()=>{ this.props.dispatch({ type: "CHANGE_LANG", payload: 0 }) }} 
                    style={[styles.switchBtn,  {backgroundColor: this.props.langId===0? '#007BED':'#fff'}]}>
                    <Text style={{ color:this.props.langId===0?'#fff':'#000' }}>Рус</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{ this.props.dispatch({ type: "CHANGE_LANG", payload: 1 }) }} 
                    style={[styles.switchBtn, {backgroundColor:this.props.langId===1? '#007BED':'#fff'}]}>
                    <Text style={{ color:this.props.langId===1?'#fff':'#000' }}>Қаз</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View>
              <TouchableOpacity style={styles.mainContent} 
                onPress={()=>{ 
                  this.getTerm();
                  this.setState({termModal: true}) }}>
              <Text style={styles.textStyle}>{language[this.props.langId].register.view_agreement}</Text>
            </TouchableOpacity>

            <Modal isVisible={this.state.termModal}>
              <View style={styles.modalView}>
                {this.state.load ? (
                  <ActivityIndicator />
                ) : (
                  <ScrollView horizontal style={styles.bgImg}>
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
                      scalesPageToFit={true}
                      source={{ html: `${this.state.termHtml}` }} />
                    </ScrollView> 
                ) }
                <TouchableOpacity style={styles.modalClose} onPress={()=>{ this.setState({termModal: false}) }}>
                  <Text style={{textAlign:'center',color:'#fff'}}>Закрыть</Text>
                </TouchableOpacity>                    
              </View> 
            </Modal>
              </View>
            <View style={styles.mainContent}>
              <InputView data={this.list} />
            </View>
            <View style={{ height: 16 }}/>
            <Button text={language[this.props.langId].edit.save}
              active onpress={() => { this.saveChange() }} />
            <Button text={language[this.props.langId].edit.logout}
              active onpress={() => { this.signOut() }} />
            <TouchableOpacity style={[styles.btn,{ backgroundColor: '#007BED'}]} onPress={()=> this._deleteAccount() }>
              <Text style={styles.btnText}>{language[this.props.langId].edit.delete}</Text>
            </TouchableOpacity>
            
          </ImageBackground>
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

const deleteTxt = [

]