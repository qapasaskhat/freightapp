import { StyleSheet, Dimensions } from 'react-native'
const {width,height} = Dimensions.get('window')
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff',
    },
    img_bg:{
        width: '100%',
        height: '100%',
        resizeMode: 'center'
    },
    bottom: {
        position: 'absolute',
        width: '100%',
        backgroundColor: '#fff',
        bottom: 0,
      }
})
export default styles