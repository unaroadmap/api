const { Model, DataTypes } = require('sequelize');

class State extends Model {
  static init(sequelize) {
      super.init({
          name: DataTypes.STRING,
          sigla: DataTypes.STRING,
          
      }, {
          sequelize,
          tableName: 'state'
      })
  }

  static associate(models) {
    //this.hasMany(models.Address, { foreignKey: 'user_id', as: 'addresses'});
    //this.belongsToMany(models.Tech, { foreignKey: 'user_id', through: 'user_techs', as: 'techs' });
}
}

module.exports = State;