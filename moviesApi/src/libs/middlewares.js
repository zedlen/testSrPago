import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors'
import request from 'request'
import jwkToPem from 'jwk-to-pem'

module.exports = app => {

  // Settings
  app.set('port', process.env.PORT || 3002);
  app.set('json spaces', 4);

  // middlewares
  app.use(cors());
  app.use(express.json());
  app.use(function (req, res, next) {
    console.log(`Time:  ${Date.now()} Request: ${req.originalUrl} Method: ${req. method}`);
    next();
  });
  const config = app.libs.config
  const ROUTES = app.const.routes
  const protectedRoutes = express.Router();   
  protectedRoutes.use((req, res, next) => {
    const poolData = {
      UserPoolId: config.pool_id,
      ClientId: config.app_client_id,
   };
   const pool_region = config.region
    var token = req.headers['authorization'];    
    request({
           url : `https://cognito-idp.${pool_region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
           json : true
        }, (error, response, body) => {
           if (!error && response.statusCode === 200) {               
               let pems = {};
               var keys = body['keys'];
               for(var i = 0; i < keys.length; i++) {
                    var key_id = keys[i].kid;
                    var modulus = keys[i].n;
                    var exponent = keys[i].e;
                    var key_type = keys[i].kty;
                    var jwk = { kty: key_type, n: modulus, e: exponent};
                    var pem = jwkToPem(jwk);
                    pems[key_id] = pem;
               }
               var decodedJwt = jwt.decode(token, {complete: true});
                    if (!decodedJwt) {
                        console.info("Not a valid JWT token");
                        res.status(401);
                        return res.send({error: "Invalid token"});
                   }
                var kid = decodedJwt.header.kid;
                    var pem = pems[kid];
                    if (!pem) {                        
                        res.status(401);
                        return res.send({error: "Invalid token"});              
                    }
                jwt.verify(token, pem, async (err, payload) => {
                        if(err) {                            
                            res.status(401);
                            return res.send({error: "Invalid token"});
                        } else {                            

                            try {
                                request({
                                    url : config.users_url + ROUTES.USER.replace(':id',decodedJwt.payload.sub),
                                    json : true,
                                    headers:{
                                        'Authorization': token
                                    }
                                 }, (error, response, body) => {
                                     console.log(response.statusCode)
                                     // console.log(body)
                                     if (error) {
                                        res.status(500);
                                        return res.send({error: "Error finding user"});
                                     }
                                     if (response.statusCode != 200) {                                                                                
                                        res.status(404);
                                        return res.send({error: "User not found"});
                                     }
                                     req.User = body
                                     if (!req.User) {
                                        res.status(404);
                                        return res.send({error: "User not found"});
                                    }
                                    return next();                                    
                                 })                                                                  
                            } catch (error) {
                                res.status(404);
                                return res.send({error: "User not found"});
                            }                            
                        }
                   });
           } else {
                 console.error("Error! Unable to download JWKs", error);
                 res.status(500);
                 return res.send({error: "Error! Unable to download JWKs"});
           }
       });
  });
  app.set('protectedRoutes',protectedRoutes);

};