import { StyleSheet,Dimensions } from 'react-native';
const { width,height } = Dimensions.get('screen')
import { Gilroy_Medium } from '../../const/fonts'

const styles = StyleSheet.create({
    container:{
        flex: 1,
       // justifyContent: 'center',
        //alignItems: "center",
        backgroundColor: '#fff',
    },
    viewCheckBox:{
        flexDirection: 'row',
        marginTop: 6,
        marginLeft: 32,
        paddingHorizontal: 12,
        paddingVertical: 12
      },
      text:{
        fontSize: 14,
        color: '#B1B9C0', 
        marginLeft: 24,
        fontFamily: Gilroy_Medium
        },
        touch:{
          height: height*0.06,
          marginHorizontal: 38,
          backgroundColor: '#fff',
          borderRadius: 60,
          justifyContent: 'space-between',
          paddingHorizontal: 12,
          shadowColor: 'rgba(170, 178, 190, 0.25)',
          shadowOffset: {
            width: 1,
            height: 2,
          },
          shadowOpacity: 1,
          shadowRadius: 4,
          elevation: 5,
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
          paddingTop: 8,
        },
        body: {
          paddingVertical: 10,
          backgroundColor: '#fff',
        },
        cityTitle: {
          fontSize: 14,
          fontFamily: Gilroy_Medium,
          color: '#0B0B2A',
          paddingLeft: 50,
        },
        cityName: {
          fontSize: 16,
          fontFamily: Gilroy_Medium,
          lineHeight: 16,
          color: '#0B0B2A',
        },
        dropImg: {
          width: 16,
          height: 16,
          resizeMode: 'contain',
        },
        cityModalContainer: {
          backgroundColor: '#fff',
          height: height,
          alignItems: 'center',
          paddingTop: 20,
        },
        cityModalTitle: {
          fontSize: 16,
          fontWeight: 'bold',
          paddingBottom: 8
          //fontFamily: Gilroy_Bold,
        },
        cityModalSelect: {
          paddingHorizontal: 20,
          paddingVertical: 6,
          borderTopWidth: 0.6
        },
        cityModalBtnRow: {
          flexDirection:'row',
          justifyContent:'space-evenly',
          width: '100%',
          borderTopWidth: 0.6,
          paddingTop: 6
        },
        cityModalBtn: {
          paddingHorizontal: 20,
          paddingVertical: 5,
          backgroundColor: '#ececec',
          borderRadius: 10,
        },
        agreementText: {
          textAlign: 'center',
          color:'#007BED',
          fontFamily: Gilroy_Medium
        },
        termModal: {
          width:'100%',
          height:'90%',
          backgroundColor: '#fff',
          borderRadius: 11,
          padding: 30
        },
        termModalClose: {
          backgroundColor:'#007BED',
          padding:10,
          borderRadius: 30
        },
        termModalCloseText: {
          textAlign:'center',
          color:'#fff'
        }
})
export default styles