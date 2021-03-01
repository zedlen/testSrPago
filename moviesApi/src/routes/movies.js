module.exports = app => {  
  const HAL = app.libs.hal
  const Router = app.routing
  const ROUTES = app.const.routes
  const Movie = app.db.models.Movie;  
  Router.route(ROUTES.MOVIES.split('?')[0]).get(async (req, res) => {    
    Movie.findAll({
      where: {
        location: req.query?.location
      }
    })
    .then(result => {             
      res.json(HAL.MoviesHAL(result, req.query?.location))
    })
    .catch(error => {
      res.status(500).json({error: error.message});
    });     
        
  });

  Router.route(ROUTES.MOVIE).get(async (req, res) => {    
    Movie.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(result => {        
      res.json(HAL.MovieHAL(result))
    })
    .catch(error => {
      res.status(500).json({error: error.message});
    });     
        
  });

  Router.route(ROUTES.MOVIE).post(async (req, res) => {    
    res.status(501).json({error: "Not Implrmrntrd"});
  });

  Router.route(ROUTES.MOVIE).delete(async (req, res) => {    
    res.status(501).json({error: "Not Implrmrntrd"});
  });

  Router.route(ROUTES.MOVIE).patch(async (req, res) => {    
    res.status(501).json({error: "Not Implrmrntrd"});
  });

  Router.route(ROUTES.SEATS).get(async (req, res) => {    
    SEAT.findOne({
      where: {
        movieId: req.params.id_movie
      }
    })
    .then(result => {        
      res.json(HAL.SeatsHAL(result))
    })
    .catch(error => {
      res.status(500).json({error: error.message});
    });     
        
  });

  Router.route(ROUTES.SEAT).get(async (req, res) => {    
    SEAT.findOne({
      where: {
        movieId: req.params.id_movie,
        id: req.params.id
      }
    })
    .then(result => {        
      res.json(HAL.SeatHAL(result))
    })
    .catch(error => {
      res.status(500).json({error: error.message});
    });     
        
  });

  Router.route(ROUTES.SEAT).post(async (req, res) => {    
    res.status(501).json({error: "Not Implrmrntrd"});
  });

  Router.route(ROUTES.SEAT).delete(async (req, res) => {    
    res.status(501).json({error: "Not Implrmrntrd"});
  });

  Router.route(ROUTES.SEAT).patch(async (req, res) => {    
    res.status(501).json({error: "Not Implrmrntrd"});
  });
};