import halson from 'halson'

module.exports = app => {
    const ROUTES = app.const.routes
    const UserHAL = (user) => {
        return halson(user).addLink('self',ROUTES.USER.replace(":id",user.id))
    } 
    
    const UsersHAL = (users) => {
        const usersHal = users.map(u=>UserHAL(u))    
        return halson({users:usersHal}).addLink('self',ROUTES.USERS)
    } 
    
    const LoginHAL = () => {
        return halson({message: "Welcome"}).addLink("movies",ROUTES.MOVIES).addLink("profile",ROUTES.PROFILE)
    }
    
    const SignUpHAL = () => {
        return halson({
            message: 'Welcome',
            user: cognitoUser,
            status: 'CONFIRMED'
          }).addLink("confirm",ROUTES.CONFIRM).addLink("logIn",ROUTES.LOG_IN)
    }

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
          }).addLink("logIn",ROUTES.LOG_IN)
          .addLink("register", ROUTES.USERS)
    }
    return {
        UserHAL,
        UsersHAL,
        LoginHAL,
        SignUpHAL,
        MainHAL,
    }
}