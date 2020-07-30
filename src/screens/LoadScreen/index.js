import React from 'react'
import {
    View,
    ActivityIndicator,
    StatusBar,
    SafeAreaView,
    Text,
    StyleSheet,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

class Load extends React.Component{
    async componentDidMount(){
        const { navigation } = this.props
        let status = await AsyncStorage.getItem('user')
        let user = JSON.parse(status)
        user? navigation.replace('MainClient'):navigation.replace('Login')
    }
    render() {
      return (
        <>
          <StatusBar barStyle='dark-content' />
          <SafeAreaView style={styles.container}>
              <ActivityIndicator color='red' />
          </SafeAreaView>
        </>
      )
    };
}

export default Load

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    }
})