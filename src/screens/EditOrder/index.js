import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  AppState,
  Keyboard
} from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import Input from '../../components/Input';
import {img_bg} from '../../const/images';
import Button from '../../components/Button';
import {ScrollView} from 'react-native-gesture-handler';
import {putAnnouncementId} from '../../api/Announcements/actions';
import {connect} from 'react-redux';
import { language } from '../../const/const'
const height = Dimensions.get('window').height;

class CodeInputClass extends React.Component {
  state = {
    id: this.props.navigation.getParam('param').id,
    phone_number: this.props.navigation.getParam('param').phone,
    address_to: this.props.navigation.getParam('param').to,
    address_from: this.props.navigation.getParam('param').from,
    desc: this.props.navigation.getParam('param').body,
    items: this.props.navigation.getParam('param'),
    appState: AppState.currentState,

  };
  componentDidMount = () => {
    AppState.addEventListener("change", this._handleAppStateChange);
    console.log('param', this.props.navigation.getParam('param'));
  };
  componentWillUnmount() {
    Keyboard.dismiss()
    AppState.removeEventListener("change", this._handleAppStateChange);
  }
  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      Keyboard.dismiss()
    }
    this.setState({ appState: nextAppState });
  };
  saveUpdatedOrder = () => {
    const {
      items,
      phone_number,
      address_from,
      address_to,
      desc,
      id,
    } = this.state;
    const {user,token} = this.props;
    let formData = new FormData();

    formData.append('body', desc);
    formData.append('phone', phone_number);
    formData.append('from', address_from);
    formData.append('to', address_to);
    formData.append('_method','PUT')
    try {
      this.props.putAnnouncementId(id, formData,token);
      this.props.navigation.replace('Cabinet');
    } catch (error) {}
  };

  render() {
    const {items, phone_number, address_from, address_to, desc} = this.state;
    return (
      <>
        <StatusBar barStyle='dark-content' />
        <KeyboardAvoidingView  behavior='height' style={styles.container} >
        <SafeAreaView style={styles.container}>
          <ScrollView  keyboardShouldPersistTaps='handled'>
          <Header
            text={language[this.props.langId].view_orders.edit_btn}
            onpress={() => this.props.navigation.goBack()}
          />
          <ScrollView keyboardShouldPersistTaps='handled' style={{flexGrow: 0}}>
            <ImageBackground
              style={{width: '100%', height: height-70-90}}
              source={img_bg}>
              <View
                style={{
                  backgroundColor: '#fff',
                  marginVertical: 26,
                  marginHorizontal: 26,
                  borderRadius: 10,
                  paddingBottom: 50,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}>
                <Input
                  text={language[this.props.langId].add_new_order.phone}
                  placeholder={'+7'}
                  value={phone_number}
                  onchange={text => this.setState({phone_number: text})}
                />
                <Input
                  text={language[this.props.langId].add_new_order.from}
                  value={address_from}
                  placeholder={language[this.props.langId].add_new_order.address_from}
                  onchange={text => this.setState({address_from: text})}
                />
                <Input
                  text={language[this.props.langId].add_new_order.to}
                  placeholder={language[this.props.langId].add_new_order.address_to}
                  value={address_to}
                  onchange={text => this.setState({address_to: text})}
                />
                <Input
                  multiline
                  height={120}
                  value={desc}
                  top
                  radius={14}
                  text={language[this.props.langId].add_new_order.description}
                  placeholder={language[this.props.langId].add_new_order.description_placeholder}
                  onchange={text => this.setState({desc: text})}
                />
              </View>
              <Button
              text={language[this.props.langId].add_new_order.save}
              active
              onpress={this.saveUpdatedOrder}
            />
            </ImageBackground>
          </ScrollView>
          </ScrollView>
        </SafeAreaView>
        </KeyboardAvoidingView>
      </>
    );
  }
}
const mapStateToProps = state => ({
  user: state.users.userData,
  token: state.login.token,
  langId: state.appReducer.langId
});
export default connect(
  mapStateToProps,
  {putAnnouncementId},
)(CodeInputClass);
