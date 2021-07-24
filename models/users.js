/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('users', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        role: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '1',
            field: 'role'
        },
        username: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'username'
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: '',
            field: 'image'
        },
        thumbnail: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'thumbnail'
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: true,
            field: 'phone'
        },
        email: {
            type: DataTypes.STRING(200),
            allowNull: true,
            field: 'email'
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'description'
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'password'
        },
        wallet: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'wallet'
        },
        gender: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'gender'
        },
        forgotPassword: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: '',
            field: 'forgotPassword'
        },
        countryCode: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '91',
            field: 'countryCode'
        },
        socialId: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'socialId'
        },
        loginType: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'loginType'
        },
        notificationStatus: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '1',
            field: 'notificationStatus'
        },
        address: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'address'
        },
        lat: {
            type: DataTypes.STRING(100),
            allowNull: true,
            defaultValue: '',
            field: 'lat'
        },
        lng: {
            type: DataTypes.STRING(100),
            allowNull: true,
            defaultValue: '',
            field: 'lng'
        },
        deviceType: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'deviceType'
        },
        deviceTokken: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'deviceTokken'
        },
        loginPhase: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'loginPhase'
        },
        status: {
            type: DataTypes.INTEGER(4),
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
        tableName: 'users'
    });
};