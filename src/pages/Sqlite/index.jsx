import React from 'react';
import {Card, Text} from '@ui-kitten/components';
import SQLite from '../../utils/sqlite';

const createTable = () => {
  SQLite.createTable(
    'CREATE TABLE IF NOT EXISTS DATA(' +
      'id INTEGER PRIMARY KEY  AUTOINCREMENT,' +
      'title VARCHAR,' +
      'value VARCHAR,' +
      'time VARCHAR,' +
      'year VARCHAR,' +
      'month VARCHAR,' +
      'epc VARCHAR,' +
      'sku VARCHAR,' +
      'date VARCHAR)',
  );
};
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

  SQLite.insertDataToTable('DATA', {
    title: dataRandom(),
    value: dataRandom(),
    time: dataRandom(),
    year: dataRandom(),
    month: dataRandom(),
    epc: dataRandom(),
    sku: dataRandom(),
    date: dataRandom(),
  });
};
const count = async () => {
  // await SQLite.execsql('SELECT COUNT(*) as num from DATA')
//   const data = await SQLite.execsql('SELECT * from DATA');
  const data = await SQLite.execsql('SELECT * from asset_info');
  console.log('data------', data.item(0));
};
const SqliteView = () => {
  SQLite.open();
  //   createTable();
  //     select()
  count();
  //   insert();
  // setTimeout(()=>{
  // for (let index = 0; index < 50000; index++) {
  //     // const element = array[index];
  //     insert();
  // }
  // },2000)
  return (
    <Card>
      <Text>2323</Text>
    </Card>
  );
};
export default SqliteView;
