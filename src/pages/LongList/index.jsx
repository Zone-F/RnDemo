import React, {useState, useCallback, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  RefreshControl,
} from 'react-native';
import {ListItem, Button} from '@ui-kitten/components';
import SQLite from '../../utils/sqlite';

const Item = ({data}) => {
  // console.log('data', data);
  return <ListItem title={data.name} description={data.epc} />;
};

const select = async page => {
  const res = await SQLite.execsql(
    `SELECT * FROM asset_info LIMIT 100 OFFSET ${page * 100};`,
  );
  let data = [];
  for (let i = 0; i < res.length; i++) {
    let info = res.item(i);
    data.push(info);
  }
  return data;
};

const App = () => {
  let [list, setList] = useState([]);
  let [page, setPage] = useState(0);
  console.log('2323232');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    // console.log('到底了---', 'page', page);
    setRefreshing(true);
    const res = await select(page);
    // console.log('res-----------', res[0]);
    setRefreshing(false);
    const newPage = (page += 1);
    setPage(newPage);

    console.log('----列表长度----', list.length);
    const datas = list.concat(res);
    console.log('datas', datas.length);
    setList(datas);
    // console.log('page',page);
  };

  useEffect(() => {
    async function init() {
      await SQLite.open();
      onRefresh();
    }
    init();
  }, []);

  const renderItem = ({item}) => <Item data={item} key={item.title} />;

  return (
    <SafeAreaView style={styles.container}>
      <Button onPress={onRefresh}>下一页</Button>
      <Text>{`当前第${page}页，一共${page * 100}条数据`}</Text>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} />}
      />
    </SafeAreaView>
  );
};

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
