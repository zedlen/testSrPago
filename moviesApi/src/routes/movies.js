import halson from 'halson'

module.exports = app => {  
  const HAL = app.libs.hal
  const Router = app.routing
  const ROUTES = app.const.routes
  const Movie = app.db.models.Movie;  
  Router.route(ROUTES.MOVIES).get(async (req, res) => {    
    Movie.findAll({
      where: req.query?.location
    })
    .then(result => {        
      res.json(HAL.MoviesHal(result, req.query?.location))
    })
    .catch(error => {
      res.status(500).json({error: error.message});
    });     
        
  });

  Router.route(ROUTES.MOVIE).get(async (req, res) => {    
    Movie.findOne({
      where: req.params.id
    })
    .then(result => {        
      res.json(HAL.MoviesHal(result))
    })
    .catch(error => {
      res.status(500).json({error: error.message});
    });     
        
  });
};