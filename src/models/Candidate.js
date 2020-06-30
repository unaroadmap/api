const { Model, DataTypes } = require('sequelize');

class Candidate extends Model {
  static init(sequelize) {
      super.init({
        name: DataTypes.STRING,
        birthday: DataTypes.DATE, 
        sexo: DataTypes.STRING, 
        schooling: DataTypes.STRING, 
        nationality: DataTypes.STRING, 
        mother_name: DataTypes.STRING, 
        father_name: DataTypes.STRING, 
        telephone: DataTypes.STRING, 
        cell_phone: DataTypes.STRING, 
        //address_id: DataTypes.INTEGER, 
        user_id: DataTypes.INTEGER,
          
      }, {
          sequelize,
          tableName: 'candidate'
      })
  }

  static associate(models) {
    //this.belongsTo(models.Address, { foreignKey: 'address_id', as: 'address'});
    this.belongsTo(models.User, { 
      foreignKey: 'user_id', 
      as: 'user'
    });

    this.belongsToMany(models.Project, { 
      through: 'projects_candidates',
      as: 'projects',
      foreignKey: 'candidate_id',
  });

  // this.hasMany(models.Topic, {
  //    onDelete: "cascade"
  // });
}
}

module.exports = Candidate;