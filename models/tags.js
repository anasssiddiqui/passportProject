/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('tags', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        tag: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'tag'
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'image'
        },
        status: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '1',
            field: 'status'
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
        tableName: 'tags'
    });
};