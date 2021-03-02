module.exports = (sequelize, DataType) => {

    const UserType = sequelize.define('UserType', {
      id: {
        type: DataType.UUID,
        primaryKey: true
      },
      name: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },          
      code: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
      },          
      permissions: {
        type: DataType.JSON,
        allowNull: false,
        validate: {
            notEmpty: true
        }
      } 
    });
  
    UserType.associate = (models) => {
      UserType.hasMany(models.User)      
    };
  
    return UserType;
  
  };