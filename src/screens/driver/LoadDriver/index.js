import React from 'react'
import {
    StatusBar,
    SafeAreaView,
    StyleSheet,
    ActivityIndicator
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

class Load extends React.Component{
    async componentDidMount(){
        const { navigation } = this.props
        let status = await AsyncStorage.getItem('user')
        let user = JSON.parse(status)
        user ? navigation.replace('MainDriver'):navigation.replace('LoginDriver')
    }
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
export default Load
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    }
})