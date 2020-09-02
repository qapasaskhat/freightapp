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
} from 'react-native';
import styles from './styles';
import List from '../../../components/List';
import {FlatList} from 'react-native-gesture-handler';
import Item from '../../../components/Item';
import {img_bg} from '../../../const/images';
import {drop} from '../../../const/images';
import Button from '../../../components/Button';
import Push from '../../../components/Push';
import Modal from 'react-native-modal';
import axios from 'axios';
import moment from 'moment';

import {connect} from 'react-redux';
import {fetchAnnouncements} from '../../../api/Announcements/actions';
import {fetchCity} from '../../../api/city/actions';
import {Gilroy_Bold} from '../../../const/fonts';
import isEmpty from '../../../components/Empty';

class Main extends React.Component {
  state = {
    isEnabled: false,
    visibleModal: false,
    cityName: 'Алматы',
    userName: '',
    refreshing: false,
  };
  componentDidMount = () => {
    this.props.dispatch(fetchAnnouncements());
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
        body={item.body}
        date={moment(item.created_at)
          .format('L')
          .replace('/', '.')
          .replace('/', '.')}
        phone_number={item.phone}
        from={item.from}
        to={item.to}
        del
        line
        name={this.getUser(item.id)}
        onpressOrder={() => this.onPressList(item)}
      />
    );
  };
  onPressList = item => {
    // alert(id)
    this.props.navigation.navigate('OrderDriver', {param: item});
  };
  city = () => {
    this.props.dispatch(fetchCity());
    this.setState({
      visibleModal: true,
    });
  };
  getUser = id => {
    const api = `http://gruz.sport-market.kz/api/announcements/${id}/`;
    var name = '';
    axios.get(api).then(response => {
      console.log('action fetchAnnouncements');
      //console.log(response.data)
      //name = response.data.data.user.name
      //console.log(name);
    });
    return name;
  };

  headerComp = () => {
    return (
      <View
        style={{
          backgroundColor: '#fff',
        }}>
        <Text
          style={{
            textAlign: 'center',
            marginTop: 18,
            fontSize: 20,
            fontFamily: 'Gilroy-Medium',
          }}>
          Личный Кабинет
        </Text>
        <View>
          <Text
            style={{
              fontSize: 12,
              lineHeight: 24,
              color: '#B1B9C0',
              textAlign: 'center',
              fontFamily: 'Gilroy-Medium',
            }}>
            Ваш город
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.city()}>
            <Text
              style={{
                color: '#007BED',
                fontSize: 18,
                lineHeight: 24,
                fontFamily: 'Gilroy-Medium',
                textAlign: 'center',
              }}>
              {this.state.cityName}
            </Text>
            <Image
              source={drop}
              style={{marginLeft: 6, width: 12, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
        </View>
        <Item
          onpress={() => this.props.navigation.navigate('EditProfileDriver')}
          name={'Андрей Зотов'}
          phone_number={'+7 (906) 521-26-10'}
        />
        <Push
          isEnabled={this.state.isEnabled}
          onChange={() => this.onChange()}
        />
      </View>
    );
  };

  onRefresh = () => {
    this.setState({
      refreshing: true,
    });
    this.props.dispatch(fetchAnnouncements());
    this.setState({
      refreshing: false,
    });
  };
  render() {
    const {loading, data, cities, cityLoad} = this.props;
    return (
      <>
        <StatusBar />
        <SafeAreaView style={styles.container}>
          <ImageBackground
            source={img_bg}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'center',
            }}>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <FlatList
                data={data.data}
                refreshing={this.state.refreshing}
                onRefresh={() => this.onRefresh()}
                ListEmptyComponent={isEmpty('Нет обьялении')}
                renderItem={item => this.renderItem(item)}
                ListHeaderComponent={this.headerComp()}
                keyExtractor={item => item.id.toString()}
                style={
                  {
                    // marginBottom: 64,
                  }
                }
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
                          paddingVertical: 12,
                        }}
                        onPress={() =>
                          this.setState({
                            cityName: i.name,
                            visibleModal: false,
                          })
                        }>
                        <Text>{i.name}</Text>
                      </TouchableOpacity>
                    );
                  })
                )}
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
                    });
                  }}>
                  <Text>Закрыть</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </ImageBackground>
        </SafeAreaView>
      </>
    );
  }
}

const mapStateToProps = state => ({
  data: state.announcements.data,
  loading: state.announcements.loading,
  error: state.announcements.error,
  cities: state.cities.cityData,
  cityLoad: state.cities.loading,
});
export default connect(mapStateToProps)(Main);
