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
import {connect} from 'react-redux';
import {fetchCity} from '../../api/city/actions';
import {fetchAnnouncements} from '../../api/Announcements/actions';

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
  };
  componentDidMount = () => {
    //this.getAnnouncements()
    this.props.dispatch(fetchCity());
  };
  onChange = () => {
    this.setState({
      isEnabled: !this.state.isEnabled,
    });
  };
  renderItem = ({item}) => {
    return (
      <List
        onpressDelete={() => this.arhived(item)}
        name={'Вы'}
        trash={false}
        onpressOrder={() =>
          this.props.navigation.navigate('OpenOrder', {param: item})
        }
        body={item.body}
        phone_number={item.phone}
        from={item.from}
        date={moment(item.created_at).format('L')}
        to={item.to}
        line
      />
    );
  };
  arhived = idAnnouncements => {
    Alert.alert(
      'Удалить',
      'Действительно ли вы хотите удалить?',
      [
        {
          text: 'Удалить',
          onPress: () => {
            // alert(idAnnouncements)
            // this.setState(state=>{
            //   const items = state.items.filter(i=>
            //     {
            //       return i.id !== idAnnouncements.id
            //     }
            //   )
            //   return {items}
            // })

            Toast.show('arhived');
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
  putAnnouncements = () => {
    const api = '';
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
          name="Иван Андреев"
          phone_number="+7 (900) 231-10-00"
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
  // getAnnouncements = ()=>{
  //   const api = 'http://gruz.sport-market.kz/api/announcements/'
  //   this.setState({
  //     loading: true
  //   })
  //   axios.get(api).then(response=>{
  //     console.log(response.data)
  //     this.setState({
  //       items: response.data.data,
  //       loading: false
  //     })
  //   }).catch(err=>{
  //     this.setState({
  //       error: err,
  //       loading: false
  //     })
  //   })
  // }
  onRefresh = () => {
    this.setState({
      refreshing: true,
    });
    //this.getAnnouncements()
    this.props.dispatch(fetchAnnouncements());
    this.setState({
      refreshing: false,
    });
  };

  render() {
    const {loading, error, items} = this.state;
    const {cities, cityLoad, announcements} = this.props;
    return (
      <>
        <StatusBar />
        <SafeAreaView style={styles.container}>
          <ImageBackground source={img_bg} style={styles.img_bg}>
            {loading ? (
              <View>
                <ActivityIndicator />
              </View>
            ) : (
              <FlatList
                data={announcements.data}
                refreshing={this.state.refreshing}
                onRefresh={() => this.onRefresh()}
                ListEmptyComponent={isEmpty('Вы не добавили обьявление')}
                renderItem={item => this.renderItem(item)}
                ListHeaderComponent={this.headerComp()}
                keyExtractor={(item, index) => index.toString()}
                style={{marginBottom: 64}}
              />
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
                  cities.data.map(i => {
                    return (
                      <TouchableOpacity
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
            style={{
              position: 'absolute',
              width: '100%',
              backgroundColor: '#fff',
              bottom: 0,
            }}>
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
  //user: state.user.dataUser,
  cities: state.cities.cityData,
  cityLoad: state.cities.loading,
  announcements: state.announcements.dataAnnouncements,
});
export default connect(mapStateToProps)(Main);
