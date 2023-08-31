'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Tutor extends Model {

    static associate (models) {
      Tutor.belongsTo(models.Category, { foreignKey: 'categoryId' })
      Tutor.hasMany(models.Comment, { foreignKey: 'tutorId' })
    }
  };
  Tutor.init({
    name: DataTypes.STRING,
    tel: DataTypes.STRING,
    courseDescription: DataTypes.TEXT,
    teachingStyle: DataTypes.TEXT,
    image: DataTypes.STRING,
    viewCounts: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tutor',
    underscored: true,
  })
  return Tutor
}