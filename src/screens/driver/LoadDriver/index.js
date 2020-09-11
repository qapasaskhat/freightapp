import React from 'react'
import {
    StatusBar,
    SafeAreaView,
    StyleSheet,
    ActivityIndicator
} from 'react-native'
import {connect} from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'

class Load extends React.Component{
    async componentDidMount(){
      const {rehydrated,login} = this.props;
      console.log(rehydrated)
      if (rehydrated) {
        this._onLoading();
      }else{}
        //user ? navigation.replace('MainDriver'):navigation.replace('LoginDriver')
    }
    _onLoading = async () => {
      const {login} = this.props;
      console.log(login+ ' login')
      if (login && login.token) {
          this.props.navigation.replace('MainDriver')
      } else {
        console.log('AuthStack');
        this.props.navigation.replace('LoginDriver')
      }
    };
    render() {
      return (
        <>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView style={styles.container}>
              <ActivityIndicator />
          </SafeAreaView>
        </>
      )
    };
}
const mapStateToProps = state => ({
  login: state.login,
  rehydrated: state._persist.rehydrated,
});
export default connect(mapStateToProps) (Load)
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    }
})