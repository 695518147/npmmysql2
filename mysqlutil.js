// get the client
const mysql = require('mysql2');

class Mysql2Util {
    constructor() {
        this.pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            database: 'test',
            password: 'rootroot',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }

    /**
     * 执行sql
     * @param {*} sql sql语句
     * @param {*} args 参数
     */
    async execute(sql, args, isConvert=true) {
        let [rows, fields] = await this.pool.promise().query(sql, args)
        if (isConvert){
            return this.camel(rows)
        }
        return rows
    }

    close() {
        this.pool.end()
    }

    camelToString(param) {
        return JSON.stringify(this.camel(param))
    }

    /**
     * 下划线转驼峰
     */
    camel(param) {
        if (Object.prototype.toString.call(param) === '[object Array]') {
            for (const value of param) {
                if (['[object Object]', '[object Array]'].indexOf(Object.prototype.toString.call(value)) == -1) {
                    continue
                }
                this.camel(value)
            }
        } else if (Object.prototype.toString.call(param) === '[object Object]') {
            for (let key in param) {
                let newKey = [...key].reduce((prev, cur, index, arr) => {
                    if (prev.includes('_')) {
                        return prev.replace('_', '') + cur.toUpperCase()
                    }
                    return prev + cur
                }, '');
                if (['[object Object]', '[object Array]'].indexOf(Object.prototype.toString.call(param[key])) == -1) {
                    if (newKey != key) {
                        param[newKey] = param[key]
                        delete param[key]
                    }
                } else {
                    let val = this.camel(param[key])
                    delete param[key]
                    param[newKey] = val
                }

            }
        }
        return param;
    }
}

module.exports = new Mysql2Util()


