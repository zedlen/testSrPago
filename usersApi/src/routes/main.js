module.exports = app => {
      const Router = app.routing
      const HAL = app.libs.hal   

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