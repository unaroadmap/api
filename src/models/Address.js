const { Model, DataTypes } = require('sequelize');

class Address extends Model {
  static init(sequelize) {
      super.init({
          cep: DataTypes.STRING,
          logradouro: DataTypes.STRING,
          number: DataTypes.INTEGER,
          district_id: DataTypes.INTEGER,
          user_id: DataTypes.INTEGER
      }, {
          sequelize,
          tableName: 'address'
      })
  }

  static associate(models) {
      this.belongsTo(models.District, { foreignKey: 'district_id', as: 'district'});
      this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user'});
  }

}

module.exports = Address;