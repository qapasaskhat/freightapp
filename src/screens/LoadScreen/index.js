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
import {connect} from 'react-redux';

class Load extends React.Component {
  componentDidMount() {
    const {rehydrated} = this.props;
    if (rehydrated) {
      this._onLoading();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.rehydrated !== prevProps.rehydrated) {
      this._onLoading();
    }
  }

  _onLoading = async () => {
    const {login} = this.props;
    if (login && login.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${login.token}`;
      //if (appReducer.user.type === 0) {
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'MainClient'}],
        }),
      );
      // } else {
      //   this.props.navigation.dispatch(
      //     CommonActions.reset({
      //       index: 0,
      //       routes: [{name: 'Login'}],
      //     }),
      //   );
      // }
    } else {
      console.log('AuthStack');
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Login'}],
        }),
      );
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
