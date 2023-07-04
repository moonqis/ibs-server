module.exports = (sequelize, Sequelize) => {


    const Foodcheck = sequelize.define("foodcheck", {
        name: {
            type: Sequelize.STRING
        },
        english_name: {
            type: Sequelize.STRING
        },
        sort: {
            type: Sequelize.STRING
        },
        picurl: {
            type: Sequelize.STRING
        },
        detail: {
            type: Sequelize.STRING

        },
        detail_weight1: {
            type: Sequelize.STRING
        },
        detail_weight2: {
            type: Sequelize.STRING
        },
        detail_weight3: {
            type: Sequelize.STRING
        },
        detail_resource1: {
            type: Sequelize.STRING
        },
        detail_resource2: {
            type: Sequelize.STRING
        },
        detail_resource3: {
            type: Sequelize.STRING
        },
        detail_detail1: {
            type: Sequelize.STRING
        },
        detail_detail2: {
            type: Sequelize.STRING
        },
        detail_detail3: {
            type: Sequelize.STRING
        },
        state: {
            type: Sequelize.STRING
        },
        author: {
            type: Sequelize.STRING
        },
        admin: {
            type: Sequelize.STRING
        },
        result: {
            type: Sequelize.STRING
        },
        createDate: { type: Sequelize.DATE, field: 'create_date' },
        createBy: { type: Sequelize.STRING, field: 'create_by' },
        updateDate: { type: Sequelize.DATE, field: 'update_date' },  //field 转驼峰
        updateBy: { type: Sequelize.STRING, field: 'update_by' },

    }, {
        timestamps: false,  //去除createAt updateAt
        // freezeTableName: true,  //使用自定义表名
        // 实例对应的表名
        // tableName: 'user',
        // 如果需要sequelize帮你维护createdAt,updatedAt和deletedAt必须先启用timestamps功能
        // 将createdAt对应到数据库的created_at字段
        createdAt: 'created_at',
        // 将updatedAt对应到数据库的updated_at字段
        updatedAt: 'updated_at',
        //And deletedAt to be called destroyTime (remember to enable paranoid for this to work)
        deletedAt: false, //'deleted_at',
        //删除数据时不删除数据，而是更新deleteAt字段 如果需要设置为true，则上面的deleteAt字段不能为false，也就是说必须启用
        paranoid: false
    })
    return Foodcheck
}
