'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate (models) {
            models.User.hasMany(models.Task, { foreignKey: 'userId', as: 'tasks' })
            models.User.hasMany(models.Habit, { foreignKey: 'userId', as: 'habits' })
            models.User.hasOne(models.Saving, { foreignKey: 'userId', as: 'saving' })
        }
    };
    User.init({
        full_name: DataTypes.STRING,
        email: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User'
    })
    return User
}
