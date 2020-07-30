import React from 'react'
import {
    View,
    Text,
    Switch
} from 'react-native'

const pushComponent = ({
  isEnabled,
  onChange
})=>{
    return(
        <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 24,
        }}>
        <Text>Получать уведомления</Text>
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