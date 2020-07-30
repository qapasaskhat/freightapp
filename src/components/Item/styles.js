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
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        backgroundColor: '#F3F9FF',
      },
    change: {
        //position: 'absolute',
        //backgroundColor: '#cecece',
        right: 10,
        //top: -20,
        borderRadius: 50,
        //height: 42,
       // width: 42,
        justifyContent: 'center',
        alignItems: 'center',
      }
})
export default styles
