/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('occupations', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        category: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'category'
        },
        status: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '1',
            field: 'status'
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('current_timestamp'),
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('current_timestamp'),
            field: 'updated_at'
        }
    }, {
        tableName: 'occupations'
    });
};