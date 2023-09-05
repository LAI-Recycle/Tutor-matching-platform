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
    introduction: DataTypes.TEXT,
    teachingStyle: DataTypes.TEXT,
    tutor_time: DataTypes.STRING,
    video_link: DataTypes.STRING,
    image: DataTypes.STRING,
    viewCounts: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tutor',
    underscored: true,
  })
  return Tutor
}