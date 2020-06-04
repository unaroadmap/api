const { Model, DataTypes } = require('sequelize');

class Project extends Model {
  static init(sequelize) {
      super.init({
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      company_id: DataTypes.INTEGER         
      }, {
          sequelize,
          tableName: 'project'
      })
  }

  static associate(models) {
    //this.belongsTo(models.Address, { foreignKey: 'address_id', as: 'address'});
    this.belongsTo(models.Company, { foreignKey: 'company_id', as: 'company'});
}
}

module.exports = Project;