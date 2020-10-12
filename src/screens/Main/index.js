import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  ImageBackground,
} from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import {img_bg} from '../../const/images';
//import OrderInput from '../../components/OrderInput'
import Input from '../../components/Input';
import Button from '../../components/Button';
import {ScrollView, FlatList} from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';
import {postAnnouncements} from '../../api/Announcements/actions';
import {connect} from 'react-redux';
import {language} from '../../const/const';

class Main extends React.Component {
  state = {
    phone_number: '',
    address_to: '',
    address_from: '',
    desc: '',
    phone_err: null,
    address_from_err: null,
    address_to_err: null,
    desc_err: null,
  };
  renderItem = () => {
    const {phone_err, address_from_err, address_to_err, desc_err} = this.state;
    return (
      <View
        style={{
          backgroundColor: '#fff',
          marginHorizontal: 16,
          marginTop: 16,
          borderRadius: 10,
          //paddingBottom: 20,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          paddingVertical: 8
        }}>
        <Input
          text={language[this.props.langId].add_new_order.phone}
          value={this.state.phone_number}
          placeholder={'+7'}
          keyboardType={'numeric'}
          onchange={text => this.setState({phone_number: text})}
        />
        {phone_err ? (
          <Text style={styles.errorText}>invalid number</Text>
        ) : null}

        <Input
          text={language[this.props.langId].add_new_order.from}
          placeholder={language[this.props.langId].add_new_order.address_from}
          value={this.state.address_from}
          onchange={text => this.setState({address_from: text})}
        />
        {address_to_err ? (
          <Text style={styles.errorText}>{address_from_err}</Text>
        ) : null}
        <Input
          text={language[this.props.langId].add_new_order.to}
          placeholder={language[this.props.langId].add_new_order.address_to}
          onchange={text => this.setState({address_to: text})}
        />
        {address_from_err ? (
          <Text style={styles.errorText}>{address_to_err}</Text>
        ) : null}
        <Input
          multiline
          height={120}
          top
          radius={14}
          text={language[this.props.langId].add_new_order.description}
          placeholder={language[this.props.langId].add_new_order.description_placeholder}
          onchange={text => this.setState({desc: text})}
        />
        {desc_err ? <Text style={styles.errorText}>{desc_err}</Text> : null}
      </View>
    );
  };
  footer = () => {
    return (
      <View style={styles.footer}>
        <Button
          text={language[this.props.langId].add_new_order.btn}
          active
          onpress={() => this.addNewOrders()}
        />
      </View>
    );
  };
  validatePhone = number => {
    let val = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return val.test(String(number));
  };
  addNewOrders = () => {
    const {phone_number, address_from, address_to, desc} = this.state;
    let formdata = new FormData();

    if (this.validatePhone(phone_number)) {
      this.setState({phone_err: null});
    } else {
      this.setState({phone_err: 'error'});
    }
    if (address_from === '') {
      this.setState({address_from_err: 'error'});
    } else {
      this.setState({address_from_err: null});
    }
    if (address_to === '') {
      this.setState({address_to_err: 'error'});
    } else {
      this.setState({address_to_err: null});
    }
    if (desc === '') {
      this.setState({desc_err: 'error'});
    } else {
      this.setState({desc_err: null});
    }

    if (
      this.validatePhone(phone_number) &&
      address_from !== '' &&
      address_to !== '' &&
      desc !== ''
    ) {
      let phone = phone_number.replace(/^\D+/g, '');

      try {
        formdata.append('body', desc);
        formdata.append('user_id', this.props.user.id);
        formdata.append('phone', phone);
        formdata.append('from', address_from);
        formdata.append('to', address_to);
        formdata.append('status', 0);
        try {
          this.props.postAnnouncements(formdata,this.props.login.token);
          this.props.navigation.navigate('Cabinet');
          Toast.show( language[this.props.langId].add_new_order.success, Toast.LONG);
        } catch (error) {}

      } catch (error) {}
    }
  };
  postOrder = () => {
    //TO DO
  };
  componentDidMount=()=>{
    console.log(this.props.cities.data)
    // this.props.cities && this.props.cities.data.map(item=>{
    //   if(item.id === this.props.user.city_id){
    //     this.setState({
    //       address_from: item.name
    //     })
    //   }
    // })
    this.setState({
      phone_number: this.props.user.phone
    })
  }
  render() {
    return (
      <>
        <StatusBar />
        <SafeAreaView style={styles.container}>
        <ImageBackground
              style={{width: '100%', height: '100%'}}
              source={img_bg}>
          <Header
            text={language[this.props.langId].add_new_order.title}
            onpress={() => this.props.navigation.goBack()}
          />
          <ScrollView>
              <this.renderItem />
          </ScrollView>
          {this.footer()}
          </ImageBackground>
        </SafeAreaView>
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.userData,
  cities: state.cities.cityData,
  langId: state.appReducer.langId,
  login: state.login,
});

export default connect(
  mapStateToProps,
  {postAnnouncements},
)(Main);
