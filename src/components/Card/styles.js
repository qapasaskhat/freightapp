import { StyleSheet,Dimensions } from 'react-native';
const { width,height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: '#fff',
    },
    view:{
        width: width,
        height: height*0.5,
        backgroundColor:'#fff',
        borderWidth: 0.5,
        borderColor:'black'
    }
})
export default styles