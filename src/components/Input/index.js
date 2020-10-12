import React from 'react';
import {View, Text, TextInput, Dimensions} from 'react-native';
import styles from './styles';
const h = Dimensions.get('window').height;

const button = ({
  text,
  password,
  placeholder,
  onchange,
  multiline,
  height,
  radius,
  top,
  value,
  keyboardType
}) => {
  return (
    <View style={styles.inputView}>
      <Text style={styles.textInput}>{text}</Text>
      <TextInput
        multiline={multiline}
        placeholderTextColor="#cecece"
        keyboardType={keyboardType}
        secureTextEntry={password}
        value={value}
        style={[
          styles.input,
          {
            color: '#1A1A1A',
            height: height ? height : h * 0.06,
            borderRadius: radius ? radius : 60,
            paddingTop: top ? 10 : 0,
            textAlignVertical: top ? 'top' : 'center',
          },
        ]}
        placeholder={placeholder}
        onChangeText={onchange}
      />
    </View>
  );
};
export default button;
