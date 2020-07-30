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
        backgroundColor: '#fff',
        marginTop: 24,
        //marginHorizontal: 40,
        alignItems: 'center'
    },
    img_logo:{
        height: height*0.14,
        width: '100%',
        resizeMode: 'contain'
    },
    img_logo_1:{
        width:'100%',
        height: height*0.08,
        resizeMode: 'contain'
    }
})
export default styles
