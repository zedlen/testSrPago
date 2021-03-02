module.exports = (sequelize, DataType) => {

    const Cart = sequelize.define('Cart', {
      id: {
        type: DataType.UUID,
        primaryKey: true,
      },
      user_id: {
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
          values: ['created','reserved', 'confirmed'],
          defaultValue: 'created',
          allowNull: false,
          validate: {
            notEmpty: true
          }
      },    
    });
    
    Cart.associate = (models) => {
        Cart.hasMany(models.CartItem)
    };
  
    return Cart;
  
};