const Sequelize = require('sequelize');
const { sqlsqlz } = require('../utils/mysql');
const { errorHander } = require('../utils/errorHander');

/**
 * @desc 删除数据
 * @param where 删除条件
 * @param table 表名
 * @param sequeObj sequelize 参数
*/
exports.deleteSQL = ({
    ctx,
    where = {},
    table,
    sequeObj = {
        id: { type: Sequelize.INTEGER, primaryKey: true }
    }
}) => {

    const Task = sqlsqlz.define(table, sequeObj, {
        timestamps: false,
        freezeTableName: true
    });

    return Task.destroy({
        where: where
    }).then(res => {
        return res;
    }).catch(err => {
        errorHander(ctx, { err });
    });
};