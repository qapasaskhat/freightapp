import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Alert,
  AppState,
  Dimensions,
  Share,
  Platform
} from 'react-native';

import styles from './styles';
import List from '../../../components/List';
import Item from '../../../components/Item';
import {drop} from '../../../const/images';
import Push from '../../../components/Push';
import Modal from 'react-native-modal';
import moment from 'moment';
import localization_ru from 'moment/locale/ru'

import {connect} from 'react-redux';
import {fetchAnnouncements} from '../../../api/Announcements/actions';
import {fetchCity} from '../../../api/city/actions';
import isEmpty from '../../../components/Empty';
import {fetchUser, putUser} from '../../../api/users/actions';
import firebase from 'react-native-firebase'
import { language } from '../../../const/const'
import { fcmService } from '../../../notification'

const {height} = Dimensions.get('screen')
const share = require('../../../assets/icons/bi_share.png')
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
    const { dispatch, user, token, navigation, city_name, city_id } = this.props

    if(Platform.OS === 'ios'){
      firebase.analytics().logEvent('driverUsingAppIOS',{
        driver_id: user.id,
        driver_name: user.name,
        driver_phone: user.phone,
        driver_city_id: user.city_id
      })
    } else {
      firebase.analytics().logEvent('driverUsingApp',{
        driver_id: user.id,
        driver_name: user.name,
        driver_phone: user.phone,
        driver_city_id: user.city_id
      })
    }

    fcmService.register(
      this.onRegister,
      this.onNotification,
      this.onOpenNotification,
    )

    dispatch(fetchCity());
    firebase.notifications().setBadge(0)
    city_name === 'Алматы' && 
    setTimeout(() => { user && this.getUserCity(user.city_id) }, 1000);
    
    console.log(AppState.currentState)
    
    AppState.addEventListener("change", this._handleAppStateChange);

    dispatch(fetchUser( token,0 ))
    dispatch(fetchAnnouncements( token, 1, user.city_id))
    fcmService.removeDeliveredAllNotification()

    navigation.addListener ('didFocus', () =>
      { 
        firebase.notifications().setBadge(0)
        console.log('this.props.city_id', city_id)
        dispatch(fetchUser( token, 0, city_id))
        dispatch(fetchAnnouncements(token, 1, user.city_id))
        //this.props.user && this.getUserCity(this.props.user.city_id)
      }
    );
    console.log(user,'data')
    user && this.getUserCity(user.city_id)
  };

  onRegister = token => {
    console.log('device token ', token);
  };

  onNotification = notify => {
    console.log('onNotification screen', notify);
    const channelObj = {
      channelId: 'freightChannelId',
      channelName: 'freightChannelName',
      channelDes: 'freightChannelDes',
     // sound: this.props.muteNotification? 'music': 'default',
    };
    const channel = fcmService.buildChannel(channelObj);

    const buildNotify = {
      dataId: notify._data.announcement_id,
      title: notify._title,
      content: notify._body,
     // sound: this.props.muteNotification? 'music': 'default',
      channel: channel,
      data: notify._data,
      color: '#007BED',
      largeIcon: 'ic_launcher',
      smallIcon: 'ic_launcher',
      vibrate: true,
      //show_in_foreground: true,
    };
    console.log('buildNotify' ,buildNotify)
    const notification = fcmService.buildNotification(buildNotify);
    console.log('onNotification' ,notification)
    fcmService.displayNotify(notification);
    this.props.dispatch(fetchAnnouncements(this.props.token, 1, this.props.city_id))
  };

  onOpenNotification = notify => {

    const { token, dispatch, navigation, city_id, langId } = this.props;

    console.log('onOpenNotification screen', notify);
    console.log('tokeeeen', token)
    
    dispatch(fetchAnnouncements(token, 1, city_id))
    //firebase.notifications().setBadge(0)
    Alert.alert(language[langId].cabinet.notify,notify._title,[
      {
        text:  language[langId].cabinet.cancel,
        onPress: () => console.log("Cancel Pressed"),
      },
      { 
        text: language[langId].cabinet.open, 
        onPress: () => navigation.navigate('OrderDriver',{ id: notify._data.announcement_id}),
        style: "cancel"
       }
    ],
    { cancelable: false })
    //alert(notify._data.announcement_id);
  };

  getUserCity=(id)=>{
    const {
      cities, dispatch
    } = this.props

    console.log('city', cities)
    cities &&
    cities.data &&
    cities.data.map(item=>{
      if(item.id === id){
        console.log(item.name,'cityid')
        dispatch({ type: "GET_CITY_NAME", payload: {
          id: id,
          name: item.name
        } })
        this.setState({ cityName: item.name })
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
    const { token, dispatch, user } = this.props
    console.log('onRefresh');
    this.setState({ refreshing: true });
    dispatch(fetchAnnouncements( token, 1, user.city_id));
    user && this.getUserCity(user.city_id)
    this.setState({ refreshing: false });
  };

  onChange = () => {  
    const { dispatch, statusNotification, city_id } = this.props

    dispatch({ type: "CHANGE_STATUS_NOTIFICATION" })
    statusNotification ? 
    firebase.messaging().unsubscribeFromTopic(`gruzz${city_id}`).then((res)=>{
      Alert.alert('','Уведомление отключено')
    }).catch((error)=>{
     console.log('error')
      console.log(error)
    }):
    firebase.messaging().subscribeToTopic(`gruzz${city_id}`).then((res)=>{
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
    const { dispatch, token } = this.props
    this.setState({
      page: this.state.page + 1
    }, () => {
      dispatch(fetchAnnouncements(token, this.state.page))
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

  onShare = async () => {
    try {
      const result = await Share.share({
        message: `Скачайте приложение Городские Грузоперевозки в Play Market https://play.google.com/store/apps/details?id=com.freightapp&hl=ru и в App Store https://apps.apple.com/us/app/%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D1%81%D0%BA%D0%B8%D0%B5-%D0%B3%D1%80%D1%83%D0%B7%D0%BE%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D0%B7%D0%BA%D0%B8/id1535763331`
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  headerComp = () => {
    const { langId, navigation, city_name, user, statusNotification } = this.props
    return (
      <View style={{ backgroundColor: '#fff' }}>
        <TouchableOpacity style={styles.shareView} onPress={this.onShare}>
          <Image source={share} style={styles.shareIcon} />
        </TouchableOpacity>
        <Text style={styles.titleStyle}>
          {language[langId].cabinet.title}
        </Text>
        <View>
          <Text style={styles.citySubTitle}>
            {language[langId].cabinet.city}
          </Text>
          <TouchableOpacity
            style={{  flexDirection: 'row',justifyContent: 'center',alignItems: 'center' }}
            onPress={this.city}>
            <Text style={styles.cityName}>
              {city_name}
            </Text>
            <Image source={drop}  style={{marginLeft: 6, width: 12, resizeMode: 'contain'}}  />
          </TouchableOpacity>
        </View>
        <Item
          onpress={() => navigation.navigate('EditProfileDriver')}
          load={this.props.userLaod}
          name={user ? user.name : ''}
          phone_number={user ? this.formatPhoneNumber(user.phone) : ''}/>
        <Push
          text={language[langId].cabinet.notification}
          isEnabled={statusNotification}
          onChange={() => this.onChange()}/>
      </View>
    );
  };
  onChangeMute=()=>{  this.props.dispatch({ type: "CHANGE_MUTE_NOTIFICATION" }) }

  
  render() {
    const {loading, data, cities, cityLoad, langId} = this.props;
    
    return (
      <>
        <StatusBar barStyle='dark-content' />
        <SafeAreaView style={styles.container}>
              <FlatList
                data={data }
                refreshing={this.state.refreshing}
                onEndReached={()=>{ this.handleLoadMore() }}
                onRefresh={this.onRefresh}
                ListEmptyComponent={isEmpty(language[langId].cabinet.empty_driver)}
                renderItem={item => this.renderItem(item)}
                ListHeaderComponent={this.headerComp()}
                keyExtractor={(item) => item.id.toString()}
              />
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
              <View style={styles.modalView}>
                <Text style={styles.cityTitle}>
                  {language[langId].register.city}
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
                        style={styles.cityBtn}
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
                          this.setState({ cityName: i.name, visibleModal: false })}
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
                      this.setState({ pageCount: this.state.pageCount-1 })
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
                  <Text>{language[langId].cabinet.otmena}</Text>
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
                      this.setState({ pageCount: this.state.pageCount + 1 });
                    }
                  }}>
                  <Text style={{textAlign:'center'}}>{'>>>'}</Text>
                </TouchableOpacity>
                </View>
              </View>
            </Modal>
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
