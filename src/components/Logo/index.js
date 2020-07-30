import React from 'react';
import {View, Text, Image} from 'react-native';
import {logo_0, logo_1} from '../../const/images';

import styles from './styles';

const logo = ({little}) => {
  return (
    <View>
      {
          little?
          <View style={styles.view}>
              <Image source={logo_1} style={styles.img_logo_1}/>
          </View>:
        <View style={styles.view}>
        <Image source={logo_0} style={styles.img_logo} />
      </View>}
    </View>
  );
};
export default logo;
