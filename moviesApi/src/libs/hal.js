import halson from 'halson'

module.exports = app => {
    const ROUTES = app.const.routes

    const MovieHAL = (movie) => {
        return halson(movie.dataValues)
          .addLink('self',{ 
            href: ROUTES.MOVIE.replace(':id', movie.id),            
          })
          .addLink('seats',{ 
            href: ROUTES.SEATS.replace(':id_movie', movie.id),            
          })          
    }

    const MoviesHAL = (movies, location) => {
        
        const moviesHal = movies.map(u=>MovieHAL(u))            
        return halson({movies:moviesHal})
          .addLink('self',{ 
            href: ROUTES.MOVIES.replace('{location}', location),            
          })          
    }

    const SeatHAL = (seat, movie) => {
        return halson(seat.dataValues)
          .addLink('self',{ 
            href: ROUTES.SEAT.replace(':id:movie', movie.id).replace(':id', seat.id),
          })
          .addEmbed('movie', MovieHAL(movie))
    }

    const SeatsHAL = (seats, movie) => {
        
        const seatsHal = seats.map(u=>SeatHAL(u, movie))    
        
        return halson({seats:seatsHal})
          .addLink('self',{ 
            href: ROUTES.SEATS.replace(':id_movie', movie.id),            
          })
          .addEmbed('movie', MovieHAL(movie))
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
          }).addLink("movies",ROUTES.MOVIES)
    }

    return {            
        MoviesHAL,
        MovieHAL,    
        SeatsHAL,
        MainHAL,
    }
}