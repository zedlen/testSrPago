import halson from 'halson'

module.exports = app => {
    const Router = app.routing
    const HAL = app.libs.hal  
    
      app.use(function (req, res, next) {
            console.log(`Time:  ${Date.now()} Request: ${req.originalUrl}`);
            next();
      });

      app.get('/alive', async (req, res) => {       
            res.json(HAL.MainHAL())           
      });

      app.get('/', async (req, res) => {

            res.json(HAL.MainHAL()) 
      });
    Router.route('/alive').get(async (req, res) => {       
          res.json(HAL.MainHAL())           
    });

    Router.route('/').get(async (req, res) => {
        
          res.json(HAL.MainHAL()) 
    });
};