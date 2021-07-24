/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('contactus', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		userid: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'userid'
		},
		name: {
			type: DataTypes.STRING(50),
			allowNull: false,
			defaultValue: '',
			field: 'name'
		},
		email: {
			type: DataTypes.STRING(50),
			allowNull: false,
			defaultValue: '',
			field: 'email'
		},
		message: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: '',
			field: 'message'
		},
		status: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0',
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
		tableName: 'contactus'
	});
};
