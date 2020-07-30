import React from 'react'
import {
    SafeAreaView,
    View,
    Text,
    StatusBar,
    ImageBackground,
    FlatList,
    ActivityIndicator,
    Alert
} from 'react-native'
import styles from './styles'
import { img_bg } from '../../const/images'
import Header from '../../components/Header'
import List from '../../components/List'
import isEmpty from '../../components/Empty'
import axios from 'axios';
import Toast from 'react-native-simple-toast'

class Order extends React.Component{
    state={
        refreshing: false,
        items: [],
        error: null,
        loading: false,
        user: {}
    }
    componentDidMount=()=>{
        this.getAnnouncements()
    }
    renderItem = ({item})=>{
        return <List 
            onpressDelete={()=>this.delete()} 
            line
            body={item.body}
            phone_number={item.phone}
            from={item.from}
            to={item.to}
            name='Вы' />
    }
    delete=()=>{
        Alert.alert(
            "Удалить",
            "Действительно ли вы хотите удалить?",
            [
              { text: "Удалить", onPress: async() => {
                Toast.show('Удалено');
              } },
              {
                text: "Отмена",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              }
            ],
            { cancelable: false }
          );
    }
    onRefresh = ()=>{
        this.setState({
            refreshing: true
        })
        this.setState({
            refreshing: false
        })
    }
    getAnnouncements=()=>{
        const api = `http://gruz.sport-market.kz/api/announcements/user/3/archived/`
        this.setState({
            loading: true
        })
        axios.get(api).then((response)=>{
            console.log(response.data)
            this.setState({
                items: response.data.data,
                loading: false
            })
        }).catch(error=>{
            this.setState({
                error: error,
                loading: false
            })
        })
    }
    getUser = ()=>{
        const api = ''
        axios.get(api).then((response)=>{
            console.log(response.data)
            this.setState({
                user: response.data.data
            })
        }).catch(error=>{
            console.log(error)
        })
    }
    render(){
        const { items, loading, error, refreshing} = this.state
        return(
            <>
            <StatusBar />
            <SafeAreaView style={styles.container}>
                <ImageBackground source={img_bg} style={styles.img_bg}>
                    <Header text={'Архив заказов'} onpress={()=>this.props.navigation.goBack()}/>
                    { loading? 
                    <View>
                        <ActivityIndicator />
                    </View>
                    :<FlatList 
                        data={items}
                        renderItem={(item)=>this.renderItem(item)}
                        ListEmptyComponent={isEmpty('У вас нет архива')}
                        refreshing={refreshing}
                        onRefresh={()=>this.onRefresh()}
                        />}
                </ImageBackground>
            </SafeAreaView>
            </>
        )
    }
}
export default Order