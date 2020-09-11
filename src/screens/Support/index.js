import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  ImageBackground,
  Image,
} from 'react-native';
import styles from './styles';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../../components/Header';
import {img_bg} from '../../const/images';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {connect} from 'react-redux';

import {postSupportMesssages} from '../../api/supportMessages/actions';

class Support extends React.Component {
  state = {
    text: '',
  };

  sendSupportText = () => {
    const {text} = this.state;
    let formData = new FormData();
    formData.append('text', text);
    try {
      this.props.postSupportMesssages(formData);
    } catch (error) {}
  };

  render() {
    return (
      <>
        <StatusBar />
        <SafeAreaView style={styles.container}>
          <Header text="Поддержка" left />
          <ImageBackground
            source={img_bg}
            style={{
              width: '100%',
              height: '100%',
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                margin: 20,
                borderRadius: 10,
              }}>
              <Input
                multiline
                top
                height={300}
                radius={14}
                placeholder={'Сообщение'}
                onchange={text => {
                  this.setState({text: text});
                }}
              />
            </View>
          </ImageBackground>
          <View
            style={{
              position: 'absolute',
              width: '100%',
              backgroundColor: '#fff',
              bottom: 0,
            }}>
            <Button text={'Отправить'} active onpress={this.sendSupportText} />
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
  {postSupportMesssages},
)(Support);
