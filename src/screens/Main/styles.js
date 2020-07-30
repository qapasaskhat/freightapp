import { StyleSheet,Dimensions } from 'react-native';
const { width,height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    container:{
        flex: 1,
        //justifyContent: 'center',
        //alignItems: "center",
        backgroundColor: '#fff',
    },
    errorText:{
        fontSize: 10,
            marginLeft: '15%',
            marginTop: -15,
            color: 'red'
    },
    footer:{
        position: 'absolute',
        width: '100%',
        backgroundColor: '#fff',
        bottom: 0,
      }
})
export default styles