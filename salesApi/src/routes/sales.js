const { Op } = require("sequelize");
const { v4 } = require("uuid");
import request from 'request'

module.exports = app => {
    const Router = app.routing
    const HAL = app.libs.hal       
    const config = app.libs.config        
    const ROUTES = app.const.routes
    const Cart = app.db.models.Cart;      
    const CartItem = app.db.models.CartItem;
    const CONSTANTS = app.const.constants

    /*
    RESERVED_CART
CONFIRMED_CART
    */
    Router.route(ROUTES.CARTS).post(app.get('protectedRoutes'), async (req, res) => {  
        try {            
            const cart = await Cart.findOne({
                where:{
                    user_id: req.User.id,
                    status: {
                        [Op.or]:[CONSTANTS.RESERVED_CART, CONSTANTS.CREATED_CART]
                    }
                }
            })
            if (cart) {
                return res.status(400).json({error: "User has an open cart"})
            }
            const newCart = await Cart.create({
                id: v4(),
                user_id: req.User.id,
                total: 0,
                movie_id: "",
                status: CONSTANTS.CREATED_CART
            })            
            res.json(HAL.CartHAL(newCart))
        } catch (error) {
            console.log(error)
            res.status(500).json({error: error});
        }        
    });

    Router.route(ROUTES.CART).delete(app.get('protectedRoutes'), async (req, res) => {  
        try {            
            const cart = await Cart.findOne({
                where:{
                    user_id: req.User.id,
                    id: req.params.id
                }
            })
            if (!cart) {
                return res.status(404).json({error: "No card found"})
            }
            cart.destroy()
            res.json({message: "Cart deleted"})
        } catch (error) {
            console.log(error)
            res.status(500).json({error: error});
        }        
    });

    Router.route(ROUTES.CART).get(app.get('protectedRoutes'), async (req, res) => {  
        try {            
            const cart = await Cart.findOne({
                where:{
                    user_id: req.User.id,
                    id: req.params.id
                }
            })
            if (!cart) {
                return res.status(404).json({error: "No card found"})
            }            
            res.json(HAL.CartHAL(cart))
        } catch (error) {
            console.log(error)
            res.status(500).json({error: error});
        }        
    });

    Router.route(ROUTES.CART_ITEMS).get(app.get('protectedRoutes'), async (req, res) => { 
        try {
            const cartItems = await CartItem.findAll({
                where: {
                    CartId: req.params.id
                }
            })
            const cart = await Cart.findOne({
                where:{
                    user_id: req.User.id,
                    id: req.params.id
                }
            })
            if (!cart) {
                return res.status(404).json({error: "No card found"})
            }            
            res.json(HAL.CartItemsHAL(cartItems,cart))            
        } catch (error) {
            console.log(error)
            res.status(500).json({error: error});
        }           
    });
    
    Router.route(ROUTES.CART_ITEMS).post(app.get('protectedRoutes'), async (req, res) => {
        try {
            request.patch({
                url : config.movies_url + ROUTES.SEAT.replace(':id_movie',req.body.movie_id).replace(':id',req.body.seat_id),
                json : true, 
                body: {status: CONSTANTS.RESERVED_CART},
                headers:{
                    'Authorization': req.headers['authorization']
                },            
             }, async (error, response, body) => {                 
                 console.log(body)
                 if (error) {
                    res.status(500);
                    return res.send({error: "Error creating reservation"});
                 }
                 if (response.statusCode != 200) {                                                                                
                    res.status(400);
                    return res.send({error: body});
                 }
                 await CartItem.create({
                    id: v4(),
                    movie_id: req.body.movie_id,
                    seat_id: req.body.seat_id,
                    total: body.price,
                    status:CONSTANTS.RESERVED_CART,
                    CartId: req.params.id
                 })
                 res.send({message: "Created reservation"});                    
             })     
        } catch (error) {
            console.log(error)
            res.status(500).json({error: error});
        }                      
    });

    Router.route(ROUTES.CART_ITEM).get(app.get('protectedRoutes'), async (req, res) => {    
        res.status(501).json({error: "Not Implemented"});
    });   

    Router.route(ROUTES.CART_ITEM).delete(app.get('protectedRoutes'), async (req, res) => {    
        res.status(501).json({error: "Not Implemented"});
    });

    Router.route(ROUTES.CHECKOUT).post(app.get('protectedRoutes'), async (req, res) => {    
        try {
            const cartItems = await CartItem.findAll({
                where: {
                    CartId: req.body.cart_id
                }
            })
            const confirmSeats = (movie_id, seat_id) => {
                return new Promise((resolve, reject)=>{
                    request.patch({
                        url : config.movies_url + ROUTES.SEAT.replace(':id_movie',movie_id).replace(':id',seat_id),
                        json : true, 
                        body: {status: CONSTANTS.CONFIRMED_CART},
                        headers:{
                            'Authorization': req.headers['authorization']
                        },            
                     }, async (error, response, body) => {                 
                         console.log(body)
                         if (error) {
                            return reject(error)
                         }
                         if (response.statusCode != 200) {
                            return reject({error: body});
                         }
                         
                         resolve(body);                    
                     })  
                })
            }
            let cart = await Cart.findOne({
                where:{
                    user_id: req.User.id,
                    id: req.body.cart_id
                }
            })
            if (cart.status !== CONSTANTS.RESERVED_CART) {
                return res.status(400).json({error: "Tickets already reserved"})
            }
            if (cartItems.length > 0) {
                let totalReservations = 0
                let total = 0
                for (let index = 0; index < cartItems.length; index++) {
                    let element = cartItems[index];
                    try {
                        const r = await confirmSeats(element.movie_id, element.seat_id)
                        total += r.price 
                        totalReservations++
                        element.status = CONSTANTS.CONFIRMED_CART
                        element.save() 
                    } catch (error) {
                        
                    }                    
                }
                if (totalReservations == cartItems.length) {
                    cart.status = CONSTANTS.CONFIRMED_CART
                    cart.save()
                    res.json({message: "Reservation created", tickets: HAL.CartItemsHAL(cartItems, cart)});
                } else {
                    throw "Not all seats confirmed"
                }
            } else {
                res.status(400).json({error: "No reservations on cart"});
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({error: error});
        }
    });

    Router.route(ROUTES.CHECKOUT).get(app.get('protectedRoutes'), async (req, res) => {    
        res.status(501).json({error: "Not Implemented"});
    });
    
};