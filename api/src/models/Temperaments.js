const { DataTypes } = require('sequelize');

module.exports = (database) => {
  database.define('temperaments', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, { timestamps: false });
};
