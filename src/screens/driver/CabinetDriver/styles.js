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
        height: height/2

    }
})
export default styles