'use strict'
const faker = require('faker')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Tutors',
      Array.from({ length: 50 }, () => ({
        name: faker.name.findName(),
        tel: faker.phone.phoneNumber(),
        image: `https://loremflickr.com/320/240/man,girl/all`,
        course_description: faker.lorem.text(),
        teaching_style: faker.lorem.text(),
        category_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      }))
    )
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tutors', {})
  }
}