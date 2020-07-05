const { Model, DataTypes } = require('sequelize');

class Project extends Model {
  static init(sequelize) {
      super.init({
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      company_id: DataTypes.INTEGER,
      logo: DataTypes.STRING,
      str: DataTypes.STRING     
      }, {
          sequelize,
          tableName: 'project'
      })
  }

  static associate(models) {
    //this.belongsTo(models.Address, { foreignKey: 'address_id', as: 'address'});
    this.belongsTo(models.Company, { 
        foreignKey: 'company_id', 
        as: 'company'
    });

    this.belongsToMany(models.Candidate, { 
        through: 'projects_candidates',
        as: 'candidates',
        foreignKey: 'project_id',
    });

    this.belongsToMany(models.Trail, { 
        through: 'projects_trails',
        as: 'trails',
        foreignKey: 'project_id',
    });
}
}

module.exports = Project;