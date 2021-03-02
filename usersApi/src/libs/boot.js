import {v4} from 'uuid'
module.exports = app => {

  app.db.sequelize.sync().done(async () => {         
    const UserTypes = app.db.models.UserType
    const uT = await UserTypes.findAll({})     
    if (uT.length === 0) {
      await UserTypes.bulkCreate([{
        id: v4(),
        name: "Admin",
        code: app.const.constants.ADMIN_CODE,
        permissions: {
          listMovie: true, 
          creteMovie: true,
          deleteMovie: true,
          updateMovie: true,
          deleteUsers: true,
          updateUsers: true,
          createTicket: true,
          createReservation: true
        },
      },{
        id: v4(),
        name: "User",
        code: app.const.constants.USER_CODE,
        permissions: {
          listMovie: true, 
          creteMovie: false,
          deleteMovie: false,
          updateMovie: false,
          deleteUsers: false,
          updateUsers: false,
          createTicket: true,
          createReservation: true
        }
      }])
    }  
    // init app
    app.get('*', function(req, res){
      res.status(404).send({error: 'Service not found'});
    });
    app.listen(app.get('port'), () => {
      console.log('Server on port', app.get('port'));
    });
  });

};