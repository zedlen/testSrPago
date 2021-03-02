import halson from 'halson'

module.exports = app => {
    const ROUTES = app.const.routes  

    const MainHAL = () => {
        return halson({
            message: 'Alive!!',            
          })
          .addLink('root',{ 
            href: ROUTES.ROOT,            
          })
          .addLink('healthChecker',{ 
            href: ROUTES.ALIVE,
            name: "Healt Checker"
          })
          .addLink("cart", ROUTES.CARTS)
    }
    const CartHAL = (cart) => {
      return halson(cart.dataValues)        
        .addLink("self", ROUTES.CART.replace(':id',cart.id))
        .addLink("items", ROUTES.CART_ITEMS.replace(':id',cart.id))
    }

    const CartItemHAL = (cartItem, cart) => {
      return halson(cartItem.dataValues)
        .addLink("self", ROUTES.CART_ITEM.replace(':id_cart',cart.id).replace(':id',cartItem.id))        
    }

    const CartItemsHAL = (cartItems, cart) => {
      return halson({items: cartItems.map(c=>CartItemHAL(c, cart))})
        .addLink("self", ROUTES.CART.replace(':id',cart.id))
        .addLink("items", ROUTES.CART_ITEMS.replace(':id',cart.id))
        .addEmbed('cart', CartHAL(cart))
    }
    return {
        MainHAL,
        CartHAL,
        CartItemsHAL,
        CartItemHAL,
    }
}