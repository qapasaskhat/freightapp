import {StyleSheet, Dimensions} from 'react-native';
import {
  Gilroy_Bold,
  Gilroy_Light,
  Gilroy_Medium,
  Gilroy_Regular,
  Gilroy_Thin,
} from '../../const/fonts';
const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  btn: {
    backgroundColor: '#007BED',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    borderRadius: 60,
    marginHorizontal: 38,
    height: height*0.06,
    shadowColor: 'rgba(0, 123, 237, 0.4)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,

    elevation: 5,
    marginBottom:5,
    zIndex: 1001
  },
  btnText: {
    fontSize: 18,
    lineHeight: 20,
    //fontWeight: 'bold',
    fontFamily: Gilroy_Bold,
    color: '#fff',
    // marginVertical: 20,
    textAlign: 'center',
  },
  light_btn: {
    //backgroundColor: '#007BED',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    borderRadius: 60,
    marginHorizontal: 38,
    borderColor: '#007BED',
    borderWidth: 1,
    height: height*0.06,
  },
  light_btnText: {
    fontSize: 18,
    lineHeight: 20,
    //fontWeight: 'bold',
    fontFamily: Gilroy_Bold,
    color: '#0B0B2A',
    //marginVertical: 20,
  },
});
export default styles;
