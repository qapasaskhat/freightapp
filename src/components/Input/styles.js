import { StyleSheet,Dimensions } from 'react-native';
import { Gilroy_Medium } from '../../const/fonts'
const { width,height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: '#fff',
    },
    inputView:{
        marginTop:12,
        borderRadius: 60,
        marginHorizontal: 32,
        //width: 340,
        marginVertical: 20
    },
    textInput:{
        fontSize: 14,
        marginBottom: 5,
        paddingLeft: 16,
        fontFamily: Gilroy_Medium
    },
    input:{
        fontSize: 14,
        paddingLeft: 16,
        padding:5,
        width: '100%',
        backgroundColor: '#ececec',
        //padding:20,
        borderRadius: 30,
        //opacity: 0.3,
        height: height*0.06,
    }
})
export default styles
