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

const width = Dimensions.get('window').width;

class CodeInputClass extends React.Component {
  state = {
    item: this.props.navigation.getParam('param'),
  };
  componentDidMount = () => {
    console.log(this.props.navigation.getParam('param'));
  };
  arhived = () => {
    Alert.alert(
      language[this.props.langId].cabinet.delete,
      language[this.props.langId].cabinet.delete_text,
      [
        {
          text: language[this.props.langId].cabinet.delete,
          onPress: async () => {
            console.log('delete');
          },
        },
        {
          text: language[this.props.langId].cabinet.otmena,
          onPress: () => console.log('Cancel Pressed'),
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
        <StatusBar />
        <SafeAreaView style={styles.container}>
          <Header
            text={language[this.props.langId].view_orders.title}
            onpress={() => this.props.navigation.goBack()}
          />
          <ImageBackground style={styles.img_bg} source={img_bg}>
            <List
              onpressDelete={() => this.arhived()}
              name={language[this.props.langId].cabinet.name}
              body={item.body}
              line
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
              onpress={() =>
                this.props.navigation.navigate('EditOrder', {param: item})
              }
            />
          </View>
        </SafeAreaView>
      </>
    );
  }
}
const mapStateToProps = state => ({
  langId: state.appReducer.langId
})
export default connect(mapStateToProps)(CodeInputClass);
