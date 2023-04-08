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
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import styles from './styles';
import Header from '../../../components/Header';
import Input from '../../../components/Input';
import {img_bg} from '../../../const/images';
import Button from '../../../components/Button';
import { NavigationActions, StackActions } from 'react-navigation';
import {connect} from 'react-redux';
import {putUser,fetchUser} from '../../../api/users/actions';
import Toast from 'react-native-simple-toast';
import firebase from 'react-native-firebase'
import { language } from '../../../const/const'
import Modal from 'react-native-modal';
import AutoHeightWebView from 'react-native-autoheight-webview'
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
    cityName: '',
    termHtml: '',
    load: false
  };

  saveChange = () => {
    const {login, phone} = this.state;
    const { navigation, dispatch, token, user } = this.props
    let formData = new FormData();
    formData.append('name', login ? login : user.name);
    formData.append('_method','PUT')
    try {
      dispatch(putUser( user.id, formData, token));
      setTimeout(() => { dispatch(fetchUser(token)) }, 500);
      navigation.goBack();

      Toast.show('Сохранено');
    } catch (error) {
      console.warn(error);
    }
  };

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
      this.setState({ load: false, termHtml: response.data.terms })
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  out=()=>{
    const { dispatch, navigation, city_id } = this.props
    dispatch({ type: "LOG_OUT" });

    firebase.messaging().unsubscribeFromTopic(`gruzz${city_id}`).then((res)=>{
      console.log('Уведомление отключено')
    }).catch((error)=>{ console.log(error) })

    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'Screen'})],
    });
    navigation.dispatch(resetAction);
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
          onPress: () => this._delete()
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

  signOut = async () => {
    const { langId } = this.props
    Alert.alert(
      language[langId].edit.logout,
      language[langId].edit.logout_text,
      [
        {
          text: language[langId].edit.logout,
          style: 'cancel',
          onPress: async () => {
            setTimeout(async() => { this.out() }, 1000)
          },
        },
        {
          text: language[langId].cabinet.otmena,
          onPress: () => console.log('Cancel Pressed'),
        },
      ],
      {cancelable: false},
    );
  };

  componentDidMount=()=>{
    const { user } = this.props
    this.setState({ cityName: 'almaty', login: user && user.name })
  }
  goPrevPage = () => { this.props.navigation.goBack() }
  
  render() {

    const { cities, langId, user } = this.props

    this.list = [
      {
        text: language[langId].edit.name,
        placeholder: user ? user.name : language[langId].edit.name,
        change: text => {
          this.setState({login: text});
        },
        value: this.state.login,
      }
    ];

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <Header text={language[langId].edit.title} onpress={this.goPrevPage}  />
          <ImageBackground source={img_bg} style={styles.bgImg}>
              <View style={styles.mainContainer}>
                <Text style={styles.langStyle}>{language[langId].edit.lang}</Text>
                <View style={styles.switchStyle}>
                  <TouchableOpacity onPress={()=>{ dispatch({ type: "CHANGE_LANG", payload: 0 }) }} 
                    style={[styles.switchBtn, {backgroundColor: langId===0? '#007BED':'#fff'}]}>
                    <Text style={{ color: langId===0?'#fff':'#000' }}>Рус</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{ dispatch({ type: "CHANGE_LANG", payload: 1 }) }} 
                    style={[styles.switchBtn, {backgroundColor: langId===1? '#007BED':'#fff' }]}>
                    <Text style={{ color: langId===1?'#fff':'#000' }}>Қаз</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View>
              <TouchableOpacity 
                style={styles.mainContent} onPress={()=>{ 
                  this.getTerm() 
                  this.setState({ termModal: true }) }}>
              <Text style={styles.textStyle}>
                {language[langId].register.view_agreement}
              </Text>
            </TouchableOpacity>
            <Modal isVisible={this.state.termModal}>
              <View style={styles.modalView}>
                {this.state.load ? (
                  <ActivityIndicator />
                ) : (
                  <ScrollView horizontal style={styles.bgImg}>
                    <AutoHeightWebView 
                      originWhitelist={['*']}
                      customStyle={`* { font-family: 'Times New Roman'; }
                                p { font-size: 14px; } `}
                      scalesPageToFit={true}
                      source={{ html: `${this.state.termHtml}` }} />
                    </ScrollView>   
                ) }

                <TouchableOpacity style={styles.bgImg} onPress={()=>{this.setState({termModal: false})}}>
                  <Text style={{ textAlign:'center',color:'#fff' }}>Закрыть</Text>
                </TouchableOpacity>                    
              </View> 
            </Modal>
              </View>
            <View style={styles.mainContent}>
              <InputView data={this.list} />
            </View>
            <View style={{ height: 10 }} />
            <Button text={language[langId].edit.save} active onpress={this.saveChange} />
            <Button text={language[langId].edit.logout} active onpress={this.signOut} />
            <TouchableOpacity onPress={this._deleteAccount} style={[styles.btn,{ backgroundColor: '#007BED'}]}>
              <Text style={styles.btnText}>{language[langId].edit.delete}</Text>
            </TouchableOpacity>
          </ImageBackground>
        </SafeAreaView>
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.userData,
  cities: state.cities.cityData,
  token: state.login.token,
  langId: state.appReducer.langId,
  city_id: state.appReducer.city_id
});
const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect( mapStateToProps,mapDispatchToProps )(EditDriver);
