const { Model, DataTypes } = require('sequelize');

class Topic extends Model {
  static init(sequelize) {
      super.init({
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      order: DataTypes.INTEGER,
      url: DataTypes.STRING         
      }, {
          sequelize,
          tableName: 'topic'
      })
  }

  static associate(models) {
    //this.belongsTo(models.Address, { foreignKey: 'address_id', as: 'address'});
    this.belongsToMany(models.Trail, { 
        through: 'trails_topics',
        as: 'trails',
        foreignKey: 'topic_id',
    });
}
}

module.exports = Topic;