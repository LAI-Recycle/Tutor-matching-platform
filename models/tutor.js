'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Tutor extends Model {

    static associate (models) {
      Tutor.belongsTo(models.Category, { foreignKey: 'categoryId' })
    }
  };
  Tutor.init({
    name: DataTypes.STRING,
    tel: DataTypes.STRING,
    courseDescription: DataTypes.TEXT,
    teachingStyle: DataTypes.TEXT,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tutor',
    // tableName: 'Tutors',
    underscored: true,
  })
  return Tutor
}