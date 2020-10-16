import { StyleSheet,Dimensions } from 'react-native';
const { width,height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    container:{
        flex: 1,
        //justifyContent: 'center',
        //alignItems: "center",
        backgroundColor: '#fff',
    },
    modal:{
        backgroundColor: '#fff',
        marginTop: '20%',
        //top: '45%',
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
        //fontFamily: 'Gilroy-Medium',
        fontSize: 14,
        lineHeight: 24,
      }

})
export default styles