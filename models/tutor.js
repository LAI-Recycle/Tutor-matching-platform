'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tutor = sequelize.define('Tutor', {
    name: DataTypes.STRING,
    tel: DataTypes.STRING,
    courseDescription: DataTypes.TEXT,
    teachingStyle: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Tutor',
    tableName: 'Tutors',
    underscored: true,
  });
  Tutor.associate = function(models) {
    // associations can be defined here
  };
  return Tutor;
};