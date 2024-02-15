const { DataTypes } = require('sequelize');

module.exports = (database) => {
  database.define('temperaments', {
    id:{
      type: DataTypes.UUID,
      primaryKey: true
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, { timestamps: false });
};
