import React from 'react'
import { Image,View,Text } from 'react-native'
import { menu, support, logo_1 } from '../const/images'

import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Register from '../screens/driver/RegisterDriver'
import Login from '../screens/driver/LoginDriver'
import CodeInput from '../screens/driver/CodeInputDriver'
import Cabinet from '../screens/driver/CabinetDriver'
import Support from '../screens/Support'
import Order from '../screens/driver/OrderDriver'
import EditProfile from '../screens/driver/EditProfile'
import ResetPassword from '../screens/driver/ResetPassword'
import Load from '../screens/driver/LoadDriver'
import MainIcon from './menu/main'
import SupprotIcon from './menu/support'

const mainStack = createStackNavigator({
    CabinetStack:{
        screen: Cabinet
    },
    OrderDriver:{
        screen: Order
    },
    EditProfileDriver:{
        screen: EditProfile
    }
},{
    headerMode: 'none',
    mode: 'modal',
})

const tabs = createBottomTabNavigator({
    tabDriver:{
        screen: mainStack,
        navigationOptions:{
            tabBarIcon: ({tintColor})=>
            <MainIcon tintColor={tintColor} />
        },
    },
    Empty:{
        screen: mainStack,
        navigationOptions:{
            tabBarIcon: ({tintColor})=><View>
                <Image source={logo_1} style={{width:80, height: 80,resizeMode: 'contain', marginTop: -40}} />
            </View>,
            tabBarOnPress: ()=>{}
        }
    },
    Support:{
        screen: Support,
        screen: Support,
        navigationOptions:{
            tabBarIcon: ({tintColor})=>
            <SupprotIcon tintColor={tintColor} />
        }
    }
},{
    tabBarOptions:{
        showLabel: false,
        style:{
            height: 104,
            borderTopColor:'#fff'
        },
        adaptive: true,
    }
})


 export const Driver = createStackNavigator({
    RegisterDriver:{
        screen: Register,
    },
    LoginDriver:{
        screen: Login,
    },
    CodeInputDriver:{
        screen: CodeInput
    },
    MainDriver:{
        screen: tabs
    },
    ResetPasswordDriver:{
        screen: ResetPassword
    },
    Load:{
        screen: Load
    }
},{
    initialRouteName: 'Load',
    headerMode: 'none'
})

