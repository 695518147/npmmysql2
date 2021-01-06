/*
 * @Author: zhangpeiyu
 * @Date: 2021-01-07 00:46:05
 * @LastEditTime: 2021-01-07 00:56:54
 * @Description: 我不是诗人，所以，只能够把爱你写进程序，当作不可解的密码，作为我一个人知道的秘密。
 */
const mysql2Util = require('./mysqlutil')


// 示例
mysql2Util.execute("SELECT * from user", [2]).then(item => {
    console.log(item)
}).finally(()=>mysql2Util.close())