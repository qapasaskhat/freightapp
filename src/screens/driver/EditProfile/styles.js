import {
    StyleSheet,
    Dimensions
} from 'react-native'
const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff'
    },
    bgImg: {
        width: '100%',
        height: '100%',
    },
    mainContainer: {
        flexDirection:'row', 
        justifyContent:'space-between',
        marginHorizontal:20,
        backgroundColor:'#fff',
        marginTop: 20,
        paddingVertical:10,
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal:30,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    langStyle: {
        fontSize: 15,
        fontWeight: '600',
    },
    switchStyle: {
        alignSelf:'center',
        flexDirection:'row',
        width:80,
        height:30,
        borderRadius:30,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    switchBtn: {
        height: 30, 
        width:40, 
        justifyContent:'center', 
        alignItems:'center',
        borderRadius:20
    },
    mainContent: {
        backgroundColor: '#fff',
        shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          marginTop:6,
          marginHorizontal:20,
          paddingVertical:10,
          borderRadius: 10
    },
    textStyle: {
        textAlign: 'center',
        color:'#007BED',
        fontWeight:'bold',
    },
    modalView: {
        width:'100%',
        height:'90%',
        backgroundColor: '#fff',
        borderRadius: 11,
        padding: 30
    },
    modalClose: {
        backgroundColor:'#007BED',
        padding:10,
        borderRadius: 30
    },
    btn: {
        backgroundColor: '#007BED',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 60,
        marginHorizontal: 38,
        height: height*0.05,
        shadowColor: 'rgba(0, 123, 237, 0.4)',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 5,
        marginBottom:5,
        zIndex: 1001,
        marginBottom: 12
    },
    btnText: {
        fontSize: 18,
        lineHeight: 20,
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold'
    },
})
export default styles
