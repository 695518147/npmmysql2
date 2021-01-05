// get the client
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'test',
    password: 'rootroot',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.promise().query("SELECT * from user")
    .then(([rows, fields]) => {
        console.log(camelToString(rows))
    })
    .catch(console.log)
    .then(() => pool.end());

function camelToString(param){
    return JSON.stringify(camel(param))
}
/**
 * 下划线转驼峰
 */
function camel(param) {
    if (Object.prototype.toString.call(param) === '[object Array]') {
        for (const value of param) {
            if (['[object Object]', '[object Array]'].indexOf(Object.prototype.toString.call(value)) == -1) {
                continue
            }
            camel(value)
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
                let val = camel(param[key])
                delete param[key]
                param[newKey] = val
            }

        }
    }
    return param;
}