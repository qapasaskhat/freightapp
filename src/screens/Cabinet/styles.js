import { StyleSheet,Dimensions } from 'react-native';
import { Gilroy_Bold } from '../../const/fonts'
const { width,height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
    },
    modal:{
        backgroundColor: '#fff',
        margin: 0
    },
    img_bg:{
        width: '100%',
        height: '100%',
        resizeMode: 'center',
      },
    cabinet: {
        textAlign: 'center',
        marginTop: 18,
        fontSize: 20,
        fontFamily: 'Gilroy-Medium',
      },
      city:{
        fontSize: 12,
        lineHeight: 24,
        color: '#B1B9C0',
        textAlign: 'center',
        fontFamily: 'Gilroy-Medium',
      },
      cityName:{
        color: '#007BED',
        fontSize: 18,
        lineHeight: 24,
        fontFamily: 'Gilroy-Medium',
        textAlign: 'center',
      },
      orders:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderTopColor: '#ececec',
        borderTopWidth: 0.5,
        borderBottomColor: '#ececec',
        borderBottomWidth: 0.5,
      },
      arhived:{
        color: '#007BED',
        fontSize: 14,
        lineHeight: 24,
      },
      shareBtn: {
        position: 'absolute', right: 24, top: 16, zIndex: 1001
      },
      shareIcon: {
        width: 24,
        height: 24,
        tintColor: '#007BED'
      },
      findCityBtn:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      dropIconStl: {
        marginLeft: 6, 
        width: 12, 
        resizeMode: 'contain'
      },
      orderTitle: {
        fontSize: 12,
        textTransform: 'uppercase',
        color: '#B1B9C0',
        lineHeight: 24,
        fontFamily: 'Gilroy-Medium',
      },
      modalStyle: {
        backgroundColor: '#fff',
        height: height-100,
        alignItems: 'center',
        paddingVertical: 30,
        marginBottom: 30
      },
      modalTitle: {
        fontSize: 16,
        fontFamily: Gilroy_Bold,
        lineHeight: 20,
        paddingBottom: 6
      },
      cityItem: {
        paddingHorizontal: 20,
        paddingVertical: 6,
        borderTopWidth: 0.6,
        width: '100%',
      },
      modalRow: {
        flexDirection:'row',
        justifyContent:'space-evenly',
        width: '100%',
        borderTopWidth: 0.6,
        paddingTop: 6
      },
      bottomView: {  
        position: 'absolute',
        width: '100%',
        backgroundColor: '#fff',
        bottom: 0 
      },
      nextPrevBtn: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        backgroundColor: '#ececec',
        borderRadius: 10,
      }
})
export default styles