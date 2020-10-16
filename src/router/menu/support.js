import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import {menu, support} from '../../const/images'
import {language} from '../../const/const'
import {connect} from 'react-redux'

class Support extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
      const {tintColor} = this.props
    return (
    <View style={{justifyContent:'center', alignItems: 'center',marginRight: -20}}>
        <Image source={support} style={{width: 20,height: 20, tintColor: tintColor, resizeMode: 'contain'}}/>
        <Text style={{
            color: tintColor,
            marginTop: 3
        }}>{language[this.props.langId].menu.support}</Text>
    </View>
    );
  }
}
const mapStateToProps = state => ({
    langId: state.appReducer.langId
  });
export default connect(mapStateToProps) (Support);
