import { StyleSheet,Dimensions } from 'react-native';
const { width,height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    container:{
        flex: 1,
        //justifyContent: 'center',
        //alignItems: "center",
        backgroundColor: '#fff',
        paddingTop: 40
    },
    
})
export default styles