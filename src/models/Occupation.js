const { Model, DataTypes } = require('sequelize');

class Occupation extends Model {
  static init(sequelize) {
      super.init({
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      company_id: DataTypes.INTEGER         
      }, {
          sequelize,
          tableName: 'occupation'
      })
  }

  static associate(models) {
    //this.belongsTo(models.Address, { foreignKey: 'address_id', as: 'address'});
    this.belongsTo(models.Company, { foreignKey: 'company_id', as: 'company'});
}
}

module.exports = Occupation;