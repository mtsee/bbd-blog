const Sequelize = require('sequelize');
const { sqlsqlz } = require('../utils/mysql');
const { errorHander } = require('../utils/errorHander');

/**
 * @desc 保存数据到数据库
 * @param data 请求参数 {key: xx, key2: xx}
 * @param table 表名
 * @param sequeObj sequelize 参数
 * @return promise
*/
exports.createSQL = ({
    ctx,
    data,
    table,
    sequeObj = { id: { type: Sequelize.INTEGER, primaryKey: true } }
}) => {

    const Task = sqlsqlz.define(table, sequeObj, {
        timestamps: false,
        freezeTableName: true
    });

    return Task.create({ ...data })
        .then(res => {
            return res;
        }).catch(err => {
            errorHander(ctx, { err });
        });
}
