/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('postsReport', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        reportBy: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'reportBy'
        },
        postId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'postId'
        },
        reason: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'reason'
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'description'
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
        tableName: 'postsReport'
    });
};