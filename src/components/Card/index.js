import React from 'react'
import {
    View,
    Text
} from 'react-native'

import styles from './styles'

const card = ({
    text
})=>{
    return(
        <View style={styles.view}>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

export default card