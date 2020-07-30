import React from 'react'
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    StatusBar,
    ImageBackground,
    ScrollView,
    Alert
} from 'react-native'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Header from '../../components/Header'
import { img_bg } from '../../const/images'
import styles from './styles'
import AsyncStorage from '@react-native-community/async-storage'
import { NavigationActions, StackActions } from 'react-navigation'
import Toast from 'react-native-simple-toast'

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

class EditClient extends React.Component{
    state={
        login: '',
        number: '',
        password: '',
    }
    signOut=async()=>{
      Alert.alert(
        "Выйти",
        "Действительно ли вы хотите выйти из аккаунта?",
        [
          { text: "Выйти", onPress: async() => {
            await AsyncStorage.removeItem('user')
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({routeName: 'Screen'})]
            })
            this.props.navigation.dispatch(resetAction)
          } },
          {
            text: "Отмена",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
    }
    saveChange=()=>{
      this.props.navigation.goBack()
      Toast.show('Сохранено')
    }
    render() {
        this.list = [
            {
              text: 'Введите ваше имя',
              placeholder: 'Александр',
              change: text => {
                this.setState({login: text});
              },
              value: this.state.login
            },
            {
              text: 'Номер телефона',
              placeholder: '+7',
              change: text => {
                this.setState({number: text});
              },
              value: this.state.number
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
          ]
      return (
        <>
        <StatusBar barStyle={'dark-content'} />
        <SafeAreaView style={styles.container}>
            <Header text='Редактировать профиль' onpress={()=>this.props.navigation.goBack()} />
            <ImageBackground source={img_bg} style={{width: '100%', height: '100%'}}>
                <View style={{
                    backgroundColor: '#fff',
                    margin:20,
                    borderRadius: 10
                }}>
                    <InputView data={this.list} />
                </View>
              {/* <Button text='Изменить пароль' active onpress={()=>{}}/> */}
              <Button text='Выйти' active onpress={()=>{this.signOut()}}/>
            </ImageBackground>
            <View
            style={{
              position: 'absolute',
              width: '100%',
              backgroundColor: '#fff',
              bottom: 0,
            }}>
            <Button
              text={'Сохранить'}
              active
              onpress={() =>{this.saveChange()}}
            />
          </View>
        </SafeAreaView>
        </>
      )
    };
}
export default EditClient