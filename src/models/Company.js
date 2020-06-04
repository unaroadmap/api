const { Model, DataTypes } = require('sequelize');

class Company extends Model {
  static init(sequelize) {
      super.init({
      name: DataTypes.STRING,
      cnpj: DataTypes.STRING,
      //address_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      email: DataTypes.STRING,
      telephone: DataTypes.STRING,
      cell_phone: DataTypes.STRING
          
      }, {
          sequelize,
          tableName: 'company'
      })
  }

  static associate(models) {
    //this.belongsTo(models.Address, { foreignKey: 'address_id', as: 'address'});
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user'});
}
}

module.exports = Company;