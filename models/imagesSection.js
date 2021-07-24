/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('imagesSection', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        isActive: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'isActive'
        },
        isUsed: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            field: 'isUsed'
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'image'
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
        tableName: 'imagesSection'
    });
};