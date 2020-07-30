import React from 'react'
import {
    View,
    Text,
} from 'react-native'
import Input from '../Input'

const orderInput = () =>{
    return(
        <View style={{ 
            backgroundColor: '#fff',
            margin: 26,
            borderRadius: 10
            }}>
            <Input text={'Введите номер телефона'} placeholder={'+7'} />
            <Input text={'Откуда'} placeholder={'Введите адрес отправления'} />
            <Input text={'Куда'} placeholder={'Введите адрес получения'} />
            <Input multiline height={120} top radius={14} text={'Описание груза'} placeholder={'Опишите свой заказ'} />
        </View>
    )
}

export default orderInput