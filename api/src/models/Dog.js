const { DataTypes } = require('sequelize');

module.exports = (database) => {
  database.define('dog', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      autoComplete: true
    },
    image:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    height:{
      type: DataTypes.STRING,
      allowNull: false
    },
    width:{
      type: DataTypes.STRING,
      allowNull: false
    },
    years:{
      type: DataTypes.STRING,
      allowNull: false
    },
  }, { timestamps: false });
};
