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
  // componentDidUpdate=(prevProps, prevState)=> {
  //   if (prevProps.user !== this.props.user) {
  //     console.log('componentDidUpdate Cabinet');
  //     this.props.dispatch(fetchCity());
  //     this.changeCity(this.props.user && this.props.user.city_id)
  //     this.props.dispatch(fetchAnnouncementsId(this.props.user.id, this.props.login.token, this.state.page));
  //   }else{}
  // }
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
        name={'Вы'}
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
      'Удалить',
      'Действительно ли вы хотите удалить?',
      [
        {
          text: 'Удалить',
          onPress: () => {
            try {
              this.props.dispatch(deleteAnnouncementId(idAnnouncements,this.props.login.token));
              Toast.show('Удалено');
              this.props.dispatch(fetchAnnouncementsId(this.props.user.id,this.props.login.token));
            } catch (error) {
              console.log(error);
            }
          },
        },
        {
          text: 'Отмена',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };
  headerComp = () => {
    return (
      <View style={{backgroundColor: '#fff'}}>
        <Text style={styles.cabinet}>Личный Кабинет</Text>
        <View>
          <Text style={styles.city}>Ваш город</Text>
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
            Текущие заказы
          </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Order')}>
            <Text style={styles.arhived}>Перейти в архив</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  onRefresh = () => {
    this.setState({
      refreshing: true,
    });
    //this.getAnnouncements()
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
            {loadAnnouncements ? (
              <View>
                <ActivityIndicator color={'#007BED'} />
              </View>
            ) : (
              <FlatList
                data={announcements.data}
                refreshing={this.state.refreshing}
                onRefresh={() => this.onRefresh()}
                ListEmptyComponent={isEmpty('Вы не добавили обьявление')}
                renderItem={item => this.renderItem(item)}
                onEndReached={()=>this.handleLoadMore}
                ListHeaderComponent={this.headerComp()}
                keyExtractor={(item, index) => String(index)}
                style={{marginBottom: 64}}  />
            )}
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
                  Выберите город
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
                  <Text>Закрыть</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </ImageBackground>
          <View
            style={{  position: 'absolute',width: '100%',backgroundColor: '#fff',bottom: 0, }}>
            <Button
              text={'Добавить заказ'}
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
  cities: state.cities.cityData,
  cityLoad: state.cities.loading,
  announcements: state.announcements.dataAnnouncementsUser,
  login: state.login,
  loadAnnouncements: state.announcements.loading,
  errorAnnouncements: state.announcements.error
})
export default connect(mapStateToProps)(Main);
