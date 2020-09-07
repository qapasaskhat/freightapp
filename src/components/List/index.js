import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import styles from './styles';
import {trash, right} from '../../const/images';

const List = ({
  date,
  phone_number,
  name,
  onpressOrder,
  desc,
  line,
  del,
  onpressDelete,
  body,
  from,
  to,
}) => {
  const formatPhoneNumber = phoneNumberString => {
    let cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    let match = cleaned.match(/^(\d{1}|)?(\d{3})(\d{3})(\d{2})(\d{2})$/);
    if (match) {
      let intlCode = match[1] ? `+${match[1]} ` : '+7 ';
      return [
        intlCode,
        '(',
        match[2],
        ') ',
        match[3],
        '-',
        match[4],
        '-',
        match[5],
      ].join('');
    }
  };

  return (
    <TouchableHighlight onPress={onpressOrder} underlayColor="#ececec">
      <View style={styles.view}>
        <View style={styles.row}>
          <Text style={styles.text_date}>{date}</Text>
          {del ? (
            <View />
          ) : (
            <TouchableOpacity onPress={onpressDelete}>
              <Image source={trash} style={styles.img_trash} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.text_view}>
          <Text style={styles.name_style}>{name}</Text>
          {line ? <View style={styles.line} /> : null}
          <Text style={styles.desc_text}>{body}</Text>
          {desc ? <Text style={styles.desc_text}>{desc}</Text> : null}
          {phone_number ? (
            <Text style={styles.phone_number}>
              {formatPhoneNumber(phone_number)}
            </Text>
          ) : null}
        </View>
        <View style={styles.empty}>
          <Text style={styles.text_address}>{from}</Text>
          <Image
            source={right}
            style={{
              width: 16,
              height: 8,
              resizeMode: 'contain',
              marginBottom: 5,
            }}
          />
          <Text style={styles.text_address}>{to}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};
export default List;
