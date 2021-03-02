const { v4 } = require("uuid");

module.exports = app => {  
  const HAL = app.libs.hal
  const Router = app.routing
  const ROUTES = app.const.routes
  const Movie = app.db.models.Movie;  
  const Seat = app.db.models.Seat;  
  Router.route(ROUTES.MOVIES.split('?')[0]).get(async (req, res) => {    
    Movie.findAll({
      where: {
        location: req.query?.location
      }
    })
    .then(result => {      
      console.log(result)       
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

  Router.route(ROUTES.MOVIES.split('?')[0]).post( app.get('protectedRoutes'), async (req, res) => { 
    if (req.User.UserType?.code === app.const.constants.ADMIN_CODE) { 
      try {
        if (req.body.length) {
          await Movie.bulkCreate(req.body.map(s=>{return {...s,id: v4()}}))
        } else {
          await Movie.create({
            id: v4(),
            name: req.body.name,
            code: req.body.code,
            gender: req.body.gender,
            seats_avilables: req.body.seats_avilables,
            seats_rows: req.body.seats_rows,
            seats_columns: req.body.seats_columns,
            start_time: req.body.start_time,
            duration: req.body.duration,
            location: req.body.location,
          })
        }
        
        res.status(201).json({message: "Created"}); 
      } catch (error) {
        res.status(500).json({ error: error})
      }      
    } else {
      res.status(403).json({error: "No permissions for action"})
    } 
  });

  Router.route(ROUTES.MOVIE).delete(async (req, res) => {    
    res.status(501).json({error: "Not Implemented"});
  });

  Router.route(ROUTES.MOVIE).patch(async (req, res) => {    
    res.status(501).json({error: "Not Implemented"});
  });

  Router.route(ROUTES.SEATS).post(app.get('protectedRoutes'), async (req, res) => {    
    if (req.User.UserType?.code === app.const.constants.ADMIN_CODE) { 
      try {
        console.log()
        if (req.body.length) {
          await Seat.bulkCreate(req.body.map(s=>{return {...s,id: v4(),MovieId: req.params.id_movie}}))
        } else {
          await Seat.create({...req.body, id: v4(),MovieId: req.params.id_movie})          
        }
        res.status(201).json({message: "Created!"});
      } catch (error) {
        res.status(500).json({ error: error})
      }      
    } else {
      res.status(403).json({error: "No permissions for action"})
    }     
  });

  Router.route(ROUTES.SEATS).get(async (req, res) => {    
    Seat.findAll({
      where: {
        MovieId: req.params.id_movie
      }
    })
    .then(async result => { 
      const movie = await Movie.findOne({
        where: {
          id: req.params.id_movie
        }
      }) 
      if (result) {
        res.json(HAL.SeatsHAL(result, movie))
      }  else {
        res.status(404).json(HAL.SeatsHAL([], movie))
      }
      
    })
    .catch(error => {
      res.status(500).json({error: error.message});
    });     
        
  });

  Router.route(ROUTES.SEAT).get(async (req, res) => {    
    Seat.findOne({
      where: {
        MovieId: req.params.id_movie,
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

  Router.route(ROUTES.SEAT).delete(async (req, res) => {    
    res.status(501).json({error: "Not Implemented"});
  });

  Router.route(ROUTES.SEAT).patch(async (req, res) => {    
    res.status(501).json({error: "Not Implemented"});
  });
};