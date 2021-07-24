/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('terms', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		termsContent: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'terms_content'
		},
		privacyPolicy: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'privacy_policy'
		},
		aboutUs: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'about_us'
		},
		termsofuse: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'termsofuse'
		},
		cookiespolicys: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'cookiespolicys'
		},
		status: {
			type: DataTypes.STRING(10),
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
			field: 'updatedAt'
		}
	}, {
		tableName: 'terms'
	});
};
