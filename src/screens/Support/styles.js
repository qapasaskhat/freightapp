import { StyleSheet,Dimensions } from 'react-native';
const { width,height } = Dimensions.get('screen')
import { Gilroy_Medium, Gilroy_Regular,Gilroy_Bold,Gilroy_Light } from '../../const/fonts'

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
    },
})
export default styles
