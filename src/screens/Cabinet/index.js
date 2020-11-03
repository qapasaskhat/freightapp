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
  ScrollView
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
import {fetchUser, putUser} from '../../api/users/actions';
import {
  fetchAnnouncementsId,
  deleteAnnouncementId,
} from '../../api/Announcements/actions';
import AsyncStorage from '@react-native-community/async-storage'
import {Gilroy_Bold} from '../../const/fonts';
import Toast from 'react-native-simple-toast';
import {language} from '../../const/const'

const {height} = Dimensions.get('screen')

class Main extends React.Component {
  state = {
    isEnabled: false,
    cityName: 'Алматы',
    visibleModal: false,
    refreshing: false,
    items: [],
    loading: false,
    error: null,
    page: 1,
    pageCity: 1
  }
  componentDidMount = async () => {
    const {user,login,dispatch,loadAnnouncements} = this.props
    console.log(user,login)
    console.log(this.props.login.token,'componentDidMount')
    this.props.dispatch(fetchUser(this.props.login.token,1))
    this.props.city_name === 'almaty' && 
    setTimeout(() => {
      this.changeCity(user && user.city_id)
      //this.props.user && this.getUserCity(this.props.user.city_id)
    }, 1000);
    
    this.props.navigation.addListener ('didFocus', () =>
      { 
        //this.onRefresh()
        console.log('didFocus',user)
        this.props.dispatch(fetchUser(this.props.token,1))
        //this.changeCity(user && user.city_id)
       }
    );
    this.changeCity(user && user.city_id)
  };
  changeCity=(id)=>{
    console.log(this.state.cityName,'cityid')
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
  handleLoadMore=()=>{
    console.log('more')
    this.setState({
      page: this.state.page + 1
    }, () => {  this.props.dispatch(fetchAnnouncementsId(this.props.user.id, this.props.login.token, this.state.page))  })
  }
  componentDidUpdate=(prevProps)=>{
    console.log('prevProps',prevProps)
    if(!this.props.user.id){
      //this.props.dispatch(fetchUser(this.props.login.token,1))
    }
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
        //numberOfLines={1}
        visibleName
        visiblePhone
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
              this.props.dispatch(fetchCity());
              this.setState({
                visibleModal: true,
              });
            }}>
            <Text style={styles.cityName}>{this.props.city_name}</Text>
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
    this.changeCity(this.props.user && this.props.user.city_id)
    this.props.dispatch(fetchAnnouncementsId(this.props.user.id, this.props.login.token,1));
    this.setState({
      refreshing: false,
    });
  };

  render() {
    const {cities, cityLoad, announcements, loadAnnouncements} = this.props;
    return (
      <>
        <StatusBar barStyle='dark-content' />
        <SafeAreaView style={styles.container}>
          {/* <ImageBackground source={img_bg} style={styles.img_bg}> */}
              <FlatList
                data={announcements.data}
                refreshing={this.state.refreshing}
                onRefresh={() => this.onRefresh()}
                ListEmptyComponent={isEmpty(language[this.props.langId].cabinet.empty)}
                renderItem={item => this.renderItem(item)}
                onEndReached={()=>this.handleLoadMore}
                ListHeaderComponent={this.headerComp()}
                keyExtractor={(item) => item.id.toString()}
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
                  height: height,
                  alignItems: 'center',
                  paddingVertical: 30,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: Gilroy_Bold,
                    lineHeight: 22,
                    paddingBottom: 10
                  }}>
                  {language[this.props.langId].register.city}
                </Text>
                <ScrollView  style={{
                  paddingTop: 12,
                 // backgroundColor: 'blue'
                }}>
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
                          this.changeCityCabinet(i.id)
                          this.setState({visibleModal: false,page: 1})
                        }}
                        style={{
                          paddingHorizontal: 20,
                          paddingVertical: 7,
                          //borderBottomWidth: 0.6,
                          borderTopWidth: 0.6,
                          width: '100%',
                          //backgroundColor: 'red'
                        }}>
                        <Text >{i.name}</Text>
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
                    if(this.state.page===1)
                    {}
                    else{
                      this.props.dispatch(fetchCity(this.state.page-1))
                      this.setState({
                        page: this.state.page-1
                      })
                    }
                  }}>
                  <Text style={{textAlign:'center'}}> {'<<<'} </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                    backgroundColor: '#ececec',
                    borderRadius: 10,
                  }}
                  onPress={() => { this.setState({  visibleModal: false, page: 1  });
                  }}>
                  <Text style={{textAlign:'center'}}>{language[this.props.langId].cabinet.otmena}</Text>
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
                      this.props.dispatch(fetchCity(this.state.page+1));
                      this.setState({
                        page: this.state.page + 1
                      });
                    }
                  }}>
                  <Text style={{textAlign:'center'}}>{'>>>'}</Text>
                </TouchableOpacity>
                </View>
                </ScrollView>
              </View>
            </Modal>
          {/* </ImageBackground> */}
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
