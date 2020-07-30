import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
  ImageBackground
} from 'react-native';
import styles from './styles';
import Header from '../../components/Header'
import Input from '../../components/Input'
import {img_bg} from '../../const/images';
import Button from '../../components/Button'
import { ScrollView } from 'react-native-gesture-handler';

const width = Dimensions.get('window').width;

class CodeInputClass extends React.Component {
  state = {
    phone_number: this.props.navigation.getParam('param').phone,
    address_to: this.props.navigation.getParam('param').to,
    address_from: this.props.navigation.getParam('param').from,
    desc: this.props.navigation.getParam('param').body,
    items: this.props.navigation.getParam('param')
  };
  componentDidMount=()=>{
    console.log(this.props.navigation.getParam('param'))
  }
  render() {
    const {items,phone_number,address_from,address_to,desc} = this.state;
    return (
      <>
        <StatusBar />
        <SafeAreaView style={styles.container}>
          <Header text={'Редактирование заказа'} onpress={()=>this.props.navigation.goBack()}/>
          <ScrollView>
          <ImageBackground
            style={{width: '100%', height: '100%'}}
            source={img_bg}>
            <View
              style={{
                backgroundColor: '#fff',
                margin: 26,
                borderRadius: 10,
                paddingBottom:50
              }}>
              <Input
                text={'Введите номер телефона'}
                placeholder={'+7'}
                value={phone_number}
                onchange={text => this.setState({phone_number: text})}
              />
              <Input
                text={'Откуда'}
                placeholder={'Введите адрес отправления'}
                value={address_to}
                onchange={text => this.setState({address_to: text})}
              />
              <Input
                text={'Куда'}
                value={address_from}
                placeholder={'Введите адрес получения'}
                onchange={text => this.setState({address_from: text})}
              />
              <Input
                multiline
                height={120}
                value={desc}
                top
                radius={14}
                text={'Описание груза'}
                placeholder={'Опишите свой заказ'}
                onchange={text => this.setState({desc: text})}
              />
            </View>
            
          </ImageBackground>
          </ScrollView>
          <View style={{
                position: 'absolute',
                width: '100%',
                backgroundColor: '#fff',
                bottom: 0,
                paddingBottom: 5
              }}>
                <Button
                  text={'Сохранить изменения'}
                  active
                  onpress={() => this.props.navigation.navigate('Cabinet')}
                />
              </View>
        </SafeAreaView>
      </>
    );
  }
}
export default CodeInputClass;
