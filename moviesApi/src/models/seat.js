module.exports = (sequelize, DataType) => {

  const Seat = sequelize.define('Seat', {
    id: {
      type: DataType.UUID,
      primaryKey: true,
    },
    row: {
      type: DataType.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    column: {
      type: DataType.INTEGER,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },  
    price: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }, 
    status: {
        type: DataType.ENUM,
        values: ['free', 'reserved', 'confirmed', 'blocked', 'disabled', 'no_seat'],
        defaultValue: 'free',
        allowNull: false,
        validate: {
          notEmpty: true
        }
    },    
  });
  
  Seat.associate = (models) => {
    // User.hasOne(models.UserData)
    Seat.belongsTo(models.Movie)
  };

  return Seat;

};