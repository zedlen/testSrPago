module.exports = app => {
    const Router = app.routing
    const HAL = app.libs.hal        

    Router.route(ROUTES.CART).post(async (req, res) => {    
        res.status(501).json({error: "Not Implrmrntrd"});
    });

    Router.route(ROUTES.CART_ITEMS).get(async (req, res) => {    
        res.status(501).json({error: "Not Implrmrntrd"});
    });

    Router.route(ROUTES.CART_ITEM).get(async (req, res) => {    
        res.status(501).json({error: "Not Implrmrntrd"});
    });

    Router.route(ROUTES.CART_ITEM).post(async (req, res) => {    
        res.status(501).json({error: "Not Implrmrntrd"});
    });

    Router.route(ROUTES.CART_ITEM).delete(async (req, res) => {    
        res.status(501).json({error: "Not Implrmrntrd"});
    });

    Router.route(ROUTES.CHECKOUT).post(async (req, res) => {    
        res.status(501).json({error: "Not Implrmrntrd"});
    });

    Router.route(ROUTES.CHECKOUT).get(async (req, res) => {    
        res.status(501).json({error: "Not Implrmrntrd"});
    });

    Router.route(ROUTES.RESERVATIONS).get(async (req, res) => {    
        res.status(501).json({error: "Not Implrmrntrd"});
    });

    Router.route(ROUTES.RESERVATION).get(async (req, res) => {    
        res.status(501).json({error: "Not Implrmrntrd"});
    });

    Router.route(ROUTES.RESERVATION).post(async (req, res) => {    
        res.status(501).json({error: "Not Implrmrntrd"});
    });

    Router.route(ROUTES.RESERVATION).delete(async (req, res) => {    
        res.status(501).json({error: "Not Implrmrntrd"});
    });
};