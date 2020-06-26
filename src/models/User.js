const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
      super.init({
          email: {
              type: DataTypes.STRING,
              validate: { 
                          isEmail: { 
                          msg: "O Campo deve conter um e-mail Válido"
                         }         
              },
              unique: {msg: "E-mail já Cadastrado."},
              allowNull: false              
              
          },
          status: DataTypes.STRING,
          profile: DataTypes.STRING,
          password: {
             type: DataTypes.STRING,
          }
      }, {
          sequelize
      })
  }

  static associate(models) {
    //this.hasMany(models.Address, { foreignKey: 'user_id', as: 'addresses'});
    //this.belongsToMany(models.Tech, { foreignKey: 'user_id', through: 'user_techs', as: 'techs' });
}
}

module.exports = User;