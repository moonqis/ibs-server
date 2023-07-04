// const mysql = require("mysql");


module.exports={
    HOST: 'localhost', // 数据库连接地址
    USER: 'root', // 数据库登录用户名
    PASSWORD: '123', // 数据库登录密码
    DB: 'ibs-project' ,// 选择哪个数据表
    dialect: 'mysql', 

}




// sqlConnect:function(sql,sqlArr,callBack){
//     var pool = mysql.createPool(this.config);
//     pool.getConnection(function(err,conn){
//         console.log('123');
//         if(err){
//             console.log('连接失败');
//             return;
//         }
//         conn.query(sql,sqlArr,callBack);
//         conn.release();
//     })
// }