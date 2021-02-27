module.exports = (sequelize, DataType) => {

    const UserType = sequelize.define('UserType', {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
      UserType.belongsTo(models.User)      
    };
  
    return UserType;
  
  };