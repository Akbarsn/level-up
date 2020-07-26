'use strict'
const moment = require('moment')
const bcrypt = require('bcrypt')

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Users', [
            {
                full_name: 'Akbar S N',
                email: 'personal.akbarsn@gmail.com',
                username: 'akbarsn',
                password: bcrypt.hashSync('123456', 12),
                createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
                updatedAt: moment().format('YYYY-MM-DD hh:mm:ss')
            },
            {
                full_name: 'John Doe',
                email: 'johndoe@gmail.com',
                username: 'johndoe',
                password: bcrypt.hashSync('123456', 12),
                createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
                updatedAt: moment().format('YYYY-MM-DD hh:mm:ss')
            }
        ], {})
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {})
    }
}
