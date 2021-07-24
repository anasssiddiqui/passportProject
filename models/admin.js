/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('admin', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		name: {
			type: DataTypes.STRING(20),
			allowNull: false,
			field: 'name'
		},
		email: {
			type: DataTypes.STRING(40),
			allowNull: false,
			field: 'email'
		},
		phone: {
			type: DataTypes.STRING(200),
			allowNull: false,
			defaultValue: '',
			field: 'phone'
		},
		discount: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: '%discount'
		},
		commision: {
			type: DataTypes.STRING(50),
			allowNull: false,
			field: 'commision'
		},
		banner: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'banner'
		},
		image: {
			type: DataTypes.STRING(100),
			allowNull: false,
			field: 'image'
		},
		status: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'status'
		},
		password: {
			type: DataTypes.STRING(70),
			allowNull: false,
			field: 'password'
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
		tableName: 'admin'
	});
};
