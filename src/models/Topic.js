const { Model, DataTypes } = require('sequelize');

class Topic extends Model {
  static init(sequelize) {
      super.init({
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      url: DataTypes.STRING,
      order: DataTypes.INTEGER,
      trail_id: DataTypes.INTEGER         
      }, {
          sequelize,
          tableName: 'topic'
      })
  }

  static associate(models) {
    //this.belongsTo(models.Address, { foreignKey: 'address_id', as: 'address'});
    this.belongsTo(models.Trail, { foreignKey: 'trail_id', as: 'trail'});
}
}

module.exports = Topic;