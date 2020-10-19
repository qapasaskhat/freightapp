import React from 'react'
import {
    View,
    Text,
    Image
} from 'react-native'
import { right } from '../../const/images'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Gilroy_Medium, Gilroy_Bold } from '../../const/fonts'

const header = ({text, onpress, left})=>{
    return(
        <View style={{
            backgroundColor: '#fff',
            paddingHorizontal: 16,
            justifyContent: 'center',
            height: 70,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.00,
            elevation: 1,

        }}>
            <View style={{flexDirection: 'row',justifyContent: left?'center':'space-between', alignItems:"center"}}>
            { left?null:
                <TouchableOpacity style={{
                    height:40,
                    width:40,
                    borderRadius: 20,
                    backgroundColor: '#F3F9FF',
                    justifyContent: 'center',
                    alignItems: 'center'
                }} onPress={onpress}>
                     <Image source={right} style={{width: 20, resizeMode: 'contain', transform: [{ rotate: '180deg' }]}}/>
                </TouchableOpacity>}
                <Text style={{
                    fontSize: 18,
                    textAlign: 'center',
                    //fontFamily: Gilroy_Medium,
                    //fontWeight: 'bold'
                }}>
                    {text}
                </Text>
                <Text></Text>
            </View>
        </View>
    )
}

export default header