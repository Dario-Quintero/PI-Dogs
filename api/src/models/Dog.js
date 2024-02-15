const { DataTypes } = require('sequelize');

module.exports = (database) => {
  database.define('dog', {
    id:{
      type: DataTypes.UUID,
      primaryKey: true
    },
    image:{
      type: DataTypes.STRING,
      allowNull: false
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    height:{
      type: DataTypes.STRING,
      allowNull: false
    },
    weight:{
      type: DataTypes.STRING,
      allowNull: false
    },
    years:{
      type: DataTypes.STRING,
      allowNull: false
    },
  }, { timestamps: false });
};
