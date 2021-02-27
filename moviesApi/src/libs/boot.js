module.exports = app => {

  app.db.sequelize.sync().done(() => {    
    // init app
    app.get('*', function(req, res){
      res.status(404).send({error: 'Service not found'});
    });
    app.listen(app.get('port'), () => {
      console.log('Server on port', app.get('port'));
    });
  });

};