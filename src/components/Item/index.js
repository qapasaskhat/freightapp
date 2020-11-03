import React from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity, ActivityIndicator
} from 'react-native'
import styles from './styles'
import { Gilroy_Medium } from '../../const/fonts'
import { right, edit } from '../../const/images'

const Item = ({
  name,
  phone_number,
  onpress,
  load
}) => {
    return (
      load?
      <ActivityIndicator />:
      <TouchableOpacity
        style={styles.view} onPress={onpress}>
        <View
          style={{
            marginVertical: 12,
            marginHorizontal: 12,
          }}>
          <Text style={{
            fontSize: 18,
            fontFamily: Gilroy_Medium
          }}>{name}</Text>
          <Text style={{
            fontSize: 14,
            fontFamily: Gilroy_Medium,
            color: '#B1B9C0',
            marginTop: 6
          }}>{phone_number}</Text>
        </View>
        <View
          style={styles.change}>
          <Image source={edit} style={{width:16, resizeMode: 'contain'}} />
        </View>
      </TouchableOpacity>
    );
  };
  export default Item