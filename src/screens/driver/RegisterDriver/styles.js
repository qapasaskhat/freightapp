import { StyleSheet,Dimensions } from 'react-native';
const { width,height } = Dimensions.get('screen')
import { Gilroy_Medium } from '../../../const/fonts'

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
        }
})
export default styles