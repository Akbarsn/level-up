'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Habit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate (models) {
            models.Habit.belongsTo(models.User, { foreignKeys: 'id' })
        }
    };
    Habit.init({
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        type: DataTypes.INTEGER,
        userId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Habit'
    })
    return Habit
}
