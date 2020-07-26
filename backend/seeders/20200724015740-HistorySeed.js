'use strict'
const moment = require('moment')

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Histories', [
            {
                type: 1,
                amount: 10000,
                description: 'Eat',
                savingId: 1,
                createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
                updatedAt: moment().format('YYYY-MM-DD hh:mm:ss')
            },
            {
                type: 1,
                amount: 10000,
                description: 'Have fun',
                savingId: 1,
                createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
                updatedAt: moment().format('YYYY-MM-DD hh:mm:ss')
            },
            {
                type: 1,
                amount: 1000000,
                description: 'Buy a car',
                savingId: 2,
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
