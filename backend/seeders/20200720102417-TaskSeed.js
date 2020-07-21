'use strict'
const moment = require('moment')

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Tasks', [
            {
                title: 'Do Something',
                description: null,
                priority: 1,
                due_date: moment().add(7, 'days').format('YYYY-MM-DD hh:mm:ss'),
                userId: 1,
                createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
                updatedAt: moment().format('YYYY-MM-DD hh:mm:ss')
            },
            {
                title: 'Do Something Else',
                description: null,
                priority: 1,
                due_date: moment().add(7, 'days').format('YYYY-MM-DD hh:mm:ss'),
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
