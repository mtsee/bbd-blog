const Sequelize = require('sequelize');
const { sqlsqlz } = require('../utils/mysql');
const { errorHander } = require('../utils/errorHander');

/**
 * @desc 更新数据
 * @param obj {name: xx, type: xx, owner: xx} 参数 name 是搜索名字，模糊匹配， type 是类型，可以是''
 * @param table 表名
 * @param where 是否有条件
 * @param callBack 回调函数
*/
exports.updateSQL = ({
    ctx, table, sequeObj = { type: Sequelize.INTEGER, primaryKey: true }, data, where = {}
}) => {
    return sqlsqlz.define(table, sequeObj, {
        timestamps: false,
        freezeTableName: true
    }).update(data, {
        where: where
    }).then(res => {
        return res;
    }).catch(err => {
        errorHander(ctx, { err });
    });
}