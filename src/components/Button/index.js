import React from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import styles from './styles';

const button = ({text, onpress, light, active, load}) => {
  return (
    
      light ? (
        <TouchableOpacity style={styles.light_btn} onPress={onpress}>
          <Text style={styles.light_btnText}>{text}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={[styles.btn,{backgroundColor: active? '#007BED': '#ececec',}]} onPress={onpress}>
         {load? <ActivityIndicator color='#fff' />:
          <Text style={styles.btnText}>{text}</Text>}
        </TouchableOpacity>
      )
    
  );
};
export default button;
