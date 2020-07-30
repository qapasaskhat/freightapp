import React from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'
import styles from './styles'
import { Gilroy_Medium } from '../../const/fonts'
import { right } from '../../const/images'

const Item = ({
  name,
  phone_number,
  onpress
}) => {
    return (
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
          <Image source={right} style={{width:16, resizeMode: 'contain'}} />
        </View>
      </TouchableOpacity>
    );
  };
  export default Item