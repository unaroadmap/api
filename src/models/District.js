const { Model, DataTypes } = require('sequelize');

class District extends Model {
  static init(sequelize) {
      super.init({
          name: DataTypes.STRING,
          city_id:  DataTypes.INTEGER
          
      }, {
          sequelize,
          tableName: 'district'
      })
  }

  static associate(models) {
    this.belongsTo(models.City, { foreignKey: 'city_id', as: 'city'});
}
}

module.exports = District;