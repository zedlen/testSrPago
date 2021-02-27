module.exports = (sequelize, DataType) => {

    const Movie = sequelize.define('Movie', {
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
      },          
      gender: {
        type: DataType.STRING,        
      },          
      seats_avilables: {
        type: DataType.STRING,        
      },
      seats_rows: {
        type: DataType.INTEGER
      },
      seats_columns: {
        type: DataType.INTEGER
      },
      start_time: {
        type: DataType.DATE,        
      },  
      duration: {
        type: DataType.INTEGER,        
      }, 
      location: {
        type: DataType.STRING,        
      },  
    });
  
    Movie.associate = (models) => { 
      Movie.hasMany(models.Seats)     
    };
  
    return Module;
  
};