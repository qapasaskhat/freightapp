import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import styles from './styles';
import Header from '../../../components/Header';
import Input from '../../../components/Input';
import {img_bg} from '../../../const/images';
import Button from '../../../components/Button';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationActions, StackActions} from 'react-navigation';
import {connect} from 'react-redux';
import {putUser} from '../../../api/users/actions';
import Toast from 'react-native-simple-toast';

const InputView = ({data}) => {
  return (
    <View style={styles.view}>
      {data.map(item => {
        return (
          <Input
            text={item.text}
            placeholder={item.placeholder}
            onchange={item.change}
            password={item.password}
            key={item.text}
            value={item.value}
          />
        );
      })}
    </View>
  );
};

class EditDriver extends React.Component {
  state = {
    login: '',
    number: '',
    password: '',
    newPassword: '',
  };

  saveChange = () => {
    const {login, phone} = this.state;
    let formData = new FormData();
    formData.append('name', login ? login : this.props.user.name);
    formData.append('phone', phone ? phone : this.props.user.phone);

    try {
      this.props.putUser(this.props.user.id, formData);
      this.props.navigation.goBack();
      Toast.show('Сохранено');
    } catch (error) {
      console.warn(error);
    }
  };

  signOut = async () => {
    await AsyncStorage.removeItem('user');
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'Screen'})],
    });
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    this.list = [
      {
        text: 'Введите ваше имя',
        placeholder: this.props.user ? this.props.user.name : 'Имя',
        change: text => {
          this.setState({login: text});
        },
        value: this.state.login,
      },
      {
        text: 'Номер телефона',
        placeholder: this.props.user ? this.props.user.phone : '+7',
        change: text => {
          this.setState({number: text});
        },
        value: this.state.number,
      },
      // {
      //   text: 'Введите старый пароль',
      //   placeholder: '',
      //   change: text => {
      //     this.setState({password: text});
      //   },
      //   value: this.state.password
      // },
      // {
      //   text: 'Введите новый пароль',
      //   placeholder: '',
      //   change: text => {
      //     this.setState({password: text});
      //   },
      //   value: this.state.password
      // },
    ];
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <Header
            text="Редактировать профиль"
            onpress={() => this.props.navigation.goBack()}
          />
          <ImageBackground
            source={img_bg}
            style={{width: '100%', height: '100%'}}>
            <View
              style={{
                margin: 20,
                backgroundColor: '#fff',
                borderRadius: 10,
              }}>
              <InputView data={this.list} />
            </View>
            {/* <Button text={'Изменить пароль'} active onpress={()=>{}}/> */}
            <Button
              text={'Выйти'}
              active
              onpress={() => {
                this.signOut();
              }}
            />
          </ImageBackground>
          <View
            style={{
              position: 'absolute',
              width: '100%',
              backgroundColor: '#fff',
              bottom: 0,
            }}>
            <Button text={'Сохранить'} active onpress={this.saveChange} />
          </View>
        </SafeAreaView>
      </>
    );
  }
}
const mapStateToProps = state => ({
  user: state.users.userData,
});

export default connect(
  mapStateToProps,
  {putUser},
)(EditDriver);
