'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate (models) {
            models.Task.belongsTo(models.User, { foreignKeys: 'id' })
        }
    };
    Task.init({
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        priority: DataTypes.INTEGER,
        due_date: DataTypes.DATE,
        belong_to: DataTypes.INTEGER,
        userId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Task'
    })
    return Task
}
