'use strict'
const faker = require('faker')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = await queryInterface.sequelize.query(
      'SELECT id FROM Categories;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    await queryInterface.bulkInsert('Tutors',
      Array.from({ length: 50 }, () => ({
        name: faker.name.findName(),
        tel: faker.phone.phoneNumber(),
        introduction: faker.lorem.text(),
        teaching_style: faker.lorem.text(),
        tutor_time: 30,
        video_link: "http",
        image: `https://loremflickr.com/320/240/man,girl/?random=${Math.random() * 100}`,
        booking: '[ "Tuesday", "Wednesday" ]',
        created_at: new Date(),
        updated_at: new Date(),
        category_id: categories[Math.floor(Math.random() * categories.length)].id
      }))
    )
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tutors', {})
  }
}