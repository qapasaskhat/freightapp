import React from 'react'; //Aрхив заказов
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import styles from './styles';
import {img_bg} from '../../const/images';
import Header from '../../components/Header';
import List from '../../components/List';
import isEmpty from '../../components/Empty';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import {fetchArchive} from '../../api/archive/actions';
import {connect} from 'react-redux';

class Order extends React.Component {
  state = {
    refreshing: false,
    items: [],
    error: null,
    loading: false,
    user: {},
  };
  componentDidMount = () => {
    console.log(this.props.user.id)
    if (this.props.user) {
      this.props.dispatch(fetchArchive(this.props.user.id));
    }
  };
  renderItem = ({item}) => {
    return (
      <List
        onpressDelete={() => this.delete()}
        line
        body={item.body}
        phone_number={item.phone}
        from={item.from}
        to={item.to}
        name="Вы"
      />
    );
  };
  delete = () => {
    Alert.alert(
      'Удалить',
      'Действительно ли вы хотите удалить?',
      [
        {
          text: 'Удалить',
          onPress: async () => {
            Toast.show('Удалено');
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

  onRefresh = () => {
    this.setState({
      refreshing: true,
    });
    this.props.dispatch(fetchArchive(this.props.user.id));
    this.setState({
      refreshing: false,
    });
  };

  render() {
    const {items, loading, error, refreshing} = this.state;
    return (
      <>
        <StatusBar />
        <SafeAreaView style={styles.container}>
          <ImageBackground source={img_bg} style={styles.img_bg}>
            <Header
              text={'Архив заказов'}
              onpress={() => this.props.navigation.goBack()}
            />
            {loading ? (
              <View>
                <ActivityIndicator />
              </View>
            ) : (
              <FlatList
                data={this.props.dataArchive.data}
                renderItem={this.renderItem}
                ListEmptyComponent={isEmpty('У вас нет архива')}
                refreshing={refreshing}
                onRefresh={this.onRefresh}
              />
            )}
          </ImageBackground>
        </SafeAreaView>
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.userData,
  dataArchive: state.archive.dataArchive,
});
export default connect(mapStateToProps)(Order);
