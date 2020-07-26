'use strict'
const moment = require('moment')

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Savings', [
            {
                total_amount: 1000000,
                monthly_amount: 1000000,
                userId: 1,
                createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
                updatedAt: moment().format('YYYY-MM-DD hh:mm:ss')
            },
            {
                total_amount: 1000000,
                monthly_amount: 1000000,
                userId: 2,
                createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
                updatedAt: moment().format('YYYY-MM-DD hh:mm:ss')
            }
        ], {})
    },

    down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    }
}
