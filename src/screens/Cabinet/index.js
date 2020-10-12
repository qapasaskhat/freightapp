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
} from 'react-native';
import styles from './styles';
import List from '../../components/List';
import Item from '../../components/Item';
import {img_bg, drop} from '../../const/images';
import Button from '../../components/Button';
import Modal from 'react-native-modal';
import isEmpty from '../../components/Empty';
import axios from 'axios';
import moment from 'moment';
import localization_ru from 'moment/locale/ru'

import {connect} from 'react-redux';
import {fetchCity} from '../../api/city/actions';
import {fetchUser} from '../../api/users/actions';
import {
  fetchAnnouncementsId,
  deleteAnnouncementId,
} from '../../api/Announcements/actions';
import AsyncStorage from '@react-native-community/async-storage'
import {Gilroy_Bold} from '../../const/fonts';
import Toast from 'react-native-simple-toast';
import {language} from '../../const/const'
class Main extends React.Component {
  state = {
    isEnabled: false,
    cityName: 'Алматы',
    visibleModal: false,
    refreshing: false,
    items: [],
    loading: false,
    error: null,
    page: 1
  }
  componentDidMount = async () => {
    const {user,login,dispatch,loadAnnouncements} = this.props
    console.log(user,login)
    setTimeout(() => {
      this.changeCity(user && user.city_id)
    }, 600)
    dispatch(fetchUser(login.token,1))
    //dispatch(fetchAnnouncementsId(user.id,login.token))
  };
  changeCity=(id)=>{
    this.props.cities &&
    this.props.cities.data &&
    this.props.cities.data.map(item=>{
      if(item.id === id){
        this.setState({
          cityName: item.name
        })
      }
    })
  }
  handleLoadMore=()=>{
    console.log('more')
    this.setState({
      page: this.state.page + 1
    }, () => {  this.props.dispatch(fetchAnnouncementsId(this.props.user.id, this.props.login.token, this.state.page))  })
  }
  onChange = () => {
    this.setState({
      isEnabled: !this.state.isEnabled,
    });
  };
  renderItem = ({item}) => {
    return (
      <List
        onpressDelete={() => this.arhived(item.id)}
        name={language[this.props.langId].cabinet.name}
        load={this.props.loadAnnouncements}
        trash={false}
        onpressOrder={() => this.props.navigation.navigate('OpenOrder', {param: item})}
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
    Alert.alert(
      language[this.props.langId].cabinet.delete,
      language[this.props.langId].cabinet.delete_text,
      [
        {
          text: language[this.props.langId].cabinet.delete,
          onPress: () => {
            try {
              this.props.dispatch(deleteAnnouncementId(idAnnouncements,this.props.login.token))
              this.props.dispatch(fetchAnnouncementsId(this.props.user.id,this.props.login.token,1));
              Toast.show(language[this.props.langId].cabinet.delete_success);
            } catch (error) {
              console.log(error);
            }
          },
          style: 'cancel',
        },
        {
          text: language[this.props.langId].cabinet.otmena,
          onPress: () => console.log('Cancel Pressed'),
        },
      ],
      {cancelable: false},
    );
  };
  headerComp = () => {
    return (
      <View style={{backgroundColor: '#fff'}}>
        <Text style={styles.cabinet}>{language[this.props.langId].cabinet.title}</Text>
        <View>
          <Text style={styles.city}>{language[this.props.langId].cabinet.city}</Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              this.setState({
                visibleModal: true,
              });
            }}>
            <Text style={styles.cityName}>{this.state.cityName}</Text>
            <Image
              source={drop}
              style={{marginLeft: 6, width: 12, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
        </View>
        <Item
          onpress={() => this.props.navigation.navigate('EditProfileClient')}
          load={this.props.userLoad}
          name={this.props.user ? this.props.user.name : ''}
          phone_number={
            this.props.user ? this.formatPhoneNumber(this.props.user.phone) : ''
          }
        />
        <View style={styles.orders}>
          <Text
            style={{
              fontSize: 12,
              textTransform: 'uppercase',
              color: '#B1B9C0',
              lineHeight: 24,
              fontFamily: 'Gilroy-Medium',
            }}>
            {language[this.props.langId].cabinet.orders}
          </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Order')}>
            <Text style={styles.arhived}>{language[this.props.langId].cabinet.arhive}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  onRefresh = () => {
    this.setState({
      refreshing: true,
    });
    this.props.dispatch(fetchUser(this.props.login.token,1))
    this.props.dispatch(fetchAnnouncementsId(this.props.user.id, this.props.login.token,1));
    this.setState({
      refreshing: false,
    });
  };

  render() {
    const {cities, cityLoad, announcements, loadAnnouncements} = this.props;
    return (
      <>
        <StatusBar />
        <SafeAreaView style={styles.container}>
          <ImageBackground source={img_bg} style={styles.img_bg}>
              <FlatList
                data={announcements.data}
                refreshing={this.state.refreshing}
                onRefresh={() => this.onRefresh()}
                ListEmptyComponent={isEmpty(language[this.props.langId].cabinet.empty)}
                renderItem={item => this.renderItem(item)}
                onEndReached={()=>this.handleLoadMore}
                ListHeaderComponent={this.headerComp()}
                keyExtractor={(item, index) => String(index)}
                style={{marginBottom: 64}}  />
            <Modal
              isVisible={this.state.visibleModal}
              style={styles.modal}
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
                  height: '100%',
                  alignItems: 'center',
                  paddingTop: 60,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: Gilroy_Bold,
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
                        onPress={()=>{
                          this.changeCity(i.id)
                          this.setState({visibleModal: false,})
                        }}
                        style={{
                          paddingHorizontal: 20,
                          paddingVertical: 10,
                        }}>
                        <Text>{i.name}</Text>
                      </TouchableOpacity>
                    );
                  })
                )}
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                    backgroundColor: '#ececec',
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    this.setState({
                      visibleModal: false,
                    });
                  }}>
                  <Text>{language[this.props.langId].cabinet.otmena}</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </ImageBackground>
          <View
            style={{  position: 'absolute',width: '100%',backgroundColor: '#fff',bottom: 0, }}>
            <Button
              text={language[this.props.langId].cabinet.btn}
              active
              onpress={() => this.props.navigation.navigate('Main')}
            />
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
  loadAnnouncements: state.announcements.loading,
  errorAnnouncements: state.announcements.error,
  langId: state.appReducer.langId
})
export default connect(mapStateToProps)(Main);
