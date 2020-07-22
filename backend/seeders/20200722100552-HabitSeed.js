'use strict'
const moment = require('moment')

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Habits', [
            {
                title: 'Exercise',
                description: 'Just do it',
                type: 1,
                userId: 1,
                createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
                updatedAt: moment().format('YYYY-MM-DD hh:mm:ss')
            },
            {
                title: 'Be productive',
                description: 'Just work',
                type: 1,
                userId: 2,
                createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
                updatedAt: moment().format('YYYY-MM-DD hh:mm:ss')
            },
            {
                title: 'Eat',
                description: 'It is important',
                type: 1,
                userId: 1,
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
