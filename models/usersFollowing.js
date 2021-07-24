/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('usersFollowing', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        userBy: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'userBy'
        },
        userTo: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'userTo'
        },
        isConfirm: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'isConfirm'
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: sequelize.fn('current_timestamp'),
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: sequelize.fn('current_timestamp'),
            field: 'updated_at'
        }
    }, {
        tableName: 'usersFollowing'
    });
};