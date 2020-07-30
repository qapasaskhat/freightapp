import { 
    StyleSheet, 
    Dimensions 
} from 'react-native'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    view:{
        height: 177,
        width: '100%',
        position: 'absolute',
        backgroundColor: 'red',
        bottom: 0
    }
})

export default styles