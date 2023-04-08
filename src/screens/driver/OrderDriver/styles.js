import { StyleSheet,Dimensions } from 'react-native';
const { width,height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
    },
    bottomView: {
        position: 'absolute',
        width: '100%',
        backgroundColor: '#fff',
        bottom: 0,
    }
})
export default styles