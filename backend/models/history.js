'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate (models) {
            models.History.belongsTo(models.Saving, { foreignKey: 'savingId' })
        }
    };
    History.init({
        type: DataTypes.INTEGER,
        description: DataTypes.STRING,
        amount: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'History'
    })
    return History
}
