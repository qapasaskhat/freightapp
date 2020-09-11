import React from 'react'
import {
    View,
    Text,
    Switch
} from 'react-native'

const pushComponent = ({
  isEnabled,
  onChange,
  text
})=>{
    return(
        <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 14,
          paddingHorizontal: 24,
          alignItems:'center',
          borderBottomWidth:1,
          paddingBottom: 3,
          borderBottomColor: '#B1B9C0'
        }}>
        <Text>{text}</Text>
        <Switch
          trackColor={{false: '#767577', true: 'rgba(33, 150, 245, 0.5)'}}
          thumbColor={isEnabled ? '#2196F5' : '#f4f3f4'}
          ios_backgroundColor="rgba(33, 150, 245, 0.5)"
          value={isEnabled}
          onValueChange={onChange}
        />
      </View>
    )
}

export default pushComponent