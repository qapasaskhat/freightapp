import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  FlatList,
  Dimensions,
  ScrollView,
  Share
} from 'react-native';
import styles from './styles';
import List from '../../components/List';
import Item from '../../components/Item';
import {img_bg, drop} from '../../const/images';
import Button from '../../components/Button';
import Modal from 'react-native-modal';
import isEmpty from '../../components/Empty';
import moment from 'moment';
import localization_ru from 'moment/locale/ru'

import {connect} from 'react-redux';
import {fetchCity} from '../../api/city/actions';
import {fetchUser, putUser} from '../../api/users/actions';
import {
  fetchAnnouncementsId,
  deleteAnnouncementId,
} from '../../api/Announcements/actions';

import Toast from 'react-native-simple-toast';
import {language} from '../../const/const'
import firebase from 'react-native-firebase'

const {height} = Dimensions.get('screen')
const share = require('../../assets/icons/bi_share.png')

class Main extends React.Component {

  state = {
    isEnabled: false,
    cityName: '',
    visibleModal: false,
    refreshing: false,
    items: [],
    loading: false,
    error: null,
    page: 1,
    pageCity: 1
  }

  componentDidMount = async () => {
    const { user, login, dispatch, loadAnnouncements, city_name, navigation, token } = this.props

    firebase.analytics().logEvent('clientUsingApp',{
      client_id: user.id,
      client_name: user.name,
      client_phone: user.phone,
      client_city_id: user.city_id
    })

    dispatch(fetchUser( token, 1))
    // city_name === 'Алматы' && 
    // setTimeout(() => { this.changeCity(user && user.city_id) }, 1000);
    
    navigation.addListener ('didFocus', () => dispatch(fetchUser(token, 1)) );
    this.changeCity(user && user.city_id)
  };

  changeCity=(id)=>{
    const { cities, dispatch } = this.props;
    
    cities &&
    cities.data &&
    cities.data.map(item=>{
      if(item.id === id){
        dispatch({ type: "GET_CITY_NAME", payload: { id: id, name: item.name } })
        this.setState({ cityName: item.name })
      }
    })
  }

  changeCityCabinet=(id)=>{
    console.log(id)
    let formData = new FormData();
    //formData.append('name', login ? login : this.props.user.name);
    formData.append('city_id',id)
    formData.append('_method','PUT')
    this.props.dispatch(putUser(this.props.user.id, formData, this.props.token));
    this.props.dispatch(fetchUser(this.props.token,1));
    this.props.cities &&
    this.props.cities.data &&
    this.props.cities.data.map(item=>{
      if(item.id === id){
        console.log(item.name, 'cityId')
        this.props.dispatch({ type: "GET_CITY_NAME", payload: {
          id: id,
          name: item.name
        } })
        this.setState({ cityName: item.name })
      }
    })
  }

  handleLoadMore=()=>{
    const { page } = this.state
    const { dispatch, user, login } = this.props
    this.setState({
      page: page + 1
    }, () => {  dispatch(fetchAnnouncementsId(user.id, login.token, page))  })
  }

  onChange = () => this.setState({ isEnabled: !this.state.isEnabled });

  renderItem = ({item}) => {
    const { langId, navigation, loadAnnouncements } = this.props
    return (
      <List
        onpressDelete={() => this.arhived(item.id)}
        name={language[langId].cabinet.name}
        load={loadAnnouncements}
        visibleName
        visiblePhone
        trash={false}
        onpressOrder={() => navigation.navigate('OpenOrder', { param: item })}
        body={item.body}
        phone_number={item.phone}
        from={item.from}
        date={moment(item.created_at).local('ru',localization_ru).format('lll')}
        to={item.to}
        line
      />
    );
  };

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

  arhived = idAnnouncements => {
    const { langId, dispatch, login, user } = this.props
    Alert.alert(
      language[langId].cabinet.delete,
      language[langId].cabinet.delete_text,
      [
        {
          text: language[langId].cabinet.delete,
          onPress: () => {
            try {
              dispatch(deleteAnnouncementId(idAnnouncements, login.token))
              dispatch(fetchAnnouncementsId(user.id, login.token,1));
              Toast.show(language[langId].cabinet.delete_success);
            } catch (error) {
              console.log(error);
            }
          },
          style: 'cancel',
        },
        {
          text: language[langId].cabinet.otmena,
          onPress: () => console.log('Cancel Pressed'),
        },
      ],
      {cancelable: false},
    );
  };

  onShare = async () => {
    try {
      const result = await Share.share({
        message: `Скачайте приложении Грузоперевозки 
        в Play Market https://play.google.com/store/apps/details?id=com.freightapp&hl=ru и 
        в App Store https://apps.apple.com/us/app/%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D1%81%D0%BA%D0%B8%D0%B5-%D0%B3%D1%80%D1%83%D0%B7%D0%BE%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D0%B7%D0%BA%D0%B8/id1535763331`
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
    const { langId, dispatch, navigation, userLoad, user } = this.props
    return (
      <View style={{backgroundColor: '#fff'}}>
        <TouchableOpacity style={styles.shareBtn} onPress={()=>{this.onShare()}}>
          <Image source={share} style={styles.shareIcon} />
        </TouchableOpacity>
        <Text style={styles.cabinet}>{language[langId].cabinet.title}</Text>
        <View>
          <Text style={styles.city}>{language[langId].cabinet.city}</Text>
          <TouchableOpacity
            style={styles.findCityBtn}
            onPress={() => {
              dispatch(fetchCity());
              this.setState({ visibleModal: true });
            }}>
            <Text style={styles.cityName}>{this.props.city_name}</Text>
            <Image source={drop} style={styles.dropIconStl} />
          </TouchableOpacity>
        </View>
        <Item
          onpress={() => navigation.navigate('EditProfileClient')}
          load={userLoad}
          name={user ? user.name : ''}
          phone_number={ user ? this.formatPhoneNumber(user.phone) : '' }
        />
        <View style={styles.orders}>
          <Text
            style={styles.orderTitle}>
            {language[langId].cabinet.orders}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Order')}>
            <Text style={styles.arhived}>{language[langId].cabinet.arhive}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  onRefresh = () => {
    const { dispatch, login, user } = this.props
    this.setState({ refreshing: true });
    dispatch(fetchUser(login.token,1))
    this.changeCity(user && user.city_id)
    dispatch(fetchAnnouncementsId(user.id, login.token,1));
    this.setState({ refreshing: false });
  };

  render() {
    const { cities, cityLoad, announcements, loadAnnouncements, langId, dispatch, navigation } = this.props;
    const { refreshing, visibleModal, page } = this.state;
    return (
      <>
        <StatusBar barStyle='dark-content' />
        <SafeAreaView style={styles.container}>
              <FlatList
                data={announcements.data}
                refreshing={refreshing}
                onRefresh={() => this.onRefresh()}
                ListEmptyComponent={isEmpty(language[langId].cabinet.empty)}
                renderItem={item => this.renderItem(item)}
                onEndReached={()=>this.handleLoadMore}
                ListHeaderComponent={this.headerComp()}
                keyExtractor={(item) => item.id.toString()}
                style={{marginBottom: 64}}  />
            <Modal
              isVisible={visibleModal}
              style={styles.modal}
              backdropColor="#B4B3DB"
              backdropOpacity={0.5}
              animationIn="zoomInUp"
              animationOut="zoomOut"
              animationInTiming={600}
              animationOutTiming={600}
              backdropTransitionInTiming={600}
              backdropTransitionOutTiming={600}>
              <View style={styles.modalStyle}>
                <Text style={styles.modalTitle}>
                  {language[langId].register.city}
                </Text>
                <ScrollView  style={{ paddingTop: 12 }}>
                {cityLoad ? (
                  <ActivityIndicator />
                ) : (
                  cities &&
                  cities.data &&
                  cities.data.map((i, index) => {
                    return (
                      <TouchableOpacity key={index.toString()} style={styles.cityItem}
                        onPress={()=>{
                          this.changeCityCabinet(i.id)
                          this.setState({visibleModal: false, page: 1})
                        }} >
                        <Text>{i.name}</Text>
                      </TouchableOpacity>
                    );
                  })
                )}
                <View style={styles.modalRow}>
                <TouchableOpacity
                  style={styles.nextPrevBtn}
                  onPress={() => {
                    if(page===1){}
                    else{
                      dispatch(fetchCity(page - 1))
                      this.setState({ page: page - 1 })
                    }
                  }}>
                  <Text style={{textAlign:'center'}}> {'<<<'} </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.nextPrevBtn}
                  onPress={() => { this.setState({  visibleModal: false, page: 1  });
                  }}>
                  <Text style={{textAlign:'center'}}>{language[langId].cabinet.otmena}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.nextPrevBtn}
                  onPress={() => {
                    if (cities.data.length === 15)
                    {
                      dispatch(fetchCity(page + 1));
                      this.setState({ page: page + 1 });
                    }
                  }}>
                  <Text style={{textAlign:'center'}}>{'>>>'}</Text>
                </TouchableOpacity>
                </View>
                </ScrollView>
              </View>
            </Modal>
          <View style={styles.bottomView}>
            <Button text={language[langId].cabinet.btn} active onpress={() => navigation.navigate('Main')} />
          </View>
        </SafeAreaView>
      </>
    );
  }
}
const mapStateToProps = state => ({
  user: state.users.userData,
  userLoad: state.users.loading,
  cities: state.cities.cityData,
  cityLoad: state.cities.loading,
  announcements: state.announcements.dataAnnouncementsUser,
  login: state.login,
  token: state.login.token,
  loadAnnouncements: state.announcements.loading,
  errorAnnouncements: state.announcements.error,
  langId: state.appReducer.langId,
  city_id: state.appReducer.city_id,
  city_name: state.appReducer.city_name
})
const mapDispatchToProps = dispatch => ({
  dispatch
});
export default connect(mapStateToProps,mapDispatchToProps)(Main);
