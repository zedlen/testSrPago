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
    lastname: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
    },
    birthdate: {
        type: DataType.DATEONLY,
        allowNull: false,
        validate: {
          notEmpty: true
        }
    },   
    gender: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
    },   
  });
  
  User.associate = (models) => {    
    User.hasOne(models.UserType)
  };

  return User;

};