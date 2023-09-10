'use strict'
const bcrypt = require('bcryptjs')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{ // 一次新增三筆資料
      email: 'root@example.com',
      password: await bcrypt.hash('12345678', 10),
      is_admin: true,
      name: 'root',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'user1@example.com',
      password: await bcrypt.hash('12345678', 10),
      is_admin: false,
      name: 'user1',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'user2@example.com',
      password: await bcrypt.hash('12345678', 10),
      is_admin: false,
      name: 'user2',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'user3@example.com',
      password: await bcrypt.hash('12345678', 10),
      is_admin: false,
      name: 'user3',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'user4@example.com',
      password: await bcrypt.hash('12345678', 10),
      is_admin: false,
      name: 'user4',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'user5@example.com',
      password: await bcrypt.hash('12345678', 10),
      is_admin: false,
      name: 'user5',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'user6@example.com',
      password: await bcrypt.hash('12345678', 10),
      is_admin: false,
      name: 'user6',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'user7@example.com',
      password: await bcrypt.hash('12345678', 10),
      is_admin: false,
      name: 'user7',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'user8@example.com',
      password: await bcrypt.hash('12345678', 10),
      is_admin: false,
      name: 'user8',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'user9@example.com',
      password: await bcrypt.hash('12345678', 10),
      is_admin: false,
      name: 'user9',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'user10@example.com',
      password: await bcrypt.hash('12345678', 10),
      is_admin: false,
      name: 'user10',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'user11@example.com',
      password: await bcrypt.hash('12345678', 10),
      is_admin: false,
      name: 'user11',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'user12@example.com',
      password: await bcrypt.hash('12345678', 10),
      is_admin: false,
      name: 'user12',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'user13@example.com',
      password: await bcrypt.hash('12345678', 10),
      is_admin: false,
      name: 'user13',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'user14@example.com',
      password: await bcrypt.hash('12345678', 10),
      is_admin: false,
      name: 'user14',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'user15@example.com',
      password: await bcrypt.hash('12345678', 10),
      is_admin: false,
      name: 'user15',
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },
  down: async (queryInterface, Sequelize) => { // 清空資料表中所有資料
    await queryInterface.bulkDelete('Users', {})
  }
}