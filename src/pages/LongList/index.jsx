import React, { useState, useCallback, useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, RefreshControl } from 'react-native';
import { ListItem } from '@ui-kitten/components';
import SQLite from '../../utils/sqlite';



const Item = (data) => {
    console.log('data', data);
    return (
        <ListItem
            title='UI Kitten'
            description='A set of React Native components'
        />
    );
}

const select = async () => {
    // console.log('开始查询');
    // const data = 
    // console.log('查询结果', data);
};


const App = () => {

    const [list, setList] = useState();
    const [page, setPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        console.log('到底了---');
        const res = await SQLite.selectSQL('SELECT * FROM asset_info', page, 10);
        setRefreshing(true);
        console.log('res-----------', res)
        setRefreshing(false);
        // setList([{ title: "3" }, { title: "4" },])
    }, []);


    useEffect(() => {
        SQLite.open();
        onRefresh();
    }, [])

    const renderItem = ({ item }) => (
        <Item title={item.title} key={item.title} />
    );
    // setTimeout(()=>{
    //     setList([
    //         {
    //             title:1
    //         }
    //     ])



    // },2000)
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={list}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});

export default App;