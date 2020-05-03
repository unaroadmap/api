const { Model, DataTypes } = require('sequelize');

class City extends Model {
  static init(sequelize) {
      super.init({
          name: DataTypes.STRING,
          state_id:  DataTypes.INTEGER
          
      }, {
          sequelize,
          tableName: 'city'
      })
  }

  static associate(models) {
    this.belongsTo(models.State, { foreignKey: 'state_id', as: 'state'});
}
}

module.exports = City;