import halson from 'halson'

module.exports = app => {
    const Router = app.routing
    const HAL = app.libs.hal    
    Router.route('/alive').get(async (req, res) => {       
          res.json(HAL.MainHAL())           
    });

    Router.route('/').get(async (req, res) => {
        
          res.json(HAL.MainHAL()) 
    });
};