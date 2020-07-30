import React from 'react'
import {View,Text} from 'react-native'
const isEmpty =(text)=>{
    return(
      <View style={{
        flex: 1,
        alignItems: 'center',
        marginTop: 32
      }}> 
        <View style={{
          width: 100,
          height: 100,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 12
        }}>
          <Text style={{textAlign: 'center'}}>{text}</Text>
        </View>
      </View>
    )
  }
  export default isEmpty