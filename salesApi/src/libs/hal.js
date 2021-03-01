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
          .addLink("cart", ROUTES.CART)
    }
    return {
        MainHAL,
    }
}