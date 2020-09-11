import React from 'react';
import {
  View,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  Text,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {fetchUser} from '../../api/users/actions'
import {connect} from 'react-redux';

class Load extends React.Component {

  componentDidMount=async()=>{
    //this.props.navigation.navigate('Login')
    const {rehydrated,login} = this.props;
    if (rehydrated && rehydrated) {
      this._onLoading();
    }else{
    }
  }

  componentDidUpdate=(prevProps)=>{
    if (this.props.rehydrated !== prevProps.rehydrated) {
      this._onLoading();
    }else{
    }
  }

  _onLoading = async () => {
    const {login} = this.props;
    console.log(login+ ' login')
    if (login && login.token) {
        this.props.navigation.replace('MainClient')
    } else {
      console.log('AuthStack');
      this.props.navigation.replace('Login')
    }
  };

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <ActivityIndicator color="red" />
        </SafeAreaView>
      </>
    );
  }
}

const mapStateToProps = state => ({
  login: state.login,
  rehydrated: state._persist.rehydrated,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Load);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
