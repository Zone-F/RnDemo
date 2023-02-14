import React, {useEffect, useState} from 'react';
import {Card, Text, Spinner, Button} from '@ui-kitten/components';
import SQLite from '../../utils/sqlite';
import SQLiteStorage from 'react-native-sqlite-storage';
SQLiteStorage.DEBUG(true);
import {View} from 'react-native';

const select = async () => {
  // console.log('开始查询');
  const data = await SQLite.selectSQL('SELECT * FROM DATA;', 1, 1000);
  // console.log('查询结果', data);
};
const insert = () => {
  const dataRandom = () => {
    return Number(Math.random().toString().substr(3, 16) + Date.now()).toString(
      36,
    );
  };
  //   const data = new Array(5000).fill(0).map(() => {
  //     return {
  //       title: dataRandom(),
  //       value: dataRandom(),
  //       time: dataRandom(),
  //       year: dataRandom(),
  //       month: dataRandom(),
  //       epc: dataRandom(),
  //       sku: dataRandom(),
  //       date: dataRandom(),
  //     };
  //   });
  //   const sqlBody = data.map(item => {
  //     let keys = Object.keys(item);
  //     return `UNION SELECT '${keys.map(data => item[data]).join(',')}'`;
  //   });
  // //   console.log('sqlBody', sqlBody);
  //   let sql = `INSERT INTO DATA  (title,value,time,year,month,epc,sku,date),
  //     SELECT '${sqlBody[0]}'
  //     '${sqlBody.join(',')}'`;
  // //   console.log('sq;', sql);
  //     // SQLite.insertSQL('DATA',data);

  // SQLite.insertDataToTable('DATA', {
  //   title: dataRandom(),
  //   value: dataRandom(),
  //   time: dataRandom(),
  //   year: dataRandom(),
  //   month: dataRandom(),
  //   epc: dataRandom(),
  //   sku: dataRandom(),
  //   date: dataRandom(),
  // });
};
const createIndex = async () => {
  await SQLite.execsql(
    'CREATE INDEX "epc_task" ON "asset_info" ("channel_name" ASC)',
  );
};
const SqliteView = () => {
  useEffect(() => {
    let db = SQLite.open();
    // setDb(db)
    createIndex();
  }, []);

  let [list, setList] = useState([]);
  let [num, setNum] = useState(0);
  let [db, setDb] = useState({});
  let [loading, setLoading] = useState(false);
  let [time, setTime] = useState(0);

  const count = async () => {
    try {
      setLoading(true);
      // let data = [];
      let start = new Date().getTime();
      //   let sqls = [];
      for (let index = 0; index < 7; index++) {
        await SQLite.execsql(
          `SELECT epc from asset_info where channel_name='手动添加' LIMIT 10000 OFFSET ${
            index * 10000
          };`,
        );
      }
      // const list = await SQLite.execsql(
      //   sqls,
      // );
      // console.log('list',list.item());

      setLoading(false);
      let end = new Date().getTime();
      setTime((end - start) / 1000 + time);
      // console.log('length', list[0]);
      // setList([list[0]]);
      // console.log('data------', data.item(0));
    } catch (error) {
      console.log('error', error);
    }
  };
  const counts = async () => {
    setTime(0);
    setLoading(true);
    let start = new Date().getTime();
    const res = await SQLite.execsql('SELECT COUNT(*) as num from asset_info');
    console.log(res.raw());
    let a = res.raw()[0].num
    setNum(a)
    setLoading(false);
    let end = new Date().getTime();
    setTime((end - start) / 1000 + time);
  };
  const select =  async () => {
    setTime(0);
    setLoading(true);
    let data = [];
    let start = new Date().getTime();
    for (let index = 0; index < 30; index++) {
      const list =  await SQLite.execsql(
        `SELECT * from asset_info where epc='15B6780102180D8218C000B000000000';`,
      );
      console.log('加载完毕', list.length);
    }
    setLoading(false);
    let end = new Date().getTime();
    setTime((end - start) / 1000 + time);
  };
  const LoadingModel = () => (
    <View>
      <Spinner size="giant" />
      <Text>加载中....</Text>
    </View>
  );
  //   createTable();
  //     select()
  // count();
  // insert();
  // setTimeout(()=>{
  // for (let index = 0; index < 50000; index++) {
  //     // const element = array[index];
  //     insert();
  // }
  // },2000)
  return (
    <Card>
      <Button onPress={count}>读取3个字段，每次查询1W条，查询7次</Button>
      <Button onPress={select}>执行30次查询</Button>
      <Button onPress={counts}>查询当前数据库内数据数量</Button>
      <Text>
        耗时{time}秒
      </Text>
      <Text>
        总数{num}条
      </Text>
      <Text>{list[0]}</Text>
      {loading && <LoadingModel />}
    </Card>
  );
};
export default SqliteView;
