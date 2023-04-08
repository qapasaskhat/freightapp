import React from 'react'
import {Image,View,Text} from 'react-native'

import MainScreen from '../screens/Main'
import OrderScreen from '../screens/Order'
import Screen from '../screens/Screen'
import RegisterScreen from '../screens/Register'
import LoginScreen from '../screens/Login'
import CabinetScreen from '../screens/Cabinet'
import CodeInputScreen from '../screens/CodeInput'
import Support from '../screens/Support'
import EditOrder from '../screens/EditOrder'
import OpenOrder from '../screens/OpenOrder'
import EditProfile from '../screens/EditProfile'
import Reset from '../screens/ResetPassword'
import Load from '../screens/LoadScreen'
import CodeInputLogin from '../screens/CodeInputLogin'

import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import { menu, support, logo_1 } from '../const/images'

import MainIcon from './menu/main'
import SupportIcon from './menu/support'

const mainStack = createStackNavigator({
    Main: {
        screen: MainScreen
    },
    Cabinet:{
        screen: CabinetScreen
    },
    Order: {
        screen: OrderScreen
    },
    EditOrder: {
        screen: EditOrder
    },
    OpenOrder:{
        screen: OpenOrder
    },
    EditProfileClient:{
        screen: EditProfile
    }

},{
    initialRouteName: 'Cabinet',
    mode: 'modal',
    headerMode:'none'
})

const tabs = createBottomTabNavigator({
    MainTab:{
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
    SupportTab:{
        screen: Support,
        navigationOptions:{
            tabBarIcon: ({tintColor})=>
            <SupportIcon tintColor={tintColor} />
        }
    }
},{
    tabBarOptions:{
        showLabel: false,
        style:{
            height: 90,
            borderTopColor:'#fff',
        },
        adaptive: true,
    }
})

 export const Client = createStackNavigator({
    Register:{
        screen: RegisterScreen,
    },
    Login:{
        screen: LoginScreen,
    },
    CodeInput:{
        screen: CodeInputScreen,
    },
    CodeInputLogin: {
        screen: CodeInputLogin,
    },
    MainClient:{
        screen: tabs,
    },
    ResetPassword:{
        screen: Reset
    },
    Load:{
        screen: Load
    }
},{
    initialRouteName: 'Load',
    headerMode: 'none'
})

