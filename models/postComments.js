/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('postComments', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        parentCommentId: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'parentCommentId'
        },
        userId: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'userId'
        },
        postId: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'postId'
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'comment'
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
        tableName: 'postComments'
    });
};