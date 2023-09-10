'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Tutor extends Model {

    static associate (models) {
      Tutor.belongsTo(models.Category, { foreignKey: 'categoryId' })
      Tutor.hasMany(models.Comment, { foreignKey: 'tutorId' })
      Tutor.belongsToMany(models.User, {
        through: models.Course, // 透過 Course 表來建立關聯
        foreignKey: 'tutorId', // 對 Course 表設定 FK
        as: 'CourseUsers' // 幫這個關聯取個名稱
      })
      Tutor.belongsTo(models.User, { foreignKey: 'userId' })
    }
  };
  Tutor.init({
    name: DataTypes.STRING,
    tel: DataTypes.STRING,
    introduction: DataTypes.TEXT,
    teachingStyle: DataTypes.TEXT,
    tutorTime: DataTypes.STRING,
    videoLink: DataTypes.STRING,
    image: DataTypes.STRING,
    booking:DataTypes.STRING,
    viewCounts: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tutor',
    tableName: 'Tutors',
    underscored: true,
  })
  return Tutor
}