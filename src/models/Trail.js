const { Model, DataTypes } = require('sequelize');

class Trail extends Model {
  static init(sequelize) {
      super.init({
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      }, {
          sequelize,
          tableName: 'trail'
      })
  }

  static associate(models) {

  }

}

module.exports = Trail;