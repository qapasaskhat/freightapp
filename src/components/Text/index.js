import React from 'react'
import { Text } from 'react-native'
import { Gilroy_Medium } from '../../const/fonts'

const txt = ({text}) => {
    return(
        <Text style = {{
            fontSize: 24,
            fontFamily: Gilroy_Medium,
            textAlign: 'center',
            margin: 24,
        }}>
            {text}
        </Text>
    )
}

export default txt