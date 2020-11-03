import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
  ImageBackground,
  Alert,
} from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import {img_bg} from '../../const/images';
import Button from '../../components/Button';
import List from '../../components/List';
import moment from 'moment';
import {language} from '../../const/const'
import {connect} from 'react-redux'
import {
  fetchAnnouncementsId,
  deleteAnnouncementId,
} from '../../api/Announcements/actions';
import Toast from 'react-native-simple-toast';

const width = Dimensions.get('window').width;

class CodeInputClass extends React.Component {
  state = {
    item: this.props.navigation.getParam('param'),
  };
  componentDidMount = () => {
    console.log(this.props.navigation.getParam('param'));
  };
  arhived = (idAnnouncements) => {
    Alert.alert(
      language[this.props.langId].cabinet.delete,
      language[this.props.langId].cabinet.delete_text,
      [
        {
          text: language[this.props.langId].cabinet.delete,
          onPress: async () => {
            try {
              this.props.dispatch(deleteAnnouncementId(idAnnouncements,this.props.login.token))
              this.props.dispatch(fetchAnnouncementsId(this.props.user.id,this.props.login.token,1));
              this.props.navigation.goBack()
              Toast.show(language[this.props.langId].cabinet.delete_success);
            } catch (error) {
              console.log(error);
            }
          },
        },
        {
          text: language[this.props.langId].cabinet.otmena,
          onPress: () => {
            console.log('log')
          },
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };
  render() {
    const {item} = this.state;
    return (
      <>
        <StatusBar barStyle='dark-content' />
        <SafeAreaView style={styles.container}>
          <Header
            text={language[this.props.langId].view_orders.title}
            onpress={() => this.props.navigation.goBack()}
          />
          <ImageBackground style={styles.img_bg} source={img_bg}>
            <List
              onpressDelete={() => this.arhived(item.id)}
              name={language[this.props.langId].cabinet.name}
              body={item.body}
              line
              visibleName
              visiblePhone
              from={item.from}
              to={item.to}
              date={moment(item.created_at).format('DD MM YYYY')}
              phone_number={item.phone}
            />
          </ImageBackground>
          <View style={styles.bottom}>
            <Button
              text={language[this.props.langId].view_orders.edit_btn}
              active
              onpress={() => this.props.navigation.navigate('EditOrder', {param: item}) }
            />
          </View>
        </SafeAreaView>
      </>
    );
  }
}
const mapStateToProps = state => ({
  langId: state.appReducer.langId,
  user: state.users.userData,
  login: state.login,
})

export default connect(mapStateToProps)(CodeInputClass);
