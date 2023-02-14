import SQLiteStorage from 'react-native-sqlite-storage';
SQLiteStorage.DEBUG(true);
let database_name = "Test.db";
let database_version = "1.0";//版本号
let database_displayname = "MySQLite";
let database_size = -1;//-1应该是表示无限制

let db;
var SQLite = {
  // 开启数据库
  open() {
    return new Promise((resolve, reject) => {
      db = SQLiteStorage.openDatabase(
        database_name,
        database_version,
        database_displayname,
        database_size,
        () => {
          this._successCB('open');
          console.log('打开了');
          resolve('success')
        },
        (err) => {
          this._errorCB('open', err);
          reject("error")
        });
      resolve(db)

      return db;
    })
  },
  //关闭数据库
  close() {
    if (db) {
      this._successCB('close');
      db.close();
    } else {
      console.log("SQLiteStorage not open");
    }
    db = null;
  },
  //  初始化数据表
  initialize() {
    if (!db) {
      this.open();
    }
  },
  //创建表
  createTable(sql) {
    db.transaction((tx) => {
      // console.log('sql',sql);
      tx.executeSql(sql
        , [], () => {
          this._successCB('成功', '创建表成功！' + sql);
          // console.log('创建了')
        }, (err) => {
          this._errorCB('executeSql', err, '创建表失败！' + sql);
        });
    }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
      this._errorCB('transaction', err);
    }, () => {
      this._successCB('操作成功');
    });
  },
  deleteTable(table_name) {
    db.transaction((tx) => {
      tx.executeSql('DROP TABLE ' + table_name
        , [], () => {
          this._successCB('成功', '删除' + table_name + '表成功！');
        }, (err) => {
          this._errorCB('executeSql', err, '删除' + table_name + '表失败！');
        });
    }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
      this._errorCB('transaction', err);
    }, () => {
      // this._successCB('操作成功');
    });
  },
  // 增加函数
  insertSQL(sql_str) {
    this.initialize();
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(sql_str, [], (result) => {
          console.log("插入数据成功insertSQL11 " + sql_str);
          resolve(true)
        }, (err) => {
          console.log('插入数据insertSQL', err);
          resolve(false)
        }
        )
      }, (error) => {
        this._errorCB('数据插入失败insertSQL', error);
        resolve(false)
      }, () => {
        this._successCB("插入数据成功insertSQL " + sql_str);
        resolve(true)
      });
    })

  },
  /**
   * [getMsgInfoFromTable 根据id获取某一条信息]
   * @param  {[type]} tableName [表名]
   * @param  {[type]} key        [字段名称，要根据此字段进行获取对应的数据]
   * @param  {[type]} value        [要获取数据的唯一标识]
   */
  getMsgInfoFromTable(tableName, key, value, callBack) {
    this.initialize();
    let sql = `SELECT * FROM ${tableName} WHERE ${key} = ${value}`
    console.log(`getMsgInfoFromTable ${tableName} sql is =${sql}`)
    db.transaction((tx) => {
      tx.executeSql(
        sql,
        [],
        (tx, results) => {
          callBack && callBack(true, results.rows.item(0))
          console.log(`getMsgInfoFromTable ${tableName} executeSql success`)
        },
        (err) => {
          this._errorCB('插入执行失败 updateSQL' + sql, err);
          callBack && callBack(false, err)
          console.log('getMsgInfoFromTable  executeSql error=', err)
        })
    },
      (err) => {
        console.log('getMsgInfoFromTable  transaction error=', err)
      },
      () => {
        // console.log(`getMsgInfoFromTable ${tableName} transaction success`)
      })
  },

  /**
   *
   * [insertDataToTable 插入或者更新数据]
   * @param  {[type]} tableName [表名]
   * @param  {[type]} data      [数据]
   */
  insertDataToTable(tableName, data, callBack) {
    this.initialize();
    let sql = `INSERT OR REPLACE INTO ${tableName} (${Object.keys(data).join(',')}) VALUES (${Array(Object.keys(data).length).fill('?').join(',')})`
    // console.log(`insertDataToTable ${tableName} sql is =${sql}`)
    db.transaction((tx) => {
      tx.executeSql(
        sql,
        Object.values(data),
        () => {
          callBack && callBack(true)
          console.log(`insertDataToTable ${tableName} executeSql success`)
        },
        (err) => {
          callBack && callBack(false, err);
          // this._errorCB('插入执行失败 updateSQL' + sql, err);
          // api.getDeviceIdSendError({"error": err, "sql": sql});
          console.log('insertDataToTable  executeSql error=', err)
        })
    },
      (err) => {
        console.log('insertDataToTable  transaction error=', err)
      },
      () => {
        // console.log(data);
        console.log(`insertDataToTable ${tableName} transaction success`)
      })
  },
  execsql(sql_str) {
    this.initialize();
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(sql_str, [], (tx, results) => {
          // console.log("修改数据成功 execsql ", results.rows);
          // console.log("---", results.rows.item());
          // console.log("---", results.rows.raw());
          resolve(results.rows)
        }, (err) => {
          console.log('修改数据 execsql', err);
          this._errorCB('数据修改执行失败 updateSQL' + sql_str, err);
          resolve(false)
        }
        )
      }, (error) => {
        this._errorCB('数据修改失败 execsql', error);
        resolve(false)
      }, () => {
        this._successCB('修改数据成功 execsql ' + sql_str);
        resolve(true)
      });
    })
  },
  // 修改函数
  updateSQL(sql_str) {
    this.initialize();
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(sql_str, [], () => {
          // console.log("修改数据成功 updateSQL" + sql_str);
          resolve(true)
        }, (err) => {
          console.log('修改数据 updateSQL' + sql_str, err);
          this._errorCB('数据修改执行失败 updateSQL' + sql_str, err);
          resolve(false)
        }
        )
      }, (error) => {
        this._errorCB('数据修改失败 updateSQL' + sql_str, error);
        resolve(false)
      }, () => {
        // this._successCB('修改数据成功 updateSQL' + sql_str);
        resolve(true)
      });
    })

  },
  // 查询 参数为SQL
  async selectSQL(sql_str, page_num, page_size) {
    this.initialize();
    if (!page_num) {
      page_num = 1
    }
    if (!page_size) {
      page_size = 10
    }
    var index_f = sql_str.indexOf(';')
    if (index_f == -1) {
      console.log(false, 'sql non-existent  ; ')
    }
    var count_ = await this.countSQL(sql_str)
    if (page_num < 1) {
      page_num = 1
    }
    var limit_s = (page_num - 1) * page_size
    var limit_e = page_size
    sql_str = sql_str.substr(0, index_f) + ' limit ' + limit_s + ',' + limit_e + ';'
    this.initialize();
    console.log('sql_str',sql_str);
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(sql_str, [],
          (tx, results) => {
            let datas = [];
            for (let i = 0; i < results.rows.length; i++) {
              let info = results.rows.item(i);
              datas.push(info)
            }
            console.log('results.rows.lengt');
            this._successCB('数据查询成功，一共' + results.rows.length + '条用户数据')
            // console.log('数据查询成功，一共' + results.rows.length + '条用户数据')
            var page_data = new Object()
            page_data.page_size = page_size
            page_data.page_num = page_num
            page_data.data_list = datas
            if (count_ > 0) {
              page_data.page_count = Math.ceil(count_ / page_size)
            } else {
              page_data.page_count = 0
            }
            // callback(page_data, '查询成功')
            resolve(page_data)
          },
          (err) => {
            this._errorCB('数据查询失败 selectSQL' + sql_str, err);
            //   console.log('selectSQL   1')
            var ong = { data_list: [], page_count: 0, page_num: 1, page_size: 10 }
            resolve(ong)
          })
      },
        (err) => {
          // console.log('selectSQL   2')
          this._errorCB('数据查询失败 selectSQL' + sql_str, err);
          var ong = { data_list: [], page_count: 0, page_num: 1, page_size: 10 }
          resolve(ong)
        },
        () => {
          console.log('selectSQL   3')
          // var ong ={data_list:[],page_count:0,page_num:1,page_size:10}
          //   resolve(ong)
        })
    })

  },
  // 删除函数
  deleteData(sql_str) {//删除表中的数据
    if (!db) {
      this.open();
    }
    this.initialize();
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(sql_str, [], () => {
          console.log("删除数据成功 deleteData");
          resolve(true)
        }, (err) => {
          this._errorCB('删除数据失败 deleteData ' + sql_str, err);
          console.log('删除数据 deleteData', err);
          resolve(false)
        }
        )
      }, (error) => {

        this._errorCB('数据删除失败 deleteData', error);
        resolve(false)
      }, () => {
        this._successCB('删除数据成功 deleteData');
        resolve(false)
      });
    })
  },
  // 统计总数
  countSQL(count_sql) {
    if (!db) {
      this.open();
    }
    this.initialize();

    //         console.log(count_sql)
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(count_sql, [],
          (tx, results) => {
            let datas = [];
            for (let i = 0; i < results.rows.length; i++) {
              let info = results.rows.item(i);
              datas.push(info)
            }
            // console.log(datas,"$$$$$$$$$$$$$$$$$$$$$$$$$")
            resolve(datas[0].count)
          },
          (err) => {
            this._errorCB('数据统计失败 countSQL ' + count_sql, err);
            //   console.log('selectSQL   1')
            resolve(0)
          })
      },
        (err) => {
          this._errorCB('数据统计失败 countSQL ' + count_sql, err);
          // console.log('selectSQL   2')
          resolve(0)
        },
        () => {
          // console.log('selectSQL   3')
          resolve(0)
        })
    });
  },
  // 数据库执行成功
  _successCB(name) {
    console.log("SQLiteStorage " + name + " success");
  },
  // 数据库执行失败
  _errorCB(name, err) {
    console.log("SQLiteStorage " + name);
    console.log(err);
  },
}
export {SQLiteStorage}
module.exports = SQLite;
