import 'cross-fetch/polyfill';
import * as AWSCognito from 'amazon-cognito-identity-js';
import {CognitoUserAttribute, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';



module.exports = app => {
    const {pool_id, app_client_id} = app.libs.config
    const poolData = {
        UserPoolId: pool_id,
        ClientId: app_client_id,
    };
    
    const userPool = new AWSCognito.CognitoUserPool(poolData);    
    const User = app.db.models.User; 
    const Register= (body, callback) => {
        const name = body.name, username = body.username, email = body.email, password = body.password, last_name = body.last_name, gender = body.gender, birthdate = body.birthdate;
        let attributeList = [];
        attributeList.push(new CognitoUserAttribute({ Name: "email", Value: email }));
        attributeList.push(new CognitoUserAttribute({ Name: "name", Value: name }));
        /*attributeList.push(new CognitoUserAttribute({ Name: "family_name", Value: last_name }));
        attributeList.push(new CognitoUserAttribute({ Name: "gender", Value: gender }));
        attributeList.push(new CognitoUserAttribute({ Name: "birthdate", Value: birthdate }));        */
        userPool.signUp(username, password, attributeList, null, async (err, result) => {
          if (err)
              return callback(err);
          // var cognitoUser = result.user;
          body.id=result.userSub
          // body.lastname=body.last_name
          // body.birthdate= new Date(body.birthdate)
          const UserTypes = app.db.models.UserType        
          const us = await User.findAll({})
          if (us.length === 0) {
            const uT = UserTypes.findOne({where:{code: app.const.constants.ADMIN_CODE}})
            body.UserTypeId = uT.id
          } else {
            const uT = UserTypes.findOne({where:{code: app.const.constants.ADMIN_CODE}})
            body.UserTypeId = uT.id
          }
          const u = await User.create(body)  
          callback(null, u);
        });
    },
    Login = (body, callback) => {        
        const userName = body.username;
        const password = body.password;
        const authenticationDetails = new AuthenticationDetails({
             Username: userName,
             Password: password
         });
         const userData = {
             Username: userName,
             Pool: userPool
         }
         const cognitoUser = new CognitoUser(userData);
         cognitoUser.authenticateUser(authenticationDetails, {
             onSuccess: function (result) {
                console.log(result)
                const accesstoken = result.getAccessToken().getJwtToken();
                callback(null, accesstoken);
             },
             onFailure: (function (err) {
                callback(err);
            })
        })
    }
    const ConfirmRegister = (body, callback) => {
        const userName = body.username;                
         const userData = {
             Username: userName,
             Pool: userPool
         }
         const cognitoUser = new CognitoUser(userData);
         cognitoUser.confirmRegistration(body.code, true, async (err, result) => {
            if (err) {
                callback(err)
                return;
            }
            callback(null, result)
         })
    }
    return {userPool, Login, Register, ConfirmRegister }
};