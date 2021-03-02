module.exports = app => {

    const Router = app.routing
    const HAL = app.libs.hal        
    const ROUTES = app.const.routes

    Router.route(ROUTES.RESERVATIONS).get(async (req, res) => {    
        res.status(501).json({error: "Not Implemented"});
    });

    Router.route(ROUTES.RESERVATION).get(async (req, res) => {    
        res.status(501).json({error: "Not Implemented"});
    });

    Router.route(ROUTES.RESERVATION).post(async (req, res) => {    
        res.status(501).json({error: "Not Implemented"});
    });

    Router.route(ROUTES.RESERVATION).delete(async (req, res) => {    
        res.status(501).json({error: "Not Implemented"});
    });
}