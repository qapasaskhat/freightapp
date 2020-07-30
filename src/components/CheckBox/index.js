import React from 'react'
import {
    View,
    TouchableOpacity
} from 'react-native'
import styles from './styles'

const check = ({
    onChange,
    toggleCheckBox
}) =>{
    return(
        <TouchableOpacity style={ [styles.checkBox,{
            borderColor: toggleCheckBox?'#007BED':'#B1B9C0'
          }]} onPress={onChange}>
          <View style={{
            width: 13,
            height: 13,
            backgroundColor: toggleCheckBox ? '#007BED':'#B1B9C0',
          }} />
          </TouchableOpacity>
    )
}
export default check