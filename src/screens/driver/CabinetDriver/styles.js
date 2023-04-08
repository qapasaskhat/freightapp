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
        marginTop: '10%',
        //top: '45%',
        height: height/2,
        margin: 0,
    },
    shareView: {
        position: 'absolute', 
        right: 24, 
        top: 16, 
        zIndex: 1001
    },
    shareIcon: {
        width: 24,
        height: 24,
        tintColor: '#007BED'
    },
    titleStyle: {
        textAlign: 'center',
        marginTop: 18,
        fontSize: 20,
        fontFamily: 'Gilroy-Medium',
    },
    citySubTitle: {
        fontSize: 12,
        lineHeight: 16,
        color: '#B1B9C0',
        textAlign: 'center',
        fontFamily: 'Gilroy-Medium',
    },
    cityName: {
        color: '#007BED',
        fontSize: 18,
        lineHeight: 20,
        fontFamily: 'Gilroy-Medium',
        textAlign: 'center',
    },
    modalView: {
        backgroundColor: '#fff',
        height: height,
        alignItems: 'center',
        paddingVertical: 35,
        marginBottom: 30
    },
    cityTitle: {
        fontSize: 16,
        fontWeight:'bold',
        lineHeight: 20,
        paddingBottom: 6
    },
    cityBtn: {
        paddingHorizontal: 20,
        paddingVertical: 6,
        borderTopWidth: 0.6,
        width: '100%',
    }
})
export default styles