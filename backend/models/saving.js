'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Saving extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate (models) {
            // models.Saving.belongsTo(models.User, { foreignKeys: 'id', as: 'saving' })
            models.Saving.hasOne(models.History, { foreignKey: 'id' })
        }
    };
    Saving.init({
        total_amount: DataTypes.INTEGER,
        monthly_amount: DataTypes.INTEGER,
        userId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Saving'
    })
    return Saving
}
