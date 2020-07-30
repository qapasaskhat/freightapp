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
          marginBottom: 20
        }
})
export default styles