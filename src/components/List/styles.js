import { StyleSheet,Dimensions } from 'react-native';
const { width,height } = Dimensions.get('screen')
import { Gilroy_Medium, Gilroy_Regular,Gilroy_Bold,Gilroy_Light } from '../../const/fonts'

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: '#fff',
    },
    view:{
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.35,
        shadowRadius: 3.84,

        elevation: 5,
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
    },
    empty:{
        backgroundColor: '#F7F8F9',
        //marginTop:10,
        //height:100,
        paddingHorizontal: 20,
        paddingVertical: 14,
        flexDirection: 'row',
        borderRadius: 10,
        alignItems:'center',
        marginBottom:2
    },
    img_trash:{
        width: 26,
        height: 26,
        resizeMode: 'contain'
    },
    text_date:{
        fontSize: 12,
        color: '#B1B9C0',
        fontFamily: Gilroy_Medium,
        lineHeight: 24,
        
    },
    name_style:{
        fontSize: 18,
        lineHeight: 24,
        fontFamily: Gilroy_Bold,
        fontWeight: '600'
    },
    desc_text:{
        fontSize: 16,
        lineHeight: 21,
        fontFamily: Gilroy_Light
    },
    text_view:{
        paddingHorizontal: 20,
        marginTop: -10
    },
    text_address:{
        fontSize: 12,
        lineHeight: 24,
        fontFamily: Gilroy_Light
    },
    phone_number:{
        fontSize: 16,
        fontFamily: Gilroy_Bold,
        lineHeight: 24,
        marginVertical: 12
    },
    line:{
        height:1,
        backgroundColor: '#ececec',
        marginVertical: 12
    }
})
export default styles
