module.exports = (sequelize, DataType) => {

  const User = sequelize.define('User', {
    id: {
      type: DataType.UUID,
      primaryKey: true,
    },
    username: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataType.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },  
    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
  });
  
  User.associate = (models) => {    
    User.belongsTo(models.UserType)
  };

  return User;

};