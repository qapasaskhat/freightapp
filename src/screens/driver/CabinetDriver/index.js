import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  ImageBackground,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Alert,
  AppState,
  Dimensions
} from 'react-native';

import styles from './styles';
import List from '../../../components/List';
import Item from '../../../components/Item';
import {img_bg} from '../../../const/images';
import {drop} from '../../../const/images';
import Button from '../../../components/Button';
import Push from '../../../components/Push';
import Modal from 'react-native-modal';
import axios from 'axios';
import moment from 'moment';
import localization_ru from 'moment/locale/ru'

import {connect} from 'react-redux';
import {fetchAnnouncements} from '../../../api/Announcements/actions';
import {fetchCity} from '../../../api/city/actions';
import {Gilroy_Bold} from '../../../const/fonts';
import isEmpty from '../../../components/Empty';
import {fetchUser, putUser} from '../../../api/users/actions';
import firebase from 'react-native-firebase'
import { language } from '../../../const/const'
import { fcmService } from '../../../notification'

const {height} = Dimensions.get('screen')

class Main extends React.Component {

  state = {
    isEnabled: false,
    visibleModal: false,
    cityName: 'Алматы',
    userName: '',
    refreshing: false,
    isEnabledMute: false,
    page: 1,
    appState: AppState.currentState,
    pageCount: 1
  };
  componentDidMount = () => {

    this.props.dispatch(fetchCity());
    firebase.notifications().setBadge(0)
    this.props.city_name === 'almaty' && 
    setTimeout(() => {
      this.props.user && this.getUserCity(this.props.user.city_id)
    }, 1000);
    
    console.log(AppState.currentState)
    
    AppState.addEventListener("change", this._handleAppStateChange);

    this.props.dispatch(fetchUser(this.props.token,0))
    this.props.dispatch(fetchAnnouncements(this.props.token,1,this.props.user.city_id))
    fcmService.removeDeliveredAllNotification()
    const { navigation } = this.props;
    navigation.addListener ('didFocus', () =>
      { 
        firebase.notifications().setBadge(0)
        console.log('this.props.city_id', this.props.city_id)
        this.props.dispatch(fetchUser(this.props.token,0, this.props.city_id))
        this.props.dispatch(fetchAnnouncements(this.props.token,1,this.props.user.city_id))
        //this.props.user && this.getUserCity(this.props.user.city_id)
      }
    );
    console.log(this.props.user,'data')
    this.props.user && this.getUserCity(this.props.user.city_id)
  };

  getUserCity=(id)=>{

    console.log('city',this.props.cities)
    this.props.cities &&
    this.props.cities.data &&
    this.props.cities.data.map(item=>{
      if(item.id === id){
        console.log(item.name,'cityid')
        this.props.dispatch({ type: "GET_CITY_NAME", payload: {
          id: id,
          name: item.name
        } })
        this.setState({
          cityName: item.name
        })
      }
    })
  }
  componentWillUnmount() {
    firebase.notifications().setBadge(0)
    AppState.removeEventListener("change", this._handleAppStateChange);
  }
  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      this.onRefresh()
      fcmService.removeDeliveredAllNotification()
    }
    this.setState({ appState: nextAppState });
  };

  onRefresh = () => {
    console.log('onRefresh');
    this.setState({
      refreshing: true,
    });
    this.props.dispatch(fetchAnnouncements(this.props.token,1,this.props.user.city_id));
    this.props.user && this.getUserCity(this.props.user.city_id)
    this.setState({
      refreshing: false,
    });
  };
  onChange = () => {  
    this.props.dispatch({ type: "CHANGE_STATUS_NOTIFICATION" })
    this.props.statusNotification ? 
    firebase.messaging().unsubscribeFromTopic(`gruzz${this.props.city_id}`).then((res)=>{
      Alert.alert('','Уведомление отключено')
    }).catch((error)=>{
     console.log('error')
      console.log(error)
    }):
    firebase.messaging().subscribeToTopic(`gruzz${this.props.city_id}`).then((res)=>{
      Alert.alert('','Уведомление включено')
    }).catch((error)=>{
     console.log('error')
      console.log(error)
    }) 
  }
  renderItem = ({item}) => {
    return (
      <List
        body={item.body}
        date={moment(item.created_at).local('ru',localization_ru).format('lll')}
        phone_number={item.phone}
        from={item.from}
        numberOfLines={1}
        //visiblePhone
        //load ={this.props.loading}
        to={item.to}
        del
        line
        name={item.user && item.user.name}
        onpressOrder={() => this.onPressList(item)} />  )
  }
  onPressList = item => { this.props.navigation.navigate('OrderDriver', {id: item.id}) };
  city = () => {
    this.props.dispatch(fetchCity());
    this.setState({ visibleModal: true });
  };

  handleLoadMore=()=>{
    this.setState({
      page: this.state.page + 1
    }, () => {
      this.props.dispatch(fetchAnnouncements(this.props.token,this.state.page))
    });
  }
  componentDidUpdate=(prevProps)=>{
    if(!this.props.user.id){
      console.log('success')
      //this.props.dispatch(fetchUser(this.props.token,0))
    }else{
      console.log('error')
    }
  }
  formatPhoneNumber(phoneNumberString) {
    let cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    let match = cleaned.match(/^(\d{1}|)?(\d{3})(\d{3})(\d{2})(\d{2})$/);
    if (match) {
      let intlCode = match[1] ? `+${match[1]} ` : '+7 ';
      return [
        intlCode,
        '(',
        match[2],
        ') ',
        match[3],
        '-',
        match[4],
        '-',
        match[5],
      ].join('');
    }
  }
  headerComp = () => {
    return (
      <View style={{backgroundColor: '#fff'}}>
        <Text
          style={{
            textAlign: 'center',
            marginTop: 18,
            fontSize: 20,
            fontFamily: 'Gilroy-Medium',
          }}>
          {language[this.props.langId].cabinet.title}
        </Text>
        <View>
          <Text
            style={{
              fontSize: 12,
              lineHeight: 16,
              color: '#B1B9C0',
              textAlign: 'center',
              fontFamily: 'Gilroy-Medium',
            }}>
            {language[this.props.langId].cabinet.city}
          </Text>
          <TouchableOpacity
            style={{  flexDirection: 'row',justifyContent: 'center',alignItems: 'center' }}
            onPress={() => this.city()}>
            <Text
              style={{
                color: '#007BED',
                fontSize: 18,
                lineHeight: 20,
                fontFamily: 'Gilroy-Medium',
                textAlign: 'center',
              }}>
              {this.props.city_name}
            </Text>
            <Image source={drop}  style={{marginLeft: 6, width: 12, resizeMode: 'contain'}}  />
          </TouchableOpacity>
        </View>
        <Item
          onpress={() => this.props.navigation.navigate('EditProfileDriver')}
          load={this.props.userLaod}
          name={this.props.user ? this.props.user.name : ''}
          phone_number={this.props.user ? this.formatPhoneNumber(this.props.user.phone) : ''}/>
        <Push
          text={language[this.props.langId].cabinet.notification}
          isEnabled={this.props.statusNotification}
          onChange={() => this.onChange()}/>
        <Push
          text={language[this.props.langId].cabinet.mute}
          isEnabled={this.props.muteNotification}
          onChange={() => this.onChangeMute()}/>
      </View>
    );
  };
  onChangeMute=()=>{  this.props.dispatch({ type: "CHANGE_MUTE_NOTIFICATION" }) }
  render() {
    const {loading, data, cities, cityLoad} = this.props;
    return (
      <>
        <StatusBar barStyle='dark-content' />
        <SafeAreaView style={styles.container}>
          {/* <ImageBackground
            source={img_bg}
            style={{  width: '100%',height: '100%',resizeMode: 'center'  }}> */}
            {//loading ? (  <ActivityIndicator />  ) : 
            (
              <FlatList
                data={data }
                refreshing={this.state.refreshing}
                onEndReached={()=>{
                  this.handleLoadMore() 
                }}
                onRefresh={this.onRefresh}
                ListEmptyComponent={isEmpty(language[this.props.langId].cabinet.empty_driver)}
                renderItem={item => this.renderItem(item)}
                ListHeaderComponent={this.headerComp()}
                keyExtractor={(item) => item.id.toString()}
              />
            )}
            <Modal
              style={styles.modal}
              isVisible={this.state.visibleModal}
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
                  paddingVertical: 30,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight:'bold',
                    lineHeight: 22,
                    paddingBottom: 10
                  }}>
                  {language[this.props.langId].register.city}
                </Text>
                {cityLoad ? (
                  <ActivityIndicator />
                ) : (
                  cities &&
                  cities.data &&
                  cities.data.map((i, index) => {
                    return (
                      <TouchableOpacity
                        key={index.toString()}
                        style={{
                          paddingHorizontal: 20,
                          paddingVertical: 7,
                          //borderBottomWidth: 0.6,
                          borderTopWidth: 0.6,
                          width: '100%',
                         // backgroundColor: 'red',
                        }}
                        onPress={() =>{

                          firebase.messaging().unsubscribeFromTopic(`gruzz${this.props.city_id}`).then((res)=>{
                            console.log('Уведомление отключено')
                          }).catch((error)=>{
                           console.log('error')
                            console.log(error)
                          })

                          firebase.messaging().subscribeToTopic(`gruzz${i.id}`).then((res)=>{
                            console.log('Уведомление включено')
                          }).catch((error)=>{
                            console.log('./././././././././././././././././././././././././././')
                            console.log('error')
                            console.log(error)
                            console.log('./././././././././././././././././././././././././././')
                          })

                          let formData = new FormData();
                          formData.append('city_id',i.id)
                          formData.append('_method','PUT')
                          this.props.dispatch(putUser(this.props.user.id, formData, this.props.token));
                          this.props.dispatch(fetchUser(this.props.token,0));

                          this.props.dispatch(fetchAnnouncements(this.props.token,1,i.id))
                          this.props.dispatch({ type: "GET_CITY_NAME", payload: {
                            id: i.id,
                            name: i.name
                          } })
                          this.setState({
                            cityName: i.name,
                            visibleModal: false,
                          })}
                        }>
                        <Text>{i.name}</Text>
                      </TouchableOpacity>
                    );
                  })
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
                    if(this.state.pageCount===1)
                    {}
                    else{
                      this.props.dispatch(fetchCity(this.state.pageCount-1))
                      this.setState({
                        pageCount: this.state.pageCount-1
                      })
                    }
                  }}>
                  <Text style={{textAlign:'center'}}> {'<<<'} </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 36,
                    paddingVertical: 10,
                    backgroundColor: '#ececec',
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    this.setState({
                      visibleModal: false,
                      pageCount: 1
                    });
                  }}>
                  <Text>{language[this.props.langId].cabinet.otmena}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                    backgroundColor: '#ececec',
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    if (this.props.cities.data.length===15)
                    {
                      this.props.dispatch(fetchCity(this.state.pageCount+1));
                      this.setState({
                        pageCount: this.state.pageCount + 1
                      });
                    }
                  }}>
                  <Text style={{textAlign:'center'}}>{'>>>'}</Text>
                </TouchableOpacity>
                </View>
              </View>
            </Modal>
          {/* </ImageBackground> */}
        </SafeAreaView>
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.userData,
  userLaod: state.users.loading,
  data: state.announcements.dataAnnouncements,
  loading: state.announcements.loading,
  error: state.announcements.error,
  cities: state.cities.cityData,
  cityLoad: state.cities.loading,
  token: state.login.token,
  statusNotification: state.appReducer.statusNotification,
  muteNotification: state.appReducer.muteNotification,
  langId: state.appReducer.langId,
  city_name: state.appReducer.city_name,
  city_id: state.appReducer.city_id
});
const mapDispatchToProps = dispatch => ({
  dispatch
});
export default connect(mapStateToProps,mapDispatchToProps)(Main);
