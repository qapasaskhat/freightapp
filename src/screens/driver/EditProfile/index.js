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
import {putUser,fetchUser} from '../../../api/users/actions';
import Toast from 'react-native-simple-toast';
import {Gilroy_Medium} from '../../../const/fonts';
import firebase from 'react-native-firebase'
import { language } from '../../../const/const'
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
    formData.append('_method','PUT')
    //formData.append('phone', phone ? phone : this.props.user.phone);
    try {
      this.props.dispatch(putUser(this.props.user.id, formData, this.props.token));
      setTimeout(() => {
        this.props.dispatch(fetchUser(this.props.token))
      }, 500);
      this.props.navigation.goBack();
      Toast.show('Сохранено');
    } catch (error) {
      console.warn(error);
    }
  };

  signOut = async () => {
    //AsyncStorage.clear()
    this.props.dispatch({ type: "LOG_OUT" });
    firebase.messaging().unsubscribeFromTopic('gruzz')
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
        text: language[this.props.langId].edit.name,
        placeholder: this.props.user ? this.props.user.name : language[this.props.langId].edit.name,
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
          <Header
            text={language[this.props.langId].edit.title}
            onpress={() => this.props.navigation.goBack()}  />
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
                  fontFamily: Gilroy_Medium,
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
            <View
              style={{
                margin: 20,
                backgroundColor: '#fff',
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
            <Button text={language[this.props.langId].edit.save} active onpress={this.saveChange} />
          </View>
        </SafeAreaView>
      </>
    );
  }
}
const mapStateToProps = state => ({
  user: state.users.userData,
  cities: state.cities.cityData,
  token: state.login.token,
  langId: state.appReducer.langId
});
const mapDispatchToProps = dispatch => ({
  dispatch
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditDriver);
