import halson from 'halson'

module.exports = app => {

  const User = app.db.models.User;  
  const UserType = app.db.models.UserType;  
  const AuthService = app.libs.auth_service
  const HAL = app.libs.hal
  const Router = app.routing
  const ROUTES = app.const.routes
  Router.route(ROUTES.USERS).get( app.get('protectedRoutes'), (req, res) => {    
    if (req.User.UserType?.code === app.const.constants.ADMIN_CODE) {
      User.findAll({})
      .then(result => {        
        res.json(HAL.UsersHAL(result))
      })
      .catch(error => {
        res.status(500).json({error: error.message});
      }); 
    } else {
      res.status(403).json({error: "No permissions for action"})
    }   
  });

  Router.route(ROUTES.USER).get( app.get('protectedRoutes'), (req, res) => {
    if (req.User.UserType?.code === app.const.constants.ADMIN_CODE || req.User.id === req.params.id) {
      User.findOne({
        where:{
          id: req.params.id
        },
        include:[UserType]
      })
      .then(result => {                
        if (result != null) {          
          res.json(HAL.UserHAL(result))                 
        } else {          
          res.status(404).json({error: 'User not found'})
        }       
      })
      .catch(error => {
        res.status(500).json({error: error.message});
      });
    } else {
      res.status(403).json({error: "No permissions for action"})
    } 
  });
  

  Router.route(ROUTES.USER).delete( app.get('protectedRoutes'), (req, res) => {
    if (req.User.UserType?.code === app.const.constants.ADMIN_CODE || req.User.id === req.params.id) {
      User.destroy({where: {id: req.params.id}})
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(500).json({error: error.message});
        });
    } else {
      res.status(403).json({error: "No permissions for action"})
    }
  });

  Router.route(ROUTES.USERS).post( async (req, res) => {
    const isFacebookAuth = req.body.is_facebook || false
    const isGoogleAuth = req.body.is_google || false
    const userAuthData = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password, 
      // birthdate: req.body.birthdate,
      name: req.body.name,
      // last_name: req.body.last_name,
      // gender: req.body.gender,
    }
    try {
      if (isFacebookAuth) {
        // TODO: Implement Social Login
      } else {
        if (isGoogleAuth) {
          // TODO: Implement Social Login
        } else {
          const loginResponse = (err, cognitoUser) =>{
            if (err) {  
              console.log(err)        
              res.status(400).json({error: err});
            } else {          
              res.status(201).json(HAL.SignUpHAL(cognitoUser));
            }        
          }
          AuthService.Register(userAuthData, loginResponse)   
        }
      }      
    }catch (err) {
      console.log("Server Error",err)
      res.status(500).json({error: err.message});
    } 
  });

  Router.route(ROUTES.CONFIRM).post( async (req, res) => {      
    const userAuthData = {
      username: req.body.username,
      code: req.body.code,      
    }
    try {
      
      const confirmationResponse = (err, cognitoUser) =>{
        if (err) {          
          res.status(400).json({error: err});
        } else {          
          res.json({status: "CONFIRMED"});
        }        
      }
      AuthService.ConfirmRegister(userAuthData, confirmationResponse)
    }catch (err) {
      console.log("Server Error",err)
      res.status(500).json({error: err.message});
    } 
  });

  Router.route(ROUTES.PROFILE).get( app.get('protectedRoutes'), (req, res) => {  
    console.log(req.User)    
    res.status(200).json(req.User)    
  });

  Router.route(ROUTES.USER).put( app.get('protectedRoutes'), (req, res) => {
    if (req.User.UserType?.code === app.const.constants.ADMIN_CODE || req.User.id === req.params.id) {
      User.findOne({where: {id: req.params.id}})
        .then(user => {
          if(user !== null){          
            user.update(req.body).then(()=>{
              res.sendStatus(204)
            })
          } else {
            res.status(404).json({error:'user  not found'})
          }
        })
        .catch(error => {
          res.status(500).json({error: error.message});
        });
    } else {
      res.status(403).json({error: "No permissions for action"})
    }
  });


  Router.route(ROUTES.TOKEN_RENEW).get( app.get('protectedRoutes'), (req, res) => {      
    res.status(501).json({
      message: 'Not implemented yet',
      token: null
    });         
    
  });

  Router.route(ROUTES.LOG_IN).post( (req, res) => {
    const userAuthData = {
      username: req.body.user,      
      password: req.body.password,       
    }
    try {
      
      const loginResponse = (err, cognitoUser) =>{
        if (err) {          
          res.status(400).json({error: err});
        } else {          
          res.setHeader('Authorization', cognitoUser)
          res.json(HAL.LoginHAL());
        }        
      }
      AuthService.Login(userAuthData, loginResponse)
    }catch (err) {
      res.status(500).json({error: err.message});
    }
});
};