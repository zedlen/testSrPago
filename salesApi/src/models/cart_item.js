module.exports = (sequelize, DataType) => {

    const CartItem = sequelize.define('CartItem', {
      id: {
        type: DataType.UUID,
        primaryKey: true,
      },
      movie_id: {
        type: DataType.UUID,      
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }, 
      seat_id: {
        type: DataType.UUID,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      total: {
        type: DataType.INTEGER,      
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }, 
      status: {
          type: DataType.ENUM,
          values: ['reserved', 'confirmed'],
          defaultValue: 'reserved',
          allowNull: false,
          validate: {
            notEmpty: true
          }
      },    
    });
    
    CartItem.associate = (models) => {
      CartItem.belongsTo(models.Cart)
    };
  
    return CartItem;
  
};