const { Model, DataTypes } = require('sequelize');

class Trail extends Model {
  static init(sequelize) {
      super.init({
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      }, {
          sequelize,
          tableName: 'trail'
      })
  }

  static associate(models) {

    this.belongsToMany(models.Project, { 
      through: 'projects_trails',
      as: 'projects',
      foreignKey: 'trail_id',
    });

    this.belongsToMany(models.Topic, { 
      through: 'trails_topics',
      as: 'topics',
      foreignKey: 'trail_id',
  });

  }

}

module.exports = Trail;