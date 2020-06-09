const { Model, DataTypes } = require('sequelize');

class Document extends Model {
  static init(sequelize) {
      super.init({
        cpf: DataTypes.STRING, 
        pis: DataTypes.STRING, 
        rg: DataTypes.STRING, 
        titulo_eleitor: DataTypes.STRING, 
        titulo_zona: DataTypes.STRING, 
        titulo_secao: DataTypes.STRING, 
        certif_militar: DataTypes.STRING, 
        cnh: DataTypes.STRING, 
        ctps: DataTypes.STRING, 
        ctps_serie: DataTypes.STRING, 
        candidate_id: DataTypes.INTEGER
          
      }, {
          sequelize,
          tableName: 'document'
      })
  }

  static associate(models) {
    //this.belongsTo(models.Address, { foreignKey: 'address_id', as: 'address'});
    this.belongsTo(models.Candidate, { foreignKey: 'candidate_id', as: 'candidate'});
}
}

module.exports = Document;