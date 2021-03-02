const { v4 } = require("uuid");

module.exports = app => {  
  const HAL = app.libs.hal
  const Router = app.routing
  const ROUTES = app.const.routes
  const CONSTANTS = app.const.constants
  const Movie = app.db.models.Movie;  
  const Seat = app.db.models.Seat;  

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

  Router.route(ROUTES.SEAT).delete(app.get('protectedRoutes'), async (req, res) => {  
    if (req.User.UserType?.code === app.const.constants.ADMIN_CODE) { 
        try {
            if (req.body.status) {
                if (CONSTANTS.VALID_STATUS.includes(req.body.status)) {
                    const seat = await Seat.findOne({
                    where: {
                        MovieId: req.params.id_movie,
                        id: req.params.id
                    }
                    })
                    if (!seat) {
                        return res.status(404).json({error: "Seat not found"});
                    } 
                    
                    if (seat.status !== CONSTANTS.RESERVED_SEAT && seat.status !== CONSTANTS.CONFIRMED_SEAT) {                        
                        seat.destroy()
                        res.status(200).json({message: "Seat deleted"});
                    } else {
                        res.status(400).json({error: "Seat is in use"});
                    }                          
                } else {
                res.status(400).json({error: "Not a valid Status"});          
                }
            }    
        } catch (error) {
            res.status(500).json({error: error});
        }   
    } else {
      res.status(403).json({error: "No permissions for action"})
    }   
  });

    Router.route(ROUTES.SEAT).patch(app.get('protectedRoutes'),async (req, res) => {
        try {
            if (req.body.status) {
                if (CONSTANTS.VALID_STATUS.includes(req.body.status)) {
                    const seat = await Seat.findOne({
                    where: {
                        MovieId: req.params.id_movie,
                        id: req.params.id
                    }
                    })
                    if (!seat) {
                        return res.status(404).json({error: "Seat not found"});
                    } 
                    if (req.body.status === CONSTANTS.RESERVED_SEAT) {
                        if (seat.status === CONSTANTS.FREE_SEAT) {
                            seat.status = req.body.status
                            seat.save()
                            res.status(200).json({message: "Seat reserved", price: seat.price});
                        } else {
                            res.status(400).json({error: "Not a free seat"});
                        }
                    }     
                    if (req.body.status === CONSTANTS.CONFIRMED_SEAT) {
                        if (seat.status === CONSTANTS.RESERVED_SEAT) {
                            seat.status = req.body.status
                            seat.save()
                            res.status(200).json({message: "Seat Confirmed", price: seat.price});
                        } else {
                            res.status(400).json({error: "Not a reserved seat"});
                        }
                    } 
                    if (req.body.status === CONSTANTS.DISABLED_SEAT) {
                        if (seat.status !== CONSTANTS.RESERVED_SEAT && seat.status !== CONSTANTS.CONFIRMED_SEAT) {
                            seat.status = req.body.status
                            seat.save()
                            res.status(200).json({message: "Seat disabled"});
                        } else {
                            res.status(400).json({error: "Seat is in use"});
                        }
                    } 
                    if (req.body.status === CONSTANTS.BLOCKED_SEAT) {
                        if (seat.status !== CONSTANTS.RESERVED_SEAT && seat.status !== CONSTANTS.CONFIRMED_SEAT) {
                            seat.status = req.body.status
                            seat.save()
                            res.status(200).json({message: "Seat blocked"});
                        } else {
                            res.status(400).json({error: "Seat is in use"});
                        }
                    }   
                    if (req.body.status === CONSTANTS.NO_SEAT) {
                        if (seat.status !== CONSTANTS.RESERVED_SEAT && seat.status !== CONSTANTS.CONFIRMED_SEAT) {
                            seat.status = req.body.status
                            seat.save()
                            res.status(200).json({message: "Seat converted to space"});
                        } else {
                            res.status(400).json({error: "Seat is in use"});
                        }
                    }                    
                } else {
                res.status(400).json({error: "Not a valid Status"});          
                }
            } else {
                res.status(400).json({error: "Not status in body"});          
            }    
        } catch (error) {
            res.status(500).json({error: error});
        }    
    });
};