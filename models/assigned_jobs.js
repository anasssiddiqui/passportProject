/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('assignedJobs', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		jobid: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'jobid'
		},
		userid: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'userid'
		},
		providerid: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'providerid'
		},
		status: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'status'
		},
		providerAmount: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'provider_amount'
		},
		adminCommision: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'admin_commision'
		},
		actualAmount: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'actual_amount'
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
		tableName: 'assigned_jobs'
	});
};
