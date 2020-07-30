import Screen from '../screens/Screen'
import { createStackNavigator } from 'react-navigation-stack'
import {Client} from './client'
import {Driver} from './driver'

const stack = createStackNavigator({
    Screen: {
        screen: Screen,
    },
    AuthClient:{
        screen: Client,
    },
    AuthDriver:{
        screen: Driver,
    },
},{
    initialRouteName:'Screen',
    headerMode: 'none'
})

export default stack