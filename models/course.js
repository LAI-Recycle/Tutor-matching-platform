'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {

  };
  Course.init({
    userId: DataTypes.INTEGER,
    tutorId: DataTypes.INTEGER,
    booking: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Course',
    tableName: 'Courses',
    underscored: true,
  })
  return Course
}